// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 10;
    this.y = 550;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(){
  this.sprite = 'images/char-cat-girl.png';
  this.x = 200;
  this.y = 380;
};

Player.prototype.update = function(){

};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keycode){
  console.log(keycode);
  if(keycode == 'left') {
    console.log('left');
    console.log(this.x);
    if((this.x - 100)>=0){
      this.x-=100;
    }
  }
  else if (keycode == 'up') {
    console.log('up');
    console.log(this.y);
    if((this.y - 80)>= -30){
      this.y-=80;
    }
  }
  else if (keycode == 'right'){
    console.log('right');
    console.log(this.x);
    if((this.x + 100)<=420){
      this.x+=100;
    }
  }
  else if (keycode == 'down'){
    console.log('down');
    console.log(this.y);
    if((this.y + 80)<=440){
      this.y+=80;
    }
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];

function getAllEnemies(){
  for (var i = 0; i < 20; i++){
    allEnemies.push(new Enemy());
    console.log(enemiesArray);
  }
};

function startGame(){

}
// Place the player object in a variable called player
const player = new Player();

// Updates cards on deck when page is loaded
document.addEventListener("DOMContentLoaded", function(event) {



  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  document.addEventListener('keyup', function(e) {
      var allowedKeys = {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down'
      };

      player.handleInput(allowedKeys[e.keyCode]);
  });


});
