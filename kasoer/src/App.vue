<template>
  <q-layout view="lHh Lpr lFf" class="bg-blue-grey-2">

    <q-drawer v-model="drawerLeft" side="left" bordered class="bg-amber-2">
      <div>
        <q-card class="text-center q-ma-sm rounded bg-blue-grey-14 text-amber-14 text-bold">

          <q-card-section>
            <q-btn icon="bi-feather" color="amber-14" size="sm" />
            Journal de Bord
            <q-btn icon="bi-feather" color="amber-14" size="sm" />
          </q-card-section>

        </q-card>
        <q-input
            v-model="enteredGoalValue"
            label="Ajouter une entrée"
            rounded
            filled
            class="q-ma-sm"
            clearable
            clear-icon="bi-x"
            autogrow
        />
        <q-btn label="Nouvelle entrée" color="blue-grey-6" @click="addEntry" class="q-ml-sm" glossy size="sm"/>
        <q-btn label="Exporter le journal" color="blue-grey-6" @click="exportDiary" class="q-ml-sm" glossy size="sm"/>
        <q-separator color="indigo-10" spaced></q-separator>
        <ul>
          <li v-for="(entry, index) in journalEntries" :key="index" ref="journalItem" @click="removeEntry(index)">
            {{ index }} - {{ entry }}
          </li>
        </ul>
      </div>
    </q-drawer>

    <q-header reveal elevated class="bg-light-blue-10">
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="bi-bug-fill" />
          KaSoeR, l'oracle de jdr solo
        </q-toolbar-title>

        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="bi-feather"></q-btn>

        <!-- Bouton de reset -->
        <q-btn flat @click="resetChamps" round dense icon="bi-x-circle"/>

        <q-tabs class="horloge">
          <q-tab id="horloge">{{ horloge }}</q-tab>
          <q-tab id="temps-ecoule">{{ tempsEcoule }}</q-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-ma-md">

        <!--        Affichage Omen / Direction / Météo / Objet-->
        <div class="row q-my-md">
          <q-btn @click="genererOmen" label="Générer un omen" color="purple-3" text-color="black"
                 :icon="biPatchQuestion()"
                 class="q-mx-md q-mt-md col" glossy/>
          <q-btn @click="genererDirection" label="Générer une direction" color="purple-5"
                 :icon="biCompass()"
                 class="q-mr-md q-mt-md col" glossy/>
          <q-btn @click="tirerMeteo" label="Générer une Meteo" color="purple-7"
                 :icon="biCloudSun()"
                 class="q-mr-md q-mt-md col" glossy/>
          <q-btn @click="tirerObjet" label="Générer un objet" color="purple-9"
                 :icon="biBackpack3()"
                 class="q-mr-md q-mt-md col" glossy/>
        </div>
        <div class="row q-my-md">
          <div v-if="omen" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center">
                Réponse à la question ouverte --> {{ omen }}
              </q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat d'omen pour le moment</q-card-section>
            </q-card>
          </div>
          <div v-if="direction" class="q-mr-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center">
                Direction : {{ direction }}
              </q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat de direction pour le moment</q-card-section>
            </q-card>
          </div>
          <div v-if="meteo" class="q-mr-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center">
                Meteo : {{ meteo }}
              </q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat de Meteo pour le moment</q-card-section>
            </q-card>
          </div>
          <div v-if="objet" class="q-mr-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center">
                Objet : un(e) {{ objet }} {{ adjectifObjet }}
              </q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat d'objet pour le moment</q-card-section>
            </q-card>
          </div>
        </div>

        <!--        Affichage Lieu / Symbole / Date / Origine culturelle-->
        <q-separator color="indigo-10" spaced></q-separator>
        <div class="row q-my-md">
          <q-btn @click="tirerLieu" label="Générer un lieu" color="green-3" text-color="black"
                 :icon="biGeoAlt()"
                 class="q-mx-md q-mt-md col" glossy/>
          <q-btn @click="tirerSymbole" label="Générer un symbole" color="green-5"
                 :icon="biFileImage()"
                 class="q-mr-md q-mt-md col" glossy/>
          <q-btn @click="genererDate" label="Générer une date" color="green-7"
                 :icon="biCalendar3()"
                 class="q-mx-md q-mt-md col" glossy/>
          <q-btn @click="genererOrigineCulturelle" label="Générer une origine" color="green-9"
                 :icon="biGlobe()"
                 class="q-mx-md q-mt-md col" glossy/>
        </div>
        <div class="row q-my-md">
          <div v-if="lieu" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center">
                Lieu : un(e) {{ lieu }} {{ adjectifLieu }}
              </q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat de lieu pour le moment</q-card-section>
            </q-card>
          </div>
          <div v-if="symbole" class="q-mr-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center">
                {{ symbole }}
              </q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat de symbole pour le moment</q-card-section>
            </q-card>
          </div>
          <div v-if="date" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class=""> {{ date }}</q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat de date pour le moment</q-card-section>
            </q-card>
          </div>
          <div v-if="origineCulturelle" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center"> {{ origineCulturelle }}</q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat d'origine culturelle pour le moment</q-card-section>
            </q-card>
          </div>
        </div>

        <!--        Affichage génération d'une situation et d'un PNJ-->
        <q-separator color="indigo-10" spaced></q-separator>
        <div class="row q-my-md">
          <q-btn @click="genererContexte" label="Générer un Contexte" color="red-10"
                 :icon="biBodyText()"
                 class="q-mx-md q-mt-md col-5" glossy/>
          <q-btn @click="genererPNJ" label="Générer un PNJ" color="red-10"
                 :icon="biPersonVcard()"
                 class="q-mx-md q-mt-md col" glossy/>
        </div>
        <div class="q-mx-md q-mt-md row">
          <div class="q-mx-md col-5 text-center">
            <q-btn-group push>
              <q-btn @click="genererTheme" label="Theme" color="red-5" size="sm"/>
              <q-btn @click="genererSituation" label="Situation" color="red-5" size="sm"/>
              <q-btn @click="genererSujet" label="Sujet" color="red-5" size="sm"/>
              <q-btn @click="genererAction" label="Action" color="red-5" size="sm"/>
              <q-btn @click="genererCible" label="Cible" color="red-5" size="sm"/>
              <q-btn @click="genererLieu" label="Lieu" color="red-5" size="sm"/>
            </q-btn-group>
          </div>
          <div class="q-mx-md col text-center">
            <q-btn-group push>
              <q-btn @click="genererConcept" label="Concept" color="red-5" size="sm"/>
              <q-btn @click="genererEtoiles" label="Puissance" color="red-5" size="sm"/>
              <q-btn @click="genererOriginePNJ" label="Origine" color="red-5" size="sm"/>
              <q-btn @click="genererSentimentDisposition" label="Humeur" color="red-5" size="sm"/>
              <q-btn @click="genererApparence" label="Apparence" color="red-5" size="sm"/>
              <q-btn @click="genererMotivation" label="Motivation" color="red-5" size="sm"/>
              <q-btn @click="genererTraits" label="Traits" color="red-5" size="sm"/>
              <q-btn @click="genererSecret" label="Secret" color="red-5" size="sm"/>
              <q-btn @click="genererRelations" label="Relations" color="red-5" size="sm"/>
            </q-btn-group>
          </div>
        </div>
        <div class="row q-my-md">
          <div v-if="contexteSituation" class="q-mx-md q-mt-md col-5">
            <q-card>
              <q-card-section v-html="contexteSituation">
              </q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat de situation pour le moment</q-card-section>
            </q-card>
          </div>
          <div v-if="pnj" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section v-html="pnj">
              </q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat de PNJ pour le moment</q-card-section>
            </q-card>
          </div>
        </div>

        <!--        Affichage Opposition / Auberge / Cité / Livre-->
        <q-separator color="indigo-10" spaced></q-separator>
        <div class="row q-my-md">
          <q-btn label="Générer une opposition" @click="genererOpposant" color="amber-3" text-color="black"
                 :icon="biHeartbreak()"
                 class="q-mx-md q-mt-md col" glossy/>
          <q-btn label="Générer une auberge" @click="genererNomAuberge" color="amber-5"
                 :icon="biCupHot()"
                 class="q-mx-md q-mt-md col" glossy/>
          <q-btn label="Générer une cité/bourgade" @click="genererBourg" color="amber-7"
                 :icon="biHouses()"
                 class="q-mx-md q-mt-md col" glossy/>
          <q-btn label="Générer un livre" @click="genererLivre" color="amber-9"
                 :icon="biBookHalf()"
                 class="q-mx-md q-mt-md col" glossy/>
        </div>
        <div class="row q-my-md">
          <div v-if="opposant" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">{{ opposant }}</q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat d'opposition pour le moment</q-card-section>
            </q-card>
          </div>
          <div v-if="nomAuberge" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">{{ nomAuberge }}</q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat d'auberge pour le moment</q-card-section>
            </q-card>
          </div>
          <div v-if="nomBourg" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class=""> {{ nomBourg }}</q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat de Bourg pour le moment</q-card-section>
            </q-card>
          </div>
          <div v-if="titreLivre" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class=""> {{ titreLivre }}</q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat de livre pour le moment</q-card-section>
            </q-card>
          </div>
        </div>

      </q-page>
    </q-page-container>

    <q-footer>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">By DGA, 2024</q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import cartes from './assets/oracle.json';
import auberges from './assets/auberge.json';
import structures from './assets/structure.json';
import origines from './assets/origine.json';
import bourgs from './assets/noms_villes.json';
import livres from './assets/biblio.json';
import oppositions from './assets/opposition.json';
import calendaire from './assets/calendrier.json';
import themes from './assets/theme.json';
import situations from './assets/situations.json';
import {ref} from "vue";
import {
  biBackpack3, biBodyText, biBookHalf, biBugFill, biCalendar3,
  biCloudSun,
  biCompass, biCupHot,
  biFeather, biFeather2, biFileImage, biGeoAlt, biGlobe, biHeartbreak, biHouses,
  biMenuButton,
  biPatchQuestion, biPersonVcard,
  biXCircle
} from "@quasar/extras/bootstrap-icons";
// import {useQuasar} from "quasar";

export default {
  setup() {
    // const $q = useQuasar();

    return {
      drawerLeft: ref(true),

    }
  },
  data() {
    return {
      phrase: '',
      meteo: '',
      pnj: '',
      contexteSituation: '',
      lieu: '',
      objet: '',
      symbole: '',
      adjectifLieu: '',
      adjectifObjet: '',
      omen: '',
      direction: '',
      horloge: '',
      tempsEcoule: '00:00:00',
      tempsDepart: new Date(),
      nomAuberge: '',
      origineCulturelle: '',
      nomBourg: '',
      titreLivre: '',
      opposant: '',
      date: '',
      theme: '',
      situation: '',
      relations: '',
      journalEntries: [],
      enteredGoalValue: '',
      leftDrawOpen: true,
      journalContent: ''
    };
  },
  mounted() {
    // Initialiser la mise à jour de l'horloge et du temps écoulé
    setInterval(() => {
      this.miseAJourHeure();
      this.miseAJourTempsEcoule();
    }, 1000);

  },
  methods: {
    biBugFill() {
      return biBugFill
    },
    biFeather2() {
      return biFeather2
    },
    biBodyText() {
      return biBodyText
    },
    biHouses() {
      return biHouses
    },
    biCupHot() {
      return biCupHot
    },
    biHeartbreak() {
      return biHeartbreak
    },
    biPersonVcard() {
      return biPersonVcard
    },
    biBookHalf() {
      return biBookHalf
    },
    biGlobe() {
      return biGlobe
    },
    biCalendar3() {
      return biCalendar3
    },
    biFileImage() {
      return biFileImage
    },
    biGeoAlt() {
      return biGeoAlt
    },
    biBackpack3() {
      return biBackpack3
    },
    biCloudSun() {
      return biCloudSun
    },
    biCompass() {
      return biCompass
    },
    biPatchQuestion() {
      return biPatchQuestion
    },
    biXCircle() {
      return biXCircle
    },
    biFeather() {
      return biFeather
    },
    biMenuButton() {
      return biMenuButton
    },
    // Méthode pour mettre à jour l'horloge en temps réel
    miseAJourHeure() {
      const now = new Date();
      const heures = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const secondes = String(now.getSeconds()).padStart(2, '0');
      this.horloge = `${heures}:${minutes}:${secondes}`;
    },
    // Méthode pour mettre à jour le temps écoulé en temps réel
    miseAJourTempsEcoule() {
      const now = new Date();
      const ecoule = Math.floor((now - this.tempsDepart) / 1000);

      const heures = String(Math.floor(ecoule / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((ecoule % 3600) / 60)).padStart(2, '0');
      const secondes = String(ecoule % 60).padStart(2, '0');
      this.tempsEcoule = `Temps écoulé : ${heures}:${minutes}:${secondes}`;
    },

    // Méthode pour reset tous les champs (sauf compteur de temps écoulé et date)
    resetChamps() {
      this.phrase = '';
      this.theme = '';
      this.situation = '';
      this.meteo = '';
      this.pnj = '';
      this.lieu = '';
      this.objet = '';
      this.symbole = '';
      this.adjectifLieu = '';
      this.adjectifObjet = '';
      this.omen = '';
      this.direction = '';
      this.horloge = '';
      this.nomAuberge = '';
      this.origineCulturelle = '';
      this.nomBourg = '';
      this.titreLivre = '';
      this.opposant = '';
      this.date = '';
      this.contexteSituation = '';
    },

    // Méthodes d'ajout/retrait d'objectfis
    addEntry() {
      if (this.enteredGoalValue.trim()) {
        this.journalEntries.push(this.enteredGoalValue);
        this.enteredGoalValue = '';
      }
    },
    removeEntry(idx) {
      this.journalEntries.splice(idx, 1);
    },
    exportDiary() {
      let contenu ='';
      // Parcourir les entrées du journal (tu peux aussi utiliser `this.$refs` si tu récupères des éléments spécifiques du DOM)
      this.journalEntries.forEach((entry, index) => {
        contenu += `${index}. ${entry}\n`; // Ajoute chaque entrée avec un saut de ligne
      });

      // Générer un horodatage sous la forme YYYY-MM-DD_HH-MM-SS
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Mois de 0 à 11, donc on ajoute +1
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      // Nom du fichier avec horodatage
      const fileName = `journal_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.txt`;

      // Créer un fichier blob avec le contenu du journal
      const blob = new Blob([contenu], {type: 'text/plain'});

      // Créer un lien pour DL le fichier
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName; // Nom du fichier dynamique
      link.click();

    },

    // Méthode pour tirer une carte de l'oracle
    tirerCarte() {
      const index = Math.floor(Math.random() * cartes.length);
      return cartes[index];
    },
    // Méthode pour tirer une carte forcément différente des précédentes
    tirerCarteDifferente(indexesExclus) {
      let carte;
      do {
        carte = this.tirerCarte();
      } while (indexesExclus.includes(carte.Index));
      return carte;
    },
    // Méthode pour tirer un élément d'une liste
    tirerElement(chaine) {
      const elements = chaine.split(", ");
      const index = Math.floor(Math.random() * elements.length);
      return elements[index];
    },

    // Méthode pour déterminer un Omen
    genererOmen() {
      const carte = this.tirerCarte();
      this.omen = this.tirerElement(carte["Omen"]);
    },
    // Méthode pour déterminer une Direction
    genererDirection() {
      const carte = this.tirerCarte();
      this.direction = this.tirerElement(carte["Direction"]);
    },
    // Méthode pour générer une Météo
    tirerMeteo() {
      const carte = this.tirerCarte();
      this.meteo = this.tirerElement(carte["Meteo"]);
    },
    // Méthode pour générer un Objet
    tirerObjet() {
      const carte = this.tirerCarte();
      this.objet = this.tirerElement(carte["Objet"]);
      this.adjectifObjet = this.tirerElement(carte["4adjectifs"]); // Tirer un adjectif pour l'objet
    },

    // Méthode pour générer un Lieu
    tirerLieu() {
      const carte = this.tirerCarte();
      this.lieu = this.tirerElement(carte["2lieux"]);
      this.adjectifLieu = this.tirerElement(carte["4adjectifs"]); // Tirer un adjectif pour le lieu
    },
    // Méthode pour générer un Symbole
    tirerSymbole() {
      const carte = this.tirerCarte();
      this.symbole = this.tirerElement(carte["Symbole"]);
    },
    // Génération d'une date
    genererDate() {
      const jour = calendaire.jours[Math.floor(Math.random() * calendaire.jours.length)];
      const semaine = calendaire.semaines[Math.floor(Math.random() * calendaire.semaines.length)];
      const mois = calendaire.mois[Math.floor(Math.random() * calendaire.mois.length)];

      this.date = `${jour}, ${semaine} semaine du mois de ${mois}`;
    },
    // Méthode pour déterminer une origine culturelle
    genererOrigineCulturelle() {
      // Récupérer les clés (centriste, septentrional, etc.)
      const cles = Object.keys(origines[0]);
      console.log('cle PNJ --> ', cles);

      // Choisir une clé aléatoirement
      const cleChoisie = this.tirerElement(cles.join(", "));

      // Récupérer la liste des valeurs associées à cette clé
      const valeurs = origines[0][cleChoisie].join(", ");

      // Choisir une valeur aléatoire parmi celles de la clé choisie
      const valeurChoisie = this.tirerElement(valeurs);

      // Construire l'origine culturelle sous la forme "{clé} {valeur}"
      this.origineCulturelle = `${cleChoisie} ${valeurChoisie}`;
      console.log('origine culturelle --> ', this.origineCulturelle);
      return this.origineCulturelle;
    },

    // Méthode pour générer globalement un Contexte
    genererContexte() {
      this.genererTheme();
      this.genererSituation();
      this.genererSujet();
      this.genererAction();
      this.genererCible();
      this.genererLieu();
      this.mettreAJourContexte();
    },
    // Méthode pour mettre à jour l'affichage du bloc Contecte
    mettreAJourContexte() {
      this.contexteSituation = `Thème : ${this.theme}<br>
                                Situation dramatique: ${this.situation}<br>
                                Sujet : ${this.sujet}<br>
                                Action : ${this.action}<br>
                                Cible : ${this.cible}<br>
                                Lieu: ${this.lieu}`;
    },

    // Méthode pour générer globalement un PNJ
    genererPNJ() {
      // Génère chaque sous-composant individuellement
      this.genererConcept();
      this.genererOriginePNJ();
      this.genererEtoiles();
      this.genererSentimentDisposition();
      this.genererApparence();
      this.genererMotivation();
      this.genererTraits();
      this.genererSecret();
      this.genererRelations();
      this.mettreAJourPNJ();
    },
    // Méthode pour mettre à jour l'affichage du bloc PNJ
    mettreAJourPNJ() {
      // Combine toutes les parties pour former le PNJ complet
      this.pnj = `Un(e) ${this.conceptAdjectif}, ${this.originePNJ}, ${this.etoiles} que le PJ<br>
                  Humeur : ${this.sentimentDisposition} <br>
                  Apparence : ${this.apparence} <br>
                  Motivation : ${this.motivation} <br>
                  Traits : ${this.traits} <br>
                  Secret : ${this.secret} <br>
                  Relations : ${this.relations}`;
    },

    // Méthodes liées aux sous-éléments de génération de contexte
    genererTheme() {
      const index = Math.floor(Math.random() * themes.themes.length);
      this.theme = themes.themes[index];
      console.log("this.theme --> ", this.theme);
      this.mettreAJourContexte();
    },
    genererSituation() {
      const index = Math.floor(Math.random() * situations.situations_dramatiques.length);
      this.situation = situations.situations_dramatiques[index];
      this.mettreAJourContexte();
    },
    genererSujet() {
      // liste stockant les index déjà utilisés
      const cartesUtilisees = [];
      // Tirage 1
      const carte1 = this.tirerCarte();
      cartesUtilisees.push(carte1.Index);
      const mot1 = this.tirerElement(carte1["10mots"]);
      // Tirage 2
      const carte2 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte2.Index);
      const mot2 = this.tirerElement(carte2["10mots"]);

      this.sujet = `${mot1} + ${mot2}`;

      this.mettreAJourContexte();
    },
    genererAction() {
      // liste stockant les index déjà utilisés
      const cartesUtilisees = [];
      // Tirage 1
      const carte1 = this.tirerCarte();
      cartesUtilisees.push(carte1.Index);
      const verbe = this.tirerElement(carte1["3verbes"])
      this.action = `${verbe}`

      this.mettreAJourContexte();
    },
    genererCible() {
      // liste stockant les index déjà utilisés
      const cartesUtilisees = [];
      // Tirage 1
      const carte1 = this.tirerCarte();
      cartesUtilisees.push(carte1.Index);
      const mot1 = this.tirerElement(carte1["10mots"]);
      // Tirage 2
      const carte2 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte2.Index);
      const mot2 = this.tirerElement(carte2["4adjectifs"]);
      this.cible = `${mot1} ${mot2}`;
      this.mettreAJourContexte();
    },
    genererLieu() {
      // liste stockant les index déjà utilisés
      const cartesUtilisees = [];
      // Tirage 1
      const carte1 = this.tirerCarte();
      cartesUtilisees.push(carte1.Index);
      const mot1 = this.tirerElement(carte1["2lieux"]);
      // Tirage 2
      const carte2 = this.tirerCarteDifferente(cartesUtilisees);
      const mot2 = this.tirerElement(carte2["4adjectifs"]);
      this.lieu = `${mot1} ${mot2}`;
      this.mettreAJourContexte();
    },

    // Méthodes liées aux sous-éléments de génération de PNJ
    // Méthode pour générer un niveau de Puissance du PNJ
    genererConcept() {
      const cartesUtilisees = [];
      const carte1 = this.tirerCarte();
      cartesUtilisees.push(carte1.Index);
      const concept = this.tirerElement(carte1["Concept"]);

      const carte2 = this.tirerCarteDifferente(cartesUtilisees);
      const adjectif = this.tirerElement(carte2["4adjectifs"]);

      this.conceptAdjectif = `${concept} ${adjectif}`;

      this.mettreAJourPNJ();
    },
    genererOriginePNJ() {
      this.originePNJ = this.genererOrigineCulturelle();
      console.log("origine PNJ en solo --> ", this.originePNJ);
      this.mettreAJourPNJ();
    },
    // Méthode pour générer Niveau de Puissance (Étoiles)
    genererEtoiles() {
      const carte = this.tirerCarte();
      this.etoiles = this.traduireEtoiles(carte["Etoiles/5"]);
      this.mettreAJourPNJ();
    },
    // Méthode pour générer Sentiment + Disposition
    genererSentimentDisposition() {
      const cartesUtilisees = [];
      const carte3 = this.tirerCarteDifferente(cartesUtilisees);
      const sentiment = this.tirerElement(carte3["Sentiment"]);

      const carte4 = this.tirerCarteDifferente(cartesUtilisees);
      const disposition = this.tirerElement(carte4["Disposition"]);

      this.sentimentDisposition = `${sentiment} - ${disposition}`;
      this.mettreAJourPNJ();
    },
    // Méthode pour générer Apparence
    genererApparence() {
      const carte = this.tirerCarte();
      this.apparence = this.tirerElement(carte["2apparences"]);
      this.mettreAJourPNJ();
    },
    // Méthode pour générer Motivation
    genererMotivation() {
      const carte = this.tirerCarte();
      this.motivation = this.tirerElement(carte["Motivation"]);
      this.mettreAJourPNJ();
    },
    // Méthode pour générer Traits
    genererTraits() {
      const carte = this.tirerCarte();
      const trait1 = this.tirerElement(carte["3traits"]);
      const carte2 = this.tirerCarteDifferente([carte.Index]);
      const trait2 = this.tirerElement(carte2["3traits"]);
      this.traits = `${trait1} et ${trait2}`;
      this.mettreAJourPNJ();
    },
    // Méthode pour générer Secret
    genererSecret() {
      const carte = this.tirerCarte();
      this.secret = this.tirerElement(carte["Secret"]);
      console.log("secret en solo -> ", this.secret);
      this.mettreAJourPNJ();
    },
    // Méthode pour générer Relations
    genererRelations() {
      const carte = this.tirerCarte();
      this.relations = this.tirerElement(carte["Relation"]);
      this.mettreAJourPNJ();
    },
    traduireEtoiles(valeur) {
      switch (valeur) {
        case '1':
          return 'vraiment plus faible';
        case '2':
          return 'plus faible';
        case '3':
          return 'aussi fort';
        case '4':
          return 'plus fort';
        case '5':
          return 'beaucoup plus fort';
        default:
          return 'inconnue';
      }
    },

    // Méthode pour générer un Opposant
    genererOpposant() {
      const puissance = oppositions.puissances[Math.floor(Math.random() * oppositions.puissances.length)];
      const categorie = oppositions.categories[Math.floor(Math.random() * oppositions.categories.length)];
      let typeOpposant;

      // Sélectionner un opposant en fonction de la catégorie choisie
      if (categorie === "opposants_conventionnels") {
        typeOpposant = oppositions.opposants_conventionnels[Math.floor(Math.random() * oppositions.opposants_conventionnels.length)];
      } else if (categorie === "animaux_dangereux") {
        typeOpposant = oppositions.animaux_dangereux[Math.floor(Math.random() * oppositions.animaux_dangereux.length)];
      } else if (categorie === "creatures_fantastiques") {
        typeOpposant = oppositions.creatures_fantastiques[Math.floor(Math.random() * oppositions.creatures_fantastiques.length)];
      }

      const adjectif = oppositions.adjectifs[Math.floor(Math.random() * oppositions.adjectifs.length)];
      this.opposant = `${puissance} ${typeOpposant} ${adjectif}`;
    },
    // Méthode pour tirer un nom d'auberge avec une structure
    genererNomAuberge() {
      // Accéder à la structure de la première entrée
      const selectedStructure = this.tirerElement(structures[0].choix.join(", "));
      console.log('Structure pour Auberge --> ', selectedStructure);

      // Générer des éléments pour remplir la structure
      const nom1 = this.tirerElement(auberges.noms.join(", "));
      const nom2 = this.tirerElement(auberges.noms.join(", "));
      const adjectif = this.tirerElement(auberges.adjectifs.join(", "));

      // Remplacement des placeholders dans la structure choisie
      this.nomAuberge = selectedStructure
          .replace("{nom}", nom1)  // Remplace {nom} par le nom généré
          .replace("{nom}", nom2)  // Deuxième remplacement pour la même clé si nécessaire
          .replace("{adjectif}", adjectif);  // Remplace {adjectif} par l'adjectif généré

      console.log("Nom de l'auberge --> ", this.nomAuberge);
    },
    // Méthode pour générer le nom d'une cité/bourg avec une structure
    genererBourg() {
      // Sélection d'une structure de cité aléatoire
      const structureVille = this.tirerElement(bourgs.structures.join(", "));
      console.log('structureVille -> ', structureVille);

      // Sélectionner des éléments (nom, adjectif, etc.) selon la structure choisie
      let nom1 = this.tirerElement(bourgs.noms.join(", "));
      let nom2 = this.tirerElement(bourgs.noms.join(", "));
      let adjectif = this.tirerElement(bourgs.adjectifs.join(", "));
      let connecteur = this.tirerElement(bourgs.connecteurs.join(", "));

      // Remplacer les variables dans la structure
      const nomFinal = structureVille
          .replace(/\{nom}/g, (match, offset) => offset === 0 ? nom1 : nom2)
          .replace('{adjectif}', adjectif)
          .replace('{connecteur}', connecteur);

      console.log('Nom final généré -> ', nomFinal);

      // Affecter le résultat à la variable
      this.nomBourg = nomFinal;
    },
    // Méthode pour générer un Livre
    genererLivre() {
      // Sélection aléatoire de la structure du titre
      const structureTitre = this.tirerElement(livres.structures.join(", "));
      console.log('structureLivre -> ', structureTitre);

      let titreFinal = structureTitre;

      //Extraction des éléments nécessaires selon la structure
      // Remplacer les variables dans la structure par des éléments aléatoires
      if (titreFinal.includes("{type}")) {
        titreFinal = titreFinal.replace(/{type}/g, this.tirerElement(livres.types.join(', ')));
      }
      if (titreFinal.includes("{type2}")) {
        titreFinal = titreFinal.replace(/{type2}/g, this.tirerElement(livres.types.join(', ')));
      }
      if (titreFinal.includes("{sujet}")) {
        titreFinal = titreFinal.replace(/{sujet}/g, this.tirerElement(livres.sujets.join(', ')));
      }
      if (titreFinal.includes("{sujet2}")) {
        titreFinal = titreFinal.replace(/{sujet2}/g, this.tirerElement(livres.sujets.join(', ')));
      }
      if (titreFinal.includes("{auteur}")) {
        titreFinal = titreFinal.replace(/{auteur}/g, this.tirerElement(livres.auteurs.join(', ')));
      }
      if (titreFinal.includes("{nom}")) {
        titreFinal = titreFinal.replace(/{nom}/g, this.tirerElement(livres.noms.join(', ')));
      }
      if (titreFinal.includes("{adjectif}")) {
        titreFinal = titreFinal.replace(/{adjectif}/g, this.tirerElement(livres.adjectifs.join(', ')));
      }
      if (titreFinal.includes("{adjectif2}")) {
        titreFinal = titreFinal.replace(/{adjectif2}/g, this.tirerElement(livres.adjectifs.join(', ')));
      }
      if (titreFinal.includes("{de|du}")) {
        // Choix aléatoire entre "de" ou "du"
        const connecteur = Math.random() > 0.5 ? "de" : "du";
        titreFinal = titreFinal.replace(/{de\|du}/g, connecteur);
      }

      // Mettre à jour le nom généré dans data
      this.titreLivre = titreFinal;
      console.log('Nom de livre généré -> ', this.titreLivre);
    },

  },
};
</script>
