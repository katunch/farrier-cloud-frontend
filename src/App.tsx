import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-8 bg-gray-100 min-h-screen mt-16">
            <AppRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;