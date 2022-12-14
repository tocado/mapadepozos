import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MapView from './MapView'
import OpacityIcon from '@mui/icons-material/Opacity';
import WaterIcon from '@mui/icons-material/Water';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Grid } from '@mui/material';
import * as topojson from "topojson-client";
import dataPozos from '../assets/csvjson.json'
import provincias from "./provincias.json"
import ListadoDatos from "./ListadoDatos"
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
const drawerWidth = 240;

function Layout(props) {
    const [map, setMap] = useState(false)

    const [cuencas, setCuencas] = useState({})
    const [cuencasFiltradas, setCuencasFiltradas] = useState({})

    const [provinciasFiltradas, setProvinciasFiltradas] = useState({})
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        fetch('cuencastopo.json').then((res) => {
            res.json().then((jsonCuencas) => {
                const cuencasPreparadas = topojson.feature(jsonCuencas, jsonCuencas.objects.cuencas)
                setCuencas(cuencasPreparadas)
                //setCuencasFiltradas(cuencasPreparadas)
            })
        })
    }, [])
    const pozos = dataPozos.map(function (o) {
        return {
            description: o.desc,
            provincia: o.Provincia,
            name: <>
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
                </table>
            </>,
            geometry: [
                o.y,
                o.x
            ]
        }
    })
    const [pozosFiltrados, setPozosFiltrados] = useState([])
    const provinciasLocation = [
        { nombre: "CABA", pos: [-34.6038, -58.4253], z: 12 },
        { nombre: "Buenos Aires", pos: [-37.3003, -59.2601], z: 7 },
        { nombre: "Catamarca", pos: [-27.1862, -67.3577], z: 7 },
        { nombre: "Chaco", pos: [-25.8493, -60.6119], z: 7 },
        { nombre: "CHUBUT", pos: [-44.0244, -68.3770], z: 7 },
        { nombre: "C??rdoba", pos: [-32.3614, -63.1267], z: 7 },
        { nombre: "Corrientes", pos: [-28.9505, -57.7877], z: 8 },
        { nombre: "Entre Rios", pos: [-31.9894, -59.0179], z: 8 },
        { nombre: "Formosa", pos: [-24.5971, -60.0077], z: 7 },
        { nombre: "Jujuy", pos: [-23.3120, -65.6102], z: 8 },
        { nombre: "La Pampa", pos: [-37.2828, -65.4783], z: 7 },
        { nombre: "La Rioja", pos: [-29.4970, -67.4335], z: 7 },
        { nombre: "Mendoza", pos: [-34.6694, -69.0591], z: 7 },
        { nombre: "Misiones", pos: [-26.8045, -54.5046], z: 8 },
        { nombre: "Neuqu??n", pos: [-38.7027, -69.9494], z: 7 },
        { nombre: "R??o Negro", pos: [-40.2124, -66.3796], z: 7 },
        { nombre: "Salta", pos: [-24.4871, -64.9957], z: 7 },
        { nombre: "San Juan", pos: [-30.6285, -69.0376], z: 7 },
        { nombre: "San Luis", pos: [-33.6695, -66.2255], z: 7 },
        { nombre: "Santa Cruz", pos: [-49.0667, -69.7409], z: 7 },
        { nombre: "Santa Fe", pos: [-31.2410, -60.6676], z: 7 },
        { nombre: "Santiago del Estero", pos: [-27.8002, -63.1063], z: 7 },
        { nombre: "Tierra del Fuego, Ant??rtida e Islas del Atl??ntico Sur", pos: [-53.8525, -66.5119], z: 7 },
        { nombre: "Tucum??n", pos: [-27.0249, -65.2036], z: 9 },
    ]
    const cambioProvincia = (event) => {
        const prov = provinciasLocation.filter((r) => {
            return r.nombre === event.target.value
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

        //cuencas
        features = cuencas.features.filter((r) => {
            return r.properties.jurisdiccion === prov.nombre
        })
        filtradas = {
            type: provincias.type,
            crs: provincias.crs,
            features: features,
        }
        setCuencasFiltradas(filtradas)
        setPozosFiltrados(pozos.filter((r) => {
            return prov.nombre === r.provincia
        }))
        //debugger
    };
    const drawer = (
        <div>
            <Toolbar />
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
                    const colecciones = document.querySelectorAll("div.leaflet-control-layers-overlays label")
                    const input = Array.from(colecciones).find(el => el.textContent === ' Cuencas')
                    input.children[0].children[0].click()
                    //debugger
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <WaterIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Cuencas'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => {
                    const colecciones = document.querySelectorAll("div.leaflet-control-layers-overlays label")
                    const input = Array.from(colecciones).find(el => el.textContent === ' Pozos')
                    input.children[0].children[0].click()
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <OpacityIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Pozos'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding onClick={() => {
                    //document.querySelector("div.leaflet-control-layers-overlays > label:nth-child(3) > span > input").click()
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <WaterIcon />
                        </ListItemIcon>
                        <Select
                            id="label-provincias"
                            label="Provincias"
                            onChange={cambioProvincia}
                            defaultValue={'CABA'}
                        >
                            {provinciasLocation.map((r, i) => {
                                return (
                                    <MenuItem key={i} value={r.nombre}>{r.nombre}</MenuItem>
                                )
                            })}
                        </Select>
                    </ListItemButton>
                </ListItem>
            </List>
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
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Sistema de informaci??n de aguas subterr&aacute;neas
                    </Typography>
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
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Grid container spacing={5} justifyContent="space-around">
                    <Grid item xs={12}>
                        <MapView cuencas={cuencasFiltradas} setMap={setMap} markers={pozosFiltrados} provincias={provinciasFiltradas} />
                    </Grid>
                    <Grid item xs={12}>
                        <ListadoDatos data={dataPozos} />
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