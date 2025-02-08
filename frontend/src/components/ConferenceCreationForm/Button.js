import React from 'react';
import styles from '../../css/ConferenceCreationForm/Button.module.css';

const Button = ({ label, onClick }) => {
  return React.createElement(
    'button',
    { className: styles.button, onClick: onClick },
    label
  );
};

export default Button;
