import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import SeniorHome from './pages/SeniorHome';
import SaathiVoiceRoom from './pages/SaathiVoiceRoom';
import CaregiverDashboard from './pages/CaregiverDashboard';
import CaregiverReports from './pages/CaregiverReports';
import SeniorNostalgia from './pages/SeniorNostalgia';
import CaregiverMemories from './pages/CaregiverMemories';
import SeniorCommunity from './pages/SeniorCommunity';
import CaregiverCommunity from './pages/CaregiverCommunity';
import SeniorDevotion from './pages/SeniorDevotion';
import CaregiverCultural from './pages/CaregiverCultural';
import SeniorLegacy from './pages/SeniorLegacy';
import CaregiverLegacy from './pages/CaregiverLegacy';
import { AudioProvider } from './context/AudioContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component to secure routes based on auth status and roles
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: 'Senior' | 'Caregiver';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', gap: '1rem' }}>
        <div style={{ fontSize: '3rem', animation: 'spin-slow 6s linear infinite' }}>🌸</div>
        <p style={{ color: 'var(--color-primary-dark)', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>Verifying session...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== allowedRole) {
    // Automatic role-based redirection to avoid cross-access
    return user.role === 'Senior' 
      ? <Navigate to="/senior/home" replace /> 
      : <Navigate to="/caregiver/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AudioProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<LandingPage />} />
              
              {/* Senior Citizen Portal Routes */}
              <Route path="senior/home" element={<ProtectedRoute allowedRole="Senior"><SeniorHome /></ProtectedRoute>} />
              <Route path="senior/saathi" element={<ProtectedRoute allowedRole="Senior"><SaathiVoiceRoom /></ProtectedRoute>} />
              <Route path="senior/nostalgia" element={<ProtectedRoute allowedRole="Senior"><SeniorNostalgia /></ProtectedRoute>} />
              <Route path="senior/community" element={<ProtectedRoute allowedRole="Senior"><SeniorCommunity /></ProtectedRoute>} />
              <Route path="senior/devotion" element={<ProtectedRoute allowedRole="Senior"><SeniorDevotion /></ProtectedRoute>} />
              <Route path="senior/legacy" element={<ProtectedRoute allowedRole="Senior"><SeniorLegacy /></ProtectedRoute>} />
              
              {/* Caregiver Portal Routes */}
              <Route path="caregiver/dashboard" element={<ProtectedRoute allowedRole="Caregiver"><CaregiverDashboard /></ProtectedRoute>} />
              <Route path="caregiver/reports" element={<ProtectedRoute allowedRole="Caregiver"><CaregiverReports /></ProtectedRoute>} />
              <Route path="caregiver/memories" element={<ProtectedRoute allowedRole="Caregiver"><CaregiverMemories /></ProtectedRoute>} />
              <Route path="caregiver/community" element={<ProtectedRoute allowedRole="Caregiver"><CaregiverCommunity /></ProtectedRoute>} />
              <Route path="caregiver/cultural" element={<ProtectedRoute allowedRole="Caregiver"><CaregiverCultural /></ProtectedRoute>} />
              <Route path="caregiver/legacy" element={<ProtectedRoute allowedRole="Caregiver"><CaregiverLegacy /></ProtectedRoute>} />
              
              {/* Fallback route back to landing */}
              <Route path="*" element={<LandingPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AudioProvider>
    </AuthProvider>
  );
};

export default App;
