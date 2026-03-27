/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend, ScatterChart, Scatter, ZAxis, LabelList 
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  Play,
  Target, 
  Users, 
  FileText, 
  BarChart3, 
  Layers,
  Search,
  Download,
  Plus,
  ArrowRight,
  ArrowUp,
  ShieldAlert,
  CheckCircle2,
  Info,
  Upload,
  FileSpreadsheet,
  Presentation,
  Loader2,
  Globe,
  Cpu,
  Handshake,
  MessageSquare,
  X,
  ClipboardList,
  Star,
  HelpCircle,
  UserCheck,
  ChevronDown,
  DollarSign,
  Truck,
  Box,
  Clock,
  GraduationCap,
  ShieldCheck,
  Recycle,
  History,
  Settings,
  Flag,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import * as XLSX from 'xlsx';
import pptxgen from 'pptxgenjs';
import { Toaster, toast } from 'sonner';
import { cn } from './lib/utils';
import { SpendGeneral, SpendSupplier, SupplierRisk, DeepDiveReport, ManualSupplier } from './types';

// Generador de datos simulados en español
const generateMockSpendGeneral = (category: string): SpendGeneral[] => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return months.map(month => ({
    month,
    amount: Math.floor(Math.random() * 50000) + 20000,
    category
  }));
};

const generateMockSpendSupplier = (category: string): SpendSupplier[] => {
  const suppliers = ['Global Corp', 'Local Services Ltd', 'Tech Solutions', 'Niche Provider', 'Other'];
  return suppliers.map(supplier => ({
    supplier,
    amount: Math.floor(Math.random() * 100000) + 50000,
    category
  }));
};

const generateMockSupplierRisk = (): SupplierRisk[] => {
  const suppliers = ['Global Corp', 'Local Services Ltd', 'Tech Solutions', 'Niche Provider'];
  return suppliers.map(supplier => ({
    supplier,
    riskLevel: Math.random() > 0.7 ? 'Alto' : Math.random() > 0.4 ? 'Medio' : 'Bajo',
    dependency: Math.random() > 0.5 ? 'Alta' : 'Baja',
    criticality: Math.random() > 0.5 ? 'Crítico' : 'No Crítico'
  }));
};

const COLORS = ['#FFE600', '#000000', '#333333', '#8e8e8e', '#FF6321', '#00FF00', '#0000FF', '#FF00FF'];
const MELI_LOGO = "https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/logo__large_plus.png";

const TCOIceberg = () => {
  return (
    <div className="relative w-full bg-[#003366] rounded-3xl overflow-hidden p-8 font-sans text-white">
      {/* Water Line */}
      <div className="absolute top-[35%] left-0 w-full h-1 bg-white/20 z-10"></div>
      
      {/* 1. COSTOS VISIBLES */}
      <div className="relative z-20 mb-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold mb-1">1. COSTOS VISIBLES</h2>
            <p className="text-lg font-medium opacity-80 mb-4">(La Punta del Iceberg)</p>
            <p className="text-sm leading-relaxed opacity-70 max-w-md">
              Son los costos que aparecen en la factura inicial y son fáciles de presupuestar. Representan generalmente entre el 15% y el 25% del costo total.
            </p>
          </div>
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Precio de Compra", desc: "(El valor neto del producto o servicio)", icon: <DollarSign className="w-4 h-4" /> },
              { label: "Costos de Proveedores", desc: "(Cargos por gestión o selección)", icon: <Users className="w-4 h-4" /> },
              { label: "Desarrollo de Producto", desc: "(Costos de diseño o R&D)", icon: <Settings className="w-4 h-4" /> },
              { label: "Impuestos y Aranceles", desc: "(Gastos legales e IVA)", icon: <FileText className="w-4 h-4" /> },
              { label: "Fletes Iniciales", desc: "(Transporte hasta entrega final)", icon: <Truck className="w-4 h-4" /> },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="p-2 bg-meli-yellow rounded-lg text-meli-black shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold">{item.label}</p>
                  <p className="text-[8px] opacity-60 leading-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. COSTOS OCULTOS */}
      <div className="relative z-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-1">2. COSTOS OCULTOS</h2>
          <p className="text-lg font-medium opacity-80 mb-4">(Bajo la Superficie)</p>
          <p className="text-sm leading-relaxed opacity-70 max-w-2xl">
            Suelen ser ignorados en las licitaciones tradicionales pero representan el 75% a 85% del impacto financiero real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* A */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-meli-yellow mb-4">A. Costos de Operación y Posesión</h3>
            <ul className="space-y-3 text-[10px]">
              <li className="flex gap-2"><Zap className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Consumo Energético:</span> Combustible, electricidad o insumos.</span></li>
              <li className="flex gap-2"><Box className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Almacenamiento:</span> Espacio en bodega, seguros y seguridad.</span></li>
              <li className="flex gap-2"><Users className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Mano de Obra:</span> Salarios y beneficios del personal.</span></li>
              <li className="flex gap-2"><DollarSign className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Financiamiento:</span> Intereses o costo de oportunidad.</span></li>
            </ul>
          </div>
          {/* B */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-meli-yellow mb-4">B. Mantenimiento y Calidad</h3>
            <ul className="space-y-3 text-[10px]">
              <li className="flex gap-2"><Settings className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Mantenimiento:</span> Repuestos, lubricantes y servicio técnico.</span></li>
              <li className="flex gap-2"><Settings className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Reparaciones:</span> Costo de corregir errores de producción.</span></li>
              <li className="flex gap-2"><Clock className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Downtime:</span> Pérdida de ingresos por inactividad.</span></li>
            </ul>
          </div>
          {/* C */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-meli-yellow mb-4">C. Administración y Formación</h3>
            <ul className="space-y-3 text-[10px]">
              <li className="flex gap-2"><GraduationCap className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Capacitación:</span> Entrenamiento inicial y recurrente.</span></li>
              <li className="flex gap-2"><FileText className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Gestión:</span> Tiempo de compras, finanzas y legal.</span></li>
              <li className="flex gap-2"><ShieldCheck className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Cumplimiento:</span> Auditorías y regulaciones.</span></li>
            </ul>
          </div>
          {/* D */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-meli-yellow mb-4">D. Riesgos y Final de Vida</h3>
            <ul className="space-y-3 text-[10px]">
              <li className="flex gap-2"><AlertTriangle className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Suministro:</span> Fallas en la cadena de suministro.</span></li>
              <li className="flex gap-2"><Recycle className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Disposición:</span> Desmantelamiento y reciclaje.</span></li>
              <li className="flex gap-2"><History className="w-3 h-3 text-meli-yellow shrink-0" /> <span><span className="font-bold">Obsolescencia:</span> Reemplazo prematuro por falta de soporte.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const SOURCING_STEPS = [
  { id: 'profileCategory', label: 'Profile the Category', icon: FileText },
  { id: 'marketAnalysis', label: 'Market Analysis', icon: Search },
  { id: 'sourcingStrategy', label: 'Sourcing Strategy', icon: Target },
  { id: 'rfxProcess', label: 'RFx Process', icon: Zap },
  { id: 'negotiationSelection', label: 'Negotiation & Selection', icon: Users },
  { id: 'implementationContracting', label: 'Implementation & Contracting', icon: CheckCircle2 },
  { id: 'srm', label: 'SRM', icon: TrendingUp },
];

export interface SupplierKraljic extends SupplierRisk {
  supplyRisk: number;
  profitImpact: number;
  amount: number;
  quadrant: 'Estratégico' | 'Apalancamiento' | 'Cuello de Botella' | 'No Crítico';
}

export default function App() {
  const [showLanding, setShowLanding] = useState(false);
  const [currentStep, setCurrentStep] = useState<'input' | 'dashboard'>('input');
  const [categoryName, setCategoryName] = useState('Hardware de IT e Infraestructura');
  const [years, setYears] = useState<string[]>(['2025']);
  const [manualMonthlySpend, setManualMonthlySpend] = useState<Record<string, Record<string, string>>>({
    '2025': {
      'Ene': '0', 'Feb': '0', 'Mar': '0', 'Abr': '0', 'May': '0', 'Jun': '0',
      'Jul': '0', 'Ago': '0', 'Sep': '0', 'Oct': '0', 'Nov': '0', 'Dic': '0'
    }
  });
  
  const [manualSuppliers, setManualSuppliers] = useState<ManualSupplier[]>([
    { id: '1', name: '', amount: '0', serviceType: '', subcategory: '', country: '', hqCountry: '', supplierType: 'Local', supplyRisk: 5, profitImpact: 5 }
  ]);

  const [manualDrivers, setManualDrivers] = useState<string[]>(['']);
  const [maverickSpendInput, setMaverickSpendInput] = useState<string>('0');
  const [additionalContext, setAdditionalContext] = useState<string>('');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<DeepDiveReport | null>(null);
  const [marketReport, setMarketReport] = useState<DeepDiveReport | null>(null);
  const [spendGeneral, setSpendGeneral] = useState<SpendGeneral[]>([]);
  const [spendSupplier, setSpendSupplier] = useState<SpendSupplier[]>([]);
  const [supplierKraljic, setSupplierKraljic] = useState<SupplierKraljic[]>([]);
  const [viewMode, setViewMode] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [activeStepTab, setActiveStepTab] = useState<string>('profileCategory');
  const [srmSurvey, setSrmSurvey] = useState({
    gasto: 1,
    calidad: 1,
    rentabilidad: 1,
    disponibilidad: 1,
    costoCambio: 1,
    dependencia: 1
  });
  const [selectedPhase, setSelectedPhase] = useState<any | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [showCategoryPlanModal, setShowCategoryPlanModal] = useState(false);
  const [isUsingPlan, setIsUsingPlan] = useState(false);
  const [expandedDriverIndex, setExpandedDriverIndex] = useState<number | null>(null);
  const [driverCostBreakdown, setDriverCostBreakdown] = useState<Record<number, string>>({});
  const [isFetchingBreakdown, setIsFetchingBreakdown] = useState<number | null>(null);
  const [categoryPlan, setCategoryPlan] = useState({
    projectName: '',
    budget: '',
    deadline: '',
    area: '',
    objectives: '',
    currentPainPoints: '',
    expectedSavings: '',
    materials: [{ name: '', amount: '', supplyRisk: 5, profitImpact: 5 }],
    suppliers: [{ name: '', amount: '', supplyRisk: 5, profitImpact: 5, supplierType: 'Local' as 'Local' | 'Regional' | 'Global', cost: '' }]
  });

  const addMaterial = () => setCategoryPlan(prev => ({ ...prev, materials: [...prev.materials, { name: '', amount: '', supplyRisk: 5, profitImpact: 5 }] }));
  const updateMaterial = (index: number, field: string, value: any) => {
    const newMaterials = [...categoryPlan.materials];
    newMaterials[index] = { ...newMaterials[index], [field]: value };
    setCategoryPlan(prev => ({ ...prev, materials: newMaterials }));
  };
  const removeMaterial = (index: number) => {
    if (categoryPlan.materials.length > 1) {
      setCategoryPlan(prev => ({ ...prev, materials: prev.materials.filter((_, i) => i !== index) }));
    }
  };

  const addPlanSupplier = () => setCategoryPlan(prev => ({ ...prev, suppliers: [...prev.suppliers, { name: '', amount: '', supplyRisk: 5, profitImpact: 5, supplierType: 'Local' as 'Local' | 'Regional' | 'Global', cost: '' }] }));
  const updatePlanSupplier = (index: number, field: string, value: any) => {
    const newSuppliers = [...categoryPlan.suppliers];
    newSuppliers[index] = { ...newSuppliers[index], [field]: value };
    setCategoryPlan(prev => ({ ...prev, suppliers: newSuppliers }));
  };
  const removePlanSupplier = (index: number) => {
    if (categoryPlan.suppliers.length > 1) {
      setCategoryPlan(prev => ({ ...prev, suppliers: prev.suppliers.filter((_, i) => i !== index) }));
    }
  };

  const ai = useMemo(() => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing. Please set it in the environment variables.");
    }
    return new GoogleGenAI({ apiKey: apiKey || '' });
  }, []);

  const handleAnalyze = async (currentSpendGeneral: SpendGeneral[], currentManualSuppliers: ManualSupplier[], mode: 'full' | 'market' = 'full') => {
    if (!process.env.GEMINI_API_KEY) {
      toast.error("Error: La clave de API de Gemini no está configurada. Por favor, agrégala en los ajustes.");
      return;
    }
    setIsAnalyzing(true);
    try {
      const spendSummary = currentSpendGeneral.map(s => `${s.month}: $${s.amount}`).join(', ');
      const supplierSummary = currentManualSuppliers.map(s => `${s.name} (${s.subcategory}) en ${s.country || 'N/A'} (Matriz: ${s.hqCountry}, Tipo: ${s.supplierType}): $${s.amount} - Riesgo: ${s.supplyRisk}/10, Impacto: ${s.profitImpact}/10`).join('; ');
      const driversSummary = manualDrivers.filter(d => d.trim() !== '').join(', ');

      const planSummary = categoryPlan.projectName ? `
        PLAN DE SOURCING 2026:
        - Proyecto: ${categoryPlan.projectName}
        - Área: ${categoryPlan.area}
        - Deadline: ${categoryPlan.deadline}
        - Objetivos: ${categoryPlan.objectives}
        - Puntos de dolor: ${categoryPlan.currentPainPoints}
        - Ahorro esperado: ${categoryPlan.expectedSavings}
        - Materiales a comprar: ${categoryPlan.materials.map(m => m.name).join(', ')}
      ` : '';

      const prompt = `
        Actúa como un Senior Strategic Sourcing Manager. Analiza la siguiente categoría: "${categoryName}" para los años ${years.join(', ')}.
        
        ${planSummary}

        MÉTRICAS CLAVE:
        - Gasto Maverick (Fuera de contrato): ${maverickSpendInput}%
        - Subcategoría con mayor riesgo (2 o menos proveedores): ${subcategoryRisk}
        
        CONTEXTO ADICIONAL Y COMENTARIOS DEL COMPRADOR:
        ${additionalContext}

        PRINCIPALES DRIVERS DE LA CATEGORÍA:
        ${driversSummary}
        
        DATOS DE GASTO HISTÓRICO (AÑOS ANTERIORES):
        ${spendSummary}
        
        DETALLE DE PROVEEDORES Y SUBCATEGORÍAS:
        ${supplierSummary}

        INSTRUCCIONES DE ANÁLISIS:
        1. Realiza una lectura profunda de los números e informaciones de los años anteriores proporcionados por los compradores.
        2. Integra un análisis actual del mercado para esta categoría.
        3. Ten en cuenta específicamente los comentarios y el contexto adicional realizado en la página inicial.
        4. Para cada driver mencionado, busca en internet su concepto, importancia y el impacto para el negocio.
        5. En la sección "marketTrends", utiliza fuentes confiables para indicar tendencias de mercado actuales para esta categoría y los mejores proveedores globales basados en el tipo de material/servicio.
        6. En "strategicAnalysis", identifica insights sobre: Poder de negociación, Riesgos ocultos, y Nuevas alternativas/tecnologías.
        7. Analiza el "Tipo de Proveedor" (Local, Regional, Global) proporcionado en el plan de sourcing para evaluar la competitividad y riesgos geográficos.
        8. En la sección "valueLevers", identifica palancas de ahorro clasificadas en:
           - COMERCIAL: Consolidar volumen de varias plantas, negociar mejores precios por volumen.
           - DEMANDA: Reducir el consumo interno, estandarizar materiales, cambiar especificaciones.
           - PROCESO: Mejorar la logística, optimizar tiempos de pago, automatización.
           Para cada palanca, estima el ahorro esperado (%) y los recursos (tiempo/dinero) necesarios.
        9. En la sección "quickWins", aplica estas reglas:
           - No todas las categorías se negocian igual.
           - Define si ganarás por volumen (comercial), por reducir consumo (demanda) o por mejorar la logística (proceso).
           - Si el proveedor es único (monopolio), tu estrategia debe ser de ALIANZA; si hay muchos, debe ser de COMPETENCIA AGRESIVA.
           - Lanza tu estrategia cuando los precios de las materias primas estén bajos, no cuando tu inventario se agote.
        10. El análisis debe ser ejecutivo y estar en ESPAÑOL.
        11. En "executiveSummary", asegúrate de reflejar la lectura de los datos históricos, el análisis de mercado actual y los comentarios iniciales del comprador.
        12. IMPORTANTE: En las secciones "implementationContracting" y "srm", NO incluyas apartados de "Outcome" ni "Resumen Drivers".

        Proporciona un informe de análisis profundo en formato JSON siguiendo esta estructura:
        {
          "executiveSummary": "string",
          "spendAnalysis": {
            "totalSpend": number,
            "trend": "string",
            "paretoInsights": "string"
          },
          "strategicAnalysis": {
            "costDrivers": [
              {
                "name": "string",
                "concept": "string",
                "importance": "string",
                "impact": "string"
              }
            ],
            "marketDrivers": [
              {
                "name": "string",
                "description": "string",
                "sourcingImpact": "string"
              }
            ],
            "marketDynamics": "string",
            "inefficiencies": ["string"],
            "dependencies": ["string"],
            "negotiationPower": "string",
            "hiddenRisks": "string",
            "alternativesAndTech": "string"
          },
          "marketTrends": {
            "trends": "string",
            "bestSuppliers": "string"
          },
          "valueLevers": [
            {
              "category": "Comercial" | "Demanda" | "Proceso",
              "title": "string",
              "description": "string",
              "estimatedSavings": "string",
              "resourcesNeeded": "string"
            }
          ],
          "risks": ["string"],
          "quickWins": ["string"],
          "projectTimeline": [
            {
              "phase": "string",
              "duration": "string",
              "activities": ["string"]
            }
          ],
          "sourcingSteps": {
            "profileCategory": "string",
            "marketAnalysis": "string",
            "sourcingStrategy": "string",
            "rfxProcess": "string",
            "negotiationSelection": "string",
            "implementationContracting": "string",
            "srm": "string"
          }
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          tools: [{ googleSearch: {} }]
        }
      });

      const result = JSON.parse(response.text || '{}');
      if (mode === 'full') {
        setReport(result);
        setMarketReport(result);
        setActiveStepTab('profileCategory');
      } else {
        setMarketReport(result);
      }
    } catch (error: any) {
      console.error("Analysis failed:", error);
      const errorMessage = error?.message || "Error desconocido";
      toast.error(`Error al generar el análisis automático: ${errorMessage}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const fetchDriverCostBreakdown = async (driverName: string, index: number) => {
    if (driverCostBreakdown[index]) {
      setExpandedDriverIndex(expandedDriverIndex === index ? null : index);
      return;
    }

    setIsFetchingBreakdown(index);
    try {
      const prompt = `
        Actúa como un experto en Strategic Sourcing.
        Analiza el impacto del driver de mercado "${driverName}" en un "Cost Breakdown" (desglose de costos) para la categoría "${categoryName}".
        
        Busca información actualizada en internet sobre cómo este factor influye en los costos directos e indirectos.
        Proporciona una explicación concisa y estratégica (máximo 150 palabras) en ESPAÑOL.
        Enfócate en cómo un comprador debería reaccionar ante este impacto.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { 
          tools: [{ googleSearch: {} }]
        }
      });

      setDriverCostBreakdown(prev => ({ ...prev, [index]: response.text }));
      setExpandedDriverIndex(index);
    } catch (error: any) {
      console.error('Error fetching breakdown:', error);
      const errorMessage = error?.message || "Error desconocido";
      toast.error(`Error al obtener el desglose de costos: ${errorMessage}`);
    } finally {
      setIsFetchingBreakdown(null);
    }
  };

  const chartData = useMemo(() => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    const data = months.map(month => {
      const entry: any = { month };
      years.forEach(y => {
        const spend = spendGeneral.find(s => s.month === month && s.year === y);
        entry[y] = spend ? spend.amount : 0;
      });
      return entry;
    });

    if (viewMode === 'quarterly') {
      const quarters = [
        { name: 'Q1', months: ['Ene', 'Feb', 'Mar'] },
        { name: 'Q2', months: ['Abr', 'May', 'Jun'] },
        { name: 'Q3', months: ['Jul', 'Ago', 'Sep'] },
        { name: 'Q4', months: ['Oct', 'Nov', 'Dic'] }
      ];
      return quarters.map(q => {
        const entry: any = { month: q.name };
        years.forEach(y => {
          entry[y] = data
            .filter(d => q.months.includes(d.month))
            .reduce((sum, d) => sum + (d[y] || 0), 0);
        });
        return entry;
      });
    }

    if (viewMode === 'yearly') {
      return years.map(y => {
        const entry: any = { month: y };
        entry[y] = data.reduce((sum, d) => sum + (d[y] || 0), 0);
        return entry;
      });
    }

    return data;
  }, [spendGeneral, viewMode, years]);

  const supplierPareto = useMemo(() => {
    const sorted = [...spendSupplier]
      .map(item => ({ name: item.supplier, value: item.amount }))
      .sort((a, b) => b.value - a.value);

    const total = sorted.reduce((sum, item) => sum + item.value, 0);
    let cumulative = 0;
    
    return sorted.map(item => {
      cumulative += item.value;
      return {
        ...item,
        percentage: (item.value / total) * 100,
        cumulativePercentage: (cumulative / total) * 100
      };
    });
  }, [spendSupplier]);

  const countryDistribution = useMemo(() => {
    const dist = spendSupplier.reduce((acc: any, curr) => {
      const supplier = manualSuppliers.find(s => s.name === curr.supplier);
      const country = supplier?.country || 'N/A';
      const type = supplier?.supplierType || 'Local';
      
      if (!acc[country]) {
        acc[country] = { name: country, Local: 0, Global: 0, Regional: 0 };
      }
      acc[country][type] = (acc[country][type] || 0) + curr.amount;
      return acc;
    }, {});

    return Object.values(dist);
  }, [spendSupplier, manualSuppliers]);

  const categoryDistribution = useMemo(() => {
    const dist = spendSupplier.reduce((acc: any, curr) => {
      const cat = curr.category || 'Sin Subcategoría';
      acc[cat] = (acc[cat] || 0) + curr.amount;
      return acc;
    }, {});
    return Object.entries(dist).map(([name, value]) => ({ name, value }));
  }, [spendSupplier]);

  const exportToPPTX = () => {
    if (!report) return;
    
    const pres = new pptxgen();
    
    // Slide 1: Title
    let slide = pres.addSlide();
    slide.background = { color: "FFE600" };
    slide.addText("Category Deep Dive", { x: 1, y: 1, fontSize: 44, bold: true, color: "000000" });
    slide.addText(categoryName, { x: 1, y: 2, fontSize: 32, italic: true, color: "000000" });
    slide.addText("Reporte Estratégico de Sourcing", { x: 1, y: 4, fontSize: 18, color: "000000" });

    // Slide 2: Executive Summary
    slide = pres.addSlide();
    slide.addText("Resumen Ejecutivo", { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: "2D3277" });
    slide.addText(report?.executiveSummary || '', { x: 0.5, y: 1.2, w: 9, fontSize: 14, color: "333333" });

    // Slide 3: Spend Analysis
    slide = pres.addSlide();
    slide.addText("Análisis de Gasto", { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: "2D3277" });
    const totalSpendValue = Math.max(
      spendGeneral.reduce((s, i) => s + i.amount, 0),
      spendSupplier.reduce((s, i) => s + i.amount, 0)
    );
    const totalSpendText = totalSpendValue >= 1000000 
      ? `$${(totalSpendValue / 1000000).toFixed(2)}M` 
      : totalSpendValue >= 1000 
        ? `$${(totalSpendValue / 1000).toFixed(1)}k` 
        : `$${totalSpendValue.toLocaleString()}`;
    
    slide.addText(`Gasto Total: ${totalSpendText}`, { x: 0.5, y: 1.2, fontSize: 18, bold: true });
    slide.addText(report?.spendAnalysis?.paretoInsights || '', { x: 0.5, y: 2, w: 9, fontSize: 14 });

    // Slide 4: Strategic Analysis
    slide = pres.addSlide();
    slide.addText("Análisis Estratégico", { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: "2D3277" });
    slide.addText("Drivers de Costo:", { x: 0.5, y: 1.2, fontSize: 16, bold: true });
    report?.strategicAnalysis?.costDrivers?.forEach((d, i) => {
      if (i < 5) { // Limit to 5 to avoid overflow
        slide.addText(`• ${d.name}: ${d.impact}`, { x: 0.7, y: 1.6 + (i * 0.4), fontSize: 12 });
      }
    });

    // Slide 5: Value Levers
    slide = pres.addSlide();
    slide.addText("Palancas de Valor", { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: "2D3277" });
    report?.valueLevers?.forEach((l, i) => {
      if (i < 3) { // Limit to 3 to avoid overflow
        const yPos = 1.2 + (i * 2);
        slide.addText(`${l.category}: ${l.title}`, { x: 0.5, y: yPos, fontSize: 14, bold: true, color: "2D3277" });
        slide.addText(l.description, { x: 0.5, y: yPos + 0.3, w: 9, fontSize: 11 });
        slide.addText(`Ahorro Est.: ${l.estimatedSavings} | Recursos: ${l.resourcesNeeded}`, { x: 0.5, y: yPos + 0.8, fontSize: 10, italic: true });
      }
    });

    // Slide 6: Top Suppliers
    slide = pres.addSlide();
    slide.addText("TOP Suppliers", { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: "2D3277" });
    const tableData = [
      ["Proveedor", "País", "Subcategoría", "Spend", "%"],
      ...supplierPareto.slice(0, 8).map(s => [
        s.name,
        manualSuppliers.find(ms => ms.name === s.name)?.country || '-',
        spendSupplier.find(ss => ss.supplier === s.name)?.category || '-',
        `$${(s.value / 1000).toFixed(1)}k`,
        `${s.percentage.toFixed(1)}%`
      ])
    ];
    slide.addTable(tableData as any, { x: 0.5, y: 1.2, w: 9, fontSize: 10, border: { type: 'solid', color: 'E5E5E5' } });

    // Slides 7-13: Sourcing Steps
    SOURCING_STEPS.forEach((step) => {
      slide = pres.addSlide();
      slide.addText(step.label, { x: 0.5, y: 0.5, fontSize: 24, bold: true, color: "2D3277" });
      
      if (step.id === 'sourcingStrategy') {
        slide.addText("Matriz de Kraljic & Dinámica de Mercado", { x: 0.5, y: 1.0, fontSize: 14, italic: true });
        slide.addText(`Dinámica: ${report?.strategicAnalysis?.marketDynamics || ''}`, { x: 0.5, y: 1.4, w: 9, fontSize: 11 });
        slide.addText(`Estrategia: ${report?.sourcingSteps?.sourcingStrategy || ''}`, { x: 0.5, y: 3.5, w: 9, fontSize: 11 });
      } else if (step.id === 'srm') {
        const scoreA = srmSurvey.gasto + srmSurvey.calidad + srmSurvey.rentabilidad;
        const scoreB = srmSurvey.disponibilidad + srmSurvey.costoCambio + srmSurvey.dependencia;
        
        let classification = "";
        let action = "";
        if (scoreA > 9 && scoreB > 9) { classification = "ESTRATÉGICO"; action = "Alianza"; }
        else if (scoreA <= 9 && scoreB > 9) { classification = "CRÍTICO"; action = "Asegurar"; }
        else if (scoreA > 9 && scoreB <= 9) { classification = "APALANCADO"; action = "Optimizar"; }
        else { classification = "RUTINARIO"; action = "Eficiencia"; }

        slide.addText("Evaluación de Proveedor", { x: 0.5, y: 1.2, fontSize: 18, bold: true });
        slide.addText(`Impacto (A): ${scoreA} | Riesgo (B): ${scoreB}`, { x: 0.5, y: 1.7, fontSize: 14 });
        slide.addText(`Resultado: PROVEEDOR ${classification} - ${action}`, { x: 0.5, y: 2.2, fontSize: 16, bold: true, color: "FFE600" });
        
        const content = report?.sourcingSteps?.srm || '';
        slide.addText(content || "Sin contenido generado", { x: 0.5, y: 3.0, w: 9, fontSize: 11, color: "333333" });
      } else {
        const content = report?.sourcingSteps?.[step.id as keyof typeof report.sourcingSteps] || '';
        slide.addText(content || "Sin contenido generado", { x: 0.5, y: 1.2, w: 9, fontSize: 12, color: "333333" });
      }
    });

    pres.writeFile({ fileName: `Deep_Dive_${categoryName.replace(/\s/g, '_')}.pptx` });
  };

  const handleSendFeedback = () => {
    const email1 = "ext_anmigott@mercadolivre.com";
    const email2 = "flormaria.lopez@mercadolibre.com.mx";
    const subject = encodeURIComponent("Feedback - Strategic Sourcing Deep Dive App");
    const body = encodeURIComponent(
      "Hola,\n\nGracias por utilizar la aplicación Strategic Sourcing Deep Dive. Valoramos mucho tu opinión.\n\nPor favor, compártenos tus comentarios sobre los siguientes puntos:\n\n- Sugerencias de mejorías:\n- Comentarios adicionales:\n\n¡Esperamos que este sea el inicio de algo grande para ti!\n\nSaludos."
    );
    
    // Construct Gmail compose URL to force Gmail instead of system default (Outlook)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email1},${email2}&su=${subject}&body=${body}`;
    
    // Open in a new tab
    window.open(gmailUrl, '_blank');
    
    setShowFeedbackModal(false);
  };

  const handleStartDashboard = (keepTab = false) => {
    // Process Monthly Spend
    const formattedGeneral: SpendGeneral[] = Object.entries(manualMonthlySpend).flatMap(([yearKey, months]) => 
      Object.entries(months).map(([month, amount]) => ({
        month,
        amount: Number(amount) || 0,
        category: categoryName,
        year: yearKey
      }))
    );
    setSpendGeneral(formattedGeneral);

    // Process Supplier Spend & Kraljic
    const usingPlan = categoryPlan.suppliers.some(s => s.name.trim() !== '') || categoryPlan.materials.some(m => m.name.trim() !== '');
    setIsUsingPlan(usingPlan);
    
    const suppliersToUse = usingPlan
      ? categoryPlan.suppliers.filter(s => s.name.trim() !== '').map(s => ({
          name: s.name,
          amount: Number(s.amount) || 0,
          supplyRisk: s.supplyRisk,
          profitImpact: s.profitImpact,
          subcategory: categoryName
        }))
      : manualSuppliers.filter(s => s.name.trim() !== '').map(s => ({
          name: s.name,
          amount: Number(s.amount) || 0,
          supplyRisk: s.supplyRisk,
          profitImpact: s.profitImpact,
          subcategory: s.subcategory
        }));

    const formattedSupplier: SpendSupplier[] = suppliersToUse.map(s => ({
      supplier: s.name,
      amount: s.amount,
      category: s.subcategory || categoryName
    }));
    setSpendSupplier(formattedSupplier);

    let formattedKraljic: SupplierKraljic[] = [];
    
    if (usingPlan) {
      // If using plan, evaluation is ONLY by MATERIAL
      const materialKraljic: SupplierKraljic[] = categoryPlan.materials
        .filter(m => m.name.trim() !== '')
        .map(m => {
          let quadrant: SupplierKraljic['quadrant'] = 'No Crítico';
          if (m.supplyRisk > 5 && m.profitImpact > 5) quadrant = 'Estratégico';
          else if (m.supplyRisk <= 5 && m.profitImpact > 5) quadrant = 'Apalancamiento';
          else if (m.supplyRisk > 5 && m.profitImpact <= 5) quadrant = 'Cuello de Botella';

          return {
            supplier: m.name,
            riskLevel: m.supplyRisk > 7 ? 'Alto' : m.supplyRisk > 4 ? 'Medio' : 'Bajo',
            dependency: m.supplyRisk > 5 ? 'Alta' : 'Baja',
            criticality: m.profitImpact > 5 ? 'Crítico' : 'No Crítico',
            supplyRisk: m.supplyRisk,
            profitImpact: m.profitImpact,
            amount: Number(m.amount) || 0,
            quadrant
          };
        });

      formattedKraljic = materialKraljic;
    } else {
      // If manual, evaluation is by SUPPLIER
      formattedKraljic = manualSuppliers.filter(s => s.name.trim() !== '').map(s => {
        const risk = Number(s.supplyRisk) || 5;
        const impact = Number(s.profitImpact) || 5;
        let quadrant: SupplierKraljic['quadrant'] = 'No Crítico';
        if (risk > 5 && impact > 5) quadrant = 'Estratégico';
        else if (risk <= 5 && impact > 5) quadrant = 'Apalancamiento';
        else if (risk > 5 && impact <= 5) quadrant = 'Cuello de Botella';
        
        return {
          supplier: s.name,
          riskLevel: risk > 7 ? 'Alto' : risk > 4 ? 'Medio' : 'Bajo',
          dependency: risk > 5 ? 'Alta' : 'Baja',
          criticality: impact > 5 ? 'Crítico' : 'No Crítico',
          supplyRisk: risk,
          profitImpact: impact,
          amount: Number(s.amount) || 0,
          quadrant
        };
      });
    }
    setSupplierKraljic(formattedKraljic);

    setCurrentStep('dashboard');
    if (!keepTab) {
      setActiveStepTab('profileCategory');
    }
    handleAnalyze(formattedGeneral, manualSuppliers, keepTab ? 'market' : 'full');
  };

  const addSupplier = () => {
    setManualSuppliers([...manualSuppliers, { 
      id: Date.now().toString(), 
      name: '', 
      amount: '0', 
      serviceType: '', 
      subcategory: '',
      country: '',
      hqCountry: '',
      supplierType: 'Local',
      supplyRisk: 5,
      profitImpact: 5
    }]);
  };

  const updateSupplier = (id: string, field: keyof ManualSupplier, value: string | number) => {
    setManualSuppliers(manualSuppliers.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSupplier = (id: string) => {
    if (manualSuppliers.length > 1) {
      setManualSuppliers(manualSuppliers.filter(s => s.id !== id));
    }
  };

  const addDriver = () => setManualDrivers([...manualDrivers, '']);
  const updateDriver = (index: number, value: string) => {
    const newDrivers = [...manualDrivers];
    newDrivers[index] = value;
    setManualDrivers(newDrivers);
  };
  const removeDriver = (index: number) => {
    if (manualDrivers.length > 1) {
      setManualDrivers(manualDrivers.filter((_, i) => i !== index));
    }
  };

  const subcategoryRisk = useMemo(() => {
    const subcats: Record<string, number> = {};
    manualSuppliers.forEach(s => {
      if (s.subcategory) {
        subcats[s.subcategory] = (subcats[s.subcategory] || 0) + 1;
      }
    });
    
    const risky = Object.entries(subcats).filter(([_, count]) => count <= 2);
    return risky.length > 0 ? risky[0][0] : "Ninguna";
  }, [manualSuppliers]);

  if (showLanding) {
    return (
      <div className="min-h-screen bg-[#FFE600] flex flex-col p-8 md:p-12 overflow-hidden font-sans relative">
        <Toaster position="top-right" richColors />
        
        {/* Header elements */}
        <div className="flex justify-between items-start w-full z-10">
          <div className="bg-[#1A1A1A] text-white px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] shadow-lg">
            ENVÍOS
          </div>
          <img src={MELI_LOGO} alt="Mercado Libre" className="h-8 object-contain" referrerPolicy="no-referrer" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 max-w-7xl mx-auto w-full z-10">
          {/* Left Side: Speech Bubbles Visual */}
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              {/* Large Speech Bubble 1 (Back) */}
              <div className="w-64 h-64 bg-[#F5D400] rounded-[60px] shadow-[30px_30px_80px_rgba(0,0,0,0.15)] flex items-center justify-center relative">
                <div className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#E6C600]" />
                  <div className="w-5 h-5 rounded-full bg-[#E6C600]" />
                  <div className="w-5 h-5 rounded-full bg-[#E6C600]" />
                </div>
                {/* Tail */}
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#F5D400] rounded-bl-[40px] transform -rotate-12 shadow-[-10px_10px_20px_rgba(0,0,0,0.05)]" />
              </div>

              {/* Smaller Speech Bubble 2 (Front) */}
              <motion.div
                initial={{ x: 40, y: -40, opacity: 0 }}
                animate={{ x: 70, y: -70, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="absolute top-0 right-0 w-52 h-52 bg-[#FFE600] border-[6px] border-[#F5D400] rounded-[50px] shadow-[15px_15px_50px_rgba(0,0,0,0.1)] flex items-center justify-center"
              >
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#F5D400]" />
                  <div className="w-4 h-4 rounded-full bg-[#F5D400]" />
                  <div className="w-4 h-4 rounded-full bg-[#F5D400]" />
                </div>
                {/* Tail */}
                <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-[#FFE600] border-r-[6px] border-b-[6px] border-[#F5D400] rounded-br-[35px] transform rotate-12" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side: Text and Button */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 max-w-xl">
            <div className="space-y-4">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-5xl md:text-7xl font-black text-black leading-[1.05] tracking-tight"
              >
                Strategic Sourcing<br />Guidelines
              </motion.h1>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="inline-block bg-white px-12 py-4 rounded-[40px] shadow-2xl border-b-8 border-meli-gray-light/20"
              >
                <span className="text-5xl md:text-7xl font-black text-black tracking-tighter">2026</span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xl md:text-2xl font-bold text-black/90"
            >
              Procurement Regional Shipping
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.02, backgroundColor: "#333" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowLanding(false)}
              className="mt-4 bg-[#1A1A1A] text-white px-16 py-5 rounded-2xl font-bold text-xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] transition-all flex items-center gap-4 group"
            >
              ENTRAR <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    );
  }

  if (currentStep === 'input') {
    return (
      <div className="min-h-screen bg-meli-yellow flex items-center justify-center p-6 font-sans">
        <Toaster position="top-right" richColors />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-meli-black/5"
        >
          <div className="p-8 border-b border-meli-gray-light flex items-center justify-between bg-meli-gray-light/30">
            <div className="flex items-center gap-4">
              <img src={MELI_LOGO} alt="Mercado Libre" className="h-6" referrerPolicy="no-referrer" />
              <div className="h-4 w-px bg-meli-black/20" />
              <h1 className="font-bold text-sm uppercase tracking-widest italic">Configuración de Spend</h1>
            </div>
            <div className="flex items-center gap-2 text-meli-black/40">
              <BarChart3 className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">Sourcing Intelligence</span>
            </div>
          </div>

          <div className="p-10 space-y-10 max-h-[80vh] overflow-y-auto">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold tracking-tight italic font-serif">SPEND POR PROVEEDOR</h2>
              <p className="text-sm opacity-50">Completa la información de gasto y proveedores para el análisis.</p>
            </div>

            {/* Header & Category */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase opacity-40 tracking-widest">Categoría Principal</label>
                  <input 
                    type="text" 
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Ej. Packaging, Logística, IT..."
                    className="w-full bg-white border border-meli-black/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-meli-yellow outline-none transition-all font-medium shadow-sm"
                  />
                </div>
                <div className="flex items-center justify-end gap-4 pb-1">
                  <div className="flex items-center gap-3">
                    <label className="text-[10px] font-bold uppercase opacity-40">Gasto Maverick (%)</label>
                    <input 
                      type="number" 
                      value={maverickSpendInput}
                      onChange={(e) => setMaverickSpendInput(e.target.value)}
                      className="w-16 bg-white border border-meli-black/10 rounded-lg px-2 py-1.5 text-xs outline-none focus:ring-1 focus:ring-meli-yellow font-mono text-center shadow-sm"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const minYear = Math.min(...years.map(Number));
                      const nextYear = (minYear - 1).toString();
                      setYears([...years, nextYear]);
                      setManualMonthlySpend(prev => ({
                        ...prev,
                        [nextYear]: {
                          'Ene': '0', 'Feb': '0', 'Mar': '0', 'Abr': '0', 'May': '0', 'Jun': '0',
                          'Jul': '0', 'Ago': '0', 'Sep': '0', 'Oct': '0', 'Nov': '0', 'Dic': '0'
                        }
                      }));
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-meli-black text-white hover:bg-meli-gray-dark transition-all flex items-center gap-2 shadow-md active:scale-95"
                  >
                    <Plus className="w-4 h-4" /> Añadir Año Anterior
                  </button>
                </div>
              </div>

              <div className="space-y-1 border-b border-meli-black/10 pb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-meli-yellow" /> Evolución del Gasto por Año
                </h3>
                <p className="text-[10px] opacity-50 font-medium">Ingresa el gasto mensual para cada año de análisis.</p>
              </div>

              <div className="space-y-8">
                {[...years].sort((a, b) => Number(b) - Number(a)).map((y) => (
                  <div key={y} className="bg-white rounded-2xl border border-meli-black/5 p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow relative group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-meli-yellow text-meli-black px-3 py-1 rounded-lg text-xs font-black font-mono">
                          {y}
                        </span>
                        <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Gasto Mensual</span>
                      </div>
                      {years.length > 1 && (
                        <button
                          onClick={() => {
                            const newYears = years.filter(year => year !== y);
                            setYears(newYears);
                            setManualMonthlySpend(prev => {
                              const next = { ...prev };
                              delete next[y];
                              return next;
                            });
                          }}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors flex items-center gap-2 text-[10px] font-bold uppercase"
                        >
                          <X className="w-3 h-3" /> Eliminar Año
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-3">
                      {Object.keys(manualMonthlySpend[y] || {}).map((month) => (
                        <div key={month} className="space-y-1.5">
                          <label className="block text-[9px] font-bold uppercase opacity-40 text-center">{month}</label>
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] opacity-30 font-mono">$</span>
                            <input 
                              type="number" 
                              value={manualMonthlySpend[y]?.[month] || '0'}
                              onChange={(e) => setManualMonthlySpend(prev => ({ 
                                ...prev, 
                                [y]: { ...prev[y], [month]: e.target.value } 
                              }))}
                              className="w-full bg-meli-gray-light/30 border border-transparent rounded-lg pl-5 pr-1 py-2 text-xs focus:ring-2 focus:ring-meli-yellow focus:bg-white outline-none transition-all font-mono text-right"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Drivers */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
                  <Target className="w-3 h-3" /> Principales Drivers de la Categoría
                </h3>
                <button 
                  onClick={addDriver}
                  className="text-[10px] font-bold uppercase bg-meli-black text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-meli-gray-dark transition-all"
                >
                  <Plus className="w-3 h-3" /> Agregar Driver
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {manualDrivers.map((driver, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      type="text" 
                      value={driver}
                      onChange={(e) => updateDriver(index, e.target.value)}
                      className="flex-1 bg-meli-gray-light/30 border border-meli-black/10 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-meli-yellow"
                      placeholder="ej. Precio del Petróleo, Escasez de Chips"
                    />
                    <button 
                      onClick={() => removeDriver(index)}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Suppliers Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
                  <Users className="w-3 h-3" /> Detalle por Proveedor
                </h3>
                <button 
                  onClick={addSupplier}
                  className="text-[10px] font-bold uppercase bg-meli-black text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-meli-gray-dark transition-all"
                >
                  <Plus className="w-3 h-3" /> Agregar Proveedor
                </button>
              </div>
              
              <div className="space-y-3">
                {manualSuppliers.map((s, index) => (
                  <div key={s.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 bg-meli-gray-light/30 rounded-xl border border-meli-black/5 relative group">
                    <div className="md:col-span-3">
                      <label className="block text-[8px] font-bold uppercase opacity-40 mb-1">Nombre Proveedor</label>
                      <input 
                        type="text" 
                        value={s.name}
                        onChange={(e) => updateSupplier(s.id, 'name', e.target.value)}
                        className="w-full bg-white border border-meli-black/10 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-meli-yellow"
                        placeholder="ej. Global Corp"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[8px] font-bold uppercase opacity-40 mb-1">Tipo Proveedor</label>
                      <select 
                        value={s.supplierType}
                        onChange={(e) => updateSupplier(s.id, 'supplierType', e.target.value)}
                        className="w-full bg-white border border-meli-black/10 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-meli-yellow"
                      >
                        <option value="Global">Global</option>
                        <option value="Regional">Regional</option>
                        <option value="Local">Local</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[8px] font-bold uppercase opacity-40 mb-1">Spend Total</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] opacity-30">$</span>
                        <input 
                          type="number" 
                          value={s.amount}
                          onChange={(e) => updateSupplier(s.id, 'amount', e.target.value)}
                          className="w-full bg-white border border-meli-black/10 rounded-lg pl-5 pr-2 py-2 text-xs outline-none focus:ring-1 focus:ring-meli-yellow font-mono"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-1">
                      <label className="block text-[8px] font-bold uppercase opacity-40 mb-1">País Op.</label>
                      <input 
                        type="text" 
                        value={s.country}
                        onChange={(e) => updateSupplier(s.id, 'country', e.target.value)}
                        className="w-full bg-white border border-meli-black/10 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-meli-yellow"
                        placeholder="ej. AR, BR"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-[8px] font-bold uppercase opacity-40 mb-1">Subcategoría</label>
                      <input 
                        type="text" 
                        value={s.subcategory}
                        onChange={(e) => updateSupplier(s.id, 'subcategory', e.target.value)}
                        className="w-full bg-white border border-meli-black/10 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-meli-yellow"
                        placeholder="ej. SaaS"
                      />
                    </div>
                    <div className="md:col-span-1 flex items-end justify-center pb-1">
                      <button 
                        onClick={() => removeSupplier(s.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Context */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Contexto Adicional del Análisis
              </h3>
              <textarea 
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                className="w-full bg-meli-gray-light/30 border border-meli-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-meli-yellow h-24 resize-none"
                placeholder="Agrega cualquier información relevante sobre la categoría, proveedores o mercado que el AI deba considerar..."
              />
            </div>

            <button 
              onClick={() => handleStartDashboard()}
              className="w-full bg-meli-black text-white py-5 rounded-2xl font-bold text-base hover:bg-meli-gray-dark transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-[1.01] active:scale-[0.99] mt-8"
            >
              Generar Dashboard Estratégico <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-meli-gray-light text-meli-black font-sans selection:bg-meli-yellow selection:text-meli-black">
      <Toaster position="top-right" richColors />
      {/* Header */}
      <header className="border-b border-meli-black/10 bg-meli-yellow sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setCurrentStep('input')}
              className="hover:opacity-70 transition-opacity"
            >
              <img src={MELI_LOGO} alt="Mercado Libre" className="h-8" referrerPolicy="no-referrer" />
            </button>
            <div className="h-6 w-px bg-meli-black/20" />
            <h1 className="font-bold text-lg tracking-tight uppercase italic">Strategic Sourcing Deep Dive</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentStep('input')}
              className="bg-meli-white text-meli-black border border-meli-black/20 px-4 py-2 text-sm font-bold rounded hover:bg-meli-gray-light transition-colors flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Volver a Datos
            </button>
            
            {report && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={exportToPPTX}
                  className="bg-meli-blue text-white px-4 py-2 text-sm font-bold rounded hover:opacity-90 transition-colors flex items-center gap-2"
                >
                  <Presentation className="w-4 h-4" /> Exportar PPTX
                </button>
                <button 
                  onClick={() => setShowFeedbackModal(true)}
                  className="bg-meli-yellow text-meli-black px-4 py-2 text-sm font-bold rounded hover:opacity-90 transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Enviar Feedback
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel: Inputs & Controls */}
        <aside className="lg:col-span-4 space-y-6">
          <section className="bg-white p-6 rounded-xl border border-meli-black/10 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
              <Search className="w-3 h-3" /> Estado del Análisis
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-meli-gray-light rounded-lg border-l-4 border-meli-yellow">
                <p className="text-xs font-bold text-meli-black mb-1">Análisis Automático</p>
                <p className="text-[10px] opacity-60 leading-relaxed">
                  {isAnalyzing ? "La IA está investigando los drivers y analizando los datos..." : "Análisis completado con éxito."}
                </p>
              </div>
              
              {isAnalyzing && (
                <div className="flex items-center justify-center py-4">
                  <div className="w-8 h-8 border-4 border-meli-yellow border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </section>

          {activeStepTab === 'profileCategory' ? (
            <>
              <section className="bg-white p-6 rounded-xl border border-meli-black/10 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                  <Info className="w-3 h-3" /> Resumen ({years.join(', ')})
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-meli-gray-light rounded-lg">
                    <p className="text-[10px] font-bold opacity-40 uppercase">Gasto Total Acumulado</p>
                    <p className="text-xl font-bold font-mono">
                      ${(() => {
                        const total = Math.max(
                          spendGeneral.reduce((s, i) => s + i.amount, 0),
                          spendSupplier.reduce((s, i) => s + i.amount, 0)
                        );
                        if (total >= 1000000) return `${(total / 1000000).toFixed(2)}M`;
                        if (total >= 1000) return `${(total / 1000).toFixed(1)}k`;
                        return total.toLocaleString();
                      })()}
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-meli-black/10 rounded-lg relative group shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[10px] font-bold text-meli-black/40 uppercase">Riesgo Subcategoría</p>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        subcategoryRisk !== 'Ninguno' ? "bg-red-500 animate-pulse" : "bg-green-500"
                      )} />
                    </div>
                    <p className={cn(
                      "text-lg font-bold truncate",
                      subcategoryRisk !== 'Ninguno' ? "text-red-600" : "text-meli-black"
                    )}>{subcategoryRisk}</p>
                    <div className="absolute hidden group-hover:block top-full left-0 mt-2 p-3 bg-meli-black text-white text-[9px] rounded-lg z-50 w-48 shadow-xl">
                      <b>Riesgo 2:</b> Indica que esta subcategoría tiene 2 o menos proveedores activos, lo que representa una alta dependencia y riesgo de suministro.
                    </div>
                  </div>
                  <div className="p-4 bg-meli-gray-light rounded-lg">
                    <p className="text-[10px] font-bold opacity-40 uppercase">Proveedores Activos</p>
                    <p className="text-xl font-bold font-mono text-meli-black">{spendSupplier.length}</p>
                  </div>
                  <div className="p-4 bg-meli-gray-light rounded-lg relative group">
                    <p className="text-[10px] font-bold opacity-40 uppercase">Maverick Spend</p>
                    <p className="text-xl font-bold font-mono text-orange-600">{maverickSpendInput}%</p>
                    <div className="absolute hidden group-hover:block top-full left-0 mt-2 p-3 bg-meli-black text-white text-[9px] rounded-lg z-50 w-48 shadow-xl">
                      Porcentaje de gasto realizado fuera de los contratos y proveedores preferentes establecidos.
                    </div>
                  </div>
                  {spendSupplier.length > 0 && (
                    <div className="col-span-2 p-4 bg-meli-gray-light rounded-lg">
                      <p className="text-[10px] font-bold opacity-40 uppercase mb-2">Top 3 Proveedores</p>
                      <div className="space-y-2">
                        {[...spendSupplier]
                          .sort((a, b) => b.amount - a.amount)
                          .slice(0, 3)
                          .map((s, i) => (
                            <div key={i} className="flex justify-between items-center text-[11px]">
                              <span className="font-medium truncate max-w-[150px]">{s.supplier}</span>
                              <span className="font-mono font-bold">${(s.amount / 1000).toFixed(1)}k</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {report && (
                <section className="bg-meli-black text-white p-6 rounded-xl shadow-xl">
                  <h2 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 flex items-center gap-2">
                    <Target className="w-3 h-3" /> Quick Wins
                  </h2>
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {report.quickWins?.map((win, i) => (
                        <li key={i} className="flex gap-3 text-sm group">
                          <CheckCircle2 className="w-4 h-4 text-meli-yellow shrink-0 mt-0.5" />
                          <span className="opacity-80 group-hover:opacity-100 transition-opacity">{win}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
            </>
          ) : activeStepTab === 'marketAnalysis' ? (
            <>
              <section className="bg-white p-6 rounded-xl border border-meli-black/10 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                  <Star className="w-3 h-3" /> TIPS SENIOR
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-meli-yellow/10 rounded-lg border-l-4 border-meli-yellow">
                    <ul className="text-xs space-y-2 font-medium">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        El mercado define tu estrategia
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        Analiza el poder de negociación y los factores clave que mueven al mercado
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        Ten una base de should cost
                      </li>
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-meli-black/5">
                    <h3 className="text-[10px] font-bold uppercase opacity-40 mb-3 flex items-center gap-2">
                      <Zap className="w-3 h-3" /> Resumen de Drivers:
                    </h3>
                    <div className="space-y-2">
                      {manualDrivers.filter(d => d.trim() !== '').length > 0 ? (
                        manualDrivers.filter(d => d.trim() !== '').map((driver, i) => (
                          <div key={i} className="space-y-1">
                            <button 
                              onClick={() => fetchDriverCostBreakdown(driver, i)}
                              className={cn(
                                "w-full text-left p-2 rounded border transition-all flex items-center justify-between group",
                                expandedDriverIndex === i 
                                  ? "bg-meli-yellow/20 border-meli-yellow text-meli-black" 
                                  : "bg-meli-gray-light border-meli-black/5 hover:border-meli-yellow/50"
                              )}
                            >
                              <p className="text-[10px] font-medium leading-relaxed flex-1">{driver}</p>
                              {isFetchingBreakdown === i ? (
                                <Loader2 className="w-3 h-3 animate-spin opacity-40" />
                              ) : (
                                <ChevronDown className={cn("w-3 h-3 opacity-40 transition-transform", expandedDriverIndex === i && "rotate-180")} />
                              )}
                            </button>
                            <AnimatePresence>
                              {expandedDriverIndex === i && driverCostBreakdown[i] && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-3 bg-meli-black text-white rounded-lg text-[9px] leading-relaxed shadow-inner border border-white/5 mt-1">
                                    <p className="font-bold mb-1 text-meli-yellow uppercase tracking-widest">Impacto en Cost Breakdown:</p>
                                    <ReactMarkdown>{driverCostBreakdown[i]}</ReactMarkdown>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))
                      ) : (
                        <p className="text-[10px] opacity-40 italic">No se han definido drivers aún.</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : activeStepTab === 'sourcingStrategy' ? (
            <>
              <section className="bg-white p-6 rounded-xl border border-meli-black/10 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                  <Star className="w-3 h-3" /> TIPS SENIOR
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-meli-yellow/10 rounded-lg border-l-4 border-meli-yellow">
                    <ul className="text-xs space-y-2 font-medium">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        -Define si ganarás por volumen (comercial), por reducir consumo (demanda) o por mejorar la logística (proceso)
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        -Si el proveedor es único (monopolio), tu estrategia debe ser de alianza; si hay muchos, debe ser de competencia agresiva
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        -Lanza tu estrategia cuando los precios de las materias primas estén bajos, no cuando tu inventario se agote- consolidar volumen, cambiar las especificaciones, desarrollar un nuevo proveedor o incluso fabricar nosotros mismos.
                      </li>
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-meli-black/5">
                    <h3 className="text-[10px] font-bold uppercase opacity-40 mb-3">Outcome:</h3>
                    <div className="bg-meli-black text-white p-4 rounded-xl border border-white/10">
                      <div className="overflow-x-auto">
                        <table className="w-full text-[10px] border-collapse">
                          <thead>
                            <tr className="border-b border-white/20">
                              <th className="p-2 text-left font-bold opacity-60">ESTRATEGIA</th>
                              <th className="p-2 text-left font-bold opacity-60">CUANDO USAR</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-white/10">
                              <td className="p-2 font-bold text-meli-yellow">Comercial</td>
                              <td className="p-2 opacity-80">Consolidar volumen, cambiar Incoterm, mejorar plazos de pago.</td>
                            </tr>
                            <tr className="border-b border-white/10">
                              <td className="p-2 font-bold text-meli-yellow">Demanda</td>
                              <td className="p-2 opacity-80">Reducir desperdicios, control de inventarios, eliminar compras spot.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold text-meli-yellow">Especificación</td>
                              <td className="p-2 opacity-80">Sustitución de materiales, rediseño de producto, estandarización.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : activeStepTab === 'rfxProcess' ? (
            <>
              <section className="bg-white p-6 rounded-xl border border-meli-black/10 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                  <Star className="w-3 h-3" /> TIPS SENIOR
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-meli-yellow/10 rounded-lg border-l-4 border-meli-yellow">
                    <ul className="text-xs space-y-2 font-medium">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        Estandariza el formato de respuesta
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        No ignores el RFI
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        Sé transparente con las fechas
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        Separa la oferta técnica de la económica
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </>
          ) : activeStepTab === 'negotiationSelection' ? (
            <>
              <section className="bg-white p-6 rounded-xl border border-meli-black/10 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                  <Star className="w-3 h-3" /> TIPS SENIOR
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-meli-yellow/10 rounded-lg border-l-4 border-meli-yellow">
                    <ul className="text-xs space-y-2 font-medium">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        -Usa un "Should-Cost": Negocia conociendo el costo real de los materiales, no solo el precio de mercado.
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        -No cedas la presión: Mantén siempre a un segundo proveedor en competencia hasta el momento de la firma.
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        -Negocia el TCO: Si el precio no baja, busca ahorros en plazos de pago, fletes o inventarios.
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        -Valida técnicamente: Asegúrate de que el usuario final firme la aprobación técnica antes de adjudicar.
                      </li>
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-meli-black/5">
                    <h3 className="text-[10px] font-bold uppercase opacity-40 mb-3">Outcome: ¿QUE ES TCO?</h3>
                    <div className="bg-meli-black text-white p-4 rounded-xl border border-white/10">
                      <p className="text-[10px] leading-relaxed mb-2">
                        el TCO (Total Cost of Ownership) o Costo Total de Propiedad es un análisis financiero que busca determinar el costo real de un producto o servicio a lo largo de todo su ciclo de vida, no solo su precio de compra.
                      </p>
                      <p className="text-[10px] leading-relaxed italic opacity-70">
                        Es la diferencia entre decir "¿Cuánto me cuesta comprarlo?" y "¿Cuánto me va a costar tenerlo hasta que lo deseche?".
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : activeStepTab === 'implementationContracting' ? (
            <>
              <section className="bg-white p-6 rounded-xl border border-meli-black/10 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                  <Star className="w-3 h-3" /> TIPS SENIOR
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-meli-yellow/10 rounded-lg border-l-4 border-meli-yellow">
                    <ul className="text-xs space-y-3 font-medium">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-meli-black rounded-full mt-1.5 shrink-0" />
                        Audita la primera factura: Verifica que los precios cargados coincidan exactamente con lo negociado
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-meli-black rounded-full mt-1.5 shrink-0" />
                        Asegurar un divorcio rápido y barato con cláusulas de contratos amigables para rescindir la relación
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-meli-black rounded-full mt-1.5 shrink-0" />
                        Asegúrate de que el ahorro proyectado sea mayor al costo operativo de cambiar de proveedor Incluye el derecho a revisar y ajustar precios anualmente si las condiciones del mercado baja
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </>
          ) : activeStepTab === 'srm' ? (
            <>
              <section className="bg-white p-6 rounded-xl border border-meli-black/10 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                  <Star className="w-3 h-3" /> TIPS SENIOR
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-meli-yellow/10 rounded-lg border-l-4 border-meli-yellow">
                    <ul className="text-xs space-y-3 font-medium">
                      {[
                        "Sé el Cliente Preferido",
                        "Mira el \"TCO\", no solo el \"Price\"",
                        "Regla del 80/20 en el Seguimiento",
                        "Convierte las Reclamaciones en Proyectos de Mejora",
                        "Un buen contrato te protege de un mal proveedor, pero un buen SRM te da un aliado que el contrato no puede comprar"
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-meli-black rounded-full mt-1.5 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="bg-white p-6 rounded-xl border border-meli-black/10 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                  <Star className="w-3 h-3" /> TIPS SENIOR
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-meli-yellow/10 rounded-lg border-l-4 border-meli-yellow">
                    <ul className="text-xs space-y-2 font-medium">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        El mercado define tu estrategia
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        Analiza el poder de negociación y los factores clave que mueven al mercado
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-meli-black rounded-full mt-1.5" />
                        Ten una base de should cost
                      </li>
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-meli-black/5">
                    <h3 className="text-[10px] font-bold uppercase opacity-40 mb-3">Outcome:</h3>
                    <ul className="grid grid-cols-1 gap-2">
                      {[
                        "Market overview",
                        "Tendencias relevantes",
                        "Mapa de proveedores",
                        "Drivers de costos",
                        "Risk assessment",
                        "Insights estratégicos"
                      ].map((item, i) => (
                        <li key={i} className="text-[11px] flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-meli-black text-white p-6 rounded-xl shadow-xl">
                <h2 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> Resumen de Drivers
                </h2>
                <div className="space-y-3">
                  {manualDrivers.filter(d => d.trim() !== '').length > 0 ? (
                    manualDrivers.filter(d => d.trim() !== '').map((driver, i) => (
                      <div key={i} className="space-y-1">
                        <button 
                          onClick={() => fetchDriverCostBreakdown(driver, i + 100)} // Offset index to avoid conflict
                          className={cn(
                            "w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between group",
                            expandedDriverIndex === (i + 100)
                              ? "bg-meli-yellow text-meli-black border-meli-yellow" 
                              : "bg-white/10 border-white/5 hover:border-meli-yellow/50"
                          )}
                        >
                          <p className="text-[11px] font-medium leading-relaxed flex-1">{driver}</p>
                          {isFetchingBreakdown === (i + 100) ? (
                            <Loader2 className="w-3 h-3 animate-spin opacity-40" />
                          ) : (
                            <ChevronDown className={cn("w-3 h-3 opacity-40 transition-transform", expandedDriverIndex === (i + 100) && "rotate-180")} />
                          )}
                        </button>
                        <AnimatePresence>
                          {expandedDriverIndex === (i + 100) && driverCostBreakdown[i + 100] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-3 bg-white/5 rounded-lg text-[10px] leading-relaxed border border-white/10 mt-1">
                                <p className="font-bold mb-1 text-meli-yellow uppercase tracking-widest">Impacto en Cost Breakdown:</p>
                                <ReactMarkdown>{driverCostBreakdown[i + 100]}</ReactMarkdown>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))
                  ) : (
                    <p className="text-[11px] opacity-40 italic">No se han definido drivers aún.</p>
                  )}
                </div>
              </section>
            </>
          )}
        </aside>

        {/* Right Panel: Analysis & Visuals */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Sourcing Steps Tabs - Navigation at the top */}
          {(report || spendSupplier.length > 0) && (
            <section className="bg-white rounded-xl border border-meli-black/10 shadow-sm overflow-hidden">
              <div className="bg-meli-gray-light/50 border-b border-meli-black/10 overflow-x-auto">
                <div className="flex min-w-max">
                  {SOURCING_STEPS.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => setActiveStepTab(step.id)}
                      className={cn(
                        "px-6 py-4 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all border-b-2",
                        activeStepTab === step.id 
                          ? "bg-white border-meli-yellow text-meli-black" 
                          : "border-transparent text-meli-black/40 hover:text-meli-black hover:bg-white/50"
                      )}
                    >
                      <step.icon className="w-3 h-3" />
                      {step.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {activeStepTab === 'profileCategory' ? (
                <>
                  <div className="bg-meli-yellow/10 p-4 rounded-xl border-l-4 border-meli-yellow mb-4">
                    <p className="text-xs font-medium text-meli-black/80 leading-relaxed">
                      OBJETIVO: Generar los insights necesarios para entender a profundidad la categoría/proyecto a través de herramientas de análisis de spend y deep dive de la categoría, con el fin de establecer una base sólida para generar la estrategia.
                    </p>
                  </div>
                  {report && (
                    <section className="bg-white p-8 rounded-xl border border-meli-black/10 shadow-sm relative overflow-hidden">
                      <img src={MELI_LOGO} alt="ML" className="absolute top-4 right-4 h-6 opacity-20" referrerPolicy="no-referrer" />
                      <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-6 flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Resumen Ejecutivo
                      </h2>
                      <div className="prose prose-sm max-w-none">
                        <p className="text-lg font-medium leading-relaxed italic font-serif text-meli-black/80">
                          {report.executiveSummary}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* Spend Visualization */}
                  {spendSupplier.length > 0 && (
                    <section className="bg-white p-8 rounded-xl border border-meli-black/10 shadow-sm">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-bold tracking-tight italic font-serif">
                            {report ? "Profile the Category" : "Evolución del Gasto"}
                          </h2>
                          <p className="text-sm opacity-50">Análisis histórico y distribución del gasto</p>
                        </div>
                        <div className="flex gap-2 bg-meli-gray-light p-1 rounded-lg">
                          <button 
                            onClick={() => setViewMode('monthly')}
                            className={cn(
                              "px-4 py-1.5 rounded text-[10px] font-bold uppercase transition-all",
                              viewMode === 'monthly' ? "bg-white shadow-sm text-meli-black" : "text-meli-black/40 hover:text-meli-black"
                            )}
                          >
                            Mensual
                          </button>
                          <button 
                            onClick={() => setViewMode('quarterly')}
                            className={cn(
                              "px-4 py-1.5 rounded text-[10px] font-bold uppercase transition-all",
                              viewMode === 'quarterly' ? "bg-white shadow-sm text-meli-black" : "text-meli-black/40 hover:text-meli-black"
                            )}
                          >
                            Trimestral
                          </button>
                          <button 
                            onClick={() => setViewMode('yearly')}
                            className={cn(
                              "px-4 py-1.5 rounded text-[10px] font-bold uppercase transition-all",
                              viewMode === 'yearly' ? "bg-white shadow-sm text-meli-black" : "text-meli-black/40 hover:text-meli-black"
                            )}
                          >
                            Año
                          </button>
                        </div>
                      </div>
                      
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          {(years.length === 1 && viewMode !== 'yearly') ? (
                            <LineChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                              <XAxis 
                                dataKey="month" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fontWeight: 700 }}
                              />
                              <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fontWeight: 700 }}
                                tickFormatter={(val) => `$${val/1000}k`}
                              />
                              <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                              />
                              <Legend 
                                verticalAlign="top" 
                                align="right" 
                                iconType="circle"
                                wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', paddingBottom: '20px' }}
                              />
                              {[...years].sort((a, b) => Number(a) - Number(b)).map((y, index) => (
                                <Line 
                                  key={y}
                                  type="monotone"
                                  dataKey={y} 
                                  stroke={COLORS[index % COLORS.length]} 
                                  strokeWidth={3}
                                  dot={{ r: 4, fill: COLORS[index % COLORS.length], strokeWidth: 2, stroke: '#fff' }}
                                  activeDot={{ r: 6, strokeWidth: 0 }}
                                  name={`Gasto ${y}`}
                                />
                              ))}
                            </LineChart>
                          ) : (
                            <BarChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                              <XAxis 
                                dataKey="month" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fontWeight: 700 }}
                              />
                              <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fontWeight: 700 }}
                                tickFormatter={(val) => `$${val/1000}k`}
                              />
                              <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                              />
                              <Legend 
                                verticalAlign="top" 
                                align="right" 
                                iconType="circle"
                                wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', paddingBottom: '20px' }}
                              />
                              {[...years].sort((a, b) => Number(a) - Number(b)).map((y, index) => (
                                <Bar 
                                  key={y}
                                  dataKey={y} 
                                  fill={COLORS[index % COLORS.length]} 
                                  radius={[4, 4, 0, 0]}
                                  name={`Gasto ${y}`}
                                />
                              ))}
                            </BarChart>
                          )}
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-4 p-3 bg-meli-gray-light/50 rounded-lg border-l-4 border-meli-yellow">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 flex items-center gap-2">
                          <Info className="w-3 h-3" /> Nota: El análisis detallado a continuación se basa en los datos consolidados del año 2025.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-meli-gray-light">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">Distribución por Subcategoría</h3>
                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={categoryDistribution}
                                  innerRadius={60}
                                  outerRadius={80}
                                  paddingAngle={5}
                                  dataKey="value"
                                >
                                  {categoryDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Análisis de Pareto (Proveedores)</h3>
                          <div className="space-y-3">
                            {supplierPareto.slice(0, 5).map((s, i) => (
                              <div key={i} className="space-y-1">
                                <div className="flex justify-between text-[10px] font-bold uppercase">
                                  <span>{s.name}</span>
                                  <span>{s.cumulativePercentage.toFixed(1)}% Acum.</span>
                                </div>
                                <div className="h-2 bg-meli-gray-light rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-meli-yellow" 
                                    style={{ width: `${s.percentage}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 bg-meli-gray-light rounded-lg border-l-4 border-meli-yellow mt-4">
                            <p className="text-xs font-medium leading-relaxed">
                              {report?.spendAnalysis?.paretoInsights || "El top 3 de proveedores concentra la mayoría del gasto. Se recomienda diversificación para mitigar riesgos de dependencia."}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Spend by Country Chart */}
                      <div className="mt-12 pt-8 border-t border-meli-gray-light">
                        <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">Gasto por País</h3>
                        <div className="h-[250px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={countryDistribution}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} tickFormatter={(val) => `$${val/1000}k`} />
                              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }} />
                              <Bar dataKey="Local" stackId="a" fill="#FFE600" radius={[0, 0, 0, 0]} />
                              <Bar dataKey="Regional" stackId="a" fill="#333333" radius={[0, 0, 0, 0]} />
                              <Bar dataKey="Global" stackId="a" fill="#000000" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </section>
                  )}

                  {report && (
                    <>
                      {/* Strategic Analysis Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="bg-white p-6 rounded-xl border border-meli-black/10 shadow-sm">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                              <ShieldAlert className="w-3 h-3" /> Riesgos y Dependencias
                            </h2>
                            <ul className="space-y-2">
                              {report.risks?.map((risk, i) => (
                                <li key={i} className="text-sm flex items-center gap-2 text-red-600 font-medium">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  {risk}
                                </li>
                              ))}
                            </ul>
                          </section>
                          <section className="bg-white p-6 rounded-xl border border-meli-black/10 shadow-sm">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                              <Zap className="w-3 h-3" /> Ineficiencias Identificadas
                            </h2>
                            <ul className="space-y-2">
                              {report.strategicAnalysis?.inefficiencies?.map((item, i) => (
                                <li key={i} className="text-sm flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-meli-yellow rounded-full" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </section>
                        </div>

                        {/* Value Levers */}
                      <section className="bg-white p-8 rounded-xl border border-meli-black/10 shadow-sm">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-8 flex items-center gap-2">
                          <Zap className="w-3 h-3" /> Palancas de Valor Estratégicas
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {report.valueLevers?.map((lever, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="bg-white p-6 rounded-2xl border border-meli-black/5 shadow-sm hover:shadow-md transition-all group"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className={cn(
                                    "p-2 rounded-lg",
                                    lever.category === 'Comercial' ? "bg-blue-100 text-blue-600" :
                                    lever.category === 'Demanda' ? "bg-green-100 text-green-600" :
                                    "bg-purple-100 text-purple-600"
                                  )}>
                                    <Zap className="w-4 h-4" />
                                  </div>
                                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{lever.category}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold bg-meli-yellow/20 text-meli-black px-2 py-1 rounded-full">
                                    {lever.estimatedSavings}
                                  </span>
                                </div>
                              </div>
                              <h3 className="font-bold text-sm mb-2 group-hover:text-meli-blue transition-colors">{lever.title}</h3>
                              <p className="text-xs text-meli-black/60 leading-relaxed mb-4">{lever.description}</p>
                              <div className="pt-4 border-t border-meli-black/5 flex items-center justify-between">
                                <span className="text-[9px] font-bold uppercase opacity-30">Recursos:</span>
                                <span className="text-[10px] font-medium">{lever.resourcesNeeded}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </section>

                      {/* Top Suppliers List */}
                      <section className="bg-white p-6 rounded-xl border border-meli-black/10 shadow-sm">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-6 flex items-center gap-2">
                          <Users className="w-3 h-3" /> TOP Suppliers (por Gasto)
                        </h2>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="border-b border-meli-black/5">
                                <th className="pb-3 text-[10px] font-bold uppercase opacity-40">Proveedor</th>
                                <th className="pb-3 text-[10px] font-bold uppercase opacity-40">País</th>
                                <th className="pb-3 text-[10px] font-bold uppercase opacity-40">Subcategoría</th>
                                <th className="pb-3 text-[10px] font-bold uppercase opacity-40 text-right">Spend</th>
                                <th className="pb-3 text-[10px] font-bold uppercase opacity-40 text-right">%</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-meli-black/5">
                              {supplierPareto.map((s, i) => (
                                <tr key={i} className="group hover:bg-meli-gray-light/30 transition-colors">
                                  <td className="py-3 text-xs font-bold">{s.name}</td>
                                  <td className="py-3 text-xs opacity-60">
                                    {manualSuppliers.find(ms => ms.name === s.name)?.country || '-'}
                                  </td>
                                  <td className="py-3 text-xs opacity-60">
                                    {spendSupplier.find(ss => ss.supplier === s.name)?.category || '-'}
                                  </td>
                                  <td className="py-3 text-xs font-mono font-bold text-right">
                                    ${(s.value / 1000).toFixed(1)}k
                                  </td>
                                  <td className="py-3 text-xs font-mono text-right opacity-40">
                                    {s.percentage.toFixed(1)}%
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </section>
                    </>
                  )}
                </>
              ) : activeStepTab === 'marketAnalysis' ? (
                /* Market Analysis Tab Content */
                marketReport && (
                  <div className="space-y-8">
                    <section className="bg-white p-10 rounded-xl border border-meli-black/10 shadow-sm relative overflow-hidden">
                      <img src={MELI_LOGO} alt="ML" className="absolute top-4 right-4 h-6 opacity-20" referrerPolicy="no-referrer" />
                      
                      <div className="bg-meli-yellow/10 p-4 rounded-xl border-l-4 border-meli-yellow mb-8">
                        <p className="text-xs font-medium text-meli-black/80 leading-relaxed">
                          OBJETIVO: Entender a profundidad el mercado para identificar oportunidades, riesgos y dinámicas que definan la mejor estrategia de sourcing. Integrar una mirada de mercado a la foto interna que tenemos de la categoría evaluando la competitividad externa, riesgos de suministro y nuestro poder de negociación
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-meli-yellow rounded-xl shadow-sm">
                          <Search className="w-6 h-6 text-meli-black" />
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                          <div>
                            <h2 className="text-3xl font-bold italic font-serif tracking-tight">Market Analysis</h2>
                            <p className="text-xs font-bold uppercase tracking-widest opacity-40">Tendencias y Riesgos de Mercado</p>
                          </div>
                          <button 
                            onClick={() => setShowCategoryPlanModal(true)}
                            className={cn(
                              "px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg",
                              showCategoryPlanModal 
                                ? "bg-meli-yellow text-meli-black" 
                                : "bg-meli-black text-white hover:bg-meli-gray-dark"
                            )}
                          >
                            <ClipboardList className="w-4 h-4" /> 
                            {showCategoryPlanModal ? "Cerrar Sourcing" : "Sourcing 2026"}
                          </button>
                        </div>
                      </div>

                      {/* Market Drivers AI Section */}
                      <div className="mb-10">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-6 flex items-center gap-2">
                          <Zap className="w-3 h-3" /> Insights de tus preguntas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {marketReport.strategicAnalysis?.marketDrivers?.map((driver: any, i: number) => (
                            <div key={i} className="space-y-2">
                              <button 
                                onClick={() => fetchDriverCostBreakdown(driver.name, i + 200)}
                                className={cn(
                                  "w-full text-left p-6 rounded-2xl border transition-all group",
                                  expandedDriverIndex === (i + 200)
                                    ? "bg-meli-yellow/10 border-meli-yellow"
                                    : "bg-meli-gray-light/30 border-meli-black/5 hover:border-meli-yellow/50"
                                )}
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-meli-yellow rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                                      <TrendingUp className="w-4 h-4 text-meli-black" />
                                    </div>
                                    <h4 className="font-bold text-sm">{driver.name}</h4>
                                  </div>
                                  {isFetchingBreakdown === (i + 200) ? (
                                    <Loader2 className="w-4 h-4 animate-spin opacity-40" />
                                  ) : (
                                    <ChevronDown className={cn("w-4 h-4 opacity-40 transition-transform", expandedDriverIndex === (i + 200) && "rotate-180")} />
                                  )}
                                </div>
                                <p className="text-xs leading-relaxed opacity-70 mb-4">{driver.description}</p>
                                <div className="pt-4 border-t border-meli-black/5">
                                  <p className="text-[10px] font-bold uppercase opacity-40 mb-2">Impacto en Sourcing:</p>
                                  <p className="text-[11px] font-medium text-meli-black/80 italic">"{driver.sourcingImpact}"</p>
                                </div>
                              </button>
                              <AnimatePresence>
                                {expandedDriverIndex === (i + 200) && driverCostBreakdown[i + 200] && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="p-5 bg-meli-black text-white rounded-2xl text-xs leading-relaxed shadow-xl border border-white/5 mt-2">
                                      <div className="flex items-center gap-2 mb-3 text-meli-yellow">
                                        <Globe className="w-4 h-4" />
                                        <p className="font-bold uppercase tracking-widest text-[10px]">Impacto en Cost Breakdown (IA Insight):</p>
                                      </div>
                                      <div className="prose prose-invert prose-sm max-w-none">
                                        <ReactMarkdown>{driverCostBreakdown[i + 200]}</ReactMarkdown>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Market Drivers AI Section */}

                      <div className="grid grid-cols-1 gap-8">
                        {/* Risks & Dependencies */}
                        <div className="space-y-6">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 flex items-center gap-2">
                            <ShieldAlert className="w-3 h-3" /> Riesgos y Dependencias
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                              <h4 className="text-[10px] font-bold uppercase text-red-600 mb-2">Dependencias Críticas</h4>
                              <ul className="space-y-2">
                                {marketReport.strategicAnalysis?.dependencies?.map((dep, i) => (
                                  <li key={i} className="text-xs flex items-start gap-2">
                                    <div className="w-1 h-1 bg-red-400 rounded-full mt-1.5" />
                                    {dep}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                              <h4 className="text-[10px] font-bold uppercase text-orange-600 mb-2">Riesgos Ocultos (IA Insight)</h4>
                              <p className="text-xs leading-relaxed opacity-80">{marketReport.strategicAnalysis?.hiddenRisks}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 pt-10 border-t border-meli-black/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Market Trends */}
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 flex items-center gap-2">
                            <Globe className="w-3 h-3" /> Tendencias Globales
                          </h3>
                          <div className="prose prose-sm max-w-none text-meli-black/80 leading-relaxed">
                            <ReactMarkdown>{marketReport.marketTrends?.trends}</ReactMarkdown>
                          </div>
                        </div>
                        {/* Best Suppliers */}
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 flex items-center gap-2">
                            <Users className="w-3 h-3" /> Mejores Proveedores del Mundo
                          </h3>
                          <div className="prose prose-sm max-w-none text-meli-black/80 leading-relaxed">
                            <ReactMarkdown>{marketReport.marketTrends?.bestSuppliers}</ReactMarkdown>
                          </div>
                        </div>
                      </div>

                      <div className="mt-10 pt-10 border-t border-meli-black/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Negotiation Power */}
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 flex items-center gap-2">
                            <Zap className="w-3 h-3" /> Poder de Negociación
                          </h3>
                          <p className="text-xs leading-relaxed opacity-80">{marketReport.strategicAnalysis?.negotiationPower}</p>
                        </div>
                        {/* Alternatives & Tech */}
                        <div className="space-y-4">
                          <h3 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 flex items-center gap-2">
                            <Cpu className="w-3 h-3" /> Nuevas Tecnologías y Alternativas
                          </h3>
                          <p className="text-xs leading-relaxed opacity-80">{marketReport.strategicAnalysis?.alternativesAndTech}</p>
                        </div>
                      </div>

                      {/* Fixed Strategy Section - Moved to bottom */}
                      <div className="mt-10 pt-10 border-t border-meli-black/5">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-1.5 h-8 bg-meli-yellow rounded-full" />
                          <h2 className="text-2xl font-bold uppercase tracking-tight text-meli-black">ESTRATEGIA DE ABASTECIMIENTO</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="p-8 bg-white rounded-2xl border border-meli-black/10 shadow-sm flex flex-col items-center text-center group hover:border-meli-yellow transition-all">
                            <div className="w-16 h-16 bg-meli-gray-light rounded-full flex items-center justify-center mb-6 group-hover:bg-meli-yellow/20 transition-colors">
                              <UserCheck className="w-8 h-8 text-[#1a3a8a]" />
                            </div>
                            <h4 className="text-lg font-bold text-[#1a3a8a] mb-3">Single Sourcing</h4>
                            <p className="text-xs opacity-60 leading-relaxed">Maximiza el volumen para obtener el mejor precio y fidelidad extrema.</p>
                          </div>

                          <div className="p-8 bg-white rounded-2xl border-2 border-meli-yellow shadow-md flex flex-col items-center text-center relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-meli-yellow text-meli-black text-[8px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Recomendado</div>
                            <div className="w-16 h-16 bg-meli-yellow/10 rounded-full flex items-center justify-center mb-6">
                              <Users className="w-8 h-8 text-[#1a3a8a]" />
                            </div>
                            <h4 className="text-lg font-bold text-[#1a3a8a] mb-3">Dual / Multi Sourcing</h4>
                            <p className="text-xs opacity-60 leading-relaxed">Reduce riesgos de dependencia y fomenta la competencia continua.</p>
                          </div>

                          <div className="p-8 bg-white rounded-2xl border border-meli-black/10 shadow-sm flex flex-col items-center text-center group hover:border-meli-yellow transition-all">
                            <div className="w-16 h-16 bg-meli-gray-light rounded-full flex items-center justify-center mb-6 group-hover:bg-meli-yellow/20 transition-colors">
                              <Handshake className="w-8 h-8 text-[#1a3a8a]" />
                            </div>
                            <h4 className="text-lg font-bold text-[#1a3a8a] mb-3">Acuerdos Marco</h4>
                            <p className="text-xs opacity-60 leading-relaxed">Contratos a largo plazo que simplifican la compra recurrente operativa.</p>
                          </div>
                        </div>
                        
                        <div className="mt-8 text-center">
                          <p className="text-xs font-bold text-meli-black/60 italic">
                            <span className="text-meli-black">Decisión Crítica:</span> La selección del modelo depende de la criticidad del insumo y la madurez del mercado.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                )
              ) : activeStepTab === 'sourcingStrategy' ? (
                /* Sourcing Strategy Tab Content */
                report && (
                  <section className="bg-white p-10 rounded-xl border border-meli-black/10 shadow-sm relative overflow-hidden">
                    <img src={MELI_LOGO} alt="ML" className="absolute top-4 right-4 h-6 opacity-20" referrerPolicy="no-referrer" />
                    
                    <div className="bg-meli-blue/5 p-4 rounded-xl border-l-4 border-meli-blue mb-8">
                      <p className="text-xs font-medium text-meli-black/80 leading-relaxed">
                        OBJETIVO: Definir la mejor Estrategia de Suministro alineado con los objetivos del negocio para obtener la máxima ventaja competitiva usando los insights internos y externos, entendiendo la criticidad y complejidad del mercado.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-meli-yellow rounded-xl shadow-sm">
                        <Target className="w-6 h-6 text-meli-black" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold italic font-serif tracking-tight">Sourcing Strategy</h2>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Estrategia recomendada basada en Kraljic</p>
                      </div>
                    </div>

                    <div className="space-y-10">
                      {/* Market Dynamics - Moved here */}
                      <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                          <Search className="w-3 h-3" /> Dinámica del Mercado
                        </h2>
                        <div className="bg-meli-gray-light/30 p-6 rounded-2xl border border-meli-black/5">
                          <p className="text-sm leading-relaxed opacity-80">{report.strategicAnalysis?.marketDynamics}</p>
                        </div>
                      </section>

                      {/* Kraljic Matrix - Moved here */}
                      <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                          <Layers className="w-3 h-3" /> Matriz de Kraljic
                        </h2>
                        <div className="h-[400px] bg-white p-4 rounded-xl border border-meli-black/5 shadow-inner relative">
                          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 p-4 opacity-20 pointer-events-none">
                            <div className="border-r border-b border-meli-black flex items-center justify-center"><span className="text-xs font-bold uppercase">Cuello de Botella</span></div>
                            <div className="border-b border-meli-black flex items-center justify-center"><span className="text-xs font-bold uppercase">Estratégico</span></div>
                            <div className="border-r border-meli-black flex items-center justify-center"><span className="text-xs font-bold uppercase">No Crítico</span></div>
                            <div className="flex items-center justify-center"><span className="text-xs font-bold uppercase">Apalancamiento</span></div>
                          </div>
                          <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                              <XAxis type="number" dataKey="supplyRisk" name="Riesgo" domain={[0, 10]} hide />
                              <YAxis type="number" dataKey="profitImpact" name="Impacto" domain={[0, 10]} hide />
                              <ZAxis type="number" dataKey="amount" range={[50, 400]} />
                              <Tooltip 
                                cursor={{ strokeDasharray: '3 3' }}
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    const data = payload[0].payload as SupplierKraljic;
                                    return (
                                      <div className="bg-meli-black text-white p-3 rounded-lg text-[10px] shadow-xl border border-white/10">
                                        <p className="font-bold mb-1 uppercase">{isUsingPlan ? 'Material / Servicio' : 'Proveedor'}: <span className="text-meli-yellow">{data.supplier}</span></p>
                                        <p className="opacity-70">Cuadrante: <span className="text-meli-yellow">{data.quadrant}</span></p>
                                        <p className="opacity-70">Costo/Presupuesto: <span className="text-meli-yellow">${(data.amount / 1000).toFixed(1)}k</span></p>
                                        <p className="opacity-70">Riesgo: {data.supplyRisk}/10</p>
                                        <p className="opacity-70">Impacto: {data.profitImpact}/10</p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Scatter name="Evaluación" data={supplierKraljic} fill="#FFE600">
                                {supplierKraljic.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={
                                    entry.quadrant === 'Estratégico' ? '#FF4444' : 
                                    entry.quadrant === 'Apalancamiento' ? '#FFE600' : 
                                    entry.quadrant === 'Cuello de Botella' ? '#FF8800' : 
                                    '#888888'
                                  } />
                                ))}
                                <LabelList dataKey="supplier" position="top" style={{ fontSize: '10px', fontWeight: 'bold', fill: '#000', opacity: 0.8 }} />
                              </Scatter>
                            </ScatterChart>
                          </ResponsiveContainer>
                          
                          {/* Axis Labels */}
                          <div className="absolute -left-10 top-1/2 -rotate-90 text-[8px] font-bold uppercase opacity-60">Impacto en el Negocio</div>
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase opacity-60">Riesgo de Suministro</div>
                        </div>

                        {/* Kraljic Explanation Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          {/* Bottleneck */}
                          <div className="p-5 bg-meli-gray-light/50 rounded-xl border border-meli-black/5">
                            <h4 className="text-xs font-bold uppercase text-meli-black mb-3 flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#FF8800] rounded-full" /> Productos Cuello de Botella (Bottleneck)
                            </h4>
                            <ul className="space-y-2 text-[11px] leading-relaxed">
                              <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span>Bajo impacto, alto riesgo.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span><strong>Qué son:</strong> Una pieza de repuesto única que solo fabrica una empresa en Alemania, o un software muy específico. No cuestan una fortuna, pero si te faltan, se para la producción.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span><strong>La estrategia:</strong> Asegurar el suministro. Aquí el precio es secundario. Quieres contratos a largo plazo, tener stock de seguridad y buscar alternativas para dejar de depender de ese proveedor.</span>
                              </li>
                            </ul>
                          </div>
                          {/* Strategic */}
                          <div className="p-5 bg-meli-gray-light/50 rounded-xl border border-meli-black/5">
                            <h4 className="text-xs font-bold uppercase text-meli-black mb-3 flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#FF4444] rounded-full" /> Productos Estratégicos
                            </h4>
                            <ul className="space-y-2 text-[11px] leading-relaxed">
                              <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span>Alto impacto, alto riesgo.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span><strong>Qué son:</strong> El componente estrella de tu producto (ej. los chips para Apple o las baterías para Tesla). Son caros y difíciles de conseguir.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span><strong>La estrategia:</strong> Alianzas a largo plazo. No trates al proveedor como un rival, sino como un socio. Necesitas trabajar de la mano con ellos porque se necesitan mutuamente.</span>
                              </li>
                            </ul>
                          </div>
                          {/* Routine */}
                          <div className="p-5 bg-meli-gray-light/50 rounded-xl border border-meli-black/5">
                            <h4 className="text-xs font-bold uppercase text-meli-black mb-3 flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#888888] rounded-full" /> Productos Rutinarios (No críticos)
                            </h4>
                            <ul className="space-y-2 text-[11px] leading-relaxed">
                              <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span>Bajo impacto, bajo riesgo.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span><strong>Qué son:</strong> Artículos de oficina, papelería, productos de limpieza.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span><strong>La estrategia:</strong> Simplificar. No pierdas tiempo negociando cada lápiz. Usa catálogos electrónicos, compras automatizadas y reduce el tiempo administrativo.</span>
                              </li>
                            </ul>
                          </div>
                          {/* Leverage */}
                          <div className="p-5 bg-meli-gray-light/50 rounded-xl border border-meli-black/5">
                            <h4 className="text-xs font-bold uppercase text-meli-black mb-3 flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#FFE600] rounded-full" /> Productos Apalancados (Leverage)
                            </h4>
                            <ul className="space-y-2 text-[11px] leading-relaxed">
                              <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span>Alto impacto, bajo riesgo.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span><strong>Qué son:</strong> Materias primas comunes, servicios de transporte, electricidad. Hay muchos proveedores y el gasto es alto.</span>
                              </li>
                              <li className="flex gap-2">
                                <span className="font-bold">•</span>
                                <span><strong>La estrategia:</strong> Negociar duro. Como hay mucha competencia y tú compras mucho, tú tienes el poder. Busca el mejor precio y haz subastas.</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </section>

                      {/* Suggested Negotiation Strategy - Single Recommendation */}
                      <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-6 flex items-center gap-2">
                          <Handshake className="w-3 h-3" /> Sugerencia de Negociación Recomendada
                        </h2>
                        <div className="grid grid-cols-1 gap-4">
                          {(() => {
                            if (supplierKraljic.length === 0) return <p className="text-sm opacity-50 italic">No hay datos suficientes para generar una sugerencia.</p>;

                            // Logic to find the "Priority" item
                            // Priority: Strategic > Leverage > Bottleneck > Non-Critical
                            // Within same quadrant: Higher Profit Impact > Higher Supply Risk > Higher Amount
                            const sortedKraljic = [...supplierKraljic].sort((a, b) => {
                              const quadrantPriority = { 'Estratégico': 4, 'Apalancamiento': 3, 'Cuello de Botella': 2, 'No Crítico': 1 };
                              if (quadrantPriority[b.quadrant] !== quadrantPriority[a.quadrant]) {
                                return quadrantPriority[b.quadrant] - quadrantPriority[a.quadrant];
                              }
                              if (b.profitImpact !== a.profitImpact) return b.profitImpact - a.profitImpact;
                              if (b.supplyRisk !== a.supplyRisk) return b.supplyRisk - a.supplyRisk;
                              return b.amount - a.amount;
                            });

                            const s = sortedKraljic[0];
                            let strategy = {
                              type: 'Negociación Distributiva (Transaccional)',
                              focus: '"Ganar-Perder". El objetivo es el precio más bajo.',
                              usage: 'Compras únicas o productos genéricos (commodities) con muchos proveedores disponibles.',
                              key: 'Regateo directo sobre costo y plazos.',
                              explanation: 'Se sugiere este enfoque ya que el ítem se encuentra en el cuadrante No Crítico, donde el impacto financiero y el riesgo son bajos, permitiendo priorizar la eficiencia operativa.'
                            };

                            if (s.quadrant === 'Estratégico') {
                              strategy = {
                                type: 'Negociación Integrativa (Alianza Estratégica)',
                                focus: '"Ganar-Ganar". Busca crear valor mutuo a largo plazo y asegurar el suministro.',
                                usage: 'Insumos críticos donde la calidad, la innovación y la relación pesan más que el precio.',
                                key: 'Transparencia, resolución conjunta de problemas y contratos de largo plazo.',
                                explanation: 'Este es el ítem de mayor prioridad. Al ser Estratégico, cualquier falla en el suministro o calidad impacta directamente en el core del negocio. Se recomienda una relación de socio a largo plazo.'
                              };
                            } else if (s.quadrant === 'Apalancamiento') {
                              strategy = {
                                type: 'Negociación Competitiva (Licitaciones / Subastas)',
                                focus: 'Explotar el poder de compra para obtener el mejor precio y condiciones.',
                                usage: 'Materiales con muchos proveedores disponibles y alto impacto en el gasto.',
                                key: 'Poner a competir a los proveedores, subastas inversas y contratos por volumen.',
                                explanation: 'Dada la alta inversión y la disponibilidad de alternativas, este ítem es ideal para maximizar ahorros mediante la competencia abierta entre proveedores calificados.'
                              };
                            } else if (s.quadrant === 'Cuello de Botella') {
                              strategy = {
                                type: 'Negociación de Aseguramiento (Continuidad)',
                                focus: 'Garantizar el suministro y reducir el riesgo de falta de stock.',
                                usage: 'Insumos con pocos proveedores o logística compleja, pero bajo impacto financiero.',
                                key: 'Contratos de reserva de capacidad, búsqueda de alternativas y gestión de stocks.',
                                explanation: 'La prioridad aquí no es el precio, sino la seguridad. Se sugiere este proveedor/material para asegurar que la operación no se detenga por falta de este insumo crítico de difícil obtención.'
                              };
                            }

                            return (
                              <div className="bg-white p-8 rounded-3xl border-2 border-meli-yellow/30 shadow-md flex flex-col gap-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 bg-meli-yellow/10 rounded-bl-3xl">
                                  <Star className="w-5 h-5 text-meli-yellow fill-meli-yellow" />
                                </div>
                                
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                  <div className="md:w-1/3">
                                    <p className="text-[10px] font-bold uppercase opacity-40 mb-1">Sugerencia Prioritaria para el Comprador</p>
                                    <h3 className="text-xl font-bold text-meli-black mb-2">{s.supplier}</h3>
                                    <div className="flex items-center gap-2 mb-4">
                                      <span className={cn(
                                        "text-[10px] font-bold px-3 py-1 rounded-full uppercase",
                                        s.quadrant === 'Estratégico' ? "bg-red-100 text-red-600" :
                                        s.quadrant === 'Apalancamiento' ? "bg-yellow-100 text-yellow-600" :
                                        s.quadrant === 'Cuello de Botella' ? "bg-orange-100 text-orange-600" :
                                        "bg-gray-100 text-gray-600"
                                      )}>
                                        {s.quadrant}
                                      </span>
                                      <span className="text-[10px] font-bold bg-meli-gray-light px-3 py-1 rounded-full uppercase">
                                        Spend: ${(s.amount / 1000).toFixed(1)}k
                                      </span>
                                    </div>
                                    <div className="p-4 bg-meli-blue/5 rounded-2xl border border-meli-blue/10">
                                      <h4 className="font-bold text-meli-blue text-sm mb-1">{strategy.type}</h4>
                                      <p className="text-[11px] opacity-70 italic">Estrategia recomendada basada en la posición competitiva.</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex-1 space-y-6">
                                    <div>
                                      <p className="text-[10px] font-bold uppercase opacity-30 mb-2 flex items-center gap-2">
                                        <Info className="w-3 h-3" /> ¿Por qué sugerimos esto?
                                      </p>
                                      <p className="text-sm leading-relaxed text-meli-black/80">{strategy.explanation}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                      <div>
                                        <p className="text-[9px] font-bold uppercase opacity-30 mb-1">Enfoque</p>
                                        <p className="text-[11px] leading-relaxed">{strategy.focus}</p>
                                      </div>
                                      <div>
                                        <p className="text-[9px] font-bold uppercase opacity-30 mb-1">Uso</p>
                                        <p className="text-[11px] leading-relaxed">{strategy.usage}</p>
                                      </div>
                                      <div>
                                        <p className="text-[9px] font-bold uppercase opacity-30 mb-1">Clave</p>
                                        <p className="text-[11px] leading-relaxed font-bold">{strategy.key}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-6 border-t border-meli-black/5">
                                  <p className="text-[10px] text-meli-black/40 italic flex items-center gap-2">
                                    <AlertTriangle className="w-3 h-3" />
                                    Esta es una sugerencia basada en el análisis de datos de la Matriz de Kraljic, pero el comprador debe evaluar el escenario completo, incluyendo relaciones históricas y contexto de mercado, antes de tomar una decisión final.
                                  </p>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </section>
                      {/* Other Ways to Negotiate Reminder */}
                      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-8">
                        <h3 className="text-sm font-bold uppercase text-blue-800 mb-4 flex items-center gap-2">
                          <Info className="w-4 h-4" /> Otras formas de negociar
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-blue-700">VMI (Vendor Managed Inventory)</h4>
                            <p className="text-[11px] text-blue-900/70 leading-relaxed">
                              El proveedor gestiona los niveles de inventario del cliente basándose en la demanda compartida. 
                              Reduce costos de almacenamiento y mejora la disponibilidad.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xs font-bold text-blue-700">Subastas Directas (Reverse Auctions)</h4>
                            <p className="text-[11px] text-blue-900/70 leading-relaxed">
                              Proceso dinámico donde los proveedores compiten en tiempo real bajando sus precios. 
                              Ideal para commodities con alta competencia.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Sourcing Strategy Content */}
                      <section>
                        <h2 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                          <Target className="w-3 h-3" /> Análisis de Estrategia
                        </h2>
                        <div className="bg-meli-gray-light/30 p-8 rounded-2xl border border-meli-black/5">
                          <div className="prose prose-sm max-w-none text-meli-black/80 leading-relaxed">
                            <ReactMarkdown>
                              {report.sourcingSteps?.sourcingStrategy}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>
                )
              ) : activeStepTab === 'rfxProcess' ? (
                /* RFx Process Tab Content */
                report && (
                  <section className="bg-white p-10 rounded-xl border border-meli-black/10 shadow-sm relative overflow-hidden">
                    <img src={MELI_LOGO} alt="ML" className="absolute top-4 right-4 h-6 opacity-20" referrerPolicy="no-referrer" />
                    
                    {/* Objective Info Box at the top */}
                    <div className="p-6 bg-meli-blue/5 border border-meli-blue/10 rounded-2xl flex gap-4 items-start mb-8">
                      <div className="p-2 bg-meli-blue/10 rounded-lg">
                        <Search className="w-5 h-5 text-meli-blue" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-meli-blue mb-1 uppercase tracking-wider">Objetivo del RFx</h3>
                        <p className="text-xs text-meli-black/70 leading-relaxed">
                          El objetivo del RFX es capturar información del mercado de manera estructurada y competitiva para reducir la asimetría de información entre el comprador y el proveedor, permitiendo tomar una decisión basada en datos y no en suposiciones.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-meli-yellow rounded-xl shadow-sm">
                        <Zap className="w-6 h-6 text-meli-black" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold italic font-serif tracking-tight">RFx Process</h2>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Estrategia de Licitación | Mercado Libre</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {/* RFx Pillars */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* RFI */}
                        <div className="p-6 bg-white border border-meli-black/5 rounded-2xl shadow-sm hover:shadow-md transition-all">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xs">RFI</div>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Explorar</span>
                          </div>
                          <h4 className="font-bold text-sm mb-2">Request for Information</h4>
                          <p className="text-[11px] text-meli-black/60 mb-4">Se usa para explorar. Si no conoces bien el mercado o quiénes son los jugadores, pides información general sobre sus capacidades. No hay compromiso de compra.</p>
                          <div className="space-y-1">
                            <p className="text-[9px] font-bold uppercase opacity-30">Foco:</p>
                            <p className="text-[10px] font-medium">Capacidad productiva, salud financiera, posición en el mercado, diferenciadores.</p>
                          </div>
                        </div>

                        {/* RFP */}
                        <div className="p-6 bg-white border border-meli-black/5 rounded-2xl shadow-sm hover:shadow-md transition-all">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center font-bold text-xs">RFP</div>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Solucionar</span>
                          </div>
                          <h4 className="font-bold text-sm mb-2">Request for Proposal</h4>
                          <p className="text-[11px] text-meli-black/60 mb-4">Se usa para solucionar. Le planteas un problema al proveedor y ellos proponen cómo hacerlo. Evalúas creatividad, técnica y precio.</p>
                          <div className="space-y-1">
                            <p className="text-[9px] font-bold uppercase opacity-30">Foco:</p>
                            <p className="text-[10px] font-medium">Creatividad, propuesta técnica, innovación, costo total.</p>
                          </div>
                        </div>

                        {/* RFQ */}
                        <div className="p-6 bg-white border border-meli-black/5 rounded-2xl shadow-sm hover:shadow-md transition-all">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center font-bold text-xs">RFQ</div>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Comprar</span>
                          </div>
                          <h4 className="font-bold text-sm mb-2">Request for Quotation</h4>
                          <p className="text-[11px] text-meli-black/60 mb-4">Se usa para comprar. Ya sabes exactamente qué quieres (especificaciones técnicas cerradas) y solo buscas el mejor precio y condiciones comerciales.</p>
                          <div className="space-y-1">
                            <p className="text-[9px] font-bold uppercase opacity-30">Foco:</p>
                            <p className="text-[10px] font-medium">Especificaciones técnicas, SLAs, volúmenes, precio final.</p>
                          </div>
                        </div>
                      </div>

                      {/* AI Generated Strategy */}
                      <div className="mt-8 pt-8 border-t border-meli-black/5">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-4 flex items-center gap-2">
                          <Zap className="w-3 h-3" /> ESTRATEGIA RFX: OBJETIVO
                        </h3>
                        <div className="bg-meli-gray-light/30 p-8 rounded-2xl border border-meli-black/5 space-y-6">
                          <div className="prose prose-sm max-w-none text-meli-black/80 leading-relaxed">
                            <p className="font-medium italic">
                              En el marco de un proceso de Strategic Sourcing, los incentivos y las penalidades no son simples "premios o castigos", sino herramientas estratégicas para alinear los intereses del proveedor con los objetivos del negocio. Cuando redactas un RfX (específicamente un RfP - Request for Proposal), definir estos mecanismos desde el inicio asegura que la relación sea productiva y transparente.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <h4 className="font-bold text-meli-blue flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" /> 1. Incentivos: Motivando la Excelencia
                              </h4>
                              <p className="text-xs opacity-70">Los incentivos buscan que el proveedor no solo cumpla con el contrato, sino que supere las expectativas o genere ahorros adicionales.</p>
                              <ul className="space-y-3">
                                <li className="text-[11px] leading-relaxed">
                                  <span className="font-bold block">Esquema de "Gain-Sharing" (Ahorros Compartidos):</span>
                                  Si el proveedor propone una innovación o mejora en el proceso que reduce los costos operativos, una parte de ese ahorro se le entrega como bonificación.
                                </li>
                                <li className="text-[11px] leading-relaxed">
                                  <span className="font-bold block">Extensiones de Contrato Automáticas:</span>
                                  Ofrecer la renovación del contrato sin necesidad de una nueva licitación si se mantienen niveles de servicio (SLAs) superiores al 95-98%.
                                </li>
                                <li className="text-[11px] leading-relaxed">
                                  <span className="font-bold block">Bonos por Desempeño:</span>
                                  Pagos adicionales por cumplimiento anticipado de hitos o por superar métricas de calidad específicas.
                                </li>
                                <li className="text-[11px] leading-relaxed">
                                  <span className="font-bold block">Estatus de "Socio Preferente":</span>
                                  Acceso a nuevos proyectos o mayor volumen de negocio sin pasar por procesos competitivos intensos, basado en el historial de éxito.
                                </li>
                              </ul>
                            </div>

                            <div className="space-y-4">
                              <h4 className="font-bold text-red-600 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> 2. Penalidades: Protegiendo la Continuidad
                              </h4>
                              <p className="text-xs opacity-70">Las penalidades (o deducciones por nivel de servicio) tienen como fin resarcir al comprador por el incumplimiento y presionar al proveedor para corregir fallas.</p>
                              <ul className="space-y-3">
                                <li className="text-[11px] leading-relaxed">
                                  <span className="font-bold block">Service Level Credits (Créditos de Servicio):</span>
                                  Es la penalidad más común. Si el proveedor no cumple un SLA (ej. tiempo de respuesta), se aplica un descuento porcentual en la factura del mes siguiente.
                                </li>
                                <li className="text-[11px] leading-relaxed">
                                  <span className="font-bold block">Liquidated Damages (Daños Perjuicios):</span>
                                  Montos fijos preestablecidos en el contrato que el proveedor debe pagar en caso de retrasos críticos (comunes en construcción o implementación de software).
                                </li>
                                <li className="text-[11px] leading-relaxed">
                                  <span className="font-bold block">Cláusulas de "Termination for Cause":</span>
                                  El derecho a rescindir el contrato sin penalización para el comprador si el proveedor acumula un número determinado de fallas graves.
                                </li>
                                <li className="text-[11px] leading-relaxed">
                                  <span className="font-bold block">Retenciones (Retention Money):</span>
                                  Retener un porcentaje del pago final hasta que se confirme que el servicio o producto funciona perfectamente tras un periodo de prueba.
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="pt-8 border-t border-meli-black/5">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-6 text-center">Matriz de Aplicación en el RfX</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-meli-yellow text-meli-black">
                                    <th className="p-3 text-[10px] font-bold uppercase border border-meli-black/10">Concepto</th>
                                    <th className="p-3 text-[10px] font-bold uppercase border border-meli-black/10">Indicador (KPI)</th>
                                    <th className="p-3 text-[10px] font-bold uppercase border border-meli-black/10">Incentivo</th>
                                    <th className="p-3 text-[10px] font-bold uppercase border border-meli-black/10">Penalidad</th>
                                  </tr>
                                </thead>
                                <tbody className="text-[11px]">
                                  <tr className="hover:bg-meli-yellow/5 transition-colors">
                                    <td className="p-3 border border-meli-black/10 font-bold">Entrega</td>
                                    <td className="p-3 border border-meli-black/10">Tiempo de arribo</td>
                                    <td className="p-3 border border-meli-black/10">Bono por entrega &lt; 24h</td>
                                    <td className="p-3 border border-meli-black/10">Descuento del 2% por día de retraso</td>
                                  </tr>
                                  <tr className="hover:bg-meli-yellow/5 transition-colors">
                                    <td className="p-3 border border-meli-black/10 font-bold">Calidad</td>
                                    <td className="p-3 border border-meli-black/10">% de productos defectuosos</td>
                                    <td className="p-3 border border-meli-black/10">Contrato anual garantizado</td>
                                    <td className="p-3 border border-meli-black/10">Nota de crédito por cada lote rechazado</td>
                                  </tr>
                                  <tr className="hover:bg-meli-yellow/5 transition-colors">
                                    <td className="p-3 border border-meli-black/10 font-bold">Innovación</td>
                                    <td className="p-3 border border-meli-black/10">Reducción de costos</td>
                                    <td className="p-3 border border-meli-black/10">20% del ahorro generado</td>
                                    <td className="p-3 border border-meli-black/10">N/A</td>
                                  </tr>
                                  <tr className="hover:bg-meli-yellow/5 transition-colors">
                                    <td className="p-3 border border-meli-black/10 font-bold">Soporte</td>
                                    <td className="p-3 border border-meli-black/10">Tiempo de resolución</td>
                                    <td className="p-3 border border-meli-black/10">Feedback positivo / Referencia</td>
                                    <td className="p-3 border border-meli-black/10">Escalación a gerencia / Multas horarias</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="pt-8 border-t border-meli-black/5">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-meli-black/40 mb-4">Estrategia Detallada (IA)</h4>
                            <div className="prose prose-sm max-w-none text-meli-black/80 leading-relaxed">
                              <ReactMarkdown>
                                {report.sourcingSteps?.rfxProcess || "Analizando etapa..."}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )
              ) : activeStepTab === 'negotiationSelection' ? (
                report && (
                  <section className="bg-white p-10 rounded-xl border border-meli-black/10 shadow-sm relative overflow-hidden">
                    <img src={MELI_LOGO} alt="ML" className="absolute top-4 right-4 h-6 opacity-20" referrerPolicy="no-referrer" />
                    
                    <div className="mb-8 p-6 bg-meli-yellow/10 border-l-4 border-meli-yellow rounded-r-xl">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-meli-black/60 mb-2">Objetivo</h4>
                      <p className="text-sm font-bold text-meli-black leading-relaxed">
                        El objetivo no es simplemente "bajar el precio", sino seleccionar al socio de negocio que ofrezca la mejor combinación de valor, capacidad y riesgo (TCO), formalizando un acuerdo que garantice la sostenibilidad del suministro a largo plazo.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-meli-yellow rounded-xl shadow-sm">
                        <Handshake className="w-6 h-6 text-meli-black" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold italic font-serif tracking-tight">
                          Negociación & Selección
                        </h2>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Estrategia de Sourcing | Mercado Libre</p>
                      </div>
                    </div>

                    <div className="mb-8">
                      <TCOIceberg />
                    </div>
                    
                    <div className="bg-meli-gray-light/30 p-8 rounded-2xl border border-meli-black/5 min-h-[400px]">
                      <div className="prose prose-sm max-w-none text-meli-black/80 leading-relaxed">
                        <ReactMarkdown>
                          {report.sourcingSteps?.negotiationSelection || "Analizando etapa..."}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </section>
                )
              ) : activeStepTab === 'implementationContracting' ? (
                report && (
                  <section className="bg-white p-10 rounded-xl border border-meli-black/10 shadow-sm relative overflow-hidden">
                    <img src={MELI_LOGO} alt="ML" className="absolute top-4 right-4 h-6 opacity-20" referrerPolicy="no-referrer" />
                    <div className="mb-8 p-6 bg-meli-yellow/10 border-l-4 border-meli-yellow rounded-r-xl">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-meli-black/60 mb-2">Objetivo</h4>
                      <p className="text-sm font-bold text-meli-black leading-relaxed">
                        El objetivo es formalizar legal y operativamente los acuerdos alcanzados en la negociación para asegurar la captura de los ahorros proyectados, mitigar riesgos jurídicos y garantizar una transición sin interrupciones para el usuario final (el negocio). Blindar el valor negociado.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-meli-yellow rounded-xl shadow-sm">
                        <CheckCircle2 className="w-6 h-6 text-meli-black" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold italic font-serif tracking-tight">
                          Implementation & Contracting
                        </h2>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Estrategia de Sourcing | Mercado Libre</p>
                      </div>
                    </div>

                    {/* Timeline Section */}
                    <div className="mb-12">
                      <div className="bg-meli-black p-10 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-meli-yellow to-transparent opacity-50" />
                        <h3 className="text-white text-center text-xl font-black mb-16 tracking-tight uppercase">
                          Cronograma en 5
                        </h3>
                        
                        <div className="relative">
                          {/* Connecting Line */}
                          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2" />
                          
                          <div className="grid grid-cols-5 gap-4 relative z-10">
                            {[
                              { id: '01', title: 'Formalización Legal', items: ['Firma de Contratos', 'SLA & Compliance', 'Acuerdos NDA'], icon: <FileText className="w-5 h-5" />, pos: 'top', details: 'Formalización Legal y Contractual\n\nRedacción de Cláusulas Comerciales: Traducir los ahorros y condiciones negociadas a términos legales (precios, vigencia y formas de pago).\nDefinición de SLAs y Penalidades: Establecer niveles de servicio medibles y las consecuencias financieras si el proveedor no cumple.\nGestión de Firmas y Compliance: Asegurar el flujo de aprobaciones legales y el cumplimiento de políticas internas.' },
                              { id: '02', title: 'Configuración Operativa', items: ['Setup de ERP/Sistemas', 'Migración de Datos', 'Gestión de Accesos'], icon: <Database className="w-5 h-5" />, pos: 'bottom', details: 'Configuración Operativa (Sistemas y Datos)\n\nSi el contrato no está en el sistema, no existe para la operación.\nAlta en el Master Data: Registro completo del proveedor en el ERP (datos fiscales, bancarios y de contacto).\nCarga de Catálogos y Precios: Actualizar las listas de precios y materiales para que las órdenes de compra salgan con los montos negociados.' },
                              { id: '03', title: 'Gestión del Cambio', items: ['Plan de Comunicación', 'Training Intensivo', 'Talleres de Transición'], icon: <Users className="w-5 h-5" />, pos: 'top', details: 'Gestión del Cambio\n\nEs la actividad de mayor riesgo. El objetivo es que el usuario final no sufra el cambio de proveedor.\nComunicación a Stakeholders: Informar a los usuarios internos quién es el nuevo proveedor y cómo interactuar con él.\nPlan de Salida y Entrada: Coordinar el fin de servicios del proveedor anterior y el inicio del nuevo para evitar huecos en el suministro.\nTransferencia de Conocimiento: Asegurar que el nuevo aliado tenga acceso a manuales, planos o procesos para operar desde el día uno.' },
                              { id: '04', title: 'Estabilización', items: ['Soporte Hypercare', 'Ajustes de Flujo', 'Monitoreo de KPIs'], icon: <ShieldCheck className="w-5 h-5" />, pos: 'bottom', details: 'Estabilización (Hypercare)\n\nMonitoreo de Primeras Entregas: Validar que la calidad y los tiempos coincidan con lo prometido en la licitación.\nResolución Inmediata de Fricciones: Actuar como puente entre el usuario y el proveedor para ajustar detalles de facturación o logística.' },
                              { id: '05', title: 'Auditoría & Hand-over', items: ['Medición de ROI', 'Entrega de Docs', 'Cierre del Proyecto'], icon: <Flag className="w-5 h-5" />, pos: 'top', details: 'Auditoría y Hand-over\n\nValidación de "Saving" Real: Comparar la primera factura contra el escenario base para confirmar que el ahorro proyectado se está materializando.\nTraspaso al Dueño de la Relación: Entregar el contrato y los KPIs al equipo que llevará el SRM (gestión del día a día).' }
                            ].map((phase, idx) => (
                              <div key={phase.id} className="flex flex-col items-center">
                                {/* Content Above */}
                                <div className={cn("h-24 flex flex-col items-center justify-end mb-6 text-center", phase.pos === 'bottom' && "invisible")}>
                                  <span className="px-2 py-0.5 rounded-full bg-meli-yellow text-meli-black text-[8px] font-black mb-2">FASE {phase.id}</span>
                                  <h4 className="text-white font-bold text-[11px] mb-1 leading-tight">{phase.title}</h4>
                                  <div className="text-[8px] text-white/40 leading-tight">
                                    {phase.items.map((item, i) => <p key={i}>{item}</p>)}
                                  </div>
                                </div>

                                {/* Circle Icon */}
                                <button 
                                  onClick={() => setSelectedPhase(phase)}
                                  className="relative group outline-none"
                                >
                                  <div className="w-12 h-12 rounded-full bg-meli-black border-2 border-meli-yellow flex items-center justify-center text-meli-yellow shadow-[0_0_15px_rgba(255,230,0,0.2)] z-20 relative group-hover:scale-110 group-hover:bg-meli-yellow group-hover:text-meli-black transition-all duration-300">
                                    {phase.icon}
                                  </div>
                                  <div className="absolute inset-0 bg-meli-yellow blur-lg opacity-10 group-hover:opacity-30 transition-opacity" />
                                </button>

                                {/* Content Below */}
                                <div className={cn("h-24 flex flex-col items-center mt-6 text-center", phase.pos === 'top' && "invisible")}>
                                  <span className="px-2 py-0.5 rounded-full bg-meli-yellow text-meli-black text-[8px] font-black mb-2">FASE {phase.id}</span>
                                  <h4 className="text-white font-bold text-[11px] mb-1 leading-tight">{phase.title}</h4>
                                  <div className="text-[8px] text-white/40 leading-tight">
                                    {phase.items.map((item, i) => <p key={i}>{item}</p>)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Marathon Warning Section */}
                    <div className="mb-12">
                      <div className="bg-meli-yellow p-8 rounded-3xl border-2 border-meli-black shadow-xl relative overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                              <AlertTriangle className="w-8 h-8 text-meli-black animate-pulse" />
                              <h3 className="text-xl font-black uppercase tracking-tighter text-meli-black">¡Atención Comprador!</h3>
                            </div>
                            <p className="text-lg font-bold text-meli-black leading-tight mb-4 italic">
                              "Llegar al final de la maratón agotado es un riesgo. No dejes que tus ahorros teóricos se escapen por un hueco en la ejecución."
                            </p>
                            <div className="flex items-center gap-2 text-xs font-black uppercase opacity-60">
                              <Flag className="w-4 h-4" />
                              <span>KM 42 - La Ejecución es donde el ahorro se hace real</span>
                            </div>
                          </div>
                          <div className="w-full md:w-1/3 relative">
                            <div className="aspect-square rounded-2xl overflow-hidden border-4 border-meli-black shadow-2xl bg-white relative flex items-center justify-center p-4">
                              <svg viewBox="0 0 200 200" className="w-full h-full">
                                {/* Marathon Road */}
                                <path d="M 20 160 Q 100 150 180 160" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                                
                                {/* Tired Buyer Character - More "Funny/Cartoonish" */}
                                <g transform="translate(80, 80)">
                                  {/* Body - Slumped */}
                                  <path d="M 0 0 L -5 30 M -15 50 L -5 30 L 5 50 M -20 15 L 10 10" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
                                  
                                  {/* Head - Looking down/exhausted */}
                                  <g transform="translate(-8, -15) rotate(-10)">
                                    <circle cx="0" cy="0" r="12" fill="#fef3c7" stroke="black" strokeWidth="2" />
                                    {/* Tired eyes */}
                                    <path d="M -5 -2 L -1 -2 M 1 -2 L 5 -2" stroke="black" strokeWidth="2" />
                                    {/* Tongue out */}
                                    <path d="M -2 4 Q 0 10 2 4" fill="#f87171" stroke="black" strokeWidth="1" />
                                    {/* Sweat drops */}
                                    <circle cx="10" cy="-8" r="1.5" fill="#3b82f6" className="animate-ping" />
                                    <circle cx="14" cy="2" r="1" fill="#3b82f6" />
                                  </g>
                                  
                                  {/* Money Bag on back - Leaking */}
                                  <g transform="translate(-25, 5) rotate(-20)">
                                    <path d="M 0 0 Q -20 10 -20 35 Q -20 55 0 55 Q 20 55 20 35 Q 20 10 0 0" fill="#85bb65" stroke="black" strokeWidth="3" />
                                    <text x="0" y="28" fontSize="6" fontWeight="900" textAnchor="middle" fill="black" className="font-sans">AHORROS</text>
                                    <text x="0" y="36" fontSize="6" fontWeight="900" textAnchor="middle" fill="black" className="font-sans">TEÓRICOS</text>
                                    
                                    {/* The HOLE */}
                                    <circle cx="12" cy="45" r="5" fill="#4a3728" />
                                    {/* Escaping Money Particles */}
                                    <g>
                                      <motion.text 
                                        animate={{ y: [45, 80], x: [12, 25], opacity: [1, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        x="12" y="45" fontSize="12" fill="#166534" fontWeight="bold"
                                      >$</motion.text>
                                      <motion.text 
                                        animate={{ y: [45, 90], x: [12, 5], opacity: [1, 0] }}
                                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                                        x="12" y="45" fontSize="10" fill="#166534" fontWeight="bold"
                                      >$</motion.text>
                                      <motion.text 
                                        animate={{ y: [45, 70], x: [12, 40], opacity: [1, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                                        x="12" y="45" fontSize="14" fill="#166534" fontWeight="bold"
                                      >$</motion.text>
                                    </g>
                                  </g>
                                </g>
                                
                                {/* Finish Line Flag */}
                                <g transform="translate(170, 110)">
                                  <line x1="0" y1="0" x2="0" y2="50" stroke="black" strokeWidth="3" />
                                  <path d="M 0 0 L 30 15 L 0 30 Z" fill="#FFE600" stroke="black" strokeWidth="2" />
                                  <text x="5" y="18" fontSize="8" fontWeight="black">META</text>
                                </g>
                              </svg>
                            </div>
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-meli-yellow border-2 border-meli-black rounded-full flex items-center justify-center font-black text-xs rotate-12 shadow-lg">KM 42</div>
                            <div className="absolute -bottom-2 -left-2 px-3 py-1 bg-meli-black text-meli-yellow text-[8px] font-black uppercase tracking-widest -rotate-3 shadow-lg">Fuga de Valor</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tips Senior Section */}
                    <div className="mb-12">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-meli-black/40 mb-6 flex items-center gap-2">
                        <Star className="w-3 h-3" /> Tips Senior
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { title: 'Audita la primera factura', desc: 'Verifica que los precios cargados coincidan exactamente con lo negociado.' },
                          { title: 'Divorcio rápido y barato', desc: 'Asegurar cláusulas de contratos amigables para rescindir la relación de forma sencilla.' },
                          { title: 'Ahorro vs Costo Operativo', desc: 'Asegúrate de que el ahorro proyectado sea mayor al costo operativo de cambiar de proveedor. Incluye el derecho a revisar y ajustar precios anualmente si las condiciones del mercado bajan.' }
                        ].map((tip, idx) => (
                          <div key={idx} className="p-5 bg-meli-gray-light/30 rounded-2xl border border-meli-black/5 flex gap-4">
                            <div className="w-8 h-8 rounded-lg bg-meli-yellow flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-4 h-4 text-meli-black" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-meli-black mb-1">{tip.title}</h4>
                              <p className="text-[11px] text-meli-black/60 leading-relaxed">{tip.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-meli-gray-light/30 p-8 rounded-2xl border border-meli-black/5 min-h-[400px]">
                      <div className="prose prose-sm max-w-none text-meli-black/80 leading-relaxed">
                        <ReactMarkdown>
                          {report.sourcingSteps?.implementationContracting || "Analizando etapa..."}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </section>
                )
              ) : activeStepTab === 'srm' ? (
                report && (
                  <section className="bg-white p-10 rounded-xl border border-meli-black/10 shadow-sm relative overflow-hidden">
                    <img src={MELI_LOGO} alt="ML" className="absolute top-4 right-4 h-6 opacity-20" referrerPolicy="no-referrer" />
                    <div className="mb-8 p-6 bg-meli-yellow/10 border-l-4 border-meli-yellow rounded-r-xl">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-meli-black/60 mb-2">Objetivo</h4>
                      <p className="text-sm font-bold text-meli-black leading-relaxed">
                        Maximizar el valor estratégico y financiero de la base de suministros, transformando las relaciones transaccionales en ventajas competitivas. Buscamos mitigar riesgos de forma proactiva y fomentar la innovación colaborativa que no encontraríamos en un simple catálogo
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-meli-yellow rounded-xl shadow-sm">
                        <TrendingUp className="w-6 h-6 text-meli-black" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold italic font-serif tracking-tight">
                          SRM
                        </h2>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Estrategia de Sourcing | Mercado Libre</p>
                      </div>
                    </div>

                    {/* SRM Circular Diagram */}
                    <div className="mt-24 mb-40 flex justify-center">
                      <div className="relative w-[600px] h-[500px] flex items-center justify-center">
                        {/* Central Circle - Lowered more */}
                        <div className="absolute w-56 h-56 bg-white rounded-full border-8 border-meli-yellow shadow-2xl z-20 flex flex-col items-center justify-center p-6 text-center translate-y-20">
                          <div className="mt-2">
                            <h3 className="text-meli-black font-black text-2xl leading-tight uppercase">What is SRM?</h3>
                            <div className="w-16 h-1 bg-meli-black mx-auto my-4" />
                            <p className="text-[10px] font-bold opacity-40 tracking-widest uppercase">Mercado Libre Strategy</p>
                          </div>
                        </div>

                        {/* Stages - Full Circle Distribution */}
                        {[
                          { id: 1, title: 'SEGMENTACIÓN ESTRATÉGICA', angle: -90, icon: <Users />, color: '#FFE600', details: 'La primera actividad es clasificar la base de proveedores para identificar quiénes son Críticos y Estratégicos, definiendo niveles de atención y recursos para cada grupo.' },
                          { id: 2, title: 'GESTIÓN DEL DESEMPEÑO', angle: -18, icon: <BarChart3 />, color: '#FF6321', details: 'Establecer y medir KPIs objetivos. Evaluar el OTIF (cumplimiento), la Calidad, el Servicio y la Sostenibilidad. Esta medición debe ser periódica y compartida con el proveedor.' },
                          { id: 3, title: 'REVISIONES DE NEGOCIO', angle: 54, icon: <MessageSquare />, color: '#000000', details: 'Ejecutar reuniones estructuradas (mensuales o trimestrales). En ellas se revisa el desempeño pasado, pero sobre todo se alinea la estrategia futura y se resuelven cuellos de botella operativos.' },
                          { id: 4, title: 'MITIGACIÓN DE RIESGOS', angle: 126, icon: <ShieldAlert />, color: '#333333', details: 'Monitoreo proactivo de la salud financiera del proveedor, riesgos geopolíticos, de cumplimiento (Compliance) y de capacidad. El objetivo es tener planes de contingencia antes de que ocurra una interrupción.' },
                          { id: 5, title: 'INNOVACIÓN COLABORATIVA', angle: 198, icon: <Zap />, color: '#8e8e8e', details: 'Trabajar con proveedores clave en proyectos de reducción de TCO (Costo Total de Propiedad), mejora de procesos conjuntos y captura de innovación tecnológica que el proveedor pueda transferir a nuestra empresa.' },
                        ].map((stage, i) => {
                          const radius = 230; // Increased radius
                          const x = Math.cos(stage.angle * Math.PI / 180) * radius;
                          const y = Math.sin(stage.angle * Math.PI / 180) * radius;
                          
                          return (
                            <button
                              key={stage.id}
                              onClick={() => setSelectedPhase(stage)}
                              className="absolute group transition-all duration-500 hover:scale-110 z-10"
                              style={{ transform: `translate(${x}px, ${y}px)` }}
                            >
                              <div className="flex flex-col items-center gap-3">
                                <div 
                                  className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white group-hover:rotate-12 transition-transform"
                                  style={{ backgroundColor: stage.color }}
                                >
                                  {React.cloneElement(stage.icon as React.ReactElement<any>, { className: "w-10 h-10" })}
                                </div>
                                <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-meli-black/5 max-w-[140px] group-hover:bg-meli-yellow transition-colors">
                                  <p className="text-[9px] font-black text-meli-black text-center leading-tight uppercase">{stage.title}</p>
                                </div>
                              </div>
                            </button>
                          );
                        })}

                        {/* Connecting Circle */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5">
                          <circle cx="300" cy="250" r="230" fill="none" stroke="black" strokeWidth="2" strokeDasharray="10,10" />
                        </svg>
                      </div>
                    </div>

                    {/* Provider Evaluation Survey */}
                    <div className="mt-20 border-t border-meli-black/5 pt-16 mb-16">
                          <div className="flex flex-col gap-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                          {/* Block A */}
                          <div className="space-y-8 bg-white p-8 rounded-3xl border border-meli-black/5 shadow-sm">
                            <div className="p-4 bg-meli-yellow/5 border-l-4 border-meli-yellow rounded-r-xl">
                              <h4 className="text-xs font-black uppercase tracking-widest text-meli-black/60">Bloque A</h4>
                              <p className="text-sm font-bold">Impacto en el Negocio (Eje Financiero/Valor)</p>
                            </div>

                            <div className="space-y-6">
                              {[
                                { id: 'gasto', label: 'Volumen de Gasto', q: '¿Qué porcentaje de tu presupuesto de compras anual se lleva este proveedor?', min: '1 = <5%', max: '5 = >30%' },
                                { id: 'calidad', label: 'Impacto en Calidad', q: 'Si el producto/servicio falla, ¿afecta directamente la calidad percibida por tu cliente final?', min: '1 = Bajo', max: '5 = Crítico' },
                                { id: 'rentabilidad', label: 'Rentabilidad', q: '¿Su costo impacta significativamente en el margen de utilidad de tu producto estrella?', min: '1 = Mínimo', max: '5 = Alto' }
                              ].map((item) => (
                                <div key={item.id} className="space-y-3">
                                  <label className="text-xs font-bold text-meli-black/80 block">{item.q}</label>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-[10px] font-bold opacity-40 w-12">{item.min}</span>
                                    <div className="flex-1 flex justify-between bg-meli-gray-light/30 p-1 rounded-lg">
                                      {[1, 2, 3, 4, 5].map((val) => (
                                        <button
                                          key={val}
                                          onClick={() => setSrmSurvey(prev => ({ ...prev, [item.id]: val }))}
                                          className={cn(
                                            "w-10 h-10 rounded-md text-xs font-black transition-all",
                                            srmSurvey[item.id as keyof typeof srmSurvey] === val 
                                              ? "bg-meli-black text-meli-yellow shadow-lg scale-110" 
                                              : "hover:bg-meli-yellow/20"
                                          )}
                                        >
                                          {val}
                                        </button>
                                      ))}
                                    </div>
                                    <span className="text-[10px] font-bold opacity-40 w-12 text-right">{item.max}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Block B */}
                          <div className="space-y-8 bg-white p-8 rounded-3xl border border-meli-black/5 shadow-sm">
                            <div className="p-4 bg-meli-black/5 border-l-4 border-meli-black rounded-r-xl">
                              <h4 className="text-xs font-black uppercase tracking-widest text-meli-black/60">Bloque B</h4>
                              <p className="text-sm font-bold">Riesgo de Suministro (Eje de Complejidad)</p>
                            </div>

                            <div className="space-y-6">
                              {[
                                { id: 'disponibilidad', label: 'Disponibilidad en el Mercado', q: '¿Cuántos proveedores alternativos existen que hagan exactamente lo mismo con la misma calidad?', min: '1 = Muchos', max: '5 = Monopolio' },
                                { id: 'costoCambio', label: 'Costo de Cambio', q: '¿Qué tan caro o tardado sería migrar a otro proveedor (certificaciones, moldes, software, capacitación)?', min: '1 = Bajo', max: '5 = Muy Alto' },
                                { id: 'dependencia', label: 'Dependencia Tecnológica', q: '¿Poseen una patente o un "know-how" que nadie más tiene en la región?', min: '1 = Ninguna', max: '5 = Exclusiva' }
                              ].map((item) => (
                                <div key={item.id} className="space-y-3">
                                  <label className="text-xs font-bold text-meli-black/80 block">{item.q}</label>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-[10px] font-bold opacity-40 w-12">{item.min}</span>
                                    <div className="flex-1 flex justify-between bg-meli-gray-light/30 p-1 rounded-lg">
                                      {[1, 2, 3, 4, 5].map((val) => (
                                        <button
                                          key={val}
                                          onClick={() => setSrmSurvey(prev => ({ ...prev, [item.id]: val }))}
                                          className={cn(
                                            "w-10 h-10 rounded-md text-xs font-black transition-all",
                                            srmSurvey[item.id as keyof typeof srmSurvey] === val 
                                              ? "bg-meli-black text-meli-yellow shadow-lg scale-110" 
                                              : "hover:bg-meli-yellow/20"
                                          )}
                                        >
                                          {val}
                                        </button>
                                      ))}
                                    </div>
                                    <span className="text-[10px] font-bold opacity-40 w-12 text-right">{item.max}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Result Summary - Now below survey */}
                        <div className="max-w-xl mx-auto w-full space-y-8">
                          <div className="flex items-center gap-4">
                            <div className="w-2.5 h-10 bg-meli-yellow rounded-full" />
                            <h4 className="text-xl font-black uppercase tracking-widest text-meli-black/40">RESULTADO</h4>
                          </div>
                          
                          {(() => {
                            const scoreA = srmSurvey.gasto + srmSurvey.calidad + srmSurvey.rentabilidad;
                            const scoreB = srmSurvey.disponibilidad + srmSurvey.costoCambio + srmSurvey.dependencia;
                            
                            let classification = "";
                            let action = "";
                            let colorClass = "";
                            let icon = null;
                            let description = "";

                            if (scoreA > 9 && scoreB > 9) {
                              classification = "ESTRATÉGICO";
                              action = "Alianza";
                              description = "Proveedores vitales. Requieren una relación de socios con innovación conjunta.";
                              colorClass = "bg-white text-meli-black border border-meli-black/5";
                              icon = <Star className="w-10 h-10 text-meli-black/20" />;
                            } else if (scoreA <= 9 && scoreB > 9) {
                              classification = "CRÍTICO";
                              action = "Asegurar";
                              description = "Bajo impacto financiero pero alto riesgo. Busca alternativas o stock.";
                              colorClass = "bg-white text-meli-black border border-meli-black/5";
                              icon = <ShieldAlert className="w-10 h-10 text-meli-black/20" />;
                            } else if (scoreA > 9 && scoreB <= 9) {
                              classification = "APALANCADO";
                              action = "Optimizar";
                              description = "Alto impacto y bajo riesgo. Usa tu poder de compra para negociar.";
                              colorClass = "bg-white text-meli-black border border-meli-black/5";
                              icon = <TrendingUp className="w-10 h-10 text-meli-black/20" />;
                            } else {
                              classification = "RUTINARIO";
                              action = "Eficiencia";
                              description = "Bajo impacto y bajo riesgo. Automatiza procesos para reducir costo.";
                              colorClass = "bg-white text-meli-black border border-meli-black/5";
                              icon = <Zap className="w-10 h-10 text-meli-black/20" />;
                            }

                            return (
                              <div className="space-y-8">
                                <div className="bg-white p-10 rounded-[40px] border border-meli-black/5 shadow-2xl flex gap-12">
                                  <div className="text-center flex-1">
                                    <p className="text-[10px] font-black uppercase opacity-40 mb-2 tracking-widest">IMPACTO (A)</p>
                                    <p className="text-5xl font-black mb-3">{scoreA}</p>
                                    <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase inline-block bg-meli-gray-light/50 text-meli-black/40">
                                      {scoreA > 9 ? 'ALTO' : 'BAJO'}
                                    </div>
                                  </div>
                                  <div className="w-px h-20 bg-meli-black/10 self-center" />
                                  <div className="text-center flex-1">
                                    <p className="text-[10px] font-black uppercase opacity-40 mb-2 tracking-widest">RIESGO (B)</p>
                                    <p className="text-5xl font-black mb-3">{scoreB}</p>
                                    <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase inline-block bg-meli-gray-light/50 text-meli-black/40">
                                      {scoreB > 9 ? 'ALTO' : 'BAJO'}
                                    </div>
                                  </div>
                                </div>

                                <div className={cn("p-10 rounded-[40px] shadow-2xl flex flex-col gap-6 transition-all duration-700", colorClass)}>
                                  <div className="flex items-center gap-6">
                                    <div className="p-4 bg-meli-gray-light/10 rounded-2xl shadow-inner">
                                      {icon}
                                    </div>
                                    <div>
                                      <h5 className="text-[11px] font-black uppercase tracking-widest opacity-40">PROVEEDOR {classification}</h5>
                                      <h2 className="text-4xl font-black tracking-tighter">{action}</h2>
                                    </div>
                                  </div>
                                  <p className="text-sm font-bold leading-relaxed text-meli-black/80">{description}</p>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      </div>

                      {/* Matrix Visual - Below */}
                      <div className="mt-12 p-10 bg-meli-gray-light/20 rounded-[40px] border border-meli-black/5 shadow-inner">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-3 mb-10">
                            <div className="w-1.5 h-6 bg-meli-yellow rounded-full" />
                            <h4 className="text-sm font-black uppercase tracking-widest opacity-40">Posicionamiento en Matriz de Kraljic</h4>
                          </div>
                          
                          <div className="w-full max-w-xl aspect-square bg-white rounded-[32px] border-4 border-meli-black p-8 relative shadow-2xl">
                            {/* Axis Labels */}
                            <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 flex items-center gap-2">
                              <ArrowUp className="w-3 h-3 text-meli-black/40" />
                              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Impacto en el Negocio</span>
                            </div>
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Riesgo de Suministro</span>
                              <ArrowRight className="w-3 h-3 text-meli-black/40" />
                            </div>
                            
                            <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-4">
                              {[
                                { id: 'critico', label: 'CRÍTICO', condition: (srmSurvey.gasto + srmSurvey.calidad + srmSurvey.rentabilidad <= 9 && srmSurvey.disponibilidad + srmSurvey.costoCambio + srmSurvey.dependencia > 9), color: 'bg-meli-black text-white' },
                                { id: 'estrategico', label: 'ESTRATÉGICO', condition: (srmSurvey.gasto + srmSurvey.calidad + srmSurvey.rentabilidad > 9 && srmSurvey.disponibilidad + srmSurvey.costoCambio + srmSurvey.dependencia > 9), color: 'bg-meli-yellow text-meli-black' },
                                { id: 'rutinario', label: 'RUTINARIO', condition: (srmSurvey.gasto + srmSurvey.calidad + srmSurvey.rentabilidad <= 9 && srmSurvey.disponibilidad + srmSurvey.costoCambio + srmSurvey.dependencia <= 9), color: 'bg-meli-gray-light text-meli-black' },
                                { id: 'apalancado', label: 'APALANCADO', condition: (srmSurvey.gasto + srmSurvey.calidad + srmSurvey.rentabilidad > 9 && srmSurvey.disponibilidad + srmSurvey.costoCambio + srmSurvey.dependencia <= 9), color: 'bg-meli-yellow/40 text-meli-black' }
                              ].map((cell) => (
                                <div 
                                  key={cell.id}
                                  className={cn(
                                    "rounded-2xl flex items-center justify-center text-xs font-black text-center p-4 transition-all duration-500 border-2 border-transparent",
                                    cell.condition 
                                      ? `${cell.color} scale-105 shadow-xl z-10 border-white/20` 
                                      : "bg-meli-gray-light/20 opacity-30 grayscale"
                                  )}
                                >
                                  {cell.label}
                                </div>
                              ))}
                            </div>

                            {/* Decorative Grid Lines */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                              <div className="w-full h-px bg-meli-black/5" />
                              <div className="h-full w-px bg-meli-black/5 absolute" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-meli-gray-light/30 p-8 rounded-2xl border border-meli-black/5 min-h-[400px]">
                      <div className="prose prose-sm max-w-none text-meli-black/80 leading-relaxed">
                        <ReactMarkdown>
                          {report.sourcingSteps?.srm || "Analizando etapa..."}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </section>
                )
              ) : (
                /* Other Steps Content */
                report && (
                <section className="bg-white p-10 rounded-xl border border-meli-black/10 shadow-sm relative overflow-hidden">
                  <img src={MELI_LOGO} alt="ML" className="absolute top-4 right-4 h-6 opacity-20" referrerPolicy="no-referrer" />
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-meli-yellow rounded-xl shadow-sm">
                      {React.createElement(SOURCING_STEPS.find(s => s.id === activeStepTab)?.icon || FileText, { className: "w-6 h-6 text-meli-black" })}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold italic font-serif tracking-tight">
                        {SOURCING_STEPS.find(s => s.id === activeStepTab)?.label}
                      </h2>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-40">Estrategia de Sourcing | Mercado Libre</p>
                    </div>
                  </div>
                  
                  <div className="bg-meli-gray-light/30 p-8 rounded-2xl border border-meli-black/5 min-h-[400px]">
                    <div className="prose prose-sm max-w-none text-meli-black/80 leading-relaxed">
                      <ReactMarkdown>
                        {report.sourcingSteps?.[activeStepTab as keyof typeof report.sourcingSteps] || "Analizando etapa..."}
                      </ReactMarkdown>
                    </div>
                  </div>
                </section>
              )
            )}

              {/* Empty State if no report and not on first tab */}
              {!report && activeStepTab !== 'profileCategory' && (
                <div className="bg-white p-20 rounded-xl border border-dashed border-meli-black/20 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-meli-gray-light rounded-full flex items-center justify-center mb-6">
                    <Search className="w-8 h-8 opacity-20" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sin Análisis Generado</h3>
                  <p className="text-sm opacity-40 max-w-xs">Haz clic en "Generar Deep Dive" para ver el detalle de esta etapa.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Initial Empty State */}
          {!report && spendSupplier.length === 0 && (
            <div className="bg-white p-20 rounded-xl border border-dashed border-meli-black/20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-meli-gray-light rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 opacity-20" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sin Datos Cargados</h3>
              <p className="text-sm opacity-40 max-w-xs">Define tu categoría y carga tu Excel para comenzar el análisis.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-meli-black/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 opacity-40">
          <BarChart3 className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Strategic Sourcing Intelligence v1.0 | Mercado Libre</span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Política de Privacidad</a>
          <a href="#" className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Términos de Servicio</a>
          <a href="#" className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">Soporte</a>
        </div>
      </footer>
      {/* Sourcing 2026 Modal Overlay */}
      <AnimatePresence>
        {showCategoryPlanModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-meli-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-meli-black/5 flex justify-between items-center bg-meli-yellow shrink-0">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-meli-black" />
                  <h3 className="text-2xl font-bold italic font-serif tracking-tight text-meli-black">Sourcing 2026</h3>
                </div>
                <button 
                  onClick={() => setShowCategoryPlanModal(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-meli-black" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto space-y-8">
                {/* General Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Nombre del Proyecto</label>
                    <input 
                      type="text" 
                      value={categoryPlan.projectName}
                      onChange={(e) => setCategoryPlan({...categoryPlan, projectName: e.target.value})}
                      className="w-full px-4 py-3 bg-meli-gray-light/30 border border-meli-black/5 rounded-xl focus:ring-2 focus:ring-meli-yellow outline-none transition-all font-bold"
                      placeholder="Ej: Renovación de Flota"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Área</label>
                    <input 
                      type="text" 
                      value={categoryPlan.area}
                      onChange={(e) => setCategoryPlan({...categoryPlan, area: e.target.value})}
                      className="w-full px-4 py-3 bg-meli-gray-light/30 border border-meli-black/5 rounded-xl focus:ring-2 focus:ring-meli-yellow outline-none transition-all font-bold"
                      placeholder="Ej: Logística"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Deadline</label>
                    <input 
                      type="text" 
                      value={categoryPlan.deadline}
                      onChange={(e) => setCategoryPlan({...categoryPlan, deadline: e.target.value})}
                      className="w-full px-4 py-3 bg-meli-gray-light/30 border border-meli-black/5 rounded-xl focus:ring-2 focus:ring-meli-yellow outline-none transition-all font-bold"
                      placeholder="Ej: Q3 2026"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Ahorro Esperado</label>
                    <input 
                      type="text" 
                      value={categoryPlan.expectedSavings}
                      onChange={(e) => setCategoryPlan({...categoryPlan, expectedSavings: e.target.value})}
                      className="w-full px-4 py-3 bg-meli-gray-light/30 border border-meli-black/5 rounded-xl focus:ring-2 focus:ring-meli-yellow outline-none transition-all font-bold"
                      placeholder="Ej: 15% TCO"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Objetivos</label>
                    <textarea 
                      value={categoryPlan.objectives}
                      onChange={(e) => setCategoryPlan({...categoryPlan, objectives: e.target.value})}
                      className="w-full px-4 py-3 bg-meli-gray-light/30 border border-meli-black/5 rounded-xl focus:ring-2 focus:ring-meli-yellow outline-none transition-all font-bold min-h-[100px]"
                      placeholder="Define los objetivos del proyecto..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Pain Points Actuales</label>
                    <textarea 
                      value={categoryPlan.currentPainPoints}
                      onChange={(e) => setCategoryPlan({...categoryPlan, currentPainPoints: e.target.value})}
                      className="w-full px-4 py-3 bg-meli-gray-light/30 border border-meli-black/5 rounded-xl focus:ring-2 focus:ring-meli-yellow outline-none transition-all font-bold min-h-[100px]"
                      placeholder="¿Qué problemas estamos resolviendo?"
                    />
                  </div>
                </div>

                {/* Materials Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold uppercase tracking-widest opacity-40">Materiales / Servicios</h4>
                    <button onClick={addMaterial} className="p-2 bg-meli-yellow rounded-lg hover:scale-110 transition-transform">
                      <Plus className="w-4 h-4 text-meli-black" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {categoryPlan.materials.map((material, idx) => (
                      <div key={idx} className="p-4 bg-meli-gray-light/20 rounded-2xl border border-meli-black/5 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <label className="text-[8px] font-bold uppercase opacity-40 mb-1 block">Nombre</label>
                          <input 
                            type="text" 
                            value={material.name}
                            onChange={(e) => updateMaterial(idx, 'name', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-meli-black/5 rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-bold uppercase opacity-40 mb-1 block">Presupuesto</label>
                          <input 
                            type="text" 
                            value={material.amount}
                            onChange={(e) => updateMaterial(idx, 'amount', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-meli-black/5 rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-1 mb-1">
                              <label className="text-[8px] font-bold uppercase opacity-40 block">Riesgo (1-10)</label>
                              <div className="group relative">
                                <HelpCircle className="w-2 h-2 opacity-30 cursor-help" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-meli-black text-white text-[8px] rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                  Es la dificultad de conseguir un producto porque hay pocos proveedores o no tiene sustitutos. Su objetivo es medir qué tan expuesta está tu empresa a quedarse sin stock y sufrir un paro operativo.
                                </div>
                              </div>
                            </div>
                            <input 
                              type="number" 
                              min="1" max="10"
                              value={material.supplyRisk}
                              onChange={(e) => updateMaterial(idx, 'supplyRisk', Number(e.target.value))}
                              className="w-full px-3 py-2 bg-white border border-meli-black/5 rounded-lg text-xs font-bold"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 mb-1">
                              <label className="text-[8px] font-bold uppercase opacity-40 block">Impacto (1-10)</label>
                              <div className="group relative">
                                <HelpCircle className="w-2 h-2 opacity-30 cursor-help" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-meli-black text-white text-[8px] rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                  Es el impacto económico que tiene un insumo en tus ganancias y costos finales. Mide cuánto dinero perdería tu empresa si el precio sube o si el producto deja de venderse por falta de esa pieza.
                                </div>
                              </div>
                            </div>
                            <input 
                              type="number" 
                              min="1" max="10"
                              value={material.profitImpact}
                              onChange={(e) => updateMaterial(idx, 'profitImpact', Number(e.target.value))}
                              className="w-full px-3 py-2 bg-white border border-meli-black/5 rounded-lg text-xs font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suppliers Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold uppercase tracking-widest opacity-40">Proveedores</h4>
                    <button onClick={addPlanSupplier} className="p-2 bg-meli-yellow rounded-lg hover:scale-110 transition-transform">
                      <Plus className="w-4 h-4 text-meli-black" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {categoryPlan.suppliers.map((supplier, idx) => (
                      <div key={idx} className="p-4 bg-meli-gray-light/20 rounded-2xl border border-meli-black/5 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                          <label className="text-[8px] font-bold uppercase opacity-40 mb-1 block">Nombre</label>
                          <input 
                            type="text" 
                            value={supplier.name}
                            onChange={(e) => updatePlanSupplier(idx, 'name', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-meli-black/5 rounded-lg text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-bold uppercase opacity-40 mb-1 block">Costo del Material/Servicio</label>
                          <input 
                            type="text" 
                            value={supplier.cost}
                            onChange={(e) => updatePlanSupplier(idx, 'cost', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-meli-black/5 rounded-lg text-xs font-bold"
                            placeholder="$ 0.00"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-bold uppercase opacity-40 mb-1 block">Tipo</label>
                          <select 
                            value={supplier.supplierType}
                            onChange={(e) => updatePlanSupplier(idx, 'supplierType', e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-meli-black/5 rounded-lg text-xs font-bold"
                          >
                            <option value="Local">Local</option>
                            <option value="Regional">Regional</option>
                            <option value="Global">Global</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    handleStartDashboard(true);
                    setShowCategoryPlanModal(false);
                  }}
                  className="w-full py-5 bg-meli-black text-white rounded-2xl font-bold hover:bg-meli-black/90 transition-all shadow-xl flex items-center justify-center gap-3 text-lg shrink-0"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Actualizar Estrategia 2026
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Phase Details Modal */}
      <AnimatePresence>
        {selectedPhase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhase(null)}
              className="absolute inset-0 bg-meli-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-meli-yellow p-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-meli-black rounded-2xl text-meli-yellow shadow-lg">
                    {selectedPhase.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-meli-black/60">Fase {selectedPhase.id}</p>
                    <h3 className="text-xl font-black text-meli-black leading-tight">{selectedPhase.title}</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPhase(null)}
                  className="p-2 hover:bg-meli-black/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-meli-black" />
                </button>
              </div>
              <div className="p-8">
                <div className="prose prose-sm max-w-none">
                  <div className="p-6 bg-meli-gray-light/30 rounded-2xl border border-meli-black/5">
                    <p className="text-sm text-meli-black/80 leading-relaxed font-medium whitespace-pre-line">
                      {selectedPhase.details}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPhase(null)}
                  className="w-full mt-8 py-4 bg-meli-black text-white rounded-2xl font-bold hover:bg-meli-black/90 transition-all"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFeedbackModal(false)}
              className="absolute inset-0 bg-meli-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-4xl bg-meli-yellow rounded-[40px] overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header elements from image */}
              <div className="absolute top-8 left-8">
                <div className="bg-meli-black px-6 py-2 rounded-full">
                  <span className="text-meli-yellow text-xs font-black tracking-[0.2em]">ENVÍOS</span>
                </div>
              </div>
              <div className="absolute top-8 right-8">
                <img src={MELI_LOGO} alt="Mercado Libre" className="h-8" referrerPolicy="no-referrer" />
              </div>

              <div className="p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-12">
                {/* Left side: Speech bubbles */}
                <div className="lg:w-1/2 relative flex justify-center">
                  <div className="relative w-48 h-48 lg:w-64 lg:h-64">
                    {/* Recreating the speech bubbles with icons or stylized divs */}
                    <div className="absolute top-0 left-0 w-32 h-32 lg:w-48 lg:h-48 bg-meli-yellow border-4 lg:border-8 border-white/20 rounded-[40px] lg:rounded-[60px] shadow-2xl flex items-center justify-center">
                       <div className="flex gap-2">
                         <div className="w-2 h-2 lg:w-4 lg:h-4 rounded-full bg-meli-black/20" />
                         <div className="w-2 h-2 lg:w-4 lg:h-4 rounded-full bg-meli-black/20" />
                         <div className="w-2 h-2 lg:w-4 lg:h-4 rounded-full bg-meli-black/20" />
                       </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 lg:w-48 lg:h-48 bg-meli-yellow border-4 lg:border-8 border-white/20 rounded-[40px] lg:rounded-[60px] shadow-2xl flex items-center justify-center translate-x-4 translate-y-4">
                       <div className="flex gap-2">
                         <div className="w-2 h-2 lg:w-4 lg:h-4 rounded-full bg-meli-black/20" />
                         <div className="w-2 h-2 lg:w-4 lg:h-4 rounded-full bg-meli-black/20" />
                         <div className="w-2 h-2 lg:w-4 lg:h-4 rounded-full bg-meli-black/20" />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Text */}
                <div className="lg:w-1/2 text-center lg:text-left space-y-6">
                  <h2 className="text-4xl lg:text-6xl font-black text-meli-black leading-tight tracking-tighter">
                    Strategic Sourcing Guidelines
                  </h2>
                  <div className="flex flex-col lg:flex-row items-center lg:items-end gap-4 lg:gap-6">
                    <div className="bg-white px-8 lg:px-12 py-2 lg:py-4 rounded-full shadow-xl">
                      <span className="text-3xl lg:text-5xl font-black text-meli-black">2026</span>
                    </div>
                    <p className="text-sm lg:text-lg font-bold text-meli-black/60">Procurement Regional Shipping</p>
                  </div>
                  
                  <div className="pt-4 lg:pt-8 space-y-6">
                    <p className="text-lg lg:text-xl font-bold text-meli-black italic">
                      "Esperamos que este sea el inicio de algo grande para ti"
                    </p>
                    <button
                      onClick={handleSendFeedback}
                      className="w-full lg:w-auto bg-meli-black text-meli-yellow px-8 lg:px-12 py-3 lg:py-4 rounded-2xl font-black text-lg lg:text-xl shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3"
                    >
                      <MessageSquare className="w-6 h-6" /> ENVIAR FEEDBACK
                    </button>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button 
                onClick={() => setShowFeedbackModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-meli-black/40" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
