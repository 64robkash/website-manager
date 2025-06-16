# TaskFlow - Personal Website Task Management App

## 🎯 Project Overview & Concept

TaskFlow is a modern, production-ready web application designed for managing recurring website maintenance tasks. It's built as a testable MVP without authentication, focusing on clean UI/UX and comprehensive task management functionality.

### Core Idea
- **Problem**: Website owners struggle to keep track of recurring maintenance tasks across multiple sites
- **Solution**: A centralized dashboard to manage, track, and organize website maintenance tasks with recurring schedules
- **Target Users**: Web developers, site owners, digital agencies managing multiple websites

### Key Value Propositions
1. **Multi-site Management**: Organize tasks by website/project
2. **Recurring Task Automation**: Set daily, weekly, monthly recurring tasks
3. **Progress Tracking**: Visual status tracking and completion history
4. **Today-focused View**: Prioritize what needs attention today
5. **Activity Logging**: Track completion history and patterns

## 🚀 Recent Updates

### Design System Implementation
We've implemented a comprehensive design system that provides a more cohesive and attractive UI:

- **Updated Color Palette**:
  - Primary: Deep navy (`#0f172a`) to indigo (`#312e81`) gradient
  - Accent: Teal (`#0d9488`)
  - Status colors: 
    - Not started: Slate (`#64748b`)
    - In Progress: Amber (`#d97706`)
    - Done: Emerald (`#059669`) 
    - Overdue: Rose (`#e11d48`)

- **Component Styling**:
  - Enhanced card styling with consistent shadows and hover effects
  - Standardized button variants (primary, secondary, ghost, danger)
  - Improved form inputs with better focus states
  - Consistent status badges with border styling

- **Design Tokens**:
  - Created reusable Tailwind classes in a central design system file
  - Implemented consistent text styling and spacing

### Project Roadmap
We've created a comprehensive development roadmap (`ROADMAP.md`) that outlines the planned phases of development:

1. **Phase 0: Initial Cleanup & Redesign** (Current)
   - Remove template-specific files
   - Implement new color scheme
   - Create design system
   - Improve responsive design

2. **Phase 1: Foundation Improvements** 
   - Authentication & User Management
   - Backend Integration
   - State Management Improvements
   - Testing & Quality Assurance

3. **Phase 2: Feature Extensions**
   - Advanced Task Management
   - Notification System
   - Team Collaboration
   - Enhanced UI/UX

4. **Phase 3: Analytics & Integration**
   - Reporting Dashboard
   - Advanced Scheduling
   - Third-Party Service Integrations
   - Mobile Experience

5. **Phase 4: Enterprise Features & Scaling** (Future)

See `ROADMAP.md` for detailed tasks and timelines for each phase.

## 🏗️ Technical Architecture & Code Structure

### Technology Stack
- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system and glassmorphism effects
- **Icons**: Lucide React icon library
- **Build Tool**: Vite for fast development and building
- **State Management**: React hooks (useState) - ready for Supabase integration

### Project Structure
```
src/
├── components/           # React components
│   ├── Dashboard.tsx     # Main dashboard with stats and task management
│   ├── TodayView.tsx     # Today's tasks and overdue items
│   ├── ActivityLog.tsx   # Task completion history
│   ├── Navigation.tsx    # Top navigation bar
│   ├── SiteCard.tsx      # Individual site display card
│   ├── TaskCard.tsx      # Individual task display card
│   ├── SiteModal.tsx     # Add/edit site modal
│   ├── TaskModal.tsx     # Add/edit task modal with checklist
│   └── Modal.tsx         # Reusable modal wrapper
├── hooks/
│   └── useAppState.ts    # Central state management hook
├── styles/
│   └── designSystem.ts   # Centralized design system and component styles
├── utils/
│   └── dateUtils.ts      # Date formatting and comparison utilities
├── types.ts              # TypeScript interfaces and types
├── mockData.ts           # Sample data for development/testing
└── App.tsx               # Main app component with routing logic
```

### Data Models & Relationships

#### Core Entities
```typescript
// Sites - Represents websites being managed
interface Site {
  id: string;
  name: string;           // Display name
  url: string;            // Website URL
  platform: string;       // WordPress, Shopify, React, etc.
  createdAt: Date;
}

// Tasks - Main task entity with full lifecycle
interface Task {
  id: string;
  siteId: string;         // Links to Site
  title: string;
  status: 'not-started' | 'in-progress' | 'done';
  dueDate: Date;
  notes: string;
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly';
  checklist: ChecklistItem[];
  createdAt: Date;
  completedAt?: Date;     // Set when status becomes 'done'
}

// Checklist Items - Subtasks within a task
interface ChecklistItem {
  id: string;
  taskId: string;         // Links to Task
  content: string;
  done: boolean;
}

// Activity Logs - Historical tracking
interface ActivityLog {
  id: string;
  taskId: string;         // Links to Task
  siteId: string;         // Links to Site
  action: string;         // 'Task created', 'Task started', 'Task completed'
  timestamp: Date;
  siteName: string;       // Denormalized for easy display
  taskTitle: string;      // Denormalized for easy display
}
```

#### Data Relationships
- **One-to-Many**: Site → Tasks (one site has many tasks)
- **One-to-Many**: Task → ChecklistItems (one task has many checklist items)
- **One-to-Many**: Task → ActivityLogs (one task generates many log entries)

### State Management Architecture

The app uses a centralized state management pattern through the `useAppState` hook:

```typescript
// Central state hook manages all data and operations
const useAppState = () => {
  // Core data arrays
  const [sites, setSites] = useState<Site[]>(mockSites);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(mockActivityLogs);
  
  // UI state
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  
  // CRUD operations for each entity
  // Computed data functions (getTodayTasks, getOverdueTasks, etc.)
  // Activity logging automation
}
```

### Design System Architecture

Our new design system is implemented through:

```typescript
// src/styles/designSystem.ts
// Component styles as reusable string constants
export const card = "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-card";

export const buttonPrimary = "flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-navy to-indigo hover:scale-105";

// Status badges with consistent styling
export const statusBadge = "px-3 py-1 rounded-full text-xs font-medium";
export const statusInProgress = `${statusBadge} bg-amber-500/30 text-amber-300 border border-amber-500/30`;
```

And Tailwind configuration:

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        'navy': '#0f172a',
        'indigo': '#312e81',
        'accent': '#0d9488',
        'status': {
          'not-started': '#64748b',
          'in-progress': '#d97706', 
          'done': '#059669',
          'overdue': '#e11d48',
        },
      },
      // ...
    }
  }
}
```

## 🚀 Getting Started for AI Agents

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Key Files to Understand First
1. **src/types.ts** - All TypeScript interfaces
2. **src/mockData.ts** - Sample data structure
3. **src/hooks/useAppState.ts** - State management logic
4. **src/styles/designSystem.ts** - Component styling system
5. **src/App.tsx** - Main app structure and routing
6. **ROADMAP.md** - Development plan and future enhancements

## 🔜 Next Steps (From Roadmap)

1. **Complete Design System Implementation**
   - Update remaining components with design system
   - Add dark/light mode toggle
   - Complete responsive design improvements

2. **Auth & Backend Integration**
   - Add user authentication system
   - Connect to backend service (Supabase/Firebase)

3. **Feature Extensions**
   - Advanced task management features
   - Notification system for due/overdue tasks
   - Team collaboration capabilities

See the `ROADMAP.md` file for the complete development plan and detailed tasks.