import type { Chapter } from '../../types';
import { choice, map, t } from '../helpers';

export const invasion: Chapter = {
  id: 'invasion',
  title: t('Invasion & Crete', 'Εισβολή και Κρήτη'),
  period: t('April – June 1941', 'Απρίλιος – Ιούνιος 1941'),
  blurb: t(
    'Germany attacks: the forts of the Metaxas Line, the fall of Athens and the Battle of Crete.',
    'Η Γερμανία επιτίθεται: τα οχυρά της Γραμμής Μεταξά, η πτώση της Αθήνας και η Μάχη της Κρήτης.',
  ),
  cover: 'crete-paratroopers',
  questions: [
    choice({
      id: 'g01',
      prompt: t('On which date did Germany invade Greece?', 'Ποια μέρα εισέβαλε η Γερμανία στην Ελλάδα;'),
      answer: t('6 April 1941', '6 Απριλίου 1941'),
      wrong: [t('28 October 1940', '28 Οκτωβρίου 1940'), t('25 March 1941', '25 Μαρτίου 1941'), t('20 May 1941', '20 Μαΐου 1941')],
      fact: t(
        'Germany came to the rescue of its defeated ally. That same morning it also invaded Yugoslavia.',
        'Η Γερμανία έσπευσε να σώσει τον ηττημένο σύμμαχό της. Το ίδιο πρωί εισέβαλε και στη Γιουγκοσλαβία.',
      ),
    }),
    choice({
      id: 'g02',
      prompt: t('What was the codename of the German invasion of Greece?', 'Ποια ήταν η κωδική ονομασία της γερμανικής εισβολής στην Ελλάδα;'),
      answer: t('Operation Marita', 'Επιχείρηση «Μαρίτα»'),
      wrong: [t('Operation Barbarossa', 'Επιχείρηση «Μπαρμπαρόσα»'), t('Operation Sea Lion', 'Επιχείρηση «Θαλάσσιος Λέων»'), t('Operation Overlord', 'Επιχείρηση «Overlord»')],
      fact: t(
        'Barbarossa was the invasion of the Soviet Union on 22 June 1941. Many historians believe the Balkan campaign helped delay it.',
        '«Μπαρμπαρόσα» ήταν η εισβολή στη Σοβιετική Ένωση στις 22 Ιουνίου 1941. Πολλοί ιστορικοί θεωρούν ότι η εκστρατεία στα Βαλκάνια συνέβαλε στην καθυστέρησή της.',
      ),
    }),
    choice({
      id: 'g03',
      image: 'marita-map',
      prompt: t('From which country did most German forces attack Greece?', 'Από ποια χώρα επιτέθηκαν στην Ελλάδα οι περισσότερες γερμανικές δυνάμεις;'),
      answer: t('Bulgaria', 'Από τη Βουλγαρία'),
      wrong: [t('Albania', 'Από την Αλβανία'), t('Turkey', 'Από την Τουρκία'), t('Italy, by sea', 'Από την Ιταλία, διά θαλάσσης')],
      fact: t(
        'Bulgaria had joined the Axis on 1 March 1941 and let German troops gather on its soil. Other German columns swept down through Yugoslavia.',
        'Η Βουλγαρία είχε προσχωρήσει στον Άξονα την 1η Μαρτίου 1941 και επέτρεψε να συγκεντρωθούν γερμανικά στρατεύματα στο έδαφός της. Άλλες γερμανικές φάλαγγες κατέβηκαν μέσω Γιουγκοσλαβίας.',
      ),
    }),
    choice({
      id: 'g04',
      image: 'metaxas-line',
      prompt: t('What was the chain of forts on the Greek–Bulgarian border called?', 'Πώς ονομαζόταν η αλυσίδα οχυρών στα ελληνοβουλγαρικά σύνορα;'),
      answer: t('The Metaxas Line', 'Η Γραμμή Μεταξά'),
      wrong: [t('The Maginot Line', 'Η Γραμμή Μαζινό'), t('The Siegfried Line', 'Η Γραμμή Ζίγκφριντ'), t('The Mannerheim Line', 'Η Γραμμή Μάνερχαϊμ')],
      fact: t(
        'Built from 1936, it stretched along the mountains of Macedonia and Thrace. Its defenders held out for days against heavy German attacks.',
        'Χτίστηκε από το 1936 και απλωνόταν στα βουνά της Μακεδονίας και της Θράκης. Οι υπερασπιστές της άντεξαν για μέρες απέναντι σε σφοδρές γερμανικές επιθέσεις.',
      ),
    }),
    map({
      id: 'g05',
      prompt: t(
        'Find Fort Rupel, guarding the Strymon valley near the Bulgarian border.',
        'Βρες το Οχυρό Ρούπελ, που φύλαγε την κοιλάδα του Στρυμόνα κοντά στα βουλγαρικά σύνορα.',
      ),
      place: t('Fort Rupel', 'Οχυρό Ρούπελ'),
      lat: 41.36,
      lon: 23.35,
      fact: t(
        'Despite dive-bombers and heavy artillery, Fort Rupel never fell. It laid down its arms only after the Greek army in Macedonia capitulated.',
        'Παρά τα βομβαρδιστικά κάθετης εφόρμησης και το βαρύ πυροβολικό, το Ρούπελ δεν έπεσε ποτέ. Κατέθεσε τα όπλα μόνο όταν συνθηκολόγησε ο ελληνικός στρατός της Μακεδονίας.',
      ),
    }),
    choice({
      id: 'g06',
      image: 'greece-9april-map',
      prompt: t('Which city fell to the Germans on 9 April 1941, cutting off the forts?', 'Ποια πόλη έπεσε στους Γερμανούς στις 9 Απριλίου 1941, αποκόπτοντας τα οχυρά;'),
      answer: t('Thessaloniki', 'Η Θεσσαλονίκη'),
      wrong: [t('Athens', 'Η Αθήνα'), t('Ioannina', 'Τα Ιωάννινα'), t('Larissa', 'Η Λάρισα')],
      fact: t(
        'German armour came down through Yugoslavia and the Axios valley, going round the Metaxas Line from the west.',
        'Τα γερμανικά τεθωρακισμένα κατέβηκαν μέσω Γιουγκοσλαβίας και της κοιλάδας του Αξιού, παρακάμπτοντας τη Γραμμή Μεταξά από τα δυτικά.',
      ),
    }),
    choice({
      id: 'g07',
      image: 'rupel-map',
      prompt: t(
        'How did German officers treat the defenders of the forts after the surrender?',
        'Πώς φέρθηκαν οι Γερμανοί αξιωματικοί στους υπερασπιστές των οχυρών μετά τη συνθηκολόγηση;',
      ),
      answer: t(
        'They praised their courage and let them march out with military honours',
        'Τίμησαν τη γενναιότητά τους και τους άφησαν να αποχωρήσουν με στρατιωτικές τιμές',
      ),
      wrong: [
        t('They forced them to join the German army', 'Τους ανάγκασαν να καταταγούν στον γερμανικό στρατό'),
        t('They sent them all to camps in Poland', 'Τους έστειλαν όλους σε στρατόπεδα στην Πολωνία'),
        t('They took no notice of them', 'Τους αγνόησαν'),
      ],
      fact: t(
        'Impressed by the resistance, the Germans let the garrisons leave with their flags. The stand of the forts has become a legend in Greece.',
        'Εντυπωσιασμένοι από την αντίσταση, οι Γερμανοί άφησαν τις φρουρές να αποχωρήσουν με τις σημαίες τους. Η άμυνα των οχυρών έγινε θρύλος στην Ελλάδα.',
      ),
    }),
    choice({
      id: 'g08',
      image: 'vevi',
      prompt: t('Which Allied troops came to fight beside the Greeks in April 1941?', 'Ποια συμμαχικά στρατεύματα ήρθαν να πολεμήσουν δίπλα στους Έλληνες τον Απρίλιο του 1941;'),
      answer: t('British, Australian and New Zealand troops', 'Βρετανοί, Αυστραλοί και Νεοζηλανδοί'),
      wrong: [t('American and Canadian troops', 'Αμερικανοί και Καναδοί'), t('French and Polish troops', 'Γάλλοι και Πολωνοί'), t('Soviet troops', 'Σοβιετικοί')],
      fact: t(
        'About 60,000 Commonwealth soldiers were sent to Greece. The Australians and New Zealanders formed the ANZAC Corps again, as in the First World War.',
        'Περίπου 60.000 στρατιώτες της Βρετανικής Κοινοπολιτείας στάλθηκαν στην Ελλάδα. Αυστραλοί και Νεοζηλανδοί σχημάτισαν ξανά το Σώμα ANZAC, όπως στον Α΄ Παγκόσμιο Πόλεμο.',
      ),
    }),
    choice({
      id: 'g09',
      image: 'surrender',
      prompt: t(
        'Who signed the surrender of the Greek army of Epirus in April 1941, without the government’s approval?',
        'Ποιος υπέγραψε τη συνθηκολόγηση του ελληνικού στρατού της Ηπείρου τον Απρίλιο του 1941, χωρίς την έγκριση της κυβέρνησης;',
      ),
      answer: t('General Georgios Tsolakoglou', 'Ο στρατηγός Γεώργιος Τσολάκογλου'),
      wrong: [t('Alexandros Papagos', 'Ο Αλέξανδρος Παπάγος'), t('Charalambos Katsimitros', 'Ο Χαράλαμπος Κατσιμήτρος'), t('Konstantinos Davakis', 'Ο Κωνσταντίνος Δαβάκης')],
      fact: t(
        'Tsolakoglou signed on 20 April 1941 and soon became the first collaborationist Prime Minister under the occupation.',
        'Ο Τσολάκογλου υπέγραψε στις 20 Απριλίου 1941 και λίγο αργότερα έγινε ο πρώτος πρωθυπουργός-δοσίλογος της Κατοχής.',
      ),
    }),
    map({
      id: 'g10',
      prompt: t(
        'In April 1941 Allied troops fought a rearguard battle at a famous ancient pass. Find Thermopylae.',
        'Τον Απρίλιο του 1941 συμμαχικά στρατεύματα έδωσαν μάχη οπισθοφυλακής σε ένα ξακουστό αρχαίο πέρασμα. Βρες τις Θερμοπύλες.',
      ),
      place: t('Thermopylae', 'Θερμοπύλες'),
      lat: 38.8,
      lon: 22.54,
      fact: t(
        'Australian and New Zealand troops held the pass on 24–25 April 1941, covering the evacuation of the Allied army.',
        'Αυστραλοί και Νεοζηλανδοί κράτησαν το πέρασμα στις 24–25 Απριλίου 1941, καλύπτοντας την εκκένωση του συμμαχικού στρατού.',
      ),
    }),
    choice({
      id: 'g11',
      image: 'thermopylae',
      prompt: t('Thermopylae was famous long before 1941. Why?', 'Οι Θερμοπύλες ήταν ξακουστές πολύ πριν από το 1941. Γιατί;'),
      answer: t('Leonidas and the 300 Spartans fought the Persians there', 'Εκεί πολέμησαν ο Λεωνίδας και οι 300 Σπαρτιάτες τους Πέρσες'),
      wrong: [t('The Battle of Marathon was fought there', 'Εκεί δόθηκε η μάχη του Μαραθώνα'), t('It was the site of Troy', 'Εκεί βρισκόταν η Τροία'), t('The first Olympic Games were held there', 'Εκεί έγιναν οι πρώτοι Ολυμπιακοί Αγώνες')],
      fact: t(
        'In 480 BC Leonidas and his men held the pass against the army of Xerxes. “Molon labe” (“Come and take them”) is the reply attributed to him.',
        'Το 480 π.Χ. ο Λεωνίδας και οι άνδρες του κράτησαν το πέρασμα απέναντι στον στρατό του Ξέρξη. Σε εκείνον αποδίδεται η απάντηση «Μολών λαβέ».',
      ),
    }),
    choice({
      id: 'g12',
      prompt: t('When did German troops enter Athens?', 'Πότε μπήκαν τα γερμανικά στρατεύματα στην Αθήνα;'),
      answer: t('27 April 1941', '27 Απριλίου 1941'),
      wrong: [t('6 April 1941', '6 Απριλίου 1941'), t('15 March 1941', '15 Μαρτίου 1941'), t('1 June 1941', '1 Ιουνίου 1941')],
      fact: t(
        'On the morning of 27 April German columns entered an almost deserted city. Soon the swastika flag flew over the Acropolis.',
        'Το πρωί της 27ης Απριλίου γερμανικές φάλαγγες μπήκαν σε μια σχεδόν έρημη πόλη. Σύντομα η σημαία με τον αγκυλωτό σταυρό κυμάτιζε στην Ακρόπολη.',
      ),
    }),
    choice({
      id: 'g13',
      image: 'averof',
      prompt: t(
        'As the Germans approached, which historic Greek warship escaped to Alexandria to keep fighting?',
        'Καθώς πλησίαζαν οι Γερμανοί, ποιο ιστορικό ελληνικό πολεμικό πλοίο διέφυγε στην Αλεξάνδρεια για να συνεχίσει τον αγώνα;',
      ),
      answer: t('The cruiser Georgios Averof', 'Το «Γεώργιος Αβέρωφ»'),
      wrong: [t('The cruiser Elli', 'Η «Έλλη»'), t('The battleship Kilkis', 'Το «Κιλκίς»'), t('The destroyer Hydra', 'Η «Ύδρα»')],
      fact: t(
        'Averof served with the Allies until the liberation. Today it is a floating museum at Palaio Faliro, near Athens.',
        'Το «Αβέρωφ» υπηρέτησε με τους Συμμάχους ως την Απελευθέρωση. Σήμερα είναι πλωτό μουσείο στο Παλαιό Φάληρο.',
      ),
    }),
    choice({
      id: 'g14',
      prompt: t(
        'Where did King George II and the government go to continue the fight?',
        'Πού κατέφυγαν ο βασιλιάς Γεώργιος Β΄ και η κυβέρνηση για να συνεχίσουν τον αγώνα;',
      ),
      answer: t('To Crete, and then to Egypt', 'Στην Κρήτη και έπειτα στην Αίγυπτο'),
      wrong: [t('Straight to London', 'Κατευθείαν στο Λονδίνο'), t('To Switzerland', 'Στην Ελβετία'), t('To Cyprus, then Turkey', 'Στην Κύπρο και έπειτα στην Τουρκία')],
      fact: t(
        'The Greek government-in-exile kept Greece in the war on the Allied side, with the navy and the units that escaped to the Middle East.',
        'Η εξόριστη ελληνική κυβέρνηση κράτησε την Ελλάδα στον πόλεμο στο πλευρό των Συμμάχων, με το ναυτικό και τις μονάδες που διέφυγαν στη Μέση Ανατολή.',
      ),
    }),
    choice({
      id: 'g15',
      prompt: t(
        'What did Hitler say about the Greek soldiers in his speech of 4 May 1941?',
        'Τι είπε ο Χίτλερ για τους Έλληνες στρατιώτες στον λόγο του της 4ης Μαΐου 1941;',
      ),
      answer: t('That they had fought with the highest courage', 'Ότι πολέμησαν με εξαιρετική γενναιότητα'),
      wrong: [t('That they had been on Germany’s side', 'Ότι ήταν στο πλευρό της Γερμανίας'), t('That they had hardly fought', 'Ότι σχεδόν δεν πολέμησαν'), t('Nothing at all', 'Τίποτα απολύτως')],
      fact: t(
        'Speaking in the Reichstag, Hitler said that “the Greek soldier particularly fought with the highest courage”, rare praise from an enemy.',
        'Μιλώντας στο Ράιχσταγκ, ο Χίτλερ είπε ότι «ο Έλληνας στρατιώτης πολέμησε με τη μεγαλύτερη γενναιότητα», σπάνιος έπαινος από έναν εχθρό.',
      ),
    }),
    choice({
      id: 'g16',
      image: 'crete-paratroopers',
      prompt: t(
        'The Battle of Crete began on 20 May 1941. What made it unique in history?',
        'Η Μάχη της Κρήτης ξεκίνησε στις 20 Μαΐου 1941. Τι την κάνει μοναδική στην ιστορία;',
      ),
      answer: t('It was the first invasion carried out mainly by paratroopers', 'Ήταν η πρώτη εισβολή που έγινε κυρίως με αλεξιπτωτιστές'),
      wrong: [
        t('It was the first battle with jet aircraft', 'Ήταν η πρώτη μάχη με αεριωθούμενα αεροσκάφη'),
        t('It was the first invasion by submarine', 'Ήταν η πρώτη εισβολή με υποβρύχια'),
        t('It was fought only at night', 'Δόθηκε μόνο τη νύχτα'),
      ],
      fact: t(
        'Thousands of German paratroopers and glider troops landed around Maleme, Chania, Rethymno and Heraklion. The Germans called it Operation Mercury.',
        'Χιλιάδες Γερμανοί αλεξιπτωτιστές και στρατιώτες με ανεμόπτερα έπεσαν γύρω από το Μάλεμε, τα Χανιά, το Ρέθυμνο και το Ηράκλειο. Οι Γερμανοί την ονόμασαν Επιχείρηση «Ερμής».',
      ),
    }),
    map({
      id: 'g17',
      prompt: t(
        'The key to the battle was an airfield in western Crete. Find Maleme.',
        'Το κλειδί της μάχης ήταν ένα αεροδρόμιο στη δυτική Κρήτη. Βρες το Μάλεμε.',
      ),
      place: t('Maleme', 'Μάλεμε'),
      lat: 35.53,
      lon: 23.83,
      fact: t(
        'Once the Germans captured Maleme airfield, they could fly in reinforcements, and the battle turned in their favour.',
        'Όταν οι Γερμανοί κατέλαβαν το αεροδρόμιο του Μάλεμε, μπόρεσαν να φέρουν ενισχύσεις αεροπορικώς και η μάχη έγειρε υπέρ τους.',
      ),
    }),
    choice({
      id: 'g18',
      image: 'freyberg',
      prompt: t('Who commanded the Allied defenders of Crete?', 'Ποιος διοικούσε τους συμμαχικούς υπερασπιστές της Κρήτης;'),
      answer: t('General Bernard Freyberg of New Zealand', 'Ο Νεοζηλανδός στρατηγός Μπέρναρντ Φράιμπεργκ'),
      wrong: [t('Bernard Montgomery', 'Ο Μπέρναρντ Μοντγκόμερι'), t('Dwight Eisenhower', 'Ο Ντουάιτ Αϊζενχάουερ'), t('Charles de Gaulle', 'Ο Σαρλ ντε Γκωλ')],
      fact: t(
        'Freyberg, a decorated hero of the First World War, led British, Australian, New Zealand and Greek troops on the island.',
        'Ο Φράιμπεργκ, παρασημοφορημένος ήρωας του Α΄ Παγκοσμίου Πολέμου, διοικούσε στο νησί Βρετανούς, Αυστραλούς, Νεοζηλανδούς και Έλληνες.',
      ),
    }),
    choice({
      id: 'g19',
      image: 'kandanos-sign',
      prompt: t('Who fought the invaders alongside the soldiers in Crete?', 'Ποιοι πολέμησαν τους εισβολείς στην Κρήτη μαζί με τους στρατιώτες;'),
      answer: t('Cretan civilians: men, women, even priests and old people', 'Οι άμαχοι Κρητικοί: άνδρες, γυναίκες, ακόμη και ιερείς και γέροντες'),
      wrong: [t('Nobody: the island was almost empty', 'Κανείς: το νησί ήταν σχεδόν άδειο'), t('Volunteers from Turkey', 'Εθελοντές από την Τουρκία'), t('Italian deserters', 'Ιταλοί λιποτάκτες')],
      fact: t(
        'Armed with old rifles, axes and even kitchen knives, Cretans fought the paratroopers. The Germans answered with brutal reprisals against villages such as Kondomari and Kandanos.',
        'Με παλιά τουφέκια, τσεκούρια ακόμη και μαχαίρια της κουζίνας, οι Κρητικοί πολέμησαν τους αλεξιπτωτιστές. Οι Γερμανοί απάντησαν με άγρια αντίποινα σε χωριά όπως το Κοντομαρί και η Κάντανος.',
      ),
    }),
    choice({
      id: 'g20',
      image: 'maleme',
      prompt: t('German losses in Crete were so heavy that Hitler…', 'Οι γερμανικές απώλειες στην Κρήτη ήταν τόσο βαριές, που ο Χίτλερ…'),
      answer: t('never again ordered a large airborne invasion', 'δεν διέταξε ποτέ ξανά μεγάλη αεραποβατική εισβολή'),
      wrong: [t('handed Crete over to Italy', 'παραχώρησε την Κρήτη στην Ιταλία'), t('withdrew from Greece', 'αποσύρθηκε από την Ελλάδα'), t('put up a monument to the Cretans', 'έστησε μνημείο για τους Κρητικούς')],
      fact: t(
        '“The day of the paratrooper is over,” Hitler told General Kurt Student. Crete fell on 1 June 1941, but at a very high price.',
        '«Η εποχή των αλεξιπτωτιστών τελείωσε», είπε ο Χίτλερ στον στρατηγό Κουρτ Στούντεντ. Η Κρήτη έπεσε την 1η Ιουνίου 1941, αλλά με πολύ βαρύ τίμημα.',
      ),
    }),
  ],
};
