import React from 'react';
import { useEffect, useState, useRef } from 'react';
import footstepIcon from '../../assets/icons/footstep.png';
import pawsIcon from '../../assets/icons/paws.png';
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
  
  const [footsteps, setFootsteps] = useState([]); // для следов вниз слева
  const [paws, setPaws] = useState([]); // для следов вверх справа
  const lastScrollTop = useRef(0);


  useEffect(() => {
    window.scrollTo(0, 0);
    let lastStepTime = Date.now(); // для контроля частоты
    const handleScroll = () => {
      const now = Date.now();
      const timeDiff = now - lastStepTime;
  
      if (timeDiff < 300) return; // минимум 300мс между следами
  
      lastStepTime = now;
  
      const currentY = window.scrollY;
      const goingDown = currentY > lastScrollTop.current;
      lastScrollTop.current = currentY;
  
      const id = now + Math.random();
      const yOffset = window.innerHeight / 2 + Math.random() * 50; // немного смещения вниз
      const scrollTop = window.scrollY;
  
      if (goingDown) {
        setFootsteps(prev => [
          ...prev.slice(-9),
          {
            id,
            top: scrollTop + yOffset,
            left: 20 + Math.random() * 10,
          },
        ]);
      } else {
        setPaws(prev => [
          ...prev.slice(-9),
          {
            id,
            top: scrollTop + yOffset,
            right: 20 + Math.random() * 10,
          },
        ]);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  
  }, [lessonId]);

  if (!lesson) {
    return <div className={styles.notFound}>Урок не найден</div>;
  }

  const { title, lessonNumber, intro, steps, final, task } = lesson;

  return (
    <>
    <h1>{title}</h1>
    <div className={styles.lessonPage}>
    {footsteps.map(step => (
          <img
            key={step.id}
            src={footstepIcon}
            alt="след вниз"
            className={styles.footstep}
            style={{ top: `${step.top}px`, left: `${step.left}px` }}
          />
        ))}
        {paws.map(paw => (
          <img
            key={paw.id}
            src={pawsIcon}
            alt="лапка вверх"
            className={styles.paw}
            style={{ top: `${paw.top}px`, right: `${paw.right}px` }}
          />
        ))}
      {user && (
        <div className={styles.greeting}><span className={styles.emoji}>✨ </span>
         Привет, {user.firstName}!
        <span className={styles.emoji}>✨</span>
        </div>
      )}
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
      {footsteps.map(step => (
    <img
        key={step.id}
        src={footstepIcon}
        alt="след"
        className={styles.footstep}
        style={{ top: `${step.top}px`, left: `${step.left}px` }}
      />
    ))}
    {paws.map(paw => (
      <img
        key={paw.id}
        src={pawsIcon}
        alt="лапка"
        className={styles.paw}
        style={{ top: `${paw.top}px`, right: `${paw.right}px` }}
      />
    ))}
    </div>
    
    </>
  );
}