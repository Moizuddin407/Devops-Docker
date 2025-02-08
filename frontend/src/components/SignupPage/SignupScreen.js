import React, { useEffect } from 'react';
import Footer from '../Entrypage/Footer';
import SignupForm from './SignupForm';
import styles from '../../css/SignupPage/SignupScreen.module.css';

const SignupScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className={styles.SignupScreen}>
      <section className={styles.SignupSection}>
        <div className={styles.SignupOverlay}>
          <SignupForm />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default SignupScreen;
