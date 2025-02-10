import React from 'react';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import Programs from './sections/Programs';
import Projects from './sections/Projects';
import Blog from './sections/Blog';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <main>
        <Home />
        <About />
        <Programs />
        <Projects />
        <Blog />
        <Contact />
      </main>
    </div>
  );
}

export default App;