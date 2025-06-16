import React, { useState, useEffect } from 'react';
import { Task, Site, ChecklistItem } from '../types';
import { Modal } from './Modal';
import { getDateInputValue } from '../utils/dateUtils';
import { Plus, X } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onUpdate?: (taskId: string, updates: Partial<Task>) => void;
  sites: Site[];
  task?: Task;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  sites,
  task,
}) => {
  const [formData, setFormData] = useState({
    siteId: '',
    title: '',
    status: 'not-started' as Task['status'],
    dueDate: getDateInputValue(new Date()),
    notes: '',
    recurrence: 'none' as Task['recurrence'],
  });
  
  const [checklist, setChecklist] = useState<Omit<ChecklistItem, 'taskId'>[]>([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        siteId: task.siteId,
        title: task.title,
        status: task.status,
        dueDate: getDateInputValue(task.dueDate),
        notes: task.notes,
        recurrence: task.recurrence,
      });
      setChecklist(task.checklist.map(item => ({
        id: item.id,
        content: item.content,
        done: item.done,
      })));
    } else {
      setFormData({
        siteId: sites[0]?.id || '',
        title: '',
        status: 'not-started',
        dueDate: getDateInputValue(new Date()),
        notes: '',
        recurrence: 'none',
      });
      setChecklist([]);
    }
    setNewChecklistItem('');
  }, [task, sites, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.siteId && formData.title) {
      const taskData = {
        ...formData,
        dueDate: new Date(formData.dueDate),
        checklist: checklist.map(item => ({
          ...item,
          taskId: task?.id || '',
        })),
      };

      if (task && onUpdate) {
        onUpdate(task.id, taskData);
      } else {
        onSave(taskData);
      }
      onClose();
    }
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setChecklist(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: newChecklistItem.trim(),
          done: false,
        },
      ]);
      setNewChecklistItem('');
    }
  };

  const removeChecklistItem = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task ? 'Edit Task' : 'Add New Task'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Site
          </label>
          <select
            value={formData.siteId}
            onChange={(e) => setFormData({ ...formData, siteId: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            {sites.map(site => (
              <option key={site.id} value={site.id} className="bg-gray-800">
                {site.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Task Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Update website content..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="not-started" className="bg-gray-800">Not Started</option>
              <option value="in-progress" className="bg-gray-800">In Progress</option>
              <option value="done" className="bg-gray-800">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Recurrence
          </label>
          <select
            value={formData.recurrence}
            onChange={(e) => setFormData({ ...formData, recurrence: e.target.value as Task['recurrence'] })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="none" className="bg-gray-800">None</option>
            <option value="daily" className="bg-gray-800">Daily</option>
            <option value="weekly" className="bg-gray-800">Weekly</option>
            <option value="monthly" className="bg-gray-800">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows={3}
            placeholder="Additional details about this task..."
          />
        </div>

        <div>
          <label className="block text-white/70 text-sm font-medium mb-2">
            Checklist
          </label>
          <div className="space-y-2">
            {checklist.map(item => (
              <div key={item.id} className="flex items-center space-x-2 bg-white/5 rounded-lg p-2">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleChecklistItem(item.id)}
                  className="rounded text-blue-500 focus:ring-blue-400 focus:ring-2"
                />
                <span className={`flex-1 text-white ${item.done ? 'line-through opacity-50' : ''}`}>
                  {item.content}
                </span>
                <button
                  type="button"
                  onClick={() => removeChecklistItem(item.id)}
                  className="p-1 hover:bg-red-500/20 rounded"
                >
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ))}
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Add checklist item..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addChecklistItem())}
              />
              <button
                type="button"
                onClick={addChecklistItem}
                className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4 text-blue-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all"
          >
            {task ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
};