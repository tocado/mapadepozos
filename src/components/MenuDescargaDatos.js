import React, { useState } from 'react';
import { Button, MenuItem } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import { CSVLink } from "react-csv";

export default function MenuDescargaDatos({ data }) {
    const headers = [
        { label: "ID Pozo", key: "name" },
        { label: "Provincia", key: "Provincia" },
        { label: "Departamento", key: "Departamento" },
        { label: "Uso", key: "Uso" },
        { label: "Fecha", key: "fecha" },
        { label: "Profundidad (m)", key: "Profundidad" },
        { label: "NE (m)", key: "NivelEstatico" },
        { label: "ND (m)", key: "NivelDinamico" },
        { label: "Caudal (m3/h)", key: "Caudalmedio" },
        { label: "Fuente", key: "DuenioDelDato" },
    ]
    const csvReport = {
        data: data,
        headers: headers,
        filename: 'pozos.csv'
    }
    const downloadJSON = () => {
        const datos = data.map((r) => {
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
        // Create a blob with the data we want to download as a file
        const blob = new Blob([JSON.stringify(datos)], { type: 'text/json' })
        // Create an anchor element and dispatch a click event on it
        // to trigger a download
        const a = document.createElement('a')
        a.download = 'pozos.json'
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const StyledMenu = styled((props) => (
        <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
        />
    ))(({ theme }) => ({
        '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                    fontSize: 18,
                    color: theme.palette.text.secondary,
                    marginRight: theme.spacing(1.5),
                },
                '&:active': {
                    backgroundColor: alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ),
                },
            },
        },
    }));
    return (
        <>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardDoubleArrowDownIcon />}
                sx={{background: '#9bddf6', color: 'black'}}
            >
                Descarga
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} disableRipple>
                    <Button>
                        <CSVLink separator={";"} style={{textDecoration: "none", color: "#1976d2"}} {...csvReport}>CSV</CSVLink>
                    </Button>
                </MenuItem>
                <MenuItem disableRipple>
                    <Button onClick={downloadJSON}>JSON</Button>
                </MenuItem>
            </StyledMenu>
        </>
    )
}
