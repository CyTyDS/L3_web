CANON_POWER_1 = 10;
CANON_POWER_2 = 30;
CANON_FR_1 = 0.5;
CANON_FR_2 = 1;
CANON_COST_1 = 50;
CANON_COST_2 = 75;
CANON_RANGE_1 = 100;
CANON_RANGE_2 = 150;

    function Canon(type, posx, posy) {
        this.type = type;
        this.size = SIZE /2;
        this.power = (this.type === 1 ? CANON_POWER_1 : CANON_POWER_2);
        this.firerate = (this.type === 1 ? CANON_FR_1 : CANON_FR_2);
        this.prix = (this.type === 1 ? CANON_COST_1 : CANON_COST_2);
        this.portee = (this.type === 1 ? CANON_RANGE_1 : CANON_RANGE_2);
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
                context.arc(this.x, this.y, this.size, angle - pi/2, angle + pi/2);
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

