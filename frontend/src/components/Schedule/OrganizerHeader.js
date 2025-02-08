import * as React from "react";
import styles from '../../css/Schedule/OrganizerHeader.module.css';

export function OrganizerHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/59b67e67c3874076a87cf06ee3b80a6b/3624e46f77ddd4a5f8439ee6e74aea71c8311f03dd6fb6b0f6b70bb7be683297?apiKey=59b67e67c3874076a87cf06ee3b80a6b&"
          className={styles.logo}
          alt="Organizer logo"
        />
        <h1 className={styles.title}>Organizer</h1>
      </div>
    </header>
  );
}
