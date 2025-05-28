import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HeroSection from './components/HeroSection/HeroSection';
import Dashboard from './pages/Dashboard/Dashboard';
import LessonPage from './pages/LessonPage/LessonPage';
import AdminPage from './pages/AdminPage/AdminPage';
import LoginModal from './components/Modals/LoginModal';
import RegisterModal from './components/Modals/RegisterModal';

export default function App() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const navigate = useNavigate();
  const handleLoginOpen = () => setLoginOpen(true);
  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleCloseModals = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
setUser(null);
  };

  const handleLearnClick = (level) => {
    navigate(`/lesson/${level}/1`);
  };
  
  return (
<>
<Header
  user={user}
  onLogin={handleLoginOpen}
  onRegister={handleRegisterOpen}
  onLogout={handleLogout}
/>
{isLoginOpen && <LoginModal onClose={handleCloseModals} setUser={setUser} />}
      {isRegisterOpen && <RegisterModal onClose={handleCloseModals} />}

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection onLearnClick={handleLearnClick} user={user} />
              </>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lesson/:level/:lessonId" element={<LessonPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      <Footer />
      </>
  );
}

