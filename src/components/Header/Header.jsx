import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/icons/logo_header.png';

export default function Header({ onLogin, onRegister }) {
  return (
    <header className={styles.header}>
      <Link to="/">
    <img
      src={logo}
      alt="Лого Код Изумрудного города"
      className={styles.logo}
    />
  </Link>
      <div className={styles.buttons}>
        <button onClick={onRegister}>Регистрация</button>
        <button onClick={onLogin}>Вход</button>
      </div>
    </header>
  );
}