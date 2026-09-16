import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import LabPage from './pages/LabPage';
import NotFoundPage from './pages/NotFoundPage';
import CommandPalette from './components/ui/CommandPalette';
import ScrollProgress from './components/ui/ScrollProgress';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Routes>
        <Route path="/" element={<HomePage onOpenPalette={() => setPaletteOpen(true)} />} />
        <Route path="/projects" element={<ProjectsPage onOpenPalette={() => setPaletteOpen(true)} />} />
        <Route path="/projects/:slug" element={<ProjectPage onOpenPalette={() => setPaletteOpen(true)} />} />
        <Route path="/lab" element={<LabPage onOpenPalette={() => setPaletteOpen(true)} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
