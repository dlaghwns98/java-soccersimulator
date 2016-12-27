var HJ_ChristmasTree = function(){
    this.tree = new HJ_3Dobj_Revolution();
    this.treebody = new HJ_3Dobj_Revolution();
    this.ball = new HJ_3Dobj_Revolution();

}
HJ_ChristmasTree.prototype.makeChrismasTree = function()
{
    var point1 = new Game_Point();
    point1.set(0,0,8000);
    this.tree.polygon.pointArray.push(point1);
    point1 = new Game_Point();
    point1.set(3000,0,2000);
    this.tree.polygon.pointArray.push(point1);
    point1 = new Game_Point();
    point1.set(1000,0,2000);
    this.tree.polygon.pointArray.push(point1);

    this.tree.make3D_Revolution(0,0,1);
    point1 = new Game_Point();
    point1.set(1000,0,2000);
    this.treebody.polygon.pointArray.push(point1);
    point1 = new Game_Point();
    point1.set(1000,0,500);
    this.treebody.polygon.pointArray.push(point1);
    point1 = new Game_Point();
    point1.set(2000,0,500);
    this.treebody.polygon.pointArray.push(point1);
    point1 = new Game_Point();
    point1.set(2000,0,0);
    this.treebody.polygon.pointArray.push(point1);
    point1 = new Game_Point();
    point1.set(0,0,0);
    this.treebody.polygon.pointArray.push(point1);
    this.treebody.make3D_Revolution(0,0,1);
    var count = 36;
    var incRad = (180/count)*Math.PI/180;
    var angle = 0;
    for(var i = 0 ; i < count; i++)
    {
        var point = new Game_Point();
        point.set(1000*Math.sin(angle),0,1000*Math.cos(angle));
        angle += incRad;
        this.ball.polygon.pointArray[i] = point;
    }
    this.ball.make3D_Revolution(0,0,1);
}
HJ_ChristmasTree.prototype.draw = function(gl,shaderProgram)
{
    var identyMat4 = mat4.create();
    mat4.identity(identyMat4);
    this.tree.draw(gl,shaderProgram,0,255,0,255, identyMat4);
    this.treebody.draw(gl,shaderProgram,128,64,64,255, identyMat4);

    //var transforMat4 = this.getTransforMat4();
    var ballMat4 = mat4.create();
    mat4.identity(ballMat4);
    var AuxMat4 = mat4.create();
    mat4.identity(AuxMat4);
    mat4.translate(ballMat4, [3000,0,2000], AuxMat4);
    //mat4.multiply(ballMat4, this.ball.transforMat4);
    //mat4.multiply(ballMat4, transforMat4);
    this.ball.draw(gl,shaderProgram,255,0,0,255, AuxMat4);

}/**
 * Created by hojun Lim on 2016-12-19.
 */
