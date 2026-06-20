const express = require('express');
const router = express.Router();
const axios = require('axios');

// Diagnosis logic based on zodiac and symptoms
function generateDiagnosis(zodiacData, age, symptoms, phoneNumber) {
  const possibleConditions = [...zodiacData.commonDiseases];
  
  // Score conditions based on symptoms match
  const scoredConditions = possibleConditions.map(condition => {
    let score = 1; // Base score from zodiac
    
    // Boost score if symptoms match
    symptoms.forEach(symptom => {
      if (condition.toLowerCase().includes(symptom.toLowerCase()) ||
          symptom.toLowerCase().includes(condition.toLowerCase())) {
        score += 2;
      }
    });
    
    // Age-based adjustments
    if (age > 50 && ['Arthritis', 'Heart problems', 'Hypertension'].includes(condition)) {
      score += 1;
    }
    
    return { condition, score };
  }).sort((a, b) => b.score - a.score);

  return {
    topConditions: scoredConditions.slice(0, 3),
    affectedOrgans: zodiacData.organs,
    recommendations: generateRecommendations(zodiacData, age),
    riskFactors: generateRiskFactors(zodiacData, age, symptoms)
  };
}

function generateRecommendations(zodiacData, age) {
  const recommendations = [
    `Monitor ${zodiacData.organs[0]} health regularly`,
    `Strengthen ${zodiacData.organs[0]} through appropriate exercises`,
    `Maintain healthy diet for ${zodiacData.element} signs`,
    'Schedule regular check-ups',
    'Manage stress through meditation'
  ];
  
  if (age > 40) {
    recommendations.push('Annual comprehensive health screening');
  }
  
  return recommendations;
}

function generateRiskFactors(zodiacData, age, symptoms) {
  const factors = [...zodiacData.vulnerabilities];
  
  if (age > 50) factors.push('Age-related degeneration');
  if (symptoms.length > 3) factors.push('Multiple symptom manifestation');
  
  return factors;
}

// Analyze patient data
router.post('/analyze', (req, res) => {
  try {
    const { 
      patientName, 
      birthDate, 
      symptoms, 
      gender, 
      phoneNumber, 
      region,
      zodiacData 
    } = req.body;

    if (!patientName || !birthDate || !symptoms) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const birthDateObj = new Date(birthDate);
    const age = new Date().getFullYear() - birthDateObj.getFullYear();

    const diagnosis = generateDiagnosis(zodiacData, age, symptoms, phoneNumber);

    res.json({
      patientName,
      age,
      gender,
      birthDate,
      phoneNumber,
      region,
      zodiacSign: zodiacData.zodiacSign,
      diagnosis,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
