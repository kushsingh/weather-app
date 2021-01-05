import React from 'react';
import './App.css';
import Logo from './components/Logo/Logo'
import Forcast from "./components/Forecast/Forecast";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <h1>React Weather App</h1>
      </header>
      <main>
        <Forcast />
      </main>
      <footer>
        Page created by Kush Kumar Singh
      </footer>
    </div>
  );
}

export default App;
