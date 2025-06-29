require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nasaRoutes = require('./routes/nasaRoutes');

const app = express();
const PORT = 5000;

app.use(cors());

// Root test route
app.get('/', (req, res) => {
    res.send('NASA Space App Backend');
});

// NASA Routes
app.use('/api', nasaRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

if (require.main === module) {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
