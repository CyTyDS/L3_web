SIZE = 20;
SIZE_ROUTE = 2 * SIZE;

var canvas;
var context;
var player = new Joueur();
var game_type = 1;
var canon = [];
var enemies = [];

//Array splice -> modifier elmt ; indexOf -> pos elmt

    function loadMap(x) {
        game_type = x;
        document.getElementById("d").innerHTML =
            "<canvas id='canvas" + x + "' width='800' height='600'></canvas>" +
            "<div class='tower' onclick='player.selectCanon(1)' >Canon 1<br/>Rapide<br/>Faible degats</div>" +
            "<div class='tower' onclick='player.selectCanon(2)' >Canon 2<br/>Lent<br/>Gros degats</div>" +
            "<div class='player' >Or : 0<br/>Ennemis tués : 0<br/>Ennemis ratés : 0</div>";

        initMap(x);
        canvas = document.querySelector('canvas');
        context = canvas.getContext('2d');

        (function play() {
            if (debenemy2.obstacle < 5) {
                context.save();
                context.clearRect(0 , 0, 800, 600);
                debcan.draw();
                debcan2.draw();
                debenemy.draw();
                debenemy.move();
                debenemy2.draw();
                debenemy2.move();
                context.restore();
                window.requestAnimationFrame(function () {
                    play();
                });
            }
        })();
    }

    function Canon(type, posx, posy) {
        this.type = type;
        this.size = SIZE;
        this.power = (this.type === 1 ? 20 : 60);
        this.firerate = (this.type === 1 ? 1 : 3);
        this.prix = (this.type === 1 ? 50 : 75);
        this.portee = (this.type === 1 ? 50 : 100);
        this.x = posx + this.size/2;
        this.y = posy + this.size/2;
        this.cible = undefined;

        this.isInReach = function (target) {
            return (Math.sqrt(Math.pow((target.x - this.x),2) + Math.pow((target.y - this.y),2)) <= this.portee);
        };

        this.hasTarget = function () {
            return (typeof this.cible !== 'undefined');
        };

        this.aim = function(){
            var target = undefined;
            enemies.forEach(function (value) {
                if (this.isInReach(value)) {
                    target = value;
                }
            }, this);
            this.cible = target;
        };

        this.shot = setInterval((function () {
            if (typeof this.cible !== 'undefined') {
                this.cible.takeDMG(this.power);
            }
        }).bind(this), 1000 * this.firerate);

        this.draw = function () {
            context.fillStyle = (this.type === 1 ? "lime" : "green");
            context.beginPath();
            context.arc(this.x, this.y, this.size/2, 0, Math.PI * 2);
            context.closePath();
            context.fill();
        };
    }

    /*
    function Balle() {
    }
    */

    function Ennemi(type) {
        this.x = undefined;
        this.y = undefined;
        this.obstacle = 0; //6 obstacles/virages, donc allant de 0 à 5;
        this.end = false;
        this.size = SIZE; //px
        this.type = type;
        this.totalpdv = (this.type === 1 ? 20 : 60);
        this.pdv = (this.type === 1 ? 20 : 60);
        this.vitesse = (this.type === 1 ? 2 : 3);
        this.gold = (this.type === 1 ? 25 : 50);

        this.setX = function (posx) {
            this.x = posx + this.size/2;
        };
        this.setY = function (posy) {
            this.y = posy + this.size/2;
        };

        this.isDead = function () {
            return (this.pdv === 0);
        };
        this.takeDMG = function (pow) {
            this.pdv -= pow;
        };
        this.draw = function() {
            context.fillStyle = (this.type === 1 ? "blue" : "blueviolet");
            context.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
            context.fillStyle = "red";
            context.fillRect(this.x - this.size/2, this.y + this.size/2 +2,
                (this.pdv*100/this.totalpdv)*this.size/100/* %pv */, 5);
        };
    }


    function Joueur(){
        this.gold = 0;
        this.killed = 0;
        this.missed = 0;
        this.selectedC = 1;

        this.selectCanon = function(type) {
            this.selectedC = type;
        };
    }



