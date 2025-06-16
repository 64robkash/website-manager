import React from 'react';
import { Calendar, Clock, CheckCircle, Circle, RotateCcw } from 'lucide-react';
import { Task, Site } from '../types';
import { formatDate, isOverdue, isToday } from '../utils/dateUtils';
import { 
  card, textPrimary, textSecondary, textMuted,
  taskStatusNotStarted, taskStatusInProgress, taskStatusDone,
  startButton, completeButton, overdueTag, dueTodayTag
} from '../styles/designSystem';

interface TaskCardProps {
  task: Task;
  site: Site;
  onStatusChange: (taskId: string, updates: Partial<Task>) => void;
  onEdit: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  site,
  onStatusChange,
  onEdit,
}) => {
  const getStatusClass = (status: Task['status']) => {
    switch (status) {
      case 'done':
        return taskStatusDone;
      case 'in-progress':
        return taskStatusInProgress;
      default:
        return taskStatusNotStarted;
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'done':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const completedItems = task.checklist.filter(item => item.done).length;
  const totalItems = task.checklist.length;
  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const overdue = isOverdue(task.dueDate) && task.status !== 'done';
  const dueToday = isToday(task.dueDate);

  return (
    <div
      className={`${card} hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg ${
        overdue ? 'border-rose-500/50' : dueToday ? 'border-amber-500/50' : 'border-white/20'
      }`}
      onClick={onEdit}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className={textSecondary + ' text-sm font-medium'}>{site.name}</span>
          {task.recurrence !== 'none' && (
            <div className="flex items-center space-x-1 text-accent">
              <RotateCcw className="w-3 h-3" />
              <span className="text-xs">{task.recurrence}</span>
            </div>
          )}
        </div>
        <div className={getStatusClass(task.status)}>
          {getStatusIcon(task.status)}
          <span className="capitalize">{task.status.replace('-', ' ')}</span>
        </div>
      </div>

      <h3 className={`font-semibold ${textPrimary} text-lg mb-2`}>{task.title}</h3>
      
      {task.notes && (
        <p className={textSecondary + ' text-sm mb-3 line-clamp-2'}>{task.notes}</p>
      )}

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-sm">
            <Calendar className={`w-4 h-4 ${overdue ? 'text-rose-400' : dueToday ? 'text-amber-400' : textSecondary}`} />
            <span className={overdue ? 'text-rose-300' : dueToday ? 'text-amber-300' : textSecondary}>
              {overdue ? 'Overdue' : dueToday ? 'Due today' : formatDate(task.dueDate)}
            </span>
          </div>
          
          {totalItems > 0 && (
            <div className={textSecondary + ' text-sm'}>
              {completedItems}/{totalItems} completed
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          {task.status !== 'done' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const newStatus = task.status === 'not-started' ? 'in-progress' : 'done';
                onStatusChange(task.id, { status: newStatus });
              }}
              className={task.status === 'not-started' ? startButton : completeButton}
            >
              {task.status === 'not-started' ? 'Start' : 'Complete'}
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {totalItems > 0 && (
        <div className="mt-1">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={textSecondary}>Progress</span>
            <span className={textSecondary}>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-2 rounded-full ${
                task.status === 'done' ? 'bg-emerald-500' : 
                progressPercentage > 0 ? 'bg-amber-500' : 'bg-slate-500'
              } transition-all duration-300`} 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};