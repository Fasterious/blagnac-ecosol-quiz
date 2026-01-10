# Product Requirements Document (PRD)
## Quiz EcoSol Blagnac 2026

**Version:** 1.1  
**Date:** 2025  
**Auteur:** Équipe EcoSol Blagnac  
**Statut:** ✅ Implémenté  
**Dernière mise à jour:** Analyse complète du code - Ajout des fonctionnalités Supabase et corrections

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

#### 3.1.1 Écran d'introduction

**Description :**
- Écran d'accueil avec branding EcoSol Blagnac 2026
- Affichage des dates des élections (15 et 22 mars 2026)
- Description du quiz et de son objectif
- Bouton "Faire le quiz" pour démarrer
- Indication du nombre de questions et durée estimée (14 questions • ~2 minutes)

**Spécifications :**
- Design avec fond dégradé vert/teal
- Animations d'entrée avec Framer Motion
- Responsive et optimisé mobile-first

**Critères d'acceptation :**
- ✅ Écran d'intro fonctionnel et engageant
- ✅ Transition fluide vers le quiz
- ✅ Responsive sur tous les appareils

#### 3.1.2 Quiz interactif avec système de swipe et boutons manuels

**Description :**
- Présentation de 14 questions une par une
- Format carte avec animation de swipe (prévu pour interactions tactiles)
- 3 options de réponse : "Pas d'accord" (gauche/orange), "Neutre" (centre/bleu), "D'accord" (droite/vert)
- **Boutons manuels** : Interface avec boutons cliquables pour chaque option (alternative au swipe)
- Indicateur de progression en haut (numéro de question et barre de progression)

**Spécifications :**
- Animations fluides avec Framer Motion
- Transitions entre questions avec effets visuels (scale, fade)
- Indicateur de progression (numéro de question X/14 et barre de progression visuelle)
- Affichage du thème de chaque question (badge coloré selon le thème)
- Boutons de contrôle manuels en bas de l'écran :
  - Bouton "Pas d'accord" (orange) avec icône ThumbsDown
  - Bouton "D'accord" (vert) avec icône ThumbsUp
  - Bouton "Neutre / Je ne sais pas" (bleu) avec icône Minus

**Critères d'acceptation :**
- ✅ Animation fluide sans lag
- ✅ Responsive sur mobile et desktop
- ✅ Boutons manuels fonctionnels
- ✅ Accessible (navigation clavier possible)

#### 3.1.3 Système de scoring

**Description :**
- Calcul automatique du score basé sur les réponses
- Système de points :
  - "D'accord" = 1 point
  - "Neutre" = 0.5 point
  - "Pas d'accord" = 0 point
- Score final exprimé en pourcentage (0-100%) basé sur le total de points / nombre de questions
- Sauvegarde progressive du score dans Supabase à chaque réponse

**Critères d'acceptation :**
- ✅ Calcul précis du score
- ✅ Affichage du pourcentage final
- ✅ Messages personnalisés selon le score
- ✅ Sauvegarde en temps réel dans la base de données

#### 3.1.4 Écran de résultats

**Description :**
- Affichage du score final avec graphique circulaire animé (gauge moderne)
- Messages personnalisés selon 3 catégories :
  - **≥ 80%** : "C'est un Match ! 💚" (vert)
  - **≥ 50%** : "On est sur la bonne voie ! 🤔" (bleu)
  - **< 50%** : "Des avis divergents..." (orange)
- Effet confetti pour les scores > 50%
- **Section "Voir mes réponses"** : Accordéon permettant de consulter toutes les réponses données avec :
  - Thème de chaque question
  - Texte de la question
  - Réponse choisie (D'accord/Pas d'accord/Neutre) avec badge coloré et icône
- Bouton "Recommencer" pour refaire le quiz

**Critères d'acceptation :**
- ✅ Graphique animé et lisible
- ✅ Messages adaptés au score
- ✅ Effet confetti fonctionnel
- ✅ Section détaillée des réponses consultable

#### 3.1.5 Collecte d'email

**Description :**
- Formulaire d'inscription après les résultats
- Champ email obligatoire avec validation
- Message de confirmation après soumission
- **Intégration Supabase** : Stockage des emails directement dans la base de données Supabase
- Association de l'email avec la session de quiz existante
- Fallback : création d'une nouvelle ligne si la session n'existe pas

**Critères d'acceptation :**
- ✅ Validation du format email
- ✅ Message de confirmation visible
- ✅ Stockage dans Supabase fonctionnel
- ✅ Association correcte avec les résultats du quiz

#### 3.1.6 Partage social

**Description :**
- Bouton de partage avec texte personnalisé incluant le score
- Support de l'API Web Share (mobile)
- Fallback : copie dans le presse-papier (desktop)
- Lien vers le programme complet (blagnac-ecosol-2026.fr)
- Indication visuelle "Copié !" après copie

**Critères d'acceptation :**
- ✅ Partage fonctionnel sur mobile et desktop
- ✅ Texte de partage inclut le score
- ✅ Lien vers le site principal
- ✅ Feedback visuel lors de la copie

### 3.2 Fonctionnalités secondaires

#### 3.2.1 Design responsive
- Adaptation mobile-first
- Support tablette et desktop
- Interface tactile optimisée
- Utilisation de `100dvh` pour une hauteur correcte sur mobile

#### 3.2.2 Performance
- Chargement rapide (< 3s)
- Animations fluides (60fps)
- Optimisation des images et assets
- Code splitting automatique (Next.js)

#### 3.2.3 Intégration Supabase (Base de données)

**Description :**
- Sauvegarde automatique des sessions de quiz dans Supabase
- Stockage progressif des réponses (colonnes q1 à q18)
- Collecte de données analytiques :
  - Adresse IP (via API ipify.org)
  - User Agent (device_info)
  - Score final
  - Réponses complètes (array JSON)
  - Email (optionnel, après soumission du formulaire)
- Création d'une session au démarrage du quiz
- Mise à jour progressive à chaque réponse
- Synchronisation finale du score et des réponses

**Structure de la table `quiz_results` :**
- `id` : Identifiant unique de la session
- `device_info` : User Agent du navigateur
- `ip_address` : Adresse IP de l'utilisateur
- `score` : Score final en pourcentage (0-100)
- `answers` : Array JSON des réponses complètes
- `email` : Email de l'utilisateur (optionnel)
- `q1` à `q18` : Réponses individuelles ('agree', 'neutral', 'disagree')
- `created_at` : Timestamp de création

**Critères d'acceptation :**
- ✅ Création de session au démarrage
- ✅ Sauvegarde progressive des réponses
- ✅ Collecte d'email fonctionnelle
- ✅ Gestion des erreurs (fallback si session absente)

---

## 4. Contenu et données

### 4.1 Structure des questions

**Format :**
```typescript
{
  id: number;
  theme: 'Démocratie' | 'Écologie' | 'Social' | 'Urbanisme' | 'Sécurité' | 'Mobilité';
  text: string;       // Question posée à l'utilisateur
  details: string;    // Explication du programme EcoSol (affichée dans la section détails des résultats)
}
```

**Structure des réponses :**
```typescript
{
  questionId: number;
  value: number;      // 0, 0.5, or 1
  choice: 'disagree' | 'neutral' | 'agree';
}
```

**État de l'application :**
```typescript
{
  screen: 'intro' | 'quiz' | 'results';
  currentQuestionIndex: number;
  score: number;
  answers: AnswerRecord[];
  emailCaptured: boolean;
  sessionId?: number | null;
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

3. **Social** (2 questions)
   - Cantines bio et locales
   - Maisons communes

4. **Urbanisme** (2 questions)
   - Bail réel solidaire
   - Aide à la rénovation thermique

5. **Sécurité** (2 questions)
   - Présence humaine vs vidéosurveillance
   - Accueil des victimes de violences

6. **Mobilité** (2 questions)
   - Réseau vélo sécurisé
   - Renforcement des transports en commun

**Total : 14 questions**

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

**Backend / Base de données :**
- **Base de données** : Supabase (PostgreSQL)
- **Client** : @supabase/supabase-js v2.89.0
- **Table principale** : `quiz_results` (stockage des sessions et réponses)

**Utilitaires :**
- **Récupération IP** : API ipify.org (via utils.ts)

**Déploiement :**
- **Plateforme** : Vercel
- **Build** : Next.js production build
- **Domaine** : À configurer (ex: quiz.blagnac-ecosol-2026.fr)

### 5.2 Architecture

```
blagnac-ecosol-quiz/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── QuizCard.tsx     # Composant carte de question
│   │   │   └── Results.tsx       # Composant écran de résultats
│   │   ├── data.ts               # Questions et données (14 questions)
│   │   ├── constants.ts           # Constantes (couleurs thèmes, TOTAL_QUESTIONS)
│   │   ├── types.ts               # Types TypeScript (Question, QuizState, AnswerRecord)
│   │   ├── page.tsx               # Composant principal (logique du quiz)
│   │   ├── layout.tsx             # Layout global (métadonnées SEO)
│   │   └── globals.css            # Styles globaux (Tailwind, optimisations mobile)
│   └── lib/
│       ├── supabase.ts            # Configuration client Supabase
│       └── utils.ts               # Utilitaires (getIpAddress)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

### 5.3 État de l'application

**State management (React useState) :**
- `screen` : Écran actuel ('intro' | 'quiz' | 'results')
- `currentQuestionIndex` : Index de la question actuelle (0-13)
- `score` : Score cumulé (0-14, avec 0.5 pour neutre)
- `answers` : Array des réponses avec questionId, value, choice
- `emailCaptured` : Boolean indiquant si l'email a été saisi
- `sessionId` : ID de la session Supabase (créé au démarrage du quiz)

**Flux de données :**
1. **Intro** → Création session Supabase → **Quiz**
2. **Quiz** → Sauvegarde progressive (q1, q2, ...) → **Results**
3. **Results** → Mise à jour email → Sauvegarde finale

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
- Labels ARIA appropriés (aria-label sur les boutons)
- Prévention de la sélection de texte pendant le drag (CSS no-select)
- Prévention du pull-to-refresh sur mobile (overscroll-behavior-y: contain)

### 5.6 Métadonnées SEO

**Configuration (layout.tsx) :**
- Title : "Quiz EcoSol Blagnac 2026"
- Description : "Découvrez votre compatibilité avec le programme EcoSol pour les municipales 2026 à Blagnac"
- Langue : Français (lang="fr")

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

**✅ Implémenté : Supabase**
- Stockage direct dans la base de données Supabase
- Association avec les résultats du quiz
- Récupération possible via dashboard Supabase ou API
- Conforme RGPD (données hébergées en UE)

**Alternatives (non utilisées actuellement) :**
- **Formspree** : Service gratuit jusqu'à 50 soumissions/mois
- **Brevo (ex-Sendinblue)** : API REST, gestion de listes
- **Google Sheets** : Stockage direct dans spreadsheet

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

- **Supabase** : Base de données et stockage des résultats (✅ Configuré)
- **API ipify.org** : Récupération de l'adresse IP (service externe)
- Domaine personnalisé (optionnel)
- Analytics (Google Analytics) - À configurer

---

## 10. Roadmap

### 10.1 Phase 1 : MVP (✅ Complété)

- [x] Écran d'introduction avec branding
- [x] Quiz interactif avec 14 questions
- [x] Système de scoring avec sauvegarde progressive
- [x] Écran de résultats avec graphique circulaire
- [x] Section "Voir mes réponses" avec accordéon
- [x] Formulaire email avec intégration Supabase
- [x] Partage social (Web Share API + fallback)
- [x] Intégration Supabase (sessions, réponses, emails)
- [x] Collecte d'IP et device_info
- [x] Boutons de contrôle manuels
- [x] Déploiement sur Vercel

### 10.2 Phase 2 : Améliorations (À planifier)

- [ ] Analytics (GA4) pour suivi des conversions
- [ ] Tests A/B des messages de résultats
- [ ] Optimisation SEO (meta tags, Open Graph, Twitter Cards)
- [ ] Mode sombre
- [ ] Dashboard admin Supabase pour visualiser les statistiques
- [ ] Export des données (CSV/Excel) depuis Supabase
- [ ] Notifications email automatiques (via Supabase Edge Functions)

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
- **Supabase** : Plateforme Backend-as-a-Service (BaaS) basée sur PostgreSQL

---

## 12. Références

- **Repository GitHub** : https://github.com/Fasterious/blagnac-ecosol-quiz
- **Documentation Next.js** : https://nextjs.org/docs
- **Documentation Tailwind** : https://tailwindcss.com/docs
- **Documentation Framer Motion** : https://www.framer.com/motion/

---

**Document créé le :** 2025  
**Dernière mise à jour :** 2025 (Analyse complète du code)  
**Version :** 1.1

---

## 13. Notes d'implémentation

### 13.1 Corrections apportées au PRD

Cette version 1.1 du PRD a été mise à jour après analyse complète du code source pour refléter fidèlement l'implémentation actuelle :

1. **Nombre de questions** : Corrigé de 18 à 14 questions (répartition réelle par thème)
2. **Intégration Supabase** : Ajout d'une section complète documentant l'intégration base de données
3. **Écran d'introduction** : Documenté l'écran d'accueil avec branding
4. **Boutons manuels** : Documenté les contrôles manuels en plus du swipe
5. **Section détails** : Documenté la fonctionnalité "Voir mes réponses" dans Results
6. **Architecture** : Structure de fichiers corrigée avec tous les dossiers (components/, lib/)
7. **Types TypeScript** : Structure des données mise à jour (QuizState, AnswerRecord)
8. **Métadonnées** : Documenté les métadonnées SEO dans layout.tsx
9. **Utilitaires** : Mentionné le fichier utils.ts avec getIpAddress()
10. **État de l'application** : Structure complète du state management documentée

### 13.2 Fonctionnalités implémentées non documentées initialement

- ✅ Sauvegarde progressive des réponses dans Supabase (q1 à q18)
- ✅ Collecte d'adresse IP via API externe
- ✅ Gestion des sessions avec ID unique
- ✅ Fallback pour création de ligne si session absente
- ✅ Section accordéon pour voir toutes les réponses
- ✅ Boutons de contrôle manuels (alternative au swipe)
- ✅ Prévention du pull-to-refresh sur mobile

