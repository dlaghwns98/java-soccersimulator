/**
 * Created by hojun Lim on 2016-11-03.
 */
var Game_cube = function ()
{
    this.superobj = new Game_SuperObj();
    this.matrix4 = mat4.create();
    this.direction = Game_Point;
    mat4.identity(this.matrix4);
    this.position = new Game_Point();
    this.rgba = new Game_Color();
    this.transColor = false;
}
Game_cube.prototype.makeCube = function ()
{
    var length_x = 20000;
    var length_y = 20000;
    var length_z = 20000;

    var cube0 = this.superobj.newPointlist();
    cube0.makeCube1(0.0,0.0,0.0);
    var cube = this.superobj.newPointlist();
    cube.makeCube1(length_x,length_y,0.0);
    var cube2 = this.superobj.newPointlist();
    cube2.makeCube1(length_x,length_y,length_z);
    var cube1 = this.superobj.newPointlist();
    cube1.makeCube1(0.0,0.0,length_z);
    /*
     var cube0 = this.superobj.newPointlist();
     cube0.makeCube1(0.0,0.0,0.0);
     var cube = this.superobj.newPointlist();
     cube.makeCube1(1.0,1.0,0.0);
     var cube2 = this.superobj.newPointlist();
     cube2.makeCube1(1.0,1.0,1.0);
     var cube1 = this.superobj.newPointlist();
     cube1.makeCube1(0.0,0.0,1.0);
     */
    this.superobj.makeObj();
    this.setColor(1.0,0.0,1.0,1.0)
}
Game_cube.prototype.setColor = function (r,g,b,a)
{
        this.superobj.setColor(r,g,b,a);
}
Game_cube.prototype.getTransformMatrix = function ()
{
    var TransforMatrix = mat4.create();
    var translateMatrix = mat4.create();
    var rotMatrix = mat4.create();

    mat4.identity(TransforMatrix);
    mat4.identity(translateMatrix);

    mat4.translate(translateMatrix, [this.position.x,this.position.y, this.position.z]);

    mat4.multiply(TransforMatrix, translateMatrix);
    return TransforMatrix;
}
Game_cube.prototype.draw = function (gl, shaderProgam, currentMatrix)
{
    var transforMatrix = this.getTransformMatrix();
    var cubeMatrix = mat4.create();

    mat4.identity(cubeMatrix);
    mat4.multiply(cubeMatrix, currentMatrix);
    mat4.multiply(cubeMatrix, transforMatrix);

    gl.uniformMatrix4fv(shaderProgam.mvMatrixUniform, false, cubeMatrix);
    this.superobj.draw(gl, shaderProgam, cubeMatrix);
}
