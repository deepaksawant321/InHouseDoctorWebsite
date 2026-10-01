'use client';

import { Box, Checkbox, CircularProgress, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Paper, Typography, alpha, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ReactNode, useMemo, useState } from 'react';

interface Column<T> {
  id: keyof T | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any, row: T) => ReactNode;
}

interface DataTableProps<T> {
  title?: string;
  columns: Column<T>[];
  rows: T[];
  actions?: ReactNode;
  /** Show a loading overlay inside the table (keeps filters mounted while data reloads). */
  loading?: boolean;
  /** Text shown when there are no rows. */
  emptyMessage?: string;
  /** Adds a quick-search box that filters the rows currently loaded (current page when server-paginated). */
  searchable?: boolean;
  /** Hide the pagination footer (for short "recent items" previews). */
  hidePagination?: boolean;
  /** Row checkboxes for bulk actions. `selected` holds row ids; header checkbox toggles every selectable row on the page. */
  selection?: {
    selected: Array<string | number>;
    onChange: (ids: Array<string | number>) => void;
    isSelectable?: (row: T) => boolean;
  };
  /** Server-side pagination: rows is already the current page; total/page come from the API. */
  serverPagination?: {
    total: number;
    page: number; // 0-based
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
  };
}

export function DataTable<T extends { id: string | number }>({ title, columns, rows, actions, loading = false, emptyMessage = 'No records found.', searchable = false, hidePagination = false, selection, serverPagination }: DataTableProps<T>) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState('');

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [rows, query]);

  const clientPage = Math.min(page, Math.max(0, Math.ceil(filteredRows.length / rowsPerPage) - 1));
  const visibleRows = serverPagination ? filteredRows : filteredRows.slice(clientPage * rowsPerPage, clientPage * rowsPerPage + rowsPerPage);
  const showToolbar = title || actions || searchable;
  const selectableIds = selection ? visibleRows.filter((r) => selection.isSelectable?.(r) ?? true).map((r) => r.id) : [];
  const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selection!.selected.includes(id));
  const someSelected = selectableIds.some((id) => selection?.selected.includes(id));
  const toggleAll = () => {
    if (!selection) return;
    selection.onChange(allSelected
      ? selection.selected.filter((id) => !selectableIds.includes(id))
      : Array.from(new Set([...selection.selected, ...selectableIds])));
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '24px', transform: 'translateZ(0)', boxShadow: theme.palette.mode === 'light' ? '0 4px 24px rgba(0,0,0,0.04)' : '0 4px 24px rgba(0,0,0,0.4)', border: '1px solid', borderColor: 'divider' }}>
      {showToolbar && (
        <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          {title && <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>}
          {searchable && (
            <TextField
              size="small"
              placeholder="Search in table…"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0); }}
              slotProps={{
                htmlInput: { 'aria-label': 'Search in table' },
                input: { startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> },
              }}
              sx={{ minWidth: { xs: '100%', sm: 280 } }}
            />
          )}
          {actions && <Box>{actions}</Box>}
        </Box>
      )}
      <TableContainer sx={{ maxHeight: 640, position: 'relative' }}>
        <Table stickyHeader aria-label="data table" sx={{ '& .MuiTableCell-root': { fontSize: '0.95rem', lineHeight: 1.5 } }}>
          <TableHead>
            <TableRow>
              {selection && (
                <TableCell padding="checkbox" sx={{ bgcolor: alpha(theme.palette.background.default, 0.95), width: 48 }}>
                  <Checkbox size="small" checked={allSelected} indeterminate={!allSelected && someSelected} disabled={!selectableIds.length} onChange={toggleAll} slotProps={{ input: { 'aria-label': 'Select all rows on this page' } }} />
                </TableCell>
              )}
              {columns.map((column, index) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    bgcolor: alpha(theme.palette.background.default, 0.95),
                    fontWeight: 700,
                    fontSize: '0.8rem !important',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    color: 'text.secondary',
                    py: 1.5,
                    whiteSpace: 'nowrap',
                    borderTopLeftRadius: !showToolbar && index === 0 ? '16px' : 0,
                    borderTopRightRadius: !showToolbar && index === columns.length - 1 ? '16px' : 0,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ opacity: loading ? 0.5 : 1, transition: 'opacity 150ms' }}>
            {visibleRows.map((row) => (
              <TableRow hover tabIndex={-1} key={row.id} selected={!!selection?.selected.includes(row.id)} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {selection && (
                  <TableCell padding="checkbox">
                    <Checkbox size="small" disabled={selection.isSelectable ? !selection.isSelectable(row) : false} checked={selection.selected.includes(row.id)}
                      onChange={() => selection.onChange(selection.selected.includes(row.id) ? selection.selected.filter((id) => id !== row.id) : [...selection.selected, row.id])}
                      slotProps={{ input: { 'aria-label': `Select row ${row.id}` } }} />
                  </TableCell>
                )}
                {columns.map((column) => {
                  const value = row[column.id as keyof T];
                  return (
                    <TableCell key={String(column.id)} align={column.align} sx={{ py: 1.75, verticalAlign: 'middle' }}>
                      {column.format ? column.format(value, row) : (value as ReactNode)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            {!visibleRows.length && (
              <TableRow>
                <TableCell colSpan={columns.length + (selection ? 1 : 0)} align="center" sx={{ py: 8, border: 0 }}>
                  {loading ? null : (
                    <Typography color="text.secondary">{query ? `No results for “${query}”.` : emptyMessage}</Typography>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {loading && (
          <Box sx={{ position: 'absolute', inset: 0, top: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <CircularProgress size={36} />
          </Box>
        )}
      </TableContainer>
      {!hidePagination && <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={serverPagination ? serverPagination.total : filteredRows.length}
        rowsPerPage={serverPagination ? serverPagination.rowsPerPage : rowsPerPage}
        page={serverPagination ? serverPagination.page : clientPage}
        onPageChange={(_e, p) => (serverPagination ? serverPagination.onPageChange(p) : setPage(p))}
        onRowsPerPageChange={(e) => {
          const n = +e.target.value;
          if (serverPagination) serverPagination.onRowsPerPageChange(n);
          else { setRowsPerPage(n); setPage(0); }
        }}
        sx={{ '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-select': { fontSize: '0.9rem' } }}
      />}
    </Paper>
  );
}
