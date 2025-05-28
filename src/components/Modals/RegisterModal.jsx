import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import styles from './RegisterModal.module.scss';
import errorIcon from '../../assets/icons/icon-error.png';
import successIcon from '../../assets/icons/icon-success.png';

export default function RegisterModal({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } = formData;

    // Валидация на клиенте
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Введите корректную электронную почту.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }

    // Отправка запроса на сервер
    try {

      console.log('Отправка данных формы:', { firstName, lastName, email, password, confirmPassword }); // отправка данных формы

      const response = await fetch('https://learningscratchbackend-production.up.railway.app/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Ошибка регистрации');
        return;
      }

      setError('');
      setSuccess('Регистрация прошла успешно!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // Автоматическое закрытие модального окна
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 5000);

    } catch (err) {
      console.error('Ошибка при отправке запроса:', err);
      setError('Ошибка сети. Попробуйте позже.');
    }
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2>Регистрация</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Имя:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Фамилия:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Электронная почта:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Пароль:
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
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

        <label>
          Повторите пароль:
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
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
        <button type="submit" className={styles.submit}>Зарегистрироваться</button>
      </form>
    </ModalWrapper>
  );
}