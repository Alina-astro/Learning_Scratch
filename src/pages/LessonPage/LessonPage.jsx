import React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lessons } from './lessonData';
import TaskForm from '../../components/TaskForm/TaskForm';
import styles from './LessonPage.module.scss';

export default function LessonPage() {
  const { level, lessonId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const lesson = lessons[level]?.[lessonId];
  const navigate = useNavigate();
  const currentId = parseInt(lessonId, 10);
  const totalLessons = Object.keys(lessons[level]).length;
  console.log('currentId:', currentId, 'totalLessons:', totalLessons);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

  if (!lesson) {
    return <div className={styles.notFound}>Урок не найден</div>;
  }

  const { title, lessonNumber, intro, steps, final, task } = lesson;

  return (
    <>
    <h1>{title}</h1>
    <div className={styles.lessonPage}>
    <h2>{lessonNumber}</h2>
      
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
      <div className={styles.final}>
        {Array.isArray(final) ? (
          final.map((paragraph, i) => <p key={i}>{paragraph}</p>)
        ) : (
          <p>{final}</p>
        )}
      </div>

      <div className={styles.taskBlock}>
        <h2>Задание</h2>
        <p>{task}</p>

        {user && (
          <TaskForm
          user={user}
          level={level}
          lessonNumber={lessonId}
        />
        )}
      </div>

      <div className={styles.navigation}>
        {currentId > 1 && (
          <span
            className={styles.navLink}
            onClick={() => navigate(`/lesson/${level}/${currentId - 1}`)}
          >
            ← Урок {currentId - 1}
          </span>
        )}
        {currentId < totalLessons && (
          <span
            className={styles.navLink}
            onClick={() => navigate(`/lesson/${level}/${currentId + 1}`)}
          >
            Урок {currentId + 1} →
          </span>
        )}
      </div>
      
    </div>
    
    </>
  );
}