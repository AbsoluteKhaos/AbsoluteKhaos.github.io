(function() {
  if (typeof Mario === 'undefined')
  window.Mario = {};

  var Hadoflower = Mario.Hadoflower = function(pos) {
    this.spawning = false;
    this.waiting = 0;

    Mario.Entity.call(this, {
      pos: pos,
      sprite: level.fireFlowerSprite,
      hitbox: [0,0,16,16]
    });
  }

  Mario.Util.inherits(Hadoflower, Mario.Entity);

  Hadoflower.prototype.render = function(ctx, vX, vY) {
    if (this.spawning > 1) return;
    this.sprite.render(ctx, this.pos[0], this.pos[1], vX, vY);
  }

  Hadoflower.prototype.spawn = function() {
    sounds.itemAppear.play();
    this.idx = level.items.length;
    level.items.push(this);
    this.spawning = 12;
    this.targetpos = [];
    this.targetpos[0] = this.pos[0];
    this.targetpos[1] = this.pos[1] - 16;
  }

  Hadoflower.prototype.update = function(dt) {
    if (this.spawning > 1) {
      this.spawning -= 1;
      if (this.spawning == 1) this.vel[1] = -.5;
      return;
    }
    if (this.spawning) {
      if (this.pos[1] <= this.targetpos[1]) {
        this.pos[1] = this.targetpos[1];
        this.vel[1] = 0;
        this.spawning = 0;
      }
    }

      this.vel[1] += this.acc[1];
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      this.sprite.update(dt);
  }

  Hadoflower.prototype.checkCollisions = function() {
    if (this.spawning) {return;}
    this.isPlayerCollided();
  }

  Hadoflower.prototype.isPlayerCollided = function() {
    //the first two elements of the hitbox array are an offset, so let's do this now.
    var hpos1 = [this.pos[0] + this.hitbox[0], this.pos[1] + this.hitbox[1]];
    var hpos2 = [player.pos[0] + player.hitbox[0], player.pos[1] + player.hitbox[1]];

    //if the hitboxes actually overlap
    if (!(hpos1[0] > hpos2[0]+player.hitbox[2] || (hpos1[0]+this.hitbox[2] < hpos2[0]))) {
      if (!(hpos1[1] > hpos2[1]+player.hitbox[3] || (hpos1[1]+this.hitbox[3] < hpos2[1]))) {
        player.powerUp1(this.idx);
      }
    }
  }

  //This should never be called, but just in case.
  Hadoflower.prototype.bump = function() {;}

})();
