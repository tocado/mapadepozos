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
    const [fdepa, setfdepa] = useState('')
    const [fprov, setfprov] = useState('')
    const [fUso, setfUso] = useState('')
    const [ffecha, setffecha] = useState('')
    const [fNivelEstaticomin, setfNivelEstaticomin] = useState(0)
    const [fNivelEstaticomax, setfNivelEstaticomax] = useState(0)
    const [fNivelDinamicomin, setfNivelDinamicomin] = useState(0)
    const [fNivelDinamicomax, setfNivelDinamicomax] = useState(0)
    const [fCaudalmediomin, setfCaudalmediomin] = useState(0)
    const [fCaudalmediomax, setfCaudalmediomax] = useState(0)

    const rows = data.map((r) => {
        return {
            Provincia: r.Provincia,
            Departamento: r.Departamento,
            Uso: r.Uso,
            fecha: r.fecha,
            Profundidad: r.Profundidad,
            NivelEstatico: r.NivelEstatico,
            NivelDinamico: r.NivelDinamico,
            Caudalmedio: r.Caudalmedio,
        }
    })
    const [filtradoRows, setFiltradoRows] = useState(rows)
    useEffect(() => {
        function ch(fuente, dato, tipo) {
            if (tipo === 'r') {//rango
                dato.min = parseFloat(dato.min)
                dato.max = parseFloat(dato.max)
                fuente = parseFloat(fuente)?parseFloat(fuente):parseFloat(0)
                return ((fuente > dato.min && fuente < dato.max) ||
                    (dato.min === 0 && dato.max === 0))
            }
            if (tipo === 's') {//string
                fuente = fuente.toString().toLowerCase()
                dato = dato.toString().toLowerCase()
                return fuente.includes(dato)
            }
        }
        setFiltradoRows(rows.filter((p) => {
            if (ch(p.Provincia, fprov, 's')) {
                if (ch(p.Departamento, fdepa, 's')) {
                    if (ch(p.Uso, fUso, 's')) {
                        if (ch(p.fecha, ffecha, 's')) {
                            if (ch(p.Profundidad, { min: fprofmin, max: fprofmax }, 'r')) {
                                if (ch(p.NivelEstatico, { min: fNivelEstaticomin, max: fNivelEstaticomax }, 'r')) {
                                    if (ch(p.NivelDinamico, { min: fNivelDinamicomin, max: fNivelDinamicomax }, 'r')) {
                                        if (ch(p.Caudalmedio, { min: fCaudalmediomin, max: fCaudalmediomax }, 'r')) {
                                            return true
                                        }
                                    }
                                }
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
    }, [fprofmin,fprofmax,fdepa,fprov,fUso,ffecha,fNivelEstaticomin,fNivelEstaticomax,fNivelDinamicomin,fNivelDinamicomax,fCaudalmediomin,fCaudalmediomax])

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
            filtro: () => {
                return (
                    <>
                        <Box>
                            Provincia
                            <TextField onChange={(e) => setfprov(e.target.value)} value={fprov} size="small"/>
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
                        <Box>
                            Departamento
                            <TextField onChange={(e) => setfdepa(e.target.value)} value={fdepa} size="small"/>
                        </Box>
                    </>
                )
            },

        },
        {
            id: 'Uso',
            label: 'Uso',
            minWidth: 50,
            filtro: () => {
                return (
                    <>
                        <Box>
                            Uso
                            <TextField onChange={(e) => setfUso(e.target.value)} value={fUso} size="small" />
                        </Box>
                    </>
                )
            },
        },
        {
            id: 'fecha',
            label: 'Fecha',
            minWidth: 50,
            filtro: () => {
                return (
                    <>
                        <Box>
                            Fecha
                            <TextField onChange={(e) => setffecha(e.target.value)} value={ffecha} size="small"/>
                        </Box>
                    </>
                )
            },
        },
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
            id: 'NivelEstatico',
            label: 'Nivel Estatico',
            minWidth: 20,
            align: 'right',
            // format: (value) => value.toLocaleString('en-US'),
            filtro: () => {
                return (
                    <>
                        <Box sx={{ width: '18ch' }}>
                            Nivel Estatico
                            <TextField type="number" id="min" onChange={(e) => setfNivelEstaticomin(e.target.value)} value={fNivelEstaticomin} label="min" size="small" sx={{ width: '9ch' }} />
                            <TextField type="number" id="max" onChange={(e) => setfNivelEstaticomax(e.target.value)} value={fNivelEstaticomax} label="max" size="small" sx={{ width: '9ch' }} />
                        </Box>
                    </>
                )
            },
        },
        {
            id: 'NivelDinamico',
            label: 'Nivel Dinamico',
            minWidth: 20,
            align: 'right',
            // format: (value) => value.toLocaleString('en-US'),
            filtro: () => {
                return (
                    <>
                        <Box sx={{ width: '18ch' }}>
                            Nivel Dinamico
                            <TextField type="number" id="min" onChange={(e) => setfNivelDinamicomin(e.target.value)} value={fNivelDinamicomin} label="min" size="small" sx={{ width: '9ch' }} />
                            <TextField type="number" id="max" onChange={(e) => setfNivelDinamicomax(e.target.value)} value={fNivelDinamicomax} label="max" size="small" sx={{ width: '9ch' }} />
                        </Box>
                    </>
                )
            },
        },
        {
            id: 'Caudalmedio',
            label: 'Caudal',
            minWidth: 20,
            align: 'right',
            // format: (value) => value.toLocaleString('en-US'),
            filtro: () => {
                return (
                    <>
                        <Box sx={{ width: '18ch' }}>
                            Nivel Dinamico
                            <TextField type="number" id="min" onChange={(e) => setfCaudalmediomin(e.target.value)} value={fCaudalmediomin} label="min" size="small" sx={{ width: '9ch' }} />
                            <TextField type="number" id="max" onChange={(e) => setfCaudalmediomax(e.target.value)} value={fCaudalmediomax} label="max" size="small" sx={{ width: '9ch' }} />
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
            <Typography variant="h5">Listado de pozos</Typography>
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