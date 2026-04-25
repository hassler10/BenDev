# Formation Informatique à Distance - Page d'Inscription

## Concept & Vision

Une page d'inscription élégante et professionnelle pour une formation informatique en ligne. L'expérience utilisateur doit inspirer confiance et modernité, évoquant l'univers tech tout en restant accessible. Le parcours inscription → paiement → accès groupe WhatsApp doit être fluide et transparent.

## Design Language

### Aesthetic Direction
Style "Tech Modern" inspiré des interfaces de cours en ligne comme Udemy/Coursera, avec des touches de neon cyberpunk subtil pour évoquer l'informatique.

### Color Palette
- **Primary**: #6366F1 (Indigo vibrant)
- **Secondary**: #10B981 (Emerald pour success)
- **Accent**: #F59E0B (Amber pour CTAs importants)
- **Background**: #0F172A (Slate dark) avec gradients subtils
- **Surface**: #1E293B (Slate card)
- **Text Primary**: #F8FAFC
- **Text Secondary**: #94A3B8

### Typography
- **Headings**: Inter (bold, tracking tight)
- **Body**: Inter (regular)
- **Code/Tech elements**: JetBrains Mono

### Motion Philosophy
- Transitions douces (300ms ease-out)
- Hover effects subtils avec scale et glow
- Animations d'entrée en stagger
- Validation de formulaire avec feedback visuel immédiat

## Layout & Structure

### Flow Principal
1. **Hero Section**: Présentation de la formation avec avantages clés
2. **Formulaire d'inscription**: Multi-étapes (infos perso → choix formation → paiement)
3. **Confirmation**: Message de succès + lien accès groupe WhatsApp

### Responsive Strategy
- Mobile-first, breakpoints à 640px, 768px, 1024px
- Formulaire adaptatif, stack vertical sur mobile
- Navigation fixe avec progress indicator

## Features & Interactions

### Formulaire Multi-étapes
1. **Étape 1 - Informations personnelles**
   - Nom complet (requis)
   - Email (requis, validation format)
   - Téléphone WhatsApp (requis, format international)
   - Niveau en informatique (select)

2. **Étape 2 - Choix de la formation**
   - Formation sélectionnable avec prix
   - Description courte de chaque formation

3. **Étape 3 - Paiement**
   - Récapitulatif de la commande
   - Simulation de paiement carte bancaire (Stripe-like)
   - Montant à payer affiché clairement

4. **Étape 4 - Confirmation**
   - Message de succès animé
   - Bouton rejoindre groupe WhatsApp
   - Récapitulatif de l'inscription

### Intégration WhatsApp
- Après paiement validé, affichage du lien vers le groupe
- Bouton avec icône WhatsApp
- Message automatique de bienvenue suggéré

### États du formulaire
- Validation en temps réel des champs
- Messages d'erreur explicites
- États de chargement pendant le traitement
- Animation de succès à la complétion

## Component Inventory

### ProgressIndicator
- 4 étapes visualisées
- État actuel surligné
- Animation de progression

### FormInput
- Label flottant
- États: default, focus, valid, error, disabled
- Icône optionnelle

### FormationCard
- Sélectionnable
- État: default, selected, disabled
- Badge prix intégré

### PaymentForm
- Champs carte bancaire stylisés
- Validation format carte
- Bouton payer avec état loading

### SuccessScreen
- Animation checkmark
- Bouton WhatsApp proéminent
- Récapitulatif inscription

## Technical Approach

- **Framework**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State**: React useState/useReducer pour le formulaire multi-étapes
- **Validation**: Regex patterns pour email, téléphone
- **Stripe Elements**: Simulation locale (pas d'intégration backend réelle)
- **WhatsApp**: Lien group开门 avec pré-remplissage du message

### Données stockées (localStorage pour demo)
```typescript
interface Inscription {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  niveau: string;
  formation: string;
  montant: number;
  dateInscription: Date;
  whatsappJoined: boolean;
}
```