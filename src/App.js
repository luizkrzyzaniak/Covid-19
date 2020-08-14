import React from 'react';
import { 
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core';
import './App.css';

function App() {
  return (
    <div className="App">
      
      {/* Header */}
      <div className="app__header">
        <h1>COVID 19</h1>
        <FormControl className="app__dropdwon">
          <Select
            variant="outlined"
            value="abc"
          >
            <MenuItem value="Mundial">Mundial</MenuItem>
            <MenuItem value="Mundial">Mundial</MenuItem>
            <MenuItem value="Mundial">Mundial</MenuItem>
            <MenuItem value="Mundial">Mundial</MenuItem>
          </Select>
        </FormControl>
      </div>
      {/* Titulo + Campo de Seleção dropdown */}

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
