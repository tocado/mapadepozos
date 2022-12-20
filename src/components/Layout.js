import * as React from 'react';
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

const drawerWidth = 240;

function Layout(props) {
    const provincias = [
        { nombre: "CABA", pos: [-34.6038, -58.4253], z: 12 },
        { nombre: "Buenos Aires", pos: [-37.3003, -59.2601], z: 7 },
        { nombre: "Catamarca", pos: [-27.1862, -67.3577], z: 7 },
        { nombre: "Chaco", pos: [-25.8493, -60.6119], z: 7 },
        { nombre: "Chubut", pos: [-44.0244, -68.3770], z: 7 },
        { nombre: "Córdoba", pos: [-32.3614, -63.1267], z: 7 },
        { nombre: "Corrientes", pos: [-28.9505, -57.7877], z: 8 },
        { nombre: "Entre Rios", pos: [-31.9894, -59.0179], z: 8 },
        { nombre: "Formosa", pos: [-24.5971, -60.0077], z: 7 },
        { nombre: "Jujuy", pos: [-23.3120, -65.6102], z: 8 },
        { nombre: "La Pampa", pos: [-37.2828, -65.4783], z: 7 },
        { nombre: "La Rioja", pos: [-29.4970, -67.4335], z: 7 },
        { nombre: "Mendoza", pos: [-34.6694, -69.0591], z: 7 },
        { nombre: "Misiones", pos: [-26.8045,-54.5046], z: 8 },
        { nombre: "Neuquén", pos: [-38.7027,-69.9494], z: 7 },
        { nombre: "Rio Negro", pos: [-40.2124,-66.3796], z: 7 },
        { nombre: "Salta", pos: [-24.4871,-64.9957], z: 7 },
        { nombre: "San Juan", pos: [-30.6285,-69.0376], z: 7 },
        { nombre: "San Luis", pos: [-33.6695,-66.2255], z: 7 },
        { nombre: "Santa Cruz", pos: [-49.0667,-69.7409], z: 7 },
        { nombre: "Santa Fe", pos: [-31.2410,-60.6676], z: 7 },
        { nombre: "Santiago del Estero", pos: [-27.8002,-63.1063], z: 7 },
        { nombre: "Tierra del Fuego, Antártida e Islas del Atlántico Sur", pos: [-53.8525,-66.5119], z: 7 },
        { nombre: "Tucumán", pos: [-27.0249,-65.2036], z: 9 },

    ]
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [layerStatus, setLayerStatus] = React.useState({
        cuencas: false,
        pozos: false,
        posicion: {
            lat: -38.5094661,
            lng: -73.8996827
        },
        zoom: 4,
    });
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItem disablePadding onClick={() => {
                    setLayerStatus({
                        ...layerStatus,
                        zoom: 4,
                        posicion: {
                            lat: -38.5094661,
                            lng: -73.8996827
                        },
                    })
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
                    document.querySelector("div.leaflet-control-layers-overlays > label:nth-child(3) > span > input").click()
                    //setLayerStatus({ ...layerStatus, cuencas: !layerStatus.cuencas })
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <WaterIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Cuencas de Agua'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => {
                    document.querySelector("div.leaflet-control-layers-overlays > label:nth-child(1) > span > input").click()
                    //setLayerStatus({ ...layerStatus, pozos: !layerStatus.pozos })
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <OpacityIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Pozos de Agua'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                {provincias.map((r, i) => {
                    return (
                        <ListItem key={i} disablePadding onClick={() => {
                            setLayerStatus({
                                ...layerStatus,
                                zoom: r.z,
                                posicion: {
                                    lat: r.pos[0],
                                    lng: r.pos[1]
                                },
                            })
                        }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MyLocationIcon />
                                </ListItemIcon>
                                <ListItemText primary={r.nombre} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
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
                        Sistema de información de aguas subterr&aacute;neas
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
                <MapView layerStatus={layerStatus} />
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