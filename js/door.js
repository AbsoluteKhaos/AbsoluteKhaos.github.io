(function() {
  if (typeof Mario === 'undefined')
    window.Mario = {};

  Door = Mario.Door = function(options) {
    this.pos = options.pos;
    this.length = options.length;
    this.site = options.site;
    console.log(this.pos[0])
    console.log(this.pos[1])
  }

  Door.prototype.checkDoor = function() {
    var h = player.power===0 ? 0 : 16;
    var x = Math.floor(player.pos[0]);
    var y = Math.floor(player.pos[1]);

    if (y+h === this.pos[1] &&x >= this.pos[0] && x+16 <= this.pos[0]+32) {
      if (input.isDown('UP')){
        window.open(this.site);
      }
    }
  }
  //we COULD try to write some shenanigans so that the check gets put into the
  //collision code, but there won't ever be more than a handful of pipes in a level
  //so the performance hit of scanning all of them is miniscule.
  Door.prototype.update = function(dt) {
    if (true) this.checkDoor();
  }

})();

