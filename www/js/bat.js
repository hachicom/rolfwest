// Bat Enemy
var BatEnemy = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,xTarget,yTarget,level,batGenKey) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/batSheet.png'];
    this.x = x;
    this.y = y;
    this.batGenKey = batGenKey;

    // 2 - Status
    this.level = level;
    this.position = [yTarget,xTarget];
    this.nextposX = xTarget;
    this.nextposY = yTarget;
    this.direction = findAngle(x,y,this.nextposX,this.nextposY);
    this.mode = 'start'; //start, idle, fly, hit
    this.moveSpeed = 12;
    this.xSpeed = 0;
    this.xAccel = 0.5;
    this.shootTime = 0;
    this.bullets = 0;
    this.horizontalDir = getRandom(1,2); //left/right
    
    // 3 - Animate
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 3;
    this.animationDuration = 0;
    this.animationSpeed = 0.20;
    this.idleTime=0;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  gotHit: function(playerObj) {
    this.parentNode.parentNode.batGenerator.rearrangeBats(this.batGenKey);
    switch(this.mode){
      case 'start'  : playerObj.score+=20; break;
      case 'idle'   : playerObj.score+=10; break;
      case 'fly'    : playerObj.score+=40; break;
      case 'retreat': playerObj.score+=80; break;
    }
    this.parentNode.removeChild(this);
    delete this;
  },
  
  setTarget: function() {
    //this.direction = findAngle(this.x,this.y,this.parentNode.parentNode.rolf.x,this.parentNode.parentNode.rolf.y);
    this.mode = 'fly';
  },
  
  update: function(evt) {
    var game = Game.instance;
    //IMKORTANTE: É preciso que este objeto seja parte de um grupo filho da scene! Do contrário causará erro!
    this.nextposX = this.parentNode.parentNode.batGenerator.batEnemyMap[this.position[0]][this.position[1]][0];
    this.nextposY = this.parentNode.parentNode.batGenerator.batEnemyMap[this.position[0]][this.position[1]][1];
    
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
        this.direction = findAngle(this.x,this.y,this.nextposX,this.nextposY);
        this.x += this.moveSpeed * Math.cos(this.direction);
        this.y += this.moveSpeed * Math.sin(this.direction);
        if(this.nextposY >= this.y){
          this.mode = 'idle';
          this.shootTime = 5 + getRandom(0,5);
          this.bullets = getRandom(2,4);
          this.moveSpeed = 2;
          this.y = this.nextposY;
          this.x = this.nextposX;
        }
        if(this.nextposX<0) {this.parentNode.parentNode.batGenerator.modeMove = 'asc'; }
        else if(this.nextposX>game.width-this.width) {this.parentNode.parentNode.batGenerator.modeMove = 'desc'; }
      }
      if(this.mode == 'idle'){
        this.y = this.nextposY;
        this.x = this.nextposX;
        if(this.x<0) {this.parentNode.parentNode.batGenerator.modeMove = 'asc'; }
        else if(this.x>game.width-this.width) {this.parentNode.parentNode.batGenerator.modeMove = 'desc'; }
      }
      if(this.mode == 'fly'){
        //movement
        if(this.x <= this.parentNode.parentNode.rolf.x){
          if(this.x<=this.parentNode.parentNode.rolf.x - 24) this.horizontalDir=2;
        } else {
          if(this.x>=this.parentNode.parentNode.rolf.x + 24) this.horizontalDir=1;
        }
        if(this.horizontalDir==1){
          this.xSpeed -= this.xAccel;
          if(this.xSpeed<=-7)this.xSpeed=-7;
        }else{
          this.xSpeed += this.xAccel;
          if(this.xSpeed>=7)this.xSpeed=7;
        }
        this.x += this.xSpeed;
        this.y += this.moveSpeed;
        if(this.y>=this.parentNode.parentNode.rolf.y){
          //this.y = -this.height;
          this.direction = findAngle(this.x,this.y,this.nextposX,this.nextposY);
          this.mode = 'retreat';
          this.moveSpeed = 5;
        }
        
        //shoot at player
        this.shootTime-=1;
        if(this.bullets>0 && this.shootTime<=0){
          var s = new EnemyShot(this.x+9, this.y, this.parentNode.parentNode.rolf, this.level, 'bat');
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.bullets-=1;
          this.shootTime = 5 + getRandom(0,5);          
        }
        
        //keep control of position on troop
        if(this.nextposX<0) {this.parentNode.parentNode.batGenerator.modeMove = 'asc'; }
        else if(this.nextposX>game.width-this.width) {this.parentNode.parentNode.batGenerator.modeMove = 'desc'; }
      }      
      if(this.mode == 'retreat'){
        this.y -= this.moveSpeed;
        if(this.y<=this.parentNode.parentNode.rolf.y-72){
          //this.y = -this.height;
          this.direction = findAngle(this.x,this.y,this.nextposX,this.nextposY);
          this.mode = 'start';
          this.moveSpeed = 8;
        }
      }
      
    }
  }
});

//Bat Generator
var BatGenerator = Class.create(Sprite, {
  // The windows that will create the bats
  initialize: function(x,y,lvlBatEnemyMap,level) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    //this.image  = Game.instance.assets['res/Ice.png'];      
    
    //control vars
    this.x = x;
    this.y = y;
    this.genpoint = -24;
    this.bats = [];
    this.createBatTime = 0;
    this.createBatSide = getRandom(0,1); //0=on the same position; 1=on the other side;
    this.sendBatTime = 90 + (10 * getRandom(1,4));
    this.batIdx = 0;
    this.batIdy = 0;
    this.level = level;
    
    //movement vars
    this.modeStart = false;
    this.readyToFight = false;
    this.defeated = false;
    this.modeMove = 'desc'; //asc ou desc
    
    //level map loading
    this.batEnemyMap = JSON.parse(JSON.stringify(lvlBatEnemyMap));
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) { 
    var game = Game.instance;
    if (!this.parentNode.paused && this.modeStart){
    
      //ENEMY CREATION PROCESS
      if (this.batIdy < this.batEnemyMap.length){
        if (this.batIdx < this.batEnemyMap[this.batIdy].length){
          this.createBatTime -= 1;
          if (this.createBatTime <= 0) {
            //console.log("creating bat");
            var bat = new BatEnemy(this.genpoint+this.createBatSide*(game.width+48),this.y,this.batIdx,this.batIdy,this.level,this.bats.length);
            this.bats.push(bat);
            this.parentNode.batGroup.addChild(bat);
            this.createBatTime = 8;
            this.createBatSide = getRandom(0,1);
            this.batIdx+=1;
            if(this.batIdx >= this.batEnemyMap[this.batIdy].length){
              this.batIdy+=1;
              this.batIdx=0;
              if(this.batIdy>=this.batEnemyMap.length) {
                this.readyToFight = true;
                this.parentNode.batkidGenerator.modeStart = true;
              }
            }
            //console.dir(this.parentNode.batGroup);
          }
        }
      }else{
      
        //ENEMY SENDING PROCESS
        if(!this.parentNode.gotHit){
          this.sendBatTime-=1;
          if(this.sendBatTime<=0 && this.bats.length>0){
            var idbat = getRandom(1,this.bats.length) - 1;
            if(this.bats[idbat].mode == 'idle') {
              this.bats[idbat].setTarget();
              this.sendBatTime = 90 + (10 * getRandom(1,4));
            }
          }
        }
      }
      
      //ENEMY MOVING PROCESS
      for(var i=0; i<this.batEnemyMap.length; i++){
        for(var j=0; j<this.batEnemyMap[i].length; j++){
          if(this.modeMove == 'asc') this.batEnemyMap[i][j][0]+=1;
          else if(this.modeMove == 'desc') this.batEnemyMap[i][j][0]-=1;
        }
      }
    }
  },
  
  rearrangeBats: function(batGenKey) {
    this.bats.splice(batGenKey,1);
    if(this.bats.length<=0) this.defeated = true;
    for(var i=batGenKey; i<this.bats.length; i++){
      this.bats[i].batGenKey-=1;
    }
  },
  
  loadNewLevel: function(lvlBatEnemyMap,level) {
    //reseting vars
    this.bats = [];
    this.createBatTime = 0;
    this.createBatSide = getRandom(0,1);
    this.sendBatTime = 90 + (10 * getRandom(1,4));
    this.batIdx = 0;
    this.batIdy = 0;
    this.level = level;
    
    this.modeStart = false;
    this.readyToFight = false;
    this.defeated = false;
    this.modeMove = 'desc';
    
    //loading new map
    this.batEnemyMap = JSON.parse(JSON.stringify(lvlBatEnemyMap));
  }
});