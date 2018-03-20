SIZE = 20;
SIZE_ROUTE = SIZE / 2;
CANON_COST_1 = 50;
CANON_COST_2 = 75;

var canvas;
var context;
var mousePos;
var player = new Joueur();
var game_type;
var canon = [];
var enemies = [];

//Array splice -> modifier elmt ; indexOf -> pos elmt

    function loadMap(x) {
        game_type = x;
        document.getElementById("d").innerHTML =
            "<canvas id='canvas" + x + "' width='800' height='600'></canvas>" +
            "<div id='tower1' onclick='player.selectCanon(1)' >Canon 1<br/>Rapide<br/>Faible degats<br/>Cout : " + CANON_COST_1 +
            "</div><br />" +
            "<div id='tower2' onclick='player.selectCanon(2)' >Canon 2<br/>Lent<br/>Gros degats<br/>Cout : " + CANON_COST_2 +
            "</div><br />" +
            "<div id='player' >" +
            "Or : <span id='gold'>500</span><br/>" +
            "Ennemis tués : <span id='killed'>0</span><br/>" +
            "Ennemis ratés : <img src='heart.png' alt='Heart' height='30' width='30' >x<span id='missed'>"+ player.missed +"</span></div><br />";

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

        (function play() {
            if (!player.hasLost()) {
                context.save();
                context.clearRect(0 , 0, 800, 600);

                //fonction pour draw le cercle de range
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

                canon.forEach(function (value) {
                    value.draw();
                });
                enemies.forEach(function (value, index, array) {
                    value.draw();
                    value.move();
                    if (value.isDead() || value.hasWon()) {
                        if (value.isDead()) {
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
            }


        })();
    }

    function Canon(type, posx, posy) {
        this.type = type;
        this.size = SIZE /2;
        this.power = (this.type === 1 ? 10 : 30);
        this.firerate = (this.type === 1 ? 0.5 : 1);
        this.prix = (this.type === 1 ? CANON_COST_1 : CANON_COST_2);
        this.portee = (this.type === 1 ? 100 : 200);
        this.x = posx + this.size;
        this.y = posy + this.size;
        this.cible = undefined;
        this.canFire = false;

        this.isInReach = function (target) {
            return (Math.sqrt(Math.pow((target.x - this.x),2) + Math.pow((target.y - this.y),2)) <= this.portee);
        };

        this.hasTarget = function () {
            return (typeof this.cible !== 'undefined');
        };

        //this.shot =
        setInterval((function () {
            //recherche de cible
            var target = undefined;
            enemies.forEach(function (value) {
                if (this.isInReach(value)) {
                    target = value;
                }
            }, this);
            //puis tir
            this.cible = target;
            if (this.hasTarget()) {
                this.cible.takeDMG(this.power);
                this.canFire = true;
                setTimeout((function () {
                    this.canFire = false;
                }).bind(this), 200);
            }
        }).bind(this), 1000 * this.firerate);

        this.draw = function () {
            if (this.canFire === true) {
                this.drawFire();
            }
            context.fillStyle = (this.type === 1 ? "lime" : "green");
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.closePath();
            context.fill();

            //dessin viseur
            if (this.hasTarget()) {
                var pi = Math.PI;
                var angle = Math.atan(Math.abs(this.cible.y - this.y) / Math.max(Math.abs(this.cible.x - this.x), 0.1));
                if (this.cible.y - this.y < 0) {
                    angle -= pi/2;
                    angle += 2*((-pi)/4 - angle);
                }
                if (this.cible.x - this.x < 0) {
                    angle += pi/2;
                    angle += 2*((3*pi)/4 - angle);
                }
                context.strokeStyle = "black";
                context.beginPath();
                context.arc(this.x, this.y, this.size, angle - pi/6, angle + pi/6);
                context.closePath();
                context.stroke();
            }
        };
        this.drawFire = function () {
            context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(this.cible.x, this.cible.y);
            context.strokeStyle = "red";
            context.stroke();
        };
    }


    function Ennemi(type) {
        this.x = undefined;
        this.y = undefined;
        this.obstacle = 0; //x points, donc allant de 0 à len-1;
        this.size = SIZE / 2; //px
        this.type = type;
        this.totalpdv = (this.type === 1 ? 20 : 60);
        this.pdv = (this.type === 1 ? 20 : 60);
        this.vitesse = (this.type === 1 ? 2 : 3);
        this.gold = (this.type === 1 ? 25 : 50);

        this.isDead = function () {
            return (this.pdv <= 0);
        };
        this.hasWon = function () {
            return (this.obstacle === obstacleX.length - 1);
        };
        this.takeDMG = function (power) {
            this.pdv = Math.max(this.pdv - power, 0);
        };
        this.draw = function() {
            context.fillStyle = (this.type === 1 ? "blue" : "blueviolet");
            context.fillRect(this.x - this.size, this.y - this.size, this.size *2, this.size *2);
            context.fillStyle = "red";
            context.fillRect(this.x - this.size, this.y + this.size +2,
                //hp %
                (this.pdv*100/this.totalpdv)*this.size*2/100, 5);
        };
    }


    function Joueur(){
        this.gold = 500;
        this.killed = 0;
        this.missed = 20;
        this.selectedC = 1;

        this.hasLost = function() {
            return this.missed === 0;
        };

        this.selectCanon = function(type) {
            this.selectedC = type;
        };
    }
