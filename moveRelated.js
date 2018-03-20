/*
    CONDITIONS DES CHEMINS (IMPORTANT)
    Les chemins doivent etre perpendiculaires,
    donc les points doivent etre perpendiculaire
    deux à deux
 */

var pX1 = [2, 783,783, 13,13, 783];
var pY1 = [11, 11,295,295, 578,578];

var pX2 = [17, 17, 780, 780, 400, 400];
var pY2 = [578, 13, 13, 580, 580, 295];

var obstacleX = game_type === 1 ? pX1 : pX2;
var obstacleY = game_type === 1 ? pY1 : pY2;

    function initMap(x) {
        obstacleX = (x === 1 ? pX1 : pX2);
        obstacleY = (x === 1 ? pY1 : pY2);


        //debug
        setInterval(function () {
            debenemy = new Ennemi(1);
            debenemy.x = obstacleX[0];
            debenemy.y = obstacleY[0];
            debenemy2 = new Ennemi(2);
            debenemy2.x = obstacleX[0];
            debenemy2.y = obstacleY[0];

            enemies.push(debenemy);
            enemies.push(debenemy2);
        }, 1000);
    }

    Ennemi.prototype.move = function () {
        var o = this.obstacle;
        if (obstacleX[o] === obstacleX[o+1]) {
            if (obstacleY[o] < obstacleY[o+1]) {
                this.y += this.vitesse;
                if (this.y >= obstacleY[o+1]) {
                    this.y = obstacleY[o+1];
                    this.obstacle += 1;
                }
            } else {
                this.y -= this.vitesse;
                if (this.y <= obstacleY[o+1]) {
                    this.y = obstacleY[o+1];
                    this.obstacle += 1;
                }
            }
            return ;
        }
        if (obstacleY[o] === obstacleY[o+1]) {
            if (obstacleX[o] < obstacleX[o+1]) {
                this.x += this.vitesse;
                if (this.x >= obstacleX[o+1]) {
                    this.x = obstacleX[o+1];
                    this.obstacle += 1;
                }
            } else {
                this.x -= this.vitesse;
                if (this.x <= obstacleX[o+1]) {
                    this.x = obstacleX[o+1];
                    this.obstacle += 1;
                }
            }
            //return ;
        }
    };

    Joueur.prototype.okCanon = function (x, y, price) {
        //Condition prix
        if (this.gold < price) {
            return false;
        }

        //Condition bord de l'écran
        if (!(0+SIZE <= x && x <= 800-SIZE
            && 0+SIZE <= y && y <= 600-SIZE)) {
            return false;
        }

        //DEBUT condition terrain
        var len = obstacleX.length;
        for (var o = 0; o < len-1; o++) {
            if (obstacleX[o] === obstacleX[o+1]) {
                if ((Math.max(obstacleX[o]-SIZE*1.5, 0) <= x && x <= Math.min(obstacleX[o]+SIZE*1.5, 800))
                    && (Math.min(obstacleY[o], obstacleY[o+1])-SIZE <= y && y <= Math.max(obstacleY[o], obstacleY[o+1])+SIZE)) {
                    return false;
                }
            }
            if (obstacleY[o] === obstacleY[o+1]) {
                if ((Math.max(obstacleY[o]-SIZE*1.5, 0) <= y && y <= Math.min(obstacleY[o]+SIZE*1.5, 600))
                        && (Math.min(obstacleX[o], obstacleX[o+1])-SIZE <= x && x <= Math.max(obstacleX[o], obstacleX[o+1])+SIZE)) {
                    return false;
                }
            }
        }
        //FIN condition terrain

        //DEBUT condition canon
        var canBool = true;
        canon.forEach(function (value) {
            if (((value.x - value.size*2 <= x) && (x <= value.x + value.size*2))
                && ((value.y - value.size*2 <= y) && (y <= value.y + value.size*2))) {
                canBool = false;
            }
        });
        if (canBool === false) {
            return canBool;
        }
        //FIN condition canon
        return true;
    };

    Joueur.prototype.putCanon = function (x, y) {
        var c = new Canon(this.selectedC, x, y);
        if (this.okCanon(c.x, c.y, c.prix)) {
            player.gold -= c.prix;
            canon.push(c);
            document.getElementById('gold').innerHTML = "" + player.gold;
        }
    };
