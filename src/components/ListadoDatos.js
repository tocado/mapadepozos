import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, TextField, Typography } from '@mui/material';


export default function ListadoDatos({ data }) {
    const [fprofmin, setfprofmin] = useState(0)
    const [fprofmax, setfprofmax] = useState(0)
    const [fname, setfname] = useState('')
    const [fdepa, setfdepa] = useState('')
    const [floca, setfloca] = useState('')
    const [fprov, setfprov] = useState('')
    const rows = data.map((r) => {
        return {
            name: r.name,
            Profundidad: r.Profundidad,
            Departamento: r.Departamento,
            Localidad: r.Localidad,
            Provincia: r.Provincia,
        }
    })
    const [filtradoRows, setFiltradoRows] = useState(rows)
    useEffect(() => {
        setFiltradoRows(rows.filter((p) => {

            let name = p.name.toString().toLowerCase()
            let depa = p.Departamento.toString().toLowerCase()
            let prof = parseFloat(p.Profundidad)
            let loca = p.Localidad.toString().toLowerCase()
            let prob = p.Provincia.toString().toLowerCase()

            if (name.includes(fname)) {
                if (
                    (prof > fprofmin && prof < fprofmax) ||
                    (fprofmin === 0 && fprofmax === 0)
                ) {
                    if (depa.includes(fdepa)) {
                        if (loca.includes(floca)) {
                            if (prob.includes(fprov)) {
                                return true
                            }
                        }
                    }
                }
            }
            return false
        }))
        return () => {
            return true
        }
// eslint-disable-next-line
    }, [fname, fdepa, floca, fprofmax, fprofmin, fprov])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const columns = [
        {
            id: 'Profundidad',
            label: 'Profundidad',
            minWidth: 20,
            align: 'right',
            // format: (value) => value.toLocaleString('en-US'),
            filtro: () => {
                return (
                    <>
                        <Box sx={{ width: '18ch' }}>
                            Profundidad
                            <TextField type="number" id="min" onChange={(e) => setfprofmin(e.target.value)} value={fprofmin} label="min" size="small" sx={{ width: '9ch' }} />
                            <TextField type="number" id="max" onChange={(e) => setfprofmax(e.target.value)} value={fprofmax} label="max" size="small" sx={{ width: '9ch' }} />
                        </Box>
                    </>
                )
            },
        },
        {
            id: 'name',
            label: 'Nombre',
            minWidth: 50,
            filtro: () => {
                return (
                    <>
                        <Box sx={{ width: '16ch' }}>
                            Nombre
                            <TextField onChange={(e) => setfname(e.target.value)} value={fname} size="small" sx={{ width: '16ch' }} />
                        </Box>
                    </>
                )
            },
        },
        {
            id: 'Departamento',
            label: 'Departamento',
            minWidth: 220,
            align: 'left',
            format: (value) => value.toFixed(2),
            filtro: () => {
                return (
                    <>
                        <Box sx={{ width: '16ch' }}>
                            Departamento
                            <TextField onChange={(e) => setfdepa(e.target.value)} value={fdepa} size="small" sx={{ width: '16ch' }} />
                        </Box>
                    </>
                )
            },

        },
        {
            id: 'Localidad',
            label: 'Localidad',
            minWidth: 180,
            align: 'left',
            format: (value) => value.toFixed(2),
            filtro: () => {
                return (
                    <>
                        <Box sx={{ width: '16ch' }}>
                            Localidad
                            <TextField onChange={(e) => setfloca(e.target.value)} value={floca} size="small" sx={{ width: '16ch' }} />
                        </Box>
                    </>
                )
            },

        },
        {
            id: 'Provincia',
            label: 'Provincia',
            minWidth: 170,
            align: 'left',
            format: (value) => value.toFixed(2),
            filtro: () => {
                return (
                    <>
                        <Box sx={{ width: '16ch' }}>
                            Provincia
                            <TextField onChange={(e) => setfprov(e.target.value)} value={fprov} size="small" sx={{ width: '16ch' }} />
                        </Box>
                    </>
                )
            },
        },
    ]

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: 2 }}>
            <Typography variant="h5">Listado de Cuencas</Typography>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, i) => (
                                <TableCell
                                    key={column.id + i}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.filtro()}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtradoRows
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
                count={filtradoRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}