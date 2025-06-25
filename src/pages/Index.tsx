
import { useState } from 'react';
import LoginScreen from '@/components/LoginScreen';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [user, setUser] = useState<{ role: 'personnel' | 'supervisor' } | null>(null);

  const handleLogin = (role: 'personnel' | 'supervisor') => {
    setUser({ role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Dashboard userRole={user.role} onLogout={handleLogout} />;
};

export default Index;
