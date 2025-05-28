import React, { useState, useEffect } from 'react';
import styles from './TaskForm.module.scss';

export default function TaskForm({ user, level, lessonNumber, onSuccess }) {
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('Статус: требуется выполнить задание');
  const [error, setError] = useState('');

  // Очистка формы при смене урока
  useEffect(() => {
    setComment('');
    setFile(null);
    setStatus('Статус: требуется выполнить задание');
    setError('');
  }, [lessonNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError('Пожалуйста, прикрепите файл.');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('level', level);
    formData.append('lesson', lessonNumber);
    formData.append('comment', comment);
    formData.append('file', file);

    try {
      const response = await fetch('https://learningscratchbackend-production.up.railway.app/api/email', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Ошибка при отправке');

      setStatus('Статус: урок пройден, задание выполнено!');
      setError('');
      onSuccess && onSuccess(); // например, для обновления прогресса
      setFile(null);
      setComment('');
    } catch (err) {
      console.error(err);
      setError('Не удалось отправить. Попробуйте позже.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Прикрепить файл:
        <input type="file" accept=".sb3" onChange={(e) => setFile(e.target.files[0])} />
      </label>
      <label>
        Комментарий:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.status}>{status}</div>
      <button type="submit">Отправить</button>
    </form>
  );
}