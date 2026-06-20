import React, { useState } from 'react';
import './DiagnosisResult.css';

function DiagnosisResult({ patientData, diagnosisData, onNewTest }) {
  const [generating, setGenerating] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/report/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientData, diagnosis: diagnosisData })
      });
      
      const data = await response.json();
      if (data.success) {
        setPdfGenerated(true);
        window.open(data.downloadUrl, '_blank');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF');
    } finally {
      setGenerating(false);
    }
  };

  if (!diagnosisData) return <div>Loading...</div>;

  const topCondition = diagnosisData.diagnosis.topConditions[0];

  return (
    <div className="diagnosis-container">
      <div className="diagnosis-header">
        <h1>DIAGNOSIS RESULTS</h1>
        <p>ELECT-RO 30PRO BODY TEST Analysis Complete</p>
      </div>

      <div className="diagnosis-grid">
        <div className="card patient-summary">
          <h3>PATIENT SUMMARY</h3>
          <div className="patient-info">
            <div className="info-row"><span className="label">Name:</span><span className="value">{patientData.patientName}</span></div>
            <div className="info-row"><span className="label">Age:</span><span className="value">{diagnosisData.age} years</span></div>
            <div className="info-row"><span className="label">Date of Birth:</span><span className="value">{new Date(patientData.birthDate).toLocaleDateString()}</span></div>
            <div className="info-row"><span className="label">Zodiac Sign:</span><span className="value zodiac">{diagnosisData.zodiacSign}</span></div>
            <div className="info-row"><span className="label">Gender:</span><span className="value">{patientData.gender}</span></div>
          </div>
        </div>

        <div className="card primary-diagnosis">
          <h3>PRIMARY DIAGNOSIS</h3>
          <div className="main-condition">
            <div className="condition-name">{topCondition.condition}</div>
            <div className="condition-score">Risk Score: {topCondition.score}/10</div>
          </div>
        </div>

        <div className="card conditions-list">
          <h3>POSSIBLE CONDITIONS (Priority Order)</h3>
          <ol className="conditions">
            {diagnosisData.diagnosis.topConditions.map((item, index) => (
              <li key={index}>
                <span className="rank">{index + 1}</span>
                <span className="condition">{item.condition}</span>
                <span className="score">Score: {item.score}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="card affected-organs">
          <h3>AFFECTED ORGANS</h3>
          <div className="organs-grid">
            {diagnosisData.diagnosis.affectedOrgans.map((organ, index) => (
              <div key={index} className="organ-item">
                <div className="organ-icon">🏥</div>
                <div className="organ-name">{organ}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card risk-factors">
          <h3>RISK FACTORS</h3>
          <ul className="factors-list">
            {diagnosisData.diagnosis.riskFactors.map((factor, index) => (
              <li key={index}><span className="risk-icon">⚠️</span><span>{factor}</span></li>
            ))}
          </ul>
        </div>

        <div className="card recommendations">
          <h3>RECOMMENDATIONS</h3>
          <ul className="recommendations-list">
            {diagnosisData.diagnosis.recommendations.map((rec, index) => (
              <li key={index}><span className="rec-icon">✓</span><span>{rec}</span></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="diagnosis-actions">
        <button onClick={generatePDF} disabled={generating} className="btn-pdf">
          {generating ? 'GENERATING...' : '📄 GENERATE PDF REPORT'}
        </button>
        <button onClick={onNewTest} className="btn-new-test">➕ NEW TEST</button>
      </div>

      {pdfGenerated && <div className="pdf-notification">✓ PDF Report generated and downloaded successfully!</div>}
    </div>
  );
}

export default DiagnosisResult;
