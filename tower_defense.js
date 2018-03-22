//Declarations variables globales
SIZE = 20;
SIZE_ROUTE = SIZE / 2;

SCREEN_BORDER_X_MIN = 0;
SCREEN_BORDER_X_MAX = 800;
SCREEN_BORDER_Y_MIN = 0;
SCREEN_BORDER_Y_MAX = 600;

var canvas;
var context;
var mousePos;
var player = new Joueur();
var game_type;
var canon = [];
var enemies = [];
var spawn = 1;
var lvl = 1;

/*
 * loadMap(x) est la fonction principale du programme,
 * qui crée le menu de jeu. Elle change le contenu de
 * la page afin de mettre en place le canvas et le reste nécessaire au jeu.
 * Elle initie la map en fonction du bouton appuyé sur la page d'acceuil, charge
 * les variables globales utilisées tous le long de la partie et ajoute des
 * EventsListeners au canvas.
 * Ensuite elle lance la partie.
 */
    function loadMap(x) {
        game_type = x;
        document.getElementById("d").innerHTML =
            "<canvas id='canvas" + x + "' width='800' height='600'></canvas>" +
            "<div id='menu'><div id='tower1' onclick='player.selectCanon(1)' >Canon 1<br/>Rapide<br/>Faible degats<br/>Cout : " + CANON_COST_1 +
            "</div>" +
            "<div id='tower2' onclick='player.selectCanon(2)' >Canon 2<br/>Lent<br/>Gros degats<br/>Cout : " + CANON_COST_2 +
            "</div>" +
            "<div id='player' >" +
            "Or : <span id='gold'>500</span><br/>" +
            "Ennemis tués : <span id='killed'>0</span><br/>" +
            "Ennemis ratés : <img src='heart.png' alt='Heart' height='30' width='30' >x<span id='missed'>"+ player.missed +"</span></div></div>";

        initMap(x);
        canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');

        canvas.addEventListener('mousemove', function (e) {
            var posc = canvas.getBoundingClientRect();
            mousePos = {
                x: e.clientX - posc.left,
                y: e.clientY - posc.top
            };
        });

        canvas.addEventListener('click', function () {
            player.putCanon(mousePos.x - SIZE/2, mousePos.y - SIZE/2);
        });

        /*
         * play() est la fonction qui gère le jeu. A chaque frame,
         * le jeu se dessine, puis execute un "mouvement".
         */
        (function play() {
            if (!player.hasLost()) {
                context.save();
                context.clearRect(0 , 0, 800, 600);

                //fonction pour draw le cercle de range (autour de la souris)
                (function () {
                    if (!mousePos) {
                        return ;
                    }
                    if (player.okCanon(mousePos.x, mousePos.y, (player.selectedC === 1 ? 50 : 75))) {
                        context.fillStyle = "cyan";
                    } else {
                        context.fillStyle = "red";
                    }
                    context.beginPath();
                    context.arc(mousePos.x, mousePos.y, (player.selectedC === 1 ? 100 : 200), 0, Math.PI * 2);
                    context.closePath();
                    context.globalAlpha = 0.25;
                    context.fill();
                    context.globalAlpha = 1;
                })();

                // dessine tous les canons
                canon.forEach(function (value) {
                    value.draw();
                });

                /*
                 * dessine tous les ennemis, les fait bouger et gère leur
                 * mort/victoire
                 */
                enemies.forEach(function (value, index, array) {
                    value.draw();
                    value.move();
                    if (value.isDead() || value.hasWon()) {
                        if (value.isDead()) {
                            lvl += 0.01;
                            ++player.killed;
                            player.gold += value.gold;
                            document.getElementById('gold').innerHTML = "" + player.gold;
                            document.getElementById('killed').innerHTML = "" + player.killed;
                        }
                        if (value.hasWon()) {
                            --player.missed;
                            document.getElementById('missed').innerHTML = "" + player.missed;
                        }
                        array.splice(index, 1);
                    }
                });
                context.restore();
                window.requestAnimationFrame(function () {
                    play();
                });
            } else {
                context.font = "100px sans-serif";
                context.fillStyle = "black";
                context.fillRect(0,0,800,600);
                context.fillStyle = "#fff";
                context.fillText("Fin !", SCREEN_BORDER_X_MAX/2, SCREEN_BORDER_Y_MAX/2);
            }
        })();
    }
