import React from 'react';
import { LayoutDashboard, Calendar, Activity } from 'lucide-react';
import { ViewType } from '../types';
import { card, buttonGhost, textSecondary, textPrimary } from '../styles/designSystem';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard' as ViewType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'today' as ViewType, label: 'Today', icon: Calendar },
    { id: 'logs' as ViewType, label: 'Activity', icon: Activity },
  ];

  return (
    <nav className={card + " p-2"}>
      <div className="flex space-x-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-white/20 ' + textPrimary + ' shadow-lg'
                  : textSecondary + ' hover:' + textPrimary + ' hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};