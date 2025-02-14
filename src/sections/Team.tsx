import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

const staffMembers = [
  {
    name: "Ms Jayne A. I. Wasonga",
    role: "Board Secretary and Chief Executive Officer",
    expertise: "Gender and Project Management Expert",
    education: "M.A Planning and Management – Catholic University of Eastern Africa 2016 and Candidate MA Theology Christian Leadership Great Lakes University of Kisumu"
  },
  {
    name: "Ms Jesca Mitaya",
    role: "Finance and Administration FAM Manager",
    expertise: "Finance and Economic Expert",
    education: "BA Economics University of Nairobi- 2005"
  },
  {
    name: "Ms Linda Otieno",
    role: "Project Lead (Volunteer)",
    expertise: "Youth and Women Environment and Smallholders Farmers project",
    education: "BA Relations and Diplomacy Maseno University 2019 and Candidate for Public Policy and Administration Kenyatta University"
  },
  {
    name: "Rev. Walter Ang'ienda",
    role: "Program Officer Peace Project (Volunteer)",
    education: "Karen Christian College 2000"
  },
  {
    name: "Phillip Noel",
    role: "Volunteer, Soft Skills (Water and Sanitation)",
    education: "Water Resource Management - University of Eldoret"
  },
  {
    name: "Jackson Lesian",
    role: "Office Assistant/Driver"
  },
  {
    name: "Jamima Mtuli",
    role: "Administer/Programs Assistant",
    education: "Medical Training School Siaya 2019 Health Records"
  }
];

const boardMembers = [
  {
    name: "Mrs Rosemary Meyo",
    role: "Chairperson",
    education: "MA Administration, Maseno University 2012"
  },
  {
    name: "Dr. Josephine Munthali",
    role: "Vice Chairperson",
    expertise: "Gender and Education",
    education: "University of Edinburgh UK 2001"
  },
  {
    name: "Ms Jayne A. Wasonga",
    role: "Chief Executive Officer and Board Secretary",
    education: "M.A Project Planning and Management – The Catholic University of Eastern Africa (CUEA) 2016"
  },
  {
    name: "Sr. Mildred Mayeye",
    role: "Treasurer",
    education: "Lwak Training School"
  },
  {
    name: "Dr. Rev. Simon Oriedo",
    role: "Member",
    education: "African International University (2018)"
  },
  {
    name: "Mr. Samwel Otieno",
    role: "Committee Member",
    education: "B. Com University of Nairobi"
  },
  {
    name: "Prof. Esther Mombo",
    role: "Committee Member",
    expertise: "Gender and Theology",
    education: "Lecturer at St. Paul University Limuru and part-time Yale University"
  }
];

function TeamCarousel({ members }: { members: typeof staffMembers }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerPage = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => 
        prev + itemsPerPage >= members.length ? 0 : prev + itemsPerPage
      );
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prev) => 
        prev - itemsPerPage < 0 ? Math.max(0, members.length - itemsPerPage) : prev - itemsPerPage
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const visibleMembers = members.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 -translate-x-1/2 bg-white dark:bg-dark-lighter p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-6 h-6 text-primary" />
        </button>

        <div className="flex gap-6 overflow-hidden px-12">
          {visibleMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-1 min-w-[280px] max-w-[350px] bg-white dark:bg-dark-lighter rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col space-y-4">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <User size={40} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-primary text-center font-medium">
                  {member.role}
                </p>
                {member.expertise && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    {member.expertise}
                  </p>
                )}
                {member.education && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {member.education}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 translate-x-1/2 bg-white dark:bg-dark-lighter p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          disabled={isAnimating}
        >
          <ChevronRight className="w-6 h-6 text-primary" />
        </button>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="py-20 bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4">
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

        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Staff Members</h3>
            <TeamCarousel members={staffMembers} />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Board of Advisory</h3>
            <TeamCarousel members={boardMembers} />
          </div>
        </div>
      </div>
    </section>
  );
}