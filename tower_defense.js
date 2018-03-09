GAME_T1 = 1;
GAME_T2 = 2;
var player = new Joueur();
var type = 1;
var canon = [];
var enemies = [];
//var bullets =;
//Array splice -> modifier elmt ; indexOf -> pos elmt

    function loadMap(x) {
        type = x;
        document.getElementById("d").innerHTML =
            "<canvas id='canvas" + x + "' width='800' height='600'></canvas>" +
            "<div class='tower' onclick='player.selectCanon(GAME_T1)' >Canon 1<br/>Rapide<br/>Faible degats</div>" +
            "<div class='tower' onclick='player.selectCanon(GAME_T2)' >Canon 2<br/>Lent<br/>Gros degats</div>" +
            "<div class='player' >Or : 0<br/>Ennemis tués : 0<br/>Ennemis ratés : 0</div>";
        var canvas = document.querySelector('canvas');
        var context = canvas.getContext('2d');

        context.save();
        context.translate(773,572);
        context.restore();
        context.save();

        context.fillStyle = "blue";
        context.fillRect(0,0,20,20);
        context.fillStyle = "green";
        context.fillRect(0, 20, 10, 10);
        //context.clearRect(0,0,70,70);

        //play()
    }

    function Canon(type, posx, posy) {
        this.type = type;
        this.power = (this.type == GAME_T1 ? 20 : 60);
        this.firerate = (this.type == GAME_T1 ? 1 : 3);
        this.prix = (this.type == GAME_T1 ? 50 : 75);
        this.portee = (this.type == GAME_T1 ? 50 : 100);
        this.x = posx;
        this.y = posy;
        this.cible;

        this.setTarget = function(target){
            this.cible = target;
        };

        this.shot = function () {
            if (typeof this.cible != 'undefined') {
                this.cible.takeDMG(this.power);
            }
        };
    }

    /*
    function Balle() {
    }
    */

    function Ennemi(type) {
        this.x;
        this.y;
        this.end = false;
        this.size = 20; //px
        this.type = type;
        this.pdv = (this.type == GAME_T1 ? 20 : 60);
        this.vitesse = (this.type == GAME_T1 ? 1 : 3);
        this.gold = (this.type == GAME_T1 ? 25 : 50);

        this.isDead = function () {
            return (this.pdv == 0);
        };
        this.takeDMG = function (pow) {
            this.pdv -= pow;
        }
        this.move = function() {
            //TODO (in proto of different file ?)
        };
    }


    function Joueur(){
        this.gold;
        this.killed;
        this.missed;
        this.selectedC = GAME_T1;

        this.selectCanon = function(type) {
            this.selectedC = type;
        };
        
        this.putCanon = function (x, y) {
            var c = new Canon(this.selectedC, x, y);
            if (this.gold >= c.prix) {
                canon.push(c);
            }
        };

    }



