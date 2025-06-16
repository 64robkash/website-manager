import React, { useState } from 'react';
import { Plus, Calendar, TrendingUp, Clock, Filter } from 'lucide-react';
import { SiteCard } from './SiteCard';
import { TaskCard } from './TaskCard';
import { SiteModal } from './SiteModal';
import { TaskModal } from './TaskModal';
import { useAppState } from '../hooks/useAppState';
import { Site, Task } from '../types';
import {
  card, buttonPrimary, sectionHeading, statsGrid,
  gridContainer, statusIconNotStarted, statusIconInProgress,
  statusIconDone, statusIconOverdue, textPrimary, textSecondary, textMuted
} from '../styles/designSystem';

export const Dashboard: React.FC = () => {
  const {
    sites,
    tasks,
    addSite,
    updateSite,
    deleteSite,
    addTask,
    updateTask,
    getTasksForSite,
    getTodayTasks,
    getOverdueTasks,
  } = useAppState();

  const [siteModalOpen, setSiteModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<Site | undefined>();
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [selectedSiteForTasks, setSelectedSiteForTasks] = useState<string | null>(null);
  const [recurrenceFilter, setRecurrenceFilter] = useState<Task['recurrence'] | 'all'>('all');

  const todayTasks = getTodayTasks();
  const overdueTasks = getOverdueTasks();
  const completedTasks = tasks.filter(task => task.status === 'done');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');

  const handleSiteEdit = (site: Site) => {
    setEditingSite(site);
    setSiteModalOpen(true);
  };

  const handleSiteDelete = (siteId: string) => {
    if (confirm('Are you sure you want to delete this site and all its tasks?')) {
      deleteSite(siteId);
    }
  };

  const handleSiteSave = (siteData: Omit<Site, 'id' | 'createdAt'>) => {
    if (editingSite) {
      updateSite(editingSite.id, siteData);
      setEditingSite(undefined);
    } else {
      addSite(siteData);
    }
  };

  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const handleTaskSave = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    addTask(taskData);
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    updateTask(taskId, updates);
    setEditingTask(undefined);
  };

  const getFilteredTasks = () => {
    let filteredTasks = selectedSiteForTasks ? getTasksForSite(selectedSiteForTasks) : tasks;
    
    if (recurrenceFilter !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.recurrence === recurrenceFilter);
    }
    
    return filteredTasks;
  };

  const selectedSite = selectedSiteForTasks ? sites.find(s => s.id === selectedSiteForTasks) : null;

  const getRecurrenceDisplayName = (recurrence: Task['recurrence'] | 'all') => {
    switch (recurrence) {
      case 'all': return 'All Tasks';
      case 'none': return 'One-time';
      case 'daily': return 'Daily';
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      default: return recurrence;
    }
  };

  const getRecurrenceCount = (recurrence: Task['recurrence']) => {
    return tasks.filter(task => task.recurrence === recurrence).length;
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className={statsGrid}>
        <div className={card}>
          <div className="flex items-center justify-between">
            <div>
              <p className={textSecondary + " text-sm"}>Total Sites</p>
              <p className={`text-2xl font-bold ${textPrimary}`}>{sites.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-navy to-indigo rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className={card}>
          <div className="flex items-center justify-between">
            <div>
              <p className={textSecondary + " text-sm"}>Due Today</p>
              <p className="text-2xl font-bold text-status-in-progress">{todayTasks.length}</p>
            </div>
            <div className={statusIconInProgress}>
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className={card}>
          <div className="flex items-center justify-between">
            <div>
              <p className={textSecondary + " text-sm"}>Overdue</p>
              <p className="text-2xl font-bold text-status-overdue">{overdueTasks.length}</p>
            </div>
            <div className={statusIconOverdue}>
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className={card}>
          <div className="flex items-center justify-between">
            <div>
              <p className={textSecondary + " text-sm"}>In Progress</p>
              <p className="text-2xl font-bold text-status-in-progress">{inProgressTasks.length}</p>
            </div>
            <div className={statusIconInProgress}>
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Sites Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className={sectionHeading}>Your Sites</h2>
          <button
            onClick={() => {
              setEditingSite(undefined);
              setSiteModalOpen(true);
            }}
            className={buttonPrimary}
          >
            <Plus className="w-4 h-4" />
            <span>Add Site</span>
          </button>
        </div>

        <div className={gridContainer}>
          {sites.map(site => (
            <SiteCard
              key={site.id}
              site={site}
              taskCount={getTasksForSite(site.id).length}
              onEdit={() => handleSiteEdit(site)}
              onDelete={() => handleSiteDelete(site.id)}
              onViewTasks={() => setSelectedSiteForTasks(site.id)}
            />
          ))}
        </div>
      </div>

      {/* Tasks Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={sectionHeading}>
              {selectedSite ? `Tasks for ${selectedSite.name}` : 'All Tasks'}
            </h2>
            {selectedSite && (
              <button
                onClick={() => setSelectedSiteForTasks(null)}
                className="text-accent hover:text-accent/80 text-sm mt-1"
              >
                ← Back to all tasks
              </button>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {/* Recurrence Filter */}
            <div className="flex items-center space-x-2">
              <Filter className={textSecondary + " w-4 h-4"} />
              <select
                value={recurrenceFilter}
                onChange={(e) => setRecurrenceFilter(e.target.value as Task['recurrence'] | 'all')}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="all" className="bg-navy">All Tasks ({tasks.length})</option>
                <option value="none" className="bg-navy">One-time ({getRecurrenceCount('none')})</option>
                <option value="daily" className="bg-navy">Daily ({getRecurrenceCount('daily')})</option>
                <option value="weekly" className="bg-navy">Weekly ({getRecurrenceCount('weekly')})</option>
                <option value="monthly" className="bg-navy">Monthly ({getRecurrenceCount('monthly')})</option>
              </select>
            </div>
            
            <button
              onClick={() => {
                setEditingTask(undefined);
                setTaskModalOpen(true);
              }}
              className={buttonPrimary}
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Filter Summary */}
        {recurrenceFilter !== 'all' && (
          <div className="mb-4 p-3 bg-accent/20 border border-accent/30 rounded-xl">
            <p className="text-accent/90 text-sm">
              Showing {getFilteredTasks().length} {getRecurrenceDisplayName(recurrenceFilter).toLowerCase()} tasks
              {selectedSite && ` for ${selectedSite.name}`}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getFilteredTasks().map(task => {
            const site = sites.find(s => s.id === task.siteId);
            if (!site) return null;
            
            return (
              <TaskCard
                key={task.id}
                task={task}
                site={site}
                onStatusChange={updateTask}
                onEdit={() => handleTaskEdit(task)}
              />
            );
          })}
        </div>

        {getFilteredTasks().length === 0 && (
          <div className="text-center py-12">
            <p className={textSecondary + " text-lg"}>
              {recurrenceFilter === 'all' ? 'No tasks found' : `No ${getRecurrenceDisplayName(recurrenceFilter).toLowerCase()} tasks found`}
            </p>
            <p className={textMuted + " text-sm mt-2"}>
              {selectedSite 
                ? `Add some ${recurrenceFilter === 'all' ? '' : getRecurrenceDisplayName(recurrenceFilter).toLowerCase() + ' '}tasks for this site` 
                : `Add your first ${recurrenceFilter === 'all' ? '' : getRecurrenceDisplayName(recurrenceFilter).toLowerCase() + ' '}task to get started`
              }
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <SiteModal
        isOpen={siteModalOpen}
        onClose={() => {
          setSiteModalOpen(false);
          setEditingSite(undefined);
        }}
        onSave={handleSiteSave}
        site={editingSite}
      />

      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => {
          setTaskModalOpen(false);
          setEditingTask(undefined);
        }}
        onSave={handleTaskSave}
        onUpdate={handleTaskUpdate}
        sites={sites}
        task={editingTask}
      />
    </div>
  );
};