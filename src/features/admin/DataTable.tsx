'use client';

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography, alpha, useTheme } from '@mui/material';
import { ReactNode, useState } from 'react';

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
}

export function DataTable<T extends { id: string | number }>({ title, columns, rows, actions }: DataTableProps<T>) {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '24px', transform: 'translateZ(0)', boxShadow: theme.palette.mode === 'light' ? '0 4px 24px rgba(0,0,0,0.04)' : '0 4px 24px rgba(0,0,0,0.4)', border: '1px solid', borderColor: 'divider' }}>
      {(title || actions) && (
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
          {title && <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>}
          {actions && <Box>{actions}</Box>}
        </Box>
      )}
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ 
                    bgcolor: alpha(theme.palette.background.default, 0.8), 
                    backdropFilter: 'blur(8px)', 
                    fontWeight: 700, 
                    color: 'text.secondary',
                    borderTopLeftRadius: (!title && !actions && index === 0) ? '16px' : 0,
                    borderTopRightRadius: (!title && !actions && index === columns.length - 1) ? '16px' : 0,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {columns.map((column) => {
                      const value = row[column.id as keyof T];
                      return (
                        <TableCell key={String(column.id)} align={column.align} sx={{ py: 2 }}>
                          {column.format ? column.format(value, row) : (value as ReactNode)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
