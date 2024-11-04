import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { useAuth } from './context/AuthContext';

function AppContent() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}