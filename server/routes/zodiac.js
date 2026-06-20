const express = require('express');
const router = express.Router();

// Zodiac data with health conditions
const zodiacData = {
  'Capricorn': {
    dates: '12-22 to 01-19',
    element: 'Earth',
    commonDiseases: ['Arthritis', 'Bone weakness', 'Skin conditions', 'Depression'],
    organs: ['Bones', 'Teeth', 'Skin'],
    strengths: ['Resilient', 'Strong immunity'],
    vulnerabilities: ['Joint problems', 'Fatigue']
  },
  'Aquarius': {
    dates: '01-20 to 02-18',
    element: 'Air',
    commonDiseases: ['Circulation problems', 'Nervous disorders', 'Varicose veins'],
    organs: ['Circulatory system', 'Nerves', 'Legs'],
    strengths: ['Mental clarity'],
    vulnerabilities: ['Anxiety', 'Circulation issues']
  },
  'Pisces': {
    dates: '02-19 to 03-20',
    element: 'Water',
    commonDiseases: ['Lymphatic issues', 'Immune weakness', 'Allergies', 'Addiction'],
    organs: ['Lymphatic system', 'Immune system', 'Feet'],
    strengths: ['Emotional healing'],
    vulnerabilities: ['Sensitivity', 'Immune compromise']
  },
  'Aries': {
    dates: '03-21 to 04-19',
    element: 'Fire',
    commonDiseases: ['Fever', 'Inflammation', 'Headaches', 'Hypertension'],
    organs: ['Head', 'Brain', 'Adrenal glands'],
    strengths: ['Energy', 'Fast recovery'],
    vulnerabilities: ['Impulsiveness leading to injury', 'High blood pressure']
  },
  'Taurus': {
    dates: '04-20 to 05-20',
    element: 'Earth',
    commonDiseases: ['Thyroid problems', 'Throat issues', 'Weight gain', 'Neck pain'],
    organs: ['Throat', 'Thyroid', 'Neck'],
    strengths: ['Strong digestion'],
    vulnerabilities: ['Stubborn health habits', 'Weight issues']
  },
  'Gemini': {
    dates: '05-21 to 06-20',
    element: 'Air',
    commonDiseases: ['Nervous tension', 'Asthma', 'Respiratory issues', 'Arm pain'],
    organs: ['Lungs', 'Nerves', 'Arms'],
    strengths: ['Mental agility'],
    vulnerabilities: ['Anxiety', 'Breathing issues']
  },
  'Cancer': {
    dates: '06-21 to 07-22',
    element: 'Water',
    commonDiseases: ['Digestive issues', 'Stomach ulcers', 'Breast problems', 'Emotional stress'],
    organs: ['Stomach', 'Breasts', 'Digestive system'],
    strengths: ['Intuitive healing'],
    vulnerabilities: ['Stress-related illness', 'Digestive weakness']
  },
  'Leo': {
    dates: '07-23 to 08-22',
    element: 'Fire',
    commonDiseases: ['Heart problems', 'Back pain', 'High fever', 'Pride-related stress'],
    organs: ['Heart', 'Back', 'Spine'],
    strengths: ['Strong vitality'],
    vulnerabilities: ['Heart disease', 'Pride affecting health']
  },
  'Virgo': {
    dates: '08-23 to 09-22',
    element: 'Earth',
    commonDiseases: ['Digestive problems', 'Anxiety disorders', 'Intestinal issues', 'Perfectionism stress'],
    organs: ['Intestines', 'Nerves', 'Digestive tract'],
    strengths: ['Health consciousness'],
    vulnerabilities: ['Worry', 'Digestive issues']
  },
  'Libra': {
    dates: '09-23 to 10-22',
    element: 'Air',
    commonDiseases: ['Kidney problems', 'Bladder issues', 'Skin allergies', 'Indecision stress'],
    organs: ['Kidneys', 'Bladder', 'Lower back'],
    strengths: ['Balance and harmony'],
    vulnerabilities: ['Kidney issues', 'Relationship stress']
  },
  'Scorpio': {
    dates: '10-23 to 11-21',
    element: 'Water',
    commonDiseases: ['Reproductive issues', 'Sexual dysfunction', 'Obsessive behaviors', 'Toxic buildup'],
    organs: ['Reproductive system', 'Bladder', 'Colon'],
    strengths: ['Deep healing ability'],
    vulnerabilities: ['Reproductive problems', 'Intensity']
  },
  'Sagittarius': {
    dates: '11-22 to 12-21',
    element: 'Fire',
    commonDiseases: ['Liver problems', 'Sciatica', 'Hip issues', 'Overindulgence'],
    organs: ['Liver', 'Hips', 'Thighs'],
    strengths: ['Optimism aids recovery'],
    vulnerabilities: ['Liver issues', 'Carelessness']
  }
};

// Get zodiac sign from birth date
function getZodiacSign(day, month) {
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
}

// Get age
function getAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Route to get zodiac data
router.post('/analyze', (req, res) => {
  try {
    const { birthDate, symptoms } = req.body;
    
    if (!birthDate) {
      return res.status(400).json({ error: 'Birth date required' });
    }

    const date = new Date(birthDate);
    const zodiacSign = getZodiacSign(date.getDate(), date.getMonth() + 1);
    const age = getAge(date);
    const zodiacInfo = zodiacData[zodiacSign];

    res.json({
      zodiacSign,
      age,
      ...zodiacInfo,
      userSymptoms: symptoms || []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
