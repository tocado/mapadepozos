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
                    setLayerStatus({ ...layerStatus, cuencas: !layerStatus.cuencas })
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <WaterIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Cuencas de Agua'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => {
                    setLayerStatus({ ...layerStatus, pozos: !layerStatus.pozos })
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
                <ListItem disablePadding onClick={() => {
                    setLayerStatus({
                        ...layerStatus,
                        zoom: 8,
                        posicion: {
                            lat: -23.197202,
                            lng: -65.6820085
                        },
                    })
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <MyLocationIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Jujuy'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => {
                    setLayerStatus({
                        ...layerStatus,
                        zoom: 7,
                        posicion: {
                            lat: -31.1915329,
                            lng: -60.8802759
                        },
                    })
                }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <MyLocationIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Santa Fe'} />
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