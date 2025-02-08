import React from 'react';
import styles from '../../css/ConferenceCreation/Header.module.css';

const Header = ({ children }) => {
  return (
    <header className={styles.header}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/95c91b851b08c33b206008b2ed9388eb4d4797ba345fab58de586e202174ced1?placeholderIfAbsent=true&apiKey=59b67e67c3874076a87cf06ee3b80a6b"
        alt="Conference background"
        className={styles.backgroundImage}
      />
      <div className={styles.contentWrapper}>{children}</div>
    </header>
  );
};

export default Header;
