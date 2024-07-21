const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../data.json');

const readData = () => {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
};

// Get all participants
router.get('/participants', (req, res) => {
  try {
    const data = readData();
    res.json(data.participants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching participants' });
  }
});

// Get all events
router.get('/events', (req, res) => {
  try {
    const data = readData();
    res.json(data.events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Get promo information
router.get('/promo', (req, res) => {
  try {
    const data = readData();
    res.json(data.promo);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching promo' });
  }
});

// Get all steps
router.get('/steps', (req, res) => {
  try {
    const data = readData();
    res.json(data.steps);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching steps' });
  }
});

module.exports = router;
