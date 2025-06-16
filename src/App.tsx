import React from 'react';
import { Dashboard } from './components/Dashboard';
import { TodayView } from './components/TodayView';
import { ActivityLog } from './components/ActivityLog';
import { Navigation } from './components/Navigation';
import { useAppState } from './hooks/useAppState';
import { Globe, Loader2 } from 'lucide-react';
import { mainContainer, contentContainer, textPrimary, textSecondary } from './styles/designSystem';

function App() {
  const { currentView, setCurrentView, loading, error } = useAppState();

  const renderCurrentView = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
          <p className={textPrimary + " text-xl"}>Loading your tasks...</p>
          <p className={textSecondary + " text-sm mt-2"}>This might take a moment</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="p-6 bg-rose-500/20 border border-rose-500/40 rounded-xl text-center">
          <p className="text-rose-100 text-lg mb-2">Oops! Something went wrong</p>
          <p className="text-rose-200/70 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      );
    }
    
    switch (currentView) {
      case 'today':
        return <TodayView />;
      case 'logs':
        return <ActivityLog />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={mainContainer}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-navy/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 border-b border-white/10">
          <div className={contentContainer + " flex items-center justify-between"}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-navy to-indigo rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={textPrimary + " text-2xl font-bold"}>TaskFlow</h1>
                <p className={textSecondary + " text-sm"}>Website Task Manager</p>
              </div>
            </div>
            
            <Navigation currentView={currentView} onViewChange={setCurrentView} />
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className={contentContainer}>
            {renderCurrentView()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;