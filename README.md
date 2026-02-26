David Grondin BDML1

# Rapport de Projet : Générateur Dynamique de Besoins en Protéines

## Objectif du Projet
Conception et développement d'une application web interactive en **React (TypeScript)** permettant de générer dynamiquement un tableau des besoins journaliers en protéines. L'application calcule ces besoins en fonction d'une plage de poids et d'objectifs sportifs spécifiques, conformément aux recommandations nutritionnelles standard.

---

## Stack Technique & Architecture
* **Frontend :** React (Hooks : `useState`)
* **Langage :** TypeScript (Typage strict des états et des fonctions)
* **Styling :** CSS natif (Design moderne, responsive, inspiré de Tailwind CSS)
* **Architecture des fichiers :** Séparation claire des responsabilités (Séparation de la logique de calcul, des données statiques et de l'interface graphique).
  * `src/App.tsx` : Composant principal et gestion de l'état (UI).
  * `src/data/proteinGuidelines.ts` : Source de vérité des constantes et recommandations.
  * `src/utils/calculations.ts` : Fonctions pures pour la logique mathématique.

---

## Fonctionnalités Implémentées (Cahier des charges)

### 1. Paramétrage Dynamique
* Saisie du **poids minimum** et du **poids maximum**.
* Choix du **nombre de lignes** à générer pour définir le pas (step) de calcul.
* Le tableau de rendu se calcule automatiquement sans aucune donnée codée en dur (hardcodée).

### 2. Sélection Multicritères
* Sélection d'un ou plusieurs objectifs sportifs via des cases à cocher (Sédentaire, Endurance, Conservation, Prise de masse).
* Rendu conditionnel : le tableau et les options d'export ne s'affichent que si au moins un objectif est sélectionné et que les données sont valides.

### 3. Calculs et Formatage
* Algorithme calculant l'intervalle exact pour chaque ligne de poids générée.
* Formatage strict des données de sortie (ex : `112 – 126 g/jour`).

---

## Fonctionnalités Bonus (Réalisées)

Afin d'offrir une expérience utilisateur (UX) optimale et une application robuste, l'intégralité des bonus proposés a été implémentée :

* **Validation des champs (Gestion des erreurs) :** L'application empêche la génération du tableau et affiche des messages d'erreur clairs si :
  * Les poids saisis sont négatifs ou nuls.
  * Le poids minimum est supérieur ou égal au poids maximum.
  * Le nombre de lignes demandé est inférieur à 2.

* **Exportation des données (CSV) :** Intégration d'un bouton permettant de télécharger le tableau généré au format `.csv`. Le fichier est encodé en UTF-8 (`\uFEFF`) et utilise le séparateur point-virgule (`;`) pour garantir une compatibilité parfaite avec Microsoft Excel en version française.

* **Responsive Design :** L'interface est entièrement fluide. Sur les écrans de taille réduite (smartphones), les champs de saisie s'empilent proprement et le tableau est encapsulé dans un conteneur permettant un défilement horizontal (`overflow-x: auto`), évitant ainsi de casser la mise en page.

---

## Design et UI
L'interface a été conçue pour être minimaliste et intuitive :
* Utilisation d'une palette de couleurs douces et contrastées (Slate, Blue, Emerald).
* Regroupement des contrôles dans des composants visuels type "cartes" avec des ombres légères.
* Retours visuels clairs (boutons interactifs, survol des lignes du tableau, inputs mis en valeur au clic).