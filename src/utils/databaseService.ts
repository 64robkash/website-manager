import { Site, Task, ActivityLog } from '../types';
import {
  sitesCollection,
  tasksCollection,
  activityLogsCollection,
  convertToFirestore,
  convertFromFirestore,
  serverTimestamp,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot
} from './firebase';

// Sites CRUD operations
export const getSites = async (): Promise<Site[]> => {
  try {
    const snapshot = await getDocs(sitesCollection);
    return snapshot.docs.map(doc => convertFromFirestore(doc) as Site);
  } catch (error) {
    console.error('Error getting sites:', error);
    return [];
  }
};

export const addSite = async (site: Omit<Site, 'id' | 'createdAt'>): Promise<Site | null> => {
  try {
    const siteData = {
      ...site,
      createdAt: new Date()
    };
    const docRef = await addDoc(sitesCollection, convertToFirestore(siteData));
    return {
      ...siteData,
      id: docRef.id
    } as Site;
  } catch (error) {
    console.error('Error adding site:', error);
    return null;
  }
};

export const updateSite = async (id: string, updates: Partial<Site>): Promise<boolean> => {
  try {
    const siteRef = doc(sitesCollection, id);
    await updateDoc(siteRef, convertToFirestore(updates));
    return true;
  } catch (error) {
    console.error('Error updating site:', error);
    return false;
  }
};

export const deleteSite = async (id: string): Promise<boolean> => {
  try {
    const siteRef = doc(sitesCollection, id);
    await deleteDoc(siteRef);
    
    // Delete associated tasks
    const tasksQuery = query(tasksCollection, where('siteId', '==', id));
    const taskSnapshot = await getDocs(tasksQuery);
    
    taskSnapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    
    return true;
  } catch (error) {
    console.error('Error deleting site:', error);
    return false;
  }
};

// Tasks CRUD operations
export const getTasks = async (): Promise<Task[]> => {
  try {
    const snapshot = await getDocs(tasksCollection);
    return snapshot.docs.map(doc => {
      const data = convertFromFirestore(doc) as Task;
      return data;
    });
  } catch (error) {
    console.error('Error getting tasks:', error);
    return [];
  }
};

export const getTasksForSite = async (siteId: string): Promise<Task[]> => {
  try {
    const q = query(tasksCollection, where('siteId', '==', siteId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => convertFromFirestore(doc) as Task);
  } catch (error) {
    console.error('Error getting tasks for site:', error);
    return [];
  }
};

export const addTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task | null> => {
  try {
    const taskData = {
      ...task,
      createdAt: new Date()
    };
    const docRef = await addDoc(tasksCollection, convertToFirestore(taskData));
    return {
      ...taskData,
      id: docRef.id
    } as Task;
  } catch (error) {
    console.error('Error adding task:', error);
    return null;
  }
};

export const updateTask = async (id: string, updates: Partial<Task>): Promise<boolean> => {
  try {
    const taskRef = doc(tasksCollection, id);
    await updateDoc(taskRef, convertToFirestore(updates));
    return true;
  } catch (error) {
    console.error('Error updating task:', error);
    return false;
  }
};

export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    const taskRef = doc(tasksCollection, id);
    await deleteDoc(taskRef);
    return true;
  } catch (error) {
    console.error('Error deleting task:', error);
    return false;
  }
};

// Activity Logs
export const getActivityLogs = async (): Promise<ActivityLog[]> => {
  try {
    const snapshot = await getDocs(activityLogsCollection);
    return snapshot.docs.map(doc => convertFromFirestore(doc) as ActivityLog);
  } catch (error) {
    console.error('Error getting activity logs:', error);
    return [];
  }
};

export const addActivityLog = async (log: Omit<ActivityLog, 'id' | 'timestamp'>): Promise<ActivityLog | null> => {
  try {
    const logData = {
      ...log,
      timestamp: new Date()
    };
    const docRef = await addDoc(activityLogsCollection, convertToFirestore(logData));
    return {
      ...logData,
      id: docRef.id
    } as ActivityLog;
  } catch (error) {
    console.error('Error adding activity log:', error);
    return null;
  }
};

// Watch for changes in real-time
export const watchSites = (callback: (sites: Site[]) => void) => {
  return onSnapshot(sitesCollection, (snapshot) => {
    const sites = snapshot.docs.map(doc => convertFromFirestore(doc) as Site);
    callback(sites);
  });
};

export const watchTasks = (callback: (tasks: Task[]) => void) => {
  return onSnapshot(tasksCollection, (snapshot) => {
    const tasks = snapshot.docs.map(doc => convertFromFirestore(doc) as Task);
    callback(tasks);
  });
};

export const watchActivityLogs = (callback: (logs: ActivityLog[]) => void) => {
  return onSnapshot(activityLogsCollection, (snapshot) => {
    const logs = snapshot.docs.map(doc => convertFromFirestore(doc) as ActivityLog);
    callback(logs);
  });
}; 