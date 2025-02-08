import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/LoginPage/LoginForm.module.css';


const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setIsSubmitting(true);

    if (!email.trim() || !password.trim()) {
      setError('Both email and password are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/login/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to log in.';
        try {
          const { message } = await response.json();
          errorMessage = message || errorMessage;
        } catch (err) {
          // Fallback for plain-text error responses
          const text = await response.text();
          errorMessage = text || errorMessage;
        }
        setError(errorMessage);
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);

      navigate('/organize');
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h1 className={styles.loginTitle}>Log In</h1>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <input
        type="email"
        id="email"
        className={styles.inputField}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isSubmitting}
      />
      <input
        type="password"
        id="password"
        className={styles.inputField}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isSubmitting}
      />
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.actionButton} disabled={isSubmitting}>
          <span className={styles.buttonText}>{isSubmitting ? 'Logging In...' : 'Log In'}</span>
        </button>
        <button
          type="button"
          className={`${styles.actionButton} ${styles.signUpButton}`}
          onClick={handleSignUpClick}
          disabled={isSubmitting}
        >
          <span className={styles.buttonText}>Create an Account</span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
