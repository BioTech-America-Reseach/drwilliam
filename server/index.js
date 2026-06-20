const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
const diagnosisRoutes = require('./routes/diagnosis');
const zodiacRoutes = require('./routes/zodiac');
const reportRoutes = require('./routes/report');

app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/zodiac', zodiacRoutes);
app.use('/api/report', reportRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ELECTR-PRO System Active' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🏥 ELECTR-PRO Server running on port ${PORT}`);
});

module.exports = app;
