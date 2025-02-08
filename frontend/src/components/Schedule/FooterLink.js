import React from 'react';
import styles from '../../css/Schedule/FooterSection.module.css';

export const FooterLink = ({ title, links }) => {
  return (
    <div className={styles.linkSection}>
      <div className={styles.sectionTitle}>{title}</div>
      <div className={styles.linkList}>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            {link}<br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};