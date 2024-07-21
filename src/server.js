// server.js
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api.routes');
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const sequelize = require('./config/db.config');
const userRoutes = require('./routes/user.routes');
const bonusRoutes = require('./routes/bonus.routes');
const qrCodeRoutes = require('./routes/qrCode.routes');
const cors = require('cors');

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', bonusRoutes);
app.use('/api', qrCodeRoutes);

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
