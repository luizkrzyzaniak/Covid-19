import React, { useState, useEffect } from 'react';
import { 
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import 'leaflet/dist/leaflet.css';
import Info from './info';
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat } from './Util';
import Grafico from './Grafico';
import './App.css';
import Footer from './Footer';

function App() {
  const URL_PAISES = "https://disease.sh/v3/covid-19/countries/"; // API utilizada
  const URL_ALL = "https://disease.sh/v3/covid-19/all";
  
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState('Mundial');
  const [paisInfo, setPaisInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapPaises, setMapPaises] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch(URL_ALL)
    .then(response => response.json())
    .then(data => {
      setPaisInfo(data);
    })
  }, []);

  useEffect(() => {
    const getPaisesData = async () => {
      await fetch(URL_PAISES)
      .then((response) => response.json())
      .then((data) => {
        const paises = data.map((pais => ({
          name: pais.country, // nome completo vindo da API
          value: pais.countryInfo.iso2 // sigla do nome vindo da API
        })));
        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapPaises(data);
        setPaises(paises)
      });
    };
    getPaisesData();
  }, []);

  const onPaisChange = (event) => {
    const paisCodigo = event.target.value;

    const url = paisCodigo === 'Mundial' 
      ? URL_ALL 
      : URL_PAISES + paisCodigo;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setPais(paisCodigo);
      setPaisInfo(data);
        if(paisCodigo === 'Mundial'){
          setMapCenter([34.80746, -40.4796])
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        }
      setMapZoom(4);
    });
  };

  return (
    <div className="App">
      <div className="app__esquerdo">
        {/* Header */}
        {/* Titulo + Campo de Seleção dropdown */}
        <div className="app__header">
        <h1>COVID-19 {paisInfo.country}</h1>
          <FormControl className="app__dropdwon">
            <Select
              variant="outlined"
              onChange={onPaisChange}
              value={pais}
            >
            {/* Loop dos paises */}
            <MenuItem value="Mundial">Mundial</MenuItem>
            {
              paises.map(pais => (
                <MenuItem value={pais.value}>{pais.name}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          {/* Info Casos de Coronavirus */}
          <Info active={casesType === "cases"} onClick={e => setCasesType("cases")} titulo="Casos de Coronavirus" casos={prettyPrintStat(paisInfo.todayCases)} total={prettyPrintStat(paisInfo.cases)} />
          {/* Info Casos Recuperados */}
          <Info active={casesType === "recovered"} onClick={e => setCasesType("recovered")} titulo="Recuperados" casos={prettyPrintStat(paisInfo.todayRecovered)} total={prettyPrintStat(paisInfo.recovered)} />
          {/* Info Mortes */}
          <Info active={casesType === "deaths"} onClick={e => setCasesType("deaths")} titulo="Mortes" casos={prettyPrintStat(paisInfo.todayDeaths)} total={prettyPrintStat(paisInfo.deaths)} />
        </div>

        {/* Mapa */}
        <Map 
          casesType={casesType}
          paises={mapPaises}
          center={mapCenter}
          zoom={mapZoom}/>
      </div>
      <Card className="app__direito">
        <CardContent>
          {/* Tabela */}
          <h3>Casos Por Paises</h3>
          <Table paises={tableData} />

          {/* Grafico */}
          <h3>Novos no Mundo</h3>
          <Grafico casesType={casesType} />
        </CardContent>
      </Card>   
      <Footer />   
    </div>
  );
}

export default App;
