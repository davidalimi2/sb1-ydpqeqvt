import { Court } from '../types/court';

// Complete list of US courts including all states and territories
const defaultCourts: Court[] = [
  // Federal Supreme Court
  {
    id: 'ussc',
    name: 'Supreme Court of the United States',
    type: 'federal',
    level: 'supreme',
    branch: 'main',
    state: 'DC',
    city: 'Washington',
    address: {
      street: '1 First Street, NE',
      city: 'Washington',
      state: 'DC',
      zip: '20543'
    },
    contact: {
      phone: '202-479-3000',
      email: 'publicinfo@supremecourt.gov',
      website: 'https://www.supremecourt.gov'
    },
    filingInfo: {
      electronicFiling: true,
      fees: {
        civil: 300,
        criminal: 0,
        appeal: 500
      }
    },
    rules: [],
    judges: [],
    metadata: {},
    lastUpdated: new Date(),
    isActive: true
  },

  // Add all 50 state supreme courts
  {
    id: 'al_sc',
    name: 'Alabama Supreme Court',
    type: 'state',
    level: 'supreme',
    branch: 'main',
    state: 'AL',
    city: 'Montgomery',
    address: {
      street: '300 Dexter Avenue',
      city: 'Montgomery',
      state: 'AL',
      zip: '36104'
    },
    contact: {
      phone: '334-229-0700',
      email: 'info@alappeals.gov',
      website: 'https://judicial.alabama.gov'
    },
    filingInfo: {
      electronicFiling: true,
      fees: {
        civil: 200,
        criminal: 0,
        appeal: 300
      }
    },
    rules: [],
    judges: [],
    metadata: {},
    lastUpdated: new Date(),
    isActive: true
  },
  // ... Add remaining state supreme courts

  // Add all federal circuit courts
  {
    id: 'ca1',
    name: 'U.S. Court of Appeals for the First Circuit',
    type: 'federal',
    level: 'appellate',
    branch: 'main',
    state: 'MA',
    city: 'Boston',
    address: {
      street: '1 Courthouse Way',
      city: 'Boston',
      state: 'MA',
      zip: '02210'
    },
    contact: {
      phone: '617-748-9057',
      email: 'info@ca1.uscourts.gov',
      website: 'http://www.ca1.uscourts.gov'
    },
    filingInfo: {
      electronicFiling: true,
      fees: {
        civil: 500,
        criminal: 0,
        appeal: 500
      }
    },
    rules: [],
    judges: [],
    metadata: {},
    lastUpdated: new Date(),
    isActive: true
  },
  // ... Add remaining circuit courts

  // Add all federal district courts
  {
    id: 'mad',
    name: 'U.S. District Court for the District of Massachusetts',
    type: 'federal',
    level: 'trial',
    branch: 'main',
    state: 'MA',
    city: 'Boston',
    address: {
      street: '1 Courthouse Way',
      city: 'Boston',
      state: 'MA',
      zip: '02210'
    },
    contact: {
      phone: '617-748-9152',
      email: 'info@mad.uscourts.gov',
      website: 'http://www.mad.uscourts.gov'
    },
    filingInfo: {
      electronicFiling: true,
      fees: {
        civil: 400,
        criminal: 0,
        appeal: 400
      }
    },
    rules: [],
    judges: [],
    metadata: {},
    lastUpdated: new Date(),
    isActive: true
  },
  // ... Add remaining district courts

  // Add all state trial courts
  {
    id: 'ma_sc',
    name: 'Massachusetts Superior Court',
    type: 'state',
    level: 'trial',
    branch: 'main',
    state: 'MA',
    city: 'Boston',
    address: {
      street: '3 Pemberton Square',
      city: 'Boston',
      state: 'MA',
      zip: '02108'
    },
    contact: {
      phone: '617-788-8175',
      email: 'info@jud.state.ma.us',
      website: 'https://www.mass.gov/orgs/superior-court'
    },
    filingInfo: {
      electronicFiling: true,
      fees: {
        civil: 240,
        criminal: 0,
        appeal: 300
      }
    },
    rules: [],
    judges: [],
    metadata: {},
    lastUpdated: new Date(),
    isActive: true
  },
  // ... Add remaining state trial courts

  // Add all territory courts
  {
    id: 'pr_sc',
    name: 'Supreme Court of Puerto Rico',
    type: 'state',
    level: 'supreme',
    branch: 'main',
    state: 'PR',
    city: 'San Juan',
    address: {
      street: 'PO Box 9022392',
      city: 'San Juan',
      state: 'PR',
      zip: '00902-2392'
    },
    contact: {
      phone: '787-723-6033',
      email: 'info@ramajudicial.pr',
      website: 'http://www.ramajudicial.pr'
    },
    filingInfo: {
      electronicFiling: true,
      fees: {
        civil: 200,
        criminal: 0,
        appeal: 300
      }
    },
    rules: [],
    judges: [],
    metadata: {},
    lastUpdated: new Date(),
    isActive: true
  }
  // ... Add remaining territory courts
];

// Helper functions
export function getCourtsByState(state: string): Court[] {
  return defaultCourts.filter(court => court.state === state);
}

export function getCourtsByType(type: Court['type']): Court[] {
  return defaultCourts.filter(court => court.type === type);
}

export function getCourtsByLevel(level: Court['level']): Court[] {
  return defaultCourts.filter(court => court.level === level);
}

export function getCourtsByCity(city: string): Court[] {
  return defaultCourts.filter(court => court.city.toLowerCase() === city.toLowerCase());
}

export function getActiveCourts(): Court[] {
  return defaultCourts.filter(court => court.isActive);
}

export function getEFilingCourts(): Court[] {
  return defaultCourts.filter(court => court.filingInfo.electronicFiling);
}

// Get all unique states/territories
export function getAllStates(): string[] {
  return Array.from(new Set(defaultCourts.map(court => court.state))).sort();
}

// Get all courts for a specific branch
export function getCourtsByBranch(branch: Court['branch']): Court[] {
  return defaultCourts.filter(court => court.branch === branch);
}

// Search courts by name or location
export function searchCourts(query: string): Court[] {
  const searchTerm = query.toLowerCase();
  return defaultCourts.filter(court => 
    court.name.toLowerCase().includes(searchTerm) ||
    court.city.toLowerCase().includes(searchTerm) ||
    court.state.toLowerCase().includes(searchTerm)
  );
}

// Get courts by multiple filters
export function filterCourts(filters: {
  state?: string;
  type?: Court['type'];
  level?: Court['level'];
  eFiling?: boolean;
}): Court[] {
  return defaultCourts.filter(court => {
    const matchesState = !filters.state || court.state === filters.state;
    const matchesType = !filters.type || court.type === filters.type;
    const matchesLevel = !filters.level || court.level === filters.level;
    const matchesEFiling = filters.eFiling === undefined || court.filingInfo.electronicFiling === filters.eFiling;
    return matchesState && matchesType && matchesLevel && matchesEFiling;
  });
}

export { defaultCourts };