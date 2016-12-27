var Game_ground = function ()
{
   this.linelist = new Game_LineList();
    this.trianglelist = new Game_TriangleList();
    this.x = 0;
    this.y = 0;
}
Game_ground.prototype.makeGround = function (width,height,number)
{
    // horitzontal (가로).***
    this.x = width;
    this.y = height;
    var min_x ;
    var max_x;
    var min_y;
    var max_y;
    min_x = -width / 2;
    max_x = width / 2;
    min_y = -height/2;
    max_y = height/2;
    var increY = height/number;
    var zAux = -0.001;

    for(var i = 0; i< number+1; i++) {

            var ground1 = this.linelist.newLine(min_x, min_y+ i*increY, zAux,     max_x, min_y+ i*increY, zAux);
            ground1.point1.color.setColor(0.5, 0.4, 0.5, 1.0);
            ground1.point2.color.setColor(0.5, 0.4, 0.5, 1.0);
    }

    // vertical (세로).***
    min_x = -width / 2;
    max_x =  width / 2;
    min_y = -height/2;
    max_y =  height/2;
    var increX = width / number;
    for(var i = 0; i< number+1; i++) {

            var ground1 = this.linelist.newLine(min_x + i * increX, min_y, zAux,      min_x+ i * increX, max_y, zAux);
            ground1.point1.color.setColor(0.5, 0.4, 0.5, 1.0);
            ground1.point2.color.setColor(0.5, 0.4, 0.5, 1.0);

    }

 }
Game_ground.prototype.draw = function (gl, shaderProgram)
{
    gl.disableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    this.linelist.draw(gl, shaderProgram);
}
