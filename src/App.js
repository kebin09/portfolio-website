import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      {!isLoading && (
        <>
          <CustomCursor />
          <Router>
            <Toaster position="top-right" />
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/" element={
                <>
                  <Navbar />
                  <Hero />
                  <About />
                  <Projects />
                  <Blog />
                  <Resume />
                  <Contact />
                  <Footer />
                </>
              } />
            </Routes>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;