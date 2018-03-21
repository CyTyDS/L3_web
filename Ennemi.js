ENEMY_HP_1 = 60;
ENEMY_HP_2 = 20;
ENEMY_SPEED_1 = 2;
ENEMY_SPEED_2 = 3;
ENEMY_GOLD_1 = 8;
ENEMY_GOLD_2 = 8;

    function Ennemi(type, x, y) {
        this.x = x;
        this.y = y;
        this.obstacle = 0; //x points, donc allant de 0 à len-1;
        this.size = SIZE / 2; //px
        this.type = type;
        this.totalpdv = (this.type === 1 ? ENEMY_HP_1 : ENEMY_HP_2) * lvl;
        this.pdv = this.totalpdv;
        this.vitesse = (this.type === 1 ? ENEMY_SPEED_1 : ENEMY_SPEED_2);
        this.gold = (this.type === 1 ? ENEMY_GOLD_1 : ENEMY_GOLD_2);

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
