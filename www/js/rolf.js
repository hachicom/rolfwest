// Penguin
var Rolf = Class.create(Sprite, {
  // The player character.     
  initialize: function(x,y) {
      // 1 - Call superclass constructor
      Sprite.apply(this,[24, 24]);
      this.image = Game.instance.assets['res/rolfSheet.png'];
      //this.lane = 1;
      this.positions = [0,296];
      this.nextpos = x;
      this.movespeed = 20;
      this.x = x;
      this.y = y;
      this.movable = true;
      this.moving = 0; //-1: esquerda, 0: parado, 1: direita
      //this.tl.setTimeBased();
      
      // 2 - Player Status
      this.bullets = 6;
      this.health = 3;
      this.reload = false;
      this.reloadTime = 0;
    
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
            this.reloadTime = 15;
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
      /*END ANIMATION BLOCK*/
      
      /*START MOVEMENT BLOCK*/
      if(this.parentNode.gotHit!=true && this.movable==false){
        if(this.x<this.nextpos) {
          this.x+=this.movespeed;
          if(this.x>=this.nextpos) this.x=this.nextpos;
        }else if(this.x>this.nextpos){
          this.x-=this.movespeed;
          if(this.x<=this.nextpos) this.x=this.nextpos;
        }
      }
      if(this.moving == -1 && this.shootTime<=0) {
        this.x-=5;
        if (this.x<0) this.x=0;
      }
      else if(this.moving == 1 && this.shootTime<=0) {
        this.x+=5;
        if (this.x>game.width-this.width) this.x=game.width-this.width;
      }      
      /*END MOVEMENT BLOCK*/      
    }
  },
  
  move: function(direction){
    if(this.moving==0){
      this.frame = 0 + this.health;
      this.animationDuration = 0;
      this.iniFrame = 0 + this.health;
      this.endFrame = 1 + this.health;
    }
    this.moving = direction;
    this.scaleX = direction;
  },
  
  shoot: function(){
    if(this.bullets>0){
      this.shootTime = 5;
      this.animationDuration = 0;
      shotGroup = this.parentNode.shotGroup;
      //this.reload = false;
      var s = new PlayerShot(this.x+9, this.y);
      this.parentNode.shotGroup.addChild(s);
      this.bullets-=1;
      this.reloadTime = 30;
      /* if(this.bullets<=0) {
        this.reload = true;
      } */
    }
  },
  
  stopMove: function(){
    this.moving = 0;
    this.frame = 2 + this.health;
    this.iniFrame = 2 + this.health;
    this.endFrame = 2 + this.health;
    this.animationDuration = 0;
  },
  
  resetPosition: function(){
    //this.tl.clear();
    this.lane=1;
    this.x = this.positions[1];
    this.nextpos = this.positions[1];
    this.frame = 0 + this.health;
    this.iniFrame = 0 + this.health;
    this.endFrame = 1 + this.health;
    this.animationDuration = 0;
    this.animationSpeed = 0.25;
    this.movespeed = 20;
  },
  
  gotHit: function(lane){     
    //this.tl.clear();
    this.frame = 2;
    this.iniFrame = 2;
    this.endFrame = 3;
    this.animationDuration = 0;
    this.animationSpeed = 0.1;
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
    return (this.x==this.nextpos);
    //return true;
  }
});