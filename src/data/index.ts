import { getAllTopicImages } from '../lib/utils';
import programsData from './programs.csv';
import projectsData from './projects.csv';

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  images: string[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  images: string[];
  status: 'ongoing' | 'completed';
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  images: string[];
  author: string;
  authorPhoto?: string;
  authorBio?: string;
  status: 'draft' | 'published' | 'pending';
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
  sortOrder: number;
}

export interface SiteConfig {
  name: string;
  metaTitle: string;
  metaDescription: string;
  logoUrl?: string;
  faviconUrl?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  sections: {
    home: boolean;
    about: boolean;
    programs: boolean;
    projects: boolean;
    team: boolean;
    blog: boolean;
    contact: boolean;
  };
}

// Site Configuration
export const siteConfig: SiteConfig = {
  name: 'FIDIPA',
  metaTitle: 'FIDIPA - Friendly Integrated Development Initiative in Poverty Alleviation',
  metaDescription: 'A holistic peaceful and democratic society with justice for all',
  socialLinks: {
    facebook: 'https://facebook.com/fidipa',
    twitter: 'https://twitter.com/fidipa'
  },
  sections: {
    home: true,
    about: true,
    programs: true,
    projects: true,
    team: true,
    blog: false,
    contact: true
  }
};

// Staff Members
export const staffMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Ms Jayne A. I. Wasonga',
    role: 'Board Secretary and Chief Executive Officer',
    sortOrder: 1
  },
  {
    id: '2',
    name: 'Ms Jesca Mitaya',
    role: 'Finance and Administration FAM Manager',
    sortOrder: 2
  },
  {
    id: '3',
    name: 'Ms Linda Otieno',
    role: 'Project Lead (Volunteer)',
    sortOrder: 3
  },
  {
    id: '4',
    name: 'Rev. Walter Ang\'ienda',
    role: 'Program Officer Peace Project (Volunteer)',
    sortOrder: 4
  },
  {
    id: '5',
    name: 'Phillip Noel',
    role: 'Volunteer, Soft Skills (Water and Sanitation)',
    sortOrder: 5
  },
  {
    id: '6',
    name: 'Jackson Lesian',
    role: 'Office Assistant/Driver',
    sortOrder: 6
  },
  {
    id: '7',
    name: 'Jamima Mtuli',
    role: 'Administer/Programs Assistant',
    sortOrder: 7
  }
];

// Board Members
export const boardMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Mrs Rosemary Meyo',
    role: 'Chairperson - Governance and Administration Expert',
    sortOrder: 1
  },
  {
    id: '2',
    name: 'Dr. Josephine Munthali',
    role: 'Vice Chairperson - Gender and Education Expert',
    sortOrder: 2
  },
  {
    id: '3',
    name: 'Ms Jayne A. Wasonga',
    role: 'Chief Executive Officer and Board Secretary',
    sortOrder: 3
  },
  {
    id: '4',
    name: 'Sr. Mildred Mayeye',
    role: 'Treasurer',
    sortOrder: 4
  },
  {
    id: '5',
    name: 'Dr. Rev. Simon Oriedo',
    role: 'Committee Member',
    sortOrder: 5
  },
  {
    id: '6',
    name: 'Mr. Samwel Otieno',
    role: 'Committee Member',
    sortOrder: 6
  },
  {
    id: '7',
    name: 'Prof. Esther Mombo',
    role: 'Committee Member',
    sortOrder: 7
  },
  {
    id: '8',
    name: 'Ms Leah O. Wanaswa',
    role: 'Committee Member',
    sortOrder: 8
  }
];

// Programs from CSV
export const programs: Program[] = programsData.map(program => ({
  id: program.id,
  title: program.title,
  slug: program.slug,
  description: program.description || '',
  content: program.content || '',
  images: getAllTopicImages(program.title),
  metaTitle: program.meta_title,
  metaDescription: program.meta_description,
  createdAt: program.created_at,
  updatedAt: program.updated_at
}));

// Projects from CSV
export const projects: Project[] = projectsData.map(project => ({
  id: project.id,
  title: project.title,
  slug: project.slug,
  description: project.description || '',
  content: project.content || '',
  images: getAllTopicImages(project.title),
  status: project.status as 'ongoing' | 'completed',
  metaTitle: project.meta_title,
  metaDescription: project.meta_description,
  createdAt: project.created_at,
  updatedAt: project.updated_at
}));

// Blog Posts
export const blogPosts = [
  {
    id: 'empowering-communities',
    title: 'Empowering Communities Through Sustainable Development',
    slug: 'empowering-communities-through-sustainable-development',
    content: `Our sustainable development initiatives are transforming rural communities through innovative approaches to poverty alleviation, environmental conservation, and economic empowerment...`,
    images: getAllTopicImages('community'),
    author: 'Jayne Wasonga',
    authorBio: 'Chief Executive Officer at FIDIPA',
    status: 'published',
    metaTitle: 'Empowering Communities - FIDIPA Blog',
    metaDescription: 'Learn about FIDIPA\'s sustainable development initiatives',
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  }
];