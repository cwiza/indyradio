export interface Station {
  id: string;
  name: string;
  frequency: string;
  location: string;
  state: string;
  riskLevel: 'critical' | 'high' | 'moderate' | 'low';
  listeners: string;
  federalFunding: number;
  description: string;
  funding: {
    total: string;
    federal: string;
    state: string;
    local: string;
    donations: string;
  };
  impact: string;
  needs: string[];
  programs: string[];
  emergencyFunding: string;
  coordinates: { x: number; y: number };
  politicalLean: 'liberal' | 'moderate' | 'conservative';
  stationType: 'university' | 'community' | 'npr_affiliate';
}

export const stations: Station[] = [
  {
    id: 'kqed',
    name: 'KQED',
    frequency: '88.5 FM',
    location: 'San Francisco, CA',
    state: 'CA',
    riskLevel: 'moderate',
    listeners: '750K',
    federalFunding: 23,
    description: 'Northern California\'s flagship public radio station, serving the Bay Area with comprehensive news coverage and cultural programming.',
    funding: {
      total: '$12.5M',
      federal: '$2.9M',
      state: '$1.8M',
      local: '$3.2M',
      donations: '$4.6M'
    },
    impact: 'Federal cuts would eliminate the investigative journalism unit and reduce emergency broadcasting coverage during wildfire season.',
    needs: [
      'Investigative journalism program: $150K',
      'Emergency equipment upgrade: $75K',
      'Rural translator stations: $200K'
    ],
    programs: ['Morning Edition', 'All Things Considered', 'Forum', 'Perspectives'],
    emergencyFunding: '$425K',
    coordinates: { x: 8, y: 45 },
    politicalLean: 'liberal',
    stationType: 'npr_affiliate'
  },
  {
    id: 'kpbx',
    name: 'KPBX',
    frequency: '91.1 FM',
    location: 'Spokane, WA',
    state: 'WA',
    riskLevel: 'critical',
    listeners: '45K',
    federalFunding: 67,
    description: 'Eastern Washington\'s primary NPR affiliate, serving rural communities across the Inland Northwest.',
    funding: {
      total: '$1.2M',
      federal: '$800K',
      state: '$150K',
      local: '$100K',
      donations: '$150K'
    },
    impact: 'Station faces potential closure without emergency funding. Rural communities would lose their only source of local news and emergency information.',
    needs: [
      'Emergency operations fund: $200K',
      'Transmitter replacement: $85K',
      'Staff retention: $120K'
    ],
    programs: ['Morning Edition', 'Regional News', 'Emergency Broadcasting'],
    emergencyFunding: '$405K',
    coordinates: { x: 12, y: 15 },
    politicalLean: 'moderate',
    stationType: 'community'
  },
  {
    id: 'wfiu',
    name: 'WFIU',
    frequency: '103.7 FM',
    location: 'Bloomington, IN',
    state: 'IN',
    riskLevel: 'high',
    listeners: '120K',
    federalFunding: 43,
    description: 'Indiana University\'s public radio station, providing news and cultural programming to rural southern Indiana.',
    funding: {
      total: '$2.1M',
      federal: '$900K',
      state: '$400K',
      local: '$300K',
      donations: '$500K'
    },
    impact: 'Reduced federal funding threatens closure of rural bureaus and elimination of local news coverage.',
    needs: [
      'Rural news bureau: $95K',
      'Digital infrastructure: $65K',
      'Community outreach: $45K'
    ],
    programs: ['All Things Considered', 'Indiana Newsdesk', 'Classical Music'],
    emergencyFunding: '$205K',
    coordinates: { x: 68, y: 42 },
    politicalLean: 'moderate',
    stationType: 'university'
  },
  {
    id: 'kasu',
    name: 'KASU',
    frequency: '91.9 FM',
    location: 'Jonesboro, AR',
    state: 'AR',
    riskLevel: 'critical',
    listeners: '32K',
    federalFunding: 71,
    description: 'Arkansas State University\'s radio station serving rural northeast Arkansas.',
    funding: {
      total: '$800K',
      federal: '$568K',
      state: '$100K',
      local: '$50K',
      donations: '$82K'
    },
    impact: 'Severe funding cuts threaten complete shutdown of local news operations.',
    needs: [
      'Basic operations: $180K',
      'Equipment maintenance: $45K',
      'Staff salaries: $155K'
    ],
    programs: ['NPR News', 'Delta Blues', 'Farm Report'],
    emergencyFunding: '$380K',
    coordinates: { x: 60, y: 55 },
    politicalLean: 'conservative',
    stationType: 'university'
  },
  {
    id: 'krcc',
    name: 'KRCC',
    frequency: '91.5 FM',
    location: 'Colorado Springs, CO',
    state: 'CO',
    riskLevel: 'critical',
    listeners: '38K',
    federalFunding: 69,
    description: 'Colorado College\'s NPR affiliate serving the Pikes Peak region.',
    funding: {
      total: '$950K',
      federal: '$656K',
      state: '$120K',
      local: '$74K',
      donations: '$100K'
    },
    impact: 'Federal cuts would eliminate local news coverage for rural mountain communities.',
    needs: [
      'Mountain transmitter: $120K',
      'News staff: $85K',
      'Emergency equipment: $65K'
    ],
    programs: ['Morning Edition', 'Mountain News', 'Classical Peaks'],
    emergencyFunding: '$270K',
    coordinates: { x: 45, y: 40 },
    politicalLean: 'moderate',
    stationType: 'university'
  },
  {
    id: 'kunc',
    name: 'KUNC',
    frequency: '91.5 FM',
    location: 'Greeley, CO',
    state: 'CO',
    riskLevel: 'high',
    listeners: '95K',
    federalFunding: 41,
    description: 'University of Northern Colorado\'s NPR station covering the Front Range.',
    funding: {
      total: '$1.8M',
      federal: '$738K',
      state: '$300K',
      local: '$362K',
      donations: '$400K'
    },
    impact: 'Funding reductions would cut rural bureau coverage and agriculture reporting.',
    needs: [
      'Agricultural reporting: $75K',
      'Digital upgrade: $50K',
      'Rural coverage: $90K'
    ],
    programs: ['Here & Now', 'Colorado Edition', 'Harvest Public Media'],
    emergencyFunding: '$215K',
    coordinates: { x: 44, y: 38 },
    politicalLean: 'moderate',
    stationType: 'university'
  },
  {
    id: 'wcmu',
    name: 'WCMU',
    frequency: '89.5 FM',
    location: 'Mount Pleasant, MI',
    state: 'MI',
    riskLevel: 'high',
    listeners: '78K',
    federalFunding: 52,
    description: 'Central Michigan University\'s public radio serving central and northern Michigan.',
    funding: {
      total: '$1.5M',
      federal: '$780K',
      state: '$250K',
      local: '$170K',
      donations: '$300K'
    },
    impact: 'Federal cuts threaten coverage of rural Michigan communities and Native American reservations.',
    needs: [
      'Native coverage: $60K',
      'Rural bureaus: $80K',
      'Equipment: $40K'
    ],
    programs: ['Michigan Radio', 'Native Voice', 'Great Lakes Today'],
    emergencyFunding: '$180K',
    coordinates: { x: 72, y: 32 },
    politicalLean: 'moderate',
    stationType: 'university'
  },
  {
    id: 'kuni',
    name: 'KUNI',
    frequency: '90.9 FM',
    location: 'Cedar Falls, IA',
    state: 'IA',
    riskLevel: 'high',
    listeners: '67K',
    federalFunding: 48,
    description: 'University of Northern Iowa\'s NPR affiliate serving rural Iowa communities.',
    funding: {
      total: '$1.3M',
      federal: '$624K',
      state: '$200K',
      local: '$176K',
      donations: '$300K'
    },
    impact: 'Cuts would eliminate agricultural reporting and rural news coverage.',
    needs: [
      'Farm reporting: $55K',
      'Rural coverage: $70K',
      'Equipment: $35K'
    ],
    programs: ['Iowa Edition', 'Farm Report', 'Classical Music'],
    emergencyFunding: '$160K',
    coordinates: { x: 56, y: 35 },
    politicalLean: 'moderate',
    stationType: 'university'
  },
  {
    id: 'wmuk',
    name: 'WMUK',
    frequency: '102.1 FM',
    location: 'Kalamazoo, MI',
    state: 'MI',
    riskLevel: 'high',
    listeners: '89K',
    federalFunding: 39,
    description: 'Western Michigan University\'s NPR station serving southwest Michigan.',
    funding: {
      total: '$1.7M',
      federal: '$663K',
      state: '$280K',
      local: '$257K',
      donations: '$500K'
    },
    impact: 'Federal cuts would reduce local news coverage and eliminate investigative reporting.',
    needs: [
      'Investigative unit: $85K',
      'Local news: $65K',
      'Equipment: $45K'
    ],
    programs: ['Morning Edition', 'West Michigan Live', 'Local Coverage'],
    emergencyFunding: '$195K',
    coordinates: { x: 71, y: 35 },
    politicalLean: 'moderate',
    stationType: 'university'
  },
  {
    id: 'krvs',
    name: 'KRVS',
    frequency: '88.7 FM',
    location: 'Lafayette, LA',
    state: 'LA',
    riskLevel: 'high',
    listeners: '54K',
    federalFunding: 44,
    description: 'University of Louisiana at Lafayette\'s NPR affiliate serving Acadiana.',
    funding: {
      total: '$1.1M',
      federal: '$484K',
      state: '$180K',
      local: '$136K',
      donations: '$300K'
    },
    impact: 'Cuts threaten coverage of hurricane preparedness and Cajun cultural programming.',
    needs: [
      'Hurricane coverage: $70K',
      'Cultural programs: $50K',
      'Equipment: $40K'
    ],
    programs: ['Acadiana Edition', 'Hurricane Watch', 'Cajun Music'],
    emergencyFunding: '$160K',
    coordinates: { x: 58, y: 68 },
    politicalLean: 'moderate',
    stationType: 'university'
  },
  {
    id: 'ktep',
    name: 'KTEP',
    frequency: '88.5 FM',
    location: 'El Paso, TX',
    state: 'TX',
    riskLevel: 'high',
    listeners: '76K',
    federalFunding: 41,
    description: 'University of Texas at El Paso\'s NPR station serving the borderland.',
    funding: {
      total: '$1.4M',
      federal: '$574K',
      state: '$220K',
      local: '$206K',
      donations: '$400K'
    },
    impact: 'Federal cuts would eliminate border reporting and bilingual programming.',
    needs: [
      'Border coverage: $80K',
      'Bilingual programs: $60K',
      'Equipment: $45K'
    ],
    programs: ['Border Edition', 'Frontera', 'Desert Music'],
    emergencyFunding: '$185K',
    coordinates: { x: 42, y: 62 },
    politicalLean: 'moderate',
    stationType: 'university'
  },
  {
    id: 'kglt',
    name: 'KGLT',
    frequency: '91.9 FM',
    location: 'Bozeman, MT',
    state: 'MT',
    riskLevel: 'high',
    listeners: '43K',
    federalFunding: 56,
    description: 'Montana State University\'s radio station serving the greater Yellowstone region.',
    funding: {
      total: '$900K',
      federal: '$504K',
      state: '$130K',
      local: '$96K',
      donations: '$170K'
    },
    impact: 'Cuts threaten coverage of rural ranching communities and environmental reporting.',
    needs: [
      'Environmental reporting: $65K',
      'Rural coverage: $55K',
      'Equipment: $35K'
    ],
    programs: ['Montana Edition', 'Ranch Report', 'Mountain Music'],
    emergencyFunding: '$155K',
    coordinates: { x: 35, y: 20 },
    politicalLean: 'moderate',
    stationType: 'university'
  },
  {
    id: 'kbsx',
    name: 'KBSX',
    frequency: '91.5 FM',
    location: 'Boise, ID',
    state: 'ID',
    riskLevel: 'high',
    listeners: '62K',
    federalFunding: 49,
    description: 'Boise State University\'s NPR affiliate serving Idaho and eastern Oregon.',
    funding: {
      total: '$1.2M',
      federal: '$588K',
      state: '$180K',
      local: '$132K',
      donations: '$300K'
    },
    impact: 'Federal cuts would reduce coverage of rural Idaho and Native American communities.',
    needs: [
      'Native coverage: $70K',
      'Rural bureaus: $80K',
      'Equipment: $50K'
    ],
    programs: ['Idaho Edition', 'Native Voices', 'Outdoor Idaho'],
    emergencyFunding: '$200K',
    coordinates: { x: 25, y: 30 },
    politicalLean: 'moderate',
    stationType: 'university'
  },
  {
    id: 'kypr',
    name: 'KYPR',
    frequency: '91.9 FM',
    location: 'Cedar City, UT',
    state: 'UT',
    riskLevel: 'high',
    listeners: '34K',
    federalFunding: 58,
    description: 'Southern Utah University\'s NPR station serving rural Utah communities.',
    funding: {
      total: '$750K',
      federal: '$435K',
      state: '$100K',
      local: '$65K',
      donations: '$150K'
    },
    impact: 'Federal cuts threaten the only news source for isolated rural Utah communities.',
    needs: [
      'Rural transmitters: $90K',
      'News staff: $70K',
      'Equipment: $40K'
    ],
    programs: ['Utah Edition', 'Desert Report', 'Classical Utah'],
    emergencyFunding: '$200K',
    coordinates: { x: 35, y: 42 },
    politicalLean: 'conservative',
    stationType: 'university'
  },
  {
    id: 'wnyc',
    name: 'WNYC',
    frequency: '93.9 FM',
    location: 'New York, NY',
    state: 'NY',
    riskLevel: 'moderate',
    listeners: '1.2M',
    federalFunding: 18,
    description: 'New York\'s flagship public radio station serving the tri-state area.',
    funding: {
      total: '$45M',
      federal: '$8.1M',
      state: '$5.2M',
      local: '$12.8M',
      donations: '$18.9M'
    },
    impact: 'Federal cuts would reduce investigative journalism capacity and community outreach.',
    needs: [
      'Investigative team: $200K',
      'Community programs: $150K',
      'Equipment upgrade: $100K'
    ],
    programs: ['The Brian Lehrer Show', 'Morning Edition', 'All Things Considered'],
    emergencyFunding: '$450K',
    coordinates: { x: 85, y: 28 },
    politicalLean: 'liberal',
    stationType: 'npr_affiliate'
  },
  {
    id: 'wbur',
    name: 'WBUR',
    frequency: '90.9 FM',
    location: 'Boston, MA',
    state: 'MA',
    riskLevel: 'moderate',
    listeners: '980K',
    federalFunding: 21,
    description: 'Boston University\'s NPR station serving New England.',
    funding: {
      total: '$38M',
      federal: '$7.98M',
      state: '$4.5M',
      local: '$10.2M',
      donations: '$15.32M'
    },
    impact: 'Federal cuts would impact regional news coverage and reduce programming quality.',
    needs: [
      'Regional bureaus: $180K',
      'Digital infrastructure: $120K',
      'Programming: $150K'
    ],
    programs: ['Here & Now', 'On Point', 'Radio Boston'],
    emergencyFunding: '$450K',
    coordinates: { x: 88, y: 25 },
    politicalLean: 'liberal',
    stationType: 'university'
  },
  {
    id: 'kera',
    name: 'KERA',
    frequency: '90.1 FM',
    location: 'Dallas, TX',
    state: 'TX',
    riskLevel: 'moderate',
    listeners: '456K',
    federalFunding: 28,
    description: 'North Texas Public Broadcasting serving the Dallas-Fort Worth metroplex.',
    funding: {
      total: '$18M',
      federal: '$5.04M',
      state: '$2.8M',
      local: '$4.2M',
      donations: '$5.96M'
    },
    impact: 'Federal cuts would reduce rural Texas coverage and Spanish-language programming.',
    needs: [
      'Rural coverage: $140K',
      'Spanish programming: $100K',
      'Equipment: $80K'
    ],
    programs: ['Think', 'KERA News', 'Classical 101.1'],
    emergencyFunding: '$320K',
    coordinates: { x: 52, y: 60 },
    politicalLean: 'moderate',
    stationType: 'npr_affiliate'
  },
  {
    id: 'wamu',
    name: 'WAMU',
    frequency: '88.5 FM',
    location: 'Washington, DC',
    state: 'DC',
    riskLevel: 'moderate',
    listeners: '632K',
    federalFunding: 25,
    description: 'American University\'s NPR station serving the nation\'s capital.',
    funding: {
      total: '$22M',
      federal: '$5.5M',
      state: '$3.2M',
      local: '$6.1M',
      donations: '$7.2M'
    },
    impact: 'Federal cuts would reduce government accountability reporting.',
    needs: [
      'Investigative reporting: $160K',
      'Government coverage: $120K',
      'Digital platform: $90K'
    ],
    programs: ['1A', 'The Kojo Nnamdi Show', 'All Things Considered'],
    emergencyFunding: '$370K',
    coordinates: { x: 83, y: 42 },
    politicalLean: 'liberal',
    stationType: 'university'
  },
  {
    id: 'kpcc',
    name: 'KPCC',
    frequency: '89.3 FM',
    location: 'Los Angeles, CA',
    state: 'CA',
    riskLevel: 'moderate',
    listeners: '542K',
    federalFunding: 26,
    description: 'Pasadena City College\'s NPR affiliate serving Southern California.',
    funding: {
      total: '$19M',
      federal: '$4.94M',
      state: '$2.9M',
      local: '$5.2M',
      donations: '$5.96M'
    },
    impact: 'Federal cuts would reduce immigration coverage and Spanish-language services.',
    needs: [
      'Immigration reporting: $130K',
      'Spanish services: $100K',
      'Equipment: $70K'
    ],
    programs: ['AirTalk', 'Take Two', 'Latino USA'],
    emergencyFunding: '$300K',
    coordinates: { x: 15, y: 52 },
    politicalLean: 'liberal',
    stationType: 'community'
  },
  {
    id: 'wbez',
    name: 'WBEZ',
    frequency: '91.5 FM',
    location: 'Chicago, IL',
    state: 'IL',
    riskLevel: 'moderate',
    listeners: '789K',
    federalFunding: 22,
    description: 'Chicago Public Media serving the Midwest region.',
    funding: {
      total: '$28M',
      federal: '$6.16M',
      state: '$3.8M',
      local: '$7.2M',
      donations: '$10.84M'
    },
    impact: 'Federal cuts would reduce investigative capacity and local news coverage.',
    needs: [
      'Investigative unit: $180K',
      'Local coverage: $140K',
      'Equipment: $100K'
    ],
    programs: ['Morning Edition', 'Reset', 'This American Life'],
    emergencyFunding: '$420K',
    coordinates: { x: 65, y: 35 },
    politicalLean: 'liberal',
    stationType: 'npr_affiliate'
  }
];

export interface UserPreferences {
  priority: 'local-news' | 'rural-communities' | 'emergency-services' | 'cultural-programming';
  geography: 'local' | 'rural-national' | 'red-states' | 'no-preference';
  contribution: 'monthly' | 'one-time' | 'emergency' | 'volunteer';
  impact: 'save-station' | 'expand-coverage' | 'improve-quality' | 'investigative';
  budget?: 'under-50' | '50-100' | '100-250' | '250-500' | 'over-500';
}

export function calculateMatchScore(station: Station, preferences: UserPreferences): number {
  let score = 0;

  // Priority matching
  switch (preferences.priority) {
    case 'local-news':
      if (station.programs.some(p => p.toLowerCase().includes('news') || p.toLowerCase().includes('edition'))) score += 25;
      break;
    case 'rural-communities':
      if (station.description.toLowerCase().includes('rural')) score += 25;
      break;
    case 'emergency-services':
      if (station.programs.some(p => p.toLowerCase().includes('emergency') || p.toLowerCase().includes('hurricane'))) score += 25;
      break;
    case 'cultural-programming':
      if (station.programs.some(p => p.toLowerCase().includes('music') || p.toLowerCase().includes('cultural'))) score += 25;
      break;
  }

  // Geography matching
  switch (preferences.geography) {
    case 'local':
      if (['CA', 'WA', 'OR'].includes(station.state)) score += 20;
      break;
    case 'rural-national':
      if (station.description.toLowerCase().includes('rural')) score += 20;
      break;
    case 'red-states':
      if (['TX', 'AR', 'UT', 'ID', 'MT'].includes(station.state)) score += 20;
      break;
    case 'no-preference':
      score += 10;
      break;
  }

  // Risk level weighting
  switch (station.riskLevel) {
    case 'critical': score += 30; break;
    case 'high': score += 20; break;
    case 'moderate': score += 10; break;
    case 'low': score += 5; break;
  }

  // Federal dependency bonus
  if (station.federalFunding > 50) score += 15;

  // Impact type matching
  switch (preferences.impact) {
    case 'save-station':
      if (station.riskLevel === 'critical') score += 15;
      break;
    case 'investigative':
      if (station.needs.some(n => n.toLowerCase().includes('investigative'))) score += 15;
      break;
  }

  return Math.min(100, score);
}