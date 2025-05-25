import React from 'react';
import LevelsSection from '../LevelsSection/LevelsSection';
import styles from './HeroSection.module.scss';

export default function HeroSection({ onLearnClick }) {
  return (
    <section className={styles.section}>
      <h1>Код Изумрудного города</h1>
      <p>
        Добро пожаловать в мир волшебного программирования!
      </p>
      <p>
        Здесь девочка Элли откроет вам двери в страну Изумрудного города, где каждый сможет научиться создавать свои цифровые сказки. Путешествуйте по уровням, помогайте друзьям Элли решать задачи и становитесь настоящим волшебником Scratch-программирования!
      </p>
      <LevelsSection onLearnClick={onLearnClick} />
    </section>
  );
}