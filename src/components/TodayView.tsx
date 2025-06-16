import React, { useState } from 'react';
import { Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { useAppState } from '../hooks/useAppState';
import { Task } from '../types';
import { formatDate } from '../utils/dateUtils';

export const TodayView: React.FC = () => {
  const {
    sites,
    tasks,
    updateTask,
    addTask,
    getTodayTasks,
    getOverdueTasks,
  } = useAppState();

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const todayTasks = getTodayTasks();
  const overdueTasks = getOverdueTasks();

  const handleTaskEdit = (task: Task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    updateTask(taskId, updates);
    setEditingTask(undefined);
  };

  const groupTasksBySite = (taskList: Task[]) => {
    const grouped: { [siteId: string]: Task[] } = {};
    taskList.forEach(task => {
      if (!grouped[task.siteId]) {
        grouped[task.siteId] = [];
      }
      grouped[task.siteId].push(task);
    });
    return grouped;
  };

  const renderTaskGroup = (title: string, taskList: Task[], icon: React.ReactNode, colorClass: string) => {
    if (taskList.length === 0) return null;

    const groupedTasks = groupTasksBySite(taskList);

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-white/60 text-sm">{taskList.length} tasks</p>
          </div>
        </div>

        {Object.entries(groupedTasks).map(([siteId, siteTasks]) => {
          const site = sites.find(s => s.id === siteId);
          if (!site) return null;

          return (
            <div key={siteId} className="space-y-4">
              <h4 className="text-lg font-medium text-white/80 border-b border-white/10 pb-2">
                {site.name}
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {siteTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    site={site}
                    onStatusChange={updateTask}
                    onEdit={() => handleTaskEdit(task)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Today's Tasks</h1>
        <p className="text-white/60">
          {formatDate(new Date())} • {todayTasks.length + overdueTasks.length} tasks to focus on
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-200 text-sm">Overdue Tasks</p>
              <p className="text-2xl font-bold text-red-100">{overdueTasks.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-orange-500/20 backdrop-blur-md border border-orange-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200 text-sm">Due Today</p>
              <p className="text-2xl font-bold text-orange-100">{todayTasks.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-400" />
          </div>
        </div>

        <div className="bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm">Completed Today</p>
              <p className="text-2xl font-bold text-green-100">
                {tasks.filter(task => 
                  task.status === 'done' && 
                  task.completedAt && 
                  new Date(task.completedAt).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Overdue Tasks */}
      {renderTaskGroup(
        'Overdue Tasks',
        overdueTasks,
        <AlertTriangle className="w-5 h-5 text-white" />,
        'bg-gradient-to-br from-red-500 to-pink-500'
      )}

      {/* Today Tasks */}
      {renderTaskGroup(
        'Due Today',
        todayTasks,
        <Calendar className="w-5 h-5 text-white" />,
        'bg-gradient-to-br from-orange-500 to-red-500'
      )}

      {/* Empty State */}
      {todayTasks.length === 0 && overdueTasks.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-2">All caught up!</h3>
          <p className="text-white/60 text-lg">
            No tasks due today. Great job staying on top of your website maintenance!
          </p>
        </div>
      )}

      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => {
          setTaskModalOpen(false);
          setEditingTask(undefined);
        }}
        onSave={addTask}
        onUpdate={handleTaskUpdate}
        sites={sites}
        task={editingTask}
      />
    </div>
  );
};