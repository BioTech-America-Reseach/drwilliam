import React, { useState } from 'react';
import './App.css';
import SplashScreen from './components/SplashScreen';
import LoadingScreen from './components/LoadingScreen';
import PatientForm from './components/PatientForm';
import DiagnosisResult from './components/DiagnosisResult';

function App() {
  const [screen, setScreen] = useState('splash');
  const [patientData, setPatientData] = useState(null);
  const [diagnosisData, setDiagnosisData] = useState(null);

  const handleSplashComplete = () => setScreen('loading');

  const handleLoadingComplete = () => setScreen('form');

  const handleFormSubmit = async (formData) => {
    setPatientData(formData);
    setScreen('loading');
    
    const zodiacResponse = await fetch('/api/zodiac/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ birthDate: formData.birthDate, symptoms: formData.symptoms })
    });
    const zodiacData = await zodiacResponse.json();

    const diagnosisResponse = await fetch('/api/diagnosis/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, zodiacData })
    });
    const diagnosis = await diagnosisResponse.json();

    setDiagnosisData(diagnosis);
    setScreen('diagnosis');
  };

  const handleNewTest = () => {
    setPatientData(null);
    setDiagnosisData(null);
    setScreen('form');
  };

  return (
    <div className="App">
      {screen === 'splash' && <SplashScreen onComplete={handleSplashComplete} />}
      {screen === 'loading' && <LoadingScreen onComplete={handleLoadingComplete} />}
      {screen === 'form' && <PatientForm onSubmit={handleFormSubmit} />}
      {screen === 'diagnosis' && <DiagnosisResult patientData={patientData} diagnosisData={diagnosisData} onNewTest={handleNewTest} />}
    </div>
  );
}

export default App;
