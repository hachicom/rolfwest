// Penguin
var Rolf = Class.create(Sprite, {
  // The player character.     
  initialize: function(x,y) {
      // 1 - Call superclass constructor
      Sprite.apply(this,[24, 24]);
      this.image = Game.instance.assets['res/rolfSheet.png'];
      this.movespeed = 10;
      this.x = x;
      this.y = y;
      this.nextpos = x;
      this.movable = true;
      this.moving = 0; //-1: esquerda, 0: parado, 1: direita
      //this.tl.setTimeBased();
      
      // 2 - Player Status
      this.bullets = 6;
      this.healthStartFrame = 3;
      this.health = this.healthStartFrame;
      this.reload = false;
      this.reloadTime = 0;
      this.vulnerableTime = 60;
      this.alive = true;
      this.winPose = false;
    
      // 3 - Animate
      this.frame = 2 + this.health;
      this.iniFrame = 2 + this.health;
      this.endFrame = 2 + this.health;
      this.animationDuration = 0;
      this.animationSpeed = 0.25;
      this.shootTime=0;
      this.addEventListener(Event.ENTER_FRAME, this.updateAnimation);
  },
  
  updateAnimation: function (evt) {
    game = Game.instance;  
    if (!this.parentNode.paused){
      /*START RELOAD BULLETS BLOCK*/
      if(this.reloadTime>0) {
        this.reloadTime-=1;
        if(this.reloadTime<=0){
          this.bullets+=1;
          if(this.bullets>=6){
            this.reload = false;
          }
          else{
            this.reloadTime = 10;
          }
        }
      }
      /*END RELOAD BLOCK*/
      
      /*START ANIMATION BLOCK*/
      this.animationDuration += 0.05;    
      if(this.shootTime>0) {
        this.frame = 2 + this.health;
        this.iniFrame = 2 + this.health;
        this.endFrame = 2 + this.health;
        this.shootTime-=1;
        if(this.shootTime==0) {
          this.animationDuration = 0;
          if(this.moving!=0){
            this.frame = 0 + this.health;
            this.iniFrame = 0 + this.health;
            this.endFrame = 1 + this.health;
          }
        }
      }      
      if (this.animationDuration >= this.animationSpeed) {
        if(this.frame<this.endFrame) this.frame ++;
        else this.frame = this.iniFrame;
        this.animationDuration -= this.animationSpeed;
      }
      if(this.vulnerableTime > 0 && this.alive==true){
        this.vulnerableTime-=1;
        if(this.vulnerableTime%2==0){
          this.visible=false;
        }else this.visible=true;
        if(this.vulnerableTime<=0) this.visible=true;
      }
      /*END ANIMATION BLOCK*/
      
      /*START MOVEMENT BLOCK*/
      if(this.alive==true && this.winPose==false && this.shootTime<=0){
        if(this.x<this.nextpos) {
          this.x+=this.movespeed;
          if(this.x>=this.nextpos) {
            this.x=this.nextpos;
            //this.stopMove();
          }
        }else if(this.x>this.nextpos){
          this.x-=this.movespeed;
          if(this.x<=this.nextpos) {
            this.x=this.nextpos;
            //this.stopMove();
          }
        }
      }
      /* if(this.alive==true && this.winPose==false){
        if(this.moving == -1 && this.shootTime<=0) {
          this.x-=5;
          if (this.x<0) this.x=0;
        }
        else if(this.moving == 1 && this.shootTime<=0) {
          this.x+=5;
          if (this.x>game.width-this.width) this.x=game.width-this.width;
        }
      } */
      /*END MOVEMENT BLOCK*/
      //console.log(this.vulnerableTime+' '+this.alive+' '+this.health);
    }
  },
  
  move: function(direction){
    if(this.alive==true && this.winPose==false){
      if(this.moving==0){
        this.frame = 0 + this.health;
        this.animationDuration = 0;
        this.iniFrame = 0 + this.health;
        this.endFrame = 1 + this.health;
      }
      this.scaleX = direction;
    }
    this.moving = direction;
  },
  
  moveTouch: function(evt){
    if(this.alive==true && this.winPose==false){
      if(this.moving==0){
        this.frame = 0 + this.health;
        this.animationDuration = 0;
        this.iniFrame = 0 + this.health;
        this.endFrame = 1 + this.health;
      }
      this.nextpos = evt.localX;
      if (this.nextpos < this.x)//finger touched left side of hero
        this.moving = -1;
      else //finger touched right side of hero
        this.moving = 1;
      this.scaleX = this.moving;
    }
    //this.moving = direction;
  },
  
  shoot: function(){
    if(this.bullets>0 && this.alive==true && this.winPose==false){
      this.shootTime = 5;
      this.animationDuration = 0;
      shotGroup = this.parentNode.shotGroup;
      //this.reload = false;
      var s = new PlayerShot(this.x+9, this.y);
      this.parentNode.shotGroup.addChild(s);
      this.bullets-=1;
      this.reloadTime = 20;
      /* if(this.bullets<=0) {
        this.reload = true;
      } */
    }
  },
  
  stopMove: function(){
    this.moving = 0;
    this.nextpos = this.x;
    if(this.alive==true && this.winPose==false){
      this.frame = 2 + this.health;
      this.iniFrame = 2 + this.health;
      this.endFrame = 2 + this.health;
      this.animationDuration = 0;
    }
  },
  
  wonStage: function(){
    this.frame = 7;
    this.iniFrame = 7;
    this.endFrame = 7;
    this.animationDuration = 0;
    this.winPose = true;
  },
  
  resetPosition: function(){
    this.health=this.healthStartFrame;
    this.alive = true;
    this.winPose = false;
    this.vulnerableTime = 60;
    this.bullets = 6;
    this.x = 145;
    this.nextpos = this.x;
    //this.lane=1;
    if(this.moving == 0){
      this.frame = 2 + this.health;
      this.iniFrame = 2 + this.health;
      this.endFrame = 2 + this.health;    
    } else {      
      this.frame = 0 + this.health;
      this.iniFrame = 0 + this.health;
      this.endFrame = 1 + this.health;
    }
    this.animationDuration = 0;
    this.animationSpeed = 0.25;
    this.movespeed = 20;
  },
  
  gotHit: function(){
    this.health-=this.healthStartFrame;    
    if(this.health<0) {
      this.alive = false;
      this.frame = 6;
      this.iniFrame = 6;
      this.endFrame = 6;
    }else{
      if(this.moving == 0){
        this.frame = 2 + this.health;
        this.iniFrame = 2 + this.health;
        this.endFrame = 2 + this.health;    
      } else {      
        this.frame = 0 + this.health;
        this.iniFrame = 0 + this.health;
        this.endFrame = 1 + this.health;
      }
      this.animationDuration = 0;
      this.vulnerableTime = 90;
    }
    //console.log(this.x+' - '+this.lane+' '+lane);
  },
  
  shopping: function(){     
    if(this.lane==2){
      //this.tl.moveTo(252, this.y, 200, enchant.Easing.QUAD_EASEINOUT).then(function(){
        // this.frame = 4;
        // this.iniFrame = 4;
        // this.endFrame = 4;
      //});
      this.nextpos = 252;
      this.movespeed = 5;
    }
  },
  
  isVulnerable: function(){
    return (this.vulnerableTime<=0);
    //return true;
  }
});