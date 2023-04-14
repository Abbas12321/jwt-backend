const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
