import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

function Info({titulo, casos, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* Titulo */}
                <Typography className="infoBox__titulo" color="textSecondary">
                    {titulo}
                </Typography>
                {/* Numeros de Casos */}
                <h2 className="infoBox__casos" >{casos}</h2>
                {/* Total */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Info
