export interface SpendGeneral {
  month: string;
  amount: number;
  category: string;
  year?: string;
}

export interface SpendSupplier {
  supplier: string;
  amount: number;
  category: string;
}

export interface SupplierRisk {
  supplier: string;
  riskLevel: 'Alto' | 'Medio' | 'Bajo';
  dependency: string;
  criticality: string;
}

export interface SpendData {
  month: string;
  amount: number;
  category: string;
  supplier: string;
  type: 'Servicio' | 'Material';
  isContracted: boolean;
}

export interface CategoryInsight {
  title: string;
  description: string;
  impact: 'Alto' | 'Medio' | 'Bajo';
  type: 'Oportunidad' | 'Riesgo' | 'Quick Win';
}

export interface ManualSupplier {
  id: string;
  name: string;
  amount: string;
  serviceType: string;
  subcategory: string;
  country: string;
  hqCountry: string;
  supplierType: 'Global' | 'Regional' | 'Local';
  supplyRisk: number; // 1-10
  profitImpact: number; // 1-10
}

export interface DeepDiveReport {
  executiveSummary: string;
  spendAnalysis: {
    totalSpend: number;
    trend: string;
    paretoInsights: string;
  };
  strategicAnalysis: {
    costDrivers: {
      name: string;
      concept: string;
      importance: string;
      impact: string;
    }[];
    marketDrivers?: {
      name: string;
      description: string;
      sourcingImpact: string;
    }[];
    marketDynamics: string;
    inefficiencies: string[];
    dependencies: string[];
    negotiationPower: string;
    hiddenRisks: string;
    alternativesAndTech: string;
  };
  marketTrends: {
    trends: string;
    bestSuppliers: string;
  };
  valueLevers: {
    category: 'Comercial' | 'Demanda' | 'Proceso';
    title: string;
    description: string;
    estimatedSavings: string;
    resourcesNeeded: string;
  }[];
  risks: string[];
  quickWins: string[];
  projectTimeline?: {
    phase: string;
    duration: string;
    activities: string[];
  }[];
  sourcingSteps: {
    profileCategory: string;
    marketAnalysis: string;
    sourcingStrategy: string;
    rfxProcess: string;
    negotiationSelection: string;
    implementationContracting: string;
    srm: string;
  };
}
