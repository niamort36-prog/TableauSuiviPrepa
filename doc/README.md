# Sources du guide d'utilisation

Le guide publié est [`Guide-Suivi-Prepa.pdf`](../Guide-Suivi-Prepa.pdf), à la racine du dépôt.
Ce dossier contient de quoi le régénérer entièrement.

| Fichier | Rôle |
|---|---|
| `guide.html` | Le texte et la mise en page du guide |
| `captures/` | Les 17 captures d'écran utilisées |
| `demo.mjs` | Le chantier fictif servant aux captures |
| `shots.mjs` | Crée le chantier de démonstration, prend les captures, puis efface tout |
| `pdf.mjs` | Convertit `guide.html` en PDF A4 paginé |

## Régénérer le guide

Prérequis : Node.js et Microsoft Edge (ou Chrome, en adaptant `channel` dans les deux scripts).

```bash
npm install playwright-core
```

Servir l'application en local, dans une autre console, **depuis la racine du dépôt** :

```bash
python -m http.server 8779
```

Puis, depuis ce dossier :

```bash
node shots.mjs && node pdf.mjs
```

`shots.mjs` crée un chantier fictif dans l'équipe **EEL Aurillac**, prend les 17 captures,
puis le supprime. Il affiche en fin d'exécution le nombre de chantiers restants dans cette
équipe : il doit être à zéro, sans quoi le script sort en erreur.

Vérifiez que le port est bien libre avant de lancer le serveur : s'il est déjà pris par une
autre application, `python` échoue sans le dire et les captures sont prises sur le mauvais
site. Le script attend `dbLignes`, il échouera donc franchement dans ce cas.

## Trois règles à respecter

**Aucune donnée réelle dans le guide.** Ce dépôt est public. Les captures doivent être prises
sur le jeu fictif de `demo.mjs`, jamais sur un chantier en service : elles y exposeraient des
noms d'agents, des numéros d'OT et des coordonnées de sites.

**Travailler dans une équipe vide.** `shots.mjs` écrit dans la vraie base. Il vise
`EEL Aurillac` parce qu'elle ne porte aucun chantier ; le pointer sur `EEL Limoges` y créerait
puis y supprimerait un chantier au milieu des vrais.

**Vérifier le ménage.** Si le script s'interrompt en cours de route, le chantier de
démonstration reste en base. Son identifiant commence par `ZZGUIDE` : il se repère et se
supprime depuis les archives, ou par une requête sur le nœud `chantiers`.

## Quand mettre le guide à jour

À chaque évolution visible de l'application : nouvel onglet, nouveau bouton, vocabulaire
modifié, règle de calcul changée.

1. Mettre à jour `guide.html` — et `demo.mjs` si la nouveauté a besoin de données pour être
   montrée.
2. Ajouter la capture correspondante dans `shots.mjs`.
3. Relancer `node shots.mjs && node pdf.mjs`.
4. Corriger la date de version sur la page de couverture de `guide.html`.
5. Commiter `doc/` **et** le PDF régénéré à la racine.

Les captures sont renumérotées à chaque exécution : insérer une capture au milieu décale
toutes les suivantes, et `guide.html` doit être corrigé en conséquence.
