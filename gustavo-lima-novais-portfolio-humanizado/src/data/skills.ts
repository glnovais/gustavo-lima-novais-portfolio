import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  { category: 'Active Directory', items: ['Organizational Units', 'Group Policy', 'Security Groups', 'Account Management', 'Delegation', 'Directory Organization'] },
  { category: 'Windows Infrastructure', items: ['Windows', 'Windows Server', 'Remote Administration', 'Endpoint Management'] },
  { category: 'Networking', items: ['TCP/IP', 'Corporate Networking', 'Troubleshooting', 'DNS', 'Connectivity', 'Firewall concepts'] },
  { category: 'Automation', items: ['PowerShell', 'Administrative Scripts', 'Reporting', 'Infrastructure Automation'] },
  { category: 'Monitoring', items: ['Zabbix', 'SNMP', 'Availability Monitoring', 'Service Monitoring'] },
  { category: 'IT Management', items: ['GLPI', 'Jira', 'Remedy', 'Asset Inventory', 'ITSM', 'Technical Documentation'] },
  { category: 'Development', items: ['HTML', 'CSS', 'JavaScript', 'Git'] },
];

export type ProfileLevel = 'professional' | 'practical' | 'lab' | 'evolving';
export const infrastructureProfile: { name: string; level: ProfileLevel; meter: number }[] = [
  { name: 'Active Directory', level: 'professional', meter: 5 },
  { name: 'Corporate Support', level: 'professional', meter: 5 },
  { name: 'Networking', level: 'practical', meter: 4 },
  { name: 'Windows Infrastructure', level: 'practical', meter: 4 },
  { name: 'PowerShell', level: 'practical', meter: 4 },
  { name: 'Monitoring / Zabbix', level: 'lab', meter: 3 },
  { name: 'IT Governance', level: 'evolving', meter: 3 },
];
