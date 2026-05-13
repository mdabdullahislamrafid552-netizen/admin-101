import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp,
  getDoc,
  Timestamp,
  setDoc
} from 'firebase/firestore';
import { db, auth } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  category: string;
  client: string;
  year: string;
  location?: string;
  images: string[];
  featured: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Service {
  id?: string;
  title: string;
  description: string;
  image: string;
  price?: string;
  iconName?: string;
  order?: number;
}

export interface InboxMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  createdAt: Timestamp;
}

// Generic CRUD helpers
export const firestoreService = {
  // Projects
  getProjects: async (): Promise<Project[]> => {
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'projects');
      throw error;
    }
  },
  
  saveProject: async (data: Partial<Project>, id?: string) => {
    try {
      if (id) {
        const ref = doc(db, 'projects', id);
        await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
      } else {
        // Need to use setDoc with explicit doc to guarantee exact keys if we use addDoc 
        // wait addDoc creates random doc id and we validate data without knowing ID which is fine, 
        // but our strict schema check might fail if serverTimestamp isn't computed yet. 
        // Oh, wait, serverTimestamp is replaced.
        const ref = doc(collection(db, 'projects'));
        await setDoc(ref, { 
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          client: data.client || '',
          year: data.year || '',
          images: data.images || [],
          featured: data.featured || false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp() 
        });
      }
    } catch (error) {
      handleFirestoreError(error, id ? OperationType.UPDATE : OperationType.CREATE, `projects/${id || ''}`);
    }
  },

  deleteProject: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  },

  // Services
  getServices: async (): Promise<Service[]> => {
    try {
      const q = query(collection(db, 'services')); // order by 'order' could be added but left generic
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'services');
      throw error;
    }
  },

  saveService: async (data: Partial<Service>, id?: string) => {
    try {
      if (id) {
        await updateDoc(doc(db, 'services', id), {
          title: data.title,
          description: data.description,
          image: data.image,
          price: data.price || '',
          iconName: data.iconName || '',
          order: data.order || 0
        });
      } else {
        const ref = doc(collection(db, 'services'));
        await setDoc(ref, {
          title: data.title || '',
          description: data.description || '',
          image: data.image || '',
          price: data.price || '',
          iconName: data.iconName || '',
          order: data.order || 0
        });
      }
    } catch (error) {
      handleFirestoreError(error, id ? OperationType.UPDATE : OperationType.CREATE, `services/${id || ''}`);
    }
  },

  deleteService: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `services/${id}`);
    }
  },

  // Inbox
  getMessages: async (): Promise<InboxMessage[]> => {
    try {
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InboxMessage));
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'messages');
      throw error;
    }
  },

  submitMessage: async (data: Omit<InboxMessage, 'id' | 'createdAt' | 'status'>) => {
    try {
      const ref = doc(collection(db, 'messages'));
      await setDoc(ref, {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        message: data.message,
        status: 'unread',
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'messages');
    }
  },

  markMessageAsRead: async (id: string) => {
    try {
      await updateDoc(doc(db, 'messages', id), { status: 'read' });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `messages/${id}`);
    }
  },

  deleteMessage: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `messages/${id}`);
    }
  }
};
