import type { Chapter } from '../../types';
import { choice, map, t } from '../helpers';

export const pindus: Chapter = {
  id: 'pindus',
  title: t('Pindus & the Counter-attack', 'Πίνδος και αντεπίθεση'),
  period: t('October – December 1940', 'Οκτώβριος – Δεκέμβριος 1940'),
  blurb: t(
    'The Julia Division in the mountains, the line at Kalpaki and the advance into Albania.',
    'Η μεραρχία «Τζούλια» στα βουνά, η γραμμή του Καλπακίου και η προέλαση στη Βόρεια Ήπειρο.',
  ),
  cover: 'kalpaki-soldier',
  questions: [
    choice({
      id: 'p01',
      image: 'invasion-map-en',
      imageEl: 'invasion-map-el',
      prompt: t(
        'This map shows the Italian invasion. Which two Greek regions came under attack in 1940?',
        'Ο χάρτης δείχνει την ιταλική εισβολή. Ποιες δύο ελληνικές περιοχές δέχτηκαν την επίθεση το 1940;',
      ),
      answer: t('Epirus and Western Macedonia', 'Η Ήπειρος και η Δυτική Μακεδονία'),
      wrong: [
        t('Thrace and Crete', 'Η Θράκη και η Κρήτη'),
        t('Thessaly and Attica', 'Η Θεσσαλία και η Αττική'),
        t('The Peloponnese and Corfu', 'Η Πελοπόννησος και η Κέρκυρα'),
      ],
      fact: t(
        'The front ran along the mountainous Greek–Albanian border, from the Ionian Sea to Lake Prespa.',
        'Το μέτωπο απλωνόταν στην ορεινή ελληνοαλβανική μεθόριο, από το Ιόνιο Πέλαγος ως τη λίμνη Πρέσπα.',
      ),
    }),
    choice({
      id: 'p02',
      prompt: t(
        'Which Italian general led the invasion when it began on 28 October?',
        'Ποιος Ιταλός στρατηγός ηγούνταν της εισβολής όταν ξεκίνησε, στις 28 Οκτωβρίου;',
      ),
      answer: t('Sebastiano Visconti Prasca', 'Ο Σεμπαστιάνο Βισκόντι Πράσκα'),
      wrong: [t('Pietro Badoglio', 'Ο Πιέτρο Μπαντόλιο'), t('Rodolfo Graziani', 'Ο Ροντόλφο Γκρατσιάνι'), t('Italo Balbo', 'Ο Ίταλο Μπάλμπο')],
      fact: t(
        'He had promised a quick victory and was replaced within two weeks. His successor, Ubaldo Soddu, was himself replaced in December by Ugo Cavallero.',
        'Είχε υποσχεθεί γρήγορη νίκη και αντικαταστάθηκε μέσα σε δύο εβδομάδες. Τον διάδοχό του, Ουμπάλντο Σόντου, τον αντικατέστησε κι αυτόν τον Δεκέμβριο ο Ούγκο Καβαλλέρο.',
      ),
    }),
    choice({
      id: 'p03',
      image: 'pindus-map',
      prompt: t(
        'Which elite Italian unit tried to cross the Pindus mountains and was beaten back?',
        'Ποια επίλεκτη ιταλική μονάδα προσπάθησε να διασχίσει την Πίνδο και αποκρούστηκε;',
      ),
      answer: t('The 3rd Alpine Division “Julia”', 'Η 3η Μεραρχία Αλπινιστών «Τζούλια»'),
      wrong: [
        t('The “Folgore” Paratroop Division', 'Η μεραρχία αλεξιπτωτιστών «Φόλγκορε»'),
        t('The “Ariete” Armoured Division', 'Η τεθωρακισμένη μεραρχία «Αριέτε»'),
        t('The “Littorio” Armoured Division', 'Η τεθωρακισμένη μεραρχία «Λιττόριο»'),
      ],
      fact: t(
        'The Julia Alpini aimed for Metsovo, to cut Epirus off from Thessaly. By mid-November they had been driven back with heavy losses.',
        'Οι Αλπινιστές της «Τζούλια» στόχευαν στο Μέτσοβο, για να αποκόψουν την Ήπειρο από τη Θεσσαλία. Ως τα μέσα Νοεμβρίου είχαν απωθηθεί με βαριές απώλειες.',
      ),
    }),
    choice({
      id: 'p04',
      image: 'karavias-davakis',
      prompt: t(
        'Which colonel led the small Pindus Detachment against the Italian Alpine troops?',
        'Ποιος συνταγματάρχης ηγήθηκε του μικρού Αποσπάσματος Πίνδου απέναντι στους Ιταλούς Αλπινιστές;',
      ),
      answer: t('Konstantinos Davakis', 'Ο Κωνσταντίνος Δαβάκης'),
      wrong: [
        t('Charalambos Katsimitros', 'Ο Χαράλαμπος Κατσιμήτρος'),
        t('Georgios Tsolakoglou', 'Ο Γεώργιος Τσολάκογλου'),
        t('Alexandros Papagos', 'Ο Αλέξανδρος Παπάγος'),
      ],
      fact: t(
        'With only about 2,000 men, Davakis held the mountain passes until reinforcements arrived. He was badly wounded on 2 November 1940.',
        'Με περίπου 2.000 άνδρες, ο Δαβάκης κράτησε τα ορεινά περάσματα ώσπου να φτάσουν ενισχύσεις. Τραυματίστηκε σοβαρά στις 2 Νοεμβρίου 1940.',
      ),
    }),
    map({
      id: 'p05',
      prompt: t(
        'The Battle of Pindus raged around mountain villages such as Samarina and Vovousa. Find Samarina.',
        'Η μάχη της Πίνδου δόθηκε γύρω από ορεινά χωριά όπως η Σαμαρίνα και η Βωβούσα. Βρες τη Σαμαρίνα.',
      ),
      place: t('Samarina', 'Σαμαρίνα'),
      lat: 40.1,
      lon: 21.0,
      fact: t(
        'At about 1,450 metres, Samarina is one of the highest villages in Greece. The fighting there was fought in fog, rain and snow.',
        'Στα 1.450 μέτρα περίπου, η Σαμαρίνα είναι από τα ψηλότερα χωριά της Ελλάδας. Οι μάχες εκεί δόθηκαν μέσα στην ομίχλη, τη βροχή και το χιόνι.',
      ),
    }),
    choice({
      id: 'p06',
      prompt: t(
        'Who carried ammunition and food on their backs up the snowy paths of the Pindus?',
        'Ποιοι κουβαλούσαν στην πλάτη τους πυρομαχικά και τρόφιμα στα χιονισμένα μονοπάτια της Πίνδου;',
      ),
      answer: t('The women of the mountain villages', 'Οι γυναίκες των ορεινών χωριών'),
      wrong: [t('Italian prisoners of war', 'Ιταλοί αιχμάλωτοι πολέμου'), t('British engineers', 'Βρετανοί μηχανικοί'), t('Boy Scouts from Athens', 'Πρόσκοποι από την Αθήνα')],
      fact: t(
        'The “women of the Pindus” walked for hours through mud and snow, carrying supplies up and the wounded down. They became one of the best-loved symbols of 1940.',
        'Οι «γυναίκες της Πίνδου» περπατούσαν ώρες μέσα στη λάσπη και το χιόνι, ανεβάζοντας εφόδια και κατεβάζοντας τραυματίες. Έγιναν από τα πιο αγαπημένα σύμβολα του ’40.',
      ),
    }),
    choice({
      id: 'p07',
      image: 'katsimitros',
      prompt: t(
        'Whose 8th Division stopped the main Italian attack on the Elaia–Kalamas line, near Kalpaki?',
        'Ποιου η 8η Μεραρχία ανέκοψε την κύρια ιταλική επίθεση στη γραμμή Ελαίας–Καλαμά, κοντά στο Καλπάκι;',
      ),
      answer: t('Major General Charalambos Katsimitros', 'Του υποστράτηγου Χαράλαμπου Κατσιμήτρου'),
      wrong: [
        t('Colonel Konstantinos Davakis', 'Του συνταγματάρχη Κωνσταντίνου Δαβάκη'),
        t('General Alexandros Papagos', 'Του στρατηγού Αλέξανδρου Παπάγου'),
        t('General Georgios Tsolakoglou', 'Του στρατηγού Γεωργίου Τσολάκογλου'),
      ],
      fact: t(
        'Katsimitros had been told to fight only a delaying action, but he chose to stand firm. From 2 to 8 November his men stopped Italian tanks and infantry.',
        'Ο Κατσιμήτρος είχε εντολή για απλό επιβραδυντικό αγώνα, όμως επέλεξε να αμυνθεί σταθερά. Από τις 2 έως τις 8 Νοεμβρίου οι άνδρες του σταμάτησαν τα ιταλικά άρματα και το πεζικό.',
      ),
    }),
    map({
      id: 'p08',
      prompt: t('Find Kalpaki, in Epirus, where the Greek line held.', 'Βρες το Καλπάκι, στην Ήπειρο, όπου κράτησε η ελληνική γραμμή.'),
      place: t('Kalpaki', 'Καλπάκι'),
      lat: 39.88,
      lon: 20.63,
      fact: t(
        'Kalpaki lies on the road from the Albanian border to Ioannina, the capital of Epirus, which the Italians had hoped to take within days.',
        'Το Καλπάκι βρίσκεται στον δρόμο από τα αλβανικά σύνορα προς τα Ιωάννινα, την πρωτεύουσα της Ηπείρου, που οι Ιταλοί έλπιζαν να καταλάβουν μέσα σε λίγες μέρες.',
      ),
    }),
    choice({
      id: 'p09',
      image: 'kalpaki-soldier',
      prompt: t('In this photo, a Greek soldier sits on a captured Italian…', 'Στη φωτογραφία, ένας Έλληνας στρατιώτης κάθεται πάνω σε αιχμάλωτο ιταλικό…'),
      answer: t('CV-33 tankette (light tank)', 'Ελαφρύ άρμα (τανκέτα) CV-33'),
      wrong: [t('Armoured train', 'Θωρακισμένο τρένο'), t('Seaplane', 'Υδροπλάνο'), t('Field kitchen', 'Φορητό μαγειρείο')],
      fact: t(
        'Italian tanks struggled in the mud and on the narrow mountain roads. Greek soldiers captured several around Kalpaki.',
        'Τα ιταλικά άρματα δυσκολεύονταν στη λάσπη και στους στενούς ορεινούς δρόμους. Οι Έλληνες στρατιώτες αιχμαλώτισαν αρκετά γύρω από το Καλπάκι.',
      ),
    }),
    choice({
      id: 'p10',
      prompt: t(
        'What famous battle cry did Greek soldiers shout when they charged with bayonets?',
        'Ποια ιαχή φώναζαν οι Έλληνες στρατιώτες όταν έκαναν έφοδο με τη λόγχη;',
      ),
      answer: t('«Αέρα!» (Aera!)', '«Αέρα!»'),
      wrong: [t('«Ζήτω!» (Zito!)', '«Ζήτω!»'), t('«Εμπρός!» (Embros!)', '«Εμπρός!»'), t('«Νίκη!» (Niki!)', '«Νίκη!»')],
      fact: t(
        'The cry “Aera!” echoed across the mountains of Epirus and Albania. It is still the war cry of the Greek army.',
        'Η ιαχή «Αέρα!» αντήχησε στα βουνά της Ηπείρου και της Αλβανίας. Είναι ακόμη η πολεμική ιαχή του ελληνικού στρατού.',
      ),
    }),
    choice({
      id: 'p11',
      image: 'papagos',
      prompt: t('Who was Commander-in-Chief of the Greek army in 1940–41?', 'Ποιος ήταν ο αρχιστράτηγος του ελληνικού στρατού το 1940–41;'),
      answer: t('Alexandros Papagos', 'Ο Αλέξανδρος Παπάγος'),
      wrong: [t('Ioannis Metaxas', 'Ο Ιωάννης Μεταξάς'), t('Konstantinos Davakis', 'Ο Κωνσταντίνος Δαβάκης'), t('Theodoros Pangalos', 'Ο Θεόδωρος Πάγκαλος')],
      fact: t(
        'Papagos directed the war from Athens. After the war he became Field Marshal and Prime Minister of Greece (1952–1955).',
        'Ο Παπάγος διηύθυνε τον πόλεμο από την Αθήνα. Μεταπολεμικά έγινε στρατάρχης και πρωθυπουργός της Ελλάδας (1952–1955).',
      ),
    }),
    choice({
      id: 'p12',
      image: 'vembo',
      prompt: t('Which singer became known as “the singer of victory” in 1940?', 'Ποια τραγουδίστρια ονομάστηκε «τραγουδίστρια της Νίκης» το 1940;'),
      answer: t('Sofia Vembo', 'Η Σοφία Βέμπο'),
      wrong: [t('Maria Callas', 'Η Μαρία Κάλλας'), t('Melina Mercouri', 'Η Μελίνα Μερκούρη'), t('Nana Mouskouri', 'Η Νάνα Μούσχουρη')],
      fact: t(
        'Her songs, full of humour and patriotism, were sung at the front and at home, above all “Children of Greece, children” (Paidia tis Ellados, paidia).',
        'Τα τραγούδια της, γεμάτα χιούμορ και πατριωτισμό, τραγουδιούνταν στο μέτωπο και στα μετόπισθεν, πάνω απ’ όλα το «Παιδιά της Ελλάδος, παιδιά».',
      ),
    }),
    choice({
      id: 'p13',
      image: 'lottery',
      prompt: t(
        'In November 1940 Greeks bought tickets for the “Great War Lottery”. What was it for?',
        'Τον Νοέμβριο του 1940 οι Έλληνες αγόραζαν λαχεία του «Μεγάλου Πολεμικού Λαχείου». Για ποιο σκοπό;',
      ),
      answer: t('To raise money for the war effort', 'Για να συγκεντρωθούν χρήματα για τον πόλεμο'),
      wrong: [
        t('To decide who would be called up', 'Για να κληρωθεί ποιοι θα επιστρατευτούν'),
        t('To win a trip to Rome', 'Για να κερδίσει κανείς ταξίδι στη Ρώμη'),
        t('To choose the new Prime Minister', 'Για να επιλεγεί ο νέος πρωθυπουργός'),
      ],
      fact: t(
        'The whole country rallied behind the front. People gave money, jewellery and food to support the soldiers.',
        'Όλη η χώρα στάθηκε πίσω από το μέτωπο. Ο κόσμος πρόσφερε χρήματα, κοσμήματα και τρόφιμα για να στηρίξει τους στρατιώτες.',
      ),
    }),
    choice({
      id: 'p14',
      prompt: t('When did the Greek counter-offensive begin?', 'Πότε ξεκίνησε η ελληνική αντεπίθεση;'),
      answer: t('14 November 1940', '14 Νοεμβρίου 1940'),
      wrong: [t('28 October 1940', '28 Οκτωβρίου 1940'), t('25 December 1940', '25 Δεκεμβρίου 1940'), t('6 April 1941', '6 Απριλίου 1941')],
      fact: t(
        'Less than three weeks after the invasion, the Greeks went on the attack and pushed the Italians back into Albania.',
        'Λιγότερο από τρεις εβδομάδες μετά την εισβολή, οι Έλληνες πέρασαν στην επίθεση και απώθησαν τους Ιταλούς στην Αλβανία.',
      ),
    }),
    choice({
      id: 'p15',
      prompt: t(
        'What did Greek destroyers do on the night of 14–15 November 1940?',
        'Τι έκαναν ελληνικά αντιτορπιλικά τη νύχτα της 14ης προς 15η Νοεμβρίου 1940;',
      ),
      answer: t('They raided Italian shipping in the Strait of Otranto', 'Έκαναν επιδρομή κατά της ιταλικής ναυσιπλοΐας στο Στενό του Οτράντο'),
      wrong: [
        t('They shelled the port of Naples', 'Βομβάρδισαν το λιμάνι της Νάπολης'),
        t('They landed troops on Rhodes', 'Αποβίβασαν στρατό στη Ρόδο'),
        t('They escorted the King to Egypt', 'Συνόδευσαν τον βασιλιά στην Αίγυπτο'),
      ],
      fact: t(
        'The Strait of Otranto, between Italy and Albania, was the lifeline of the Italian army. Greek destroyers raided it several times that winter.',
        'Το Στενό του Οτράντο, ανάμεσα σε Ιταλία και Αλβανία, ήταν η αρτηρία ανεφοδιασμού του ιταλικού στρατού. Τα ελληνικά αντιτορπιλικά έκαναν εκεί αρκετές επιδρομές εκείνον τον χειμώνα.',
      ),
    }),
    choice({
      id: 'p16',
      image: 'morava-artillery',
      prompt: t(
        'Greek artillery pounded which heights near Korytsa in November 1940?',
        'Ποια υψώματα κοντά στην Κορυτσά σφυροκοπούσε το ελληνικό πυροβολικό τον Νοέμβριο του 1940;',
      ),
      answer: t('Morava and Ivan', 'Τη Μόραβα και το Ιβάν'),
      wrong: [t('Olympus and Ossa', 'Τον Όλυμπο και την Όσσα'), t('Parnassos and Giona', 'Τον Παρνασσό και την Γκιώνα'), t('Taygetos and Parnon', 'Τον Ταΰγετο και τον Πάρνωνα')],
      fact: t(
        'The hard battle of Morava–Ivan in mid-November broke the Italian defences and opened the road to Korytsa.',
        'Η σκληρή μάχη Μόραβας–Ιβάν στα μέσα Νοεμβρίου έσπασε την ιταλική άμυνα και άνοιξε τον δρόμο για την Κορυτσά.',
      ),
    }),
    map({
      id: 'p17',
      prompt: t(
        'Find Korytsa (Korçë), the first large town the Greek army took in Albania.',
        'Βρες την Κορυτσά, την πρώτη μεγάλη πόλη που κατέλαβε ο ελληνικός στρατός στη Βόρεια Ήπειρο.',
      ),
      place: t('Korytsa (Korçë)', 'Κορυτσά'),
      lat: 40.62,
      lon: 20.78,
      fact: t(
        'Korytsa was an important Italian base with an airfield and depots. Church bells rang across Greece when it was taken.',
        'Η Κορυτσά ήταν σημαντική ιταλική βάση, με αεροδρόμιο και αποθήκες. Όταν καταλήφθηκε, οι καμπάνες χτύπησαν σε όλη την Ελλάδα.',
      ),
    }),
    choice({
      id: 'p18',
      image: 'korce',
      prompt: t('When did the Greek army enter Korytsa?', 'Πότε μπήκε ο ελληνικός στρατός στην Κορυτσά;'),
      answer: t('22 November 1940', '22 Νοεμβρίου 1940'),
      wrong: [t('28 October 1940', '28 Οκτωβρίου 1940'), t('10 January 1941', '10 Ιανουαρίου 1941'), t('25 March 1941', '25 Μαρτίου 1941')],
      fact: t(
        'The news spread fast: in Athens, crowds celebrated in the streets and the photos went around the world.',
        'Η είδηση διαδόθηκε αστραπιαία: στην Αθήνα ο κόσμος πανηγύριζε στους δρόμους και οι φωτογραφίες έκαναν τον γύρο του κόσμου.',
      ),
    }),
    choice({
      id: 'p19',
      prompt: t(
        'The Italians had renamed the port of Agioi Saranta (Sarandë) after Mussolini’s daughter. What did they call it?',
        'Οι Ιταλοί είχαν μετονομάσει το λιμάνι των Αγίων Σαράντα προς τιμήν της κόρης του Μουσολίνι. Πώς το ονόμασαν;',
      ),
      answer: t('Porto Edda', 'Πόρτο Έντα'),
      wrong: [t('Porto Benito', 'Πόρτο Μπενίτο'), t('Porto Roma', 'Πόρτο Ρόμα'), t('Porto Vittoria', 'Πόρτο Βιτόρια')],
      fact: t(
        'Edda was Mussolini’s eldest daughter. The Greek army captured the port on 6 December 1940.',
        'Η Έντα ήταν η μεγαλύτερη κόρη του Μουσολίνι. Ο ελληνικός στρατός κατέλαβε το λιμάνι στις 6 Δεκεμβρίου 1940.',
      ),
    }),
    choice({
      id: 'p20',
      prompt: t('Which town did the Greek army capture on 8 December 1940?', 'Ποια πόλη κατέλαβε ο ελληνικός στρατός στις 8 Δεκεμβρίου 1940;'),
      answer: t('Argyrokastro (Gjirokastër)', 'Το Αργυρόκαστρο'),
      wrong: [t('Tirana', 'Τα Τίρανα'), t('Valona (Vlorë)', 'Την Αυλώνα'), t('Durrës', 'Το Δυρράχιο')],
      fact: t(
        'Argyrokastro, with its great castle, had a large Greek community. By late December the Greek army held about a quarter of Albania.',
        'Το Αργυρόκαστρο, με το μεγάλο του κάστρο, είχε πολυάριθμη ελληνική κοινότητα. Ως τα τέλη Δεκεμβρίου ο ελληνικός στρατός ήλεγχε περίπου το ένα τέταρτο της Αλβανίας.',
      ),
    }),
  ],
};
