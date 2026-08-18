/* Jeu de démonstration du guide.
 *
 * Entièrement fictif. Le dépôt est public : les captures ne doivent montrer
 * ni chantier réel, ni nom d'agent, ni numéro d'OT en service.
 */

export const EQUIPE = 'EEL Aurillac';   // équipe sans chantier, voir doc/README.md
export const LIGNE  = '4017';           // AURILLAC - GATELLIER 1, référentiel Aurillac

// Dates calées sur un lundi, pour un planning lisible dans le guide
export const DEBUT = '2026-09-07';
export const FIN   = '2026-09-25';

export const FICHE = {
    cdt: 'Martin Dubois',
    cdtSup: 'Claire Perrot',
    start: DEBUT,
    end: FIN,
    consStart: '2026-09-08',
    consEnd: '2026-09-24',
    desc: "Remplacement des chaînes d'ancrage des supports 12 et 13\nReprise des mises à la terre",
    comments: "Accès par le chemin communal, portail à refermer.\nNacelle 20 m réservée pour la semaine 38.",
    ots: ['1600900011', '1600900012'],
    ois: ['TCDEMOAB01']
};

// Avancement : quelques tâches faites, une refusée, le reste en attente
export const ETATS = {
    m1: 'yes', m2: 'yes', p1: 'yes', p2: 'yes',
    o1: 'yes', o2: 'no', r_veh: 'yes',
    pr1: 'yes', pr3: 'yes', pr_panier: 'yes', pr4: 'yes'
};
export const MANUELS = { r_dur: '3 semaines', r_agt: '5' };

export const GITE = {
    payeur: 'Martin Dubois',
    montant: '620',
    lien: 'https://exemple-gite-des-monts.fr',
    coord: '44.9256, 2.4443',
    pers: [
        { nom: 'Martin Dubois', nuits: '10' },
        { nom: 'Claire Perrot', nuits: '10' },
        { nom: 'Bruno Marchand', nuits: '5' }
    ]
};
export const COURSES = {
    payeur: 'Claire Perrot',
    montant: '184.50',
    pers: [{ nom: 'Martin Dubois' }, { nom: 'Claire Perrot' }, { nom: 'Bruno Marchand' }]
};

export const PI = [
    { lib: 'Point de rassemblement', coord: '44.9256, 2.4443' },
    { lib: 'Support 12 — accès', coord: '44.9312, 2.4587' },
    { lib: 'Base travaux', coord: '3 route des Estives, Aurillac' }
];

export const CONTACTS = {
    cats: ['RTE', 'Sous-traitants', 'Secours'],
    liste: [
        { cat: 'RTE', nom: 'Martin Dubois', fonction: 'Chargé de travaux', tel: '06 00 00 00 01', mail: 'martin.dubois@exemple.fr' },
        { cat: 'RTE', nom: 'Claire Perrot', fonction: 'Chargée de consignation', tel: '06 00 00 00 02', mail: '' },
        { cat: 'Sous-traitants', nom: 'Levage du Cantal', fonction: 'Nacelle 20 m', tel: '04 00 00 00 03', mail: 'contact@exemple.fr' },
        { cat: 'Secours', nom: 'SAMU', fonction: 'Urgences', tel: '15', mail: '' }
    ]
};

export const CHARGEMENT = [
    { nom: 'Matériels S37', lien: "https://niamort36-prog.github.io/Inventaire-RTE/?equipe=EL%20Aurillac&panier=1700000000001" },
    { nom: 'Outillages S37', lien: "https://niamort36-prog.github.io/Inventaire-RTE/?equipe=EL%20Aurillac&panier=1700000000002" }
];

export const TECH = {
    pylones: [{
        num: '12', numG: '11', numD: '13',
        param: '1250', temp: '15', vent: '0',
        terre: 'MALT 3 piquets + liaison équipotentielle',
        ev: '1480', ehd: '520', ehg: '460', eld: '980', elg: '940',
        com: "Déposer la chaîne d'ancrage, reposer neuve"
    }],
    portees: [{
        num: '12 - 13', numG: '12', numD: '13',
        param: '1250', temp: '15', vent: '240',
        terre: 'CC en pied de support',
        ev: '0', ehd: '160', ehg: '160', eld: '2450', elg: '2450',
        com: 'Brins dans les bretelles de continuité'
    }]
};

export const MODEOP = [
    {
        titre: "Remplacement de la chaîne d'ancrage du support 12",
        personnes: ['Martin Dubois', 'Bruno Marchand'],
        jourDebut: '2026-09-14', jourFin: '2026-09-18',
        sousTaches: [
            { texte: 'Consignation et pose des MALT', jour: '2026-09-14', demi: 'matin' },
            { texte: 'Levage et dépose de la chaîne', jour: '2026-09-14', demi: 'apm' },
            { texte: 'Pose de la chaîne neuve et réglage', jour: '2026-09-15', demi: '' },
            { texte: 'Contrôle et repli', jour: '2026-09-18', demi: 'apm' }
        ]
    },
    {
        titre: 'Visite préalable et balisage',
        personnes: ['Claire Perrot'],
        jourDebut: '2026-09-07', jourFin: '2026-09-07',
        sousTaches: [{ texte: "Vérifier l'accès et l'état du chemin", jour: '2026-09-07', demi: 'matin' }]
    }
];

export const PLANNING = {
    '2026-09-07': { matin: ['Visite préalable', 'Balisage des accès'], apm: ['Réception du matériel'] },
    '2026-09-08': { matin: ['Consignation'], apm: [] },
    '2026-09-09': { matin: ['Montée des équipes'], apm: ['Contrôle outillage'] }
};

export const NOTES = [
    { auteur: 'Bruno Marchand', texte: "Le portail du chemin communal est parfois fermé, prévoir la clé auprès de la mairie.", fait: false },
    { auteur: 'Claire Perrot', texte: 'Nacelle confirmée pour la semaine 38.', fait: true }
];
