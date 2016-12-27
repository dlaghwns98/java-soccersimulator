/**
 * Created by hojun Lim on 2016-12-05.
 */
var HJ_WorldCupMain = function ()
{
    this.WorldCupunder = new HJ_WorldCup_under();
    this.WorldCupbody = new HJ_WorldCup_body();
    //this.WorldCheer = new HJ_WorldCup_CheerArray();
    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 1000.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();

    mat4.identity(this.transforMat4);
}
HJ_WorldCupMain.prototype.makeWorldCup = function ()
{
    this.WorldCupunder.makeWorldCup();
    this.WorldCupbody.makeWorldCup();
   // this.WorldCheer.makeCheer();
}
HJ_WorldCupMain.prototype.draw = function (gl,shaderProgram)
{
    Cesium.Transforms.eastNorthUpToFixedFrame(this.location, undefined, this.transforMat4);
    this.transforMat4[12] = 0;
    this.transforMat4[13] = 0;
    this.transforMat4[14] = 0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);
  // this.WorldCupunder.draw(gl,shaderProgram,this.transforMat4);
  //  this.WorldCupbody.draw(gl,shaderProgram, this.transforMat4);
  //  this.WorldCheer.draw(gl,shaderProgram,this.transforMat4);
}

 HJ_WorldCupMain.prototype.initTexture = function (gl)
 {
     var WorldCuptexture = gl.createTexture();
     var WorldCupImage = new Image();
     WorldCupImage.onload = function ()
     {
     this.handleTextureLoaded(WorldCupImage, WorldCuptexture);
     }
     WorldCupImage.src = "WorldCupImage.png";
 }

 HJ_WorldCupMain.prototype.handleTextureLoaded = function (gl, texture)
 {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0 , gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);

    function setBuffer() {
        var Data = [
            0.0,  0.0,
            1.0,  0.0,
            0.0,  1.0,
            1.0,  0.0
        ]
        var Buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, Buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Data), gl.STATIC_DRAW)
        Buffer.itemSize = 2
        Buffer.numItem = 4
        return Buffer;
    }
    var Buffer = setBuffer();
 }

