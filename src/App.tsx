import { useEffect } from 'react';
import Calculator from './components/Calculator';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme, toggleTheme } = useTheme();

  // Keep html class in sync (also set on mount for SSR-safety)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return <Calculator onToggleTheme={toggleTheme} theme={theme} />;
}

export default App;
