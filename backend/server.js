require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nasaRoutes = require('./routes/nasaRoutes');

const app = express();

// Temporarily allow all origins to fix CORS issues
app.use(cors());

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
