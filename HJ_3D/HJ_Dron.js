/**
 * Created by hojun Lim on 2016-11-29.
 */

 var HJ_Dron = function ()
 {
     this.position = new Game_Point();
     this.dron_body = new HJ_DronBody();
     this.stick1 = new HJ_stick_1();
     this.stick2 = new HJ_stick_2();
     this.stick3 = new HJ_stick_3();
     this.stick4 = new HJ_stick_4();
     this.camera = new HJ_Dron_Camera();
     this.cameraline = new Dron_camera_normal();
     this.lat = 37.5172076;
     this.lon = 126.929;

     this.latspeed = 0;
     this.lonspeed = 0;
     this.height = 1000.0;
     this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
     this.transforMat4 = mat4.create();
     mat4.identity(this.transforMat4);
     this.rotation = new Game_Point();
     this.move = false;
 }
 HJ_Dron.prototype.makeDron = function ()
 {
    this.dron_body.makeDronBody();
    this.stick1.makeStick1();
    this.stick2.makeStick2();
    this.stick3.makeStick3();
    this.stick4.makeStick4();
    this.camera.makeCamera();
    this.cameraline.makeCamera_nomal();
 }

HJ_Dron.prototype.getTransforMat4 = function ()
{
    var transforMat4 = mat4.create();
    var translatMat4 = mat4.create();
    var rotatMat4 = mat4.create();
    mat4.identity(transforMat4);
    mat4.identity(translatMat4);
    mat4.identity(rotatMat4);

    mat4.translate(translatMat4, [this.position.x,this.position.y,this.position.z]);
    mat4.rotate(rotatMat4, this.rotation.z, [0,0,1]);
    mat4.multiply(transforMat4, translatMat4);
    return transforMat4;
}
 HJ_Dron.prototype.draw = function (gl, shaderProgram,currentMatrix)
 {
     this.lat += this.latspeed;
     this.lon += this.lonspeed;
     this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);

     Cesium.Transforms.eastNorthUpToFixedFrame(this.location, undefined, this.transforMat4);

     this.transforMat4[12] = 0;
     this.transforMat4[13] = 0;
     this.transforMat4[14] = 0;

     var dronMatrix = mat4.create();
     var transforMatirx = this.getTransforMat4();
     mat4.identity(dronMatrix);
     mat4.multiply(dronMatrix, this.transforMat4);
     mat4.multiply(dronMatrix, transforMatirx);

     gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
     gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, dronMatrix);
     //this.position.y += 10;
     //this.addLable();
     this.dron_body.draw(gl,shaderProgram,dronMatrix);
     this.stick1.draw(gl,shaderProgram,dronMatrix);
     this.stick2.draw(gl,shaderProgram,dronMatrix);
     this.stick3.draw(gl,shaderProgram,dronMatrix);
     this.stick4.draw(gl,shaderProgram,dronMatrix);
     this.camera.draw(gl,shaderProgram,dronMatrix);
     this.cameraline.draw(gl,shaderProgram,dronMatrix);
 }
/*
 HJ_Dron.prototype.addLable = function (viewer)
 {
 viewer.entities.add({
 position: Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height),
 label : {
 text : "dron"
 }
 });
 }
 */
