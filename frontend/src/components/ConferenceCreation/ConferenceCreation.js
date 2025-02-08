import React from 'react';
import styles from '../../css/ConferenceCreation/ConferenceCreation.module.css';
import Header from './Header';
import { OrganizerHeader } from '../Schedule/OrganizerHeader';
import Button from './Button';
import Footer from '../Entrypage/Footer';
import { useNavigate } from 'react-router-dom';

const ConferenceCreation = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <OrganizerHeader/>
      <Header>
        <div className={styles.card}>
          <h1 className={styles.title}>Conference Creation</h1>
          <p className={styles.question}>Do you want to create a new conference?</p>
          <div className={styles.buttonGroup}>
            <Button
              label="Yes"
              onClick={() => navigate('/conference-form')}
            />
            <Button
              label="No"
              onClick={() => navigate('/home')}
            />
          </div>
        </div>
      </Header>
      <Footer />
    </div>
  );
};

export default ConferenceCreation;
