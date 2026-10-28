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
  ruleLifeline: t('Four helps, once each', 'Τέσσερις βοήθειες, μία φορά η καθεμία'),
  ruleMaps: t('Photo & map challenges', 'Φωτογραφίες και χάρτες'),
  ruleMedals: t('Medals for 18, 19 and 20/20', 'Μετάλλια για 18, 19 και 20/20'),
  factQuestions: t('questions per game', 'ερωτήσεις ανά παιχνίδι'),
  factLifeline: t('helps, once each', 'βοήθειες, μία φορά η καθεμία'),
  factPhotos: t('photos and maps', 'φωτογραφίες και χάρτες'),
  factMedal: t('right answers win a medal', 'σωστές για μετάλλιο'),
  welcomeTitle: t('Welcome!', 'Καλώς ήρθες!'),
  welcomeText: t(
    'A history quiz for Ochi Day: 100 questions on Greece’s fight from 1940 to the Liberation. Here is how it works.',
    'Ένα κουίζ ιστορίας για την επέτειο του «ΟΧΙ»: 100 ερωτήσεις για τον αγώνα της Ελλάδας από το 1940 ως την Απελευθέρωση. Δες πώς παίζεται.',
  ),
  welcomeQuestions: t(
    'Play one of five chapters, or the Grand Challenge with questions from all of them.',
    'Παίξε ένα από τα πέντε κεφάλαια ή τη Μεγάλη Πρόκληση, με ερωτήσεις από όλα.',
  ),
  welcomeLifeline: t(
    '50:50, ask the company, a second chance or a telegram with a clue. Each once per game, for half points.',
    '50:50, ρώτα τον λόχο, δεύτερη ευκαιρία ή τηλεγράφημα με στοιχείο. Μία φορά η καθεμία, με τους μισούς πόντους.',
  ),
  welcomeMaps: t(
    'Real photos from the time, and maps where you drop a pin on the right spot.',
    'Αληθινές φωτογραφίες της εποχής και χάρτες όπου βάζεις την πινέζα στο σωστό σημείο.',
  ),
  welcomeMedals: t(
    'Bronze, silver or gold, plus a certificate of honour with your name on it.',
    'Χάλκινο, ασημένιο ή χρυσό, μαζί με δίπλωμα τιμής με το όνομά σου.',
  ),
  welcomeStart: t('Let’s go!', 'Πάμε!'),
  radioTitle: t('Radio Athens · 28 October 1940', 'Ραδιοφωνικός Σταθμός Αθηνών · 28.10.1940'),
  radioPlay: t('Listen to the first communiqué', 'Άκου το πρώτο ανακοινωθέν'),
  radioStop: t('Switch off', 'Κλείσιμο'),
  radioOnAir: t('On air', 'Στον αέρα'),
  radioTap: t('Tap anywhere to tune in to the morning of 28 October 1940.', 'Πάτα οπουδήποτε για να συντονιστείς στο πρωινό της 28ης Οκτωβρίου 1940.'),
  howToPlay: t('How to play', 'Πώς παίζεται'),
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
  helpsRule: t(
    'Each help works once per game. A question answered with help is worth half the points.',
    'Κάθε βοήθεια παίζει μία φορά ανά παιχνίδι. Όταν απαντάς με βοήθεια, παίρνεις τους μισούς πόντους.',
  ),
  fifty: t('50:50', '50:50'),
  fiftyHint: t('Removes two wrong answers.', 'Αφαιρεί δύο λάθος απαντήσεις.'),
  fiftyMapHint: t('Hides the half of the map without the answer.', 'Σκιάζει το μισό του χάρτη χωρίς τη σωστή θέση.'),
  poll: t('Ask the company', 'Ρώτα τον λόχο'),
  pollHint: t('Your company votes for an answer. Soldiers can be wrong too.', 'Ο λόχος ψηφίζει μια απάντηση. Και οι φαντάροι κάνουν λάθη.'),
  pollMapHint: t('Your company drops their pins on the map. Soldiers can be wrong too.', 'Ο λόχος βάζει τις πινέζες του στον χάρτη. Και οι φαντάροι κάνουν λάθη.'),
  pollLegend: t('The gold dots are your company’s pins.', 'Οι χρυσές κουκκίδες είναι οι πινέζες του λόχου σου.'),
  second: t('Second chance', 'Δεύτερη ευκαιρία'),
  secondHint: t('Turn it on before you answer. If you are wrong, you pick again.', 'Ενεργοποίησέ τη πριν απαντήσεις. Αν κάνεις λάθος, ξαναδιαλέγεις.'),
  secondMapHint: t(
    'Turn it on before you answer. If you miss, you learn how far off you were and try again.',
    'Ενεργοποίησέ τη πριν απαντήσεις. Αν αστοχήσεις, μαθαίνεις πόσο μακριά ήσουν και ξαναδοκιμάζεις.',
  ),
  secondRetry: t('Not that one. You have one more try.', 'Όχι αυτή. Έχεις άλλη μία προσπάθεια.'),
  secondMapRetry: t('About {km} km off. Head {dir} and try once more.', 'Περίπου {km} χλμ. μακριά. Πήγαινε πιο {dir} και ξαναδοκίμασε.'),
  telegram: t('Telegram', 'Τηλεγράφημα'),
  telegramHint: t('A clue from headquarters.', 'Ένα στοιχείο από το Στρατηγείο.'),
  telegramFrom: t('Telegram from HQ', 'Τηλεγράφημα από το Στρατηγείο'),
  telegramStop: t('STOP', 'ΣΤΟΠ'),
  dirN: t('north', 'βόρεια'),
  dirNE: t('north-east', 'βορειοανατολικά'),
  dirE: t('east', 'ανατολικά'),
  dirSE: t('south-east', 'νοτιοανατολικά'),
  dirS: t('south', 'νότια'),
  dirSW: t('south-west', 'νοτιοδυτικά'),
  dirW: t('west', 'δυτικά'),
  dirNW: t('north-west', 'βορειοδυτικά'),
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
  shareTitle: t('Share with friends', 'Μοιράσου το με φίλους'),
  shareGame: t('Share the game', 'Μοιράσου το παιχνίδι'),
  shareInvite: t(
    'How well do you know the Epic of ’40? Try the OXI 1940 history quiz: 100 questions with real photos and maps, in English and Greek.',
    'Πόσο καλά ξέρεις το Έπος του ’40; Δοκίμασε το κουίζ ιστορίας «ΟΧΙ 1940»: 100 ερωτήσεις με αληθινές φωτογραφίες και χάρτες.',
  ),
  copyLink: t('Copy link', 'Αντιγραφή συνδέσμου'),
  moreApps: t('More apps', 'Άλλες εφαρμογές'),
  shareCertNote: t(
    'With “More apps” on your phone, your certificate is attached too.',
    'Με τις «Άλλες εφαρμογές» στο κινητό, επισυνάπτεται και το δίπλωμά σου.',
  ),
  close: t('Close', 'Κλείσιμο'),
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
  soundOn: t('Sound on', 'Ήχος ανοιχτός'),
  soundOff: t('Sound off', 'Ήχος κλειστός'),
  soundCredits: t('Sounds', 'Ήχοι'),
  soundSynth: t(
    'The other sound effects, including the short bugle flourish for a streak, are synthesised in the browser.',
    'Τα υπόλοιπα ηχητικά εφέ, μαζί με το σύντομο σάλπισμα για κάθε σερί, παράγονται απευθείας στο πρόγραμμα περιήγησης.',
  ),
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

/** Only a language the visitor picks themselves is remembered, so detection keeps working. */
const CHOICE_KEY = 'oxi1940:lang-choice';
/** Earlier versions saved every detected language here; it is ignored and cleared. */
const OLD_KEY = 'oxi1940:lang';
const GREEK_TIME_ZONES = ['Europe/Athens', 'Asia/Nicosia', 'Asia/Famagusta'];

export interface LangSignals {
  /** The `?lang=` of the link. */
  param: string | null;
  /** A language the visitor picked with the switch. */
  choice: string | null;
  /** The browser’s preferred languages, most preferred first. */
  languages: readonly string[];
  timeZone?: string;
}

/**
 * A `?lang=` link wins, then the visitor’s own choice. Otherwise Greek if the browser lists
 * Greek among its languages (many Greeks run their browser in English) or the clock is set
 * to Greece or Cyprus; English for everyone else.
 */
export function pickLang({ param, choice, languages, timeZone }: LangSignals): Lang {
  for (const value of [param, choice]) if (value === 'el' || value === 'en') return value;
  if (languages.some((l) => l.toLowerCase().startsWith('el'))) return 'el';
  if (timeZone && GREEK_TIME_ZONES.includes(timeZone)) return 'el';
  return 'en';
}

export function detectLang(): Lang {
  let choice: string | null = null;
  try {
    choice = localStorage.getItem(CHOICE_KEY);
    localStorage.removeItem(OLD_KEY);
  } catch {
    // Storage can be unavailable (private mode); detection still works.
  }
  let timeZone: string | undefined;
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    // An old browser without time zones: rely on the languages alone.
  }
  return pickLang({
    param: new URLSearchParams(window.location.search).get('lang'),
    choice,
    languages: navigator.languages?.length ? navigator.languages : [navigator.language],
    timeZone,
  });
}

/** Remembers a language the visitor picked with the switch. */
export function rememberLang(lang: Lang) {
  try {
    localStorage.setItem(CHOICE_KEY, lang);
  } catch {
    // It will just be detected again next time.
  }
}
