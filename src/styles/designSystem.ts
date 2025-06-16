/**
 * TaskFlow Design System
 * 
 * This file contains reusable component styles as string constants
 * for consistent styling across the application.
 */

// Card styles
export const card = "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-card transition-all hover:shadow-card-hover";

// Button variants
export const buttonBase = "flex items-center justify-center space-x-2 px-4 py-2 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy focus:ring-white/30";

export const buttonPrimary = `${buttonBase} bg-gradient-to-r from-navy to-indigo hover:from-indigo hover:to-navy text-white hover:scale-105`;
export const buttonSecondary = `${buttonBase} bg-white/20 hover:bg-white/30 text-white hover:scale-105`;
export const buttonDanger = `${buttonBase} bg-status-overdue hover:bg-red-700 text-white hover:scale-105`;
export const buttonGhost = `${buttonBase} bg-transparent hover:bg-white/10 text-white/70 hover:text-white`;

// Status badges
export const statusBadge = "px-3 py-1 rounded-full text-xs font-medium";
export const statusNotStarted = `${statusBadge} bg-slate-500/30 text-white border border-slate-500/30`;
export const statusInProgress = `${statusBadge} bg-amber-500/30 text-amber-300 border border-amber-500/30`;
export const statusDone = `${statusBadge} bg-emerald-500/30 text-emerald-300 border border-emerald-500/30`;
export const statusOverdue = `${statusBadge} bg-rose-500/30 text-rose-300 border border-rose-500/30`;

// Input fields
export const inputField = "w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent";

// Section headings
export const sectionHeading = "text-2xl font-bold text-white mb-6";
export const subHeading = "text-xl font-semibold text-white mb-3";

// Card status icons
export const statusIcon = "w-12 h-12 rounded-xl flex items-center justify-center";
export const statusIconNotStarted = `${statusIcon} bg-gradient-to-br from-slate-500 to-slate-600`;
export const statusIconInProgress = `${statusIcon} bg-gradient-to-br from-amber-500 to-amber-600`;
export const statusIconDone = `${statusIcon} bg-gradient-to-br from-emerald-500 to-emerald-600`;
export const statusIconOverdue = `${statusIcon} bg-gradient-to-br from-rose-500 to-rose-600`;

// Text styles
export const textPrimary = "text-white";
export const textSecondary = "text-white/70"; 
export const textMuted = "text-white/50";

// Layout containers
export const mainContainer = "min-h-screen bg-gradient-to-br from-navy via-indigo to-accent/50 relative overflow-hidden";
export const contentContainer = "max-w-7xl mx-auto";
export const sectionContainer = "space-y-8";
export const gridContainer = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
export const statsGrid = "grid grid-cols-1 md:grid-cols-4 gap-6";

// Task card status tags
export const taskStatusTag = "px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1";
export const taskStatusNotStarted = `${taskStatusTag} bg-slate-500/20 text-slate-300 border border-slate-500/40`;
export const taskStatusInProgress = `${taskStatusTag} bg-amber-500/20 text-amber-300 border border-amber-500/40`;
export const taskStatusDone = `${taskStatusTag} bg-emerald-500/20 text-emerald-300 border border-emerald-500/40`;

// Action buttons
export const actionButton = "px-3 py-1 rounded-lg text-xs font-medium transition-colors text-white";
export const startButton = `${actionButton} bg-amber-500/30 hover:bg-amber-500/50 border border-amber-500/50`;
export const completeButton = `${actionButton} bg-emerald-500/30 hover:bg-emerald-500/50 border border-emerald-500/50`;
export const overdueTag = `${actionButton} bg-rose-500/30 border border-rose-500/50 text-rose-300`;
export const dueTodayTag = `${actionButton} bg-amber-500/30 border border-amber-500/50 text-amber-300`; 