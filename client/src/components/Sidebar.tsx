import React from 'react';

interface SidebarProps {
  currentView: 'upload' | 'dashboard';
  onNavigateUpload: () => void;
  onNavigateDashboard: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigateUpload, onNavigateDashboard }) => {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-primary/10 bg-background-light dark:bg-background-dark/50 backdrop-blur-xl flex flex-col h-full fixed md:relative z-20">
      <div className="p-6 flex flex-col gap-8 h-full">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl font-bold">query_stats</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">Insights Engine</h1>
            <p className="text-[10px] uppercase tracking-widest text-primary font-bold">Enterprise Pro</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 flex-1">
          <button 
            onClick={onNavigateDashboard} 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full text-left ${currentView === 'dashboard' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-primary/10 hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-xl">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <button 
            onClick={onNavigateUpload} 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full text-left ${currentView === 'upload' ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-primary/10 hover:text-primary'}`}
          >
            <span className="material-symbols-outlined text-xl">cloud_upload</span>
            <span className="text-sm font-medium">Data Upload</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
