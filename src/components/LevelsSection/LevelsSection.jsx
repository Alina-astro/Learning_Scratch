import React from 'react';
import styles from './LevelsSection.module.scss';
import icon from '../../assets/icons/crystal.png';

const levels = [
  {
        title: 'Начальный уровень: “Дорога из жёлтого кирпича”',
        levelKey: 'beginner',
        description: 'Ты только начинаешь свой путь в мир программирования? Добро пожаловать на Дорогу из жёлтого кирпича! Вместе с Элли ты научишься оживлять персонажей, создавать простые игры и анимации. Здесь всё легко и весело, даже если ты впервые видишь Scratch!',
        points: [
          'Ты не знаешь, что такое Scratch или только недавно открыл его.',
          'Хочешь узнать, как работать с блоками кода и создавать свои первые проекты.'
        ]
      }, {
        title: 'Средний уровень: “Смелость, ум и доброе сердце”',
        levelKey: 'intermediate',
        description: 'Ты уже знаешь, как использовать блоки Scratch и готов к новым приключениям? Здесь ты поможешь Страшиле, Дровосеку и Льву выполнять сложные задания. Вместе вы создадите увлекательные игры, добавите звуки и научитесь придумывать свои алгоритмы!',
        points: [
          'Ты уже умеешь работать в Scratch и знаешь основные блоки.',
          'Хочешь создавать более сложные проекты, добавлять звуки, эффекты и взаимодействие между персонажами.'
        ]
      }, {
        title: 'Продвинутый уровень: “Тайны Изумрудного города”',
        levelKey: 'advanced',
        description: 'Ты настоящий мастер Scratch и готов к настоящим вызовам? Тогда вперёд к Тайнам Изумрудного города! Здесь ты откроешь секреты циклов, переменных и даже сделаешь свои собственные мини-игры. Только самые смелые и умелые доберутся до финиша!',
        points: [
          'Ты уже уверенно работаешь в Scratch и знаешь, как использовать циклы и переменные.',
          'Хочешь создавать сложные проекты, игры с уровнями и анимациями, которые удивят друзей.'
        ],
      },
    ];

    export default function LevelsSection({ user, onLogin, onLearnClick }) {
      const handleClick = (levelKey) => {
        if (!user) {
          onLogin(); // если не авторизован — открываем модалку входа
          return;
        }
    
        if (levelKey === 'beginner') {
          onLearnClick(levelKey); // переход на первый урок
        } else {
          alert('Этот уровень находится в разработке 🙈');
        }
      };
      return (
    <section className={styles.levels}>
      {levels.map((level, index) => (
        <div key={index} className={styles.level}>
          <h2>{level.title}</h2>
          <p>{level.description}</p>
          <p>Для кого:</p>
          <ul>
            {level.points.map((point, i) => (
              <li key={i}><img src={icon} alt="point" /> <span>{point}</span></li>
            ))}
          </ul>
          <button className="btn-primary" onClick={() => handleClick(level.levelKey)}>Начать обучение</button>
        </div>
      ))}
    </section>
  );
}