export interface Site {
  id: string;
  name: string;
  url: string;
  platform: string;
  createdAt: Date;
}

export interface ChecklistItem {
  id: string;
  taskId: string;
  content: string;
  done: boolean;
}

export interface Task {
  id: string;
  siteId: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'done';
  dueDate: Date;
  notes: string;
  recurrence: 'none' | 'daily' | 'weekly' | 'monthly';
  checklist: ChecklistItem[];
  createdAt: Date;
  completedAt?: Date;
}

export interface ActivityLog {
  id: string;
  taskId: string;
  siteId: string;
  action: string;
  timestamp: Date;
  siteName: string;
  taskTitle: string;
}

export type ViewType = 'dashboard' | 'today' | 'logs';