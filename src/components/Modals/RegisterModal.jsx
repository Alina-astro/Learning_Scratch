import React from 'react';

export default function RegisterModal({ onClose }) {
  return (
    <div>
      <h2>Регистрация</h2>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}