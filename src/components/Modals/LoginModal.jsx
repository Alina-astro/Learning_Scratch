import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import styles from './LoginModal.module.scss';
import errorIcon from '../../assets/icons/icon-error.png';
import successIcon from '../../assets/icons/icon-success.png';

export default function LoginModal({ onClose, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Введите email и пароль.');
      setSuccess('');
      return;
    }

    try {
      const response = await fetch('https://learningscratchbackend-production.up.railway.app/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Ошибка входа.');
        setSuccess('');
        return;
      }
      setUser(result.user);
      localStorage.setItem('user', JSON.stringify(result.user));
      console.log('Зарегистрированный пользователь:', result.user); // зарегистрированный пользователь

      // Успешный вход
      setError('');
      setSuccess(`Привет, ${result.user.firstName}!`);
      setEmail('');
      setPassword('');

      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 3000);

    } catch (err) {
      console.error('Ошибка запроса:', err);
      setError('Ошибка сервера. Попробуйте позже.');
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2>Вход</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Электронная почта:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Пароль:
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.toggle}
            >
              {showPassword ? 'Скрыть' : 'Показать'}
            </button>
          </div>
        </label>
        {error && (
          <div className={styles.error}>
            <img src={errorIcon} alt="Ошибка" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className={styles.success}>
            <img src={successIcon} alt="Успех" />
            <span>{success}</span>
          </div>
        )}
        <button type="submit" className={styles.submit}>Войти</button>
      </form>
    </ModalWrapper>
  );
}