require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nasaRoutes = require('./routes/nasaRoutes');

const app = express();

const allowedOrigins = [
  'https://nasa-frontend-kappa.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow requests like Postman
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Root test route
app.get('/', (req, res) => {
  res.send('NASA Space App Backend');
});

// NASA Routes
app.use('/api', nasaRoutes);

// Export app for testing
module.exports = app;

// Only run the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
