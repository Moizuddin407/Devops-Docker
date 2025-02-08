import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/SignupPage/SignupForm.module.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
      setErrorMessage('');
    } else {
      setErrorMessage('Please upload a JPG or PNG file.');
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, confirmEmail, password, confirmPassword, name, avatar } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !confirmEmail || !password || !confirmPassword || !name || !avatar) {
      setErrorMessage('All fields are required.');
      return;
    }
    if (!emailRegex.test(email) || email !== confirmEmail) {
      setErrorMessage('Emails do not match or are invalid.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const userData = new FormData();
    userData.append('name', name);
    userData.append('email', email);
    userData.append('password', password);
    // image key sent to backend to multer.
    userData.append('image', avatar);

    try {
      const response = await fetch('http://localhost:8081/login/adduser', {
        method: 'POST',
        body: userData,
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Failed to create an account.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while creating your account.');
    }
  };

  return (
    <form className={styles.SignupForm} onSubmit={handleSubmit}>
      <h1 className={styles.SignupTitle}>Create an Account</h1>
      {/* Check if error and avatar present, show. */}
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

      {avatarPreview && (
        <div className={styles.avatarPreview}>
          <img src={avatarPreview} alt="Avatar Preview" className={styles.avatarImage} />
        </div>
      )}
      
      {/* Might add a few files later. */}
      <input
        type="file"
        id="avatar"
        accept=".jpg,.jpeg,.png"
        onChange={handleAvatarChange}
        className={styles.fileInput}
      />

      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={handleChange}
        className={styles.inputField}
        placeholder="Full Name"
        required
      />

      <input
        type="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        className={styles.inputField}
        placeholder="Email Address"
        required
      />

      <input
        type="email"
        id="confirmEmail"
        value={formData.confirmEmail}
        onChange={handleChange}
        className={styles.inputField}
        placeholder="Confirm Email Address"
        required
      />

      <input
        type="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
        className={styles.inputField}
        placeholder="Password"
        required
      />

      <input
        type="password"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className={styles.inputField}
        placeholder="Confirm Password"
        required
      />

      <div className={styles.buttonGroup}>
        <button type="submit" className={`${styles.actionButton} ${styles.signUpButton}`}>
          Create an Account
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
