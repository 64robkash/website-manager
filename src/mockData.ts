import { Site, Task, ActivityLog } from './types';

export const mockSites: Site[] = [
  {
    id: '1',
    name: 'Personal Blog',
    url: 'https://myblog.com',
    platform: 'WordPress',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'E-commerce Store',
    url: 'https://mystore.com',
    platform: 'Shopify',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'Portfolio Site',
    url: 'https://portfolio.dev',
    platform: 'Netlify',
    createdAt: new Date('2024-02-01'),
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    siteId: '1',
    title: 'Update security plugins',
    status: 'not-started',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    notes: 'Check for WordPress core updates and security patches',
    recurrence: 'weekly',
    checklist: [
      { id: '1', taskId: '1', content: 'Backup website', done: false },
      { id: '2', taskId: '1', content: 'Update WordPress core', done: false },
      { id: '3', taskId: '1', content: 'Update security plugins', done: false },
    ],
    createdAt: new Date('2024-12-01'),
  },
  {
    id: '2',
    siteId: '2',
    title: 'Inventory review',
    status: 'in-progress',
    dueDate: new Date(), // Today
    notes: 'Review stock levels and update product availability',
    recurrence: 'monthly',
    checklist: [
      { id: '4', taskId: '2', content: 'Export inventory report', done: true },
      { id: '5', taskId: '2', content: 'Check low stock items', done: false },
      { id: '6', taskId: '2', content: 'Update product listings', done: false },
    ],
    createdAt: new Date('2024-11-28'),
  },
  {
    id: '3',
    siteId: '3',
    title: 'Performance optimization',
    status: 'done',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
    notes: 'Optimize images and improve Core Web Vitals scores',
    recurrence: 'monthly',
    checklist: [
      { id: '7', taskId: '3', content: 'Compress images', done: true },
      { id: '8', taskId: '3', content: 'Minify CSS/JS', done: true },
      { id: '9', taskId: '3', content: 'Test performance', done: true },
    ],
    createdAt: new Date('2024-11-25'),
    completedAt: new Date('2024-12-14'),
  },
  {
    id: '4',
    siteId: '1',
    title: 'Content backup',
    status: 'not-started',
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago (overdue)
    notes: 'Create full backup of blog content and media files',
    recurrence: 'weekly',
    checklist: [
      { id: '10', taskId: '4', content: 'Export blog posts', done: false },
      { id: '11', taskId: '4', content: 'Download media files', done: false },
      { id: '12', taskId: '4', content: 'Store in cloud backup', done: false },
    ],
    createdAt: new Date('2024-11-20'),
  },
  {
    id: '5',
    siteId: '2',
    title: 'Check uptime monitoring',
    status: 'not-started',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    notes: 'Verify all monitoring services are working correctly',
    recurrence: 'daily',
    checklist: [
      { id: '13', taskId: '5', content: 'Check monitoring dashboard', done: false },
      { id: '14', taskId: '5', content: 'Verify alert notifications', done: false },
    ],
    createdAt: new Date('2024-12-10'),
  },
  {
    id: '6',
    siteId: '3',
    title: 'Review analytics',
    status: 'in-progress',
    dueDate: new Date(), // Today
    notes: 'Daily check of website analytics and performance metrics',
    recurrence: 'daily',
    checklist: [
      { id: '15', taskId: '6', content: 'Check Google Analytics', done: true },
      { id: '16', taskId: '6', content: 'Review Core Web Vitals', done: false },
      { id: '17', taskId: '6', content: 'Monitor error logs', done: false },
    ],
    createdAt: new Date('2024-12-14'),
  },
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    taskId: '3',
    siteId: '3',
    action: 'Task completed',
    timestamp: new Date('2024-12-14T10:30:00'),
    siteName: 'Portfolio Site',
    taskTitle: 'Performance optimization',
  },
  {
    id: '2',
    taskId: '2',
    siteId: '2',
    action: 'Task started',
    timestamp: new Date('2024-12-13T14:15:00'),
    siteName: 'E-commerce Store',
    taskTitle: 'Inventory review',
  },
  {
    id: '3',
    taskId: '1',
    siteId: '1',
    action: 'Task created',
    timestamp: new Date('2024-12-01T09:00:00'),
    siteName: 'Personal Blog',
    taskTitle: 'Update security plugins',
  },
  {
    id: '4',
    taskId: '6',
    siteId: '3',
    action: 'Task started',
    timestamp: new Date('2024-12-14T08:00:00'),
    siteName: 'Portfolio Site',
    taskTitle: 'Review analytics',
  },
];