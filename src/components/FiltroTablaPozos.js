import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemButton, ListItemIcon, MenuItem, Select } from "@mui/material";
import WaterIcon from '@mui/icons-material/Water';

const FiltroTablaPozos = (props) => {
    const { data, setTablaPozos, cambioProvinciaL, provv } = props;
    const [provincias, setProvincias] = useState([])
    const [pozosFiltrados, setPozosFiltrados] = useState([])
    const [departamentos, setDepartamentos] = useState([])
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(false)

    const cambioProvincia = (e) => {
        let filtroDepa = data.filter((r) => {
            return r.Provincia === e.target.value
        })
        let depaTemp = filtroDepa.map((d, i) => d.Departamento)
        const depa = [...new Set(depaTemp)];
        setDepartamentos(depa)
        setPozosFiltrados(filtroDepa)
        setTablaPozos(filtroDepa)
        setProvinciaSeleccionada(e.target.value)
        return cambioProvinciaL({Provincia:e.target.value})
    }
    const cambioDepartamento = (e) => {
        const PozosFinal = pozosFiltrados.filter((d) => d.Provincia === provinciaSeleccionada && d.Departamento === e.target.value)
        cambioProvinciaL({Provincia:provinciaSeleccionada, Departamento: e.target.value})
        if (PozosFinal.length > 0) {
            return setTablaPozos(PozosFinal)
        }
    }
    useEffect(() => {
        let provTemp = data.map((d, i) => {
            return d.Provincia
        })
        const provi = [...new Set(provTemp)];
        setProvincias(provi)
    }, [data])
    useEffect(() => {
        if (!provv) {
            setProvinciaSeleccionada(false)
        }
    }, [provv])
    return <List>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <WaterIcon />{provv}
                </ListItemIcon>
                <Select
                    id="label-provincias"
                    label="Provincias"
                    onChange={cambioProvincia}
                    defaultValue={false}
                    size="small"
                >
                    <MenuItem selected={true} value={false} label="Provincias">Provincias</MenuItem>
                    {provincias.map((r, i) => {
                        return (
                            <MenuItem key={i} value={r}>{r}</MenuItem>
                        )
                    })}
                </Select>
            </ListItemButton>
        </ListItem>
        {provinciaSeleccionada !== false? <ListItem>
            <ListItemButton>
                <Select
                    id="label-departamentos"
                    label="Departamentos"
                    onChange={cambioDepartamento}
                    defaultValue={false}
                    size="small"
                >
                    <MenuItem selected={true} value={false} label="Departamentos">Departamentos</MenuItem>
                    {departamentos.map((r, i) => {
                        return (
                            <MenuItem key={i} value={r}>{r}</MenuItem>
                        )
                    })}
                </Select>
            </ListItemButton>
        </ListItem> : <></>
        }
    </List>
};

export default FiltroTablaPozos;
