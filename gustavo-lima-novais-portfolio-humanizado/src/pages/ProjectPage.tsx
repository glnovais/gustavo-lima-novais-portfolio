import type { ReactNode } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Wrench } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import ProjectScreenshot from '../components/projects/ProjectScreenshot';
import Header from '../components/layout/Header';
import ADArchitecture from '../components/infrastructure/ADArchitecture';
import MonitoringDashboard from '../components/infrastructure/MonitoringDashboard';
import NetworkTopology from '../components/infrastructure/NetworkTopology';
import { projects } from '../data/portfolioProjects';
import { useI18n } from '../i18n/I18nProvider';
import { pickText } from '../i18n/text';
import type { ProjectStatus } from '../types';

type Props = { onOpenPalette: () => void };

const FlowNode = ({ children }: { children: ReactNode }) => <div className="flow-node">{children}</div>;
const FlowArrow = () => <div className="flow-arrow" aria-hidden="true">↓</div>;

function PrinterPolicyEvolution() {
  const { t } = useI18n();
  const before = [t('project.user'), t('project.ou'), t('project.gpo'), t('project.printer')];
  const after = [t('project.user'), t('project.securityGroup'), t('project.gpo'), t('project.printer')];
  const Column = ({ title, items, evolved = false }: { title: string; items: string[]; evolved?: boolean }) => (
    <div className={`policy-flow ${evolved ? 'policy-flow-evolved' : ''}`}>
      <div className="mono text-xs text-cyan-300 mb-4">{title}</div>
      {items.map((item, index) => <div key={item}>{index > 0 && <FlowArrow/>}<FlowNode>{item}</FlowNode></div>)}
    </div>
  );

  return <div className="panel p-5 md:p-7">
    <div className="grid md:grid-cols-2 gap-5">
      <Column title={t('project.printFlowBefore')} items={before}/>
      <Column title={t('project.printFlowAfter')} items={after} evolved/>
    </div>
    <p className="text-sm text-slate-500 leading-6 mt-6 border-t border-white/5 pt-5">{t('project.groupBenefit')}</p>
  </div>;
}

function ProjectVisual({ slug }: { slug: string }) {
  const { locale, t } = useI18n();

  if (slug === 'active-directory') {
    return <div className="space-y-5"><ADArchitecture/><PrinterPolicyEvolution/></div>;
  }

  if (slug === 'automation') {
    const steps = [t('project.flowQuery'), t('project.flowValidate'), t('project.flowNormalize'), t('project.flowReport')];
    return <div className="grid xl:grid-cols-[1.05fr_.95fr] gap-5">
      <div className="panel overflow-hidden">
        <div className="px-4 py-3 border-b border-white/5 mono text-xs text-cyan-300">infrastructure-automation.ps1</div>
        <pre className="p-5 text-xs md:text-sm leading-7 overflow-x-auto mono text-slate-300"><code>{`Get-ADUser -Filter * -Properties Enabled, LastLogonDate |
  Select-Object Name, Enabled, LastLogonDate

Get-ADComputer -Filter * |
  Select-Object Name, Enabled

Test-Connection -ComputerName "CLIENT-001" -Count 1`}</code></pre>
      </div>
      <div className="panel p-5">
        <div className="mono text-xs text-cyan-300">{t('project.automationFlow')}</div>
        <div className="mt-5 space-y-3">
          {steps.map((step, i) => <div className="flex items-center gap-3" key={step}>
            <span className="w-8 h-8 rounded-xl border border-cyan-300/15 grid place-items-center mono text-xs text-cyan-300">0{i + 1}</span>
            <div className="flex-1 h-11 rounded-xl border border-white/5 flex items-center px-4 text-sm">{step}</div>
          </div>)}
        </div>
      </div>
    </div>;
  }

  if (slug === 'gpo') {
    return <div className="panel p-6 md:p-8">
      <div className="policy-horizontal"><FlowNode>ACTIVE DIRECTORY</FlowNode><span>→</span><FlowNode>SECURITY GROUP</FlowNode><span>→</span><FlowNode>GROUP POLICY</FlowNode><span>→</span><FlowNode>ENDPOINTS</FlowNode></div>
      <div className="grid sm:grid-cols-3 gap-3 mt-7">{['Scope', 'Validation', 'Documentation'].map(x => <div className="rounded-xl border border-white/5 p-4 mono text-xs text-slate-400" key={x}>{x}</div>)}</div>
    </div>;
  }

  if (slug === 'monitoring') return <MonitoringDashboard/>;

  if (slug === 'itsm') {
    const topics = [t('project.inventory'), t('project.assetHistory'), t('project.serviceContext')];
    return <div className="panel p-5 md:p-6">
      <div className="mono text-xs text-cyan-300">{t('project.assetsView')}</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
        {[['CLIENT-001', 'Endpoint'], ['ASSET-002', 'Hardware'], ['SOFTWARE', t('project.inventory')], ['TICKET-042', 'Service']].map(([name, type]) => <div className="rounded-xl border border-white/5 p-4" key={name}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 block"/>
          <div className="mono text-xs mt-5">{name}</div>
          <div className="text-xs text-slate-500 mt-1">{type}</div>
        </div>)}
      </div>
      <div className="mt-5 grid md:grid-cols-3 gap-3">{topics.map(x => <div className="rounded-xl bg-white/[.02] border border-white/5 p-4 text-sm text-slate-400" key={x}>{x}</div>)}</div>
    </div>;
  }

  if (slug === 'governance') {
    return <div className="space-y-5">
      <div className="governance-hub">
        <div className="governance-center">{t('project.governanceLabel')}</div>
        {['INVENTORY', 'DOCUMENTATION', 'MONITORING', 'PROCEDURES', 'ACCESS', 'ASSET MANAGEMENT'].map((x, i) => <div key={x} className={`governance-node governance-node-${i + 1}`}>{x}</div>)}
      </div>
      <div className="panel p-5 md:p-6">
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <div className="rounded-xl border border-red-300/10 bg-red-300/[.03] p-5"><div className="mono text-xs text-slate-500">{t('project.before')}</div><strong className="block mt-2">{t('project.informalKnowledge')}</strong></div>
          <span className="text-cyan-300 text-xl text-center">→</span>
          <div className="rounded-xl border border-emerald-300/10 bg-emerald-300/[.03] p-5"><div className="mono text-xs text-slate-500">{t('project.evolution')}</div><strong className="block mt-2">{t('project.structuredKnowledge')}</strong></div>
        </div>
      </div>
    </div>;
  }

  if (slug === 'admin-center') {
    const copy = locale === 'en-US' ? {
      dashboard: 'Operations dashboard with environment status, global search and operational indicators.',
      create: 'Governed user provisioning with validated fields and authorized OU selection.',
      reset: 'Password reset flow with individual lookup, preview and confirmation before execution.',
      unlock: 'Account unlock workflow designed for a controlled, individual operation.',
      audit: 'Audit trail and report area focused on traceability of queries and permitted actions.',
    } : locale === 'es-ES' ? {
      dashboard: 'Panel operativo con estado del entorno, búsqueda global e indicadores de operación.',
      create: 'Creación gobernada de usuarios con campos validados y selección de OU autorizada.',
      reset: 'Flujo de restablecimiento de contraseña con búsqueda individual, vista previa y confirmación.',
      unlock: 'Flujo de desbloqueo de cuenta diseñado para una operación individual y controlada.',
      audit: 'Trazabilidad de auditoría e informes centrados en el seguimiento de consultas y acciones permitidas.',
    } : {
      dashboard: 'Painel operacional com status do ambiente, busca global e indicadores da operação.',
      create: 'Criação governada de usuários com campos validados e seleção de OU autorizada.',
      reset: 'Fluxo de reset de senha com pesquisa individual, prévia e confirmação antes da execução.',
      unlock: 'Fluxo de desbloqueio de conta pensado para uma operação individual e controlada.',
      audit: 'Trilha de auditoria e relatórios voltados à rastreabilidade de consultas e ações permitidas.',
    };

    const screenshots = [
      ['/projects/admin-center/01-criacao-usuario.webp', copy.create],
      ['/projects/admin-center/02-reset-senha.webp', copy.reset],
      ['/projects/admin-center/03-desbloqueio-usuario.webp', copy.unlock],
      ['/projects/admin-center/05-auditoria.webp', copy.audit],
    ] as const;

    return <div className="space-y-5">
      <div className="panel p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="mono text-xs text-cyan-300">SDE ADMIN CENTER · v1.6.0</div>
        <div className="flex flex-wrap gap-2"><span className="badge">PowerShell 5.1</span><span className="badge">WPF / XAML</span><span className="badge">Active Directory</span></div>
      </div>
      <ProjectScreenshot src="/projects/admin-center/00-dashboard.webp" alt={copy.dashboard} caption={copy.dashboard}/>
      <div className="grid xl:grid-cols-2 gap-5">
        {screenshots.map(([src, caption]) => <ProjectScreenshot key={src} src={src} alt={caption} caption={caption}/>)}
      </div>
    </div>;
  }

  return <NetworkTopology/>;
}

export default function ProjectPage({ onOpenPalette }: Props) {
  const { slug = '' } = useParams();
  const { locale, t } = useI18n();
  const project = projects.find(x => x.slug === slug);
  const statusLabel = (status: ProjectStatus) => ({
    applied: locale === 'en-US' ? 'Applied project' : locale === 'es-ES' ? 'Proyecto aplicado' : 'Projeto aplicado',
    lab: locale === 'en-US' ? 'Lab' : locale === 'es-ES' ? 'Laboratorio' : 'Laboratório',
    concept: locale === 'en-US' ? 'Lab project' : locale === 'es-ES' ? 'Proyecto de laboratorio' : 'Projeto de laboratório',
  }[status]);

  if (!project) return <><Header onOpenPalette={onOpenPalette}/><main className="route-shell container-shell py-20"><h1 className="section-title">{t('project.notFound')}</h1><Link to="/projects" className="btn btn-ghost mt-6">{t('project.back')}</Link></main><Footer/></>;

  return <><Header onOpenPalette={onOpenPalette}/><main id="main" className="route-shell">
    <section className="section pt-16"><div className="container-shell"><Link to="/projects" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white"><ArrowLeft size={15}/>{t('project.back')}</Link><div className="mt-10 grid xl:grid-cols-[1fr_auto] gap-8 items-end"><div><div className="mono text-xs text-cyan-300">{t('projects.label')} / {project.index} · {project.category}</div><h1 className="text-[clamp(2.8rem,6vw,5.7rem)] leading-[.95] tracking-[-.055em] font-semibold mt-4 max-w-5xl">{pickText(project.title, locale)}</h1><p className="section-copy mt-6 text-lg">{pickText(project.summary, locale)}</p></div><span className="badge"><i className={`w-1.5 h-1.5 rounded-full ${project.status === 'lab' ? 'bg-yellow-400' : project.status === 'concept' ? 'bg-blue-400' : 'bg-emerald-400'}`}/>{statusLabel(project.status)}</span></div><div className="mt-10"><ProjectVisual slug={project.slug}/></div></div></section>

    <section className="section"><div className="container-shell grid xl:grid-cols-[.75fr_1.25fr] gap-8"><div><div className="section-kicker">{t('project.challenge')}</div><h2 className="text-3xl font-semibold tracking-tight">{t('project.context')}</h2></div><p className="section-copy text-lg">{pickText(project.problem, locale)}</p></div></section>

    <section className="section"><div className="container-shell"><div className="section-kicker">{t('project.approach')}</div><div className="grid md:grid-cols-2 gap-3 mt-4">{project.approach.map((x, i) => <div className="panel p-5 flex gap-4" key={pickText(x, locale)}><span className="mono text-xs text-cyan-300">0{i + 1}</span><p className="text-sm text-slate-300 leading-6 m-0">{pickText(x, locale)}</p></div>)}</div></div></section>

    <section className="section"><div className="container-shell grid lg:grid-cols-2 gap-4"><div className="panel p-6"><Wrench size={20} className="text-cyan-300"/><h2 className="font-semibold mt-5">{t('project.technologies')}</h2><div className="flex flex-wrap gap-2 mt-4">{project.technologies.map(x => <span className="badge" key={x}>{x}</span>)}</div></div><div className="panel p-6"><CheckCircle2 size={20} className="text-emerald-400"/><h2 className="font-semibold mt-5">{t('project.results')}</h2><ul className="mt-4 space-y-3 text-sm text-slate-400">{project.results.map(x => <li key={pickText(x, locale)}>• {pickText(x, locale)}</li>)}</ul></div></div></section>

    <section className="section"><div className="container-shell"><div className="panel p-6"><ShieldCheck size={20} className="text-cyan-300"/><h2 className="font-semibold mt-4">{t('project.lessons')}</h2><div className="grid md:grid-cols-3 gap-3 mt-4">{project.lessons.map(x => <div className="rounded-xl border border-white/5 p-4 text-sm text-slate-400" key={pickText(x, locale)}>{pickText(x, locale)}</div>)}</div></div></div></section>
  </main><Footer/></>;
}
