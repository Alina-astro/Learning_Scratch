import React from 'react';

export default function LoginModal({ onClose }) {
  return (
    <div>
      <h2>Вход</h2>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}