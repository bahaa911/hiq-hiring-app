export const PHASES = {
  intake: {
    label: 'Intake',
    color: '#0C447C',
    bg: '#E6F1FB',
    border: '#185FA5',
    light: '#dbeeff',
  },
  sourcing: {
    label: 'Sourcing',
    color: '#3C3489',
    bg: '#EEEDFE',
    border: '#534AB7',
    light: '#e0deff',
  },
  selection: {
    label: 'Selection',
    color: '#085041',
    bg: '#E1F5EE',
    border: '#0F6E56',
    light: '#c8ede3',
  },
  deployment: {
    label: 'Deployment',
    color: '#633806',
    bg: '#FAEEDA',
    border: '#854F0B',
    light: '#f5ddb0',
  },
  management: {
    label: 'Management',
    color: '#27500A',
    bg: '#EAF3DE',
    border: '#3B6D11',
    light: '#d3e8b8',
  },
};

export const STAGES = [
  {
    id: 1,
    title: 'Call-off intake',
    subtitle: 'Acknowledge within 1 business day',
    phase: 'intake',
    sla: '1 business day',
    detail:
      'Upon receiving a call-off from QNB, HIQ acknowledges within 1 business day. This stage involves reviewing the requirement details, clarifying any ambiguities with the QNB procurement contact, and logging the requisition formally into the HIQ fulfilment tracker.',
  },
  {
    id: 2,
    title: 'Talent sourcing',
    subtitle: 'Database, GCC, LinkedIn, partner network',
    phase: 'sourcing',
    sla: '2–3 business days',
    detail:
      'HIQ activates its full talent pipeline simultaneously: internal pre-vetted database, GCC job boards, LinkedIn Recruiter, and partner staffing networks across Qatar and the GCC. Multiple channels run in parallel to maximise candidate coverage within the committed timeline.',
  },
  {
    id: 3,
    title: 'Technical screening',
    subtitle: 'Skills assessment, references, certifications',
    phase: 'sourcing',
    sla: '3–5 business days',
    detail:
      'Shortlisted candidates undergo a structured technical screening process: role-specific skills assessment, at least two professional reference checks, and verification of claimed certifications. Only candidates who clear all three gates progress to CV preparation.',
  },
  {
    id: 4,
    title: 'CV submission to QNB',
    subtitle: '5–10 business days · skills matrix format',
    phase: 'sourcing',
    sla: '5–10 business days from call-off',
    detail:
      "Vetted CVs are reformatted into QNB's required skills matrix format and submitted within 5–10 business days of call-off receipt. Each submission package includes a HIQ cover note with an independent assessment of each candidate's fit and availability.",
  },
  {
    id: 5,
    title: 'Interview coordination',
    subtitle: 'Scheduled within 2–5 days of shortlist',
    phase: 'selection',
    sla: '2–5 days after QNB shortlist',
    detail:
      'Once QNB returns a shortlist, HIQ schedules interviews within 2–5 business days. HIQ manages all logistics including calendar coordination with QNB hiring managers, candidate briefing packs, and post-interview feedback collection and reporting.',
  },
  {
    id: 6,
    title: 'Offer & acceptance',
    subtitle: 'Notice period tracking · contract signing',
    phase: 'selection',
    sla: 'Varies by notice period',
    detail:
      'HIQ manages offer negotiation, tracks each candidate\'s notice period obligations, and coordinates bilateral contract signing between QNB and the resource. All contractual documentation — employment agreement, NDA, QNB-specific annexes — is finalised at this stage.',
  },
  {
    id: 7,
    title: 'Mobilisation & onboarding',
    subtitle: 'Visa · background check · QNB induction',
    phase: 'deployment',
    sla: '2–4 weeks (visa-dependent)',
    detail:
      'HIQ initiates visa processing (where required), full background checks, and QNB-specific induction requirements including security clearance applications. HIQ\'s PRO team manages all government liaison in Qatar to ensure timely clearance before the agreed start date.',
  },
  {
    id: 8,
    title: 'Resource deployment',
    subtitle: 'Onsite · offshore · hybrid per QNB request',
    phase: 'deployment',
    sla: 'Per call-off start date',
    detail:
      "The resource is deployed in the engagement mode specified by QNB's call-off: onsite at QNB premises, offshore from HIQ delivery centres, or a hybrid split. Day-one readiness — equipment, access, induction — is confirmed with QNB's project manager before start.",
  },
  {
    id: 9,
    title: 'Ongoing management',
    subtitle: 'Timesheets · payroll · performance monitoring',
    phase: 'management',
    sla: 'Continuous',
    detail:
      'HIQ manages all operational and performance aspects for the duration of the engagement: weekly timesheet approval, monthly payroll processing, quarterly performance reviews with QNB, and proactive communication via a dedicated HIQ account manager.',
  },
  {
    id: 10,
    title: 'Replacement or roll-off',
    subtitle: '10–15 days backfill · knowledge handover',
    phase: 'management',
    sla: '10–15 business days backfill',
    detail:
      "When a resource exits — voluntarily, at contract end, or at QNB's request — HIQ guarantees a 10–15 business day backfill cycle with a structured knowledge handover plan. Exit interviews and knowledge documentation are completed before the resource's last day.",
  },
];
