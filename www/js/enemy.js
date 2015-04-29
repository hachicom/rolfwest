var EnemyMap = [
        [[40,160],[68,160],[96,160],[124,160],[152,160],[180,160],[208,160],[236,160],[264,160]],
        [[40,184],[68,184],[96,184],[124,184],[152,184],[180,184],[208,184],[236,184],[264,184]],
        ];

// Bat Enemy
var BatEnemy = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,xTarget,yTarget,level) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/fishSheet.png'];
    this.x = x;
    this.y = y;

    // 2 - Status
    this.level = level;
    this.position = [yTarget,xTarget];
    this.nextposX = EnemyMap[this.position[0]][this.position[1]][0];
    this.nextposY = EnemyMap[this.position[0]][this.position[1]][1];
    this.direction = findAngle(x,y,this.nextposX,this.nextposY);
    this.mode = 'start'; //start, idle, fly, hit
    this.moveSpeed = 10;
    
    // 3 - Animate
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 1;
    this.animationDuration = 0;
    this.animationSpeed = 0.20;
    this.idleTime=0;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  gotHit: function() {
    this.parentNode.removeChild(this);
    this.remove();
  },
  
  update: function(evt) {
    var game = Game.instance;
    //IMKORTANTE: É preciso que este objeto seja parte de um grupo filho da scene! Do contrário causará erro!
    this.nextposX = EnemyMap[this.position[0]][this.position[1]][0];
    this.nextposY = EnemyMap[this.position[0]][this.position[1]][1];
    
    if (!this.parentNode.parentNode.paused){
      /*START ANIMATION BLOCK*/
      this.animationDuration += 0.05;    
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
      /*END ANIMATION BLOCK*/
      
      if(this.mode == 'start'){
        this.x += this.moveSpeed * Math.cos(this.direction);
        this.y += this.moveSpeed * Math.sin(this.direction);
        if(this.nextposY >= this.y){
          this.mode = 'idle';
          this.y = this.nextposY;
          this.x = this.nextposX;
        }
        console.log(this.x,this.y);
      }
      if(this.mode == 'idle'){
        this.y = this.nextposY;
        this.x = this.nextposX;
        if(this.x<=0) this.parentNode.parentNode.batGenerator.modeMove = 'asc'; 
        else if(this.x>=game.width-this.width) this.parentNode.parentNode.batGenerator.modeMove = 'desc'; 
      }
      if(this.mode == 'fly'){
        this.y = this.nextposY;
        this.x = this.nextposX;
        /* TODO: fazer o morcego voar na direção do jogador */
      }
      
    }
  }
});

//Bat Generator
var BatGenerator = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    //this.image  = Game.instance.assets['res/Ice.png'];      
    
    this.x = x;
    this.y = y;
    this.xTargets = [72,96,120];
    this.createBatTime = 0;
    this.batIdx = 0;
    this.batIdy = 0;
    
    //movement vars
    this.modeStart = false;
    this.modeMove = 'desc'; //asc ou desc
    this.moveLeftLimit = 0;
    this.moveRightLimit = 8;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) { 
    var game = Game.instance;
    if (!this.parentNode.paused && this.modeStart){
      //console.log(this.parentNode.batGroup.childNodes.length);
      if (this.batIdy < 2){
        if (this.batIdx < 9){
          this.createBatTime -= 1;
          if (this.createBatTime <= 0) {
            //console.log("creating bat");
            var bat = new BatEnemy(this.x,this.y,this.batIdx,this.batIdy,1);
            this.parentNode.batGroup.addChild(bat);
            this.createBatTime = 8;
            this.batIdx+=1;
            if(this.batIdx >= 9){
              this.batIdy+=1;
              this.batIdx=0;
            }
            //console.dir(this.parentNode.batGroup);
          }
        }
      }
      
      for(var i=0; i<2; i++){
        for(var j=0; j<9; j++){
          if(this.modeMove == 'asc') EnemyMap[i][j][0]+=1;
          else if(this.modeMove == 'desc') EnemyMap[i][j][0]-=1;
        }
      }
      
      // if(EnemyMap[0][this.moveLeftLimit][0]<=0) this.modeMove = 'asc';
      // else if(EnemyMap[0][this.moveRightLimit][0]>=game.width-24) this.modeMove = 'desc';
    }
  }
});