/**
 * Created by hojun Lim on 2016-11-11.
 */
var Air_plane_main = function ()
{
    this.underWing = new Air_obj_Underwing();
    this.Body = new Air_Obj_Body();
    this.wing = new Air_LR_Wing();
    this.Propeller = new Air_Propeller();
    this.position = new Game_Point();
    this.rotation = new Game_Point();
    this.direction = new Game_Point();
    this.direction.set(0,1,0);
    this.direction_x = new Game_Point();
    this.direction_x.set(1,0,0);
    this.direction_z = new Game_Point();
    this.direction_z.set(0,0,1);
    this.speed = 0;
    this.up = false;
}
Air_plane_main.prototype.makeMain = function ()
{
    this.underWing.makeUnderWing();
    this.Body.makeBody();
    this.wing.make_LR_Wing();
    this.Propeller.makePropeller();
}
Air_plane_main.prototype.calculateNewPosition = function (time)
{
    var AirplanMatrix = this.getTransformMatrix();

    var rotatedDir = vec3.create([0,0,0]);
    var rotatedDir_x = vec3.create([0,0,0]);
    var rotatedDir_z = vec3.create([0,0,0]);
    var initalDir = vec3.create([0,1,0]);
    var initalDir_x = vec3.create([1,0,0]);
    var initalDir_z = vec3.create([0,0,1]);

    mat4.multiplyVec3(AirplanMatrix, initalDir, rotatedDir);
    mat4.multiplyVec3(AirplanMatrix, initalDir_x, rotatedDir_x);
    mat4.multiplyVec3(AirplanMatrix, initalDir_z, rotatedDir_z);

    this.direction.set(rotatedDir[0], rotatedDir[1],rotatedDir[2]);
    this.direction_x.set(rotatedDir_x[0],rotatedDir_x[1],rotatedDir_x[2]);
    this.direction_z.set(rotatedDir_z[0],rotatedDir_z[1],rotatedDir_z[2]);

    var AirNewX = this.position.x + this.speed * this.direction.x * time;
    var AirNewY = this.position.y + this.speed * this.direction.y  * time;
    var AirNewZ = this.position.z + this.speed * this.direction.z * time;

    this.position.set(AirNewX,AirNewY,AirNewZ);
}
Air_plane_main.prototype.getTransformMatrix = function ()
{
    var transforMatrix = mat4.create();
    var translateMatrix = mat4.create();
    var rotateMatrix = mat4.create();
    var rotateMatrix_x = mat4.create();
    var rotateMatrix_y = mat4.create();
    var rotateMatrix_z = mat4.create();

    var initalvec_x = vec3.create([1,0,0]);
    var rotatevec_x = vec3.create([0,0,0]);
    var rotatevec_z = vec3.create([0,0,0]);
    var initalvec_z = vec3.create([0,0,1]);
    mat4.identity(transforMatrix);
    mat4.identity(translateMatrix);
    mat4.identity(rotateMatrix);
    mat4.identity(rotateMatrix_x);
    mat4.identity(rotateMatrix_y);
    mat4.identity(rotateMatrix_z);


    mat4.translate(translateMatrix, [this.position.x,this.position.y,this.position.z]);
    mat4.rotate(rotateMatrix, this.rotation.y, [0,1,0]);
    mat4.rotate(rotateMatrix, this.rotation.z , [0,0,1]);
    mat4.rotate(rotateMatrix, this.rotation.x , [1,0,0]);

    mat4.rotate(rotateMatrix_y, this.rotation.y , [this.direction.x,this.direction.y,this.direction.z]);
    mat4.multiplyVec3(rotateMatrix, initalvec_x , rotatevec_x );
    mat4.multiplyVec3(rotateMatrix, initalvec_z, rotatevec_z);
    mat4.rotate(rotateMatrix_x, this.rotation.x , rotatevec_x);
    mat4.multiplyVec3(rotateMatrix, initalvec_z, rotatevec_z);
    mat4.rotate(rotateMatrix_z, this.rotation.z, rotatevec_z);

    mat4.multiply(rotateMatrix, rotateMatrix_z);
    mat4.multiply(rotateMatrix, rotateMatrix_x);
    mat4.multiply(rotateMatrix, rotateMatrix_y);

    mat4.multiply(transforMatrix, translateMatrix);
    mat4.multiply(transforMatrix, rotateMatrix);

    return transforMatrix;

}
Air_plane_main.prototype.draw = function (gl, shaderPromgram, currentMatrix, time)
{
    var mainMatrix = mat4.create();
    var transforMatrix = this.getTransformMatrix();
    this.calculateNewPosition(time);
    mat4.identity(mainMatrix);

    mat4.multiply(mainMatrix, currentMatrix);
    //mat4.multiply(mainMatrix, transforMatrix);

    gl.uniformMatrix4fv(shaderPromgram.mvMatrixUniform, false, mainMatrix);

    this.Body.draw(gl, shaderPromgram,mainMatrix);
    this.underWing.draw(gl, shaderPromgram,mainMatrix);
    this.wing.draw(gl, shaderPromgram,mainMatrix);
    this.Propeller.draw(gl, shaderPromgram,mainMatrix);
}