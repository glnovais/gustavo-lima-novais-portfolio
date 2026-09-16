import { useEffect, useMemo, useState, type ChangeEvent, type KeyboardEvent, type MouseEvent } from 'react';
import { Command, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/I18nProvider';

type Props = { open: boolean; onClose: () => void };

export default function CommandPalette({ open, onClose }: Props) {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const commands = useMemo(() => [
    [t('palette.home'), '/#inicio'], [t('palette.about'), '/#sobre'], [t('palette.projects'), '/#projetos'],
    [t('palette.infrastructure'), '/#infraestrutura'], [t('palette.ad'), '/projects/active-directory'], [t('palette.lab'), '/lab'],
    [t('palette.experience'), '/#experiencia'], [t('palette.contact'), '/#contato'], [t('palette.skills'), '/#stack'], [t('palette.network'), '/#infraestrutura'],
  ], [t]);

  useEffect(() => { if (!open) setQuery(''); }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => commands.filter(([name]) => name.toLowerCase().includes(query.toLowerCase())), [commands, query]);
  const go = (href: string) => {
    onClose();
    if (href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => document.querySelector(href.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else navigate(href);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[95] bg-black/60 backdrop-blur-sm p-4 flex items-start justify-center pt-[12vh]" role="dialog" aria-modal="true" aria-label={t('palette.title')} onMouseDown={(e: MouseEvent<HTMLDivElement>) => { if (e.currentTarget === e.target) onClose(); }}>
      <div className="panel w-full max-w-xl overflow-hidden shadow-2xl">
        <div className="p-3 border-b border-white/5 flex items-center gap-3">
          <Search size={18} className="text-slate-500"/>
          <input autoFocus value={query} onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter' && filtered[0]) go(filtered[0][1]); }} placeholder={t('palette.placeholder')} className="w-full bg-transparent outline-none text-sm py-2"/>
          <span className="badge mono">ESC</span>
        </div>
        <div className="p-2 max-h-[48vh] overflow-auto">
          {filtered.map(([name, href]) => <button key={`${name}-${href}`} onClick={() => go(href)} className="w-full min-h-12 px-3 rounded-xl flex items-center justify-between text-left hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 ring-cyan-300/40"><span className="flex items-center gap-3"><Command size={15} className="text-cyan-300"/><span>{name}</span></span><span className="text-xs text-slate-600 mono">{href}</span></button>)}
        </div>
      </div>
    </div>
  );
}
