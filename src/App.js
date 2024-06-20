import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import MainMint from "./MainMint";
import NavBar from "./NavBar";
import About from './About';
import Team from './Team';
import Roadmap from './Roadmap';

function App() {
    const [accounts, setAccounts] = useState([]);

    return (
        <Router>
            <div className="app-container">
                <NavBar accounts={accounts} setAccounts={setAccounts} />
                <MainMint accounts={accounts} setAccounts={setAccounts} />
            </div>

            <div className="background-container"></div>

            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/roadmap" element={<Roadmap />} />
            </Routes>
        </Router>
    );
}

export default App;
