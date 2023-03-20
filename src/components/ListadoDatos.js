import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import MenuDescargaDatos from './MenuDescargaDatos';
import Grid from '@mui/material/Grid';

export default function ListadoDatos({ data }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const columns = [
        {
            id: 'Provincia',
            label: 'Provincia',
            minWidth: 170,
            align: 'left',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'Departamento',
            label: 'Departamento',
            minWidth: 220,
            align: 'left',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'Uso',
            label: 'Uso',
            minWidth: 50,
        },
        {
            id: 'fecha',
            label: 'Fecha',
            minWidth: 50,
        },
        {
            id: 'Profundidad',
            label: 'Profundidad',
            minWidth: 20,
            align: 'right',
        },
        {
            id: 'NivelEstatico',
            label: 'Nivel Estatico',
            minWidth: 20,
            align: 'right',
        },
        {
            id: 'NivelDinamico',
            label: 'Nivel Dinamico',
            minWidth: 20,
            align: 'right',
        },
        {
            id: 'Caudalmedio',
            label: 'Caudal Medio',
            minWidth: 20,
            align: 'right',
        },
    ]

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Grid item xs="auto">
                    <Typography variant="h5">Listado de pozos</Typography>
                </Grid>
                <Grid item xs="auto">
                    <MenuDescargaDatos data={data} />
                </Grid>
            </Grid>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, i) => (
                                <TableCell
                                    key={column.id + i}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontWeight: "bolder" }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
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
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}