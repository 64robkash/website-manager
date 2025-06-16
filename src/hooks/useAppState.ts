import { useState, useEffect } from 'react';
import { Site, Task, ActivityLog, ViewType } from '../types';
import { mockSites, mockTasks, mockActivityLogs } from '../mockData';
import * as db from '../utils/databaseService';

export const useAppState = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log("🔥 Connecting to Firebase...");
        
        // Try to fetch from database
        const sitesData = await db.getSites();
        console.log("📊 Sites data from Firebase:", sitesData);
        const tasksData = await db.getTasks();
        const logsData = await db.getActivityLogs();
        
        // If database is empty (first run), initialize with mock data
        if (sitesData.length === 0) {
          console.log("🚀 First run detected! Initializing database with mock data...");
          // Add mock sites to database
          for (const site of mockSites) {
            await db.addSite({
              name: site.name,
              url: site.url,
              platform: site.platform,
            });
          }
          
          // Load sites again after adding mock data
          const newSites = await db.getSites();
          setSites(newSites);
          
          // Map old mock task siteIds to new database siteIds
          const siteIdMap: {[key: string]: string} = {};
          mockSites.forEach((mockSite, index) => {
            if (newSites[index]) {
              siteIdMap[mockSite.id] = newSites[index].id;
            }
          });
          
          // Add mock tasks with updated siteIds
          for (const task of mockTasks) {
            const newSiteId = siteIdMap[task.siteId] || task.siteId;
            await db.addTask({
              siteId: newSiteId,
              title: task.title,
              status: task.status,
              dueDate: task.dueDate,
              notes: task.notes,
              recurrence: task.recurrence,
              checklist: task.checklist,
              completedAt: task.completedAt
            });
          }
          
          // Add mock activity logs
          for (const log of mockActivityLogs) {
            const newSiteId = siteIdMap[log.siteId] || log.siteId;
            await db.addActivityLog({
              taskId: log.taskId,
              siteId: newSiteId,
              action: log.action,
              siteName: log.siteName,
              taskTitle: log.taskTitle
            });
          }
          
          // Load all data again after adding mock data
          setTasks(await db.getTasks());
          setActivityLogs(await db.getActivityLogs());
        } else {
          // Database already has data, use it
          setSites(sitesData);
          setTasks(tasksData);
          setActivityLogs(logsData);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
        
        // Fallback to mock data if database fails
        setSites(mockSites);
        setTasks(mockTasks);
        setActivityLogs(mockActivityLogs);
      }
    };
    
    loadData();
    
    // Set up real-time listeners
    const unsubscribeSites = db.watchSites(setSites);
    const unsubscribeTasks = db.watchTasks(setTasks);
    const unsubscribeLogs = db.watchActivityLogs(setActivityLogs);
    
    return () => {
      // Clean up listeners when component unmounts
      unsubscribeSites();
      unsubscribeTasks();
      unsubscribeLogs();
    };
  }, []);

  const addSite = async (site: Omit<Site, 'id' | 'createdAt'>) => {
    try {
      const newSite = await db.addSite(site);
      if (newSite) {
        return newSite;
      }
      throw new Error('Failed to add site');
    } catch (err) {
      console.error('Error adding site:', err);
      setError('Failed to add site. Please try again.');
      return null;
    }
  };

  const updateSite = async (id: string, updates: Partial<Site>) => {
    try {
      const success = await db.updateSite(id, updates);
      if (!success) {
        throw new Error('Failed to update site');
      }
    } catch (err) {
      console.error('Error updating site:', err);
      setError('Failed to update site. Please try again.');
    }
  };

  const deleteSite = async (id: string) => {
    try {
      const success = await db.deleteSite(id);
      if (!success) {
        throw new Error('Failed to delete site');
      }
    } catch (err) {
      console.error('Error deleting site:', err);
      setError('Failed to delete site. Please try again.');
    }
  };

  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const newTask = await db.addTask(task);
      if (!newTask) {
        throw new Error('Failed to add task');
      }
      
      // Add activity log
      const site = sites.find(s => s.id === task.siteId);
      if (site) {
        await db.addActivityLog({
          taskId: newTask.id,
          siteId: task.siteId,
          action: 'Task created',
          siteName: site.name,
          taskTitle: task.title,
        });
      }
      
      return newTask;
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task. Please try again.');
      return null;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      // Find the current task
      const currentTask = tasks.find(t => t.id === id);
      if (!currentTask) {
        throw new Error('Task not found');
      }
      
      const success = await db.updateTask(id, updates);
      if (!success) {
        throw new Error('Failed to update task');
      }
      
      // Add activity log for status changes
      if (updates.status && updates.status !== currentTask.status) {
        const site = sites.find(s => s.id === currentTask.siteId);
        if (site) {
          const action = updates.status === 'done' ? 'Task completed' : 
                         updates.status === 'in-progress' ? 'Task started' : 'Task updated';
          
          await db.addActivityLog({
            taskId: id,
            siteId: currentTask.siteId,
            action,
            siteName: site.name,
            taskTitle: currentTask.title,
          });
        }
        
        if (updates.status === 'done') {
          // Update completedAt date
          await db.updateTask(id, { 
            ...updates,
            completedAt: new Date() 
          });
        }
      }
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const success = await db.deleteTask(id);
      if (!success) {
        throw new Error('Failed to delete task');
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  const getTasksForSite = (siteId: string) => {
    return tasks.filter(task => task.siteId === siteId);
  };

  const getTodayTasks = () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    return tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return dueDate <= today && task.status !== 'done';
    });
  };

  const getOverdueTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate < today && task.status !== 'done';
    });
  };

  return {
    sites,
    tasks,
    activityLogs,
    currentView,
    selectedSite,
    loading,
    error,
    setCurrentView,
    setSelectedSite,
    addSite,
    updateSite,
    deleteSite,
    addTask,
    updateTask,
    deleteTask,
    getTasksForSite,
    getTodayTasks,
    getOverdueTasks,
  };
};