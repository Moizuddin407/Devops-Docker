import React from 'react';
import styles from '../../css/ConferenceCreationAssignChairs/ConferenceCreation.module.css';
import Header from './Header';
import Footer from '../Entrypage/Footer';
import { OrganizerHeader } from '../Schedule/OrganizerHeader';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const ConferenceCreationAssignChairs = () => {
    const navigate = useNavigate();

    // Use fetch api once chair module active.
    return (
        <div className={styles.container}>
          <OrganizerHeader/>
          <Header>
            <div className={styles.card}>
              <h1 className={styles.title}>Assign Chairs</h1>
              <p className={styles.question}>No chairs to be assigned right now</p>
              <div className={styles.buttonGroup}>
                <Button
                  label="Back"
                  onClick={() => navigate(-1)}
                />
              </div>
            </div>
          </Header>
          <Footer />
        </div>
      );
    }

export default ConferenceCreationAssignChairs;
