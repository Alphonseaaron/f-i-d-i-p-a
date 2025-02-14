import React from 'react';
import About from '../sections/About';
import Programs from '../sections/Programs';
import Projects from '../sections/Projects';
import Blog from '../sections/Blog';
import Contact from '../sections/Contact';
import HomeHero from '../sections/Home';
import Team from '../sections/Team';

export default function Home() {
  return (
    <div>
      <HomeHero />
      <About />
      <Programs />
      <Projects />
      <Team />
      <Blog />
      <Contact />
    </div>
  );
}