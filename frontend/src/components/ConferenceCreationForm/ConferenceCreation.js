import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from '../../css/ConferenceCreationForm/ConferenceCreation.module.css';
import Header from './Header';
import { OrganizerHeader } from '../Schedule/OrganizerHeader';
import Button from './Button';
import Footer from '../Entrypage/Footer';

const ConferenceCreationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    speakers: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/conferences/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const message = await response.json();
        throw new Error(message.error || 'Failed to create conference');
      }

      const data = await response.json();
      console.log('Form Submitted Successfully:', data);

      setFormData({ name: '', date: '', speakers: '', description: '' });

      navigate('/add-program-chairs');
    } catch (err) {
      console.error('Error:', err.message || 'Something went wrong');
    }
  };

  return (
    <div className={styles.container}>
      <OrganizerHeader/>
      <Header>
        <div className={styles.card}>
          <h1 className={styles.title}>Create a New Conference</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Conference Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="date" className={styles.label}>Date</label>
              <input
                type="date"
                id="date"
                name="date"
                className={styles.input}
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="speakers" className={styles.label}>Speakers</label>
              <input
                type="text"
                id="speakers"
                name="speakers"
                className={styles.input}
                value={formData.speakers}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>Description</label>
              <textarea
                id="description"
                name="description"
                className={styles.textarea}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.buttonGroup}>
              <Button label="Submit" />
              <Button label="Cancel" onClick={() => console.log('Cancelled')} />
            </div>
          </form>
        </div>
      </Header>
      <Footer />
    </div>
  );
};

export default ConferenceCreationForm;
