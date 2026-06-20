import React, { useState } from 'react';
import './PatientForm.css';

function PatientForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    patientName: '',
    birthDate: '',
    symptoms: [],
    gender: '',
    phoneNumber: '',
    region: ''
  });

  const [symptomInput, setSymptomInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSymptom = () => {
    if (symptomInput.trim() && formData.symptoms.length < 5) {
      setFormData(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, symptomInput.trim()]
      }));
      setSymptomInput('');
    }
  };

  const handleRemoveSymptom = (index) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.birthDate || !formData.gender || 
        !formData.phoneNumber || !formData.region || formData.symptoms.length === 0) {
      alert('Please fill all fields and add at least one symptom');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>PATIENT DATA ENTRY</h1>
        <p className="form-subtitle">ELECT-RO 30PRO BODY TEST - Patient Information</p>

        <form onSubmit={handleSubmit} className="patient-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            
            <div className="form-group">
              <label>Patient Name *</label>
              <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} placeholder="Enter full name" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth *</label>
                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter phone number" required />
            </div>
            <div className="form-group">
              <label>Region/Location *</label>
              <input type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Enter region" required />
            </div>
          </div>

          <div className="form-section">
            <h3>Health Information</h3>
            <div className="form-group">
              <label>Symptoms (Add up to 5) *</label>
              <div className="symptom-input">
                <input type="text" value={symptomInput} onChange={(e) => setSymptomInput(e.target.value)} placeholder="Enter symptom and press Add" onKeyPress={(e) => e.key === 'Enter' && handleAddSymptom()} />
                <button type="button" onClick={handleAddSymptom} disabled={formData.symptoms.length >= 5} className="btn-add-symptom">ADD</button>
              </div>
              <div className="symptoms-list">
                {formData.symptoms.map((symptom, index) => (
                  <div key={index} className="symptom-tag">
                    <span>{symptom}</span>
                    <button type="button" onClick={() => handleRemoveSymptom(index)} className="remove-symptom">✕</button>
                  </div>
                ))}
              </div>
              <p className="symptom-count">{formData.symptoms.length}/5 symptoms added</p>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">ANALYZE & CONTINUE</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientForm;
