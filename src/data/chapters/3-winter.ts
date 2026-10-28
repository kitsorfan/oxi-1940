import type { Chapter } from '../../types';
import { choice, map, t } from '../helpers';

export const winter: Chapter = {
  id: 'winter',
  title: t('The Winter Front', 'Το αλβανικό μέτωπο'),
  period: t('November 1940 – April 1941', 'Νοέμβριος 1940 – Απρίλιος 1941'),
  blurb: t(
    'Snow and frostbite, the Spring Offensive, and heroes in the air and at sea.',
    'Χιόνι και κρυοπαγήματα, η Εαρινή Επίθεση και ήρωες στον αέρα και στη θάλασσα.',
  ),
  cover: 'klisura-tank',
  questions: [
    choice({
      id: 'w01',
      image: 'raf-blenheim',
      prompt: t(
        'Which ally sent air force squadrons to help Greece from November 1940?',
        'Ποιος σύμμαχος έστειλε μοίρες αεροσκαφών για να βοηθήσει την Ελλάδα από τον Νοέμβριο του 1940;',
      ),
      answer: t('Britain (the RAF)', 'Η Βρετανία (RAF)'),
      wrong: [t('The United States', 'Οι Ηνωμένες Πολιτείες'), t('France', 'Η Γαλλία'), t('The Soviet Union', 'Η Σοβιετική Ένωση')],
      hint: t(
        'Only one of these powers was still fighting Italy in November 1940.',
        'Μόνο μία από αυτές τις δυνάμεις πολεμούσε ακόμη την Ιταλία τον Νοέμβριο του 1940.',
      ),
      fact: t(
        'Britain was the only great power still fighting the Axis: France had fallen in June 1940, and the USA was not yet at war.',
        'Η Βρετανία ήταν η μόνη μεγάλη δύναμη που πολεμούσε ακόμη τον Άξονα: η Γαλλία είχε πέσει τον Ιούνιο του 1940 και οι ΗΠΑ δεν είχαν μπει ακόμη στον πόλεμο.',
      ),
    }),
    choice({
      id: 'w02',
      image: 'mitralexis-diorama',
      prompt: t(
        'Out of ammunition, Greek pilot Marinos Mitralexis brought down an Italian bomber. How?',
        'Χωρίς πυρομαχικά, ο Έλληνας πιλότος Μαρίνος Μητραλέξης κατέρριψε ιταλικό βομβαρδιστικό. Πώς;',
      ),
      answer: t('He rammed its tail with his propeller', 'Χτύπησε την ουρά του με την έλικα του αεροπλάνου του'),
      wrong: [
        t('He threw a hand grenade at it', 'Του πέταξε χειροβομβίδα'),
        t('He fired a flare pistol at the pilot', 'Πυροβόλησε τον πιλότο με φωτοβολίδα'),
        t('He blocked its path until it landed', 'Του έκλεισε τον δρόμο ώσπου να προσγειωθεί'),
      ],
      hint: t(
        'His own fighter became the weapon, striking the enemy bomber from behind.',
        'Το ίδιο του το καταδιωκτικό έγινε όπλο και χτύπησε το βομβαρδιστικό από πίσω.',
      ),
      fact: t(
        'On 2 November 1940 he smashed the bomber’s tail with his propeller, made an emergency landing nearby and took the Italian crew prisoner himself.',
        'Στις 2 Νοεμβρίου 1940 έσπασε την ουρά του βομβαρδιστικού με την έλικά του, προσγειώθηκε αναγκαστικά εκεί κοντά και αιχμαλώτισε ο ίδιος το ιταλικό πλήρωμα.',
      ),
    }),
    map({
      id: 'w03',
      prompt: t(
        'Mitralexis’ famous ramming took place over Thessaloniki. Find the city.',
        'Ο Μητραλέξης έκανε τον περίφημο εμβολισμό του πάνω από τη Θεσσαλονίκη. Βρες την πόλη.',
      ),
      place: t('Thessaloniki', 'Θεσσαλονίκη'),
      lat: 40.64,
      lon: 22.94,
      hint: t('Look in northern Greece, at the very top of the Thermaic Gulf.', 'Ψάξε στη Βόρεια Ελλάδα, στον μυχό του Θερμαϊκού Κόλπου.'),
      fact: t(
        'Thessaloniki, Greece’s second city, was bombed by the Italian air force in the very first days of the war.',
        'Η Θεσσαλονίκη, η δεύτερη πόλη της Ελλάδας, βομβαρδίστηκε από την ιταλική αεροπορία ήδη από τις πρώτες μέρες του πολέμου.',
      ),
    }),
    choice({
      id: 'w04',
      prompt: t('Why did British troops land on Crete in November 1940?', 'Γιατί αποβιβάστηκαν βρετανικά στρατεύματα στην Κρήτη τον Νοέμβριο του 1940;'),
      answer: t(
        'So that the Greek 5th Cretan Division could go and fight in Albania',
        'Για να μπορέσει η 5η Μεραρχία Κρητών να πολεμήσει στην Αλβανία',
      ),
      wrong: [
        t('To prepare an invasion of Italy', 'Για να προετοιμάσουν εισβολή στην Ιταλία'),
        t('To take the King to safety in Egypt', 'Για να μεταφέρουν με ασφάλεια τον βασιλιά στην Αίγυπτο'),
        t('To build a base for the US Navy', 'Για να φτιάξουν βάση για το αμερικανικό ναυτικό'),
      ],
      hint: t(
        'Think of who would guard the island if its own soldiers left for the front.',
        'Σκέψου ποιος θα φύλαγε το νησί αν οι δικοί του στρατιώτες έφευγαν για το μέτωπο.',
      ),
      fact: t(
        'The Cretans fought bravely on the Albanian front, and were still there, far from home, when Germany attacked Crete in May 1941.',
        'Οι Κρητικοί πολέμησαν γενναία στο αλβανικό μέτωπο, και βρίσκονταν ακόμη εκεί, μακριά από το νησί τους, όταν η Γερμανία επιτέθηκε στην Κρήτη τον Μάιο του 1941.',
      ),
    }),
    choice({
      id: 'w05',
      image: 'papanikolis',
      prompt: t(
        'The Greek submarine Papanikolis became famous in December 1940. Why?',
        'Το ελληνικό υποβρύχιο «Παπανικολής» έγινε διάσημο τον Δεκέμβριο του 1940. Γιατί;',
      ),
      answer: t('It attacked an Italian convoy off the Albanian coast', 'Επιτέθηκε σε ιταλική νηοπομπή στα ανοιχτά των αλβανικών ακτών'),
      wrong: [
        t('It sank the Italian battleship Roma', 'Βύθισε το ιταλικό θωρηκτό «Ρόμα»'),
        t('It rescued the crew of the Elli', 'Διέσωσε το πλήρωμα της «Έλλης»'),
        t('It sailed into the port of Venice', 'Μπήκε στο λιμάνι της Βενετίας'),
      ],
      hint: t(
        'Its target was the sea route that kept Italy’s army in Albania supplied.',
        'Στόχος του ήταν η θαλάσσια γραμμή ανεφοδιασμού του ιταλικού στρατού στην Αλβανία.',
      ),
      fact: t(
        'Under Lieutenant Commander Miltiadis Iatridis, Papanikolis attacked Italian transports carrying troops to Albania, a feat celebrated across Greece.',
        'Με κυβερνήτη τον υποπλοίαρχο Μιλτιάδη Ιατρίδη, ο «Παπανικολής» επιτέθηκε σε ιταλικά μεταγωγικά που μετέφεραν στρατό στην Αλβανία, ένα κατόρθωμα που γιορτάστηκε σε όλη την Ελλάδα.',
      ),
    }),
    map({
      id: 'w06',
      prompt: t(
        'Find Cheimarra (Himarë), on the Ionian coast, taken by the Greek army on 22 December 1940.',
        'Βρες τη Χειμάρρα, στην ακτή του Ιονίου, που κατέλαβε ο ελληνικός στρατός στις 22 Δεκεμβρίου 1940.',
      ),
      place: t('Cheimarra (Himarë)', 'Χειμάρρα'),
      lat: 40.1,
      lon: 19.74,
      hint: t(
        'Follow the Albanian coast north from Corfu, a little beyond Agioi Saranta.',
        'Ακολούθησε την αλβανική ακτή βόρεια από την Κέρκυρα, λίγο πιο πέρα από τους Αγίους Σαράντα.',
      ),
      fact: t(
        'Cheimarra had a large Greek-speaking population. Its capture, just before Christmas, was greeted with joy in Greece.',
        'Η Χειμάρρα είχε πολυάριθμο ελληνόφωνο πληθυσμό. Η κατάληψή της, λίγο πριν από τα Χριστούγεννα, έγινε δεκτή με χαρά στην Ελλάδα.',
      ),
    }),
    choice({
      id: 'w07',
      image: 'italian-winter',
      prompt: t(
        'Apart from the enemy, what was the deadliest danger in the mountains in the winter of 1940–41?',
        'Εκτός από τον εχθρό, ποιος ήταν ο μεγαλύτερος κίνδυνος στα βουνά τον χειμώνα του 1940–41;',
      ),
      answer: t('Frostbite', 'Τα κρυοπαγήματα'),
      wrong: [t('Malaria', 'Η ελονοσία'), t('Heatstroke', 'Η θερμοπληξία'), t('Snakebites', 'Τα δαγκώματα φιδιών')],
      hint: t(
        'Think of the season and the altitude: which danger comes with deep snow?',
        'Σκέψου την εποχή και το υψόμετρο: ποιος κίνδυνος έρχεται μαζί με το βαθύ χιόνι;',
      ),
      fact: t(
        'Temperatures fell far below zero. Thousands of soldiers on both sides suffered frostbite, and many lost toes or feet.',
        'Η θερμοκρασία έπεφτε πολύ κάτω από το μηδέν. Χιλιάδες στρατιώτες και των δύο πλευρών υπέστησαν κρυοπαγήματα και πολλοί έχασαν δάχτυλα ή πόδια.',
      ),
    }),
    choice({
      id: 'w08',
      prompt: t('What did women all over Greece make for the soldiers at the front?', 'Τι έφτιαχναν οι γυναίκες σε όλη την Ελλάδα για τους στρατιώτες του μετώπου;'),
      answer: t('Woollen socks, gloves and sweaters', 'Μάλλινες κάλτσες, γάντια και φανέλες'),
      wrong: [t('Flags for every village', 'Σημαίες για κάθε χωριό'), t('Parachutes', 'Αλεξίπτωτα'), t('Uniform badges', 'Διακριτικά για τις στολές')],
      hint: t(
        'Think of what kept soldiers warm in the snow-covered mountains of Albania.',
        'Σκέψου τι κρατούσε ζεστούς τους στρατιώτες στα χιονισμένα βουνά της Αλβανίας.',
      ),
      fact: t(
        'Knitting for the front became a national effort. Parcels of warm clothes were sent up to the freezing mountains of Albania.',
        'Το πλέξιμο για το μέτωπο έγινε πανεθνική υπόθεση. Δέματα με ζεστά ρούχα έφταναν ως τα παγωμένα βουνά της Αλβανίας.',
      ),
    }),
    choice({
      id: 'w09',
      prompt: t('How did the Greek army move supplies across the roadless mountains?', 'Πώς μετέφερε ο ελληνικός στρατός εφόδια στα βουνά, όπου δεν υπήρχαν δρόμοι;'),
      answer: t('Mostly with mules and horses', 'Κυρίως με μουλάρια και άλογα'),
      wrong: [t('By railway', 'Με τον σιδηρόδρομο'), t('With trucks on paved highways', 'Με φορτηγά σε ασφαλτοστρωμένους δρόμους'), t('With helicopters', 'Με ελικόπτερα')],
      hint: t(
        'Think of how mountain villagers had always moved heavy loads along steep paths.',
        'Σκέψου πώς μετέφεραν ανέκαθεν οι ορεσίβιοι βαριά φορτία σε απότομα μονοπάτια.',
      ),
      fact: t(
        'Mules were the unsung heroes of the supply lines, along with the villagers who carried loads on their own backs.',
        'Τα μουλάρια ήταν οι αφανείς ήρωες του ανεφοδιασμού, μαζί με τους χωρικούς που κουβαλούσαν φορτία στην πλάτη τους.',
      ),
    }),
    choice({
      id: 'w10',
      image: 'elytis',
      prompt: t(
        'Which future Nobel Prize winner fought on the Albanian front as a second lieutenant?',
        'Ποιος μελλοντικός νομπελίστας πολέμησε στο αλβανικό μέτωπο ως ανθυπολοχαγός;',
      ),
      answer: t('Odysseas Elytis', 'Ο Οδυσσέας Ελύτης'),
      wrong: [t('Giorgos Seferis', 'Ο Γιώργος Σεφέρης'), t('Nikos Kazantzakis', 'Ο Νίκος Καζαντζάκης'), t('Constantine Cavafy', 'Ο Κωνσταντίνος Καβάφης')],
      hint: t('Think of the younger of Greece’s two Nobel-winning poets.', 'Σκέψου τον νεότερο από τους δύο Έλληνες ποιητές που τιμήθηκαν με Νόμπελ.'),
      fact: t(
        'Elytis fell seriously ill with typhus at the front. In 1945 he published the “Heroic and Elegiac Song for the Lost Second Lieutenant of Albania”, and in 1979 he won the Nobel Prize in Literature.',
        'Ο Ελύτης αρρώστησε βαριά από τύφο στο μέτωπο. Το 1945 εξέδωσε το «Άσμα ηρωικό και πένθιμο για τον χαμένο ανθυπολοχαγό της Αλβανίας» και το 1979 τιμήθηκε με το Νόμπελ Λογοτεχνίας.',
      ),
    }),
    choice({
      id: 'w11',
      prompt: t(
        'Which Albanian port, the main Italian supply base, was the Greek army’s goal, though it never reached it?',
        'Ποιο αλβανικό λιμάνι, κύρια βάση ανεφοδιασμού των Ιταλών, ήταν στόχος του ελληνικού στρατού χωρίς να το φτάσει ποτέ;',
      ),
      answer: t('Valona (Vlorë)', 'Η Αυλώνα'),
      wrong: [t('Agioi Saranta (Sarandë)', 'Οι Άγιοι Σαράντα'), t('Cheimarra (Himarë)', 'Η Χειμάρρα'), t('Korytsa (Korçë)', 'Η Κορυτσά')],
      hint: t(
        'Rule out the towns Greek troops actually captured in 1940, and look further up the coast.',
        'Απόκλεισε τις πόλεις που πράγματι κατέλαβε ο ελληνικός στρατός το 1940 και ψάξε πιο βόρεια στην ακτή.',
      ),
      fact: t(
        'Most Italian reinforcements landed at Valona. Snow, exhaustion and lack of supplies stopped the Greek advance short of it.',
        'Οι περισσότερες ιταλικές ενισχύσεις αποβιβάζονταν στην Αυλώνα. Το χιόνι, η εξάντληση και η έλλειψη εφοδίων σταμάτησαν την ελληνική προέλαση πριν φτάσει εκεί.',
      ),
    }),
    map({
      id: 'w12',
      prompt: t(
        'Find the Klisura Pass (Këlcyrë), a key gateway through the mountains of southern Albania.',
        'Βρες τα στενά της Κλεισούρας, ένα κρίσιμο πέρασμα στα βουνά της Βόρειας Ηπείρου.',
      ),
      place: t('Klisura (Këlcyrë)', 'Κλεισούρα'),
      lat: 40.31,
      lon: 20.19,
      hint: t(
        'Follow the Aoos river north-west from the Greek border, into the mountains of southern Albania.',
        'Ακολούθησε τον Αώο βορειοδυτικά από τα ελληνικά σύνορα, μέσα στα βουνά της Βόρειας Ηπείρου.',
      ),
      fact: t('The pass controls the valley of the Aoos (Vjosë) river.', 'Τα στενά ελέγχουν την κοιλάδα του ποταμού Αώου.'),
    }),
    choice({
      id: 'w13',
      image: 'klisura-tank',
      prompt: t('When did the Greek army capture the Klisura Pass?', 'Πότε κατέλαβε ο ελληνικός στρατός τα στενά της Κλεισούρας;'),
      answer: t('10 January 1941', '10 Ιανουαρίου 1941'),
      wrong: [t('28 October 1940', '28 Οκτωβρίου 1940'), t('6 April 1941', '6 Απριλίου 1941'), t('15 August 1940', '15 Αυγούστου 1940')],
      hint: t(
        'Think deep winter: well after the war began, but before Germany attacked Greece.',
        'Σκέψου την καρδιά του χειμώνα: αρκετά μετά την έναρξη του πολέμου, αλλά πριν από τη γερμανική επίθεση.',
      ),
      fact: t(
        'It was one of the last great Greek successes of the winter, won in deep snow and bitter cold.',
        'Ήταν μία από τις τελευταίες μεγάλες ελληνικές επιτυχίες του χειμώνα, μέσα σε βαθύ χιόνι και τσουχτερό κρύο.',
      ),
    }),
    choice({
      id: 'w14',
      image: 'leaders-1941',
      prompt: t('Who died on 29 January 1941, in the middle of the war?', 'Ποιος πέθανε στις 29 Ιανουαρίου 1941, εν μέσω του πολέμου;'),
      answer: t('Ioannis Metaxas', 'Ο Ιωάννης Μεταξάς'),
      wrong: [t('King George II', 'Ο βασιλιάς Γεώργιος Β΄'), t('Alexandros Papagos', 'Ο Αλέξανδρος Παπάγος'), t('Eleftherios Venizelos', 'Ο Ελευθέριος Βενιζέλος')],
      hint: t('Think of the man who had headed Greece’s government since 1936.', 'Σκέψου τον άνθρωπο που βρισκόταν επικεφαλής της κυβέρνησης από το 1936.'),
      fact: t(
        'Metaxas died after a short illness. The photo shows him (second from left) at a war council a few weeks earlier, with King George II and General Papagos.',
        'Ο Μεταξάς πέθανε ύστερα από σύντομη ασθένεια. Η φωτογραφία τον δείχνει (δεύτερο από αριστερά) σε πολεμικό συμβούλιο λίγες εβδομάδες νωρίτερα, με τον βασιλιά Γεώργιο Β΄ και τον στρατηγό Παπάγο.',
      ),
    }),
    choice({
      id: 'w15',
      image: 'koryzis',
      prompt: t('Who succeeded Metaxas as Prime Minister?', 'Ποιος διαδέχθηκε τον Μεταξά στην πρωθυπουργία;'),
      answer: t('Alexandros Koryzis', 'Ο Αλέξανδρος Κορυζής'),
      wrong: [t('Georgios Tsolakoglou', 'Ο Γεώργιος Τσολάκογλου'), t('Emmanouil Tsouderos', 'Ο Εμμανουήλ Τσουδερός'), t('Georgios Papandreou', 'Ο Γεώργιος Παπανδρέου')],
      hint: t(
        'His time as Prime Minister lasted under three months, ending before the Germans reached Athens.',
        'Η πρωθυπουργία του κράτησε λιγότερο από τρεις μήνες και τελείωσε πριν φτάσουν οι Γερμανοί στην Αθήνα.',
      ),
      fact: t(
        'Koryzis, a banker and governor of the National Bank of Greece, led the government through the last months of the fight against Italy.',
        'Ο Κορυζής, τραπεζίτης και διοικητής της Εθνικής Τράπεζας, ηγήθηκε της κυβέρνησης στους τελευταίους μήνες του αγώνα κατά της Ιταλίας.',
      ),
    }),
    choice({
      id: 'w16',
      image: 'mussolini-spring',
      prompt: t(
        'In March 1941 Mussolini came to Albania to watch a great Italian attack. What was it called?',
        'Τον Μάρτιο του 1941 ο Μουσολίνι ήρθε στην Αλβανία για να παρακολουθήσει μια μεγάλη ιταλική επίθεση. Πώς ονομάστηκε;',
      ),
      answer: t('The Spring Offensive', 'Η Εαρινή Επίθεση'),
      wrong: [t('The Autumn Offensive', 'Η Φθινοπωρινή Επίθεση'), t('Operation Sea Lion', 'Επιχείρηση «Θαλάσσιος Λέων»'), t('Operation Torch', 'Επιχείρηση «Πυρσός»')],
      hint: t('The Italians named it after the season that was just beginning.', 'Οι Ιταλοί της έδωσαν το όνομα της εποχής που μόλις άρχιζε.'),
      fact: t(
        'It began on 9 March 1941 with a huge artillery barrage. After days of fierce fighting it failed, and Mussolini returned to Rome empty-handed.',
        'Ξεκίνησε στις 9 Μαρτίου 1941 με σφοδρό βομβαρδισμό πυροβολικού. Ύστερα από μέρες σκληρών μαχών απέτυχε και ο Μουσολίνι γύρισε άπρακτος στη Ρώμη.',
      ),
    }),
    choice({
      id: 'w17',
      prompt: t(
        'Which hill became the symbol of Greek resistance during the Spring Offensive?',
        'Ποιο ύψωμα έγινε σύμβολο της ελληνικής αντίστασης στην Εαρινή Επίθεση;',
      ),
      answer: t('Hill 731', 'Το ύψωμα 731'),
      wrong: [t('Hill 1940', 'Το ύψωμα 1940'), t('Hill 300', 'Το ύψωμα 300'), t('Hill 28', 'Το ύψωμα 28')],
      hint: t(
        'Hills on military maps were named after their height in metres, so beware of famous numbers.',
        'Στους στρατιωτικούς χάρτες τα υψώματα ονομάζονταν από το υψόμετρό τους, οπότε μην ξεγελαστείς από γνωστούς αριθμούς.',
      ),
      fact: t(
        'Hill 731 was attacked again and again and pounded by artillery, but its defenders never gave way.',
        'Το ύψωμα 731 δέχτηκε επανειλημμένες επιθέσεις και σφυροκόπημα από το πυροβολικό, όμως οι υπερασπιστές του δεν υποχώρησαν ποτέ.',
      ),
    }),
    choice({
      id: 'w18',
      image: 'soldier-mother',
      prompt: t(
        'For about how long did the Greek army fight the Italians on land, before Germany attacked?',
        'Για πόσο περίπου καιρό πολέμησε ο ελληνικός στρατός τους Ιταλούς στην ξηρά, πριν επιτεθεί η Γερμανία;',
      ),
      answer: t('About five months', 'Περίπου πέντε μήνες'),
      wrong: [t('Ten days', 'Δέκα μέρες'), t('Two weeks', 'Δύο εβδομάδες'), t('Two years', 'Δύο χρόνια')],
      hint: t(
        'The war began in late October 1940, and Germany invaded the following April.',
        'Ο πόλεμος άρχισε στα τέλη Οκτωβρίου 1940 και η Γερμανία εισέβαλε τον Απρίλιο της επόμενης χρονιάς.',
      ),
      fact: t(
        'From late October 1940 until the spring of 1941, the Greek army held back a far larger power and pushed the war deep into Albania.',
        'Από τα τέλη Οκτωβρίου 1940 ως την άνοιξη του 1941, ο ελληνικός στρατός ανέκοψε μια πολύ μεγαλύτερη δύναμη και μετέφερε τον πόλεμο βαθιά στην Αλβανία.',
      ),
    }),
    choice({
      id: 'w19',
      prompt: t('How did the world see the Greek victory over Italy?', 'Πώς είδε ο κόσμος την ελληνική νίκη επί της Ιταλίας;'),
      answer: t('As the first Allied land victory against the Axis', 'Ως την πρώτη νίκη των Συμμάχων στην ξηρά απέναντι στον Άξονα'),
      wrong: [
        t('As the end of the Second World War', 'Ως το τέλος του Β΄ Παγκοσμίου Πολέμου'),
        t('As a German victory', 'Ως νίκη της Γερμανίας'),
        t('It went almost unnoticed', 'Πέρασε σχεδόν απαρατήρητη'),
      ],
      hint: t(
        'Until then the Axis had seemed unstoppable, and the war still had years to run.',
        'Ως τότε ο Άξονας έμοιαζε ασταμάτητος και ο πόλεμος είχε ακόμη χρόνια μπροστά του.',
      ),
      fact: t(
        'In a Europe dominated by the Axis, the Greek resistance gave hope to occupied peoples and made headlines around the world.',
        'Σε μια Ευρώπη που κυριαρχούσε ο Άξονας, η ελληνική αντίσταση έδωσε ελπίδα στους υπόδουλους λαούς και έγινε πρωτοσέλιδο σε όλο τον κόσμο.',
      ),
    }),
    choice({
      id: 'w20',
      prompt: t(
        'Complete the phrase often attributed to Winston Churchill: “We will not say that Greeks fight like heroes, but that heroes fight like…”',
        'Συμπλήρωσε τη φράση που αποδίδεται συχνά στον Ουίνστον Τσόρτσιλ: «Δεν θα λέμε ότι οι Έλληνες πολεμούν σαν ήρωες, αλλά ότι οι ήρωες πολεμούν σαν…»',
      ),
      answer: t('Greeks', 'Έλληνες'),
      wrong: [t('Spartans', 'Σπαρτιάτες'), t('lions', 'λιοντάρια'), t('gods', 'θεοί')],
      hint: t('Look at the saying’s shape: its second half mirrors its first.', 'Πρόσεξε τη δομή της φράσης: το δεύτερο μισό της καθρεφτίζει το πρώτο.'),
      fact: t(
        'It is one of the most quoted phrases about 1940, although no one has ever found exactly where Churchill said it.',
        'Είναι από τις πιο πολυαναφερόμενες φράσεις για το ’40, αν και κανείς δεν έχει εντοπίσει πού ακριβώς την είπε ο Τσόρτσιλ.',
      ),
    }),
  ],
};
