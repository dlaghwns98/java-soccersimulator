/**
 * Created by hojun Lim on 2016-11-29.
 */

var HJ_Dron_leg_right = function ()
{
    this.superobj = new Game_SuperObj();
}
HJ_Dron_leg_right.prototype.makeDronleg_right = function ()
{
    var pointlist_leg = this.superobj.newPointlist();
    pointlist_leg.makeDronlegright(0.0,0.0,0.7);
    var pointlist_leg2 = this.superobj.newPointlist();
    pointlist_leg2.makeDronlegright(0.7,0.7,0.7);


    this.superobj.makeObj();
    this.superobj.setColor(1.0,1.0,1.0,1.0);

}
HJ_Dron_leg_right.prototype.getTransforMatrix = function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();

    mat4.identity(transforMat4);
    mat4.identity(translatMat4);

    mat4.translate(translatMat4, [1200,0,0]);
    mat4.multiply(transforMat4, translatMat4);
    return transforMat4
}
HJ_Dron_leg_right.prototype.draw = function (gl,shaderProgram,currentMatrx)
{
    var dronlegMatrix = mat4.create();
    mat4.identity(dronlegMatrix);
    var transforMat4 = this.getTransforMatrix();
    mat4.multiply(dronlegMatrix, currentMatrx);
    mat4.multiply(dronlegMatrix, transforMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, dronlegMatrix);
    this.superobj.draw(gl,shaderProgram,dronlegMatrix);
}
var HJ_Dron_Camera = function ()
{
    this.superObj = new Game_SuperObj();
  //  this.cameraline = new Dron_camera_normal();


}
HJ_Dron_Camera.prototype.makeCamera = function ()
{
    var sx = 1;
    var camera_body4 = this.superObj.newPointlist();
    camera_body4.makeCube1(0,0,2000*sx);
    var camera_body3 = this.superObj.newPointlist();
    camera_body3.makeCube1(500*sx,1000*sx,2000*sx);
    var camera_body2 = this.superObj.newPointlist();
    camera_body2.makeCube1(500*sx,1000*sx,0);
    var camera_body1 = this.superObj.newPointlist();
    camera_body1.makeCube1(0,0,0);
    this.superObj.makeObj();
    this.superObj.setColor(0.2,0.2,0.2,1.0);
    var n =30;
    var radian = (Math.PI)/n;
    var angle = 0;
    var cpx,cpy,cpz;
    cpx = 0;
    cpy = 0;

  //  this.cameraline.makeCamera_nomal();
}
HJ_Dron_Camera.prototype.getTransforMat4 = function ()
{
    var sx = 0.1
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);

    mat4.translate(translatMat4, [0,0,-1500 * sx]);
    mat4.multiply(transforMat4, translatMat4);
    return transforMat4;

}
HJ_Dron_Camera.prototype.getRotateMatrix = function ()
{
    var sx = 0.1
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);

    mat4.translate(translatMat4, [0,0,-1500 * sx]);
    mat4.multiply(transforMat4, translatMat4);
    return transforMat4;

}
HJ_Dron_Camera.prototype.draw = function (gl,shaderProgram,currentMatrx)
{

    var CameraMat4 = mat4.create();
    mat4.identity(CameraMat4);
    var transforMat4 = this.getTransforMat4();
    mat4.multiply(CameraMat4, currentMatrx);
    mat4.multiply(CameraMat4, transforMat4);

    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, CameraMat4);
    //this.superObj2.draw(gl,shaderProgram,CameraMat4);

    this.superObj.draw(gl,shaderProgram,CameraMat4);
  //  this.cameraline.draw(gl,shaderProgram,CameraMat4);
}
var HJ_DronBody = function ()
{
    this.superobj = new Game_SuperObj();

}

HJ_DronBody.prototype.makeDronBody = function ()
{
    var x = 3000;
    var z = 3000;

    var pointlist_0 = this.superobj.newPointlist();
    pointlist_0.makeCircle(0,0.0,30);
    var pointlist_1 = this.superobj.newPointlist();
    pointlist_1.makeCircle(x,0.0,30);
    var pointlist_2 = this.superobj.newPointlist();
    pointlist_2.makeCircle(x,z,30);
    var pointlist_3 = this.superobj.newPointlist();
    pointlist_3.makeCircle(0.0,z,30);
    this.superobj.makeObj();
    this.superobj.setColor(1.0,1.0,1.0,1.0);
}

HJ_DronBody.prototype.draw = function (gl, shaderProgram, currentMatrix)
{

    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, currentMatrix);
    this.superobj.draw(gl, shaderProgram, currentMatrix);
}
var HJ_stick_1 = function ()
{
    this.superobj = new Game_SuperObj();
    this.superobj2 = new Game_SuperObj();
    this.superobj3 = new Game_SuperObj();
    this.rotation = new Game_Point();

}
HJ_stick_1.prototype.makeStick1 = function ()
{
    var x = 2500;
    var y = 1000;
    var z = 1000;
    var pointlist_stick_1 = this.superobj.newPointlist();
    pointlist_stick_1.makestick(0.0,0.0,0.0);
    var pointlist_stick_2 = this.superobj.newPointlist();
    pointlist_stick_2.makestick(x,y,0.0);
    var pointlist_stick_3 = this.superobj.newPointlist();
    pointlist_stick_3.makestick(x,y,z);
    var pointlist_stick_4 = this.superobj.newPointlist();
    pointlist_stick_4.makestick(0,0,z);
    this.superobj.makeObj();
    this.superobj.setColor(1.0,1.0,1.0,1.0);

    var pointlist_circle1 = this.superobj2.newPointlist();
    pointlist_circle1.makeCircle(0,0.0,50);
    var pointlist_circle2 = this.superobj2.newPointlist();
    pointlist_circle2.makeCircle(1000,0.0,50);
    var pointlist_circle3 = this.superobj2.newPointlist();
    pointlist_circle3.makeCircle(1000,1000,50);
    var pointlist_circle4 = this.superobj2.newPointlist();
    pointlist_circle4.makeCircle(0,1000,50);
    this.superobj2.makeObj();
    this.superobj2.setColor(1.0,1.0,1.0,1.0);

    var pointlist_propeller1 = this.superobj3.newPointlist();
    pointlist_propeller1.makeDronpropellr(0,0,0);
    var pointlist_propeller2 = this.superobj3.newPointlist();
    pointlist_propeller2.makeDronpropellr(1,1,0);
    var pointlist_propeller3 = this.superobj3.newPointlist();
    pointlist_propeller3.makeDronpropellr(1,1,1);
    var pointlist_propeller4 = this.superobj3.newPointlist();
    pointlist_propeller4.makeDronpropellr(0,0,1);
    this.superobj3.makeObj();
    this.superobj3.setColor(0.3,0.3,0.3,1.0);
}
HJ_stick_1.prototype.getTransforMatrixStick = function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var rotateMat4 = mat4.create();
    var sx =0.05;
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.identity(rotateMat4);

    mat4.rotate(rotateMat4, 60*Math.PI/180, [0,0,1]);
    mat4.translate(translatMat4, [3000*sx,4000*sx,2000*sx]);
    mat4.multiply(transforMat4, translatMat4);
    mat4.multiply(transforMat4, rotateMat4);

    return transforMat4
}

HJ_stick_1.prototype.getTransforMatrixCircle = function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var rotateMat4 = mat4.create();
    var sx =0.05;
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.translate(translatMat4, [3400*sx,5800*sx,2000*sx]);
    mat4.multiply(transforMat4, translatMat4);

    return transforMat4
}

HJ_stick_1.prototype.getTransforMatrixpropeller= function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var rotateMat4 = mat4.create();
    var sx =0.05;
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.identity(rotateMat4);
    mat4.translate(translatMat4, [3400*sx,5800*sx,3200*sx]);
    mat4.rotate(rotateMat4, this.rotation.z, [0,0,1]);
    mat4.multiply(transforMat4, translatMat4);
    mat4.multiply(transforMat4, rotateMat4);

    return transforMat4
}


HJ_stick_1.prototype.draw = function (gl, shaderProgram, currentMatrx)
{


    var circleMatrix = mat4.create();
    mat4.identity(circleMatrix);
    var transcircleMat4 = this.getTransforMatrixCircle();
    mat4.multiply(circleMatrix, currentMatrx);
    mat4.multiply(circleMatrix, transcircleMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, circleMatrix);
    this.superobj2.draw(gl, shaderProgram);


    var stickMat4 = mat4.create();
    mat4.identity(stickMat4);
    var transformat4 = this.getTransforMatrixStick();
    mat4.multiply(stickMat4, currentMatrx);
    mat4.multiply(stickMat4, transformat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, stickMat4);
    this.superobj.draw(gl, shaderProgram);

    var prollerMatrix = mat4.create();
    mat4.identity(prollerMatrix);
    var transpropellerMat4 = this.getTransforMatrixpropeller();
    mat4.multiply(prollerMatrix, currentMatrx);
    mat4.multiply(prollerMatrix, transpropellerMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, prollerMatrix);
    this.rotation.z += 1;
    this.superobj3.draw(gl, shaderProgram);


}

var HJ_stick_2 = function ()
{
    this.superobj = new Game_SuperObj();
    this.superobj2 = new Game_SuperObj();
    this.superobj3 = new Game_SuperObj();
    this.rotation = new Game_Point();
}
HJ_stick_2.prototype.makeStick2 = function ()
{
    var x = 2500;
    var y = 1000;
    var z = 1000;
    var pointlist_stick_1 = this.superobj.newPointlist();
    pointlist_stick_1.makestick(0.0,0.0,0.0);
    var pointlist_stick_2 = this.superobj.newPointlist();
    pointlist_stick_2.makestick(x,y,0.0);
    var pointlist_stick_3 = this.superobj.newPointlist();
    pointlist_stick_3.makestick(x,y,z);
    var pointlist_stick_4 = this.superobj.newPointlist();
    pointlist_stick_4.makestick(0,0,z);
    this.superobj.makeObj();
    this.superobj.setColor(1.0,1.0,1.0,1.0);

    var pointlist_circle1 = this.superobj2.newPointlist();
    pointlist_circle1.makeCircle(0,0.0,50);
    var pointlist_circle2 = this.superobj2.newPointlist();
    pointlist_circle2.makeCircle(1000,0.0,50);
    var pointlist_circle3 = this.superobj2.newPointlist();
    pointlist_circle3.makeCircle(1000,1000,50);
    var pointlist_circle4 = this.superobj2.newPointlist();
    pointlist_circle4.makeCircle(0,1000,50);
    this.superobj2.makeObj();
    this.superobj2.setColor(1.0,1.0,1.0,1.0);

    var pointlist_propeller1 = this.superobj3.newPointlist();
    pointlist_propeller1.makeDronpropellr(0,0,0);
    var pointlist_propeller2 = this.superobj3.newPointlist();
    pointlist_propeller2.makeDronpropellr(1,1,0);
    var pointlist_propeller3 = this.superobj3.newPointlist();
    pointlist_propeller3.makeDronpropellr(1,1,1);
    var pointlist_propeller4 = this.superobj3.newPointlist();
    pointlist_propeller4.makeDronpropellr(0,0,1);
    this.superobj3.makeObj();
    this.superobj3.setColor(0.3,0.3,0.3,1.0);
}
HJ_stick_2.prototype.getTransforMatrixStick = function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var rotateMat4 = mat4.create();

    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.identity(rotateMat4);
    var sx =0.05;
    mat4.rotate(rotateMat4, 240*Math.PI/180, [0,0,1]);
    mat4.translate(translatMat4, [-3000*sx,-4000*sx,2000*sx]);
    mat4.multiply(transforMat4, translatMat4);
    mat4.multiply(transforMat4, rotateMat4);

    return transforMat4
}

HJ_stick_2.prototype.getTransforMatrixCircle = function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var sx =0.05;
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.translate(translatMat4, [-3400*sx,-5800*sx,2000*sx]);
    mat4.multiply(transforMat4, translatMat4);

    return transforMat4
}
HJ_stick_2.prototype.getTransforMatrixpropeller= function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var rotateMat4 = mat4.create();
    var sx =0.05;
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.identity(rotateMat4);
    mat4.translate(translatMat4, [-3400*sx,-5800*sx,3200*sx]);
    mat4.rotate(rotateMat4, this.rotation.z, [0,0,1]);
    mat4.multiply(transforMat4, translatMat4);
    mat4.multiply(transforMat4, rotateMat4);

    return transforMat4
}

HJ_stick_2.prototype.draw = function (gl, shaderProgram, currentMatrx)
{
    var circleMatrix = mat4.create();
    mat4.identity(circleMatrix);
    var transcircleMat4 = this.getTransforMatrixCircle();
    mat4.multiply(circleMatrix, currentMatrx);
    mat4.multiply(circleMatrix, transcircleMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, circleMatrix);
    this.superobj2.draw(gl, shaderProgram);


    var stickMat4 = mat4.create();
    mat4.identity(stickMat4);
    var transformat4 = this.getTransforMatrixStick();
    mat4.multiply(stickMat4, currentMatrx);
    mat4.multiply(stickMat4, transformat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, stickMat4);
    this.superobj.draw(gl, shaderProgram);

    var prollerMatrix = mat4.create();
    mat4.identity(prollerMatrix);
    var transpropellerMat4 = this.getTransforMatrixpropeller();
    mat4.multiply(prollerMatrix, currentMatrx);
    mat4.multiply(prollerMatrix, transpropellerMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, prollerMatrix);
    this.rotation.z += 1 ;
    this.superobj3.draw(gl, shaderProgram);
}



var HJ_stick_3 = function ()
{
    this.superobj = new Game_SuperObj();
    this.superobj2 = new Game_SuperObj();
    this.superobj3 = new Game_SuperObj();
    this.rotation = new Game_Point();
}
HJ_stick_3.prototype.makeStick3 = function ()
{
    var x = 2500;
    var y = 1000;
    var z = 1000;
    var pointlist_stick_1 = this.superobj.newPointlist();
    pointlist_stick_1.makestick(0.0,0.0,0.0);
    var pointlist_stick_2 = this.superobj.newPointlist();
    pointlist_stick_2.makestick(x,y,0.0);
    var pointlist_stick_3 = this.superobj.newPointlist();
    pointlist_stick_3.makestick(x,y,z);
    var pointlist_stick_4 = this.superobj.newPointlist();
    pointlist_stick_4.makestick(0,0,z);
    this.superobj.makeObj();
    this.superobj.setColor(1.0,1.0,1.0,1.0);

    var pointlist_circle1 = this.superobj2.newPointlist();
    pointlist_circle1.makeCircle(0,0.0,50);
    var pointlist_circle2 = this.superobj2.newPointlist();
    pointlist_circle2.makeCircle(1000,0.0,50);
    var pointlist_circle3 = this.superobj2.newPointlist();
    pointlist_circle3.makeCircle(1000,1000,50);
    var pointlist_circle4 = this.superobj2.newPointlist();
    pointlist_circle4.makeCircle(0,1000,50);
    this.superobj2.makeObj();
    this.superobj2.setColor(1.0,1.0,1.0,1.0);

    var pointlist_propeller1 = this.superobj3.newPointlist();
    pointlist_propeller1.makeDronpropellr(0,0,0);
    var pointlist_propeller2 = this.superobj3.newPointlist();
    pointlist_propeller2.makeDronpropellr(1,1,0);
    var pointlist_propeller3 = this.superobj3.newPointlist();
    pointlist_propeller3.makeDronpropellr(1,1,1);
    var pointlist_propeller4 = this.superobj3.newPointlist();
    pointlist_propeller4.makeDronpropellr(0,0,1);
    this.superobj3.makeObj();
    this.superobj3.setColor(0.3,0.3,0.3,1.0);
}
HJ_stick_3.prototype.getTransforMatrixStick = function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var rotateMat4 = mat4.create();

    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.identity(rotateMat4);
    var sx =0.05;
    mat4.rotate(rotateMat4, 300*Math.PI/180, [0,0,1]);
    mat4.translate(translatMat4, [2000*sx,-4000*sx,2000*sx]);
    mat4.multiply(transforMat4, translatMat4);
    mat4.multiply(transforMat4, rotateMat4);

    return transforMat4
}

HJ_stick_3.prototype.getTransforMatrixCircle = function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var sx =0.05;
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.translate(translatMat4, [3500*sx,-5800*sx,2000*sx]);
    mat4.multiply(transforMat4, translatMat4);

    return transforMat4
}
HJ_stick_3.prototype.getTransforMatrixpropeller= function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var rotateMat4 = mat4.create();
    var sx =0.05;
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.identity(rotateMat4);
    mat4.translate(translatMat4, [3500*sx,-5800*sx,3200*sx]);
    mat4.rotate(rotateMat4, this.rotation.z, [0,0,1]);
    mat4.multiply(transforMat4, translatMat4);
    mat4.multiply(transforMat4, rotateMat4);

    return transforMat4
}

HJ_stick_3.prototype.draw = function (gl, shaderProgram, currentMatrx)
{
    var circleMatrix = mat4.create();
    mat4.identity(circleMatrix);
    var transcircleMat4 = this.getTransforMatrixCircle();
    mat4.multiply(circleMatrix, currentMatrx);
    mat4.multiply(circleMatrix, transcircleMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, circleMatrix);
    this.superobj2.draw(gl, shaderProgram);


    var stickMat4 = mat4.create();
    mat4.identity(stickMat4);
    var transformat4 = this.getTransforMatrixStick();
    mat4.multiply(stickMat4, currentMatrx);
    mat4.multiply(stickMat4, transformat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, stickMat4);
    this.superobj.draw(gl, shaderProgram);


    var prollerMatrix = mat4.create();
    mat4.identity(prollerMatrix);
    var transpropellerMat4 = this.getTransforMatrixpropeller();
    mat4.multiply(prollerMatrix, currentMatrx);
    mat4.multiply(prollerMatrix, transpropellerMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, prollerMatrix);
    this.rotation.z += 1;
    this.superobj3.draw(gl, shaderProgram);

}

var HJ_stick_4 = function ()
{
    this.superobj = new Game_SuperObj();
    this.superobj2 = new Game_SuperObj();
    this.superobj3 = new Game_SuperObj();
    this.rotation = new Game_Point();
}
HJ_stick_4.prototype.makeStick4 = function ()
{
    var x = 2500;
    var y = 1000;
    var z = 1000;
    var pointlist_stick_1 = this.superobj.newPointlist();
    pointlist_stick_1.makestick(0.0,0.0,0.0);
    var pointlist_stick_2 = this.superobj.newPointlist();
    pointlist_stick_2.makestick(x,y,0.0);
    var pointlist_stick_3 = this.superobj.newPointlist();
    pointlist_stick_3.makestick(x,y,z);
    var pointlist_stick_4 = this.superobj.newPointlist();
    pointlist_stick_4.makestick(0,0,z);
    this.superobj.makeObj();
    this.superobj.setColor(1.0,1.0,1.0,1.0);

    var pointlist_circle1 = this.superobj2.newPointlist();
    pointlist_circle1.makeCircle(0,0.0,50);
    var pointlist_circle2 = this.superobj2.newPointlist();
    pointlist_circle2.makeCircle(1000,0.0,50);
    var pointlist_circle3 = this.superobj2.newPointlist();
    pointlist_circle3.makeCircle(1000,1000,50);
    var pointlist_circle4 = this.superobj2.newPointlist();
    pointlist_circle4.makeCircle(0,1000,50);
    this.superobj2.makeObj();
    this.superobj2.setColor(1.0,1.0,1.0,1.0);

    var pointlist_propeller1 = this.superobj3.newPointlist();
    pointlist_propeller1.makeDronpropellr(0,0,0);
    var pointlist_propeller2 = this.superobj3.newPointlist();
    pointlist_propeller2.makeDronpropellr(1,1,0);
    var pointlist_propeller3 = this.superobj3.newPointlist();
    pointlist_propeller3.makeDronpropellr(1,1,1);
    var pointlist_propeller4 = this.superobj3.newPointlist();
    pointlist_propeller4.makeDronpropellr(0,0,1);
    this.superobj3.makeObj();
    this.superobj3.setColor(0.3,0.3,0.3,1.0);
}
HJ_stick_4.prototype.getTransforMatrixStick = function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var rotateMat4 = mat4.create();

    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.identity(rotateMat4);
    var sx =0.05;
    mat4.rotate(rotateMat4, 120*Math.PI/180, [0,0,1]);
    mat4.translate(translatMat4, [-2000*sx,4000*sx,2000*sx]);
    mat4.multiply(transforMat4, translatMat4);
    mat4.multiply(transforMat4, rotateMat4);

    return transforMat4
}

HJ_stick_4.prototype.getTransforMatrixCircle = function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var sx = 0.05;
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.translate(translatMat4, [-3500*sx,5800*sx,2000*sx]);
    mat4.multiply(transforMat4, translatMat4);

    return transforMat4
}
HJ_stick_4.prototype.getTransforMatrixpropeller= function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var rotateMat4 = mat4.create();
    var sx = 0.05;
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.identity(rotateMat4);
    mat4.translate(translatMat4, [-3500*sx,5800*sx,3200*sx]);
    mat4.rotate(rotateMat4, this.rotation.z ,[0,0,1]);
    mat4.multiply(transforMat4, translatMat4);
    mat4.multiply(transforMat4, rotateMat4);

    return transforMat4
}

HJ_stick_4.prototype.draw = function (gl, shaderProgram, currentMatrx)
{
    var circleMatrix = mat4.create();
    mat4.identity(circleMatrix);
    var transcircleMat4 = this.getTransforMatrixCircle();
    mat4.multiply(circleMatrix, currentMatrx);
    mat4.multiply(circleMatrix, transcircleMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, circleMatrix);
    this.superobj2.draw(gl, shaderProgram);


    var stickMat4 = mat4.create();
    mat4.identity(stickMat4);
    var transformat4 = this.getTransforMatrixStick();
    mat4.multiply(stickMat4, currentMatrx);
    mat4.multiply(stickMat4, transformat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, stickMat4);
    this.superobj.draw(gl, shaderProgram);

    var prollerMatrix = mat4.create();
    mat4.identity(prollerMatrix);
    var transpropellerMat4 = this.getTransforMatrixpropeller();
    mat4.multiply(prollerMatrix, currentMatrx);
    mat4.multiply(prollerMatrix, transpropellerMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, prollerMatrix);
    this.rotation.z += 1;
    this.superobj3.draw(gl, shaderProgram);
}
var Dron_camera_normal = function ()
{
    this.linelist = new Game_LineList();
    this.rotation = new Game_Point();
}
Dron_camera_normal.prototype.makeCamera_nomal = function ()
{
    var linelist = this.linelist;
    linelist.makecameraline(1000,1000,-1000,0,0,0);
}
Dron_camera_normal.prototype.transforMatrix = function ()
{
    var transforMat4 = mat4.create();
    var rotateMat4 = mat4.create();
    mat4.identity(transforMat4);
    mat4.identity(rotateMat4);
    mat4.rotate(rotateMat4, this.rotation.x, [1,0,0]);
    mat4.rotate(rotateMat4, this.rotation.y, [0,1,0]);
    mat4.multiply(transforMat4, rotateMat4);
    return transforMat4;
}
Dron_camera_normal.prototype.draw = function (gl,shaderProgram,currentmatrix)
{
    var transforMat4 = this.transforMatrix();
    var linemat4 = mat4.create();
    mat4.identity(linemat4);
    mat4.multiply(linemat4, currentmatrix);
    mat4.multiply(linemat4, transforMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, linemat4);
    this.linelist.draw(gl, shaderProgram);
}