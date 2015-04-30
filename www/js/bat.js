var EnemyMap = [
        [[40,160],[68,160],[96,160],[124,160],[152,160],[180,160],[208,160],[236,160],[264,160]],
        [[40,184],[68,184],[96,184],[124,184],[152,184],[180,184],[208,184],[236,184],[264,184]],
        ];

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
    this.nextposX = EnemyMap[this.position[0]][this.position[1]][0];
    this.nextposY = EnemyMap[this.position[0]][this.position[1]][1];
    this.direction = findAngle(x,y,this.nextposX,this.nextposY);
    this.mode = 'start'; //start, idle, fly, hit
    this.moveSpeed = 10;
    this.xSpeed = 0;
    this.xAccel = 0.5;
    this.shootTime = 0;
    this.bullets = 0;
    
    // 3 - Animate
    this.frame = 0;
    this.iniFrame = 0;
    this.endFrame = 3;
    this.animationDuration = 0;
    this.animationSpeed = 0.20;
    this.idleTime=0;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  gotHit: function() {
    this.parentNode.parentNode.batGenerator.rearrangeBats(this.batGenKey);
    //console.log(this.batGenKey+ ' out of ' +this.parentNode.parentNode.batGenerator.bats.length);
    if(this.parentNode.childNodes.length == 1) this.parentNode.parentNode.endLevel = true;
    this.parentNode.removeChild(this);
    delete this;
  },
  
  setTarget: function() {
    console.log(this.batGenKey+ ' mode:' +this.mode);
    this.direction = findAngle(this.x,this.y,this.parentNode.parentNode.rolf.x,this.parentNode.parentNode.rolf.y);
    this.mode = 'fly';
  },
  
  update: function(evt) {
    var game = Game.instance;
    //IMKORTANTE: � preciso que este objeto seja parte de um grupo filho da scene! Do contr�rio causar� erro!
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
          this.xSpeed += this.xAccel;
          if(this.xSpeed>=7)this.xSpeed=7;
        } else {
          this.xSpeed -= this.xAccel;
          if(this.xSpeed<=-7)this.xSpeed=-7;
        }
        this.x += this.xSpeed;
        this.y += this.moveSpeed;
        if(this.y>=this.parentNode.parentNode.rolf.y+24){
          //this.y = -this.height;
          this.direction = findAngle(this.x,this.y,this.nextposX,this.nextposY);
          this.mode = 'start';
          this.moveSpeed = 5;
        }
        
        //shoot at player
        this.shootTime-=1;
        if(this.bullets>0 && this.shootTime<=0){
          var s = new EnemyShot(this.x+9, this.y, this.parentNode.parentNode.rolf, this.level);
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.bullets-=1;
          this.shootTime = 5 + getRandom(0,5);          
        }
        
        //keep control of position on troop
        if(this.nextposX<0) {this.parentNode.parentNode.batGenerator.modeMove = 'asc'; }
        else if(this.nextposX>game.width-this.width) {this.parentNode.parentNode.batGenerator.modeMove = 'desc'; }
        /* TODO: fazer o morcego voar na dire��o do jogador */
      }
      
    }
  }
});

//Bat Generator
var BatGenerator = Class.create(Sprite, {
  // The windows that will create the bats
  initialize: function(x,y) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    //this.image  = Game.instance.assets['res/Ice.png'];      
    
    this.x = x;
    this.y = y;
    this.genpoint = x + (this.width/2);
    this.xTargets = [72,96,120];
    this.bats = [];
    this.createBatTime = 0;
    this.createBatSide = getRandom(0,1); //0=on the same position; 1=on the other side;
    this.sendBatTime = 90 + (10 * getRandom(1,4));
    this.batIdx = 0;
    this.batIdy = 0;
    
    //movement vars
    this.modeStart = false;
    this.readyToFight = false;
    this.defeated = false;
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
            var bat = new BatEnemy(this.genpoint+this.createBatSide*128,this.y,this.batIdx,this.batIdy,1,this.bats.length);
            this.bats.push(bat);
            this.parentNode.batGroup.addChild(bat);
            this.createBatTime = 8;
            this.createBatSide = getRandom(0,1);
            this.batIdx+=1;
            if(this.batIdx >= 9){
              this.batIdy+=1;
              this.batIdx=0;
              if(this.batIdy>=2) this.readyToFight = true;
            }
            //console.dir(this.parentNode.batGroup);
          }
        }
      }else{
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
      
      for(var i=0; i<2; i++){
        for(var j=0; j<9; j++){
          if(this.modeMove == 'asc') EnemyMap[i][j][0]+=1;
          else if(this.modeMove == 'desc') EnemyMap[i][j][0]-=1;
        }
      }
      
      // if(EnemyMap[0][this.moveLeftLimit][0]<=0) this.modeMove = 'asc';
      // else if(EnemyMap[0][this.moveRightLimit][0]>=game.width-24) this.modeMove = 'desc';
    }
  },
  
  rearrangeBats: function(batGenKey) {
    this.bats.splice(batGenKey,1);
    if(this.bats.length<=0) this.defeated = true;
    for(var i=batGenKey; i<this.bats.length; i++){
      this.bats[i].batGenKey-=1;
    }
  }
});