import React from 'react';
import { Activity, CheckCircle, Clock, Plus } from 'lucide-react';
import { useAppState } from '../hooks/useAppState';
import { formatDateTime, formatRelativeTime } from '../utils/dateUtils';

export const ActivityLog: React.FC = () => {
  const { activityLogs } = useAppState();

  const getActionIcon = (action: string) => {
    if (action.includes('completed')) {
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    } else if (action.includes('started')) {
      return <Clock className="w-4 h-4 text-yellow-400" />;
    } else if (action.includes('created')) {
      return <Plus className="w-4 h-4 text-blue-400" />;
    }
    return <Activity className="w-4 h-4 text-white/60" />;
  };

  const getActionColor = (action: string) => {
    if (action.includes('completed')) {
      return 'bg-green-500/20 border-green-500/30';
    } else if (action.includes('started')) {
      return 'bg-yellow-500/20 border-yellow-500/30';
    } else if (action.includes('created')) {
      return 'bg-blue-500/20 border-blue-500/30';
    }
    return 'bg-white/10 border-white/20';
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Activity Log</h1>
        <p className="text-white/60">
          Track your website maintenance activities and progress over time
        </p>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Activities</p>
              <p className="text-2xl font-bold text-white">{activityLogs.length}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Tasks Completed</p>
              <p className="text-2xl font-bold text-green-400">
                {activityLogs.filter(log => log.action.includes('completed')).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">This Week</p>
              <p className="text-2xl font-bold text-orange-400">
                {activityLogs.filter(log => {
                  const logDate = new Date(log.timestamp);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return logDate >= weekAgo;
                }).length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
        
        {activityLogs.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-lg">No activity yet</p>
            <p className="text-white/40 text-sm mt-2">
              Start managing your website tasks to see activity here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activityLogs.map((log, index) => (
              <div
                key={log.id}
                className={`relative p-4 rounded-xl border transition-all hover:scale-[1.02] ${getActionColor(log.action)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getActionIcon(log.action)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white font-medium">
                        {log.action}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-white/60">
                        <span>{formatRelativeTime(log.timestamp)}</span>
                        <span>•</span>
                        <span>{formatDateTime(log.timestamp)}</span>
                      </div>
                    </div>
                    
                    <p className="text-white/80 mb-2">
                      <span className="font-medium">{log.taskTitle}</span>
                    </p>
                    
                    <p className="text-white/60 text-sm">
                      Site: {log.siteName}
                    </p>
                  </div>
                </div>
                
                {/* Timeline connector */}
                {index < activityLogs.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-6 bg-white/20" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};