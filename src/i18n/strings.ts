import type { L, Lang } from '../types';

export const SITE_URL = 'https://kitsorfan.github.io/oxi-1940/';
export const REPO_URL = 'https://github.com/kitsorfan/oxi-1940';
export const AUTHOR_URL = 'https://www.kitsorfan.com';

const t = (en: string, el: string): L => ({ en, el });

export const strings = {
  appName: t('OXI 1940', 'ΟΧΙ 1940'),
  tagline: t('The Epic of ’40 — a history quiz', 'Το Έπος του ’40 — ένα κουίζ ιστορίας'),
  heroTitle: t('Can you earn the gold medal?', 'Θα κερδίσεις το χρυσό μετάλλιο;'),
  heroText: t(
    'On 28 October 1940 Greece said “No” to Fascist Italy. What followed was a winter of courage in the mountains of Epirus and Albania, the struggle against Nazi Germany, and four years of occupation and resistance until liberation. Test what you know in 100 questions with real photos and maps.',
    'Στις 28 Οκτωβρίου 1940 η Ελλάδα είπε «ΟΧΙ» στη φασιστική Ιταλία. Ακολούθησαν ένας χειμώνας ηρωισμού στα βουνά της Ηπείρου και της Αλβανίας, ο αγώνας απέναντι στη ναζιστική Γερμανία και τέσσερα χρόνια κατοχής και αντίστασης ως την απελευθέρωση. Δοκίμασε τις γνώσεις σου σε 100 ερωτήσεις με αληθινές φωτογραφίες και χάρτες.',
  ),
  ruleQuestions: t('20 questions per game', '20 ερωτήσεις ανά παιχνίδι'),
  ruleLifeline: t('One 50:50 lifeline', 'Μία βοήθεια 50:50'),
  ruleMaps: t('Photo & map challenges', 'Φωτογραφίες και χάρτες'),
  ruleMedals: t('Medals for 18, 19 and 20/20', 'Μετάλλια για 18, 19 και 20/20'),
  chaptersTitle: t('Choose your mission', 'Διάλεξε αποστολή'),
  chapter: t('Chapter', 'Κεφάλαιο'),
  play: t('Play', 'Παίξε'),
  playAgain: t('Play again', 'Ξαναπαίξε'),
  best: t('Best', 'Ρεκόρ'),
  notPlayed: t('Not played yet', 'Δεν έχει παιχτεί'),
  mixedTitle: t('The Grand Challenge', 'Η Μεγάλη Πρόκληση'),
  mixedPeriod: t('1923 – 1945', '1923 – 1945'),
  mixedBlurb: t(
    '20 questions drawn at random from all five chapters. A new game every time.',
    '20 ερωτήσεις από όλα τα κεφάλαια, σε τυχαία επιλογή. Κάθε φορά ένα νέο παιχνίδι.',
  ),
  cabinetTitle: t('Your medals', 'Τα μετάλλιά σου'),
  cabinetEmpty: t('No medals yet. Score 18/20 or more to win one.', 'Κανένα μετάλλιο ακόμη. Πέτυχε 18/20 ή περισσότερο για να κερδίσεις.'),

  question: t('Question', 'Ερώτηση'),
  score: t('Score', 'Πόντοι'),
  streak: t('Streak', 'Σερί'),
  quit: t('Quit', 'Έξοδος'),
  quitConfirm: t('Leave this game? Your progress will be lost.', 'Να φύγεις από το παιχνίδι; Η πρόοδός σου θα χαθεί.'),
  fifty: t('50:50', '50:50'),
  fiftyHint: t('Removes two wrong answers. Once per game.', 'Αφαιρεί δύο λάθος απαντήσεις. Μία φορά ανά παιχνίδι.'),
  fiftyMapHint: t('Hides the half of the map without the answer. Once per game.', 'Σκιάζει το μισό του χάρτη χωρίς τη σωστή θέση. Μία φορά ανά παιχνίδι.'),
  fiftyUsed: t('50:50 used', '50:50 ✓'),
  next: t('Next', 'Επόμενη'),
  seeResults: t('See results', 'Αποτελέσματα'),
  mapTap: t('Tap the map to drop your pin.', 'Πάτησε στον χάρτη για να βάλεις την πινέζα σου.'),
  mapConfirm: t('Confirm location', 'Επιβεβαίωση θέσης'),
  kmAway: t('{km} km away', '{km} χλμ. μακριά'),
  didYouKnow: t('Did you know?', 'Το ήξερες;'),
  correct: [t('Bravo!', 'Μπράβο!'), t('Spot on!', 'Ακριβώς!'), t('Correct!', 'Σωστά!'), t('Excellent!', 'Εξαιρετικά!')],
  wrong: [t('Not quite.', 'Όχι ακριβώς.'), t('Wrong answer.', 'Λάθος απάντηση.')],
  answerWas: t('Answer: {answer}', 'Σωστή απάντηση: {answer}'),
  points: t('+{n} points', '+{n} πόντοι'),
  photo: t('Photo', 'Φωτογραφία'),
  source: t('Source', 'Πηγή'),

  resultsTitle: t('Mission complete', 'Η αποστολή ολοκληρώθηκε'),
  youScored: t('You answered {n} of {total} correctly', 'Απάντησες σωστά σε {n} από τις {total}'),
  totalPoints: t('{n} points', '{n} πόντοι'),
  newBest: t('New personal best!', 'Νέο προσωπικό ρεκόρ!'),
  msgPerfect: t('Perfect score. Davakis himself would salute you!', 'Τέλεια βαθμολογία. Θα σε χαιρετούσε ο ίδιος ο Δαβάκης!'),
  msgMedal: t('Outstanding! You have earned a medal.', 'Εξαιρετικά! Κέρδισες μετάλλιο.'),
  msgClose: t('So close! Score 18 or more to win a medal.', 'Πολύ κοντά! Με 18 ή περισσότερες κερδίζεις μετάλλιο.'),
  msgGood: t('A good start. Read the facts and try again!', 'Καλή αρχή. Διάβασε τα στοιχεία και ξαναδοκίμασε!'),
  msgLow: t('History needs you. Try again!', 'Η ιστορία σε χρειάζεται. Ξαναπροσπάθησε!'),
  certTitle: t('Claim your certificate', 'Πάρε το δίπλωμά σου'),
  certText: t('Enter your name to download a certificate of honour you can share.', 'Γράψε το όνομά σου για να κατεβάσεις ένα δίπλωμα τιμής και να το μοιραστείς.'),
  certName: t('Your name', 'Το όνομά σου'),
  certDownload: t('Download certificate', 'Λήψη διπλώματος'),
  share: t('Share', 'Κοινοποίηση'),
  shareLinkedIn: t('Share on LinkedIn', 'Κοινοποίηση στο LinkedIn'),
  copied: t('Copied to clipboard!', 'Αντιγράφηκε!'),
  shareText: t(
    'I scored {n}/{total} in the OXI 1940 history quiz{medal}. How well do you know the Epic of ’40?',
    'Πέτυχα {n}/{total} στο κουίζ ιστορίας «ΟΧΙ 1940»{medal}. Πόσο καλά ξέρεις το Έπος του ’40;',
  ),
  review: t('Your answers', 'Οι απαντήσεις σου'),
  backHome: t('All chapters', 'Όλα τα κεφάλαια'),

  medalGold: t('Gold Medal', 'Χρυσό Μετάλλιο'),
  medalSilver: t('Silver Medal', 'Αργυρό Μετάλλιο'),
  medalBronze: t('Bronze Medal', 'Χάλκινο Μετάλλιο'),
  rankGold: t('Hero of ’40', 'Ήρωας του ’40'),
  rankSilver: t('Guardian of the Pindus', 'Φρουρός της Πίνδου'),
  rankBronze: t('Defender of Epirus', 'Υπερασπιστής της Ηπείρου'),
  certHeading: t('Certificate of Honour', 'Δίπλωμα Τιμής'),
  certScored: t('scored {n}/{total} in', 'πέτυχε {n}/{total} στο'),
  certFooter: t('OXI 1940 · The Epic of ’40', 'ΟΧΙ 1940 · Το Έπος του ’40'),

  aboutTitle: t('About & credits', 'Σχετικά και πηγές'),
  aboutText: t(
    'A small tribute for Ochi Day. The questions are based on well-documented facts about the Greco-Italian War, the German invasion, the Battle of Crete, the occupation and the liberation of 1944–45. Every photo and map comes from Wikimedia Commons under a free licence. The images were resized for the web.',
    'Ένα μικρό αφιέρωμα για την επέτειο του «ΟΧΙ». Οι ερωτήσεις βασίζονται σε τεκμηριωμένα στοιχεία για τον ελληνοϊταλικό πόλεμο, τη γερμανική εισβολή, τη Μάχη της Κρήτης, την Κατοχή και την Απελευθέρωση του 1944–45. Όλες οι φωτογραφίες και οι χάρτες προέρχονται από το Wikimedia Commons με ελεύθερες άδειες. Οι εικόνες έχουν σμικρυνθεί για το διαδίκτυο.',
  ),
  madeBy: t('Made by', 'Δημιουργία:'),
  sourceCode: t('Source code', 'Πηγαίος κώδικας'),
  imageCredits: t('Image credits', 'Πηγές εικόνων'),
  back: t('Back', 'Πίσω'),
  language: t('Ελληνικά', 'English'),
} as const;

export type StringKey = keyof typeof strings;

/** Fills `{name}` placeholders. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
}

/** Upper case that drops the Greek tonos but keeps the dialytika, as Greek typography (and CSS for lang="el") does. */
export function caps(text: string, lang: Lang): string {
  if (lang !== 'el') return text.toUpperCase();
  return text.normalize('NFD').replace(/́/g, '').normalize('NFC').toUpperCase();
}

export function detectLang(): Lang {
  const param = new URLSearchParams(window.location.search).get('lang');
  if (param === 'el' || param === 'en') return param;
  try {
    const saved = localStorage.getItem('oxi1940:lang');
    if (saved === 'el' || saved === 'en') return saved;
  } catch {
    // Storage can be unavailable (private mode); fall back to the browser language.
  }
  return navigator.language.toLowerCase().startsWith('el') ? 'el' : 'en';
}
