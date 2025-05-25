import React from 'react';
import styles from './Header.module.scss';
import logo from '../../assets/icons/logo_header.png';

export default function Header({ onLogin, onRegister }) {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Лого Код Изумрудного города" className={styles.logo} />
      <div className={styles.buttons}>
        <button onClick={onRegister}>Регистрация</button>
        <button onClick={onLogin}>Вход</button>
      </div>
    </header>
  );
}