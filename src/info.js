import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Info.css';

function Info({titulo, casos, isRed, active, total, ...props }) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
            <CardContent>
                {/* Titulo */}
                <Typography className="infoBox__titulo" color="textSecondary">
                    {titulo}
                </Typography>
                {/* Numeros de Casos */}
                <h2 className={`infoBox__casos ${!isRed && "infoBox_casos--green"}`}>{casos}</h2>
                {/* Total */}
                <Typography className="infoBox__total" color="textSecondary">
                    Total: {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Info
