import React, { useState } from 'react';
import axios from 'axios';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // This code essentially helps in managing form input changes by updating the state (formData) of the form as the user types into the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // handle data submitted through a form before allowing the default form submission to occur.
  const handleSubmit = async (e) => {
    e.preventDefault();


  // for the asynchrnous form submission POST method
    try {
      const response = await axios.post('http://localhost:5000/submit-form', formData);
      console.log('Form submission response:', response.data);
      // Optionally, you can handle the response here
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  };
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="name" style={styles.label}>Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <label htmlFor="email" style={styles.label}>Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <label htmlFor="message" style={styles.label}>Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          style={{ ...styles.input, ...styles.textArea }}
          required
        />

        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

// Styles object for the form components
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  form: {
    width: '300px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '15px',
    borderRadius: '3px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    fontSize: '14px',
  },
  textArea: {
    height: '80px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '3px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default FormComponent;
