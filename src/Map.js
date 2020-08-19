import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { mostrarDataNoMapa } from './Util';
import './Map.css';

function Map({paises, casesType, center, zoom}) {
    return (
        <div className="mapa">
            <LeafletMap center={center} zoom={zoom}> 
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">
                    OpenStreetMap</a> contributors'
                    />
                    {/* Desenhar circulos na tela */}
                    {mostrarDataNoMapa(paises, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map
