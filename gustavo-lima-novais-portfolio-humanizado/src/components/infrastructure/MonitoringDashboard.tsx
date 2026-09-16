import { Activity, Cpu, Globe, HardDrive, MemoryStick, Printer, Router, Server } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

export default function MonitoringDashboard() {
  const { locale, t } = useI18n();

  const copy = {
    'pt-BR': {
      kicker: 'VISÃO DE MONITORAMENTO',
      title: 'Exemplo de painel com Zabbix e SNMP',
      sample: 'Dados de exemplo',
      online: 'Operacional',
      availability: 'Disponibilidade',
      monitored: 'Em acompanhamento',
      memory: 'Memória',
      disk: 'Disco',
      normal: 'Normal',
      stable: 'Estável',
      healthy: 'Saudável',
    },
    'en-US': {
      kicker: 'MONITORING VIEW',
      title: 'Example dashboard with Zabbix and SNMP',
      sample: 'Example data',
      online: 'Operational',
      availability: 'Availability',
      monitored: 'Monitored',
      memory: 'Memory',
      disk: 'Disk',
      normal: 'Normal',
      stable: 'Stable',
      healthy: 'Healthy',
    },
    'es-ES': {
      kicker: 'VISTA DE MONITORIZACIÓN',
      title: 'Ejemplo de panel con Zabbix y SNMP',
      sample: 'Datos de ejemplo',
      online: 'Operativo',
      availability: 'Disponibilidad',
      monitored: 'En seguimiento',
      memory: 'Memoria',
      disk: 'Disco',
      normal: 'Normal',
      stable: 'Estable',
      healthy: 'Saludable',
    },
  }[locale];

  const nodes = [
    ['SERVER-01', Server],
    ['SWITCH-CORE', Router],
    ['PRINTER-01', Printer],
    ['SERVICE-WEB', Globe],
  ] as const;

  const metrics = [
    [Activity, copy.availability, copy.monitored],
    [Cpu, 'CPU', copy.normal],
    [MemoryStick, copy.memory, copy.stable],
    [HardDrive, copy.disk, copy.healthy],
  ] as const;

  return <div className="panel p-4 md:p-5">
    <div className="flex items-center justify-between gap-3 mb-5">
      <div>
        <div className="mono text-xs text-cyan-300">{copy.kicker}</div>
        <h3 className="text-lg font-semibold mt-1">{copy.title}</h3>
      </div>
      <span className="badge">{copy.sample}</span>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
      {nodes.map(([name, Icon]) => <div key={name} className="rounded-xl border border-white/5 bg-black/15 p-3">
        <div className="flex items-center justify-between">
          <Icon size={16} className="text-cyan-300"/>
          <span className="w-2 h-2 rounded-full bg-emerald-400"/>
        </div>
        <div className="mono text-[11px] mt-4 text-slate-300">{name}</div>
        <div className="text-xs text-emerald-400 mt-1">{copy.online}</div>
      </div>)}
    </div>

    <div className="grid md:grid-cols-4 gap-2">
      {metrics.map(([Icon, label, value]) => <div key={label} className="rounded-xl border border-white/5 p-3">
        <div className="flex items-center gap-2 text-slate-500 text-xs"><Icon size={14}/>{label}</div>
        <div className="mt-2 text-sm text-slate-200">{value}</div>
      </div>)}
    </div>

    <p className="text-[11px] text-slate-600 mt-4">{t('project.demoData')}</p>
  </div>;
}
