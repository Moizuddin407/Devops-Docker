import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Entrypage/Footer';
import { OrganizerHeader } from '../Schedule/OrganizerHeader';
import styles from '../../css/AssignReviewer/ReviewerPage.module.css';

const users = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Davis',
  'Diana Evans',
  'Ethan Brown',
  'Fiona Harris',
  'George Wilson',
];

export const ReviewerPage = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // Hook for navigation

  const handleNextButtonClick = () => {
    setShowModal(true);
  };

  const handleConfirm = (confirmation) => {
    setShowModal(false);

    if (confirmation) {
      navigate('/schedule');
    }
  };

  return (
    <div>
      <OrganizerHeader />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Assign Reviewers</h1>

          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Assign Reviewers</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user}
                  className={index % 2 === 0 ? styles.userRow : styles.alternate}
                >
                  <td>{user}</td>
                  <td>
                    <button className={styles.assignButton}>Assign</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className={styles.nextButton}
            onClick={handleNextButtonClick}
          >
            Next
          </button>

          {showModal && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <p>Are you sure you want to proceed?</p>
                <div className={styles.modalButtons}>
                  <button
                    className={styles.modalButtonYes}
                    onClick={() => handleConfirm(true)}
                  >
                    Yes
                  </button>
                  <button
                    className={styles.modalButtonNo}
                    onClick={() => handleConfirm(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};
