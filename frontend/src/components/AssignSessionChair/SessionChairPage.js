import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Entrypage/Footer';
import styles from '../../css/AssignSessionChair/SessionChairPage.module.css';
import { OrganizerHeader } from '../Schedule/OrganizerHeader';

const users = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Davis',
  'Diana Evans',
  'Ethan Brown',
  'Fiona Harris',
  'George Wilson',
];

export const SessionChairPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    setShowModal(true);
  };

  const handleConfirm = (confirmation) => {
    setShowModal(false);

    if (confirmation) {
      navigate('/see-reviewers');
    }
  };

  return (
    <div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/59b67e67c3874076a87cf06ee3b80a6b/89f2c8c34e6fba904e56b26225eb88ff38d340823b0fb2c94d6209fa8e55d298?apiKey=59b67e67c3874076a87cf06ee3b80a6b&"
        className={styles.backgroundImage}
        alt=""
      />
      <OrganizerHeader />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Assign Session Chairs</h1>

          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Assign Session Chair</th>
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
