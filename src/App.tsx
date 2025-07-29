import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tournament from './pages/Tournament';
import Rules from './pages/Rules';
import Champions from './pages/Champions';
import Register from './pages/Register';
import Groups from './pages/Groups';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-800 text-white">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/champions" element={<Champions />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={
            <div>
              <Admin />
            </div>
          } />
        </Routes>
        <Routes>
          <Route path="/admin" element={null} />
          <Route path="*" element={
            <>
              <Navigation />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;