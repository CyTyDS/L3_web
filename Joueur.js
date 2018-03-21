PLAYER_GOLD = 200;
PLAYER_KILLED = 0;
PLAYER_MISSED = 20;
PLAYER_SC = 1;

    function Joueur(){
        this.gold = PLAYER_GOLD;
        this.killed = PLAYER_KILLED;
        this.missed = PLAYER_MISSED;
        this.selectedC = PLAYER_SC;

        this.hasLost = function() {
            return this.missed <= 0;
        };

        this.selectCanon = function(type) {
            this.selectedC = type;
        };
    }

    Joueur.prototype.okCanon = function (x, y, price) {
        //Condition prix
        if (this.gold < price) {
            return false;
        }

        //Condition bord de l'écran
        if (!(SCREEN_BORDER_X_MIN+SIZE <= x && x <= SCREEN_BORDER_X_MAX-SIZE
        && SCREEN_BORDER_Y_MIN+SIZE <= y && y <= SCREEN_BORDER_Y_MAX-SIZE)) {
            return false;
        }

        //DEBUT condition terrain
        var len = obstacleX.length;
        for (var o = 0; o < len-1; o++) {
            if (obstacleX[o] === obstacleX[o+1]) {
                if ((Math.max(obstacleX[o]-SIZE*1.5, 0) <= x
                && x <= Math.min(obstacleX[o]+SIZE*1.5, 800))
                && (Math.min(obstacleY[o], obstacleY[o+1])-SIZE <= y
                && y <= Math.max(obstacleY[o], obstacleY[o+1])+SIZE)) {
                    return false;
                }
            }
            if (obstacleY[o] === obstacleY[o+1]) {
                if ((Math.max(obstacleY[o]-SIZE*1.5, 0) <= y
                && y <= Math.min(obstacleY[o]+SIZE*1.5, 600))
                && (Math.min(obstacleX[o], obstacleX[o+1])-SIZE <= x
                && x <= Math.max(obstacleX[o], obstacleX[o+1])+SIZE)) {
                    return false;
                }
            }
        }
        //FIN condition terrain

        //DEBUT condition canon
        var canBool = true;
        canon.forEach(function (value) {
            if (((value.x - value.size*2 <= x)
            && (x <= value.x + value.size*2))
            && ((value.y - value.size*2 <= y)
            && (y <= value.y + value.size*2))) {
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

