Crafty.init(600, 300);
Crafty.background('rgb(127,127,127)');

//roof（其实就是两个矩形。。）
Crafty.e("Paddle, 2D, DOM, Color, Multiway")
	.color('rgb(255,0,0)')
	.attr({ x: 20, y: 100, w: 10, h: 100 })
	.multiway(4, { W: -90, S: 90 });
Crafty.e("Paddle, 2D, DOM, Color, Multiway")
	.color('rgb(0,255,0)')
	.attr({ x: 580, y: 100, w: 10, h: 100 })
	.multiway(4, { UP_ARROW: -90, DOWN_ARROW: 90 });

//ball
Crafty.e("2D, DOM, Color, Collision")
	.color('rgb(0,0,255)')
	.attr({ x: 300, y: 150, w: 10, h: 10, 
			dX: Crafty.math.randomInt(2, 5), 
			dY: Crafty.math.randomInt(2, 5) })
	.bind('EnterFrame', function () {
		//hit floor or roof
		if (this.y <= 0 || this.y >= 290)
			this.dY *= -1;

		if (this.x > 600) {
			this.x = 300;
		}
		if (this.x < 10) {
			this.x = 300;
		}

		this.x += this.dX;
		this.y += this.dY;
	})
	.onHit('Paddle', function () {
	this.dX *= -1;
})