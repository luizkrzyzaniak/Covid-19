import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';
import { popup } from 'leaflet';

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered:{
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths:{
        hex: "#fb4443",
        multiplier: 2000,
    }
};

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const mostrarDataNoMapa = (data, casesType='cases') => (
    data.map(pais => (
        <Circle
            center={[pais.countryInfo.lat, pais.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={Math.sqrt(pais[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag" style={{ backgroundImage: `url(${pais.countryInfo.flag})`}}></div>
                    <div className="info-name">{pais.country}</div>
                    <div className="info-cases">Casos: {numeral(pais.cases).format("0,0")}</div>
                    <div className="info-recovered">Recuperados: {numeral(pais.recovered).format("0,0")}</div>
                    <div className="info-deaths">Mortes: {numeral(pais.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
);