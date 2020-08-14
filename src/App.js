import React, { useState, useEffect } from 'react';
import { 
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import Info from './info';
import Map from './Map';
import Table from './Table';
import { sortData } from './Util';
import './App.css';

function App() {
  const URL_PAISES = "https://disease.sh/v3/covid-19/countries/"; // API utilizada
  const URL_ALL = "https://disease.sh/v3/covid-19/all";
  
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState('Mundial');
  const [paisInfo, setPaisInfo] = useState({});
  const [tableData, setTableData] = useState([]);

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
    })
  }

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
          <Info titulo="Casos de Coronavirus" casos={paisInfo.todayCases} total={paisInfo.cases} />
          {/* Info Casos Recuperados */}
          <Info titulo="Recuperados" casos={paisInfo.todayRecovered} total={paisInfo.recovered} />
          {/* Info Mortes */}
          <Info titulo="Mortes" casos={paisInfo.todayDeaths} total={paisInfo.deaths} />
        </div>

        {/* Mapa */}
        <Map />
      </div>
      <Card className="app__direito">
        <CardContent>
          {/* Tabela */}
          <h3>Casos Por Paises</h3>
          <Table paises={tableData} />

          {/* Grafico */}
          <h3>Novos Casos no Mundo</h3>
        </CardContent>
      </Card>      
    </div>
  );
}

export default App;
