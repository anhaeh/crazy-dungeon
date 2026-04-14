# Crazy Dungeons

## Description

Crazy Dungeons is a small roguelike engine/game built with Vue.js (Vue 2). It serves as a foundation for experimenting with procedurally generated dungeons, hero management, items, enemies, and abilities.

## Features
- Turn-based combat mechanics.
- Procedural dungeon generation.
- Entity system: heroes, monsters, and NPCs (like merchant).
- 4 playable hero classes (Warrior, Mage, Archer, Rogue) with unique stats and abilities.
- Inventory system, supporting various item types (weapons, armor, potions, etc.).
- 3 random themes for dungeons (currently only visual, no gameplay differences).
- Boss fight each 5 levels with unique monsters.
- Skill system with active and passive abilities.
- Viewport-based rendering for performance optimization (more size for desktop mode).
- Integration with Vue Router and Vuex for state management and navigation.
- PWA support (Vue CLI PWA plugin included) — can be installed as an app.
- Desktop UI with responsive design for different screen sizes.

## screenshots
![Mobile](/screens/mobile_mode.png)
![Desktop](/screens/desktop_mode.png)

## Live demo link

https://crazydungeons.web.app/

## Run locally

Requirements:
- Node.js <= 14
- npm

Install dependencies:

```bash
npm install
```

Run the dev server with hot reload:

```bash
npm run serve
```

Build for production (outputs the `dist` folder):

```bash
npm run build
```
