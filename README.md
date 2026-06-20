# ELECTR-PRO - Advanced Medical Diagnosis System

**ELECT-RO 30PRO BODY TEST** - Professional medical diagnosis application with zodiac and astrological health analysis integration for Dr. William Clinic.

## Features

✨ **Splash Screen Animation** - Professional ELECT-RO 30PRO branding
⏳ **Loading Screen** - 3-minute simulation for sensor pad connection
📋 **Patient Data Entry** - Complete patient information form
🔬 **Advanced Diagnosis** - Medical analysis based on symptoms and zodiac signs
📊 **Zodiac Integration** - Astrological health profiles for 12 zodiac signs
📄 **PDF Reports** - Generate professional diagnosis reports
💾 **Data Management** - Store and retrieve patient analysis

## System Architecture

### Frontend (React)
- **SplashScreen** - Animated introduction with ELECT-RO branding
- **LoadingScreen** - Progress simulation with status messages
- **PatientForm** - Multi-section data entry form
- **DiagnosisResult** - Complete diagnosis display with PDF generation

### Backend (Node.js + Express)
- **Zodiac Routes** - Zodiac analysis and health profiles
- **Diagnosis Routes** - Patient analysis logic
- **Report Routes** - PDF generation and management

## Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Setup

1. **Install backend dependencies**
```bash
npm install
```

2. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

3. **Create .env file**
```bash
echo "PORT=5000" > .env
```

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start both backend (port 5000) and frontend (port 3000) concurrently.

### Production Build
```bash
npm run build
npm start
```

## Usage

1. **Application starts** with animated splash screen
2. **Loading screen** appears - simulating 3-minute sensor pad connection
3. **Patient form** collects patient information
4. **System analyzes** zodiac sign and associated health conditions
5. **Diagnosis results** display with PDF report generation

## Technology Stack

- **Frontend**: React 18
- **Backend**: Express.js, Node.js
- **Styling**: CSS3 (with animations)
- **PDF Generation**: PDFKit
- **HTTP Client**: Axios

## License

ISC - Dr. William Clinic
