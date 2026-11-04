import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import TentangKami from './pages/TentangKami';
import Dashboard from './pages/Dashboard';
import Recap from './pages/Recap';
import Edukasi from './pages/Edukasi';
import DetailEdukasi from './pages/DetailEdukasi'; // 1. Impor komponen ini
import Pengaturan from './pages/Pengaturan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tentangkami" element={<TentangKami />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recap" element={<Recap />} />
        <Route path="/edukasi" element={<Edukasi />} />
        
        {/* 2. Rute Dinamis untuk membaca berita spesifik */}
        <Route path="/edukasi/:id" element={<DetailEdukasi />} /> 
        
        <Route path="/pengaturan" element={<Pengaturan />} />
      </Routes>
    </Router>
  );
}

export default App;