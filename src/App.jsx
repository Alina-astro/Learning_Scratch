import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HeroSection from './components/HeroSection/HeroSection';
import LevelsSection from './components/LevelsSection/LevelsSection';
import Dashboard from './pages/Dashboard/Dashboard';
import LessonPage from './pages/LessonPage/LessonPage';
import AdminPage from './pages/AdminPage/AdminPage';

import LoginModal from './components/Modals/LoginModal';
import RegisterModal from './components/Modals/RegisterModal';

export default function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const handleLoginOpen = () => setLoginOpen(true);
  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleCloseModals = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
  };

  return (
    <Router>
      <Header onLogin={handleLoginOpen} onRegister={handleRegisterOpen} />
      {isLoginOpen && <LoginModal onClose={handleCloseModals} />}
      {isRegisterOpen && <RegisterModal onClose={handleCloseModals} />}

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <LevelsSection onLearnClick={handleLoginOpen} />
              </>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lesson/:level/:lessonId" element={<LessonPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

