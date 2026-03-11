import React, { useState } from 'react';
import Sidebar from './Sidebar';

interface UploadScreenProps {
  onUploadSuccess: (data: any) => void;
  onNavigateDashboard: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ onUploadSuccess, onNavigateDashboard, isDarkMode, toggleTheme }) => {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [uploading, setUploadStatus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    setUploadStatus(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Success: ${data.message}`);
        setTimeout(() => onUploadSuccess(data.analysis), 1000);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Error: Failed to connect to server');
    } finally {
      setUploadStatus(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <Sidebar 
        currentView="upload" 
        onNavigateUpload={() => {}} 
        onNavigateDashboard={onNavigateDashboard}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background-light dark:bg-background-dark relative">
        <header className="h-16 border-b border-primary/10 flex items-center justify-between px-8 bg-background-light/50 dark:bg-background-dark/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Data Management</span>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-slate-100 font-medium">Upload Dataset</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black tracking-tight dark:text-slate-50">Upload Social Media Dataset</h2>
              <p className="text-slate-500 max-w-2xl">Securely ingest and process your data with deep neural analysis.</p>
            </div>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                {/* Format Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <label className="cursor-pointer group" onClick={() => setFormat('csv')}>
                    <div className={`p-4 rounded-xl border transition-all flex items-center gap-4 ${format === 'csv' ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'border-primary/10 bg-primary/5'}`}>
                      <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-2xl font-bold">description</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">CSV / Excel</p>
                        <p className="text-xs text-slate-500">Standard tabular data</p>
                      </div>
                    </div>
                  </label>
                  <label className="cursor-pointer group" onClick={() => setFormat('json')}>
                    <div className={`p-4 rounded-xl border transition-all flex items-center gap-4 ${format === 'json' ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'border-primary/10 bg-primary/5'}`}>
                      <div className="size-12 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-2xl font-bold">code</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">JSON Objects</p>
                        <p className="text-xs text-slate-500">Nested structural data</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Drop Zone */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                  <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 dark:bg-background-dark/80 px-10 py-20 text-center transition-all">
                    <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
                      <span className="material-symbols-outlined text-5xl text-primary">upload_file</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{file ? file.name : 'Drop Files Here'}</h3>
                    <p className="text-slate-500 text-sm mb-4 max-w-sm">Drag and drop your dataset or use the system browser.</p>
                    <div className="bg-slate-800/50 p-3 rounded-lg text-xs text-slate-400 mb-6 text-left">
                      <p className="font-bold text-slate-200 mb-1">Expected CSV Fields:</p>
                      <p>• Post text (Required)</p>
                      <p>• Hashtags, Timestamp, Likes (Optional)</p>
                    </div>
                    <input type="file" className="hidden" id="fileInput" onChange={handleFileChange} accept={format === 'csv' ? '.csv' : '.json'} />
                    <label htmlFor="fileInput" className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-sm transition-all shadow-lg cursor-pointer flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg">folder_open</span>
                      Browse System
                    </label>
                  </div>
                </div>

                {/* Upload Button */}
                <button 
                  onClick={handleUpload}
                  disabled={uploading || !file}
                  className={`px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-primary/20 ${uploading || !file ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                >
                  {uploading ? 'Processing...' : 'Ingest Data & Analyze'}
                </button>

                {message && (
                  <div className={`p-4 rounded-xl border ${message.startsWith('Success') ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadScreen;
