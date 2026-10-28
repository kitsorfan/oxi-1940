import type { Chapter } from '../../types';
import { choice, map, t } from '../helpers';

export const ultimatum: Chapter = {
  id: 'ultimatum',
  title: t('The Road to OXI', 'Ο δρόμος προς το ΟΧΙ'),
  period: t('1923 – 28 October 1940', '1923 – 28 Οκτωβρίου 1940'),
  blurb: t(
    'Mussolini’s ambitions, the sinking of Elli and the night of the ultimatum.',
    'Οι βλέψεις του Μουσολίνι, ο τορπιλισμός της «Έλλης» και η νύχτα του τελεσιγράφου.',
  ),
  cover: 'newspaper',
  questions: [
    map({
      id: 'u01',
      prompt: t(
        'In 1923 Mussolini’s navy bombarded a Greek island and occupied it for a month. Find Corfu.',
        'Το 1923 το ναυτικό του Μουσολίνι βομβάρδισε ένα ελληνικό νησί και το κατέλαβε για έναν μήνα. Βρες την Κέρκυρα.',
      ),
      place: t('Corfu', 'Κέρκυρα'),
      lat: 39.62,
      lon: 19.86,
      fact: t(
        'The “Corfu incident” of 1923 revealed Mussolini’s ambitions in the Ionian and the Adriatic, seventeen years before the war.',
        'Το «επεισόδιο της Κέρκυρας» το 1923 φανέρωσε τις βλέψεις του Μουσολίνι στο Ιόνιο και την Αδριατική, δεκαεπτά χρόνια πριν από τον πόλεμο.',
      ),
    }),
    choice({
      id: 'u02',
      prompt: t(
        'Which country did Italy occupy in April 1939, gaining a border with Greece?',
        'Ποια χώρα κατέλαβε η Ιταλία τον Απρίλιο του 1939, αποκτώντας σύνορα με την Ελλάδα;',
      ),
      answer: t('Albania', 'Την Αλβανία'),
      wrong: [t('Yugoslavia', 'Τη Γιουγκοσλαβία'), t('Bulgaria', 'Τη Βουλγαρία'), t('Turkey', 'Την Τουρκία')],
      fact: t(
        'Italian troops landed in Albania on 7 April 1939. A year and a half later it became the springboard for the attack on Greece.',
        'Τα ιταλικά στρατεύματα αποβιβάστηκαν στην Αλβανία στις 7 Απριλίου 1939. Ενάμιση χρόνο αργότερα έγινε το ορμητήριο της επίθεσης κατά της Ελλάδας.',
      ),
    }),
    choice({
      id: 'u03',
      image: 'metaxas',
      prompt: t(
        'What was Ioannis Metaxas’ career before he became Prime Minister?',
        'Ποια ήταν η σταδιοδρομία του Ιωάννη Μεταξά πριν γίνει πρωθυπουργός;',
      ),
      answer: t('An army officer and general', 'Αξιωματικός του στρατού και στρατηγός'),
      wrong: [t('A banker', 'Τραπεζίτης'), t('A poet', 'Ποιητής'), t('A shipowner', 'Εφοπλιστής')],
      fact: t(
        'Metaxas, a former general and staff officer, had governed Greece since 1936 and had fortified the northern borders, expecting war.',
        'Ο Μεταξάς, πρώην στρατηγός και επιτελικός αξιωματικός, κυβερνούσε την Ελλάδα από το 1936 και είχε οχυρώσει τα βόρεια σύνορα προβλέποντας τον πόλεμο.',
      ),
    }),
    choice({
      id: 'u04',
      prompt: t('What was Metaxas’ regime called?', 'Πώς ονομάστηκε το καθεστώς του Μεταξά;'),
      answer: t('The 4th of August Regime', 'Το καθεστώς της 4ης Αυγούστου'),
      wrong: [
        t('The Second Hellenic Republic', 'Η Β΄ Ελληνική Δημοκρατία'),
        t('The Regime of the Colonels', 'Η Δικτατορία των Συνταγματαρχών'),
        t('The National Schism', 'Ο Εθνικός Διχασμός'),
      ],
      fact: t(
        'It was named after 4 August 1936, when Metaxas, with the King’s consent, suspended parliament and ruled as a dictator.',
        'Πήρε το όνομά του από την 4η Αυγούστου 1936, όταν ο Μεταξάς, με τη συναίνεση του βασιλιά, ανέστειλε τη λειτουργία της Βουλής και κυβέρνησε δικτατορικά.',
      ),
    }),
    choice({
      id: 'u05',
      image: 'king-george',
      prompt: t('Who was King of Greece in 1940?', 'Ποιος ήταν βασιλιάς της Ελλάδας το 1940;'),
      answer: t('George II', 'Ο Γεώργιος Β΄'),
      wrong: [t('Constantine I', 'Ο Κωνσταντίνος Α΄'), t('Paul', 'Ο Παύλος'), t('Otto', 'Ο Όθων')],
      fact: t(
        'George II had returned to the throne in 1935, after almost twelve years in exile.',
        'Ο Γεώργιος Β΄ είχε επιστρέψει στον θρόνο το 1935, ύστερα από σχεδόν δώδεκα χρόνια εξορίας.',
      ),
    }),
    choice({
      id: 'u06',
      image: 'elli',
      prompt: t(
        'The cruiser Elli was torpedoed in the harbour of Tinos on 15 August 1940. What was Greece celebrating that day?',
        'Η «Έλλη» τορπιλίστηκε στο λιμάνι της Τήνου στις 15 Αυγούστου 1940. Τι γιόρταζε η Ελλάδα εκείνη τη μέρα;',
      ),
      answer: t('The Dormition of the Virgin Mary', 'Την Κοίμηση της Θεοτόκου'),
      wrong: [t('Easter Sunday', 'Το Πάσχα'), t('The feast of St Nicholas', 'Τη γιορτή του Αγίου Νικολάου'), t('Independence Day', 'Την 25η Μαρτίου')],
      fact: t(
        'Elli was in Tinos for the great feast of the Virgin. The Italian submarine Delfino torpedoed her in peacetime, while pilgrims watched from the shore.',
        'Η «Έλλη» βρισκόταν στην Τήνο για τη μεγάλη γιορτή της Παναγίας. Την τορπίλισε εν καιρώ ειρήνης το ιταλικό υποβρύχιο «Ντελφίνο», μπροστά στα μάτια των προσκυνητών.',
      ),
    }),
    choice({
      id: 'u07',
      prompt: t('When Elli was sunk, Greece and Italy were…', 'Όταν βυθίστηκε η «Έλλη», Ελλάδα και Ιταλία…'),
      answer: t('At peace: Greece was neutral', 'Βρίσκονταν σε ειρήνη: η Ελλάδα ήταν ουδέτερη'),
      wrong: [
        t('Already at war', 'Βρίσκονταν ήδη σε πόλεμο'),
        t('Allies in the Axis', 'Ήταν σύμμαχοι στον Άξονα'),
        t('Fighting over Cyprus', 'Συγκρούονταν για την Κύπρο'),
      ],
      fact: t(
        'To avoid giving Italy a pretext, the government spoke only of an “unknown submarine”. The torpedo fragments recovered were Italian.',
        'Για να μη δώσει αφορμή, η κυβέρνηση μίλησε μόνο για «άγνωστο υποβρύχιο». Τα θραύσματα της τορπίλης που βρέθηκαν ήταν ιταλικά.',
      ),
    }),
    map({
      id: 'u08',
      prompt: t('Find Tinos, the island where Elli was torpedoed.', 'Βρες την Τήνο, το νησί όπου τορπιλίστηκε η «Έλλη».'),
      place: t('Tinos', 'Τήνος'),
      lat: 37.6,
      lon: 25.15,
      radiusKm: 30,
      fact: t(
        'Tinos, in the Cyclades, is home to the church of Panagia Evangelistria, where thousands of pilgrims gather every 15 August.',
        'Η Τήνος, στις Κυκλάδες, φιλοξενεί τον ναό της Παναγίας της Ευαγγελίστριας, όπου κάθε Δεκαπενταύγουστο συρρέουν χιλιάδες προσκυνητές.',
      ),
    }),
    choice({
      id: 'u09',
      image: 'mussolini',
      prompt: t(
        'Why did Mussolini decide to attack Greece in October 1940?',
        'Γιατί αποφάσισε ο Μουσολίνι να επιτεθεί στην Ελλάδα τον Οκτώβριο του 1940;',
      ),
      answer: t(
        'To match Hitler’s conquests with a quick victory of his own',
        'Για να ισοφαρίσει τις κατακτήσεις του Χίτλερ με μια δική του γρήγορη νίκη',
      ),
      wrong: [
        t('Because Greece had attacked Albania', 'Επειδή η Ελλάδα είχε επιτεθεί στην Αλβανία'),
        t('Because Hitler ordered him to', 'Επειδή τον διέταξε ο Χίτλερ'),
        t('To stop a Greek landing on Rhodes', 'Για να αποτρέψει ελληνική απόβαση στη Ρόδο'),
      ],
      fact: t(
        'Annoyed that Hitler kept acting without telling him, Mussolini said: “He will find out from the papers that I have occupied Greece.”',
        'Θιγμένος που ο Χίτλερ ενεργούσε χωρίς να τον ενημερώνει, ο Μουσολίνι είπε: «Θα μάθει από τις εφημερίδες ότι κατέλαβα την Ελλάδα».',
      ),
    }),
    choice({
      id: 'u10',
      image: 'ciano',
      prompt: t(
        'How was Galeazzo Ciano, Italy’s foreign minister, related to Mussolini?',
        'Τι σχέση είχε ο Γκαλεάτσο Τσιάνο, υπουργός Εξωτερικών της Ιταλίας, με τον Μουσολίνι;',
      ),
      answer: t('He was his son-in-law', 'Ήταν γαμπρός του'),
      wrong: [t('He was his brother', 'Ήταν αδελφός του'), t('He was his nephew', 'Ήταν ανιψιός του'), t('He was his cousin', 'Ήταν ξάδελφός του')],
      fact: t(
        'Ciano had married Mussolini’s daughter Edda. His diary, where he recorded Mussolini’s plans, is a key source on the attack on Greece.',
        'Ο Τσιάνο είχε παντρευτεί την κόρη του Μουσολίνι, Έντα. Το ημερολόγιό του, όπου κατέγραφε τα σχέδια του Μουσολίνι, είναι βασική πηγή για την επίθεση στην Ελλάδα.',
      ),
    }),
    choice({
      id: 'u11',
      prompt: t(
        'At about what time was the Italian ultimatum handed to Metaxas?',
        'Περίπου τι ώρα επιδόθηκε το ιταλικό τελεσίγραφο στον Μεταξά;',
      ),
      answer: t('At 3:00 a.m. on 28 October', 'Στις 3:00 τα ξημερώματα της 28ης Οκτωβρίου'),
      wrong: [
        t('At noon on 28 October', 'Το μεσημέρι της 28ης Οκτωβρίου'),
        t('At 9:00 p.m. on 27 October', 'Στις 9:00 το βράδυ της 27ης Οκτωβρίου'),
        t('At 6:00 p.m. on 28 October', 'Στις 6:00 το απόγευμα της 28ης Οκτωβρίου'),
      ],
      fact: t(
        'Metaxas was woken in the middle of the night at his home. Greece was given only until 6:00 a.m. to reply.',
        'Ο Μεταξάς ξύπνησε μέσα στη νύχτα στο σπίτι του. Η Ελλάδα είχε προθεσμία μόλις ως τις 6:00 το πρωί για να απαντήσει.',
      ),
    }),
    choice({
      id: 'u12',
      prompt: t('Who delivered the ultimatum?', 'Ποιος επέδωσε το τελεσίγραφο;'),
      answer: t('Emanuele Grazzi, the Italian ambassador in Athens', 'Ο Εμανουέλε Γκράτσι, Ιταλός πρέσβης στην Αθήνα'),
      wrong: [
        t('Galeazzo Ciano in person', 'Ο ίδιος ο Γκαλεάτσο Τσιάνο'),
        t('Benito Mussolini in person', 'Ο ίδιος ο Μπενίτο Μουσολίνι'),
        t('An Italian general from Albania', 'Ένας Ιταλός στρατηγός από την Αλβανία'),
      ],
      fact: t(
        'Grazzi later described that night in his memoir, titled “The Beginning of the End” (Il principio della fine).',
        'Ο Γκράτσι περιέγραψε αργότερα εκείνη τη νύχτα στα απομνημονεύματά του, με τίτλο «Η αρχή του τέλους» (Il principio della fine).',
      ),
    }),
    map({
      id: 'u13',
      prompt: t(
        'Metaxas received the ultimatum at his house in Kifissia, a northern suburb of Athens. Find Athens.',
        'Ο Μεταξάς δέχτηκε το τελεσίγραφο στο σπίτι του στην Κηφισιά, βόρειο προάστιο της Αθήνας. Βρες την Αθήνα.',
      ),
      place: t('Athens (Kifissia)', 'Αθήνα (Κηφισιά)'),
      lat: 38.03,
      lon: 23.77,
      fact: t(
        'Within hours, sirens sounded across Athens and crowds filled the streets, cheering the decision to resist.',
        'Μέσα σε λίγες ώρες οι σειρήνες ήχησαν σε όλη την Αθήνα και πλήθη γέμισαν τους δρόμους, επευφημώντας την απόφαση για αντίσταση.',
      ),
    }),
    choice({
      id: 'u14',
      prompt: t('What did the ultimatum demand?', 'Τι ζητούσε το τελεσίγραφο;'),
      answer: t(
        'Free passage for Italian troops to occupy unnamed “strategic points” in Greece',
        'Να επιτραπεί στα ιταλικά στρατεύματα να καταλάβουν ακατονόμαστα «στρατηγικά σημεία» της Ελλάδας',
      ),
      wrong: [
        t('That Greece hand over its fleet to Italy', 'Να παραδώσει η Ελλάδα τον στόλο της στην Ιταλία'),
        t('That Greece declare war on Britain', 'Να κηρύξει η Ελλάδα πόλεμο στη Βρετανία'),
        t('That Greece give Corfu to Italy', 'Να παραχωρήσει η Ελλάδα την Κέρκυρα στην Ιταλία'),
      ],
      fact: t(
        'The “strategic points” were not even named. Italy accused Greece of helping Britain, but Metaxas saw at once that it was a pretext for war.',
        'Τα «στρατηγικά σημεία» δεν κατονομάζονταν καν. Η Ιταλία κατηγορούσε την Ελλάδα ότι βοηθούσε τη Βρετανία, όμως ο Μεταξάς κατάλαβε αμέσως ότι ήταν πρόσχημα πολέμου.',
      ),
    }),
    choice({
      id: 'u15',
      prompt: t(
        'Metaxas replied: «Alors, c’est la guerre» (“Then it is war”). In which language?',
        'Ο Μεταξάς απάντησε: «Alors, c’est la guerre» («Λοιπόν, έχουμε πόλεμο»). Σε ποια γλώσσα;',
      ),
      answer: t('French', 'Στα γαλλικά'),
      wrong: [t('Italian', 'Στα ιταλικά'), t('English', 'Στα αγγλικά'), t('German', 'Στα γερμανικά')],
      fact: t(
        'French was the language of diplomacy at the time, so Grazzi and Metaxas spoke French together.',
        'Τα γαλλικά ήταν τότε η γλώσσα της διπλωματίας, γι’ αυτό ο Γκράτσι και ο Μεταξάς μιλούσαν μεταξύ τους γαλλικά.',
      ),
    }),
    choice({
      id: 'u16',
      prompt: t('When did Italian troops start crossing the border?', 'Πότε άρχισαν τα ιταλικά στρατεύματα να περνούν τα σύνορα;'),
      answer: t('At 5:30 a.m., before the ultimatum had even expired', 'Στις 5:30 το πρωί, πριν καν λήξει το τελεσίγραφο'),
      wrong: [
        t('At exactly 6:00 a.m., when it expired', 'Στις 6:00 ακριβώς, μόλις έληξε'),
        t('At noon on 28 October', 'Το μεσημέρι της 28ης Οκτωβρίου'),
        t('A week later, on 4 November', 'Μία εβδομάδα αργότερα, στις 4 Νοεμβρίου'),
      ],
      fact: t(
        'The attack began at dawn in pouring rain. Soon the mud would bog down Italian tanks and trucks.',
        'Η επίθεση ξεκίνησε τα ξημερώματα με καταρρακτώδη βροχή. Σύντομα η λάσπη θα ακινητοποιούσε τα ιταλικά άρματα και φορτηγά.',
      ),
    }),
    choice({
      id: 'u17',
      prompt: t(
        'Complete Metaxas’ message to the nation: “The moment has come for us to fight for the independence of Greece, its integrity and its…”',
        'Συμπλήρωσε το διάγγελμα του Μεταξά: «Η στιγμή ήλθεν όπως αγωνισθώμεν διά την ανεξαρτησίαν της Ελλάδος, την ακεραιότητα και την…»',
      ),
      answer: t('honour', 'τιμήν'),
      wrong: [t('glory', 'δόξαν'), t('freedom', 'ελευθερίαν'), t('islands', 'νήσους')],
      fact: t(
        'The proclamation was broadcast on the radio on the morning of 28 October and printed in every newspaper.',
        'Το διάγγελμα μεταδόθηκε από το ραδιόφωνο το πρωί της 28ης Οκτωβρίου και δημοσιεύτηκε σε όλες τις εφημερίδες.',
      ),
    }),
    choice({
      id: 'u18',
      image: 'newspaper',
      prompt: t(
        'Which single word became the symbol of Greece’s reply to the ultimatum?',
        'Ποια λέξη έγινε σύμβολο της απάντησης της Ελλάδας στο τελεσίγραφο;',
      ),
      answer: t('«ΟΧΙ» (“No”)', '«ΟΧΙ»'),
      wrong: [t('«ΝΑΙ» (“Yes”)', '«ΝΑΙ»'), t('«ΝΙΚΗ» (“Victory”)', '«ΝΙΚΗ»'), t('«ΕΜΠΡΟΣ» (“Forward”)', '«ΕΜΠΡΟΣ»')],
      fact: t(
        'Newspapers and people summed up the government’s answer in that one word. Here: the front page of Ellinikon Mellon, 30 October 1940.',
        'Εφημερίδες και λαός συνόψισαν την απάντηση της κυβέρνησης σε αυτή τη μία λέξη. Εδώ, το πρωτοσέλιδο του «Ελληνικόν Μέλλον», 30 Οκτωβρίου 1940.',
      ),
    }),
    choice({
      id: 'u19',
      image: 'ochi-rhodes',
      prompt: t('How is 28 October marked in Greece and Cyprus today?', 'Πώς τιμάται σήμερα η 28η Οκτωβρίου σε Ελλάδα και Κύπρο;'),
      answer: t('As a national holiday, with school and military parades', 'Ως εθνική επέτειος, με μαθητικές και στρατιωτικές παρελάσεις'),
      wrong: [
        t('As an ordinary working day', 'Ως μια συνηθισμένη εργάσιμη μέρα'),
        t('With a minute’s silence only', 'Μόνο με ενός λεπτού σιγή'),
        t('With a national football match', 'Με έναν εθνικό ποδοσφαιρικό αγώνα'),
      ],
      fact: t(
        'Balconies are decorated with flags, and the main military parade is held in Thessaloniki, which also celebrates its patron saint, St Demetrius, on 26 October.',
        'Τα μπαλκόνια στολίζονται με σημαίες και η μεγάλη στρατιωτική παρέλαση γίνεται στη Θεσσαλονίκη, που στις 26 Οκτωβρίου γιορτάζει και τον πολιούχο της, τον Άγιο Δημήτριο.',
      ),
    }),
    choice({
      id: 'u20',
      prompt: t(
        'Since 1952 the Church of Greece also celebrates a feast of the Virgin Mary on 28 October. Which one?',
        'Από το 1952 η Εκκλησία της Ελλάδος γιορτάζει στις 28 Οκτωβρίου και μια θεομητορική γιορτή. Ποια;',
      ),
      answer: t('The Holy Protection (Agia Skepi)', 'Την Αγία Σκέπη'),
      wrong: [t('The Annunciation', 'Τον Ευαγγελισμό'), t('The Dormition', 'Την Κοίμηση της Θεοτόκου'), t('The Presentation in the Temple', 'Τα Εισόδια της Θεοτόκου')],
      fact: t(
        'Many soldiers of 1940 spoke of the Virgin’s protection at the front, so the Church moved the feast of her Holy Protection to 28 October.',
        'Πολλοί στρατιώτες του ’40 μιλούσαν για την προστασία της Παναγίας στο μέτωπο. Γι’ αυτό η Εκκλησία μετέφερε τη γιορτή της Αγίας Σκέπης στις 28 Οκτωβρίου.',
      ),
    }),
  ],
};
