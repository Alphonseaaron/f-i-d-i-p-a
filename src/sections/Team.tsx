import React from 'react';
import { motion } from 'framer-motion';

const staffMembers = [
  {
    name: "Ms Jayne A. I. Wasonga",
    role: "Board Secretary and Chief Executive Officer",
    expertise: "Gender and Project Management Expert",
    education: "M.A Planning and Management – Catholic University of Eastern Africa 2016 and Candidate MA Theology Christian Leadership Great Lakes University of Kisumu",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Ms Jesca Mitaya",
    role: "Finance and Administration FAM Manager",
    expertise: "Finance and Economic Expert",
    education: "BA Economics University of Nairobi- 2005",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Ms Linda Otieno",
    role: "Project Lead (Volunteer)",
    expertise: "Youth and Women Environment and Smallholders Farmers project",
    education: "BA Relations and Diplomacy Maseno University 2019 and Candidate for Public Policy and Administration Kenyatta University",
    image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Rev. Walter Ang'ienda",
    role: "Program Officer Peace Project (Volunteer)",
    education: "Karen Christian College 2000",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Phillip Noel",
    role: "Volunteer, Soft Skills (Water and Sanitation)",
    education: "Water Resource Management - University of Eldoret",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Jackson Lesian",
    role: "Office Assistant/Driver",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Jamima Mtuli",
    role: "Administer/Programs Assistant",
    education: "Medical Training School Siaya 2019 Health Records",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  }
];

const boardMembers = [
  {
    name: "Mrs Rosemary Meyo",
    role: "Chairperson",
    education: "MA Administration, Maseno University 2012",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Dr. Josephine Munthali",
    role: "Vice Chairperson",
    expertise: "Gender and Education",
    education: "University of Edinburgh UK 2001",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Ms Jayne A. Wasonga",
    role: "Chief Executive Officer and Board Secretary",
    education: "M.A Project Planning and Management – The Catholic University of Eastern Africa (CUEA) 2016",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Sr. Mildred Mayeye",
    role: "Treasurer",
    education: "Lwak Training School",
    image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Dr. Rev. Simon Oriedo",
    role: "Member",
    education: "African International University (2018)",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Mr. Samwel Otieno",
    role: "Committee Member",
    education: "B. Com University of Nairobi",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Prof. Esther Mombo",
    role: "Committee Member",
    expertise: "Gender and Theology",
    education: "Lecturer at St. Paul University Limuru and part-time Yale University",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  }
];

export default function Team() {
  return (
    <section id="team" className="py-20 relative bg-light dark:bg-dark">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1600')] bg-fixed bg-cover bg-center opacity-5 dark:opacity-10" />
      <div className="absolute inset-0 bg-white/80 dark:bg-dark/60 backdrop-blur-[2px]" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Team</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet the dedicated individuals who work tirelessly to make our mission a reality.
          </p>
        </motion.div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Key Staff Members</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  {member.expertise && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {member.expertise}
                    </p>
                  )}
                  {member.education && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {member.education}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Board of Advisory</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {boardMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-lighter rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  {member.expertise && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {member.expertise}
                    </p>
                  )}
                  {member.education && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {member.education}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}