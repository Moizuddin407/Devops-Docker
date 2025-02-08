import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Entrypage/Footer';
import { OrganizerHeader } from '../Schedule/OrganizerHeader';
import styles from '../../css/AssignChair/OrganizerPage.module.css';

const users = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Davis',
  'Diana Evans',
  'Ethan Brown',
  'Fiona Harris',
  'George Wilson',
];

export const OrganizerPage = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // Hook for navigation

  const handleNextButtonClick = () => {
    setShowModal(true); // Show the confirmation modal when the button is clicked
  };

  const handleConfirm = (confirmation) => {
    setShowModal(false); // Close the modal after confirmation

    if (confirmation) {
      // If "Yes" is clicked, navigate to /see-session-chair
      navigate('/see-session-chair');
    }
  };

  return (
    <div>
      {/* Background image */}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/59b67e67c3874076a87cf06ee3b80a6b/89f2c8c34e6fba904e56b26225eb88ff38d340823b0fb2c94d6209fa8e55d298?apiKey=59b67e67c3874076a87cf06ee3b80a6b&"
        className={styles.backgroundImage}
        alt=""
      />
      <OrganizerHeader />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Assign Program Chairs</h1>

          {/* Table for users */}
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Assign Program Chair</th>
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

          {/* Next Button */}
          <button
            className={styles.nextButton}
            onClick={handleNextButtonClick}
          >
            Next
          </button>

          {/* Confirmation Modal */}
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
