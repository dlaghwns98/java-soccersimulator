var Air_Obj_Body = function ()
{
    this.superobj = new Game_SuperObj();
}
Air_Obj_Body.prototype.makeBody = function ()
{
    /*
     var body0 = this.superobj.newPointlist();
     body0.makeCircle(0.0,-0.2,30);
     var body = this.superobj.newPointlist();
     body.makeCircle(0.15,-0.2,30);
     var body1 = this.superobj.newPointlist();
     body1.makeCircle(0.2,0.0,30);
     var body2 = this.superobj.newPointlist();
     body2.makeCircle(0.4,3.0,30);
     var body4 = this.superobj.newPointlist();
     body4.makeCircle(0.4,3.0,30);
     var body5 = this.superobj.newPointlist();
     body5.makeCircle(0.4,3.2,30);
     var body6 = this.superobj.newPointlist();
     body6.makeCircle(0.0,3.5,30);
     this.superobj.makeObj();
    */
    var points_count = 5;
    var point = undefined;

    var body0 = this.superobj.newPointlist();
    for(var i=0; i<points_count; i++)
        point = body0.newPoint(0.0, 0.0, 0.0);
    var sx = 100000.0;
    var sy = 100000.0;
    var sz = 100000.0;
    var body1Array = [];
    var body1 = this.superobj.newPointlist();
    point = body1.newPoint(1.0* sx, -1.0* sy, -2.0* sz);
    point = body1.newPoint(1.0* sx, 1.0* sy, -2.0* sz);
    point = body1.newPoint(0.0* sx, 1.0* sy, -2.0* sz);
    point = body1.newPoint(-1.0* sx, 1.0* sy, -2.0* sz);
    point = body1.newPoint(-1.0* sx, -1.0* sy, -2.0* sz);
    body1Array.push(body1);


    var body2 = this.superobj.newPointlist();
    point = body2.newPoint(1.1* sx, -1.2* sy, -4.0* sz);
    point = body2.newPoint(1.1* sx, 1.2* sy, -4.0* sz);
    point = body2.newPoint(0.0* sx, 1.2* sy, -4.0* sz);
    point = body2.newPoint(-1.1* sx, 1.2* sy, -4.0* sz);
    point = body2.newPoint(-1.1* sx, -1.2* sy, -4.0* sz);

    var body3 = this.superobj.newPointlist();
    point = body3.newPoint(1.1* sx, -1.2* sy, -6.0* sz);
    point = body3.newPoint(1.1* sx, 1.2* sy, -6.0* sz);
    point = body3.newPoint(0.0* sx, 1.5* sy, -6.0* sz);
    point = body3.newPoint(-1.1* sx, 1.2* sy, -6.0* sz);
    point = body3.newPoint(-1.1* sx, -1.2* sy, -6.0* sz);

    var body4 = this.superobj.newPointlist();
    point = body4.newPoint(1.1* sx, -2.0* sy, -6.0* sz);
    point = body4.newPoint(1.1* sx, 1.2* sy, -6.0* sz);
    point = body4.newPoint(0.0* sx, 1.5* sy, -6.0* sz);
    point = body4.newPoint(-1.1* sx, 1.2* sy, -6.0* sz);
    point = body4.newPoint(-1.1* sx, -2.0* sy, -6.0* sz);

    var body5 = this.superobj.newPointlist();
    point = body5.newPoint(1.1* sx, -2.0* sy, -8.0* sz);
    point = body5.newPoint(1.1* sx, 1.5* sy, -8.0* sz);
    point = body5.newPoint(0.0* sx, 2.5* sy, -8.0* sz);
    point = body5.newPoint(-1.1* sx, 1.5* sy, -8.0* sz);
    point = body5.newPoint(-1.1* sx, -2.0* sy, -8.0* sz);

    var body6 = this.superobj.newPointlist();
    point = body6.newPoint(1.1* sx, -1.9* sy, -10.0* sz);
    point = body6.newPoint(1.1* sx, 1.5* sy, -10.0* sz);
    point = body6.newPoint(0.0* sx, 2.3* sy, -10.0* sz);
    point = body6.newPoint(-1.1* sx, 1.5* sy, -10.0* sz);
    point = body6.newPoint(-1.1* sx, -1.9* sy, -10.0* sz);

    var body7 = this.superobj.newPointlist();
    point = body7.newPoint(1.1* sx, -1.8* sy, -12.0* sz);
    point = body7.newPoint(1.1* sx, 1.4* sy, -12.0* sz);
    point = body7.newPoint(0.0* sx, 1.4* sy, -12.0* sz);
    point = body7.newPoint(-1.1* sx, 1.4* sy, -12.0* sz);
    point = body7.newPoint(-1.1* sx, -1.8* sy, -12.0* sz);

    var body8 = this.superobj.newPointlist();
    point = body8.newPoint(0.5* sx, -1.0* sy, -18.0* sz);
    point = body8.newPoint(0.5* sx, 1.0* sy, -18.0* sz);
    point = body8.newPoint(0.0* sx, 1.0* sy, -18.0* sz);
    point = body8.newPoint(-0.5* sx, 1.0* sy, -18.0* sz);
    point = body8.newPoint(-0.5* sx, -1.0* sy, -18.0* sz);

    var body9 = this.superobj.newPointlist();
    point = body9.newPoint(0.3* sx, -0.8* sy, -19.0* sz);
    point = body9.newPoint(0.3* sx, 1.0* sy, -19.0* sz);
    point = body9.newPoint(0.0* sx, 2.0* sy, -19.0* sz);
    point = body9.newPoint(-0.3* sx, 1.0* sy, -19.0* sz);
    point = body9.newPoint(-0.3* sx, -0.8* sy, -19.0* sz);

    var body10 = this.superobj.newPointlist();
    point = body10.newPoint(0.2* sx, -0.2* sy, -21.0* sz);
    point = body10.newPoint(0.2* sx, 3.0* sy, -21.0* sz);
    point = body10.newPoint(0.0* sx, 5.0* sy, -21.0* sz);
    point = body10.newPoint(-0.2* sx, 3.0* sy, -21.0* sz);
    point = body10.newPoint(-0.2* sx, -0.2* sy, -21.0* sz);

    var body10 = this.superobj.newPointlist();
    point = body10.newPoint(0.2* sx, -0.0* sy, -22.0* sz);
    point = body10.newPoint(0.2* sx, 3.0* sy, -22.0* sz);
    point = body10.newPoint(0.0* sx, 5.0* sy, -22.0* sz);
    point = body10.newPoint(-0.2* sx, 3.0* sy, -22.0* sz);
    point = body10.newPoint(-0.2* sx, -0.0* sy, -22.0* sz);


    this.superobj.makeObj();
    this.superobj.setColor(0.2,0.2,0.0,1.0);


}
Air_Obj_Body.prototype.getTransformMatrix = function ()
{
    var transforMatrix = mat4.create();
    var rotateMatrix = mat4.create();
    var translate = mat4.create();
    mat4.identity(transforMatrix);
    mat4.identity(translate);
    mat4.identity(rotateMatrix);
    mat4.translate(translate, [0.0,2.5,0.7]);
    var radianAngle  = 180*Math.PI/180;
    mat4.rotate(rotateMatrix, radianAngle ,[0,0,1]);
    radianAngle  = 90*Math.PI/180;
    mat4.rotate(rotateMatrix, radianAngle ,[1,0,0]);
    mat4.multiply(transforMatrix, translate);
    mat4.multiply(transforMatrix, rotateMatrix);
    return transforMatrix;
}
Air_Obj_Body.prototype.draw = function (gl, shaderProgram, currentMatrix)
{
    var transformMatirx = this.getTransformMatrix();
    var BodyMatrix = mat4.create();
    mat4.identity(BodyMatrix);
    mat4.multiply(BodyMatrix, currentMatrix);
    mat4.multiply(BodyMatrix, transformMatirx);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, BodyMatrix);
    this.superobj.draw(gl,shaderProgram, BodyMatrix);
}
var Air_obj_Underwing = function ()
{
    this.superobj = new Game_SuperObj();
    this.superobj1 = new Game_SuperObj();
    this.superobj2 = new Game_SuperObj();
}
Air_obj_Underwing.prototype.makeUnderWing = function ()
{
    var sx = 150000.0;
    var sy = 80000.0;
    var sz = 100000.0;
    var sz = 100000.0;
    var r = 50000.0;
    var wing1 = this.superobj.newPointlist();
    wing1.makeArch(0.0,sx,sy,0.0,30);
    var wing2 = this.superobj.newPointlist();
    wing2.makeArch(r,sx,sy,0.0,30);
    var wing2 = this.superobj.newPointlist();
    wing2.makeArch(r,sx,sy,0.1,30);
    var wing2 = this.superobj.newPointlist();
    wing2.makeArch(0.0,sx,sy,0.1,30);
    this.superobj.makeObj();
    this.superobj.setColor(0.2,0.2,0.0,1.0);

    //left
    var wing1 = this.superobj1.newPointlist();
    wing1.makeArch(0.0,2.0,0.8,0.0,30);
    var wing2 = this.superobj1.newPointlist();
    wing2.makeArch(0.5,2.0,0.8,0.0,30);
    var wing2 = this.superobj1.newPointlist();
    wing2.makeArch(0.5,2.0,0.8,0.1,30);
    var wing2 = this.superobj1.newPointlist();
    wing2.makeArch(0.0,2.0,0.8,0.1,30);
    this.superobj1.makeObj();
    this.superobj1.setColor(0.2,0.2,0.0,1.0);

    //right
    var wing1 = this.superobj2.newPointlist();
    wing1.makeArch(0.0,2.0,0.8,0.0,30);
    var wing2 = this.superobj2.newPointlist();
    wing2.makeArch(0.5,2.0,0.8,0.0,30);
    var wing2 = this.superobj2.newPointlist();
    wing2.makeArch(0.5,2.0,0.8,0.1,30);
    var wing2 = this.superobj2.newPointlist();
    wing2.makeArch(0.0,2.0,0.8,0.1,30);
    this.superobj2.makeObj();
    this.superobj2.setColor(0.2,0.2,0.0,1.0);


}
Air_obj_Underwing.prototype.getleft_TransformMatrix = function () {
    var transformMatrix = mat4.create();
    var rotateMatrix = mat4.create();
    var translatMatrix = mat4.create();

    mat4.identity(transformMatrix);
    mat4.identity(translatMatrix);
    mat4.identity(rotateMatrix);

    mat4.translate(translatMatrix, [-0.01,- 3.7, 0.8]);
    mat4.rotate(rotateMatrix, Math.PI, [0, 1, 0]);

    mat4.multiply(transformMatrix, translatMatrix);
    mat4.multiply(transformMatrix, rotateMatrix);
    return transformMatrix;
}

Air_obj_Underwing.prototype.getright_TransformMatrix = function () {
    var transformMatrix = mat4.create();
    var rotateMatrix = mat4.create();
    var translatMatrix = mat4.create();

    mat4.identity(transformMatrix);
    mat4.identity(translatMatrix);
    mat4.identity(rotateMatrix);

    mat4.translate(translatMatrix, [0.01, -3.7, 0.8]);
    //mat4.rotate(rotateMatrix, -Math.PI / 2, [0, 1, 0]);

    mat4.multiply(transformMatrix, translatMatrix);
    mat4.multiply(transformMatrix, rotateMatrix);
    return transformMatrix;
}

Air_obj_Underwing.prototype.getup_TransformMatrix = function ()
{
    var transformMatrix = mat4.create();
    var rotateMatrix = mat4.create();
    var translatMatrix = mat4.create();

    mat4.identity(transformMatrix);
    mat4.identity(translatMatrix);
    mat4.identity(rotateMatrix);

    mat4.translate(translatMatrix, [0.05,0.2,0.3]);
    mat4.rotate(rotateMatrix,  -Math.PI/2,  [0,1,0]);

    mat4.multiply(transformMatrix, translatMatrix);
    mat4.multiply(transformMatrix, rotateMatrix);
    return transformMatrix;
}
Air_obj_Underwing.prototype.draw = function (gl, shaderProgram, currentMatrix)
{
//upwing
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    var transforMatrix_up = this.getup_TransformMatrix();
    var underWingMatrix = mat4.create();
    mat4.identity(underWingMatrix);
    mat4.multiply(underWingMatrix,currentMatrix);
    mat4.multiply(underWingMatrix,transforMatrix_up);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, underWingMatrix);
    this.superobj.draw(gl, shaderProgram, underWingMatrix);
//rightwing

    var transforMatrix_right = this.getright_TransformMatrix();
    var underWingMatrix = mat4.create();
    mat4.identity(underWingMatrix);
    mat4.multiply(underWingMatrix,currentMatrix);
    mat4.multiply(underWingMatrix,transforMatrix_right);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, underWingMatrix);
    this.superobj1.draw(gl, shaderProgram, underWingMatrix);

    //left
    var transforMatrix_left = this.getleft_TransformMatrix();
    var underWingMatrix = mat4.create();
    mat4.identity(underWingMatrix);
    mat4.multiply(underWingMatrix,currentMatrix);
    mat4.multiply(underWingMatrix,transforMatrix_left);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, underWingMatrix);
    this.superobj2.draw(gl, shaderProgram, underWingMatrix);
}
var Air_LR_Wing = function ()
{
    this.superobj = new Game_SuperObj();
    this.superobj1 = new Game_SuperObj();
}
Air_LR_Wing.prototype.make_LR_Wing = function ()
{
    var left1 = this.superobj.newPointlist();
    left1.makeArch(0.0,0.0,0.0,0.0,30);
    var left2 = this.superobj.newPointlist();
    left2.makeArch(1.0,2.5,0.6,0.0,30);
    var left3 = this.superobj.newPointlist();
    left3.makeArch(1.0,2.5,0.6,0.1,30);
    var left4 = this.superobj.newPointlist();
    left4.makeArch(0.0,0.0,0.0,0.1,30);
    this.superobj.makeObj();
    this.superobj.setColor(0.2,0.2,0.0,1.0);

    var right1 = this.superobj1.newPointlist();
    right1.makeArch(0.0,0.0,0.0,0.0,30);
    var right2 = this.superobj1.newPointlist();
    right2.makeArch(1.0,2.5,0.6,0.0,30);
    var right3 = this.superobj1.newPointlist();
    right3.makeArch(1.0,2.5,0.6,0.1,30);
    var right4 = this.superobj1.newPointlist();
    right4.makeArch(0.0,0.0,0.0,0.1,30);
    this.superobj1.makeObj();
    this.superobj1.setColor(0.2,0.2,0.0,1.0);

}
Air_LR_Wing.prototype.getLeftTransformMatrix = function ()
{
    var transforMatrix = mat4.create();
    var rotateMatrix = mat4.create();
    var translateMatrix = mat4.create();

    mat4.identity(transforMatrix);
    mat4.identity(translateMatrix);
    mat4.identity(rotateMatrix);
    mat4.translate(transforMatrix, [-0.27,0.1,0.7]);
    mat4.rotate(rotateMatrix, Math.PI, [0,1,0]);
    mat4.multiply(transforMatrix, translateMatrix);
    mat4.multiply(transforMatrix, rotateMatrix);
    return transforMatrix;
}
Air_LR_Wing.prototype.get_rightTransformMatrix = function ()
{
    var transforMatrix = mat4.create();
    var rotateMatrix = mat4.create();
    var translateMatrix = mat4.create();

    mat4.identity(transforMatrix);
    mat4.identity(translateMatrix);
    mat4.identity(rotateMatrix);
    mat4.translate(transforMatrix, [0.27,0.1,0.6]);
    mat4.multiply(transforMatrix, translateMatrix);
    return transforMatrix;
}

Air_LR_Wing.prototype.draw = function (gl, shaderProgram,currentMatrix)
{
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    //right

    var transforMatrix_right = this.get_rightTransformMatrix();
    var wingrightMatrix = mat4.create();
    mat4.identity(wingrightMatrix);
    mat4.multiply(wingrightMatrix,currentMatrix);
    mat4.multiply(wingrightMatrix,transforMatrix_right);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, wingrightMatrix);
    this.superobj1.draw(gl,shaderProgram, wingrightMatrix);
    //left

    var transforMatrix_left = this.getLeftTransformMatrix();
    var wingleftMatrix = mat4.create();
    mat4.identity(wingleftMatrix);
    mat4.multiply(wingleftMatrix,currentMatrix);
    mat4.multiply(wingleftMatrix,transforMatrix_left);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, wingleftMatrix);
    this.superobj.draw(gl,shaderProgram, wingleftMatrix);
}
var Air_propeller = function ()
{
    this.superobj = new Game_SuperObj();
    this.superobj1 = new Game_SuperObj();
    this.superobj2 = new Game_SuperObj();
    this.superobjArray = [];
    this.number = 0;
    this.rotation = new Game_Point();
}
Air_propeller.prototype.makePropellr = function ()
{
    for(var i = 0 ; i < 3;i++)
    {
        var frist_Propellr1 = this.superobj.newPointlist();
        frist_Propellr1.makepropellr(0.0,0.0,0.0,0.0,30);
        var frist_Propellr3 = this.superobj.newPointlist();
        frist_Propellr3.makepropellr(1.3,1.3,0.1,0.01,30);
        this.superobj.makeObj();
        this.superobj.setColor(0.7,0.7,0.7,1.0);
        this.superobjArray.push(this.superobj);
    }
    /*
     var frist_Propellr1 = this.superobj.newPointlist();
     frist_Propellr1.makepropellr(0.0,0.0,0.0,0.0,30);
     var frist_Propellr3 = this.superobj.newPointlist();
     frist_Propellr3.makepropellr(1.0,1.0,0.1,0.01,30);

     this.superobj.makeObj();
     this.superobj.setColor(0.7,0.7,0.7,1.0);

     var second_Propellr1 = this.superobj1.newPointlist();
     second_Propellr1.makepropellr(0.0,0.0,0.0,0.0,30);
     var second_Propellr3 = this.superobj1.newPointlist();
     second_Propellr3.makepropellr(1.0,1.0,0.1,0.01,30);

     this.superobj1.makeObj();
     this.superobj1.setColor(0.7,0.7,0.7,1.0);

     var third_Propellr1 = this.superobj2.newPointlist();
     third_Propellr1.makepropellr(0.0,0.0,0.0,0.0,30);
     var third_Propellr2 = this.superobj2.newPointlist();
     third_Propellr2.makepropellr(1.0,1.0,0.1,0.01,30);

     this.superobj2.makeObj();
     this.superobj2.setColor(0.7,0.7,0.7,1.0);
     */

}
Air_propeller.prototype.getfirstTransformMatrix = function ()
{
    var transforMatrix = mat4.create();
    var translateMatrix = mat4.create();
    var rotateMatrix = mat4.create();
    var radianAngle  = 120*Math.PI/180;
    mat4.identity(transforMatrix);
    mat4.identity(translateMatrix);
    mat4.identity(rotateMatrix);
    mat4.translate(translateMatrix, [0.0,2.3,0.63]);
    mat4.rotate(rotateMatrix, 90*Math.PI/180, [1,0,0]);
    mat4.rotate(rotateMatrix, this.rotation.z, [0,0,1]);
    mat4.rotate(rotateMatrix, this.number*radianAngle, [0,0,1]);


    mat4.multiply(transforMatrix, translateMatrix);
    mat4.multiply(transforMatrix, rotateMatrix);
    return transforMatrix;

}
/*
Air_propeller.prototype.getsecondTransformMatrix = function ()
{
    var transforMatrix = mat4.create();
    var translateMatrix = mat4.create();
    var rotateMatrix = mat4.create();

    mat4.identity(transforMatrix);
    mat4.identity(translateMatrix);
    mat4.identity(rotateMatrix);
    var radianAngle  = 90*Math.PI/180;
    mat4.translate(translateMatrix, [0.0,3.4,0.33]);
    mat4.rotate(rotateMatrix, radianAngle, [1,0,0]);
   // mat4.rotate(rotateMatrix, 45, [0,0,1]);

    mat4.multiply(transforMatrix, translateMatrix);
    mat4.multiply(transforMatrix, rotateMatrix);
    return transforMatrix;
}

Air_propeller.prototype.getthirdTransformMatrix = function ()
{
    var transforMatrix = mat4.create();
    var translateMatrix = mat4.create();
    var rotateMatrix = mat4.create();

    mat4.identity(transforMatrix);
    mat4.identity(translateMatrix);
    mat4.identity(rotateMatrix);
    var radianAngle  = 90*Math.PI/180;
    mat4.translate(translateMatrix, [0.0,3.4,0.33]);
    mat4.rotate(rotateMatrix, radianAngle, [1,0,0]);
    mat4.rotate(rotateMatrix, -2, [0,0,1]);

    mat4.multiply(transforMatrix, translateMatrix);
    mat4.multiply(transforMatrix, rotateMatrix);
    return transforMatrix;
}
*/
Air_propeller.prototype.draw = function (gl, shaderProgram, currentMatrix)
{
    this.number = 0;
    for(var i = 0; i < this.superobjArray.length;i++)
    {
        var propeller = this.superobjArray[i];
        var transforMatrix = this.getfirstTransformMatrix();
        var firstpropellerMatrix = mat4.create();
        mat4.identity(firstpropellerMatrix);
        mat4.multiply(firstpropellerMatrix, currentMatrix);
        mat4.multiply(firstpropellerMatrix, transforMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, firstpropellerMatrix);
        propeller.draw(gl, shaderProgram, firstpropellerMatrix);
        this.number += 1;
    }
}