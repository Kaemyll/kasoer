<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          KaSoeR, l'oracle de jdr solo
        </q-toolbar-title>

        <q-tabs class="horloge">
          <q-tab id="horloge">{{ horloge }}</q-tab>
          <q-tab id="temps-ecoule">{{ tempsEcoule }}</q-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-ma-md">

        <div class="row q-my-md">
          <q-btn @click="genererOmen" label="Générer un omen" color="secondary" class="q-mx-md q-mt-md col"/>
          <q-btn @click="genererDirection" label="Générer une direction" color="accent" class="q-mr-md q-mt-md col"/>
          <q-btn @click="tirerMeteo" label="Tirer une météo" color="info" class="q-mr-md q-mt-md col"/>
          <q-btn @click="tirerObjet" label="Tirer un objet" color="purple" class="q-mr-md q-mt-md col"/>
        </div>
        <div class="row q-my-md">
          <div v-if="omen" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center">
                Réponse à la question ouverte --> {{ omen }}
              </q-card-section>
            </q-card>
          </div>
          <div v-if="direction" class="q-mr-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center">
                Direction : {{ direction }}
              </q-card-section>
            </q-card>
          </div>
          <div v-if="meteo" class="q-mr-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center">
                Météo : {{ meteo }}
              </q-card-section>
            </q-card>
          </div>
          <div v-if="objet" class="q-mr-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center">
                Objet : un(e) {{ objet }} {{ adjectifObjet }}
              </q-card-section>
            </q-card>
          </div>
        </div>

        <q-separator color="indigo-10" spaced></q-separator>
        <div class="row q-my-md">
          <q-btn @click="tirerLieu" label="Tirer un lieu" color="teal" class="q-mx-md q-mt-md col"/>
          <q-btn @click="tirerSymbole" label="Tirer un symbole" color="orange" class="q-mr-md q-mt-md col"/>
          <q-btn label="Générer une date" class="q-mx-md q-mt-md col"/>
          <q-btn label="Générer une origine culturelle" class="q-mx-md q-mt-md col"/>
        </div>
        <div class="row q-my-md">
          <div v-if="lieu" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center">
                Lieu : un(e) {{ lieu }} {{ adjectifLieu }}
              </q-card-section>
            </q-card>
          </div>
          <div v-if="symbole" class="q-mr-md q-mt-md col">
            <q-card>
              <q-card-section class="text-center">
                Symbole : {{ symbole }}
              </q-card-section>
            </q-card>
          </div>
          <div class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Résultat du calendrier</q-card-section>
            </q-card>
          </div>
          <div class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Résultat de l'origine</q-card-section>
            </q-card>
          </div>
        </div>

        <q-separator color="indigo-10" spaced></q-separator>
        <div class="row q-my-md">
          <q-btn @click="genererPhrase" label="Générer une situation" color="primary" class="q-mx-md q-mt-md col"/>
          <q-btn @click="genererPNJ" label="Générer un PNJ" color="accent" class="q-mx-md q-mt-md col"/>
        </div>
        <div class="row q-my-md">
          <div v-if="phrase" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="text-h6">
                {{ phrase }}
              </q-card-section>
            </q-card>
          </div>
          <div v-if="pnj" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="text-h6" v-html="pnj">
              </q-card-section>
            </q-card>
          </div>
        </div>

        <q-separator color="indigo-10" spaced></q-separator>
        <div class="row q-my-md">
          <q-btn label="Générer une opposition" class="q-mx-md q-mt-md col"/>
          <q-btn label="Générer une auberge" @click="genererNomAuberge" color="primary" class="q-mx-md q-mt-md col" />
          <q-btn label="Générer une cité/bourgade" class="q-mx-md q-mt-md col"/>
          <q-btn label="Générer un livre" class="q-mx-md q-mt-md col"/>
        </div>
        <div class="row q-my-md">
          <div class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Résultat de l'opposition</q-card-section>
            </q-card>
          </div>
          <div class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">{{ nomAuberge }}</q-card-section>
            </q-card>
          </div>
          <div class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Résultat de la cité/bourgade</q-card-section>
            </q-card>
          </div>
          <div class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Résultat du livre</q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import cartes from './assets/oracle.json'; // Assurez-vous que le chemin est correct
import auberges from './assets/auberge.json';

export default {
  data() {
    return {
      phrase: '',
      meteo: '',
      pnj: '',
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
    };
  },
  mounted() {
    // Initialiser la mise à jour de l'horloge et du temps écoulé
    setInterval(() => {
      this.miseAJourHeure();
      this.miseAJourTempsEcoule();
    }, 1000);

    // Autres initialisations si besoin
  },
  methods: {
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
    tirerCarte() {
      const index = Math.floor(Math.random() * cartes.length);
      return cartes[index];
    },
    tirerAuberge() {
      const index = Math.floor(Math.random() * auberges.length);
      return auberges[index];
    },
    // Fonction pour tirer un nom d'auberge avec une structure
    genererNomAuberge() {
      const structure = this.tirerElement([
        "Le/La {nom1} {adjectif}",
        "Le/La {nom1} et le/la {nom2}",
        "Le/La {nom1} de/du/de la {nom2}",
        "Chez le/la {nom1} {adjectif}",
        "L'Auberge de/du/de la {nom1}"
      ]);
      const nom1 = this.tirerElement(aubergeData.noms);
      const nom2 = this.tirerElement(aubergeData.noms);
      const adjectif = this.tirerElement(aubergeData.adjectifs);
      const connecteur = this.tirerElement(aubergeData.connecteurs);

      // Remplacement des valeurs dans la structure choisie
      this.nomAuberge = structure
          .replace("{nom1}", nom1)
          .replace("{nom2}", nom2)
          .replace("{adjectif}", adjectif)
          .replace("le/la", connecteur);
    },
    tirerCarteDifferente(indexesExclus) {
      let carte;
      do {
        carte = this.tirerCarte();
      } while (indexesExclus.includes(carte.Index));
      return carte;
    },
    tirerElement(chaine) {
      const elements = chaine.split(", ");
      const index = Math.floor(Math.random() * elements.length);
      return elements[index];
    },
    genererOmen() {
      const carte = this.tirerCarte();
      this.omen = this.tirerElement(carte["Omen"]);
    },
    genererDirection() {
      const carte = this.tirerCarte();
      this.direction = this.tirerElement(carte["Direction"]);
    },
    genererPhrase() {
      // liste stockant les index déjà utilisés
      const cartesUtilisees = [];

      // Tirage 1
      const carte1 = this.tirerCarte();
      cartesUtilisees.push(carte1.Index);
      const mot1 = this.tirerElement(carte1["10mots"]);

      const carte2 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte2.Index);
      const verbe = this.tirerElement(carte2["3verbes"]);

      const carte3 = this.tirerCarteDifferente(cartesUtilisees)
      cartesUtilisees.push(carte3.Index);
      const mot2 = this.tirerElement(carte3["10mots"]);

      const carte4 = this.tirerCarteDifferente(cartesUtilisees)
      const adjectif = this.tirerElement(carte4["4adjectifs"]);

      const carte5 = this.tirerCarteDifferente(cartesUtilisees);
      const lieux = this.tirerElement(carte5["2lieux"]);

      this.phrase = `Le Sujet : ${mot1} - L'Action : ${verbe} - La Cible : ${mot2} ${adjectif} - Le Lieu : ${lieux}`;
    },
    tirerMeteo() {
      const carte = this.tirerCarte();
      this.meteo = this.tirerElement(carte["Météo"]);
    },
    tirerLieu() {
      const carte = this.tirerCarte();
      this.lieu = this.tirerElement(carte["2lieux"]);
      this.adjectifLieu = this.tirerElement(carte["4adjectifs"]); // Tirer un adjectif pour le lieu
    },
    tirerObjet() {
      const carte = this.tirerCarte();
      this.objet = this.tirerElement(carte["Objet"]);
      this.adjectifObjet = this.tirerElement(carte["4adjectifs"]); // Tirer un adjectif pour l'objet
    },
    tirerSymbole() {
      const carte = this.tirerCarte();
      this.symbole = this.tirerElement(carte["Symbole"]);
    },
    genererPNJ() {
      // Crée une liste pour stocker les index des cartes déjà tirées
      const cartesUtilisees = [];

      const carte1 = this.tirerCarte();
      const concept = this.tirerElement(carte1["Concept"]);
      cartesUtilisees.push(carte1.Index);

      const carte2 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte2.Index);
      const etoiles = this.traduireEtoiles(carte2["Etoiles/5"]);

      const carte3 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte3.Index);
      const adjectif = this.tirerElement(carte3["4adjectifs"]);

      const carte4 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte4.Index);
      const sentiment = this.tirerElement(carte4["Sentiment"]);

      const carte5 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte5.Index);
      const disposition = this.tirerElement(carte5["Disposition"]);

      const carte6 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte6.Index);
      const apparence = this.tirerElement(carte6["2apparences"]);

      const carte7 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte7.Index);
      const motivation = this.tirerElement(carte7["Motivation"]);

      const carte8 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte8.Index);
      const trait1 = this.tirerElement(carte8["3traits"]);

      const carte9 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte9.Index);
      const trait2 = this.tirerElement(carte9["3traits"]);

      const carte10 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte10.Index);
      const secret = this.tirerElement(carte10["Secret"]);

      const carte11 = this.tirerCarteDifferente(cartesUtilisees);
      cartesUtilisees.push(carte11.Index);
      const relation = this.tirerElement(carte11["Relation"]);

      // Construire la phrase pour le PNJ
      this.pnj = `Un(e) ${concept} ${adjectif}, ${etoiles} que le PJ <br> Humeur : ${sentiment} - Disposition : ${disposition} <br> Caractère : ${trait1} et ${trait2} <br> Particularité physique / manie : ${apparence} <br> Sa motivation : ${motivation} <br> Son secret : ${secret} <br> Ses relations : ${relation}`;
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

  },
};
</script>

<style scoped>
.q-pa-md {
  padding: 16px;
}
</style>