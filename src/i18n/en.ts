export const en = {
  // Navigation
  title: "3D Print Calculator",
  
  // Sections
  materialCosts: "Material Costs",
  timeLabor: "Time & Labor",
  operatingCosts: "Operating Costs",
  extrasCosts: "Extras",
  businessSettings: "Business Settings",
  
  // Material Costs
  filamentCostPerKg: "Filament cost per kilogram",
  printWeight: "Print weight",
  materialCost: "Material cost",
  
  // Time & Labor
  printTime: "Print time",
  hourlyRate: "Hourly labor rate (per piece)",
  hourlyRateGlobal: "Global labor cost",
  laborCost: "Labor cost",
  
  // Operating Costs
  printerWattage: "Printer wattage",
  electricityRate: "Electricity rate",
  wearTearPerHour: "Wear & tear cost per hour",
  packagingCost: "Packaging cost (per piece)",
  packagingCostGlobal: "Packaging cost (global)",
  electricity: "Electricity",
  wearTear: "Wear & tear",
  packaging: "Packaging",

  // Extras
  cfsWattage: "CFS wattage",
  dryingCostPerPrint: "Sylca ball drying cost (per print)",
  colorCount: "Number of colors",
  colorSurchargePerColor: "Surcharge per extra color",
  specificSpoolRequired: "Specific spool required",
  specificSpoolCost: "Specific spool surcharge",
  extras: "Extras",
  drying: "Drying",
  colorSurcharge: "Color surcharge",
  spoolSurcharge: "Spool surcharge",

  // Business Settings
  profitMargin: "Profit margin",
  quantity: "Quantity to print",
  profitPerUnit: "Profit per unit",
  
  // Results
  costBreakdown: "Cost Breakdown",
  material: "Material",
  labor: "Labor",
  totalCost: "Total Cost",
  profit: "Profit",
  sellingPrice: "Selling Price",
  recommendedPrice: "Recommended Price",
  newProfit: "New profit",
  perUnit: "per unit",
  batchSummary: "Batch Summary",
  totalRevenue: "Total Revenue",
  totalProfit: "Total Profit",
  batchDiscount: "Discount",
  
  // Business Tips
  businessTips: "Business Tips",
  tips: [
    "• Consider material waste (~5-10%) when calculating filament costs",
    "• Factor in failed prints and reprints in your pricing",
    "• Include post-processing time in your labor calculations",
    "• Consider offering volume discounts for larger quantities",
    "• Review and adjust your profit margins based on market competition"
  ],
  
  // Units
  units: {
    kilograms: "kg",
    grams: "g",
    hours: "hours",
    watts: "W",
    pieces: "pieces",
    percent: "%",
    colors: "colors"
  },
  
  // Settings
  settings: "Settings",
  language: "Language",
  currency: "Currency"
} as const;