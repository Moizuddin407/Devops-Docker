import React from 'react';
import styles from '../../css/Schedule/FooterSection.module.css';
import { FooterLink } from './FooterLink';

export const FooterSection = () => {
  const planEventsLinks = [
    'Create and Set Up',
    'Sell Tickets',
    'Online RSVP',
    'Online Events'
  ];

  const eventickLinks = [
    'About Us',
    'Press',
    'Contact Us',
    'Terms'
  ];

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerWrapper}>
        <div className={styles.footerContent}>
          <div className={styles.footerGrid}>
            <div className={styles.description}>
              EventEase is a global self-service ticketing platform for live
              experiences that allows anyone to create, share, find and attend
              events that fuel their passions and enrich their lives.
            </div>
            
            <FooterLink title="Plan Events" links={planEventsLinks} />
            <FooterLink title="Eventick" links={eventickLinks} />
            
            <div className={styles.linkSection}>
              <div className={styles.sectionTitle}>Stay in the loop</div>
              <div className={styles.description}>
                Stay connected and never miss an update! Join our mailing list
                to receive the latest news about upcoming events, conferences,
                and exciting concerts. Be the first to know about key
                announcements,
              </div>
            </div>
          </div>
          
          <div className={styles.divider} />
          <div className={styles.copyright}>
            Copyright © 2024 EventEase
          </div>
        </div>
      </div>
    </div>
  );
};