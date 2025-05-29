import React from 'react';
import LevelsSection from '../LevelsSection/LevelsSection';
import styles from './HeroSection.module.scss';

export default function HeroSection({ onLearnClick, user, onLogin }) {
  return (
    <section className={styles.section}>
      <h1>Код Изумрудного города</h1>
      {user && (
        <div className={styles.userGreeting}>
          👋 Приятно познакомиться, {user.firstName}!
        </div>
      )}
      <p>
        Добро пожаловать в мир волшебного программирования!
      </p>
      <p>
        Здесь девочка Элли откроет тебе двери в страну Изумрудного города, где каждый сможет научиться создавать свои цифровые сказки. Путешествуй по уровням, помогай друзьям Элли решать задачи и становись настоящим волшебником Scratch-программирования!
      </p>
      <LevelsSection
        user={user}
        onLogin={onLogin}
        onLearnClick={onLearnClick}
      />
    </section>
  );
}