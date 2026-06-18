import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';

// Placeholder Pages (will implement next)
import Dashboard from './pages/Dashboard';
import Projetos from './pages/Projetos';
import Tarefas from './pages/Tarefas';
import Responsaveis from './pages/Responsaveis';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/tarefas" element={<Tarefas />} />
            <Route path="/responsaveis" element={<Responsaveis />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
