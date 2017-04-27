// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    // 为敌人的移动创建一个随机的速度
    this.speed = Math.random()*100*3;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;
    // 当敌人移动到画面之外时会立即回到出发位置
    if (this.x > 600) {
      	this.x = -100;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x,y) {
    this.x = x;
    this.y = y;
	  this.sprite = 'images/char-cat-girl.png';
};

// 玩家位置的更新函数
// 建立一个新变量，为玩家小人的复位增加一个延迟，避免小人还没到达对岸就立即复位
var count = 0;

Player.prototype.update = function(dt) {
	// 当玩家到达对岸时会弹出对话框并且将小人复位
	if (this.y === -12) {
      count++;
    if (count%3 === 2) {
        alert("恭喜你过关了！！ 点击进入下一盘游戏");
        this.x = 202;
        this.y = 320;
    }	
	}
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 玩家小人的操作函数，并使小人只在画布范围内移动
Player.prototype.handleInput = function(movement) {
	switch(movement) {
		  case 'left':
      if (this.x >= 101) {
          this.x -= 101;
          } break;
      case 'right':
      if (this.x <= 303) {
          this.x += 101;
      } break;
      case 'up':
      if (this.y >= 55) {
          this.y -= 83;
      } break;
      case 'down':
      if (this.y <= 321) {
          this.y += 83;
      } break;
	}
};

// 碰撞函数
Player.prototype.checkCollisions = function(){
    for(var i=0;i<allEnemies.length;i++){
        // 先判定玩家与敌人是否再同一行（这里因为我设置了当玩家与敌人在同一行时他们的y坐标是一致的）
        if(this.y === allEnemies[i].y){
            // 再判定玩家与敌人是否达到了碰撞范围，如果是，玩家小人复位
            if((Math.abs(this.x - allEnemies[i].x))<40){
                this.x =202;
                this.y =320;
            }
       }
    }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个	叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
// 生成三行分别两只敌人
for (var i=0;i<6;i++) {
    var bugs = new Enemy(-100,83*(i%3)+71);
	  allEnemies.push(bugs);
};

var player = new Player(202,320);


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
