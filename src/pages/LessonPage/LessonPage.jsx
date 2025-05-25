import React from 'react';
import { useParams } from 'react-router-dom';
import { lessons } from './lessonData';
import styles from './LessonPage.module.scss';

export default function LessonPage() {
  const { level, lessonId } = useParams();
  const lesson = lessons[level]?.[lessonId];

  if (!lesson) {
    return <div className={styles.notFound}>Урок не найден</div>;
  }

  const { title, intro, steps, final, task } = lesson;

  return (
    <div className={styles.lessonPage}>
      <h1>{title}</h1>
      {Array.isArray(intro) ? (
        intro.map((paragraph, i) => (
          <p key={i}>
          {paragraph.split(' ').map((word, j) =>
            word.startsWith('http') ? (
              <a key={j} href={word} target="_blank" rel="noopener noreferrer">
                {word}
              </a>
            ) : (
              word + ' '
            )
          )}
        </p>
        ))
        ) : (
          <p>{intro}</p>
        )}

      <div className={styles.steps}>
        {steps.map((step, index) => (
          <div key={index}>
            {Array.isArray(step.text) ? (
              step.text.map((paragraph, i) => (
                <p key={i}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p>{step.text}</p>
            )}

            <img src={step.image} alt={step.caption} />
            <p className={styles.caption}>{step.caption}</p>
          </div>
        ))}
      </div>
      <div>{final}</div>

      <div className={styles.taskBlock}>
        <h2>Задание</h2>
        <p>{task}</p>

        <label>
          Прикрепите файл (.sb3):
          <input type="file" accept=".sb3" />
        </label>

        <label>
          Комментарий:
          <textarea rows="4" placeholder="Напишите, что было самым интересным"></textarea>
        </label>

        <button className="btn-primary">Отправить</button>

        {/* Заглушка результата проверки */}
        <div className={styles.status}>
          Статус: требуется выполнить задание
        </div>
      </div>
    </div>
  );
}