# TODO ☺

## 1. CONTRÔLER L'UPLOAD SERVER

`BACKEND`

**DESCR :**

Préparer tous les scénarios utilisateurs possibles avec l'utilisation des APIs; prévoir solution ad hoc pour chaque scenario.

<br>

## 2. Calculer la pause dans logic.js
  
`LOGIC`

**DESCR :**

Sortir la logique capable d'extraire des tables les informations concernant les pauses (dej, ou petites pauses de 30 min) afin de les intégrer dans l'objet employee et de les utiliser.

<br>

# DONE

## 07/04/2023
1. [ARCHITECTURE]  
- Renommage des components & des variables d'état  
2. [UI]  
- Nouveau WeekPicker + rapide et + facile à utiliser  
- Création d'un component unique 'InfoBoard' pour faire passer toutes les notifications (alert/warning/err/menu) sur l'écran; centralisation de tous les visuels dans un seul élément et une seule css.  
- Amélioration globale de l'interface, ajout de transitions CSS  
3. [ARCHITECTURE]  
- Grosse refactorisation du GobalState (avec fonction d'update unique)  
- Subdivision de gros components en plus petits  
- Suppression des fichiers & code inutiles  
4. [BACKEND]  
- Création d'une API pour compter les fichiers présents dans 'public/weeks'  
- Refonte du component Upload  
- Création d'une API pour compter les files  
5. [DEBUG]  
- Fixed le pb de picker une nouvelle semaine qd l'employé actif n'y est plus présent (il a démissionné, il n'est plus présent sur le planning, donc l'app ne doit pas essayer de matcher son nom avec les données qu'elle reçoit)

## 04/04/2023
[SOLVED]

On merging PersonalStats w/ Employee's object by matching employees names.

```
"Cécile" !== "cécile "
```
  
↓ SOLUTION ↓
  ```
  string.trim().toLowerCase
  ```

# Boîte à idées

## fonction 1
notifications par mail ou par sms pour avoir tes dispos de la semaine

## fonction 2
un filtre pour n'afficher que ton nom