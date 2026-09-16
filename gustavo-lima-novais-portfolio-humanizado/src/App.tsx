import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import LabPage from './pages/LabPage';
import NotFoundPage from './pages/NotFoundPage';
import CommandPalette from './components/ui/CommandPalette';
import ScrollProgress from './components/ui/ScrollProgress';

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
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
