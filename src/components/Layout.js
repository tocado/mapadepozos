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
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Grid } from '@mui/material';
import * as topojson from "topojson-client";
import dataPozos from '../assets/pozos.json'
import provincias from "./provincias.json"
import ListadoDatos from "./ListadoDatos"
import logo from '../assets/logo.jpg'
import FiltroTablaPozos from './FiltroTablaPozos'
import FiltroCamposTablaPozos from "./FiltroCamposTablaPozos";
import Switch from '@mui/material/Switch';

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
                            Nombre
                        </th>
                        <td>
                            {o.name}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Caudal Medio
                        </th>
                        <td>
                            {o.Caudalmedio || '-'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Profundiad
                        </th>
                        <td>
                            {o.Profundidad || '-'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            NivelDinamico
                        </th>
                        <td>
                            {o.NivelDinamico || '-'}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            NivelEstatico
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
        if (e.target.checked) {
            map._layers[27].setUrl("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
        } else {
            map._layers[27].setUrl("https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_topo@EPSG%3A3857@png/{z}/{x}/{-y}.png")
        }
    }
    const drawer = (
        <div>
            {/* <Toolbar /> */}
            <img
                src={logo}
                width={drawerWidth}
                style={{
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    paddingTop: "20px",
                    margin: "0px",
                }}
                alt="logo"
            />
            <List>
                <ListItem disablePadding onClick={() => {
                    setProvinciasFiltradas(provincias)
                    setCuencasFiltradas(cuencas)
                    setPozosFiltrados(pozos)
                    map.setView([-38.5094661, -73.8996827], 4);
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <MyLocationIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Argentina'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding onClick={() => {
                    //document.querySelector("div.leaflet-control-layers-overlays > label:nth-child(3) > span > input").click()
                    setProvinciasFiltradas({})
                    setCuencasFiltradas(cuencas)
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
                    <Divider />
                    <FiltroCamposTablaPozos datos={tablaPozos} setFiltroDatos={setFiltroDatos} />
                </> :
                <></>
            }
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                        <Grid item xs={10}>
                            <Typography variant="h6" noWrap component="div">
                                SIAS - Sistema de información de aguas subterr&aacute;neas
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: "right" }}>
                            IGN <Switch defaultChecked color="default" value="OSM" onChange={cambioMapa} /> OSM
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
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
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, pt: 7, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
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
        </Box>
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