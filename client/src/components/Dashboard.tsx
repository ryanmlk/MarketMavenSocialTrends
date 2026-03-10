import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Sidebar from './Sidebar';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface DashboardProps {
  data: {
    totalConversations: number;
    trend: number;
    keywords: { name: string; growth: number; percentage: number }[];
    correlations: { pair: string; score: number; level: string }[];
    themes: { title: string; impact: string; description: string }[];
  };
  onNavigateUpload: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onNavigateUpload }) => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        fill: true,
        label: 'Conversations',
        data: [120, 190, 300, 500, 200, 300, 450],
        borderColor: '#6a25f4',
        backgroundColor: 'rgba(106, 37, 244, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Sidebar 
        currentView="dashboard" 
        onNavigateUpload={onNavigateUpload} 
        onNavigateDashboard={() => {}} 
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark relative">
        <header className="h-16 border-b border-primary/10 flex items-center justify-between px-8 bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Data Management</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-slate-100 font-medium">Dashboard Analysis</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            <header className="mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Social Analysis Dashboard</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time conversation monitoring and correlation analysis</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/30">
                  Export Report
                </button>
              </div>
            </header>

            {/* Hero Section */}
            <section className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-xl p-8 mb-8 relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col justify-center">
                  <p className="text-slate-400 font-medium uppercase tracking-widest text-xs mb-1">Total Impact</p>
                  <h3 className="text-slate-500 dark:text-slate-400 text-lg font-medium">Analyzed Conversations</h3>
                  <p className="text-5xl font-black text-slate-900 dark:text-white my-3 tracking-tighter">
                    {data.totalConversations.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-500 font-bold">
                    <span className="material-symbols-outlined">trending_up</span>
                    <span>+{data.trend}%</span>
                    <span className="text-slate-400 dark:text-slate-500 font-normal text-sm ml-1 italic">vs last month</span>
                  </div>
                </div>
                <div className="md:w-2/3 h-48">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </section>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Trending Keywords */}
              <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/5 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                    Trending Keywords
                  </h4>
                </div>
                <div className="space-y-6">
                  {data.keywords.map((kw, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-slate-800 dark:text-slate-200">{kw.name}</span>
                        <span className="text-emerald-500 font-bold text-sm">+{kw.growth}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(106,37,244,0.5)]" style={{ width: `${kw.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Correlation Analysis */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">hub</span>
                  Correlation Analysis
                </h4>
                <div className="flex flex-col gap-4">
                  {data.correlations.map((cor, i) => (
                    <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs">
                        {cor.score}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{cor.pair}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold">{cor.level}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Themes */}
            <section className="mt-8">
              <h4 className="text-2xl font-black mb-6 flex items-center gap-3">
                Key Themes
                <div className="h-1 flex-1 bg-gradient-to-r from-primary to-transparent opacity-20"></div>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.themes.map((theme, i) => (
                  <div key={i} className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-slate-800 border border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">{theme.impact}</p>
                      <h5 className="text-xl font-bold text-white leading-tight">{theme.title}</h5>
                      <p className="text-slate-300 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {theme.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
