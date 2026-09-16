import { useState } from 'react';
import { Archive, ChevronDown, FolderTree, Laptop, ServerCog, Shield, UserCog, Users } from 'lucide-react';
import { useI18n } from '../../i18n/I18nProvider';

export default function ADArchitecture() {
  const { locale, t } = useI18n();

  const content = {
    'pt-BR': {
      title: 'Organização por finalidade administrativa',
      selected: 'OU selecionada',
      tags: ['Desenho de OUs', 'Administração por função', 'Grupos de segurança', 'Delegação', 'Menor privilégio', 'Direcionamento de GPO'],
      items: [
        ['00_ADMIN', 'Objetos administrativos e delegações separados da estrutura organizacional.'],
        ['01_ORGANIZATION', 'Áreas agrupadas para facilitar administração, localização de objetos e aplicação de políticas.'],
        ['02_DEVICES', 'Computadores e outros dispositivos separados por função e ciclo de vida.'],
        ['03_SERVICE_ACCOUNTS', 'Contas técnicas isoladas para facilitar controle, revisão e delegação.'],
        ['04_LEGACY', 'Objetos legados mantidos fora do fluxo operacional principal.'],
        ['99_DISABLED', 'Objetos desativados separados dos ativos para facilitar revisão e controle do ciclo de vida.'],
      ],
    },
    'en-US': {
      title: 'Organization by administrative purpose',
      selected: 'Selected OU',
      tags: ['OU design', 'Role-based administration', 'Security groups', 'Delegation', 'Least privilege', 'GPO targeting'],
      items: [
        ['00_ADMIN', 'Administrative objects and delegations separated from the organizational structure.'],
        ['01_ORGANIZATION', 'Areas grouped to simplify administration, object location and policy application.'],
        ['02_DEVICES', 'Computers and other devices separated by function and lifecycle.'],
        ['03_SERVICE_ACCOUNTS', 'Technical accounts isolated to simplify control, review and delegation.'],
        ['04_LEGACY', 'Legacy objects kept outside the main operational flow.'],
        ['99_DISABLED', 'Disabled objects separated from active ones to simplify lifecycle review and control.'],
      ],
    },
    'es-ES': {
      title: 'Organización por finalidad administrativa',
      selected: 'OU seleccionada',
      tags: ['Diseño de OUs', 'Administración por función', 'Grupos de seguridad', 'Delegación', 'Mínimo privilegio', 'Asignación de GPO'],
      items: [
        ['00_ADMIN', 'Objetos administrativos y delegaciones separados de la estructura organizacional.'],
        ['01_ORGANIZATION', 'Áreas agrupadas para facilitar administración, ubicación de objetos y aplicación de políticas.'],
        ['02_DEVICES', 'Equipos y otros dispositivos separados por función y ciclo de vida.'],
        ['03_SERVICE_ACCOUNTS', 'Cuentas técnicas aisladas para facilitar control, revisión y delegación.'],
        ['04_LEGACY', 'Objetos heredados mantenidos fuera del flujo operativo principal.'],
        ['99_DISABLED', 'Objetos deshabilitados separados de los activos para facilitar revisión y control del ciclo de vida.'],
      ],
    },
  }[locale];

  const icons = [Shield, Users, Laptop, UserCog, Archive, ServerCog];
  const [active, setActive] = useState(1);

  return <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-4">
    <div className="panel p-3">
      <div className="px-3 py-2 border-b border-white/5 flex items-center gap-2 mono text-xs text-slate-400"><FolderTree size={15} className="text-cyan-300"/> EXAMPLE.LOCAL</div>
      <div className="p-2">{content.items.map(([name], i) => {
        const Icon = icons[i];
        return <button key={name} onClick={() => setActive(i)} className={`w-full min-h-12 flex items-center gap-3 px-3 rounded-xl text-left text-sm transition-colors ${active === i ? 'bg-cyan-300/[.07] border border-cyan-300/15 text-white' : 'border border-transparent text-slate-400 hover:bg-white/[.03]'}`}>
          <ChevronDown size={13} className="text-slate-600"/>
          <Icon size={16} className={active === i ? 'text-cyan-300' : 'text-slate-500'}/>
          <span className="mono text-xs">{name}</span>
        </button>;
      })}</div>
    </div>

    <div className="panel p-5 md:p-6 min-h-[300px]">
      <div className="mono text-xs text-cyan-300 mb-3">{content.selected} / {content.items[active][0]}</div>
      <h3 className="text-2xl font-semibold tracking-tight">{content.title}</h3>
      <p className="text-slate-400 leading-7 mt-4">{content.items[active][1]}</p>
      <div className="grid sm:grid-cols-2 gap-2 mt-6">{content.tags.map(x => <span className="badge justify-start" key={x}>{x}</span>)}</div>
      <p className="text-[11px] text-slate-600 mt-6">{t('project.demoArchitecture')}</p>
    </div>
  </div>;
}
