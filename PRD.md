# Product Requirements Document (PRD)
## Quiz EcoSol Blagnac 2026

**Version:** 1.0  
**Date:** 2025  
**Auteur:** Équipe EcoSol Blagnac  
**Statut:** ✅ Implémenté

---

## 1. Vue d'ensemble

### 1.1 Résumé exécutif

Le Quiz EcoSol Blagnac 2026 est une application web interactive conçue pour permettre aux citoyens de Blagnac de découvrir leur niveau de compatibilité avec le programme politique d'EcoSol pour les élections municipales de 2026. L'application utilise un format de quiz moderne inspiré des applications de rencontre (style "swipe") pour rendre l'expérience engageante et virale.

### 1.2 Contexte et justification

Dans le contexte des élections municipales de Blagnac 2026, EcoSol souhaite :
- **Engager les citoyens** avec son programme de manière interactive et accessible
- **Collecter des contacts** pour la campagne électorale
- **Générer du partage social** pour augmenter la visibilité
- **Éduquer** sur les propositions du programme de manière ludique

### 1.3 Objectifs métier

1. **Engagement citoyen** : Atteindre 1000+ utilisateurs avant les élections
2. **Collecte de contacts** : Collecter au moins 500 emails de citoyens intéressés
3. **Viralité** : Générer 200+ partages sur les réseaux sociaux
4. **Awareness** : Augmenter la notoriété du programme EcoSol auprès des Blagnacais

---

## 2. Utilisateurs cibles

### 2.1 Personas principaux

**Persona 1 : Le Citoyen Engagé**
- Âge : 30-55 ans
- Profil : Habitant de Blagnac, intéressé par la politique locale
- Besoin : Comprendre rapidement les propositions du programme
- Objectif : Se faire une opinion avant de voter

**Persona 2 : Le Jeune Actif**
- Âge : 18-35 ans
- Profil : Utilisateur régulier des réseaux sociaux, sensible aux enjeux écologiques
- Besoin : Expérience rapide et moderne
- Objectif : Partager son résultat et engager ses amis

**Persona 3 : Le Sceptique**
- Âge : 40-65 ans
- Profil : Habitant de longue date, méfiant des promesses électorales
- Besoin : Voir des propositions concrètes et détaillées
- Objectif : Vérifier la cohérence du programme

### 2.2 Scénarios d'utilisation

1. **Découverte via réseaux sociaux** : Un utilisateur voit un partage sur Facebook/Twitter et clique
2. **Recherche d'information** : Un citoyen cherche des infos sur le programme EcoSol
3. **Engagement militant** : Un sympathisant partage le quiz pour sensibiliser son réseau

---

## 3. Fonctionnalités

### 3.1 Fonctionnalités principales

#### 3.1.1 Quiz interactif avec système de swipe

**Description :**
- Présentation de 18 questions une par une
- Format carte avec animation de swipe
- 3 options de réponse : "Pas d'accord" (gauche), "Neutre" (centre), "D'accord" (droite)

**Spécifications :**
- Animations fluides avec Framer Motion
- Transitions entre questions avec effets visuels (rotation, translation)
- Indicateur de progression (pourcentage et numéro de question)
- Affichage du thème de chaque question (badge coloré)

**Critères d'acceptation :**
- ✅ Animation fluide sans lag
- ✅ Responsive sur mobile et desktop
- ✅ Accessible (navigation clavier possible)

#### 3.1.2 Système de scoring

**Description :**
- Calcul automatique du score basé sur les réponses
- Système de points :
  - "D'accord" = 1 point
  - "Neutre" = 0.5 point
  - "Pas d'accord" = 0 point
- Score final exprimé en pourcentage (0-100%)

**Critères d'acceptation :**
- ✅ Calcul précis du score
- ✅ Affichage du pourcentage final
- ✅ Messages personnalisés selon le score

#### 3.1.3 Écran de résultats

**Description :**
- Affichage du score final avec graphique circulaire animé
- Messages personnalisés selon 3 catégories :
  - **≥ 80%** : "C'est un Match ! 💚" (vert)
  - **≥ 50%** : "On est sur la bonne voie ! 🤔" (bleu)
  - **< 50%** : "Des avis divergents..." (orange)
- Effet confetti pour les scores > 50%

**Critères d'acceptation :**
- ✅ Graphique animé et lisible
- ✅ Messages adaptés au score
- ✅ Effet confetti fonctionnel

#### 3.1.4 Collecte d'email

**Description :**
- Formulaire d'inscription après les résultats
- Champ email obligatoire avec validation
- Message de confirmation après soumission
- Stockage des emails (actuellement console.log, à connecter à une API)

**Critères d'acceptation :**
- ✅ Validation du format email
- ✅ Message de confirmation visible
- ✅ Intégration future avec service d'emailing (Formspree/Brevo)

#### 3.1.5 Partage social

**Description :**
- Bouton de partage avec texte personnalisé incluant le score
- Support de l'API Web Share (mobile)
- Fallback : copie dans le presse-papier (desktop)
- Lien vers le programme complet

**Critères d'acceptation :**
- ✅ Partage fonctionnel sur mobile et desktop
- ✅ Texte de partage inclut le score
- ✅ Lien vers le site principal

### 3.2 Fonctionnalités secondaires

#### 3.2.1 Design responsive
- Adaptation mobile-first
- Support tablette et desktop
- Interface tactile optimisée

#### 3.2.2 Performance
- Chargement rapide (< 3s)
- Animations fluides (60fps)
- Optimisation des images et assets

---

## 4. Contenu et données

### 4.1 Structure des questions

**Format :**
```typescript
{
  id: number;
  theme: string;      // Démocratie, Écologie, Social, Urbanisme, Sécurité, Mobilité
  text: string;       // Question posée à l'utilisateur
  details: string;    // Explication du programme EcoSol (non affichée actuellement)
}
```

### 4.2 Thèmes couverts

1. **Démocratie** (3 questions)
   - Budgets participatifs
   - Référendum d'initiative citoyenne (RIC)
   - Assemblées citoyennes

2. **Écologie** (3 questions)
   - Zéro artificialisation nette
   - Gestion publique de l'eau
   - Végétalisation urbaine

3. **Social** (3 questions)
   - Cantines bio et locales
   - Maisons communes
   - Mobilité solidaire

4. **Urbanisme** (3 questions)
   - Limitation de la construction
   - Bail réel solidaire
   - Aide à la rénovation thermique

5. **Sécurité** (3 questions)
   - Présence humaine vs vidéosurveillance
   - Accueil des victimes de violences
   - Apprentissage de la natation

6. **Mobilité** (3 questions)
   - Rues aux écoles
   - Réseau vélo sécurisé
   - Renforcement des transports en commun

**Total : 18 questions**

### 4.3 Messages de résultats

**Score ≥ 80% :**
- Titre : "C'est un Match ! 💚"
- Texte : "Vous êtes totalement en phase avec le programme EcoSol. Blagnac a besoin de vous !"
- Couleur : Vert

**Score ≥ 50% :**
- Titre : "On est sur la bonne voie ! 🤔"
- Texte : "Vous partagez l'essentiel de nos valeurs pour un Blagnac plus vert et solidaire."
- Couleur : Bleu

**Score < 50% :**
- Titre : "Des avis divergents..."
- Texte : "C'est ça la démocratie ! Certaines de nos propositions pourraient quand même vous surprendre."
- Couleur : Orange

---

## 5. Spécifications techniques

### 5.1 Stack technique

**Frontend :**
- **Framework** : Next.js 14 (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Icônes** : Lucide React
- **Effets** : Canvas Confetti

**Déploiement :**
- **Plateforme** : Vercel
- **Build** : Next.js production build
- **Domaine** : À configurer (ex: quiz.blagnac-ecosol-2026.fr)

### 5.2 Architecture

```
blagnac-ecosol-quiz/
├── src/
│   └── app/
│       ├── data.ts          # Questions et données
│       ├── page.tsx         # Composant principal
│       ├── layout.tsx       # Layout global
│       └── globals.css      # Styles globaux
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

### 5.3 État de l'application

**State management :**
- `currentIndex` : Index de la question actuelle
- `score` : Score cumulé (0-18)
- `direction` : Direction du swipe (-1, 0, 1)
- `isFinished` : État de fin du quiz
- `email` : Email saisi
- `emailSent` : Confirmation d'envoi

### 5.4 Performance

**Objectifs :**
- First Contentful Paint (FCP) : < 1.5s
- Largest Contentful Paint (LCP) : < 2.5s
- Time to Interactive (TTI) : < 3.5s
- Cumulative Layout Shift (CLS) : < 0.1

**Optimisations :**
- Code splitting automatique (Next.js)
- Images optimisées
- CSS purgé (Tailwind)
- Animations GPU-accelerated

### 5.5 Accessibilité

**Standards :**
- WCAG 2.1 Level AA
- Navigation clavier fonctionnelle
- Contraste des couleurs suffisant
- Labels ARIA appropriés

---

## 6. Design et UX

### 6.1 Identité visuelle

**Couleurs principales :**
- Vert : `#16a34a` (green-600) - Thème écologique
- Bleu : `#2563eb` (blue-600) - Score moyen
- Orange : `#ea580c` (orange-600) - Score faible
- Fond dégradé : `from-green-500 to-teal-700`

**Typographie :**
- Police système (sans-serif)
- Tailles : xs, sm, base, lg, xl, 2xl
- Poids : medium, bold, black

### 6.2 Composants UI

**Carte de question :**
- Fond blanc, ombre portée
- Badge de thème coloré
- Texte de question en gras
- Footer avec branding

**Boutons d'action :**
- Cercle blanc avec icône
- Effet hover et active
- Labels textuels en dessous

**Écran de résultats :**
- Carte blanche centrée
- Graphique circulaire animé
- Formulaire email intégré
- Boutons d'action secondaires

### 6.3 Animations

**Transitions :**
- Swipe : Translation + rotation
- Changement de question : Scale + fade
- Graphique : Stroke animation (1s)
- Confetti : Particules animées

**Timing :**
- Swipe : 200ms delay + spring animation
- Confetti : 300ms delay après fin du quiz

---

## 7. Intégrations futures

### 7.1 Collecte d'emails

**Option 1 : Formspree**
- Service gratuit jusqu'à 50 soumissions/mois
- Configuration simple via URL
- Webhook disponible

**Option 2 : Brevo (ex-Sendinblue)**
- API REST
- Gestion de listes de contacts
- Automatisation d'emails

**Option 3 : Google Sheets**
- API Google Sheets
- Stockage direct dans spreadsheet
- Gratuit et simple

### 7.2 Analytics

**À implémenter :**
- Google Analytics 4
- Suivi des conversions (completions)
- Heatmaps (Hotjar)
- A/B testing des messages

### 7.3 Améliorations possibles

**Phase 2 :**
- Affichage des détails du programme après chaque question
- Comparaison avec d'autres listes
- Export PDF du résultat
- Mode sombre
- Multilingue (français/anglais)

---

## 8. Métriques de succès

### 8.1 KPIs principaux

1. **Taux de complétion** : % d'utilisateurs qui finissent le quiz
   - Objectif : > 60%

2. **Taux de conversion email** : % qui laissent leur email
   - Objectif : > 40%

3. **Taux de partage** : % qui partagent leur résultat
   - Objectif : > 20%

4. **Temps moyen de session** : Durée moyenne du quiz
   - Objectif : 3-5 minutes

5. **Score moyen** : Score moyen des utilisateurs
   - Objectif : 50-70% (engagement positif)

### 8.2 Métriques techniques

- **Taux d'erreur** : < 1%
- **Temps de chargement** : < 3s
- **Taux de rebond** : < 30%
- **Pages vues** : Objectif 5000+ avant élections

### 8.3 Métriques business

- **Emails collectés** : 500+ avant élections
- **Partages sociaux** : 200+ avant élections
- **Visiteurs uniques** : 1000+ avant élections

---

## 9. Risques et contraintes

### 9.1 Risques techniques

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Problèmes de performance | Faible | Moyen | Optimisation continue, monitoring |
| Bugs de scoring | Faible | Élevé | Tests unitaires, validation |
| Problèmes de déploiement | Moyen | Moyen | CI/CD, tests de staging |

### 9.2 Contraintes

- **Budget** : Hébergement gratuit (Vercel)
- **Délai** : Lancement avant campagne électorale
- **Ressources** : Équipe limitée
- **Conformité** : RGPD pour collecte d'emails

### 9.3 Dépendances

- Service d'emailing (Formspree/Brevo)
- Domaine personnalisé (optionnel)
- Analytics (Google Analytics)

---

## 10. Roadmap

### 10.1 Phase 1 : MVP (✅ Complété)

- [x] Quiz interactif avec 18 questions
- [x] Système de scoring
- [x] Écran de résultats
- [x] Formulaire email (simulation)
- [x] Partage social
- [x] Déploiement sur Vercel

### 10.2 Phase 2 : Améliorations (À planifier)

- [ ] Intégration service emailing réel
- [ ] Analytics (GA4)
- [ ] Tests A/B des messages
- [ ] Optimisation SEO
- [ ] Mode sombre

### 10.3 Phase 3 : Features avancées (Futur)

- [ ] Comparaison avec autres listes
- [ ] Export PDF
- [ ] Multilingue
- [ ] Dashboard admin pour statistiques
- [ ] Notifications push pour résultats

---

## 11. Glossaire

- **PRD** : Product Requirements Document
- **MVP** : Minimum Viable Product
- **KPI** : Key Performance Indicator
- **RIC** : Référendum d'Initiative Citoyenne
- **ZAN** : Zéro Artificialisation Nette
- **BRS** : Bail Réel Solidaire
- **FCP** : First Contentful Paint
- **LCP** : Largest Contentful Paint
- **CLS** : Cumulative Layout Shift

---

## 12. Références

- **Repository GitHub** : https://github.com/Fasterious/blagnac-ecosol-quiz
- **Documentation Next.js** : https://nextjs.org/docs
- **Documentation Tailwind** : https://tailwindcss.com/docs
- **Documentation Framer Motion** : https://www.framer.com/motion/

---

**Document créé le :** 2025  
**Dernière mise à jour :** 2025  
**Version :** 1.0

