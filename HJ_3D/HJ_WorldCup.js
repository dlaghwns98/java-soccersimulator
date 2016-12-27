/**
 * Created by hojun Lim on 2016-12-05.
 */
var HJ_WorldCup_under = function ()
{
    this.superobj = new Game_SuperObj();
    this.superobj2 = new Game_SuperObj();
    this.superobj3 = new Game_SuperObj();

    this.linelist = new Game_LineList();
    this.linelist2 = new Game_LineList();
    this.linelist3 = new Game_LineList();


}
HJ_WorldCup_under.prototype.makeWorldCup = function ()
{
    var size = 100;
    var pointlist_body1 = this.superobj.newPointlist();
    pointlist_body1.makeCircle(0,0,30);
    var pointlist_body2 = this.superobj.newPointlist();
    pointlist_body2.makeCircle(600*size,0,30);
    var pointlist_body3 = this.superobj.newPointlist();
    pointlist_body3.makeCircle(600*size,200*size,30);
    var pointlist_body4 = this.superobj.newPointlist();
    pointlist_body4.makeCircle(0,200*size,30);
    this.superobj.makeObj();
    this.superobj.setColor(1.0,1.0,1.0,1.0);

    var groundline = this.linelist;
    groundline.makeGroundLine(1200,1300,200,1200,1300,200);
    var groundline_2 = this.linelist2;
    groundline_2.makeGround_minLine(500,300,200,500,300,200);
    var groundline_3 = this.linelist3;
    groundline_3.makeGround_minLine(500,300,200,500,300,200);

    var pointlist_ground4 = this.superobj2.newPointlist();
    pointlist_ground4.makeCube1(0,0,10*size);
    var pointlist_ground3 = this.superobj2.newPointlist();
    pointlist_ground3.makeCube1(130*size,150*size,10*size);
    var pointlist_ground2 = this.superobj2.newPointlist();
    pointlist_ground2.makeCube1(130*size,150*size,0);
    var pointlist_ground1 = this.superobj2.newPointlist();
    pointlist_ground1.makeCube1(0,0,0);
    this.superobj2.makeObj();
    this.superobj2.setColor(0.0,0.8,0.0,1.0);




}
HJ_WorldCup_under.prototype.getTransforMat4 = function ()
{
    var trans = 100;
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.translate(translatMat4, [0,0,11*trans]);
    mat4.multiply(transforMat4, translatMat4);
    return transforMat4;

}
HJ_WorldCup_under.prototype.getlineTransforMat4 = function ()
{
    var trans = 100;
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.translate(translatMat4, [0,-1000,0]);
    mat4.multiply(transforMat4, translatMat4);
    return transforMat4;

}
HJ_WorldCup_under.prototype.getline2TransforMat4 = function ()
{
    var trans = 100;
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.translate(translatMat4, [0,1000,0]);
    mat4.multiply(transforMat4, translatMat4);
    return transforMat4;

}

HJ_WorldCup_under.prototype.draw = function (gl,shaderProgram,currenMatrix)
{
  //  this.superobj.draw(gl,shaderProgram,currenMatrix);


    var groundMat4 = mat4.create();
    var transforMat4 = this.getTransforMat4();
    mat4.identity(groundMat4);
    mat4.multiply(groundMat4,currenMatrix);
    mat4.multiply(groundMat4,transforMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, groundMat4);
    this.superobj2.draw(gl,shaderProgram);
    gl.disableVertexAttribArray(shaderProgram.vertexNormalAttribute);
   // this.linelist.draw(gl,shaderProgram);

    var groundlineMat4 = mat4.create();
    var transforlineMat4 = this.getlineTransforMat4();
    mat4.identity(groundlineMat4);
    mat4.multiply(groundlineMat4,groundMat4);
    mat4.multiply(groundlineMat4,transforlineMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, groundlineMat4);
  //  this.linelist2.draw(gl,shaderProgram);

    var groundline2Mat4 = mat4.create();
    var transforlineMat4 = this.getline2TransforMat4();
    mat4.identity(groundline2Mat4);
    mat4.multiply(groundline2Mat4,groundMat4);
    mat4.multiply(groundline2Mat4,transforlineMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, groundline2Mat4);
   // this.linelist3.draw(gl,shaderProgram);


}


var HJ_WorldCup_cheer = function ()
{
    this.superobj = new Game_SuperObj();
    this.position =0;
}
HJ_WorldCup_cheer.prototype.makeCheer = function ()
{
    var cheer1  = this.superobj.newPointlist();
    cheer1.makeCheer(0,0,0);
    var cheer2  = this.superobj.newPointlist();
    cheer2.makeCheer(100,100,0);
    var cheer3  = this.superobj.newPointlist();
    cheer3.makeCheer(100,100,100);
    var cheer4  = this.superobj.newPointlist();
    cheer4.makeCheer(0,0,100);
    this.superobj.makeObj();
    this.superobj.setColor(0.3,0.3,0.3,1.0)

}
HJ_WorldCup_cheer.prototype.getCheerTransforMat4 = function ()
{
    var trans = 1;
    var transforMat4 = mat4.create();
    var rotateMat4 = mat4.create();
    var translatMat4 = mat4.create();
    mat4.identity(transforMat4);
    mat4.identity(rotateMat4);
    mat4.identity(translatMat4);
    mat4.translate(transforMat4,[2200,-2000+this.position,500]);
    mat4.rotate(rotateMat4,90 * Math.PI/180 , [1,0,0]);
    mat4.rotate(rotateMat4,90 * Math.PI/180 , [0,0,1]);
    mat4.multiply(transforMat4, rotateMat4);
    return transforMat4;

}
HJ_WorldCup_cheer.prototype.draw = function (gl,shaderProgram,currentMatrix)
{
        var cheerMat4 = mat4.create();
        var transforlineMat4 = this.getCheerTransforMat4();
        mat4.identity(cheerMat4);
        mat4.multiply(cheerMat4,currentMatrix);
        mat4.multiply(cheerMat4,transforlineMat4);
        gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, cheerMat4);
        this.superobj.draw(gl,shaderProgram,cheerMat4);

}
/*
 var HJ_WorldCup_cheerArray = function ()
 {
 this.cheerArray = [];
 this.position = 0;
 }
 HJ_WorldCup_cheerArray.prototype.newCheer = function (count)
 {
 for(var i = 0;i<count;i++)
 {
 var cheer = new HJ_WorldCup_cheer();
 cheer.makeCheer();
 this.cheerArray.push(cheer);
 }
 return cheer;
 }
 HJ_WorldCup_cheerArray.prototype.gettransforMatrix = function ()
 {
 var transforMat4 = mat4.create();
 var translatMat4 = mat4.create();
 mat4.identity(transforMat4);
 mat4.identity(translatMat4);
 mat4.translate(translatMat4, [0,10,1100]);
 mat4.multiply(transforMat4, translatMat4);

 return transforMat4;

 }

 HJ_WorldCup_cheerArray.prototype.draw = function (gl,shaderProgram, currentMatrix)
 {
 var count = this.cheerArray.length;

 for(var i = 0; i< count; i++)
 {
 this.position += 1;
 var cheer = this.cheerArray[i];
 var cheerMatrix = mat4.create();
 mat4.identity(cheerMatrix);
 var transforMatirx = this.gettransforMatrix();
 mat4.multiply(cheerMatrix,currentMatrix);
 mat4.multiply(cheerMatrix,transforMatirx);
 gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, cheerMatrix);
 cheer.draw(gl,shaderProgram,cheerMatrix);
 }

 }
 */
/*

 var HJ_WorldCup_CheerArray = function ()
 {
 this.cheerArray = [];
 this.cheer = new HJ_WorldCup_cheer();
 this.position = 0;
 }
 HJ_WorldCup_CheerArray.prototype.makeCheer = function ()
 {
 for(var i = 0; i < 15;i++)
 {
 var cheer = this.cheer;
 cheer.makeCheer();
 this.cheerArray.push(cheer);
 }
 }
 HJ_WorldCup_CheerArray.prototype.gettransforMatrix = function (increY)
 {
 var transforMat4 = mat4.create();
 var translatMat4 = mat4.create();
 this.position += 1;
 mat4.identity(transforMat4);
 mat4.identity(translatMat4);
 mat4.translate(translatMat4,[0, increY ,2000]);
 mat4.multiply(transforMat4,translatMat4);
 return transforMat4;
 }

 HJ_WorldCup_CheerArray.prototype.draw = function (gl,shaderProgram,currentMatrix)
 {
 var count = this.cheerArray.length;

 for(var i = 0; i < count; i++)
 {
 var cheerMat4 = mat4.create();
 mat4.identity(cheerMat4);
 var transforMat4 = this.gettransforMatrix(1000*i);
 mat4.multiply(cheerMat4, currentMatrix);
 mat4.multiply(cheerMat4, transforMat4);
 gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, cheerMat4);
 //this.cheerArray[i].draw(gl,shaderProgram,cheerMat4);
 this.cheer.draw(gl,shaderProgram,cheerMat4);
 }
 }
 */
 var HJ_WorldCup_body = function ()
 {
 this.superObj = new Game_SuperObj();
 }
 HJ_WorldCup_body.prototype.gettransforMatrix = function ()
 {
 var transforMat4 = mat4.create();
 var translatMat4 = mat4.create();
 mat4.identity(transforMat4);
 mat4.identity(translatMat4);
 mat4.translate(translatMat4, [0,0,900]);
 mat4.multiply(transforMat4, translatMat4);
 return transforMat4;
 }
 HJ_WorldCup_body.prototype.makeWorldCup = function ()
 {
 var pointlist3 = this.superObj.newPointlist();
 pointlist3.makeWorldCup_body(1000,1000,0);
 var pointlist3 = this.superObj.newPointlist();
 pointlist3.makeWorldCup_body(6000,6000,3000);
 var pointlist3 = this.superObj.newPointlist();
 pointlist3.makeWorldCup_body(7000,7000,3000);
 var pointlist2 = this.superObj.newPointlist();
 pointlist2.makeWorldCup_body(2000,2000,0);
 var pointlist1 = this.superObj.newPointlist();
 pointlist1.makeWorldCup_body(0,0,0);


 this.superObj.makeObj();
 this.superObj.setColor(0.8,0.8,0.8,1.0);
 }
 HJ_WorldCup_body.prototype.draw = function (gl,shaderProgram,currentMatrix)
 {
 var transforMat4 = this.gettransforMatrix();
 var WorldcupMat4 = mat4.create();
 mat4.identity(WorldcupMat4);
 mat4.multiply(WorldcupMat4, currentMatrix);
 mat4.multiply(WorldcupMat4, transforMat4);
 gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, WorldcupMat4);
 this.superObj.draw(gl,shaderProgram)
 }
