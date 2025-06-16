/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary gradient colors
        'navy': '#0f172a',
        'indigo': '#312e81',
        
        // Accent color
        'accent': '#0d9488',
        
        // Status colors
        'status': {
          'not-started': '#64748b', // slate
          'in-progress': '#d97706', // amber
          'done': '#059669', // emerald
          'overdue': '#e11d48', // rose
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right bottom, var(--tw-gradient-stops))',
      },
    },
  },
  safelist: [
    // Status colors that might be dynamically generated
    'text-amber-300', 'text-emerald-300', 'text-rose-300', 'text-slate-300',
    'border-amber-500', 'border-emerald-500', 'border-rose-500', 'border-slate-500',
    'bg-amber-500/30', 'bg-emerald-500/30', 'bg-rose-500/30', 'bg-slate-500/30',
    'bg-amber-500/20', 'bg-emerald-500/20', 'bg-rose-500/20', 'bg-slate-500/20',
    'hover:bg-amber-500/50', 'hover:bg-emerald-500/50', 'hover:bg-rose-500/50',
  ],
  plugins: [],
};
