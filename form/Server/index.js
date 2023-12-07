const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/formDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const FormModel = mongoose.model('Form', formSchema, 'customCollectionName');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
    const formData = req.body;
    console.log('Received form data:', formData);
  
    try {
      const newFormData = new FormModel(formData);
      await newFormData.save();
      console.log('Form data saved to MongoDB');
      res.status(200).json({ message: 'Form data saved successfully!' });
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).json({ error: 'An error occurred while saving form data.' });
    }
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
