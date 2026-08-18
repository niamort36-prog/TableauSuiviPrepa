/* Captures d'écran du guide d'utilisation.
 *
 * Tout est pris sur un chantier fictif créé dans « EEL Aurillac » (équipe sans
 * chantier), puis entièrement supprimé : le dépôt est public, aucun chantier
 * réel ne doit apparaître dans le guide.
 */
import { chromium } from 'playwright-core';
import fs from 'fs';
import * as D from './demo.mjs';

const URL = 'http://localhost:8779';
const OUT = 'captures';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
page.on('console', m => { if (m.type() === 'error') console.log('  [page]', m.text().slice(0, 140)); });

const wait = ms => new Promise(r => setTimeout(r, ms));
let n = 0;
async function shot(nom, opts = {}) {
    n++;
    const f = `${OUT}/${String(n).padStart(2, '0')}-${nom}.png`;
    await page.screenshot({ path: f, ...opts });
    console.log('  ->', f);
}
async function shotEl(nom, sel) {
    const el = await page.$(sel);
    if (!el) { console.log('  !! introuvable :', sel); return; }
    n++;
    const f = `${OUT}/${String(n).padStart(2, '0')}-${nom}.png`;
    await el.screenshot({ path: f });
    console.log('  ->', f);
}

console.log('Chargement de l application...');
await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForFunction(() => typeof dbLignes !== 'undefined' && dbLignes.length > 0, { timeout: 60000 });
await wait(1500);

// ------------------------------------------------- Jeu de démo dans l'équipe vide
console.log('Création du chantier de démonstration dans', D.EQUIPE, '...');
const ID_DEMO = await page.evaluate(async (D) => {
    const w = ms => new Promise(r => setTimeout(r, ms));
    changerEquipe(D.EQUIPE);
    await w(3000);

    newItem();
    document.getElementById('inp-equipe').value = D.EQUIPE;
    document.getElementById('inp-line').value = D.LIGNE; updateHeader();
    document.getElementById('inp-cdt').value = D.FICHE.cdt;
    document.getElementById('inp-cdt-sup').value = D.FICHE.cdtSup;
    document.getElementById('inp-start').value = D.FICHE.start;
    document.getElementById('inp-end').value = D.FICHE.end;
    document.getElementById('inp-cons-start').value = D.FICHE.consStart;
    document.getElementById('inp-cons-end').value = D.FICHE.consEnd;
    document.getElementById('inp-desc').value = D.FICHE.desc;
    document.getElementById('inp-comments').value = D.FICHE.comments;
    ots = D.FICHE.ots.slice(); ois = D.FICHE.ois.slice();
    renderTags('ot'); renderTags('oi');

    Object.keys(D.ETATS).forEach(k => { states[k] = D.ETATS[k]; });
    Object.keys(D.MANUELS).forEach(k => { const e = document.getElementById('val-' + k); if (e) e.value = D.MANUELS[k]; });
    refreshUI();

    logi = logiVide();
    Object.assign(logi.gite, D.GITE, { recus: [] });
    Object.assign(logi.courses, D.COURSES, { recus: [] });
    piList = D.PI.map(x => ({ ...x }));
    contacts = normContacts(D.CONTACTS);
    chargement = D.CHARGEMENT.map((c, i) => ({ id: 'p' + i, nom: c.nom, lien: c.lien }));
    tech = normTech(D.TECH);
    modeOp = normModeOp(D.MODEOP);
    notes = D.NOTES.map((x, i) => ({ id: 'n' + i, date: Date.now() - i * 3600000, auteur: x.auteur, texte: x.texte, fait: x.fait }));

    // Le planning est indexé par semaine ISO : on laisse l'application la calculer
    planning = {};
    const sem = listeSemaines();
    if (sem.length) {
        planning[sem[0].cle] = {};
        Object.keys(D.PLANNING).forEach(j => { planning[sem[0].cle][j] = D.PLANNING[j]; });
    }

    const pid = 'ZZGUIDE' + Date.now();
    curId = pid;
    const vraiAlert = window.alert; window.alert = () => {};
    save(false);
    window.alert = vraiAlert;
    await w(2500);
    return pid;
}, {
    EQUIPE: D.EQUIPE, LIGNE: D.LIGNE, FICHE: D.FICHE, ETATS: D.ETATS, MANUELS: D.MANUELS,
    GITE: D.GITE, COURSES: D.COURSES, PI: D.PI, CONTACTS: D.CONTACTS, CHARGEMENT: D.CHARGEMENT,
    TECH: D.TECH, MODEOP: D.MODEOP, PLANNING: D.PLANNING, NOTES: D.NOTES
});
console.log('  chantier de démonstration :', ID_DEMO);
await wait(1500);

// ------------------------------------------------------------------- Captures
console.log('Captures...');

await page.evaluate(() => goHome());
await wait(900);
await shot('accueil');

await page.evaluate(id => load(id), ID_DEMO);
await wait(900);
await shot('fiche-chantier');

await page.evaluate(() => document.getElementById('container-tasks-main').scrollIntoView());
await wait(600);
await shot('taches-butoirs');

await page.evaluate(() => goPrepa());
await wait(700);
await shot('prepa-documents');

const onglets = [
    ['gite', 'logi-gite'], ['pi', 'logi-pi'], ['contacts', 'logi-contacts'],
    ['chargement', 'logi-chargement'], ['tech', 'logi-technique'],
    ['modeop', 'logi-mode-operatoire'], ['planning', 'logi-planning'], ['notes', 'logi-notes']
];
await page.evaluate(() => goLogi());
await wait(900);
for (const [cle, nom] of onglets) {
    await page.evaluate(c => { showSub(c); window.scrollTo(0, 0); }, cle);
    if (cle === 'modeop') { await page.evaluate(() => toggleMO(0)); await wait(400); }
    await wait(700);
    await shot(nom);
}

await page.evaluate(() => goOptions());
await wait(900);
await shot('options');

await page.evaluate(() => goArchive());
await wait(700);
await shot('archives');

// Feuille A3 : on l'affiche à l'écran, réduite, pour la photographier
await page.evaluate(id => load(id), ID_DEMO);
await wait(800);
await page.evaluate(() => {
    buildPrintSheet();
    const s = document.getElementById('print-sheet');
    s.style.cssText = 'display:block;position:absolute;top:0;left:0;width:420mm;height:297mm;background:#fff;transform:scale(0.62);transform-origin:top left;box-shadow:0 0 0 1px #ddd;';
    document.querySelectorAll('body > *:not(#print-sheet)').forEach(e => { if (e.tagName !== 'SCRIPT') e.style.display = 'none'; });
    document.body.style.cssText = 'margin:0;padding:0;background:#fff;';
    window.scrollTo(0, 0);
});
await wait(900);
await shot('impression-a3', { clip: { x: 0, y: 0, width: 995, height: 705 } });

// Vue partagée, en lecture seule
await page.goto(URL + '/?partage=' + ID_DEMO, { waitUntil: 'networkidle' });
await wait(3500);
await shot('vue-partagee');

// Téléphone
const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await mob.goto(URL + '/?partage=' + ID_DEMO, { waitUntil: 'networkidle' });
await mob.waitForTimeout(4000);
n++;
await mob.screenshot({ path: `${OUT}/${String(n).padStart(2, '0')}-mobile.png` });
console.log('  ->', `${OUT}/${String(n).padStart(2, '0')}-mobile.png`);
await mob.close();

// --------------------------------------------------------------------- Ménage
console.log('Suppression du jeu de démonstration...');
await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForFunction(() => typeof dbLignes !== 'undefined', { timeout: 30000 });
await wait(1500);
const reste = await page.evaluate(async id => {
    const w = ms => new Promise(r => setTimeout(r, ms));
    await db.ref('chantiers/' + id).remove();
    await db.ref('recus/' + id).remove();
    await w(1500);
    const snap = await db.ref('chantiers').once('value');
    const tous = Object.values(snap.val() || {});
    return {
        restants: tous.filter(p => (p.equipe || 'EEL Limoges') === 'EEL Aurillac').length,
        total: tous.length
    };
}, ID_DEMO);
console.log('  chantiers restants dans EEL Aurillac :', reste.restants, '(total base :', reste.total + ')');

await browser.close();
console.log('\n' + n + ' captures dans doc/' + OUT + '/');
if (reste.restants !== 0) { console.error('!! Le ménage a échoué, vérifier la base.'); process.exit(1); }
