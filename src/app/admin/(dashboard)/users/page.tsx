'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Snackbar, Alert, TextField, Typography } from '@mui/material';
import { DataTable } from '@/features/admin/DataTable';
import { DateRangeFilter, useInitialDateRange } from '@/features/admin/DateRangeFilter';
import { StatusBadge, StatusType } from '@/features/admin/StatusBadge';
import { adminApi } from '@/services/api';
import { formatDate } from '@/utils/date';

export default function UsersManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [total, setTotal] = useState(0);
  const initial = useInitialDateRange(); // defaults to today unless the URL carries a range
  const [startDate, setStartDate] = useState(initial.start);
  const [endDate, setEndDate] = useState(initial.end);
  const [error, setError] = useState('');
  const requestSeq = useRef(0);

  const dateRangeInvalid = !!startDate && !!endDate && startDate > endDate;
  const hasFilters = !!startDate || !!endDate;

  useEffect(() => {
    if (dateRangeInvalid) return;
    const seq = ++requestSeq.current;
    setLoading(true);
    adminApi.getUsers({ startDate: startDate || undefined, endDate: endDate || undefined, page: page + 1, pageSize: rowsPerPage })
      .then((res) => {
        if (seq !== requestSeq.current) return;
        setUsers(res.data.data || []);
        setTotal(res.data.total ?? 0);
      })
      .catch(() => { if (seq === requestSeq.current) setError('Could not load users'); })
      .finally(() => { if (seq === requestSeq.current) setLoading(false); });
  }, [startDate, endDate, page, rowsPerPage, dateRangeInvalid]);

  const columns = [
    { id: 'id' as const, label: 'User ID', minWidth: 90, format: (v: string) => `#${v}` },
    { id: 'fullName' as const, label: 'Name', minWidth: 180 },
    { id: 'mobileNo' as const, label: 'Mobile', minWidth: 140 },
    { id: 'email' as const, label: 'Email', minWidth: 220, format: (v: string) => v || '—' },
    { id: 'isVerified' as const, label: 'Verified', minWidth: 90, align: 'center' as const, format: (v: boolean) => <StatusBadge iconOnly status={(v ? 'Verified' : 'Pending Verification') as StatusType} /> },
    { id: 'status' as const, label: 'Status', minWidth: 90, align: 'center' as const, format: (v: StatusType) => <StatusBadge iconOnly status={v} /> },
    { id: 'createdDate' as const, label: 'Registered', minWidth: 130, format: (v: string) => formatDate(v) },
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>Registered Users</Typography>
        <Typography color="text.secondary">{total} user{total === 1 ? '' : 's'}{hasFilters ? ' registered in this range' : ''}</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 3 }}>
        <DateRangeFilter startDate={startDate} endDate={endDate} fromLabel="Registered from" onChange={(s, e) => { setStartDate(s); setEndDate(e); setPage(0); }} />
      </Box>

      <DataTable
        columns={columns}
        rows={users}
        loading={loading}
        searchable
        emptyMessage={hasFilters ? 'No users registered in this range.' : 'No users yet.'}
        serverPagination={{ total, page, rowsPerPage, onPageChange: setPage, onRowsPerPageChange: (n) => { setRowsPerPage(n); setPage(0); } }}
      />

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
      </Snackbar>
    </Box>
  );
}
