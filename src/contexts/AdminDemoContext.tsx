import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
  imageCount: number;
  updatedAt: string;
  featuredImage: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  services: { id: string; title: string; description: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  type: 'Leadership' | 'Crew';
}

interface AdminState {
  isLoggedIn: boolean;
  projects: Project[];
  serviceCategories: ServiceCategory[];
  teamMembers: TeamMember[];
  activityFeed: { id: string; message: string; time: string }[];
}

// Initial Mock Data
const defaultState: AdminState = {
  isLoggedIn: false,
  projects: [
    {
      id: 'p1',
      title: 'Crosby Residence Rebuild',
      location: 'Altadena, CA',
      category: 'Fire Rebuild',
      status: 'In Progress',
      imageCount: 14,
      updatedAt: '2 hours ago',
      featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=60&h=60&fit=crop&q=80',
    },
    {
      id: 'p2',
      title: 'East Altadena Rebuild',
      location: 'Altadena, CA',
      category: 'Fire Rebuild',
      status: 'In Progress',
      imageCount: 15,
      updatedAt: 'Yesterday',
      featuredImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=60&h=60&fit=crop&q=80',
    },
    {
      id: 'p3',
      title: 'Homepark Residence',
      location: 'Altadena, CA',
      category: 'Renovation',
      status: 'In Progress',
      imageCount: 12,
      updatedAt: '3 days ago',
      featuredImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09be15c7?w=60&h=60&fit=crop&q=80',
    },
  ],
  serviceCategories: [
    {
      id: 'c1',
      title: 'Core Construction',
      services: [
        { id: 's1', title: 'Complete Rebuilds', description: 'Full property restoration.' },
        { id: 's2', title: 'Ground-up Builds', description: 'New custom home construction.' },
        { id: 's3', title: 'Major Renovations', description: 'Extensive interior and exterior updates.' },
        { id: 's4', title: 'ADU Construction', description: 'Accessory Dwelling Units.' },
      ]
    },
    {
      id: 'c2',
      title: 'Structural & Exterior',
      services: [
        { id: 's5', title: 'Foundation Repair', description: 'Securing structural integrity.' },
        { id: 's6', title: 'Roofing systems', description: 'Premium grade roofing.' },
        { id: 's7', title: 'Exterior siding', description: 'High-end siding materials.' },
        { id: 's8', title: 'Windows/Doors', description: 'Energy-efficient installations.' },
        { id: 's9', title: 'Decking/Hardscaping', description: 'Custom outdoor living spaces.' },
      ]
    },
    { id: 'c3', title: 'Systems & Mechanics', services: [] },
    { id: 'c4', title: 'Interior & Finishing', services: [] },
  ],
  teamMembers: [
    { id: 't1', name: 'Sal Amin', role: 'CEO', photo: 'https://ui-avatars.com/api/?name=Sal+Amin&background=random', type: 'Leadership' },
    { id: 't2', name: 'Charmaine Carter', role: 'Project Officer', photo: 'https://ui-avatars.com/api/?name=Charmaine+Carter&background=random', type: 'Leadership' },
    { id: 't3', name: 'Ken Kohistani', role: 'General Contractor', photo: 'https://ui-avatars.com/api/?name=Ken+Kohistani&background=random', type: 'Leadership' },
    { id: 't4', name: 'Lida Touma', role: 'CFO', photo: 'https://ui-avatars.com/api/?name=Lida+Touma&background=random', type: 'Leadership' },
    { id: 't5', name: 'Rida Marshall', role: 'Project Coordinator', photo: 'https://ui-avatars.com/api/?name=Rida+Marshall&background=random', type: 'Leadership' },
  ],
  activityFeed: [
    { id: 'a1', message: 'Crosby Residence Rebuild project updated', time: '2 hours ago' },
    { id: 'a2', message: 'New team member added: Rida Marshall', time: 'Yesterday' },
    { id: 'a3', message: 'East Altadena gallery: 3 images added', time: '2 days ago' },
  ]
};

interface AdminContextType {
  state: AdminState;
  login: () => void;
  logout: () => void;
  deleteProject: (id: string) => void;
  addProject: (p: Project) => void;
  // We can add more specific functions as needed, but for the demo we'll keep it simple
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminDemoProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AdminState>(() => {
    const saved = sessionStorage.getItem('vivere_admin_demo');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultState;
      }
    }
    return defaultState;
  });

  useEffect(() => {
    sessionStorage.setItem('vivere_admin_demo', JSON.stringify(state));
  }, [state]);

  const login = () => setState(s => ({ ...s, isLoggedIn: true }));
  const logout = () => setState(s => ({ ...s, isLoggedIn: false }));

  const deleteProject = (id: string) => {
    setState(s => ({
      ...s,
      projects: s.projects.filter(p => p.id !== id),
      activityFeed: [{ id: Date.now().toString(), message: 'Project deleted', time: 'Just now' }, ...s.activityFeed]
    }));
  };

  const addProject = (p: Project) => {
    setState(s => ({
      ...s,
      projects: [p, ...s.projects],
      activityFeed: [{ id: Date.now().toString(), message: `New project added: ${p.title}`, time: 'Just now' }, ...s.activityFeed]
    }));
  };

  return (
    <AdminContext.Provider value={{ state, login, logout, deleteProject, addProject }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminDemo = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdminDemo must be used within AdminDemoProvider');
  return context;
};
