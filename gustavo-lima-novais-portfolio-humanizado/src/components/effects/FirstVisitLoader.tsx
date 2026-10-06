import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import LatticeLoader from './LatticeLoader';
import './FirstVisitLoader.css';

const SESSION_KEY = 'gn-portfolio-loader-seen';

export default function FirstVisitLoader() {
  const { locale } = useI18n();
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<'working' | 'done'>('working');
  const [step, setStep] = useState(0);

  const copy = locale === 'en-US'
    ? {
        steps: ['Loading infrastructure', 'Connecting network modules', 'Preparing portfolio'],
        done: 'SYSTEM ONLINE',
      }
    : locale === 'es-ES'
      ? {
          steps: ['Cargando infraestructura', 'Conectando módulos de red', 'Preparando portafolio'],
          done: 'SISTEMA EN LÍNEA',
        }
      : {
          steps: ['Carregando infraestrutura', 'Conectando módulos de rede', 'Preparando portfólio'],
          done: 'SISTEMA ONLINE',
        };

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY)) return;

    setVisible(true);
    const timers = [
      window.setTimeout(() => setStep(1), 360),
      window.setTimeout(() => setStep(2), 760),
      window.setTimeout(() => setStatus('done'), 1120),
      window.setTimeout(() => {
        window.sessionStorage.setItem(SESSION_KEY, '1');
        setVisible(false);
      }, 1560),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="portfolio-loader" aria-live="polite">
      <div className="portfolio-loader__grid" aria-hidden="true" />
      <div className="portfolio-loader__content">
        <div className="portfolio-loader__brand mono">GN://INFRA</div>
        <LatticeLoader
          status={status}
          label={copy.steps[step]}
          doneLabel={copy.done}
          pattern="orbit"
          grid={4}
          shape="round"
          color="#5CE1E6"
          doneColor="#34D399"
          cellSize={7}
          gap={3}
          fontSize={14}
          step={82}
          idleOpacity={0.12}
          glow
          glowColor="#28A8FF"
          showTimer={false}
        />
        <div className="portfolio-loader__rail" aria-hidden="true"><span /></div>
        <div className="portfolio-loader__meta mono">ACTIVE DIRECTORY · NETWORKS · AUTOMATION</div>
      </div>
    </div>
  );
}
