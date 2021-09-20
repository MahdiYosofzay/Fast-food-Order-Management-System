const express = require('express');
const dbConnection = require('./config/database');

const app = express();

app.use(express.json({ extended: false }));

//Connect to Database
dbConnection();

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/items', require('./routes/api/items'));
app.use('/api/categories', require('./routes/api/categories'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app is running on port ${port}...`));
