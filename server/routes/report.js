const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Generate PDF report
router.post('/generate-pdf', (req, res) => {
  try {
    const { patientData, diagnosis } = req.body;

    // Create PDF
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50
    });

    const filename = `ELECTR-PRO_${patientData.patientName}_${Date.now()}.pdf`;
    const filepath = path.join(__dirname, '../../reports', filename);

    // Ensure reports directory exists
    if (!fs.existsSync(path.join(__dirname, '../../reports'))) {
      fs.mkdirSync(path.join(__dirname, '../../reports'), { recursive: true });
    }

    // Pipe to file
    doc.pipe(fs.createWriteStream(filepath));

    // Header
    doc.fontSize(20).font('Helvetica-Bold').text('ELECTR-RO 30PRO BODY TEST', { align: 'center' });
    doc.fontSize(14).text('Advanced Medical Diagnosis System', { align: 'center' });
    doc.fontSize(10).text('Dr. William Clinic', { align: 'center' });
    doc.moveDown();

    // Patient Info
    doc.fontSize(12).font('Helvetica-Bold').text('PATIENT INFORMATION');
    doc.fontSize(10).font('Helvetica').text(`Name: ${patientData.patientName}`);
    doc.text(`Date of Birth: ${new Date(patientData.birthDate).toLocaleDateString()}`);
    doc.text(`Age: ${patientData.age} years`);
    doc.text(`Gender: ${patientData.gender}`);
    doc.text(`Phone: ${patientData.phoneNumber}`);
    doc.text(`Region: ${patientData.region}`);
    doc.moveDown();

    // Zodiac Info
    doc.fontSize(12).font('Helvetica-Bold').text('ASTROLOGICAL PROFILE');
    doc.fontSize(10).font('Helvetica').text(`Zodiac Sign: ${diagnosis.zodiacSign}`);
    doc.moveDown();

    // Diagnosis Results
    doc.fontSize(12).font('Helvetica-Bold').text('DIAGNOSIS RESULTS');
    doc.fontSize(10).font('Helvetica');
    
    doc.text('Possible Conditions (Priority Order):');
    diagnosis.diagnosis.topConditions.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.condition} (Risk Score: ${item.score}/10)`);
    });
    doc.moveDown();

    doc.text('Affected Organs:');
    diagnosis.diagnosis.affectedOrgans.forEach(organ => {
      doc.text(`• ${organ}`);
    });
    doc.moveDown();

    // Recommendations
    doc.fontSize(12).font('Helvetica-Bold').text('RECOMMENDATIONS');
    doc.fontSize(10).font('Helvetica');
    diagnosis.diagnosis.recommendations.forEach(rec => {
      doc.text(`• ${rec}`);
    });
    doc.moveDown();

    // Risk Factors
    doc.fontSize(12).font('Helvetica-Bold').text('RISK FACTORS');
    doc.fontSize(10).font('Helvetica');
    diagnosis.diagnosis.riskFactors.forEach(factor => {
      doc.text(`• ${factor}`);
    });
    doc.moveDown();

    // Footer
    doc.fontSize(8).text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.text('This report is for informational purposes only. Consult a medical professional.', { align: 'center' });

    // Finalize PDF
    doc.end();

    // Send file after it's created
    doc.on('finish', () => {
      res.json({
        success: true,
        filename: filename,
        downloadUrl: `/reports/${filename}`
      });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download PDF
router.get('/download/:filename', (req, res) => {
  try {
    const filepath = path.join(__dirname, '../../reports', req.params.filename);
    res.download(filepath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
