// BatKid Enemy
var BatKidEnemy = Class.create(Sprite, {
  // The obstacle that the penguin must avoid
  initialize: function(x,y,xTarget,level,batkidGenKey,moveLimit) {
    // Call superclass constructor
    Sprite.apply(this,[24, 24]);
    this.image  = Game.instance.assets['res/batkidSheet.png'];
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.batkidGenKey = batkidGenKey;

    // 2 - Status
    this.level = level;
    this.position = xTarget;
    this.nextposX = xTarget;
    this.nextposY = y;
    this.direction = findAngle(x,y,this.nextposX,y);
    this.mode = 'start'; //start, idle, fly, hit
    this.moveSpeed = 4;    
    this.moveLeftLimit = moveLimit[0];
    this.moveRightLimit = moveLimit[1];
    this.xSpeed = 0;
    this.xAccel = 0.5;
    this.shootTime = 0;
    this.bullets = 0;
    this.horizontalDir = getRandom(1,2); //left/right
    
    // 3 - Animate
    this.animationDuration = 0;
    this.animationSpeed = 0.20;
    this.idleTime=0;
    this.frame = 4;
    this.iniFrame = 4;
    this.endFrame = 7;
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  gotHit: function() {
    this.parentNode.parentNode.batkidGenerator.rearrangeBatKids(this.batkidGenKey);
    //console.log(this.batkidGenKey+ ' out of ' +this.parentNode.parentNode.batkidGenerator.batkids.length);
    //if(this.parentNode.childNodes.length == 1) this.parentNode.parentNode.endLevel = true;
    this.parentNode.removeChild(this);
    delete this;
  },
  
  setTarget: function() {
    var game = Game.instance;
    this.moveSpeed = 6;
    this.direction = findAngle(this.x,this.y,this.parentNode.parentNode.rolf.x,this.parentNode.parentNode.rolf.y);
    this.mode = 'fly';
  },
  
  update: function(evt) {
    var game = Game.instance;
    //IMKORTANTE: É preciso que este objeto seja parte de um grupo filho da scene! Do contrário causará erro!
    this.nextposX = this.parentNode.parentNode.batkidGenerator.batkidEnemyMap[this.position][0];
    //this.nextposY = this.y;
    
    if (!this.parentNode.parentNode.paused){      
      if(this.mode == 'start'){
        this.direction = findAngle(this.x,this.y,this.nextposX,this.y);
        this.x += this.moveSpeed * Math.cos(this.direction);
        this.y += this.moveSpeed * Math.sin(this.direction);
        if(this.nextposX < this.originX){//to the left
          this.iniFrame = 2;
          this.endFrame = 3;
          if(this.nextposX >= this.x){
            this.mode = 'idle';
            this.y = this.nextposY;
            this.x = this.nextposX;
            this.frame = 4;
            this.iniFrame = 4;
            this.endFrame = 7;
          }
        } else {//to the right
          //this.scaleX = 1;
          this.iniFrame = 0;
          this.endFrame = 1;
          if(this.nextposX <= this.x){
            this.mode = 'idle';
            this.y = this.nextposY;
            this.x = this.nextposX;
            this.frame = 4;
            this.iniFrame = 4;
            this.endFrame = 7;
          }
        }
        /* 
        if(this.nextposX<0) {this.parentNode.parentNode.batkidGenerator.modeMove = 'asc'; }
        else if(this.nextposX>game.width-this.width) {this.parentNode.parentNode.batkidGenerator.modeMove = 'desc'; } */
      }
      if(this.mode == 'idle'){
        //this.y = this.nextposY;
        this.x = this.nextposX;
        if(this.x<this.moveLeftLimit) {this.parentNode.parentNode.batkidGenerator.modeMove = 'asc'; }
        else if(this.x>this.moveRightLimit) {this.parentNode.parentNode.batkidGenerator.modeMove = 'desc'; }
      }
      if(this.mode == 'fly'){
        //movement
        this.x += this.moveSpeed * Math.cos(this.direction);
        this.y += this.moveSpeed * Math.sin(this.direction);
        if(this.y >= 220){
          this.mode = 'shoot';
          this.shootTime = 10;
          this.bullets = 3;
          this.moveSpeed = 2;
          this.y = 220;
          //this.x = this.nextposX;
        }
      }
      if(this.mode == 'shoot'){
        //shoot at player
        this.shootTime-=1;
        if(this.bullets>0 && this.shootTime<=0){
          var s = new EnemyShot(this.x+9, this.y, this.parentNode.parentNode.rolf, this.level, 'batkid');
          this.parentNode.parentNode.evilShotGroup.addChild(s);
          this.bullets-=1;
          if(this.bullets<=0){
            this.direction = findAngle(this.x,this.y,this.nextposX,this.originY);
            this.mode = 'retreat';
            this.moveSpeed = 8;
          }else this.shootTime = 10;          
        }
      }
      if(this.mode == 'retreat'){
        this.direction = findAngle(this.x,this.y,this.nextposX,this.originY);
        this.x += this.moveSpeed * Math.cos(this.direction);
        this.y += this.moveSpeed * Math.sin(this.direction);
        if(this.nextposY >= this.y){
          this.mode = 'idle';
          this.y = this.nextposY;
          this.x = this.nextposX;
        }
      }
      
      /*START ANIMATION BLOCK*/
      this.animationDuration += 0.05;    
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
      /*END ANIMATION BLOCK*/
    }
  }
});

//BatKid Generator
var BatKidGenerator = Class.create(Sprite, {
  // The windows that will create the batkids
  initialize: function(x,y,lvlBatKidEnemyMap,lvlLim,level) {
    // Call superclass constructor
    Sprite.apply(this,[32, 32]);
    this.image  = Game.instance.assets['res/Ice.png'];      
    
    this.x = x;
    this.y = y;
    //this.genpoint = x + (this.width/2);
    this.batkids = [];
    this.createBatKidTime = 0;
    //this.createBatKidSide = getRandom(0,1); //0=on the same position; 1=on the other side;
    this.sendBatKidTime = 90 + (10 * getRandom(1,4));
    this.batkidIdx = 0;
    //this.batkidIdy = 0;
    this.level = level;
    
    //movement vars
    this.modeStart = false;
    this.readyToFight = false;
    this.defeated = false;
    this.modeMove = 'asc'; //asc ou desc
    this.moveLimit = lvlLim;
    
    this.batkidEnemyMap = JSON.parse(JSON.stringify(lvlBatKidEnemyMap));
    
    this.addEventListener(Event.ENTER_FRAME, this.update);
  },
  
  update: function(evt) { 
    var game = Game.instance;
    if (!this.parentNode.paused && this.modeStart){
      //console.log(this.parentNode.batkidGroup.childNodes.length);
      if (this.batkidIdx < 5){
        this.createBatKidTime -= 1;
        if (this.createBatKidTime <= 0) {
          //console.log("creating batkid");
          var batkid = new BatKidEnemy(this.x,this.y,this.batkidIdx,this.level,this.batkids.length,this.moveLimit);
          this.batkids.push(batkid);
          this.parentNode.batkidGroup.addChild(batkid);
          this.createBatKidTime = 8;
          this.createBatKidSide = getRandom(0,1);
          this.batkidIdx+=1;
          if(this.batkidIdx >= 5){
            this.readyToFight = true;
          }
          //console.dir(this.parentNode.batkidGroup);
        }
      }else{
        if(!this.parentNode.gotHit && this.parentNode.batGenerator.bats.length<=9){
          this.sendBatKidTime-=1;
          if(this.sendBatKidTime<=0 && this.batkids.length>0){
            var idbatkid = getRandom(1,this.batkids.length) - 1;
            if(this.batkids[idbatkid].mode == 'idle') {
              this.batkids[idbatkid].setTarget();
              this.sendBatKidTime = 90 + (10 * getRandom(1,4));
            }
          }
        }
      }
      
      for(var j=0; j<this.batkidEnemyMap.length; j++){
        //if(this.modeMove == 'asc') this.batkidEnemyMap[j][0]+=1;
        //else if(this.modeMove == 'desc') this.batkidEnemyMap[j][0]-=1;
      }
      
      // if(this.batkidEnemyMap[0][this.moveLeftLimit][0]<=0) this.modeMove = 'asc';
      // else if(this.batkidEnemyMap[0][this.moveRightLimit][0]>=game.width-24) this.modeMove = 'desc';
    }
  },
  
  rearrangeBatKids: function(batkidGenKey) {
    this.batkids.splice(batkidGenKey,1);
    if(this.batkids.length<=0) this.defeated = true;
    for(var i=batkidGenKey; i<this.batkids.length; i++){
      this.batkids[i].batkidGenKey-=1;
    }
  },
  
  changeBatKidEnemyMap: function(lvlBatKidEnemyMap) {
    this.batkidEnemyMap = JSON.parse(JSON.stringify(lvlBatKidEnemyMap));
  }
});