const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/db.config');
const userRoutes = require('./routes/user.routes');
const bonusRoutes = require('./routes/bonus.routes');
const qrCodeRoutes = require('./routes/qrCode.routes');
const apiRoutes = require('./routes/api.routes');

const app = express();
const port = process.env.PORT || 5002; // PORT ətraf mühit dəyişəni ilə əvəzlənə bilər

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

// API Routes
app.use('/api', userRoutes);
app.use('/api', bonusRoutes);
app.use('/api', qrCodeRoutes);
app.use('/api', apiRoutes);

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Database connection and sync
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
