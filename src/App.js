import React, { useState, useEffect } from 'react';
import { 
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import './App.css';

function App() {
  const URL_PAISES = "https://disease.sh/v3/covid-19/countries"; // API utilizada
  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState('Mundial');

  useEffect(() => {
    const getPaisesData = async () => {
      await fetch(URL_PAISES)
      .then((response) => response.json())
      .then((data) => {
        const paises = data.map((pais => ({
          name: pais.country, // nome completo vindo da API
          value: pais.countryInfo.iso2 // sigla do nome vindo da API
        })));
        setPaises(paises)
      });
    };
    getPaisesData();
  }, []);

  const onPaisChange = (event) => {
    const paisCodigo = event.target.value;
    setPais(paisCodigo);
  }

  return (
    <div className="App">
      
      {/* Header */}
      {/* Titulo + Campo de Seleção dropdown */}
      <div className="app__header">
        <h1>COVID 19</h1>
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

      {/* Info */}
      {/* Info */}
      {/* Info */}

      {/* Tabela */}
      {/* Grafico */}

      {/* Mapa */}
    </div>
  );
}

export default App;
