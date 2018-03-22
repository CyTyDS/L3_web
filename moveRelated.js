/*
    CONDITIONS DES CHEMINS (IMPORTANT)
    Les chemins doivent etre perpendiculaires,
    donc les points doivent etre perpendiculaire
    deux à deux
 */

// 1 et 2 sont les tableaux statiques des maps 1 et 2
var pX1 = [2, 783,783, 13,13, 783];
var pY1 = [11, 11,295,295, 578,578];

var pX2 = [17, 17, 780, 780, 400, 400];
var pY2 = [578, 13, 13, 580, 580, 295];

// Les tableaux qui gerent le chemin selectionné
var obstacleX = game_type === 1 ? pX1 : pX2;
var obstacleY = game_type === 1 ? pY1 : pY2;

    /*
     * initMap(x) initialise la map en fonction de x et ajoute des intervals de
     * spawn.
     */
    function initMap(x) {
        obstacleX = (x === 1 ? pX1 : pX2);
        obstacleY = (x === 1 ? pY1 : pY2);

        //spawn T1
        setInterval(function () {
            enemies.push(new Ennemi(1, obstacleX[0], obstacleY[0]));
        }, 2.65*1000);
        spawn = 2;

        /*
         * ajoute des intervals un par un toutes les 10 secondes par rapport au
         * type d'ennemi. On génère un générateur de Ennemi(1), puis un
         * générateur de Ennemi(2), puis générateur de Ennemi(1), etc.
         */
        setInterval((function () {
            if (spawn === 1) {
                //spawn T1
                setInterval(function () {
                    enemies.push(new Ennemi(1, obstacleX[0], obstacleY[0]));
                }, 2.65*1000);
                spawn = 2;
            } else {
                //spawn T2
                setInterval(function () {
                    enemies.push(new Ennemi(2, obstacleX[0], obstacleY[0]));
                }, 3.85*1000);
                spawn = 1;
            }
        }), 10*1000);
    }



