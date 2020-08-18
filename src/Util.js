import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const mostrarDataNoMapa = (data, casesType='cases') => (
    data.map(pais => (
        <Circle
            center={[pais.countryInfo.lat, pais.countryInfo.long]}
            fillOpacity={0.4}>

        </Circle>
    ))
);