# SovereignRO MVP Tracker - Notes de direction du projet

Ce fichier sert de mémoire du projet. Il résume les décisions prises, la structure de données choisie et ce qui reste à faire. À garder à jour au fil des sessions pour ne jamais perdre le fil.

## But du projet

Une app React/Vite pour suivre les respawns des MVP (boss) et mini-boss de Ragnarok Online. Pas une base de données complète de stats/loot, juste l'essentiel pour tracker les spawns: sprite, carte(s), timer de respawn, et un lien vers Divine-Pride pour ceux qui veulent les détails complets.

## Décisions prises (dans l'ordre)

- Pas de Tailwind, tout en CSS custom avec variables de theme (`theme.css`).
- Design basé sur un mockup fourni par l'utilisateur: sidebar sombre/or avec logo texte + nav, header avec titre + cloche, barre de recherche, sections Favorites/Active Hunt avec drop-zones en pointillé, footer avec coeur + texte cursif (police Caveat) + bouton or.
- Sidebar pleine hauteur (100vh), le footer est un enfant de `.content` (pas fixe à l'écran), il respecte le padding du Dashboard plutôt que de toucher les bords de l'écran.
- Page "MVP Database" retirée de la sidebar: on ne construit pas de base de données de stats, seulement le tracker.
- Deux fichiers de données séparés: `src/data/mvps.js` (boss MVP) et `src/data/minibosses.js` (mini-boss), même structure.
- Structure d'une entrée (voir commentaire en tête de `mvps.js` pour le détail à jour):
  - `id`, `name`, `sprite` (import Vite d'un gif local), `divinePrideUrl`
  - `spawns: [{ map, mapType: "open_world"|"instance", special, respawnMin, respawnMax, mapImage }]`
  - Un respawn est TOUJOURS par carte, jamais fusionné entre plusieurs maps (bug corrigé tôt: Baphomet montrait un range fusionné 120-490 au lieu de 120-130 sur une carte et 480-490 sur l'autre).
- Chaque MVP est validé un à la fois contre une capture d'écran Divine-Pride avant d'être ajouté au fichier de données, pour éviter les erreurs de scraping/transcription.
- Sprites et images de cartes sont des assets locaux (pas de hotlink vers Divine-Pride ou ro-mvp.com pour des raisons de droits). Téléchargés une fois via un script PowerShell qui pull depuis `cdn.ro-mvp.com` (`/mobs/{id}.gif` pour les sprites, `/maps/{mapname}.webp` pour les cartes) directement dans `src/assets/sprites` et `src/assets/maps`. Les 168 sprites MVP et 145 images de cartes sont déjà téléchargés et disponibles, prêts à être référencés au fur et à mesure que les entrées de données sont construites.
- Approche de développement: on valide TOUT le pipeline sur 1-2 MVP (on a commencé par Baphomet) avant de scaler à tous les autres. Ça inclut sprite, carte(s), sélecteur de carte si plusieurs spawns, popup carte cliquable avec marqueur tête de mort (☠️) pour indiquer le dernier kill, drag & drop, et un vrai countdown timer.
- Pas de crédit visible pour Divine-Pride dans l'UI (juste le lien `divinePrideUrl` qui pointe vers leur fiche).

## État actuel

- Design du dashboard terminé et validé visuellement par l'utilisateur (sidebar, header, search bar, sections, footer).
- MVP "Baphomet" (id 1039) est le seul actuellement dans `mvps.js`, entièrement validé avec 3 spawns (prt_maze03, gld_dun03, 3@tower/Endless Tower).
- `minibosses.js` existe mais est vide, prêt à recevoir des entrées avec la même structure.
- Composant `MonsterSprite.jsx` créé pour l'affichage du sprite avec fallback emoji si l'image manque/échoue. Bug de fond pâle autour du GIF corrigé (le fond était appliqué inconditionnellement dans le CSS, maintenant seulement en cas de fallback via `.monster-sprite--fallback`).
- 168 sprites GIF et 145 images de cartes WEBP déjà téléchargés dans `src/assets/`.

## À faire (dans l'ordre prévu)

1. Confirmer que le fix du fond pâle du sprite Baphomet est bon une fois testé en local (`npm run dev`).
2. Popup de carte cliquable: clic sur la carte ouvre une popup où on peut placer un marqueur ☠️ pour indiquer l'emplacement du dernier kill.
3. Sélecteur de carte quand un MVP a plusieurs spawns (le bouton Map dans TimerCard a déjà `title="Choose last kill map"` mais pas encore de fonction).
4. Drag & drop (dnd-kit déjà installé en dépendance, pas encore branché).
5. Vrai countdown timer (actuellement TimerCard affiche un "00:00:00" statique).
6. Persistance des données (dexie déjà installé en dépendance, pas encore utilisé) pour garder les derniers kills / états de timer entre les sessions.
7. Une fois Baphomet 100% fonctionnel avec toutes les features ci-dessus, répliquer le même processus de validation (capture Divine-Pride + structure per-map) pour les autres MVP et mini-boss, un par un.

## Méthode pour les MVP manquants de ro-mvp.com (ex: Ultra Limacina / 21537)

Certains MVP ne sont pas sur ro-mvp.com (sprite et/ou carte absents du CDN). Pipeline alternatif validé avec Ultra Limacina:

- Sprite: extraire depuis le client RO du joueur avec GRF Editor (`data.grf`/`rdata.grf`). Ouvrir le `.act` du mob dans l'onglet Animation preview pour confirmer le nom de l'action (ex: "Idle") et son nombre de frames exact. Exporter les frames en `.bmp` individuels. Ces BMP ont un fond uni (pas de vraie transparence, format BMP oblige) qu'il faut détecter et rendre transparent par script (couleur de fond lue au pixel (0,0), tolérance ~10). Aligner les frames sur un canvas commun par le bas (bottom-anchored) avant d'assembler en GIF, sinon le sprite "saute" verticalement d'une frame à l'autre à cause des tailles de canvas différentes par frame.
- Carte: si absente de cdn.ro-mvp.com (404), le fichier `.gat` du client RO (trouvable dans le même GRF) contient les données de terrain brutes (grille de cases, 20 bytes/case: 4 floats de hauteur + 1 int de type). On peut le décoder par script et générer une image dans le même style que les cartes existantes (fond gris foncé `rgb(58,58,58)`, zones marchables en gris clair `rgb(170,170,170)`), puis flip vertical (l'axe Y du `.gat` est inversé par rapport à une image) et resize à 384x384 pour matcher le format des autres cartes. Attention: le point rouge visible sur les cartes ro-mvp.com est un warp portal, PAS la position du MVP. Ne jamais en ajouter un par supposition, la position du dernier kill sera marquée par le joueur lui-même via la fonctionnalité tête de mort (☠️).
- Respawn: donné directement par l'utilisateur en langage courant (ex: "1x 6h" = 360 minutes fixes, min=max=360), pas besoin de capture Divine-Pride si l'utilisateur connaît déjà le chiffre.

## Pièges déjà rencontrés (pour ne pas retomber dedans)

- Le scraping automatique (WebFetch) peut fusionner des ranges de respawn entre plusieurs cartes ou halluciner des maps qui n'existent pas. Toujours valider avec une capture d'écran fournie par l'utilisateur avant d'ajouter une entrée.
- Le sandbox de développement bloque les requêtes réseau directes (curl/Bash) vers Google Fonts, Divine-Pride, cdn.ro-mvp.com (403). C'est une restriction du sandbox, pas un signe que le site est down. Les scripts PowerShell/téléchargements se font depuis la machine de l'utilisateur, pas depuis le sandbox.
- Ne jamais mettre un `background` CSS inconditionnel sur un conteneur de sprite transparent, ça crée un halo visible même si le GIF a une vraie transparence alpha.
