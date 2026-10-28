import type { Chapter } from '../../types';
import { choice, map, t } from '../helpers';

export const liberation: Chapter = {
  id: 'liberation',
  title: t('Occupation & Liberation', 'Κατοχή και Απελευθέρωση'),
  period: t('1941 – 1945', '1941 – 1945'),
  blurb: t(
    'The flag torn from the Acropolis, the Resistance, the Holocaust, and freedom at last.',
    'Η σημαία που κατέβηκε από την Ακρόπολη, η Αντίσταση, το Ολοκαύτωμα και, επιτέλους, η λευτεριά.',
  ),
  cover: 'liberation-athens',
  questions: [
    choice({
      id: 'l01',
      image: 'acropolis-flag',
      prompt: t(
        'In April 1941 the occupiers raised the swastika flag on the Acropolis. What happened to it on the night of 30 May?',
        'Τον Απρίλιο του 1941 οι κατακτητές ύψωσαν τη σημαία με τον αγκυλωτό σταυρό στην Ακρόπολη. Τι απέγινε τη νύχτα της 30ής Μαΐου;',
      ),
      answer: t('Two young men climbed up and tore it down', 'Δύο νέοι σκαρφάλωσαν και την κατέβασαν'),
      wrong: [
        t('A storm blew it away', 'Την πήρε μια καταιγίδα'),
        t('British aircraft shot it down', 'Την κατέρριψαν βρετανικά αεροπλάνα'),
        t('It was replaced by the Italian flag', 'Αντικαταστάθηκε από την ιταλική σημαία'),
      ],
      fact: t(
        'It was one of the first acts of resistance in occupied Europe, and news of it spread around the world.',
        'Ήταν μία από τις πρώτες πράξεις αντίστασης στην κατεχόμενη Ευρώπη και η είδηση έκανε τον γύρο του κόσμου.',
      ),
    }),
    choice({
      id: 'l02',
      image: 'glezos-stamp',
      prompt: t('Who were the two young men?', 'Ποιοι ήταν οι δύο νέοι;'),
      answer: t('Manolis Glezos and Apostolos Santas', 'Ο Μανώλης Γλέζος και ο Απόστολος Σάντας'),
      wrong: [
        t('Odysseas Elytis and Giorgos Seferis', 'Ο Οδυσσέας Ελύτης και ο Γιώργος Σεφέρης'),
        t('Marinos Mitralexis and Konstantinos Davakis', 'Ο Μαρίνος Μητραλέξης και ο Κωνσταντίνος Δαβάκης'),
        t('Ioannis Metaxas and Alexandros Papagos', 'Ο Ιωάννης Μεταξάς και ο Αλέξανδρος Παπάγος'),
      ],
      fact: t(
        'Glezos was 18 and Santas 19. Glezos became a symbol of resistance across the world; the Soviet Union even honoured him with this stamp in 1959.',
        'Ο Γλέζος ήταν 18 χρονών και ο Σάντας 19. Ο Γλέζος έγινε παγκόσμιο σύμβολο αντίστασης· η Σοβιετική Ένωση τον τίμησε ακόμη και με αυτό το γραμματόσημο το 1959.',
      ),
    }),
    map({
      id: 'l03',
      prompt: t('Find Naxos, the island where Manolis Glezos was born.', 'Βρες τη Νάξο, το νησί όπου γεννήθηκε ο Μανώλης Γλέζος.'),
      place: t('Naxos', 'Νάξος'),
      lat: 37.06,
      lon: 25.47,
      radiusKm: 30,
      fact: t(
        'Glezos was born in the mountain village of Apeiranthos in 1922. He lived until 2020 and stayed politically active into his nineties.',
        'Ο Γλέζος γεννήθηκε στο ορεινό χωριό Απείρανθος το 1922. Έζησε ως το 2020 και παρέμεινε πολιτικά ενεργός ως τα βαθιά γεράματα.',
      ),
    }),
    choice({
      id: 'l04',
      image: 'triple-occupation',
      prompt: t(
        'After the spring of 1941 Greece was split into three occupation zones. Of which countries?',
        'Μετά την άνοιξη του 1941 η Ελλάδα χωρίστηκε σε τρεις ζώνες κατοχής. Ποιων χωρών;',
      ),
      answer: t('Germany, Italy and Bulgaria', 'Της Γερμανίας, της Ιταλίας και της Βουλγαρίας'),
      wrong: [
        t('Germany, Italy and Hungary', 'Της Γερμανίας, της Ιταλίας και της Ουγγαρίας'),
        t('Germany, Romania and Bulgaria', 'Της Γερμανίας, της Ρουμανίας και της Βουλγαρίας'),
        t('Italy, Albania and Turkey', 'Της Ιταλίας, της Αλβανίας και της Τουρκίας'),
      ],
      fact: t(
        'Germany kept the key areas such as Athens, Thessaloniki and most of Crete. Italy held most of the mainland and islands, and Bulgaria annexed eastern Macedonia and Thrace.',
        'Η Γερμανία κράτησε τις καίριες περιοχές, όπως την Αθήνα, τη Θεσσαλονίκη και το μεγαλύτερο μέρος της Κρήτης. Η Ιταλία πήρε το μεγαλύτερο μέρος της ηπειρωτικής χώρας και των νησιών και η Βουλγαρία προσάρτησε την Ανατολική Μακεδονία και τη Θράκη.',
      ),
    }),
    choice({
      id: 'l05',
      prompt: t(
        'What struck occupied Athens in the winter of 1941–42, killing tens of thousands?',
        'Τι έπληξε την κατεχόμενη Αθήνα τον χειμώνα του 1941–42, σκοτώνοντας δεκάδες χιλιάδες ανθρώπους;',
      ),
      answer: t('A terrible famine', 'Ένας φοβερός λιμός'),
      wrong: [t('An earthquake', 'Ένας σεισμός'), t('A great flood', 'Μια μεγάλη πλημμύρα'), t('A volcanic eruption', 'Μια ηφαιστειακή έκρηξη')],
      fact: t(
        'The occupiers seized food, and the Allied blockade cut off imports. The Great Famine became one of the darkest chapters of the occupation.',
        'Οι κατακτητές επίταξαν τα τρόφιμα και ο συμμαχικός αποκλεισμός σταμάτησε τις εισαγωγές. Η Μεγάλη Πείνα έγινε μία από τις πιο σκοτεινές σελίδες της Κατοχής.',
      ),
    }),
    choice({
      id: 'l06',
      prompt: t('Who was Lela Karagianni?', 'Ποια ήταν η Λέλα Καραγιάννη;'),
      answer: t('A leader of the Resistance in occupied Athens', 'Ηγετική μορφή της Αντίστασης στην κατεχόμενη Αθήνα'),
      wrong: [t('The “singer of victory”', 'Η «τραγουδίστρια της Νίκης»'), t('The first Greek woman pilot', 'Η πρώτη Ελληνίδα πιλότος'), t('An Olympic champion of 1936', 'Ολυμπιονίκης του 1936')],
      fact: t(
        'A mother of seven, she ran a resistance network named after the 1821 heroine Bouboulina, helping Allied soldiers escape. The Germans executed her in September 1944.',
        'Μητέρα επτά παιδιών, οργάνωσε δίκτυο αντίστασης με το όνομα της ηρωίδας του 1821 Μπουμπουλίνας, βοηθώντας Συμμάχους στρατιώτες να διαφύγουν. Οι Γερμανοί την εκτέλεσαν τον Σεπτέμβριο του 1944.',
      ),
    }),
    choice({
      id: 'l07',
      image: 'davakis-tunic',
      prompt: t(
        'This uniform tunic belonged to a hero of the Battle of Pindus, who later died as a prisoner of the occupiers. Who?',
        'Αυτό το χιτώνιο ανήκε σε έναν ήρωα της μάχης της Πίνδου, που αργότερα πέθανε αιχμάλωτος των κατακτητών. Ποιος;',
      ),
      answer: t('Konstantinos Davakis', 'Ο Κωνσταντίνος Δαβάκης'),
      wrong: [t('Marinos Mitralexis', 'Ο Μαρίνος Μητραλέξης'), t('Charalambos Katsimitros', 'Ο Χαράλαμπος Κατσιμήτρος'), t('Alexandros Papagos', 'Ο Αλέξανδρος Παπάγος')],
      fact: t(
        'Davakis was arrested by the Italian occupiers. He died in January 1943, when the ship taking him to a prison camp in Italy was torpedoed.',
        'Ο Δαβάκης συνελήφθη από τις ιταλικές αρχές κατοχής. Πέθανε τον Ιανουάριο του 1943, όταν τορπιλίστηκε το πλοίο που τον μετέφερε σε στρατόπεδο στην Ιταλία.',
      ),
    }),
    choice({
      id: 'l08',
      prompt: t(
        'Thousands of Greeks escaped to the Middle East to keep fighting. In which great battle in Egypt, in 1942, did the Greek 1st Brigade fight beside the British?',
        'Χιλιάδες Έλληνες διέφυγαν στη Μέση Ανατολή για να συνεχίσουν τον αγώνα. Σε ποια μεγάλη μάχη στην Αίγυπτο, το 1942, πολέμησε η 1η Ελληνική Ταξιαρχία στο πλευρό των Βρετανών;',
      ),
      answer: t('El Alamein', 'Στο Ελ Αλαμέιν'),
      wrong: [t('Stalingrad', 'Στο Στάλινγκραντ'), t('Normandy', 'Στη Νορμανδία'), t('Tobruk', 'Στο Τομπρούκ')],
      fact: t(
        'The free Greek forces also included the navy, the air force and the Sacred Band, which later fought in the islands of the Aegean.',
        'Στις ελεύθερες ελληνικές δυνάμεις ανήκαν επίσης το ναυτικό, η αεροπορία και ο Ιερός Λόχος, που αργότερα πολέμησε στα νησιά του Αιγαίου.',
      ),
    }),
    choice({
      id: 'l09',
      image: 'partisans',
      prompt: t(
        'Thousands took up arms in the mountains. What was the army of EAM, the largest resistance movement, called?',
        'Χιλιάδες πήραν τα όπλα στα βουνά. Πώς λεγόταν ο στρατός του ΕΑΜ, του μεγαλύτερου κινήματος της Αντίστασης;',
      ),
      answer: t('ELAS', 'ΕΛΑΣ'),
      wrong: [t('EDES', 'ΕΔΕΣ'), t('EOKA', 'ΕΟΚΑ'), t('The Sacred Band', 'Ιερός Λόχος')],
      fact: t(
        'ELAS (the Greek People’s Liberation Army) grew to tens of thousands of fighters. Other groups, such as Napoleon Zervas’ EDES, also fought the occupiers.',
        'Ο ΕΛΑΣ (Ελληνικός Λαϊκός Απελευθερωτικός Στρατός) έφτασε να αριθμεί δεκάδες χιλιάδες μαχητές. Και άλλες οργανώσεις, όπως ο ΕΔΕΣ του Ναπολέοντα Ζέρβα, πολέμησαν τους κατακτητές.',
      ),
    }),
    choice({
      id: 'l10',
      image: 'gorgopotamos',
      prompt: t(
        'On 25 November 1942 Greek partisans and British commandos blew up a railway bridge, cutting a key German supply line. Which one?',
        'Στις 25 Νοεμβρίου 1942 Έλληνες αντάρτες και Βρετανοί κομάντος ανατίναξαν μια σιδηροδρομική γέφυρα, κόβοντας κρίσιμη γραμμή ανεφοδιασμού των Γερμανών. Ποια;',
      ),
      answer: t('The Gorgopotamos viaduct', 'Τη γέφυρα του Γοργοποτάμου'),
      wrong: [t('The Corinth Canal bridge', 'Τη γέφυρα της Διώρυγας της Κορίνθου'), t('The old bridge of Arta', 'Το γεφύρι της Άρτας'), t('The Rio–Antirrio bridge', 'Τη γέφυρα Ρίου–Αντιρρίου')],
      fact: t(
        'ELAS fighters under Aris Velouchiotis and EDES fighters under Napoleon Zervas fought side by side with British officers. It was one of the most spectacular acts of sabotage in occupied Europe.',
        'Αντάρτες του ΕΛΑΣ με τον Άρη Βελουχιώτη και του ΕΔΕΣ με τον Ναπολέοντα Ζέρβα πολέμησαν μαζί με Βρετανούς αξιωματικούς. Ήταν από τα πιο εντυπωσιακά σαμποτάζ στην κατεχόμενη Ευρώπη.',
      ),
    }),
    map({
      id: 'l11',
      prompt: t(
        'Find the Gorgopotamos viaduct, on the railway south of Lamia.',
        'Βρες τη γέφυρα του Γοργοποτάμου, στη σιδηροδρομική γραμμή νότια της Λαμίας.',
      ),
      place: t('Gorgopotamos', 'Γοργοπόταμος'),
      lat: 38.83,
      lon: 22.38,
      fact: t(
        'The bridge carried the main Athens–Thessaloniki railway. The anniversary of the operation is commemorated at the site every year.',
        'Η γέφυρα εξυπηρετούσε την κύρια σιδηροδρομική γραμμή Αθήνας–Θεσσαλονίκης. Κάθε χρόνο η επέτειος της επιχείρησης τιμάται στον τόπο της.',
      ),
    }),
    choice({
      id: 'l12',
      image: 'thessaloniki-jews',
      prompt: t(
        'In 1943 the Germans deported tens of thousands of Jews from a Greek city once called “the Jerusalem of the Balkans”. Which city?',
        'Το 1943 οι Γερμανοί εκτόπισαν δεκάδες χιλιάδες Εβραίους από μια ελληνική πόλη που αποκαλούνταν «Ιερουσαλήμ των Βαλκανίων». Ποια;',
      ),
      answer: t('Thessaloniki', 'Τη Θεσσαλονίκη'),
      wrong: [t('Patras', 'Την Πάτρα'), t('Kalamata', 'Την Καλαμάτα'), t('Volos', 'Τον Βόλο')],
      fact: t(
        'Around 50,000 Jews of Thessaloniki were sent to Auschwitz-Birkenau; very few came back. Communities across Greece, from Ioannina to Crete and Rhodes, met a similar fate.',
        'Περίπου 50.000 Εβραίοι της Θεσσαλονίκης στάλθηκαν στο Άουσβιτς-Μπιρκενάου· ελάχιστοι γύρισαν. Παρόμοια μοίρα είχαν κοινότητες σε όλη την Ελλάδα, από τα Ιωάννινα ως την Κρήτη και τη Ρόδο.',
      ),
    }),
    choice({
      id: 'l13',
      image: 'damaskinos',
      prompt: t(
        'Which Archbishop of Athens publicly protested against the persecution of the Jews in 1943?',
        'Ποιος αρχιεπίσκοπος Αθηνών διαμαρτυρήθηκε δημόσια για τη δίωξη των Εβραίων το 1943;',
      ),
      answer: t('Damaskinos', 'Ο Δαμασκηνός'),
      wrong: [t('Christodoulos', 'Ο Χριστόδουλος'), t('Ieronymos', 'Ο Ιερώνυμος'), t('Makarios', 'Ο Μακάριος')],
      fact: t(
        'Damaskinos and leading figures of Athens signed a letter of protest. Many Jews in Athens survived thanks to false identity papers and the help of ordinary Greeks.',
        'Ο Δαμασκηνός και επιφανείς Αθηναίοι υπέγραψαν επιστολή διαμαρτυρίας. Πολλοί Εβραίοι της Αθήνας σώθηκαν χάρη σε πλαστές ταυτότητες και στη βοήθεια απλών ανθρώπων.',
      ),
    }),
    choice({
      id: 'l14',
      prompt: t(
        'After Italy’s armistice in September 1943, what happened to the Italian Acqui Division on Kefalonia?',
        'Μετά την ανακωχή της Ιταλίας τον Σεπτέμβριο του 1943, τι συνέβη στην ιταλική μεραρχία «Άκουι» στην Κεφαλονιά;',
      ),
      answer: t(
        'It fought the Germans, and thousands of its men were executed after surrendering',
        'Πολέμησε τους Γερμανούς και χιλιάδες άνδρες της εκτελέστηκαν μετά την παράδοσή τους',
      ),
      wrong: [
        t('It joined the German army', 'Εντάχθηκε στον γερμανικό στρατό'),
        t('It sailed home to Italy safely', 'Επέστρεψε με ασφάλεια στην Ιταλία'),
        t('It took Corfu from the Germans', 'Πήρε την Κέρκυρα από τους Γερμανούς'),
      ],
      fact: t(
        'The massacre of the Acqui Division is one of the worst crimes against prisoners of war. Some Italian soldiers escaped and fought alongside the Greek resistance.',
        'Η σφαγή της μεραρχίας «Άκουι» είναι από τα χειρότερα εγκλήματα κατά αιχμαλώτων πολέμου. Ορισμένοι Ιταλοί στρατιώτες διέφυγαν και πολέμησαν στο πλευρό της ελληνικής Αντίστασης.',
      ),
    }),
    choice({
      id: 'l15',
      prompt: t(
        'On 13 December 1943 German troops burned a town in the Peloponnese and executed almost all its men. Which town?',
        'Στις 13 Δεκεμβρίου 1943 γερμανικά στρατεύματα έκαψαν μια πόλη της Πελοποννήσου και εκτέλεσαν σχεδόν όλους τους άνδρες της. Ποια;',
      ),
      answer: t('Kalavryta', 'Τα Καλάβρυτα'),
      wrong: [t('Nafplio', 'Το Ναύπλιο'), t('Olympia', 'Την Ολυμπία'), t('Sparta', 'Τη Σπάρτη')],
      fact: t(
        'The Kalavryta massacre was one of the worst atrocities of the occupation. Villages such as Kommeno, Distomo and Chortiatis suffered similar fates.',
        'Το Ολοκαύτωμα των Καλαβρύτων ήταν από τις χειρότερες θηριωδίες της Κατοχής. Παρόμοια μοίρα είχαν χωριά όπως το Κομμένο, το Δίστομο και ο Χορτιάτης.',
      ),
    }),
    choice({
      id: 'l16',
      prompt: t(
        'In April 1944 British officers and Cretan resistance fighters carried out a daring operation on Crete. What did they do?',
        'Τον Απρίλιο του 1944 Βρετανοί αξιωματικοί και Κρητικοί αντάρτες έκαναν μια τολμηρή επιχείρηση στην Κρήτη. Τι έκαναν;',
      ),
      answer: t('They kidnapped the German commander, General Kreipe', 'Απήγαγαν τον Γερμανό διοικητή, στρατηγό Κράιπε'),
      wrong: [
        t('They blew up Maleme airfield', 'Ανατίναξαν το αεροδρόμιο του Μάλεμε'),
        t('They sank a German battleship', 'Βύθισαν γερμανικό θωρηκτό'),
        t('They freed Heraklion', 'Απελευθέρωσαν το Ηράκλειο'),
      ],
      fact: t(
        'Led by Patrick Leigh Fermor and Bill Stanley Moss, they hid Kreipe in the mountains for more than two weeks before a boat took him to Egypt.',
        'Με επικεφαλής τον Πάτρικ Λι Φέρμορ και τον Μπιλ Στάνλεϊ Μος, έκρυψαν τον Κράιπε στα βουνά για πάνω από δύο εβδομάδες, ώσπου ένα σκάφος τον μετέφερε στην Αίγυπτο.',
      ),
    }),
    choice({
      id: 'l17',
      image: 'rimini-brigade',
      prompt: t(
        'In September 1944 the Greek 3rd Mountain Brigade fought in Italy and freed a city, earning its name. Which city?',
        'Τον Σεπτέμβριο του 1944 η ΙΙΙ Ελληνική Ορεινή Ταξιαρχία πολέμησε στην Ιταλία και απελευθέρωσε μια πόλη, παίρνοντας το όνομά της. Ποια;',
      ),
      answer: t('Rimini', 'Το Ρίμινι'),
      wrong: [t('Rome', 'Τη Ρώμη'), t('Naples', 'Τη Νάπολη'), t('Milan', 'Το Μιλάνο')],
      fact: t(
        'The “Rimini Brigade” entered the city on 21 September 1944 and returned to liberated Greece a few weeks later.',
        'Η «Ταξιαρχία Ρίμινι» μπήκε στην πόλη στις 21 Σεπτεμβρίου 1944 και λίγες εβδομάδες αργότερα επέστρεψε στην ελεύθερη πια Ελλάδα.',
      ),
    }),
    choice({
      id: 'l18',
      image: 'flag-1944',
      prompt: t('When did the last German troops leave Athens?', 'Πότε έφυγαν από την Αθήνα τα τελευταία γερμανικά στρατεύματα;'),
      answer: t('12 October 1944', '12 Οκτωβρίου 1944'),
      wrong: [t('6 June 1944', '6 Ιουνίου 1944'), t('25 March 1943', '25 Μαρτίου 1943'), t('8 May 1945', '8 Μαΐου 1945')],
      fact: t(
        'Bells rang and crowds filled the streets as the Greek flag flew again over the Acropolis. On 18 October the government of national unity under Georgios Papandreou returned.',
        'Οι καμπάνες χτυπούσαν και ο κόσμος ξεχύθηκε στους δρόμους, καθώς η ελληνική σημαία κυμάτιζε ξανά στην Ακρόπολη. Στις 18 Οκτωβρίου επέστρεψε η κυβέρνηση εθνικής ενότητας του Γεωργίου Παπανδρέου.',
      ),
    }),
    choice({
      id: 'l19',
      image: 'rhodes-liberation',
      prompt: t(
        'The war in Greece ended only in May 1945. Where were the last German forces on Greek soil?',
        'Ο πόλεμος στην Ελλάδα τελείωσε μόλις τον Μάιο του 1945. Πού βρίσκονταν οι τελευταίες γερμανικές δυνάμεις σε ελληνικό έδαφος;',
      ),
      answer: t('In the Dodecanese and western Crete', 'Στα Δωδεκάνησα και στη δυτική Κρήτη'),
      wrong: [t('On Mount Olympus', 'Στον Όλυμπο'), t('In Thessaloniki', 'Στη Θεσσαλονίκη'), t('On Corfu', 'Στην Κέρκυρα')],
      fact: t(
        'On 8 May 1945 the German commander of the Dodecanese signed the surrender on the island of Symi; the photo shows the moment. The garrison of Crete laid down its arms in the same days.',
        'Στις 8 Μαΐου 1945 ο Γερμανός διοικητής της Δωδεκανήσου υπέγραψε την παράδοση στο νησί της Σύμης· η φωτογραφία δείχνει τη στιγμή. Την ίδια περίοδο κατέθεσε τα όπλα και η φρουρά της Κρήτης.',
      ),
    }),
    map({
      id: 'l20',
      prompt: t(
        'In 1940 Rhodes was not part of Greece: it belonged to Italy. Find Rhodes.',
        'Το 1940 η Ρόδος δεν ανήκε στην Ελλάδα αλλά στην Ιταλία. Βρες τη Ρόδο.',
      ),
      place: t('Rhodes', 'Ρόδος'),
      lat: 36.2,
      lon: 27.95,
      radiusKm: 40,
      fact: t(
        'The Dodecanese had been under Italian rule since 1912. After the war they were united with Greece, officially on 7 March 1948.',
        'Τα Δωδεκάνησα βρίσκονταν υπό ιταλική κυριαρχία από το 1912. Μετά τον πόλεμο ενώθηκαν με την Ελλάδα, επίσημα στις 7 Μαρτίου 1948.',
      ),
    }),
  ],
};
