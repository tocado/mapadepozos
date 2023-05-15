import React, { useState, useEffect } from 'react';
import { TextField, Grid, MenuItem, Select, InputLabel, FormControl, Button } from '@mui/material';
import { useDispatch } from 'react-redux'
import { setFiltro } from '../reducers/RfiltroPozos';

const FiltroCamposTablaPozos = ({ datos, setFiltroDatos }) => {
    const dispatch = useDispatch()
    const [usos, setUsos] = useState([])
    const [filtro, setFiltros] = useState({
        name: "",
        Provincia: "",
        Departamento: "",
        Uso: "",
        fechamin: "",
        fechamax: "",
        Profundidadmin: "",
        Profundidadmax: "",
        NivelEstaticomin: "",
        NivelEstaticomax: "",
        NivelDinamicomin: "",
        NivelDinamicomax: "",
        Caudalmediomin: "",
        Caudalmediomax: "",
        DuenioDelDato: "",
    })
    const adecuarFiltro = (f) => {
        dispatch(setFiltro({
            name: f.name,
            Provincia: f.Provincia,
            Departamento: f.Departamento,
            Uso: f.Uso,
            fecha: {
                min: f.fechamin,
                max: f.fechamax,
            },
            Profundidad: {
                min: f.Profundidadmin,
                max: f.Profundidadmax,
            },
            NivelEstatico: {
                min: f.NivelEstaticomin,
                max: f.NivelEstaticomax,
            },
            NivelDinamico: {
                min: f.NivelDinamicomin,
                max: f.NivelDinamicomax,
            },
            Caudalmedio: {
                min: f.Caudalmediomin,
                max: f.Caudalmediomax,
            },
            DuenioDelDato: f.DuenioDelDato,
        }))
    }
    useEffect(() => {
        let usosTemp = datos.map((d, i) => {
            return d.Uso
        })
        const usost = [...new Set(usosTemp)];
        setUsos(usost)
    }, [datos])
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFiltros((prevState) => {
            //adecuarFiltro({ ...prevState, [name]: value })
            //setFiltroDatos({ ...prevState, [name]: value })
            return { ...prevState, [name]: value }
        });
    };
    return (
        <form>
            <Grid container spacing={1} justifyContent="flex-start"
                sx={{
                    '& .MuiTextField-root': { width: '85%', marginBottom: 1 },
                    ml:1,
                    pr:1,
                }}>
                <Grid item xs={12}>
                    <FormControl sx={{ minWidth: '85%' }} size="small">
                        <InputLabel id="label-usos">Uso</InputLabel>
                        <Select
                            labelId="label-usos"
                            label="Usos"
                            name="Uso"
                            onChange={handleInputChange}
                            defaultValue=""
                            size="small"
                            value={filtro.Uso}
                            sx={{width:'100%'}}
                        >
                            <MenuItem value={""} label="todos">Todos</MenuItem>
                            {usos.map((r, i) => {
                                return (
                                    <MenuItem key={i} value={r}>{r}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={11}>
                    <Grid container justifyContent="flex-start">
                        <Grid item xs={6}>
                            <TextField
                                label="Fecha Min"
                                name="fechamin"
                                size="small"
                                type="date"
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 9 } }}
                                onChange={handleInputChange}
                                value={filtro.fechamin}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                sx={{ fontSize: "3px" }}
                                label="Fecha Max"
                                name="fechamax"
                                type="date"
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 9 } }}
                                size="small"
                                variant="filled"
                                onChange={handleInputChange}
                                value={filtro.fechamax}
                            />
                        </Grid>
                    </Grid>
                </Grid>


                <Grid item xs={11}>
                    <Grid container justifyContent="flex-start">
                        <Grid item xs={6}>
                            <TextField
                                label="Prof Min"
                                name="Profundidadmin"
                                variant="outlined"
                                size="small"
                                type="number"
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 10 } }}
                                onChange={handleInputChange}
                                value={filtro.Profundidadmin}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                sx={{ fontSize: "3px" }}
                                label="Prof Max"
                                name="Profundidadmax"
                                type="number"
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 10 } }}
                                variant="outlined"
                                size="small"
                                onChange={handleInputChange}
                                value={filtro.Profundidadmax}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={11}>
                    <Grid container justifyContent="flex-start">
                        <Grid item xs={6}>
                            <TextField
                                label="Caudal Min"
                                name="Caudalmediomin"
                                variant="outlined"
                                size="small"
                                type="number"
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 10 } }}
                                onChange={handleInputChange}
                                value={filtro.Caudalmediomin}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                sx={{ fontSize: "3px" }}
                                label="Caudal Max"
                                name="Caudalmediomax"
                                type="number"
                                inputProps={{ style: { fontSize: 12 } }}
                                InputLabelProps={{ style: { fontSize: 10 } }}
                                variant="outlined"
                                size="small"
                                onChange={handleInputChange}
                                value={filtro.Caudalmediomax}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} className='filtroPozosCampo'>
                    <Button onClick={() => adecuarFiltro(filtro)} variant='contained' sx={{width:'85%', color: 'black', background: '#9bddf6'}}>
                        Aplicar Filtros
                    </Button>
                </Grid>
                {/* <Grid item xs={12} className="filtroPozosCampo">
                    <TextField
                        label="Fuente"
                        name="DuenioDelDato"
                        size="small"
                        onChange={handleInputChange}
                        value={filtro.DuenioDelDato}
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                    />
                </Grid> */}
            </Grid>
        </form >
    );
};

export default FiltroCamposTablaPozos;