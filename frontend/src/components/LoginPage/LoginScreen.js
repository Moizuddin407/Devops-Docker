import React, { useEffect } from 'react';
import Footer from '../Entrypage/Footer';
import LoginForm from './LoginForm';
import { OrganizerHeader } from '../Schedule/OrganizerHeader';
import styles from '../../css/LoginPage/LoginScreen.module.css';

const LoginScreen = () => {
  // Scroll to page top. (Can reuse in all other codes.)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <main className={styles.loginScreen}>
      <OrganizerHeader/>
      <section className={styles.loginSection}>
        <div className={styles.loginOverlay}>
          <LoginForm />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default LoginScreen;
