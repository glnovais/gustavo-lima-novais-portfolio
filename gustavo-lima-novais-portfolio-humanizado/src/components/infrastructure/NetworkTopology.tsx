import { Activity, Cloud, Monitor, Network, Server, ShieldCheck, Wifi } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

const Node = ({ icon: Icon, label, sub }: { icon: any; label: string; sub?: string }) => <div className="topo-node"><Icon size={18}/><div><strong>{label}</strong>{sub && <span>{sub}</span>}</div></div>;

export default function NetworkTopology({ compact = false }: { compact?: boolean }) {
  const { locale } = useI18n();
  const lang = {
    'pt-BR': { live: 'modelo conceitual', edge: 'borda / política', dist: 'distribuição', services: 'serviços', managed: 'gerenciados', access: 'acesso' },
    'en-US': { live: 'conceptual model', edge: 'policy edge', dist: 'distribution', services: 'services', managed: 'managed', access: 'access' },
    'es-ES': { live: 'modelo conceptual', edge: 'borde / política', dist: 'distribución', services: 'servicios', managed: 'gestionados', access: 'acceso' },
  }[locale];
  return <div className={`panel topology ${compact ? 'topology-compact' : ''}`} aria-label="Conceptual network topology"><div className="scanline"/><div className="topo-head"><span className="mono">NETWORK TOPOLOGY</span><span className="badge"><i className="badge-dot status-pulse"/> {lang.live}</span></div><div className="topo-grid"><div className="topo-l1"><Node icon={Cloud} label="INTERNET" sub="uplink"/></div><div className="link-v"/><div className="topo-l2"><Node icon={ShieldCheck} label="FIREWALL" sub={lang.edge}/></div><div className="link-v"/><div className="topo-l3"><Node icon={Network} label="CORE SWITCH" sub={lang.dist}/></div><div className="branch"><span/><span/><span/></div><div className="topo-l4"><Node icon={Server} label="SERVERS" sub={lang.services}/><Node icon={Monitor} label="ENDPOINTS" sub={lang.managed}/><Node icon={Wifi} label="WI-FI" sub={lang.access}/></div><div className="service-row"><div className="service"><Activity size={15}/> AD / DNS</div><div className="service"><Activity size={15}/> APP</div><div className="service"><Activity size={15}/> MONITORING</div></div></div></div>;
}
