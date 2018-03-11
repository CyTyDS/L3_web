var pX1 = [2, 783,783, 13,13, 783];
var pY1 = [6,6 ,295,295, 578,578];

var pX2 = [11, 11, 780, 780, 400, 400];
var pY2 = [578, 13, 13, 580, 580, 295];

var obstacleX = game_type === 1 ? pX1 : pX2;
var obstacleY = game_type === 1 ? pY1 : pY2;

    function initMap(x) {
        obstacleX = (x === 1 ? pX1 : pX2);
        obstacleY = (x === 1 ? pY1 : pY2);

        debcan = new Canon(1, 40, 40);
        debcan2 = new Canon(2, 580, 40);
        debenemy = new Ennemi(2);
        debenemy.setX(obstacleX[0]);
        debenemy.setY(obstacleY[0]);
        debenemy2 = new Ennemi(1);
        debenemy2.setX(obstacleX[0]);
        debenemy2.setY(obstacleY[0]);
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

    Player.prototype.putCanon = function (x, y) {
        var c = new Canon(this.selectedC, x, y);
        //TODO more conditions
        if (this.gold >= c.prix) {
            canon.push(c);
        }
    };