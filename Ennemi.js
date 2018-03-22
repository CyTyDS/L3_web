ENEMY_HP_1 = 60;
ENEMY_HP_2 = 20;
ENEMY_SPEED_1 = 2;
ENEMY_SPEED_2 = 3;
ENEMY_GOLD_1 = 8;
ENEMY_GOLD_2 = 8;

    /*
     * Les ennemis du jeu. Initialisation différente en fonction du type via des
     * conditions ternaires.
     */
    function Ennemi(type, x, y) {
        this.x = x;
        this.y = y;
        this.obstacle = 0; //x points, donc allant de 0 à len-1;
        this.size = SIZE/2; // rayon de l'ennemi
        this.type = type;
        /*
         * Les pv des ennemis augmente en fonction des ennemis déjà tués.
         * Un ennemi tué = 1% de vie en plus.
         */
        this.totalpdv = (this.type === 1 ? ENEMY_HP_1 : ENEMY_HP_2) * lvl;
        this.pdv = this.totalpdv;
        this.vitesse = (this.type === 1 ? ENEMY_SPEED_1 : ENEMY_SPEED_2);
        this.gold = (this.type === 1 ? ENEMY_GOLD_1 : ENEMY_GOLD_2);

        /*
         * Indique si l'ennemi est mort
         */
        this.isDead = function () {
            return (this.pdv <= 0);
        };

        /*
         * Indique si l'ennemi a gagné, càd a fini le chemin
         */
        this.hasWon = function () {
            return (this.obstacle === obstacleX.length - 1);
        };

        /*
         * La fonction qui fait perdre des pvs à cet ennemi.
         */
        this.takeDMG = function (power) {
            this.pdv = Math.max(this.pdv - power, 0);
        };

        /*
         * Dessine l'ennemi, avec sa barre de vie en dessous.
         */
        this.draw = function() {
            context.fillStyle = (this.type === 1 ? "blue" : "blueviolet");
            context.fillRect(this.x - this.size, this.y - this.size, this.size *2, this.size *2);
            context.fillStyle = "red";
            context.fillRect(this.x - this.size, this.y + this.size +2,
                //hp %
                (this.pdv*100/this.totalpdv)*this.size*2/100, 5);
        };
    }

    /*
     * La fonction qui fait bouger l'ennemi en fonction de sa position sur le
     * tableau correspondant au chemin.
     */
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
