$(document).ready(function() {
  // Définition d'un plugin jQuery `morpion`
  $.fn.morpion = function(options = {}) {
    // Gestion des options par défaut du plugin
    options = $.extend({}, { replayButton: '#replay' }, options);

    // Référence à `this` (la grille)
    const self = this;

    // Liste de toutes les lignes
    const rows = $(this).find('.row');

    // Liste de toutes les cases
    const cells = $(this).find('.cell');

    // Zone d'affichage du gagnant
    const winnerDisplay = $(this).find('.win-display');

    // Bouton pour relancer la partie
    const replay = $(options.replayButton);

    // Joueur en cours
    let currentPlayer = 1;

    // Pour chaque ligne de la grille...
    $(rows).each(function(y, row) {
      // ...et chaque case dans la ligne
      $(row)
        .find('.cell')
        .each(function(x, cell) {
          // On assigne les coordonnées xy (réutilisées plus tard)
          $(cell).data('y', y);
          $(cell).data('x', x);
        });
    });

    // Au clic sur le bouton replay
    $(replay).click(function() {
      $(cells).each(function(_, cell) {
        // On supprime les données du jeu précédent
        $(cell).removeData('player');
        $(cell).text('');
      });

      // On enlève la classe .won pour cacher l'affichage des résultats
      $(self).removeClass('won');
    });

    /**
     * Détecte si un joueur a rempli toutes les cases dans une ligne donnée
     * Fonctionne avec les lignes, colonnes et diagonales en fonction des paramètres passés
     *
     * @param x  - Position en X de la ligne
     * @param y  - Position en Y de la ligne
     * @param dx - Mouvement à faire en X à chaque boucle
     * @param dy - Mouvement à faire en Y à chaque boucle
     */
    function checkLine(x, y, dx, dy) {
      let current = null;

      for (let i = 0; i < 3; i++) {
        /*
         * Récupération de la case en cours depuis ses coordonées XY
         *
         * Position = Largeur * Y + X
         * Exemple : Y = 1, X = 2, Position = 1 * 3 + 2 = 5
         *
         * |0|1|2|
         * |3|4|5| <- La case est bien ici
         * |6|7|8|
         */
        const cell = cells[y * 3 + x];

        if (current === null) {
          // On récupère le joueur de la première case
          // (Si current est null alors on a pas encore trouvé de joueur)
          current = $(cell).data('player');
        }

        // Si le joueur de la case en cours n'est pas le même que current,
        // personne n'a gagné dans la ligne en cours
        if ($(cell).data('player') !== current) {
          return null;
        }

        /*
         * On ajoute dx et dy aux coordonées
         * dx et dy permettent de déterminer les déplacements dans la grille
         *
         * dx=0;  dy=1 -> Déplacement vertical
         * dx=1;  dy=0 -> Déplacement horizontal
         * dx=1;  dy=1 -> Déplacement diagonal (vers la droite)
         * dx=-1; dy=1 -> Déplacement diagonal (vers la gauche)
         */
        x += dx;
        y += dy;
      }

      // On retourne le joueur trouvé
      return current;
    }

    // Fonction pour vérifier s'il y a un gagnant
    function checkWin(cell) {
      // On récupère les coordonées de la case cliquée
      const x = $(cell).data('x');
      const y = $(cell).data('y');

      /*
       * checkLine retoune le numéro du gagnant un NULL si personne n'a gagné dans la ligne
       * null || null || 1 || null === 1
       *
       * Ordre de vérification:
       *  - Vertical
       *  - Horizontal
       *  - Diagonale droite
       *  - Diagonale gauche
       */
      const result =
        checkLine(x, 0, 0, 1) ||
        checkLine(0, y, 1, 0) ||
        checkLine(0, 0, 1, 1) ||
        checkLine(2, 0, -1, 1);

      // Si on a un résultat, alors on a trouvé un joueur gagnant
      if (result) {
        // Affichage du gagnant
        $(winnerDisplay).text(`Joueur ${result} a gagné !`);
        $(self).addClass('won');
      }

      return result;
    }

    // Permet de vérifier si la grille est pleine
    function checkFull() {
      for (let i = 0; i < $(cells).length; i++) {
        // Si la case n'a pas été jouée, la grille n'est pas pleine
        if (!$(cells[i]).data('player')) return false;
      }

      return true;
    }

    // Au clic sur les cases
    $(cells).click(function() {
      // Si un joueur a déjà joué ici, on ne fait rien
      if ($(this).data('player')) return;

      // Affichage du X ou O et ajout du numéro du joueur dans data('player')
      $(this).text(currentPlayer === 1 ? 'X' : 'O');
      $(this).data('player', currentPlayer);

      // Alternance entre les joueurs
      currentPlayer = currentPlayer === 1 ? 2 : 1;

      // Vérification des gagnants
      //
      // S'il n'y a pas de gagnants et que la grille est vide
      if (!checkWin(this) && checkFull()) {
        // Affichage du match nul
        $(winnerDisplay).text('Match nul');
        $(self).addClass('won');
      }
    });
  };

  // Appel du plugin
  $('#grid').morpion({ replayButton: '#replay' });
});
