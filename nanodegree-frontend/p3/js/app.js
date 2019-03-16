// Grid Positions -> Enemy
const ENEMY_ROW_1 = 55;
const ENEMY_ROW_2 = 135;
const ENEMY_ROW_3 = 215;

// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = -20;
    this.speed = Math.floor((Math.random()*100)*4);
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
    this.x = Math.floor(this.x + dt * this.speed);
    if(this.x>0) this.display = true;
    if(this.x>505){
      this.x = getXCoordinate();
      this.display = false;
    }
    if(this.display){
      if(this.detectCollision()){
        this.display = false;
        restartGame();
      }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.detectCollision = function() {
  if(((this.x > player.x)&&(this.x <= player.x + 101)) && ((player.y >= this.y)&&(player.y <= this.y + 65))){
    return true;
  }
  return false;
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
  if(this.collisionDetected()){
    restartGame();
  }
};

Player.prototype.collisionDetected = function(){
  let collision = false;
  for (enemy of allEnemies){
    if(((enemy.x > player.x)&&(enemy.x <= player.x + 101)) && ((player.y >= enemy.y)&&(player.y <= enemy.y + 65))){
      collision = true;
    }
  }
  return collision;
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keycode){
  if(keycode == 'left') {
    if((this.x - 100)>=0){
      this.x-=100;
    }
  }
  else if (keycode == 'up') {
    if((this.y - 80)>= -30){
      this.y-=80;
    }
    else player.reset()
  }
  else if (keycode == 'right'){
    if((this.x + 100)<=420){
      this.x+=100;
    }
  }
  else if (keycode == 'down'){
    if((this.y + 80)<=440){
      this.y+=80;
    }
  }
}

Player.prototype.reset = function(){
  this.x = 200;
  this.y = 380;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const allEnemies = [];
function restartGame(){
  player.reset();
  for (let enemy of allEnemies){
    enemy.x = getXCoordinate();
    enemy.display = false;
  }
}

// function collisionDetected(){
//   console.log(this);
//   if(((this.x>= player.x)&&(this.x<=player.x + 101))&&((this.y + 171 >= player.y)&&((this.y + 171) <= (this.y + 171)))){
//     return true;
//   }
//   return false;
// }

function getXCoordinate(){
  return (Math.floor(Math.random()*40*10 - 750));
}

// Updates cards on deck when page is loaded
document.addEventListener("DOMContentLoaded", function(event) {
  getAllEnemies();

  function getAllEnemies(){
    for (var i = 0; i < 6; i++){
      let enemy = new Enemy();
      if(i<2){
        enemy.x = Math.floor(Math.random()*40*10 - 750);
        enemy.y = ENEMY_ROW_1;
      } else if (i<4){
        enemy.x = Math.floor(Math.random()*40*10 - 750);
        enemy.y = ENEMY_ROW_2;
      } else{
        enemy.x = Math.floor(Math.random()*40*10 - 750);
        enemy.y = ENEMY_ROW_3 ;
      }
      allEnemies.push(enemy);
      console.log(allEnemies);
    }
    return allEnemies;
  };



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
