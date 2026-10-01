'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Box, Button, Paper, Snackbar, Tab, Tabs, Typography } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataTable } from '@/features/admin/DataTable';
import { ActionIcon } from '@/features/admin/ActionIcon';
import { ProfessionalSelect, professionalLabel } from '@/features/admin/ProfessionalSelect';
import { DateRangeFilter, useInitialDateRange } from '@/features/admin/DateRangeFilter';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { adminApi, assignmentsApi, servicesApi } from '@/services/api';
import { formatDate } from '@/utils/date';

const PENDING_STATUSES = 'Pending,Created,PaymentPending,PaymentVerified,Confirmed';
const ASSIGNED_STATUSES = 'DoctorAssigned,DoctorConfirmed,VisitStarted,VisitCompleted';
const NON_PHYSICIAN = ['Elder Care', 'Nursing Care', 'Physiotherapy'];
const BULK_CONCURRENCY = 3;

export default function AssignmentsPage() {
  const initialRange = useInitialDateRange(); // today by default; "Show all" below reveals the full backlog
  const [startDate, setStartDate] = useState(initialRange.start);
  const [endDate, setEndDate] = useState(initialRange.end);
  const [tab, setTab] = useState(0); // 0 = awaiting assignment, 1 = assigned
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const [rows, setRows] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState({ pending: 0, assigned: 0, pendingAllTime: 0 });
  const [loading, setLoading] = useState(true);

  const [doctors, setDoctors] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Record<string, string>>({});
  const [selection, setSelection] = useState<Array<string | number>>([]);
  const [bulkDoctor, setBulkDoctor] = useState('');
  const [bulkRunning, setBulkRunning] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' | 'warning' }>({ open: false, message: '', severity: 'success' });

  const rangeInvalid = !!startDate && !!endDate && startDate > endDate;
  const requestSeq = useRef(0);
  const notify = (message: string, severity: 'success' | 'error' | 'warning' = 'success') => setSnackbar({ open: true, message, severity });

  useEffect(() => {
    Promise.all([adminApi.getDoctors({ status: 'Active' }), servicesApi.findAllActive()])
      .then(([d, s]) => {
        setDoctors((d.data.data || []).filter((x: any) => x.status === 'Active'));
        setServices(s.data.data || []);
      })
      .catch(() => notify('Could not load doctors', 'error'));
  }, []);

  const load = useCallback(() => {
    if (rangeInvalid) return;
    const seq = ++requestSeq.current;
    setLoading(true);
    const range = { startDate: startDate || undefined, endDate: endDate || undefined };
    const count = (status: string, r: object) => adminApi.getBookings({ status, page: 1, pageSize: 1, ...r }).then((res) => res.data.total ?? 0);
    Promise.all([
      adminApi.getBookings({ status: tab === 0 ? PENDING_STATUSES : ASSIGNED_STATUSES, page: page + 1, pageSize: rowsPerPage, ...range }),
      count(PENDING_STATUSES, range),
      count(ASSIGNED_STATUSES, range),
      count(PENDING_STATUSES, {}),
    ]).then(([list, pending, assigned, pendingAll]) => {
      if (seq !== requestSeq.current) return;
      setRows(list.data.data || []);
      setTotal(list.data.total ?? 0);
      setCounts({ pending, assigned, pendingAllTime: pendingAll });
    }).catch(() => {
      if (seq === requestSeq.current) notify('Could not load bookings', 'error');
    }).finally(() => { if (seq === requestSeq.current) setLoading(false); });
  }, [tab, page, rowsPerPage, startDate, endDate, rangeInvalid]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setSelection([]); }, [tab, page, rowsPerPage, startDate, endDate]);

  const doctorsFor = (serviceId: number) => {
    const svc = services.find((s) => s.id === serviceId);
    if (!svc) return doctors;
    if (NON_PHYSICIAN.includes(svc.serviceName)) {
      const match = doctors.filter((d) => d.specialization === svc.serviceName);
      return match.length ? match : doctors;
    }
    return doctors.filter((d) => !NON_PHYSICIAN.includes(d.specialization));
  };
  const serviceName = (serviceId: number) => services.find((s) => s.id === serviceId)?.serviceName || '—';

  const handleAssign = async (bookingId: string) => {
    const doctorId = selectedDoctor[bookingId];
    if (!doctorId) return;
    try {
      await assignmentsApi.assign(bookingId, doctorId);
      notify('Doctor assigned successfully');
      load();
    } catch (err: any) {
      notify(err.response?.data?.message || 'Failed to assign doctor', 'error');
    }
  };

  const handleRevoke = async (id: string) => {
    if (!confirm('Revoke this doctor assignment? The booking returns to the pending queue.')) return;
    try {
      await assignmentsApi.revoke(id);
      notify('Doctor assignment revoked');
      load();
    } catch {
      notify('Failed to revoke assignment', 'error');
    }
  };

  // Bulk: assign every selected booking to one doctor, a few requests at a time, then report what happened.
  const handleBulkAssign = async () => {
    if (!bulkDoctor || !selection.length) return;
    setBulkRunning(true);
    const ids = selection.map(String);
    const failed: string[] = [];
    let cursor = 0;
    const worker = async () => {
      while (cursor < ids.length) {
        const id = ids[cursor++];
        try { await assignmentsApi.assign(id, bulkDoctor); } catch { failed.push(id); }
      }
    };
    await Promise.all(Array.from({ length: Math.min(BULK_CONCURRENCY, ids.length) }, worker));
    setBulkRunning(false);
    const ok = ids.length - failed.length;
    if (failed.length) notify(`Assigned ${ok} of ${ids.length}. Failed: ${failed.map((f) => `#${f}`).join(', ')}`, ok ? 'warning' : 'error');
    else notify(`Assigned ${ok} booking${ok === 1 ? '' : 's'}`);
    setSelection([]);
    setBulkDoctor('');
    load();
  };

  const idCol = { id: 'id' as const, label: 'Booking', minWidth: 90, format: (v: string) => `#${String(v).slice(0, 8)}` };
  const patientCol = { id: 'patient' as const, label: 'Patient', minWidth: 170, format: (_: any, row: any) => (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.patient?.fullName || '—'}</Typography>
      {row.patient?.mobileNo && <Typography variant="caption" color="text.secondary">{row.patient.mobileNo}</Typography>}
    </Box>
  ) };
  const dateCol = { id: 'scheduledDate' as const, label: 'Date', minWidth: 110, format: (v: string) => formatDate(v, { utc: true }) };
  const statusCol = { id: 'status' as const, label: 'Status', minWidth: 80, align: 'center' as const, format: (v: StatusType) => <StatusBadge iconOnly status={v} /> };

  const pendingColumns = [
    idCol,
    patientCol,
    { id: 'serviceId' as const, label: 'Service', minWidth: 140, format: (v: number) => serviceName(v) },
    { id: 'symptoms' as const, label: 'Symptoms', minWidth: 160, format: (v: string) => v || '—' },
    dateCol,
    statusCol,
    {
      id: 'doctor' as const, label: 'Assign professional', minWidth: 300,
      format: (_: any, row: any) => (
        <ProfessionalSelect
          options={doctorsFor(row.serviceId)}
          value={selectedDoctor[row.id] || ''}
          onChange={(id) => setSelectedDoctor((p) => ({ ...p, [row.id]: id }))}
          ariaLabel={`Professional for booking ${row.id}`}
          minWidth={280}
        />
      ),
    },
    {
      id: 'actions' as const, label: 'Actions', minWidth: 110, align: 'left' as const,
      format: (_: any, row: any) => (
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          <ActionIcon title="View booking" icon={<VisibilityIcon fontSize="small" />} color="inherit" href={`/admin/bookings/${row.id}`} />
          <ActionIcon title={selectedDoctor[row.id] ? 'Assign professional' : 'Select a professional first'} icon={<PersonAddAltIcon fontSize="small" />} disabled={!selectedDoctor[row.id]} onClick={() => handleAssign(row.id)} />
        </Box>
      ),
    },
  ];

  const assignedColumns = [
    idCol,
    patientCol,
    dateCol,
    statusCol,
    { id: 'doctor' as const, label: 'Assigned to', minWidth: 200, format: (_: any, row: any) => (row.doctor ? `${professionalLabel(row.doctor)}${row.doctor.specialization ? ` — ${row.doctor.specialization}` : ''}` : '—') },
    {
      id: 'actions' as const, label: 'Actions', minWidth: 110, align: 'left' as const,
      format: (_: any, row: any) => (
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          <ActionIcon title="View booking" icon={<VisibilityIcon fontSize="small" />} color="inherit" href={`/admin/bookings/${row.id}`} />
          {row.status === 'DoctorAssigned' && <ActionIcon title="Revoke assignment" icon={<PersonRemoveIcon fontSize="small" />} color="error" onClick={() => handleRevoke(row.id)} />}
        </Box>
      ),
    },
  ];

  const hiddenBacklog = counts.pendingAllTime - counts.pending;
  const hasRange = !!startDate || !!endDate;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Booking Confirmation Center</Typography>
        <Typography color="text.secondary">Review pending bookings, assign professionals — one by one or in bulk — and confirm appointments.</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <DateRangeFilter startDate={startDate} endDate={endDate} onChange={(s, e) => { setStartDate(s); setEndDate(e); setPage(0); }} />
      </Box>

      {hasRange && hiddenBacklog > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }} action={<Button color="inherit" size="small" onClick={() => { setStartDate(''); setEndDate(''); setPage(0); }}>Show all</Button>}>
          {hiddenBacklog} more booking{hiddenBacklog === 1 ? ' is' : 's are'} awaiting assignment outside this date range.
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tab} onChange={(_, v) => { setTab(v); setPage(0); }}>
          <Tab label={`Awaiting assignment (${counts.pending})`} />
          <Tab label={`Assigned (${counts.assigned})`} />
        </Tabs>
      </Box>

      {tab === 0 && selection.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2, mb: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, borderColor: 'primary.main' }}>
          <Typography sx={{ fontWeight: 700 }}>{selection.length} selected</Typography>
          <Box sx={{ minWidth: 300 }}>
            <ProfessionalSelect options={doctors} value={bulkDoctor} onChange={setBulkDoctor} placeholder="Assign all to… (search)" ariaLabel="Professional for selected bookings" minWidth={300} />
          </Box>
          <Button variant="contained" startIcon={<PersonAddAltIcon />} disabled={!bulkDoctor || bulkRunning} onClick={handleBulkAssign}>
            {bulkRunning ? 'Assigning…' : `Assign ${selection.length}`}
          </Button>
          <Button variant="text" disabled={bulkRunning} onClick={() => setSelection([])}>Clear selection</Button>
        </Paper>
      )}

      <DataTable
        key={tab}
        columns={(tab === 0 ? pendingColumns : assignedColumns) as any}
        rows={rows}
        loading={loading}
        searchable
        selection={tab === 0 ? { selected: selection, onChange: setSelection } : undefined}
        emptyMessage={tab === 0 ? 'No bookings are waiting for assignment in this range.' : 'No assigned bookings in this range.'}
        serverPagination={{ total, page, rowsPerPage, onPageChange: setPage, onRowsPerPageChange: (n) => { setRowsPerPage(n); setPage(0); } }}
      />

      <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
