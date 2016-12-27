/**
 * Created by hojun Lim on 2016-11-11.
 */
var Air_Propeller = function ()
{
    this.Propeller = new Air_propeller();
    this.rotation = new Game_Point();

}
Air_Propeller.prototype.makePropeller = function ()
{
    this.Propeller.makePropellr();
}

Air_Propeller.prototype.getTransformMatrix = function ()
{
    var transforMatrix = mat4.create();
    var rotateMatrix = mat4.create();
    mat4.identity(transforMatrix);
    mat4.identity(rotateMatrix);
    mat4.rotate(rotateMatrix, this.rotation.y, [0,1,0]);


    mat4.multiply(transforMatrix , rotateMatrix );
    return transforMatrix;
}
Air_Propeller.prototype.draw = function (gl, shaderProgram, currentMatrix)
{
    var transforMatrix = this.getTransformMatrix();
    var propellerMatrix = mat4.create();
    mat4.identity(propellerMatrix);

    mat4.multiply(propellerMatrix, currentMatrix);
    mat4.multiply(propellerMatrix, transforMatrix);

    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, propellerMatrix);
    this.Propeller.draw(gl, shaderProgram,propellerMatrix);
}