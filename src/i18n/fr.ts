export const fr = {
  // Navigation
  title: "Calculateur d'Impression 3D",
  
  // Sections
  materialCosts: "Coûts des Matériaux",
  timeLabor: "Temps et Main-d'œuvre",
  operatingCosts: "Coûts d'Exploitation",
  extrasCosts: "Extras",
  businessSettings: "Paramètres Business",
  
  // Material Costs
  filamentCostPerKg: "Coût du filament par kilogramme",
  printWeight: "Poids d'impression",
  materialCost: "Coût matériau",
  
  // Time & Labor
  printTime: "Temps d'impression",
  hourlyRate: "Taux horaire (par pièce)",
  hourlyRateGlobal: "Coût main-d'œuvre global",
  laborCost: "Coût main-d'œuvre",
  
  // Operating Costs
  printerWattage: "Puissance de l'imprimante",
  electricityRate: "Tarif électricité",
  wearTearPerHour: "Coût d'usure par heure",
  packagingCost: "Coût d'emballage (par pièce)",
  packagingCostGlobal: "Coût d'emballage (global)",
  electricity: "Électricité",
  wearTear: "Usure",
  packaging: "Emballage",

  // Extras
  cfsWattage: "Puissance du CFS",
  dryingCostPerPrint: "Coût de séchage des boules Sylca (par impression)",
  colorCount: "Nombre de couleurs",
  colorSurchargePerColor: "Surcoût par couleur supplémentaire",
  specificSpoolRequired: "Bobine spécifique requise",
  specificSpoolCost: "Surcoût bobine spécifique",
  extras: "Extras",
  drying: "Séchage",
  colorSurcharge: "Surcoût couleurs",
  spoolSurcharge: "Surcoût bobine",

  // Business Settings
  profitMargin: "Marge bénéficiaire",
  quantity: "Quantité à imprimer",
  profitPerUnit: "Bénéfice par unité",
  
  // Results
  costBreakdown: "Ventilation des Coûts",
  material: "Matériau",
  labor: "Main-d'œuvre",
  totalCost: "Coût Total",
  profit: "Bénéfice",
  sellingPrice: "Prix de Vente",
  recommendedPrice: "Prix Conseillé",
  newProfit: "Nouveau bénéfice",
  perUnit: "par unité",
  batchSummary: "Résumé du Lot",
  totalRevenue: "Chiffre d'Affaires Total",
  totalProfit: "Bénéfice Total",
  batchDiscount: "Remise",
  
  // Business Tips
  businessTips: "Conseils Business",
  tips: [
    "• Considérez le gaspillage de matériau (~5-10%) dans le calcul du filament",
    "• Intégrez les impressions ratées et les réimpressions dans vos prix",
    "• Incluez le temps de post-traitement dans vos calculs de main-d'œuvre",
    "• Considérez offrir des remises de volume pour de grandes quantités",
    "• Révisez et ajustez vos marges selon la concurrence du marché"
  ],
  
  // Units
  units: {
    kilograms: "kg",
    grams: "g",
    hours: "heures",
    watts: "W",
    pieces: "pièces",
    percent: "%",
    colors: "couleurs"
  },
  
  // Settings
  settings: "Paramètres",
  language: "Langue",
  currency: "Devise",
  expandSidebar: "Déplier la navigation",
  collapseSidebar: "Replier la navigation"
} as const;