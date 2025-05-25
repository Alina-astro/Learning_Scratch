import React from 'react';
import styles from './ModalWrapper.module.scss';

export default function ModalWrapper({ children, onClose }) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
}