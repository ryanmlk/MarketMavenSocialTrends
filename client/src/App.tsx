import { useState } from 'react'
import UploadScreen from './components/UploadScreen'
import Dashboard from './components/Dashboard'

function App() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'upload' | 'dashboard'>('upload');

  const handleUploadSuccess = (data: any) => {
    setAnalysisData(data);
    setCurrentView('dashboard');
  };

  return (
    <>
      {currentView === 'dashboard' && analysisData ? (
        <Dashboard 
          data={analysisData} 
          onNavigateUpload={() => setCurrentView('upload')} 
        />
      ) : (
        <UploadScreen 
          onUploadSuccess={handleUploadSuccess} 
          onNavigateDashboard={() => {
            if (analysisData) setCurrentView('dashboard');
            else alert('Please upload data first.');
          }}
        />
      )}
    </>
  )
}

export default App
