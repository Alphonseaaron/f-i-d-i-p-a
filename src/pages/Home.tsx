import React from 'react';
import About from '../sections/About';
import Programs from '../sections/Programs';
import Projects from '../sections/Projects';
import Blog from '../sections/Blog';
import Contact from '../sections/Contact';
import HomeHero from '../sections/Home';

export default function Home() {
  return (
    <div>
      <HomeHero />
      <About />
      <Programs />
      <Projects />
      <Blog />
      <Contact />
    </div>
  );
}