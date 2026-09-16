import { localized as l } from '../i18n/text';
import type { Project } from '../types';
import { projects as baseProjects } from './projects';

const adminCenter: Project = {
  slug: 'admin-center', index: '02', category: 'Internal Tools & Automation', accent: 'Tooling', status: 'applied',
  title: l('SDE Admin Center', 'SDE Admin Center', 'SDE Admin Center'),
  summary: l('Ferramenta interna desenvolvida para centralizar e facilitar rotinas administrativas de Active Directory, suporte e diagnóstico em uma única interface.','Internal tool developed to centralize and simplify Active Directory, support and diagnostic routines in a single interface.','Herramienta interna desarrollada para centralizar y facilitar rutinas administrativas de Active Directory, soporte y diagnóstico en una única interfaz.'),
  problem: l('Rotinas administrativas estavam distribuídas entre consoles, scripts e consultas manuais, aumentando a troca de contexto, a repetição de etapas e a dificuldade para manter um fluxo operacional consistente.','Administrative routines were spread across consoles, scripts and manual queries, increasing context switching, repeated steps and the difficulty of maintaining a consistent operational workflow.','Las rutinas administrativas estaban distribuidas entre consolas, scripts y consultas manuales, aumentando los cambios de contexto, la repetición de pasos y la dificultad para mantener un flujo operativo consistente.'),
  approach: [
    l('Criação governada de usuários com validação de campos e seleção restrita a OUs previamente autorizadas.','Governed user provisioning with field validation and selection restricted to previously authorized OUs.','Creación gobernada de usuarios con validación de campos y selección restringida a OUs previamente autorizadas.'),
    l('Reset de senha e desbloqueio de conta com pesquisa individual, prévia, confirmação e registro da operação.','Password reset and account unlock flows with individual lookup, preview, confirmation and operation logging.','Restablecimiento de contraseña y desbloqueo de cuenta con búsqueda individual, vista previa, confirmación y registro de la operación.'),
    l('Modos de Demonstração, Auditoria e Administrativo para separar simulação, consultas e ações de alteração.','Demo, Audit and Administrative modes separate simulation, read-only queries and change operations.','Modos de Demostración, Auditoría y Administrativo para separar simulación, consultas y acciones de modificación.'),
    l('Uso da identidade Windows integrada, respeitando as permissões e delegações já definidas no ambiente.','Integrated Windows identity is used while respecting permissions and delegations already defined in the environment.','Uso de la identidad integrada de Windows, respetando los permisos y delegaciones ya definidos en el entorno.'),
    l('Separação entre interface WPF/XAML e módulos PowerShell para manter as regras administrativas organizadas, testáveis e reutilizáveis.','Separation between the WPF/XAML interface and PowerShell modules keeps administrative rules organized, testable and reusable.','Separación entre la interfaz WPF/XAML y los módulos PowerShell para mantener las reglas administrativas organizadas, comprobables y reutilizables.'),
    l('Trilha de auditoria e exportação de relatórios para ampliar a rastreabilidade das consultas e operações.','Audit trails and report exports improve traceability of queries and operations.','Trazabilidad de auditoría y exportación de informes para ampliar el seguimiento de consultas y operaciones.'),
  ],
  technologies: ['PowerShell 5.1','WPF / XAML','Active Directory','Windows','WinRM','RSAT','Integrated Windows Authentication'],
  results: [
    l('Centralização de rotinas administrativas em uma interface única.','Administrative routines centralized in a single interface.','Centralización de rutinas administrativas en una única interfaz.'),
    l('Fluxos mais consistentes para criação de usuários, reset de senha e desbloqueio de contas.','More consistent workflows for user provisioning, password resets and account unlocks.','Flujos más consistentes para creación de usuarios, restablecimiento de contraseñas y desbloqueo de cuentas.'),
    l('Maior rastreabilidade por meio de logs, auditoria e exportações estruturadas.','Greater traceability through logs, auditing and structured exports.','Mayor trazabilidad mediante logs, auditoría y exportaciones estructuradas.'),
    l('Separação clara entre consultas somente leitura e ações administrativas.','Clear separation between read-only queries and administrative actions.','Separación clara entre consultas de solo lectura y acciones administrativas.'),
    l('Menor dependência de scripts isolados para tarefas recorrentes.','Reduced dependence on isolated scripts for recurring tasks.','Menor dependencia de scripts aislados para tareas recurrentes.'),
  ],
  lessons: [
    l('Ferramentas administrativas precisam facilitar a operação sem contornar as permissões do ambiente.','Administrative tools should simplify operations without bypassing environment permissions.','Las herramientas administrativas deben facilitar la operación sin eludir los permisos del entorno.'),
    l('Separar interface e lógica administrativa melhora manutenção, testes e evolução dos módulos.','Separating interface and administrative logic improves maintenance, testing and module evolution.','Separar la interfaz y la lógica administrativa mejora el mantenimiento, las pruebas y la evolución de los módulos.'),
    l('Ações sensíveis precisam de confirmação, trilha de auditoria e cuidado para não registrar credenciais.','Sensitive actions require confirmation, audit trails and care to avoid logging credentials.','Las acciones sensibles requieren confirmación, trazabilidad de auditoría y cuidado para no registrar credenciales.'),
  ], nextSteps: [],
};

const projectOrder = ['active-directory','admin-center','automation','gpo','governance'] as const;
const indexes: Record<string,string> = {'active-directory':'01','admin-center':'02',automation:'03',gpo:'04',governance:'05'};
const projectBySlug = new Map<string,Project>();
baseProjects.filter(p => !['monitoring','itsm'].includes(p.slug)).forEach(p => projectBySlug.set(p.slug, p));
projectBySlug.set('admin-center', adminCenter);
export const projects: Project[] = projectOrder.map(slug => projectBySlug.get(slug)).filter((p): p is Project => Boolean(p)).map(p => ({...p,index:indexes[p.slug]}));
