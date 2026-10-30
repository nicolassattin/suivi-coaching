// Suivi coaching : petit serveur qui lit ton agenda Google et garde la liste des élèves.
// Se déploie une seule fois depuis script.google.com (voir README).

const CLE = 'REMPLACE-MOI-PAR-UN-MOT-DE-PASSE-LONG';

const ROSTER_DEPART = {
  baseline: '2026-10-30T07:30:00',
  monthly: ['Carmen'],
  students: [
    { name: 'Arthur', pack: 10, done: 3 },
    { name: 'Florent', pack: 10, done: 1 },
    { name: 'Maurice', pack: 8, done: 7 },
    { name: 'David', pack: 10, done: 8 },
    { name: 'Paul', pack: 10, done: 8 },
    { name: 'Stan', pack: 10, done: 7 },
    { name: 'Elena', pack: 10, done: 5 },
    { name: 'Tanguy', pack: 20, done: 16, excludeColors: ['3'] },
    { name: 'Felipe', pack: 20, done: 13 }
  ]
};

function reponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function lireRoster() {
  const p = PropertiesService.getScriptProperties().getProperty('roster');
  return p ? JSON.parse(p) : ROSTER_DEPART;
}

function doGet(e) {
  if (e.parameter.key !== CLE) return reponse({ error: 'cle' });
  if (e.parameter.action === 'roster') return reponse({ roster: lireRoster() });
  if (e.parameter.action === 'events') {
    const debut = new Date(e.parameter.from), fin = new Date(e.parameter.to);
    const events = CalendarApp.getDefaultCalendar().getEvents(debut, fin).map(ev => {
      const c = ev.getColor();
      return {
        summary: ev.getTitle(),
        status: 'confirmed',
        colorId: c && c !== '0' ? String(c) : '',
        start: { dateTime: ev.getStartTime().toISOString() },
        end: { dateTime: ev.getEndTime().toISOString() }
      };
    });
    return reponse({ events: events });
  }
  return reponse({ error: 'action' });
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  if (d.key !== CLE) return reponse({ error: 'cle' });
  PropertiesService.getScriptProperties().setProperty('roster', JSON.stringify(d.roster));
  return reponse({ ok: true });
}
