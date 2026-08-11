# Design — Navigation latérale repliable (B2)

Date: 2026-08-12

## Contexte

La navigation actuelle est une barre horizontale de 5 liens en haut de
page. Avec l'ajout de la section Extras, le pain point identifié est un
manque de repères&nbsp;: rien n'indique où on en est ni ce que coûte déjà
chaque section pendant qu'on remplit le formulaire.

Plusieurs directions ont été explorées visuellement (stepper numéroté,
sommaire vivant, rail compact, puis des pistes plus radicales : jauge de
coût, palette de commande, dock flottant, minimap). L'option retenue est
**B2 — panneau latéral compact et repliable**&nbsp;: une colonne à gauche
du formulaire, icône + montant par section en mode compact (156px), qui
se déplie sur demande (216px) pour afficher aussi les libellés.

## Layout

Sur desktop (`lg:` et plus, ≥1024px, seuil déjà utilisé ailleurs dans
l'app), l'écran passe de 2 à 3 zones&nbsp;:

```
[ Sidebar B2 ] [ Formulaire (scroll) ] [ Résultats (sticky) ]
   156–216px          flexible               inchangé
```

Sous `lg:`, rien ne change&nbsp;: la barre horizontale actuelle en haut de
page (logo, titre, liens de section, thème, paramètres) reste identique à
aujourd'hui. La sidebar n'existe qu'à partir de `lg:`.

Sur `lg:` et plus, les liens de section disparaissent de la barre du
haut (qui garde logo/titre à gauche, thème/paramètres à droite) et sont
remplacés par la sidebar.

## Composant `SidebarNav`

Nouveau fichier `src/components/navigation/SidebarNav.tsx`, rendu depuis
`Calculator.tsx` uniquement à partir de `lg:` (`hidden lg:flex`).

**Contenu, par section** (Material, Labor, Operating, Extras, Business)&nbsp;:
icône (réutilise l'icône déjà utilisée par chaque section — `Package`,
`Clock`, `Zap`, `Layers`, `DollarSign` — colorée avec la couleur déjà
associée à la section : bleu, vert, orange, sarcelle, violet), montant,
et libellé (visible seulement en mode déplié).

**Montant affiché par section**&nbsp;:
- Material → `results.materialCost`
- Labor → `results.laborCost`
- Operating → `results.electricityCost + results.wearTearCost + values.packagingCost + values.packagingCostGlobal`
- Extras → `results.extrasCost`
- Business → `values.profitMargin` affiché en `%` (pas un montant, comme
  dans les maquettes — Business n'a pas de "coût" propre, c'est un taux)

**États**&nbsp;:
- Section active : mise en évidence (fond teinté), pilotée par
  `activeSection` — déjà exposé par `useNavigation`, aucun changement à
  ce hook.
- Clic sur un item : appelle `scrollToSection(index)` — déjà existant.
- Repli/dépli : bouton en haut de la sidebar, état booléen local au
  composant, persisté dans `localStorage` sous la clé
  `3d-calc-sidebar-expanded`. Par défaut (première visite, rien en
  storage) : replié (156px), conforme à la maquette B2.

## Modifications aux fichiers existants

- `Navigation.tsx` : la liste de liens de section (`sections.map(...)`)
  est masquée à partir de `lg:` (`lg:hidden` sur son conteneur). Le
  reste de la barre (logo, titre, thème, paramètres) ne change pas.
- `Calculator.tsx` : le `<main>` passe d'un simple conteneur `max-w-6xl`
  contenant la grille formulaire/résultats à un flex conteneur
  `hidden lg:flex` pour la sidebar + le contenu existant (grille
  formulaire/résultats inchangée) dans une colonne `flex-1`.

## Hors périmètre

- Aucun changement aux calculs, à `useCalculator`, aux types, ou aux
  autres sections du formulaire.
- Pas de bascule automatique du thème repliée/dépliée selon la taille
  d'écran au-delà du seuil `lg:` déjà utilisé partout ailleurs.
- Les 3 autres directions explorées (jauge de coût, palette de
  commande, dock flottant, minimap) ne sont pas retenues pour cette
  itération.
