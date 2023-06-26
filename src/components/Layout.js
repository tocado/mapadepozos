import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MapView from './MapView'
import OpacityIcon from '@mui/icons-material/Opacity';
import WaterIcon from '@mui/icons-material/Water';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Grid } from '@mui/material';
import * as topojson from "topojson-client";
import dataPozos from '../assets/pozos.json'
import provincias from "./provincias.json"
import ListadoDatos from "./ListadoDatos"
import logoCohife from '../assets/logo_COHIFE_transparente.png'
import logoMinisterio from '../assets/logo_MINISTERIO.png'
import FiltroTablaPozos from './FiltroTablaPozos'
import FiltroCamposTablaPozos from "./FiltroCamposTablaPozos";
import CircleIcon from '@mui/icons-material/Circle'
import MenuCambioMapa from "./MenuCambioMapa";

const drawerWidth = 240;

function Layout(props) {
    const [map, setMap] = useState(false)
    const [capaActivada, setCapaActivada] = useState({
        cuencas: false,
        pozos: false,
    })
    const [cuencas, setCuencas] = useState({})
    const [cuencasFiltradas, setCuencasFiltradas] = useState({})
    // const [provinciaSel, setProvinciaSel] = useState(false)
    const [provinciasFiltradas, setProvinciasFiltradas] = useState({})
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [tablaPozos, setTablaPozos] = useState([]);
    const [filtroProv, setFiltroProv] = useState(false);
    const [FiltroDataPozos, setFiltroDataPozos] = useState({
        name: "",
        Provincia: "",
        Departamento: "",
        Uso: "",
        fecha: {
            min: "",
            max: "",
        },
        Profundidad: {
            min: "",
            max: "",
        },
        NivelEstatico: {
            min: "",
            max: "",
        },
        NivelDinamico: {
            min: "",
            max: "",
        },
        Caudalmedio: {
            min: "",
            max: "",
        },
        DuenioDelDato: "",
    })
    const setFiltroDatos = (filtro) => {
        console.log("setFiltroDatos")
        setFiltroDataPozos({
            name: filtro.name,
            Provincia: filtro.Provincia,
            Departamento: filtro.Departamento,
            Uso: filtro.Uso,
            fecha: {
                min: filtro.fechamin,
                max: filtro.fechamax,
            },
            Profundidad: {
                min: filtro.Profundidadmin,
                max: filtro.Profundidadmax,
            },
            NivelEstatico: {
                min: filtro.NivelEstaticomin,
                max: filtro.NivelEstaticomax,
            },
            NivelDinamico: {
                min: filtro.NivelDinamicomin,
                max: filtro.NivelDinamicomax,
            },
            Caudalmedio: {
                min: filtro.Caudalmediomin,
                max: filtro.Caudalmediomax,
            },
            DuenioDelDato: filtro.DuenioDelDato,
        })
        console.log("endSetFiltroDatos")
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    useEffect(() => {
        fetch('cuencastopo.json').then((res) => {
            res.json().then((jsonCuencas) => {
                const cuencasPreparadas = topojson.feature(jsonCuencas, jsonCuencas.objects.cuencas)
                setCuencas(cuencasPreparadas)
            })
        })
    }, [])
    const pozos = dataPozos.map(function (o) {
        return {
            // description: o.desc,
            // provincia: o.Provincia,
            ...o,
            names: <>
                <h5>{o.name}</h5>
                <table>
                    <tr>
                        <th>
                            ID Pozo
                        </th>
                        <td>
                            {o.name}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Caudal (m3/h)
                        </th>
                        <td>
                            {o.Caudalmedio || '-'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Profundidad (m)
                        </th>
                        <td>
                            {o.Profundidad || '-'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            ND (m)
                        </th>
                        <td>
                            {o.NivelDinamico || '-'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            NE (m)
                        </th>
                        <td>
                            {o.NivelEstatico || '-'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Uso
                        </th>
                        <td>
                            {o.Uso || '-'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Provincia
                        </th>
                        <td>
                            {o.Provincia || '-'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Fuente
                        </th>
                        <td>
                            {o.DuenioDelDato || '-'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Latitud
                        </th>
                        <td>
                            {o.x || '-'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Long
                        </th>
                        <td>
                            {o.y || '-'}
                        </td>
                    </tr>
                </table>
            </>,
            geometry: [
                o.y,
                o.x
            ]
        }
    })
    const [pozosFiltrados, setPozosFiltrados] = useState(pozos)
    const provinciasLocation = [
        { nombre: "CABA", pos: [-34.6038, -58.4253], z: 12 },
        { nombre: "Buenos Aires", pos: [-37.3003, -59.2601], z: 6 },
        { nombre: "Catamarca", pos: [-27.1862, -67.3577], z: 7 },
        { nombre: "Chaco", pos: [-25.8493, -60.6119], z: 7 },
        { nombre: "Chubut", pos: [-44.0244, -68.3770], z: 7 },
        { nombre: "Córdoba", pos: [-32.3614, -63.1267], z: 7 },
        { nombre: "Corrientes", pos: [-28.9505, -57.7877], z: 8 },
        { nombre: "Entre Ríos", pos: [-31.9894, -59.0179], z: 8 },
        { nombre: "Formosa", pos: [-24.5971, -60.0077], z: 7 },
        { nombre: "Jujuy", pos: [-23.3120, -65.6102], z: 8 },
        { nombre: "La Pampa", pos: [-37.2828, -65.4783], z: 7 },
        { nombre: "La Rioja", pos: [-29.4970, -67.4335], z: 7 },
        { nombre: "Mendoza", pos: [-34.6694, -69.0591], z: 7 },
        { nombre: "Misiones", pos: [-26.8045, -54.5046], z: 8 },
        { nombre: "Neuquén", pos: [-38.7027, -69.9494], z: 7 },
        { nombre: "Rio Negro", pos: [-40.2124, -66.3796], z: 7 },
        { nombre: "Salta", pos: [-24.4871, -64.9957], z: 7 },
        { nombre: "San Juan", pos: [-30.6285, -69.0376], z: 7 },
        { nombre: "San Luis", pos: [-33.6695, -66.2255], z: 7 },
        { nombre: "Santa Cruz", pos: [-49.0667, -69.7409], z: 7 },
        { nombre: "Santa Fe", pos: [-31.2410, -60.6676], z: 7 },
        { nombre: "Santiago del Estero", pos: [-27.8002, -63.1063], z: 7 },
        { nombre: "Tierra del Fuego, Antártida e Islas del Atlántico Sur", pos: [-53.8525, -66.5119], z: 7 },
        { nombre: "Tucumán", pos: [-27.0249, -65.2036], z: 9 },
    ]
    const verPozos = (estado) => {
        const colecciones = document.querySelectorAll("div.leaflet-control-layers-overlays label")
        const input = Array.from(colecciones).find(el => el.textContent === ' Pozos')

        if (input && input.firstChild.firstChild.checked !== estado) {
            input.firstChild.firstChild.click()
        }
        const capa = { pozos: estado }
        setCapaActivada(capaActivada => ({ ...capaActivada, ...capa }))
    }
    const verCuencas = (estado) => {
        const colecciones = document.querySelectorAll("div.leaflet-control-layers-overlays label")
        const input = Array.from(colecciones).find(el => el.textContent === ' Cuencas')

        if (input && input.firstChild.firstChild.checked !== estado) {
            input.firstChild.firstChild.click()
        }
        const capa = { cuencas: estado }
        setCapaActivada(capaActivada => ({ ...capaActivada, ...capa }))
    }
    const cambioProvincia = (f) => {
        // setProvinciaSel(f.Provincia)
        const prov = provinciasLocation.filter((r) => {
            return r.nombre === f.Provincia
        })[0]
        map.setView([prov.pos[0], prov.pos[1]], prov.z);

        //provincias
        let features = provincias.features.filter((r) => {
            return r.properties.name.toLowerCase() === prov.nombre.toLowerCase()
        })
        let filtradas = {
            type: provincias.type,
            crs: provincias.crs,
            features: features,
        }
        setProvinciasFiltradas(filtradas)

        /*cuencas
        features = cuencas.features.filter((r) => {
            return r.properties.jurisdiccion === prov.nombre
        })
        filtradas = {
            type: provincias.type,
            crs: provincias.crs,
            features: features,
        }
        setCuencasFiltradas(filtradas)
        */
        setPozosFiltrados(pozos.filter((r) => {
            return prov.nombre === r.Provincia && (!f.Departamento || r.Departamento === f.Departamento)
        }))
        //debugger
        verPozos(true)
        verCuencas(false)
    };
    const pozosPorCuenca = (c) => {
        //cuencas
        //console.log(cuencas)
        const features = cuencas.features.filter((r) => {
            return r.properties.CUENCA === c
        })
        const filtradas = {
            type: cuencas.type,
            features: features,
        }
        setCuencasFiltradas(filtradas)
        const pozosTemp = pozos.filter((r) => {
            //debugger
            return c.trim().toLowerCase() === r.cuenca.trim().toLowerCase()
        });
        setPozosFiltrados(pozosTemp)
        setTablaPozos(pozosTemp)
        verPozos(true)
        verCuencas(true)
    }
    const cambioMapa = (e) => {
        map.eachLayer((l) => {
            if (l._url) {
                l.setUrl(e.target.value)
            }
        })
    }
    const drawer = (
        <div>
            <Toolbar /><Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding onClick={() => {
                    //document.querySelector("div.leaflet-control-layers-overlays > label:nth-child(3) > span > input").click()
                    setCuencasFiltradas(cuencas)
                    setCuencasFiltradas({})
                    verCuencas(true)
                    verPozos(false)
                    setFiltroProv(Math.random())
                    //debugger
                }}>
                    <ListItemButton selected={capaActivada.cuencas}>
                        <ListItemIcon>
                            <WaterIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Cuencas'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => {
                    verPozos(!capaActivada.pozos)
                }}>
                    <ListItemButton selected={capaActivada.pozos}>
                        <ListItemIcon>
                            <OpacityIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Pozos'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            {dataPozos.length > 0 ? <FiltroTablaPozos cambioProvinciaL={cambioProvincia} data={dataPozos} setTablaPozos={setTablaPozos} provv={filtroProv} /> : <></>}
            {tablaPozos.length ?
                <>
                    <FiltroCamposTablaPozos datos={tablaPozos} setFiltroDatos={setFiltroDatos} />
                </> :
                <></>
            }
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'grid' }}>
            <CssBaseline />
            <Box sx={{ display: 'grid', flexGrow: 1, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar />
                <Toolbar sx={{ p: 0, m: 0, }}>
                    <Box sx={{ p: 0, }}>
                        <List sx={{ ml: -3, pr: 3 }}>
                            <ListItem disablePadding onClick={() => {
                                // setProvinciasFiltradas(provincias)
                                setProvinciasFiltradas({})
                                //setCuencasFiltradas(cuencas)
                                setCuencasFiltradas({})
                                setTablaPozos([])
                                setPozosFiltrados(pozos)
                                setFiltroProv(Math.random())
                                map.setView([-38.5094661, -73.8996827], 4);
                            }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <RefreshIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={'Restablecer Filtro'} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'grid' }}>
                        <Typography variant="body1" align="right" sx={{ pr: 4 }}>
                            Concentración de número de pozos en el área:
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'grid' }}>
                        <Typography variant="body1" align="left">
                            <CircleIcon fontSize="smallest" sx={{ color: "#f2994a" }} /> Mayor
                            <CircleIcon fontSize="smallest" sx={{ color: "#f2c94c" }} /> Intermedio
                            <CircleIcon fontSize="smallest" sx={{ color: "#27ae60" }} /> Menor
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0, display: 'grid' }}>
                        <MenuCambioMapa cambioMapa={cambioMapa} />
                    </Box>
                </Toolbar>
            </Box>

            <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'white' }}>
                <Toolbar>
                    <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                        <Grid item xs={8}>
                            <Typography variant="h4" noWrap sx={{ color: '#37bbed' }}>
                                SIAS - Sistema de Información de Aguas Subterr&aacute;neas
                            </Typography>
                        </Grid>
                        <Grid item xs={1} sx={{ textAlign: "right" }}>
                            <img src={logoMinisterio} height="55" alt="logo del ministerio"/>
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: "center" }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>
                                Secretaria de infraestructura y<br /> Política hidrica
                            </Typography>
                        </Grid>
                        <Grid item xs={1} sx={{ textAlign: "right" }}>
                            <img src={logoCohife} height="35" alt="logo cohife"/>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="Opciones"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, pt: 0, ml: `${drawerWidth}px`, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Grid container spacing={5} justifyContent="space-around">
                    <Grid item xs={12}>
                        <MapView mapa={map} pozosPorCuenca={pozosPorCuenca} cuencas={cuencasFiltradas} setMap={setMap} markers={pozosFiltrados} provincias={provinciasFiltradas} />
                        <Typography align="right">seleccione una cuenca para ver sus respectivos pozos</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {tablaPozos.length > 0 ? <ListadoDatos data={tablaPozos} FiltroDataPozos={FiltroDataPozos} /> : <></>}
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
}

Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Layout;