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

<!--        Affichage Omen / Direction / Météo / Objet-->
        <div class="row q-my-md">
          <q-btn @click="genererOmen" label="Générer un omen" color="purple-3" text-color="black" class="q-mx-md q-mt-md col"/>
          <q-btn @click="genererDirection" label="Générer une direction" color="purple-5" class="q-mr-md q-mt-md col"/>
          <q-btn @click="tirerMeteo" label="Générer une météo" color="purple-7" class="q-mr-md q-mt-md col"/>
          <q-btn @click="tirerObjet" label="Générer un objet" color="purple-9" class="q-mr-md q-mt-md col"/>
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
                Météo : {{ meteo }}
              </q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat de météo pour le moment</q-card-section>
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
          <q-btn @click="tirerLieu" label="Générer un lieu" color="green-3" text-color="black" class="q-mx-md q-mt-md col" />
          <q-btn @click="tirerSymbole" label="Générer un symbole" color="green-5" class="q-mr-md q-mt-md col" />
          <q-btn @click="genererDate" label="Générer une date" class="q-mx-md q-mt-md col" color="green-7" />
          <q-btn @click="genererOrigineCulturelle" label="Générer une origine culturelle" color="green-9" class="q-mx-md q-mt-md col" />
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
              <q-card-section class=""> {{date}} </q-card-section>
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
          <q-btn @click="genererPhrase" label="Générer une situation" color="red-6" class="q-mx-md q-mt-md col"/>
          <q-btn @click="genererPNJ" label="Générer un PNJ" color="red-10" class="q-mx-md q-mt-md col"/>
        </div>
        <div class="row q-my-md">
          <div v-if="phrase" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section v-html="phrase"></q-card-section>
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
        <div class="row q-my-md q-gutter-xs">
          <q-btn label="Générer une opposition" @click="genererOpposant" color="amber-3" text-color="black" class="q-mx-md q-mt-md col"/>
          <q-btn label="Générer une auberge" @click="genererNomAuberge" color="amber-5" class="q-mx-md q-mt-md col"/>
          <q-btn label="Générer une cité/bourgade" @click="genererBourg" color="amber-7" class="q-mx-md q-mt-md col"/>
          <q-btn label="Générer un livre" @click="genererLivre" color="amber-9" class="q-mx-md q-mt-md col"/>
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
              <q-card-section class=""> {{ nomBourg }} </q-card-section>
            </q-card>
          </div>
          <div v-else class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class="">Aucun résultat de Bourg pour le moment</q-card-section>
            </q-card>
          </div>
          <div v-if="titreLivre" class="q-mx-md q-mt-md col">
            <q-card>
              <q-card-section class=""> {{ titreLivre }} </q-card-section>
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
      origineCulturelle: '',
      nomBourg: '',
      titreLivre: '',
      opposant: '',
      date: '',
      theme: '',
      situation: ''
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
    // Nouvelle méthode pour tirer un thème aléatoire
    tirerTheme() {
      const index = Math.floor(Math.random() * themes.themes.length);
      return themes.themes[index];
    },
    tirerSituation() {
      const index = Math.floor(Math.random() * situations.situations_dramatiques.length);
      return situations.situations_dramatiques[index];
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
    // Méthode pour générer une météo
    tirerMeteo() {
      const carte = this.tirerCarte();
      this.meteo = this.tirerElement(carte["Météo"]);
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

    // Méthode pour générer une Situation
    genererPhrase() {
      // liste stockant les index déjà utilisés
      const cartesUtilisees = [];

      const theme = this.tirerTheme();
      const situation = this.tirerSituation();

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

      this.phrase = `Le Thème : ${theme} - La Situation dramatique : ${situation} <br> Le Sujet : ${mot1} - L'Action : ${verbe} - La Cible : ${mot2} ${adjectif} - Le Lieu : ${lieux}`;
    },

    // Méthode pour générer un PNJ
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

      const originePNJ = this.genererOrigineCulturelle();
      console.log('Origine du PNJ --> ', originePNJ)

      // Construire la phrase pour le PNJ
      this.pnj = `Un(e) ${concept} ${adjectif}, ${originePNJ}, ${etoiles} que le PJ <br> Humeur : ${sentiment} - Disposition : ${disposition} <br> Caractère : ${trait1} et ${trait2} <br> Particularité physique / manie : ${apparence} <br> Sa motivation : ${motivation} <br> Son secret : ${secret} <br> Ses relations : ${relation}`;
    },
    // Méthode pour générer un niveau de Puissance du PNJ
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
      console.log('nom1 --> ', nom1);
      const nom2 = this.tirerElement(auberges.noms.join(", "));
      console.log('nom2 --> ', nom2);
      const adjectif = this.tirerElement(auberges.adjectifs.join(", "));
      console.log('adjectif --> ', adjectif);

      // Remplacement des placeholders dans la structure choisie
      this.nomAuberge = selectedStructure
          .replace("{nom}", nom1)  // Remplace {nom} par le nom généré
          .replace("{nom}", nom2)  // Deuxième remplacement pour la même clé si nécessaire
          .replace("{adjectif}", adjectif);  // Remplace {adjectif} par l'adjectif généré
    },
    // Méthode pour générer le nom d'une cité/bourg avec une structure
    genererBourg() {
      // Sélection d'une structure de cité aléatoire
      const structureVille = this.tirerElement(bourgs.structures.join(", "));
      console.log ('structureVille -> ', structureVille);

      // Sélectionner des éléments (nom, adjectif, etc.) selon la structure choisie
      let nom1 = this.tirerElement(bourgs.noms.join(", "));
      let nom2 = this.tirerElement(bourgs.noms.join(", "));
      let adjectif = this.tirerElement(bourgs.adjectifs.join(", "));
      let connecteur = this.tirerElement(bourgs.connecteurs.join(", "));

      // Remplacer les variables dans la structure
      const nomFinal = structureVille
          .replace(/\{nom\}/g, (match, offset) => offset === 0 ? nom1 : nom2)
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
