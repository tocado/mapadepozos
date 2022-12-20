import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function GraficoCard({ valor = 0, etiqueta = "", background = "red", color = "white" } = {}) {
    return (
        <Card style={{ backgroundColor: background }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} style={{ color: color, fontWeight: 1000 }} gutterBottom>
                    {etiqueta}
                </Typography>
                <Typography variant="h1" style={{ color: color, fontWeight: 1000 }} align="center">
                    {valor}
                </Typography>
            </CardContent>
        </Card>
    );
}