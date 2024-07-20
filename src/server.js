const express = require('express');
const path = require('path');
const sequelize = require('./config/db.config');
const userRoutes = require('./routes/user.routes');
const qrCodeRoutes = require('./routes/qrRoutes');
const apiRoutes = require('./routes/api.routes');

const app = express();
const port = 5002;

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', qrCodeRoutes);
app.use('/api', apiRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
