import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

export default function ProjectDetail() {
  const { slug } = useParams();

  // In a real app, fetch the project data using the slug
  const project = {
    title: "Community Health Initiative",
    description: `Our Community Health Initiative is focused on implementing comprehensive healthcare programs in rural communities, with a special emphasis on preventive care and health education.

    This project aims to:
    • Improve access to basic healthcare services
    • Provide health education and awareness
    • Train community health workers
    • Establish sustainable health systems`,
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600",
    status: "Ongoing",
    timeline: {
      start: "January 2024",
      end: "December 2024"
    },
    objectives: [
      "Improve healthcare accessibility in rural areas",
      "Reduce preventable diseases through education",
      "Build sustainable healthcare infrastructure",
      "Train local healthcare providers"
    ],
    impact: {
      beneficiaries: "5,000+",
      communities: "10",
      healthCenters: "5",
      trainedWorkers: "50"
    },
    achievements: [
      "Established 5 community health centers",
      "Trained 50 community health workers",
      "Conducted 100+ health awareness sessions",
      "Served 5000+ community members"
    ]
  };

  return (
    <div className="min-h-screen bg-dark">
      <BackButton />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="rounded-lg overflow-hidden h-[400px] relative">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-primary px-4 py-2 rounded-full text-sm font-medium">
              {project.status}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <div className="flex space-x-4 text-gray-400">
                <span>Start: {project.timeline.start}</span>
                <span>•</span>
                <span>End: {project.timeline.end}</span>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              {project.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Project Objectives</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.objectives.map((objective, index) => (
                  <div 
                    key={index}
                    className="bg-dark-lighter p-4 rounded-lg flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <span className="text-gray-300">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Project Impact</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-dark-lighter p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {project.impact.beneficiaries}
                  </div>
                  <div className="text-gray-300">People Reached</div>
                </div>
                <div className="bg-dark-lighter p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {project.impact.communities}
                  </div>
                  <div className="text-gray-300">Communities</div>
                </div>
                <div className="bg-dark-lighter p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {project.impact.healthCenters}
                  </div>
                  <div className="text-gray-300">Health Centers</div>
                </div>
                <div className="bg-dark-lighter p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {project.impact.trainedWorkers}
                  </div>
                  <div className="text-gray-300">Trained Workers</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Key Achievements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className="bg-dark-lighter p-4 rounded-lg flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>
                    <span className="text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}