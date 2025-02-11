import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

export default function ProgramDetail() {
  const { slug } = useParams();

  // In a real app, fetch the program data using the slug
  const program = {
    title: "Peace, Gender Mainstream & Governance Advocacy",
    description: `Our Peace, Gender Mainstream & Governance Advocacy program is dedicated to promoting sustainable peace, gender equality, and good governance through community-based initiatives and advocacy programs.

    Through this program, we work closely with local communities to:
    • Promote peaceful conflict resolution
    • Advocate for gender equality and women's rights
    • Support good governance initiatives
    • Build capacity for community leadership`,
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1600",
    objectives: [
      "Strengthen community peace-building mechanisms",
      "Promote gender equality and women's empowerment",
      "Enhance governance and accountability",
      "Build community resilience"
    ],
    impact: {
      beneficiaries: "10,000+",
      communities: "25",
      successRate: "85%"
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <BackButton />
      <div className="max-w-4xl mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="rounded-lg overflow-hidden h-[400px]">
            <img 
              src={program.image} 
              alt={program.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <h1 className="text-4xl font-bold">{program.title}</h1>
            
            <div className="prose prose-invert max-w-none">
              {program.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Key Objectives</h2>
              <ul className="grid md:grid-cols-2 gap-4">
                {program.objectives.map((objective, index) => (
                  <li 
                    key={index}
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Program Impact</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-dark-lighter p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {program.impact.beneficiaries}
                  </div>
                  <div className="text-gray-300">People Reached</div>
                </div>
                <div className="bg-dark-lighter p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {program.impact.communities}
                  </div>
                  <div className="text-gray-300">Communities Served</div>
                </div>
                <div className="bg-dark-lighter p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {program.impact.successRate}
                  </div>
                  <div className="text-gray-300">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}