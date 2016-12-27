/**
 * Created by hojun Lim on 2016-12-19.
 */
var HJ_selectTwoPoint = function()
{
    this.point1 = new Game_Point();
    this.point2 = new Game_Point();
    this.pointArray = [];
    this.lineArray = [];

    this.lineBufferKey == undefined;
    this.TexBufferKey == undefined;
    this.NormalBufferKey == undefined;

    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
    this.ImageID = undefined;
    this.ImageLoadingStarted = false;
    this.textureAux_1x1 = undefined;
    this.z = 3000;
    this.clickCount = 0;
    this.j = 0;
    this.a = 0;
    this.translatMat4 = mat4.create();
    mat4.identity(this.translatMat4);
    this.BufferCount = 1;
}

HJ_selectTwoPoint.prototype.selectPoint = function(lon, lat,heigth)
{
    this.location = Cesium.Cartesian3.fromDegrees(lon, lat, heigth);
    var point = new Game_Point();
    point.set(this.location.x, this.location.y, this.location.z);

    this.pointArray.push(point);

}

HJ_selectTwoPoint.prototype.getPointArray = function()
{
    var floatvaluse =   2*3;
    var lineArray = new Float32Array(floatvaluse);
    for(var i = 0 ; i < 1; i++)
    {
        var point1 = this.pointArray[this.a];
        var point2 = this.pointArray[this.a+1];
        lineArray[i*6] = point1.x;
        lineArray[i*6+1] = point1.y;
        lineArray[i*6+2] = point1.z;

        lineArray[i*6+3] = point2.x;
        lineArray[i*6+4] = point2.y;
        lineArray[i*6+5] = point2.z;
        this.BufferCount +=1;
        this.a += 1;
    }
    return lineArray;
}

HJ_selectTwoPoint.prototype.getTexCoordArray = function()
{
    var floatvaluse =   2*2;
    var lineArray = new Float32Array(floatvaluse);
    for(var i = 0 ; i < 1; i++)
    {
        var point1 = this.pointArray[0];

        lineArray[i*4] = point1.texCoord.x;
        lineArray[i*4+1] = point1.texCoord.y;

        lineArray[i*4+2] = point1.texCoord.x;
        lineArray[i*4+3] = point1.texCoord.y;
    }
    return lineArray;
}

HJ_selectTwoPoint.prototype.getNormalArray = function()
{
    var floatvaluse =   2*3;
    var lineArray = new Float32Array(floatvaluse);
    for(var i = 0 ; i < 1; i++)
    {
        var point1 = this.pointArray[0];
        lineArray[i*6] = point1.normal.x;
        lineArray[i*6+1] = point1.normal.y;
        lineArray[i*6+2] = point1.normal.z;

        lineArray[i*6+3] = point1.normal.x;
        lineArray[i*6+4] = point1.normal.y;
        lineArray[i*6+5] = point1.normal.z;
        this.BufferCount +=1;
    }
    return lineArray;
}

HJ_selectTwoPoint.prototype.getPointBufferKey = function (gl)
{
    if(this.lineBufferKey == undefined)
    {
        this.lineBufferKey = gl.createBuffer();
        var lineArray = this.getPointArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.lineBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, lineArray, gl.STATIC_DRAW)
    }
    return this.lineBufferKey;
}

HJ_selectTwoPoint.prototype.getTexBufferKey = function (gl)
{
    if(this.TexBufferKey == undefined)
    {
        this.TexBufferKey = gl.createBuffer();
        var lineArray = this.getTexCoordArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.TexBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, lineArray, gl.STATIC_DRAW)
    }
    return this.TexBufferKey;
}

HJ_selectTwoPoint.prototype.getNormalBufferKey = function (gl)
{
    if(this.NormalBufferKey == undefined)
    {
        this.NormalBufferKey = gl.createBuffer();
        var lineArray = this.getNormalArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.NormalBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, lineArray, gl.STATIC_DRAW)
    }
    return this.NormalBufferKey;
}

HJ_selectTwoPoint.prototype.draw = function (gl, shaderProgram, hjLoader)
{

        if(this.textureAux_1x1 == undefined)
        {
            this.textureAux_1x1 = gl.createTexture();
            // Test wait for texture to load.********************************************
            gl.bindTexture(gl.TEXTURE_2D, this.textureAux_1x1);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([100, 0, 0, 255])); // red
            gl.bindTexture(gl.TEXTURE_2D, null);
        }

        if(this.ImageID == undefined && this.ImageLoadingStarted == false)
        {
            this.ImageID = this.textureAux_1x1;
            /*
             var ImagePath = "/MyImages/window.jpg";
             hjLoader.loadImage(gl, ImagePath, this);
             */
            this.ImageLoadingStarted = true;
        }
        //GL.bindTexture(GL.TEXTURE_2D, simpBuildV1._simpleBuildingTexture); // embedded image.***
        if(this.ImageID != undefined)
        {

            gl.uniform1i(shaderProgram.diffuseTex, 0);
            gl.activeTexture(gl.TEXTURE0); // for diffuse texture.***
            gl.bindTexture(gl.TEXTURE_2D, this.ImageID);
            //gl.enableVertexAttribArray(shaderProgram.aTexcoord);
            gl.uniform1i(shaderProgram.hasTexture, 1);
        }
        else {
            //gl.disableVertexAttribArray(shaderProgram.aTexcoord);
            gl.uniform1i(shaderProgram.hasTexture, 0);
            return;
        }
/*
        if(this.clickCount != this.BufferCount)
        {
            this.lineBufferKey = undefined;
        }
        */
        var positionBufferKey = this.getPointBufferKey(gl);
        var normalBufferKey = this.getNormalBufferKey(gl);
        var texBufferKey = this.getTexBufferKey(gl);

        var identyMatrix = mat4.create();
        mat4.identity(identyMatrix);
      //  var count  = this.PolygonLineArray.length;
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
        gl.enableVertexAttribArray(shaderProgram.aTexcoord);
        //gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
    gl.uniform3fv(shaderProgram.objposUniform, [0.0, 0.0, 0.0]);
        gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, identyMatrix);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferKey);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0,0);
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferKey);
        gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0,0);
        gl.bindBuffer(gl.ARRAY_BUFFER, texBufferKey);
        gl.vertexAttribPointer(shaderProgram.aTexcoord, 2, gl.FLOAT, false, 0,0);
        gl.drawArrays(gl.LINES, 0 , 1 * 2); // problem ****
}
var HJ_Square = function ()
{
   this.point1 = new Game_Point();
}
HJ_Square.prototype.makeSquare = function ()
{

}