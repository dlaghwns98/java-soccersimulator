/**
 * Created by hojun Lim on 2016-12-26.
 */
var HJ_UFO_obj = function()
{
    this.pointArray = [];
    this.triangleArray = [];
    this.polygon = new HJ_polygon2();
    this.triangleMat4 = mat4.create();
    mat4.identity(this.triangleMat4);
    // this.polygon.makePolygon();


    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
    this.ImageID = undefined;
    this.ImageLoadingStarted = false;
    this.textureAux_1x1 = undefined;


    this.positionBufferKey = undefined;
    this.normalBufferKey = undefined;
    this.texcoordBufferKey = undefined;

    this.lon = 0;
    this.lat = 0;
    this.height = 4000.0;
    this.transPosition = false;
    this.setLocation = undefined;
    // this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
}

HJ_UFO_obj.prototype.setPosition = function(longitude, latitude)
{
    this.lon = longitude;
    this.lat = latitude;
}
HJ_UFO_obj.prototype.getPosition = function()
{
    if(this.transPosition == true)
    {
        this.height = 0;
        this.location =  Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    }
    else{
        this.lat = 37.5172076;
        this.lon = 126.929;
        this.height = 4000.0;
        this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    }
}


HJ_UFO_obj.prototype.make3D_Revolution = function(x,y,z)
{
    var count = 15;

    var increRad = 10;
    for(var i = 0 ; i < 37;i++)
    {
        var Polygon_pointArray = [];
        var rotatePointArray = [];
        var rotationMat4 = mat4.create();
        mat4.identity(rotationMat4);
        mat4.rotate(rotationMat4, (i*increRad)*Math.PI/180,[x,y,z]);
        for(var j = 0 ; j < this.polygon.pointArray.length; j++)
        {
            Polygon_pointArray[j] = this.polygon.pointArray[j];
            var Polygonpoint = Polygon_pointArray[j];

            var vec = vec3.create();
            mat4.multiplyVec3(rotationMat4, [Polygonpoint.x,Polygonpoint.y,Polygonpoint.z], vec);
            var point = new Game_Point();
            point.set(vec[0], vec[1], vec[2]);
            rotatePointArray[j] = point;
        }
        this.pointArray.push(rotatePointArray);

    }

    for(var i = 0 ; i < this.pointArray.length-1; i++)
    {

        var dw = this.pointArray[i];
        var up = this.pointArray[i+1];

        for(var j = 0 ; j < dw.length; j++)
        {

            if(j == dw.length-1)
            {
                if(this.polygon.open == false)
                {
                    var dw1 = dw[j];
                    var dw2 = dw[0];

                    var up1 = up[j];
                    var up2 = up[0];

                    var triangle = new HJ_Triangle();
                    triangle.set(dw1.x,dw1.y,dw1.z, dw2.x,dw2.y,dw2.z, up2.x,up2.y,up2.z);
                    triangle.setTexcoord(0,0, 1,0, 1,1);
                    triangle.CalculateNormal();
                    this.triangleArray.push(triangle);
                    triangle = new HJ_Triangle();
                    triangle.set(dw1.x,dw1.y,dw1.z, up2.x,up2.y,up2.z, up1.x,up1.y,up1.z);
                    triangle.CalculateNormal();
                    triangle.setTexcoord(0,0, 1,0, 1,1);
                    this.triangleArray.push(triangle);
                }

            }
            else
            {
                var dw1 = dw[j];
                var dw2 = dw[j+1];

                var up1 = up[j];
                var up2 = up[j+1];

                var triangle = new HJ_Triangle();
                triangle.set(dw1.x,dw1.y,dw1.z, dw2.x,dw2.y,dw2.z, up2.x,up2.y,up2.z);
                triangle.setTexcoord(0,0, 1,0, 1,1);
                triangle.CalculateNormal();
                this.triangleArray.push(triangle);
                triangle = new HJ_Triangle();
                triangle.set(dw1.x,dw1.y,dw1.z, up2.x,up2.y,up2.z, up1.x,up1.y,up1.z);
                triangle.setTexcoord(0,0, 1,0, 1,1);
                triangle.CalculateNormal();
                this.triangleArray.push(triangle);
            }

        }
    }
}
HJ_UFO_obj.prototype.getPositionArray = function ()
{
    var count = this.triangleArray.length;
    var floatvaluse = count * 3 * 3;
    var triangleArray = new Float32Array(floatvaluse);

    for(var i = 0; i < count; i++)
    {
        var triangle = this.triangleArray[i];
        triangleArray[i*9] = triangle.point1.x;
        triangleArray[i*9+1] = triangle.point1.y;
        triangleArray[i*9+2] = triangle.point1.z;

        triangleArray[i*9+3] = triangle.point2.x;
        triangleArray[i*9+4] = triangle.point2.y;
        triangleArray[i*9+5] = triangle.point2.z;

        triangleArray[i*9+6] = triangle.point3.x;
        triangleArray[i*9+7] = triangle.point3.y;
        triangleArray[i*9+8] = triangle.point3.z;
    }
    return triangleArray;
}
HJ_UFO_obj.prototype.getNormalArray = function ()
{
    var count = this.triangleArray.length;
    var floatvaluse = count * 3 * 3;
    var triangleArray = new Float32Array(floatvaluse);

    for(var i = 0; i < count; i++)
    {
        var triangle = this.triangleArray[i];
        triangleArray[i*9] = triangle.point1.normal.x;
        triangleArray[i*9+1] = triangle.point1.normal.y;
        triangleArray[i*9+2] = triangle.point1.normal.z;

        triangleArray[i*9+3] = triangle.point2.normal.x;
        triangleArray[i*9+4] = triangle.point2.normal.y;
        triangleArray[i*9+5] = triangle.point2.normal.z;

        triangleArray[i*9+6] = triangle.point3.normal.x;
        triangleArray[i*9+7] = triangle.point3.normal.y;
        triangleArray[i*9+8] = triangle.point3.normal.z;
    }
    return triangleArray;
}
HJ_UFO_obj.prototype.getTexCoordArray = function ()
{
    var count = this.triangleArray.length;
    var floatvaluse = count * 2 * 3;
    var triangleArray = new Float32Array(floatvaluse);

    for(var i = 0; i < count; i++)
    {
        var triangle = this.triangleArray[i];
        triangleArray[i*6] = triangle.point1.x;
        triangleArray[i*6+1] = triangle.point1.y;

        triangleArray[i*6+2] = triangle.point2.x;
        triangleArray[i*6+3] = triangle.point2.y;

        triangleArray[i*6+4] = triangle.point3.x;
        triangleArray[i*6+5] = triangle.point3.y;

    }
    return triangleArray;
}
HJ_UFO_obj.prototype.getPositionBufferKey = function (gl)
{
    if(this.positionBufferKey == undefined)
    {
        this.positionBufferKey = gl.createBuffer();
        var triangleArray = this.getPositionArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
    }
    return this.positionBufferKey;
}
HJ_UFO_obj.prototype.getNormalBufferKey = function (gl)
{
    if(this.normalBufferKey == undefined)
    {
        this.normalBufferKey = gl.createBuffer();
        var triangleArray = this.getNormalArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
    }
    return this.normalBufferKey;
}
HJ_UFO_obj.prototype.getTexCoordBuffer = function (gl)
{
    if(this.texcoordBufferKey == undefined)
    {
        this.texcoordBufferKey = gl.createBuffer();
        var triangleArray = this.getTexCoordArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
    }
    return this.texcoordBufferKey;
}
HJ_UFO_obj.prototype.draw = function (gl, shaderProgram, r,g,b,a, ballMat4)
{
    this.getPosition();
    Cesium.Transforms.eastNorthUpToFixedFrame(this.location, undefined, this.transforMat4);

    this.transforMat4[12] = 0;
    this.transforMat4[13] = 0;
    this.transforMat4[14] = 0;

    var AuxMat4 = mat4.create();
    mat4.identity(AuxMat4);
    //mat4.multiply(ballMat4, this.transforMat4,AuxMat4 );
    mat4.multiply( this.transforMat4,ballMat4, AuxMat4 );

    //gl.disable(gl.TEXTURE_2D);

    if(this.textureAux_1x1 == undefined)
    {
        this.textureAux_1x1 = gl.createTexture();
        // Test wait for texture to load.********************************************
        gl.bindTexture(gl.TEXTURE_2D, this.textureAux_1x1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([ r,g,b,a])); // red
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
    var positionBufferKey = this.getPositionBufferKey(gl);
    var normalBufferKey = this.getNormalBufferKey(gl);
    var texBufferKey = this.getTexCoordBuffer(gl);

    var count  = this.triangleArray.length;
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.enableVertexAttribArray(shaderProgram.aTexcoord);

    gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
    //gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, AuxMat4);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, texBufferKey);
    gl.vertexAttribPointer(shaderProgram.aTexcoord, 2, gl.FLOAT, false, 0,0);
    gl.drawArrays(gl.TRIANGLES, 0 , count * 3);
}
