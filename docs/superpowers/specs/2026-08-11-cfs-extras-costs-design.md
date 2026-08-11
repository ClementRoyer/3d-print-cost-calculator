# Design — Coûts CFS, séchage, multicouleur et bobine spécifique

Date: 2026-08-11

## Contexte

L'outil calcule aujourd'hui le coût réel d'une impression 3D (matériau,
main-d'œuvre, électricité imprimante, usure, emballage). Il manque trois
coûts propres à un setup avec unité multi-matériaux (CFS) et boules
dessicantes réutilisables (Sylca) :

1. L'électricité consommée par le CFS pendant l'impression.
2. Le coût de régénération périodique des boules Sylca dans un
   déshydrateur.
3. Les surcoûts ponctuels : impression multicouleur et achat d'une
   bobine spécifique non réutilisable.

## Modèle de données

### `CalculationValues` (ajouts)

| Champ | Type | Défaut | Description |
|---|---|---|---|
| `cfsWattage` | number (W) | 30 | Puissance moyenne du CFS pendant l'impression |
| `dryingCostPerPrint` | number (€) | 0.06 | Coût électrique de séchage des boules Sylca, amorti par impression |
| `colorCount` | number | 1 | Nombre de couleurs utilisées dans l'impression |
| `colorSurchargePerColor` | number (€) | 0.50 | Coût par couleur au-delà de la première |
| `isSpecificSpoolRequired` | boolean | false | Une bobine spécifique (non réutilisable) est nécessaire |
| `specificSpoolCost` | number (€) | 0 | Montant du surcoût bobine, appliqué seulement si `isSpecificSpoolRequired` |

### `CalculationResults` (ajouts)

| Champ | Type | Description |
|---|---|---|
| `extrasCost` | number (€) | Somme du séchage + surcoût couleur + surcoût bobine |

`electricityCost` n'a pas de nouveau champ : il intègre directement le
wattage CFS dans son calcul (voir ci-dessous), pour rester cohérent avec
l'affichage existant "Électricité" dans `CostBreakdown` et
`OperatingSection`.

## Logique de calcul (`utils/calculations.ts`)

```
electricityCost = ((printerWattage + cfsWattage) / 1000) × printTime × electricityRate
colorSurcharge  = colorCount > 1 ? (colorCount - 1) × colorSurchargePerColor : 0
spoolSurcharge  = isSpecificSpoolRequired ? specificSpoolCost : 0
extrasCost      = dryingCostPerPrint + colorSurcharge + spoolSurcharge
totalCost       = materialCost + laborCost + electricityCost + wearTearCost
                  + packagingTotal + extrasCost
```

Tous les nouveaux champs numériques suivent le pattern de validation
existant (`Math.max(0, value || 0)` dans `safeValues`). `colorCount` est
borné à un minimum de 1 comme `quantity`.

`sellingPrice` (= `totalCost + profit`) et le total du lot dans
`BatchSummary` (`totalCost × quantity`) héritent du changement sans
modification supplémentaire, car ils dérivent tous deux de `totalCost`.

## UI

### Section Exploitation (`OperatingSection.tsx`)

Ajout du champ `cfsWattage` juste après `printerWattage`, même style
(`InputField`, unité `W`, step `1`).

### Nouvelle section Extras (`ExtrasSection.tsx`)

Nouveau fichier suivant le patron des sections existantes (icône dédiée,
bordure de couleur distincte, bloc de résultat en bas). Contenu :

- `dryingCostPerPrint` — `InputField`, unité €
- `colorCount` — `InputField`, unité "couleurs", step 1, min 1
- `colorSurchargePerColor` — `InputField`, unité €
- `isSpecificSpoolRequired` — case à cocher
- `specificSpoolCost` — `InputField`, unité €, actif seulement si la case
  est cochée (désactivé/grisé sinon, mais toujours affiché)

Placée après la section Exploitation, avant la section Business dans
`Calculator.tsx`.

### Affichage des résultats

- `OperatingSection.tsx` : l'électricité affichée dans le bloc résumé
  inclut déjà le CFS via `results.electricityCost`, aucun changement
  d'affichage nécessaire.
- `ExtrasSection.tsx` : bloc résumé affichant le détail
  (séchage / surcoût couleur / surcoût bobine) et le total `extrasCost`.
- `CostBreakdown.tsx` : nouvelle ligne "Extras" avant le total,
  affichant `results.extrasCost`.

### i18n (`i18n/en.ts`, `i18n/fr.ts`, `i18n/index.ts`)

Nouvelles clés : `extrasCosts` (titre section), `cfsWattage`,
`dryingCostPerPrint`, `colorCount`, `colorSurchargePerColor`,
`specificSpoolRequired`, `specificSpoolCost`, `extras` (label
ventilation), et l'unité `colors` dans `units`.

## Valeurs par défaut

Les valeurs par défaut ci-dessus sont des estimations raisonnables,
ajustables librement par l'utilisateur dans l'interface :

- `cfsWattage` (30 W) : consommation moyenne veille/actif d'une unité
  multi-matériaux type CFS/AMS.
- `dryingCostPerPrint` (0.06 €) : basé sur un déshydrateur ~350 W,
  cycle de 4h, amorti sur 5 impressions, à 0.20 €/kWh.
- `colorSurchargePerColor` (0.50 €) : couvre la purge de matière et le
  temps de changement de couleur supplémentaire.

## Hors périmètre

- Pas de modélisation fine des phases de consommation du CFS (veille,
  changement de couleur) — un wattage moyen simple suffit.
- Pas de calcul automatique de l'amortissement du cycle de séchage
  (nombre d'impressions par cycle, durée) — un montant fixe par
  impression est saisi directement.
- Pas de tests automatisés ajoutés : le projet n'a pas de suite de
  tests existante.
