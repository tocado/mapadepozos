import React, { useEffect, useState } from 'react';
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
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux'
import { traeFiltro } from '../reducers/RfiltroPozos';
export default function ListadoDatos({ data, FiltroDataPozos }) {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataFinal, setDataFinal] = useState([]);
    const filtro = useSelector(traeFiltro)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    useEffect(() => {
        console.log("useEffect")
        setDataFinal(filtrarDatos(data))
        console.log("endUseEffect")
// eslint-disable-next-line        
    }, [filtro, data])

    const filtrarDatos = (array) => {
        console.log("filtrarDatos")
        const f = filtro;
        return array.filter((r) => {
            let rfecha = new Date()
            if (r.name.toLowerCase().includes(f.name.toLowerCase())) {
                if (r.Provincia.toLowerCase().includes(f.Provincia.toLowerCase())) {
                    if (r.Departamento.toLowerCase().includes(f.Departamento.toLowerCase())) {
                        if (r.Uso.toLowerCase().includes(f.Uso.toLowerCase())) {
                            if (r.DuenioDelDato.toLowerCase().includes(f.DuenioDelDato.toLowerCase())) {
                                if (
                                    (f.Profundidad.min === "" && f.Profundidad.max === "") ||
                                    (f.Profundidad.max === "" && parseInt(r.Profundidad) >= parseInt(f.Profundidad.min)) ||
                                    (f.Profundidad.min === "" && parseInt(r.Profundidad) <= parseInt(f.Profundidad.max)) ||
                                    (parseInt(r.Profundidad) >= parseInt(f.Profundidad.min) && parseInt(r.Profundidad) <= parseInt(f.Profundidad.max))
                                ) {
                                    if (
                                        (f.NivelEstatico.min === "" && f.NivelEstatico.max === "") ||
                                        (f.NivelEstatico.max === "" && parseInt(r.NivelEstatico) >= parseInt(f.NivelEstatico.min)) ||
                                        (f.NivelEstatico.min === "" && parseInt(r.NivelEstatico) <= parseInt(f.NivelEstatico.max)) ||
                                        (parseInt(r.NivelEstatico) >= parseInt(f.NivelEstatico.min) && parseInt(r.NivelEstatico) <= parseInt(f.NivelEstatico.max))
                                    ) {
                                        if (
                                            (f.NivelDinamico.min === "" && f.NivelDinamico.max === "") ||
                                            (f.NivelDinamico.max === "" && parseInt(r.NivelDinamico) >= parseInt(f.NivelDinamico.min)) ||
                                            (f.NivelDinamico.min === "" && parseInt(r.NivelDinamico) <= parseInt(f.NivelDinamico.max)) ||
                                            (parseInt(r.NivelDinamico) >= parseInt(f.NivelDinamico.min) && parseInt(r.NivelDinamico) <= parseInt(f.NivelDinamico.max))
                                        ) {
                                            if (
                                                (f.Caudalmedio.min === "" && f.Caudalmedio.max === "") ||
                                                (f.Caudalmedio.max === "" && parseInt(r.Caudalmedio) >= parseInt(f.Caudalmedio.min)) ||
                                                (f.Caudalmedio.min === "" && parseInt(r.Caudalmedio) <= parseInt(f.Caudalmedio.max)) ||
                                                (parseInt(r.Caudalmedio) >= parseInt(f.Caudalmedio.min) && parseInt(r.Caudalmedio) <= parseInt(f.Caudalmedio.max))
                                            ) {
                                                rfecha = new Date(r.fecha.split("-")[2], r.fecha.split("-")[1] - 1, r.fecha.split("-")[0])
                                                if (
                                                    (f.fecha.min === "" && f.fecha.max === "") ||
                                                    (f.fecha.max === "" && rfecha >= new Date(f.fecha.min)) ||
                                                    (f.fecha.min === "" && rfecha <= new Date(f.fecha.max)) ||
                                                    (rfecha >= new Date(f.fecha.min) && rfecha <= new Date(f.fecha.max))
                                                ) {
                                                    return r
                                                }
                                            }
                                        }
                                    }

                                }
                            }
                        }
                    }
                }
            }
            return false
        })
    }
    const columns = [
        {
            id: 'name',
            label: 'ID Pozo',
            minWidth: 170,
            align: 'left',
            format: (value) => value.toFixed(2),
            descripcion: "Código de identificación del pozo a nivel nacional",
        },
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
            descripcion: "Fecha de construcción o de registro del pozo",
        },
        {
            id: 'Profundidad',
            label: 'Profundidad (m)',
            minWidth: 20,
            align: 'right',
            descripcion: "Profundidad total del pozo en metros, según registro provincial",
        },
        {
            id: 'NivelEstatico',
            label: 'NE (m)',
            minWidth: 20,
            align: 'right',
            descripcion: "Nivel estático del agua en el pozo, medido en metro, al inicio de la operación o en fecha posterior",
        },
        {
            id: 'NivelDinamico',
            label: 'ND (m)',
            minWidth: 20,
            align: 'right',
            descripcion: "Nivel dinámico del agua en el pozo, medido en metro, al inicio de la operación o en fecha posterior",
        },
        {
            id: 'Caudalmedio',
            label: 'Caudal (m3/h)',
            minWidth: 20,
            align: 'right',
        },
        {
            id: 'DuenioDelDato',
            label: 'Fuente',
            minWidth: 20,
            align: 'right',
            descripcion: "Proveedor del dato",
        },
    ]
    function stableSort(array, comparator) {
        console.log("stableSort")
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    function descendingComparator(a, b, orderBy) {
        if (orderBy === "fecha") {
            const aa = new Date(a[orderBy].split("-")[2],a[orderBy].split("-")[1]-1,a[orderBy].split("-")[0])
            const bb = new Date(b[orderBy].split("-")[2],b[orderBy].split("-")[1]-1,b[orderBy].split("-")[0])
            if (bb < aa) {
                return -1;
            }
            if (bb > aa) {
                return 1;
            }            
        }

        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };
    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));
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
                <Table stickyHeader aria-label="sticky table" size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, i) => (
                                <TableCell
                                    key={column.id + i}
                                    align={column.align}
                                    style={{ fontWeight: "bolder" }}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={createSortHandler(column.id)}
                                    >
                                        {column.descripcion ? <HtmlTooltip
                                            title={
                                                <>
                                                    <Typography color="inherit"><b><i>{column.label}</i></b></Typography>
                                                    <em>{column.descripcion}</em>
                                                </>
                                            }
                                        >
                                            <Stack direction="row" alignItems="center" gap={1}>
                                                <InfoIcon sx={{ fontSize: 15 }} />
                                                <typography xclassName="inlinenowrap">{column.label}</typography>
                                            </Stack>
                                        </HtmlTooltip> : <typography>{column.label}</typography>
                                        }
                                        {orderBy === column.id ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>

                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stableSort(dataFinal, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
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