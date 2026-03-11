import { useState, useEffect } from 'react'
import UploadScreen from './components/UploadScreen'
import Dashboard from './components/Dashboard'

function App() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'upload' | 'dashboard'>('upload');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleUploadSuccess = (data: any) => {
    setAnalysisData(data);
    setCurrentView('dashboard');
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <>
      {currentView === 'dashboard' && analysisData ? (
        <Dashboard 
          data={analysisData} 
          onNavigateUpload={() => setCurrentView('upload')}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      ) : (
        <UploadScreen 
          onUploadSuccess={handleUploadSuccess} 
          onNavigateDashboard={() => {
            if (analysisData) setCurrentView('dashboard');
            else alert('Please upload data first.');
          }}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />
      )}
    </>
  )
}

export default App
