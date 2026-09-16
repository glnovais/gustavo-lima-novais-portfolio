import { localized as l } from '../i18n/text';
import type { ExperienceItem } from '../types';

export const experience: ExperienceItem[] = [
  {
    period: '05/2025 — Atual',
    role: l('Analista de Infraestrutura N2', 'Infrastructure Analyst N2', 'Analista de Infraestructura N2'),
    company: 'Secretaria de Desenvolvimento Econômico',
    environment: l('Ambiente corporativo do setor público · atuação terceirizada', 'Public-sector corporate environment · outsourced assignment', 'Entorno corporativo del sector público · actuación tercerizada'),
    summary: l(
      'Atuação em infraestrutura de TI com administração de Active Directory, OUs, GPOs, grupos de segurança, contas, endpoints, servidores, inventário, troubleshooting, documentação e padronização, mantendo o suporte corporativo como parte da base operacional.',
      'Infrastructure role covering Active Directory administration, OUs, GPOs, security groups, accounts, endpoints, servers, inventory, troubleshooting, documentation and standardization, with corporate support remaining part of the operational foundation.',
      'Actuación en infraestructura de TI con administración de Active Directory, OUs, GPOs, grupos de seguridad, cuentas, endpoints, servidores, inventario, troubleshooting, documentación y estandarización, manteniendo el soporte corporativo como parte de la base operativa.'
    ),
    highlights: [
      l('Reestruturação de Active Directory', 'Active Directory restructuring', 'Reestructuración de Active Directory'),
      l('Group Policy e grupos de segurança', 'Group Policy and security groups', 'Group Policy y grupos de seguridad'),
      l('Administração de endpoints e servidores', 'Endpoint and server administration', 'Administración de endpoints y servidores'),
      l('Inventário e documentação técnica', 'Inventory and technical documentation', 'Inventario y documentación técnica'),
      l('Troubleshooting e continuidade operacional', 'Troubleshooting and operational continuity', 'Troubleshooting y continuidad operativa'),
      l('Padronização e melhoria de processos', 'Standardization and process improvement', 'Estandarización y mejora de procesos'),
    ],
    current: true,
  },
  {
    period: '03/2023 — 02/2025',
    role: l('Analista de Suporte Jr.', 'Junior Support Analyst', 'Analista de Soporte Jr.'),
    company: 'CastGroup',
    environment: l('Ambiente corporativo', 'Corporate environment', 'Entorno corporativo'),
    summary: l(
      'Suporte a usuários em incidentes de hardware, software, sistemas operacionais e aplicações corporativas, com registro e acompanhamento de chamados, instalação e configuração de estações, orientação a usuários e colaboração em documentação técnica.',
      'User support for hardware, software, operating-system and corporate-application incidents, including ticket tracking, workstation installation and configuration, user guidance and collaboration on technical documentation.',
      'Soporte a usuarios en incidentes de hardware, software, sistemas operativos y aplicaciones corporativas, con seguimiento de tickets, instalación y configuración de estaciones, orientación a usuarios y colaboración en documentación técnica.'
    ),
    highlights: [
      l('Suporte técnico corporativo', 'Corporate technical support', 'Soporte técnico corporativo'),
      l('Hardware e software', 'Hardware and software', 'Hardware y software'),
      l('Aplicações corporativas', 'Corporate applications', 'Aplicaciones corporativas'),
      l('Gestão de chamados', 'Ticket management', 'Gestión de tickets'),
      l('Treinamento e orientação de usuários', 'User guidance and training', 'Orientación y capacitación de usuarios'),
      l('Documentação técnica', 'Technical documentation', 'Documentación técnica'),
    ],
  },
];
