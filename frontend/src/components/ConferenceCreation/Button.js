import React from 'react';
import styles from '../../css/ConferenceCreation/Button.module.css';

const Button = ({ label, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
