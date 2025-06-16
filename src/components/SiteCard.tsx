import React from 'react';
import { ExternalLink, Edit, Trash2, Globe } from 'lucide-react';
import { Site } from '../types';
import { card, textPrimary, textSecondary, buttonGhost, buttonSecondary } from '../styles/designSystem';

interface SiteCardProps {
  site: Site;
  taskCount: number;
  onEdit: () => void;
  onDelete: () => void;
  onViewTasks: () => void;
}

export const SiteCard: React.FC<SiteCardProps> = ({
  site,
  taskCount,
  onEdit,
  onDelete,
  onViewTasks,
}) => {
  return (
    <div className={`group relative ${card} hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-navy to-indigo rounded-xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className={`font-semibold ${textPrimary} text-lg`}>{site.name}</h3>
            <p className={textSecondary}>{site.platform}</p>
          </div>
        </div>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Edit className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-white/10 hover:bg-status-overdue/50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center space-x-1 ${textSecondary} hover:${textPrimary} transition-colors text-sm`}
          >
            <span className="truncate max-w-[120px]">{site.url}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <button
          onClick={onViewTasks}
          className="px-3 py-1 bg-accent/20 hover:bg-accent/30 text-white rounded-lg text-sm transition-colors"
        >
          {taskCount} tasks
        </button>
      </div>
    </div>
  );
};