<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          KaSoeR, l'oracle de jdr solo
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <q-btn @click="genererPhrase" label="Générer une situation" color="primary" />
        <div v-if="phrase" class="q-mt-md">
          <q-card>
            <q-card-section class="text-h6">
              {{ phrase }}
            </q-card-section>
          </q-card>
        </div>

        <q-btn @click="tirerMeteo" label="Tirer une météo" color="secondary" class="q-mt-md" />
        <div v-if="meteo" class="q-mt-md">
          <q-card>
            <q-card-section class="text-h6">
              Météo : {{ meteo }}
            </q-card-section>
          </q-card>
        </div>

        <div class="q-mt-md">
          <q-btn @click="tirerLieu" label="Tirer un lieu" color="teal" />
          <q-btn @click="tirerObjet" label="Tirer un objet" color="purple" />
          <q-btn @click="tirerSymbole" label="Tirer un symbole" color="orange" />
        </div>

        <div v-if="lieu || objet || symbole" class="q-mt-md">
          <q-card>
            <q-card-section class="text-h6">
              Lieu : un(e) {{ lieu }} {{ adjectifLieu }} | Objet : un(e) {{ objet }} {{ adjectifObjet }} | Symbole : {{ symbole }}            </q-card-section>
          </q-card>
        </div>

        <q-btn @click="genererPNJ" label="Générer un PNJ" color="accent" class="q-mt-md" />
        <div v-if="pnj" class="q-mt-md">
          <q-card>
            <q-card-section class="text-h6">
              PNJ : {{ pnj }}
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import cartes from './assets/oracle.json'; // Assurez-vous que le chemin est correct

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
    };
  },
  methods: {
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
      this.pnj = `Un(e) ${concept} ${adjectif} de ${etoiles} puissance - ${sentiment} / ${disposition} - En apparence : ${apparence} - Sa motivation : ${motivation} - ${trait1} / ${trait2} - Son secret : ${secret} - Ses relations : ${relation}`;
    },
    traduireEtoiles(valeur) {
      switch (valeur) {
        case '1':
          return 'faible';
        case '2':
          return 'commune';
        case '3':
          return 'forte';
        case '4':
          return 'héroïque';
        case '5':
          return 'légendaire';
        default:
          return 'inconnue';
      }
    },
    tirerCarte() {
      const index = Math.floor(Math.random() * cartes.length);
      return cartes[index];
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
  },
};
</script>

<style scoped>
.q-pa-md {
  padding: 16px;
}
</style>
