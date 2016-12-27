/**
 * Created by hojun Lim on 2016-12-06.
 */

var HJ_TextureCube = function ()
{
    this.CubeSide1 = new HJ_Rectangle();
    this.CubeSide2 = new HJ_Rectangle();
    this.CubeSide3 = new HJ_Rectangle();
    this.CubeSide4 = new HJ_Rectangle();
    this.CubeSide5 = new HJ_Rectangle();
    this.CubeSide6 = new HJ_Rectangle();

}

HJ_TextureCube.prototype.makeCube = function ()
{
    this.CubeSide1.makeRectangle(0,1000,0,  1000,1000,0,  1000,0,0,  0,0,0); // under
    this.CubeSide2.makeRectangle(0,0,0,  1000,0,0,  1000,0,1000,  0,0,1000); // front
    this.CubeSide3.makeRectangle(1000,0,0,  1000,1000,0,  1000,1000,1000,  1000,0,1000); //rightside
    this.CubeSide4.makeRectangle(1000,1000,0,  0,1000,0,  0,1000,1000,  1000,1000,1000); // behinde
    this.CubeSide5.makeRectangle(0,1000,0,  0,0,0,  0,0,1000,  0,1000,1000); //leftside
    this.CubeSide6.makeRectangle(0,0,1000,  1000,0,1000,  1000,1000,1000,  0,1000,1000); //upside
}

HJ_TextureCube.prototype.draw = function (gl,shaderProgram, hjLoader)
{
    this.CubeSide1.draw(gl,shaderProgram,hjLoader);
    this.CubeSide2.draw(gl,shaderProgram,hjLoader);
    this.CubeSide3.draw(gl,shaderProgram,hjLoader);
    this.CubeSide4.draw(gl,shaderProgram,hjLoader);
    this.CubeSide5.draw(gl,shaderProgram,hjLoader);
    this.CubeSide6.draw(gl,shaderProgram,hjLoader);
}

var HJ_Sphere = function ()
{
    this.point1 = new Game_Point();
    this.point2 = new Game_Point();
    this.point3 = new Game_Point();
    this.point4 = new Game_Point();

    this.pointcontaner = [];
    this.pointlist = new Game_PointList();
    this.pointlist_1 = new Game_PointList();

    this.pointlistBufferKey = undefined;
    this.pointlistColorBufferKey = undefined;
    this.pointlistNormalBufferKey = undefined;

    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 20000.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
}
HJ_Sphere.prototype.makeSphere = function ()
{
    var count = 5;
    var radian = Math.PI/count;
    var angle = 0;
    var z = 0;
    for(var i = 0 ; i < count + 1 ; i++)
    {
        z = -1000 * Math.cos(angle);
        var r = 1000 * Math.sin(angle);

        this.pointcontaner = this.pointlist;
        this.pointcontaner.makeCircle(r, z , count);
        angle += radian;
    }
    this.makemesh();

}
HJ_Sphere.prototype.makemesh = function ()
{
    var j = 1;
    var count = this.pointlist.pointArray.length;
    for(var i = 0; i < count; i++)
    {
        if(j == count-2)
        {
            var dw1 = this.pointcontaner.pointArray[0];
            var dw2 = this.pointcontaner.pointArray[i];

            var up1 = this.pointcontaner.pointArray[0];
            var up2 = this.pointcontaner.pointArray[j];

            this.point1.set(dw1.x,dw1.y,dw1.z);
            this.point2.set(dw2.x,dw2.y,dw2.z);
            this.point3.set(up2.x,up2.y,up2.z);

            this.point1.set(dw1.x,dw1.y,dw1.z);
            this.point2.set(dw2.x,dw2.y,dw2.z);
            this.point4.set(up1.x,up1.y,up1.z);

          //

        }
        else
        {
            var dw1 = this.pointcontaner.pointArray[i];
            var dw2 = this.pointcontaner.pointArray[i+1];

            var up1 = this.pointcontaner.pointArray[j];
            var up2 = this.pointcontaner.pointArray[j+1];

            this.point1.set(dw1.x,dw1.y,dw1.z);
            this.point2.set(dw2.x,dw2.y,dw2.z);
            this.point3.set(up2.x,up2.y,up2.z);
            this.point1.normal.set(0,0,1);
            this.point2.normal.set(0,0,1);
            this.point3.normal.set(0,0,1);
            this.point1.color.setColor(1.0,1.0,1.0,1.0);
            this.point2.color.setColor(1.0,1.0,1.0,1.0);
            this.point3.color.setColor(1.0,1.0,1.0,1.0);
            this.pointlist_1.newPoint(this.point1,this.point2,this.point3);

            this.point1.set(dw1.x,dw1.y,dw1.z);
            this.point2.set(dw2.x,dw2.y,dw2.z);
            this.point4.set(up1.x,up1.y,up1.z);
            this.point1.normal.set(0,0,1);
            this.point2.normal.set(0,0,1);
            this.point4.normal.set(0,0,1);
            this.point1.color.setColor(1.0,1.0,1.0,1.0);
            this.point2.color.setColor(1.0,1.0,1.0,1.0);
            this.point4.color.setColor(1.0,1.0,1.0,1.0);
            this.pointlist_1.newPoint(this.point1,this.point2,this.point4);




            j+=1;
        }
    }
}
HJ_Sphere.prototype.getpointlistArray = function ()
{
    var pointlistArray = this.pointlist_1.getPointArray();
    return pointlistArray;
}
HJ_Sphere.prototype.getpointlistColorArray = function ()
{
    var pointlistArray = this.pointlist_1.getColorArray();
    return pointlistArray;
}
HJ_Sphere.prototype.getpointlistNormalArray = function ()
{
    var pointlistArray = this.pointlist_1.getNormalArray();
    return pointlistArray;
}
HJ_Sphere.prototype.getPointBufferKey = function (gl)
{
    if(this.pointlistBufferKey == undefined)
    {
        this.pointlistBufferKey = this.pointlist_1.getPositionBufferKey(gl);
    }
    return this.pointlistBufferKey;
}
HJ_Sphere.prototype.getColorBufferKey = function (gl)
{
    if(this.pointlistColorBufferKey == undefined)
    {
        this.pointlistColorBufferKey = this.pointlist_1.getColorBufferKey(gl);
    }
    return this.pointlistColorBufferKey;
}
HJ_Sphere.prototype.getNormalBufferKey = function (gl)
{
    if(this.pointlistNormalBufferKey == undefined)
    {
        this.pointlistNormalBufferKey = this.pointlist_1.getNormalBufferKey(gl);
    }
    return this.pointlistNormalBufferKey;
}
HJ_Sphere.prototype.draw = function (gl, shaderProgram)
{
    var pointlistBufferKey = this.getPointBufferKey(gl);
    var pointlistColorBufferKey = this.getColorBufferKey(gl);
    var pointlistNormalBufferKey = this.getNormalBufferKey(gl);
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    var count = this.pointlist.pointArray.length;
    gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);

    gl.bindBuffer(gl.ARRAY_BUFFER,pointlistBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, pointlistColorBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4 , gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, pointlistNormalBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0,0);
    gl.drawArrays(gl.TRIANGLES, 0, count );
}


var HJ_Triangle = function () {
    this.point1 = new Game_Point();
    this.point2 = new Game_Point();
    this.point3 = new Game_Point();
}
HJ_Triangle.prototype.set = function (x,y,z, x1,y1,z1, x2,y2,z2)
{
    this.point1.set(x,y,z);
    this.point2.set(x1,y1,z1);
    this.point3.set(x2,y2,z2);
}
HJ_Triangle.prototype.setColor = function (r,g,b,a)
{
    this.point1.color.setColor(r,g,b,a);
    this.point2.color.setColor(r,g,b,a);
    this.point3.color.setColor(r,g,b,a);
}
HJ_Triangle.prototype.setNormal = function ()
{
    this.point1.normal.set(1,1,1);
    this.point2.normal.set(1,1,1);
    this.point3.normal.set(1,1,1);
}
HJ_Triangle.prototype.setTexcoord = function (x,y,  x2,y2,  x3,y3)
{
    this.point1.texCoord.set(x,y);
    this.point2.texCoord.set(x2,y2);
    this.point3.texCoord.set(x3,y3);

}

HJ_Triangle.prototype.getEdge = function (index)
{
    var edge = new Game_Point();
    if(index == 0)
    {
        var starPoint = this.point1;
        var endPoint = this.point2;
        edge.set(endPoint.x - starPoint.x, endPoint.y - starPoint.y, endPoint.z - starPoint.z)
    }
    if(index == 1)
    {
        var starPoint = this.point2;
        var endPoint = this.point3;
        edge.set(endPoint.x - starPoint.x, endPoint.y - starPoint.y, endPoint.z - starPoint.z)
    }
    if(index == 2)
    {
        var starPoint = this.point3;
        var endPoint = this.point1;
        edge.set(endPoint.x - starPoint.x, endPoint.y - starPoint.y, endPoint.z - starPoint.z)
    }
    return edge;
}

HJ_Triangle.prototype.CalculateNormal = function ()
{
    var edge1 = this.getEdge(0);
    var edge2 = this.getEdge(1);

    var normal_x = edge1.y*edge2.z - edge2.y*edge1.z;
    var normal_y = edge1.z*edge2.x - edge2.z*edge1.x;
    var normal_z = edge1.x*edge2.y - edge2.x*edge1.y;
    var normalModul = Math.sqrt(normal_x*normal_x + normal_y*normal_y + normal_z*normal_z);

    var normalUnitary_x = normal_x / normalModul;
    var normalUnitary_y = normal_y / normalModul;
    var normalUnitary_z = normal_z / normalModul;

    this.point1.normal.set(normalUnitary_x,normalUnitary_y,normalUnitary_z);
    this.point2.normal.set(normalUnitary_x,normalUnitary_y,normalUnitary_z);
    this.point3.normal.set(normalUnitary_x,normalUnitary_y,normalUnitary_z);
}
HJ_Triangle.prototype.getTriangleArray = function ()
{
    var count = 1;
    var floatvalues = count * 3 *  3;
    var triangleArray = new Float32Array(floatvalues);
    for(var i = 0; i < count; i++)
    {
        triangleArray[i*9]  = this.point1.x;
        triangleArray[i*9+1] = this.point1.y;
        triangleArray[i*9+2] = this.point1.z;

        triangleArray[i*9+3] = this.point2.x;
        triangleArray[i*9+4] = this.point2.y;
        triangleArray[i*9+5] = this.point2.z;

        triangleArray[i*9+6] = this.point3.x;
        triangleArray[i*9+7] = this.point3.y;
        triangleArray[i*9+8] = this.point3.z;
    }
    return triangleArray;
}

HJ_Triangle.prototype.getTriangleArray = function ()
{
    var count = 1;
    var floatvalues = count * 3*4;
    var triangleArray = new Float32Array(floatvalues);
    for(var i = 0; i < count; i++)
    {
        var tri = triangleArray[i];
        triangleArray[i*12]  = this.point1.color.r;
        triangleArray[i*12+1] = this.point1.color.g;
        triangleArray[i*12+2] = this.point1.color.b;
        triangleArray[i*12+3] = this.point1.color.a;

        triangleArray[i*12+4] = this.point2.color.r;
        triangleArray[i*12+5] = this.point2.color.g;
        triangleArray[i*12+6] = this.point2.color.b;
        triangleArray[i*12+7] = this.point2.color.a;

        triangleArray[i*12+8] = this.point3.color.r;
        triangleArray[i*12+9] = this.point3.color.g;
        triangleArray[i*12+10] = this.point3.color.b;
        triangleArray[i*12+11] = this.point3.color.a;
    }
    return triangleArray;
}

HJ_Triangle.prototype.getNormalArray = function ()
{
    var count = 1;
    var floatvalues = count*3 * 3;
    var triangleArray = new Float32Array(floatvalues);
    for(var i = 0; i < count; i++)
    {

       triangleArray[i*9] = this.point1.normal.x;
       triangleArray[i*9+1] = this.point1.normal.y;
       triangleArray[i*9+2] = this.point1.normal.z;

       triangleArray[i*9+3] = this.point2.normal.x;
       triangleArray[i*9+4] = this.point2.normal.y;
       triangleArray[i*9+5] = this.point2.normal.z;

       triangleArray[i*9+6] = this.point3.normal.x;
       triangleArray[i*9+7] = this.point3.normal.y;
       triangleArray[i*9+8] = this.point3.normal.z;
    }
    return triangleArray;
}

var HJ_TextureCircle = function ()
{
    this.pointArray = [];
    this.triangleArray = [];

    this.circlePositionBufferKey = undefined;
    this.circleColorBufferKey = undefined;
    this.circleNormalBufferKey = undefined;
    this.circleTexcoordBufferKey = undefined;

    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 3000.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);

    this.ImageID = undefined;
    this.ImageLoadingStarted = false;
}

HJ_TextureCircle.prototype.makeCircle = function ()
{

    var count = 60;
    var radian = (360/count)*Math.PI/180;
    var angle = 0;
    var r = 1000;
    for(var i = 0 ; i < count;i++)
    {
        var point = new Game_Point();
        point.set(r*Math.cos(angle), r*Math.sin(angle), 0);

        angle += radian;
        this.pointArray.push(point);
    }
    for(var i = 0; i < count; i++)
    {
        if(i == count-1)
        {
            var triangle = new HJ_Triangle();
            var point1 = this.pointArray[0];
            var point2 = this.pointArray[i];
            triangle.set(  point2.x,point2.y,point2.z, point1.x,point1.y,point1.z, 0,0,0);
            triangle.setNormal();

            var ps = (point1.x - (-r))*(1/(2*r));
            var pt = (point1.y - (-r))*(1/(2*r));
            var ps2 = (point2.x - (-r))*(1/(2*r));
            var pt2 = (point2.y - (-r))*(1/(2*r));
            var ps3 = r*(1/(2*r));

            triangle.setTexcoord(ps2,pt2, ps,pt,ps3,ps3);
            this.triangleArray.push(triangle);
        }
        else
            {
            var triangle = new HJ_Triangle();
            var point1 = this.pointArray[i];
            var point2 = this.pointArray[i+1];

                var ps = (point1.x - (-r))*(1/(2*r));
                var pt = (point1.y - (-r))*(1/(2*r));
                var ps2 = (point2.x - (-r))*(1/(2*r));
                var pt2 = (point2.y - (-r))*(1/(2*r));
                var ps3 = r*(1/(2*r));
            triangle.set(point1.x,point1.y,point1.z,  point2.x,point2.y,point2.z, 0,0,0);
            triangle.setNormal();
            //triangle.setTexcoord(point1.x/r,point1.y/r, point2.x/r,point2.y/r, 0,0,  0,0);
            triangle.setTexcoord(ps,pt, ps2,pt2,ps3,ps3);
            this.triangleArray.push(triangle);
        }
    }
}
HJ_TextureCircle.prototype.getCircleArray =function ()
{
    var count = this.triangleArray.length;
    var floatvalues = count * 3 * 3;
    var triangleArray = new Float32Array(floatvalues);
    for(var i = 0 ; i < count; i++)
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
HJ_TextureCircle.prototype.getColorArray =function ()
{
    var count = this.triangleArray.length;
    var floatvalues = count * 3* 4;
    var triangleArray = new Float32Array(floatvalues);
    for(var i = 0 ; i < count; i++)
    {
        var triangle = this.triangleArray[i];
        triangleArray[i*12] = triangle.point1.color.r;
        triangleArray[i*12+1] = triangle.point1.color.g;
        triangleArray[i*12+2] = triangle.point1.color.b;
        triangleArray[i*12+3] = triangle.point1.color.a;

        triangleArray[i*12+4] = triangle.point2.color.r;
        triangleArray[i*12+5] = triangle.point2.color.g;
        triangleArray[i*12+6] = triangle.point2.color.b;
        triangleArray[i*12+7] = triangle.point2.color.a;

        triangleArray[i*12+8] = triangle.point3.color.r;
        triangleArray[i*12+9] = triangle.point3.color.g;
        triangleArray[i*12+10] = triangle.point3.color.b;
        triangleArray[i*12+11] = triangle.point3.color.a;
    }
    return triangleArray;
}
HJ_TextureCircle.prototype.getNormalArray =function ()
{
    var count = this.triangleArray.length;
    var floatvalues = count * 3 * 3;
    var triangleArray = new Float32Array(floatvalues);
    for(var i = 0 ; i < count; i++)
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
HJ_TextureCircle.prototype.getTexCoordArray =function ()
{
    var count = this.triangleArray.length;
    var floatvalues = count * 2 * 3;
    var triangleArray = new Float32Array(floatvalues);
    for(var i = 0 ; i < count; i++)
    {
        var triangle = this.triangleArray[i];
        triangleArray[i*6] = triangle.point1.texCoord.x;
        triangleArray[i*6+1] = triangle.point1.texCoord.y;

        triangleArray[i*6+2] = triangle.point2.texCoord.x;
        triangleArray[i*6+3] = triangle.point2.texCoord.y;

        triangleArray[i*6+4] = triangle.point3.texCoord.x;
        triangleArray[i*6+5] = triangle.point3.texCoord.y;
    }
    return triangleArray;
}
HJ_TextureCircle.prototype.getPositionBufferKey = function (gl)
{
    if(this.circlePositionBufferKey == undefined)
    {
        this.circlePositionBufferKey = gl.createBuffer();
        var circleArray = this.getCircleArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.circlePositionBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, circleArray, gl.STATIC_DRAW);
    }
    return this.circlePositionBufferKey;
}

HJ_TextureCircle.prototype.getColorBufferKey = function (gl)
{
    if(this.circleColorBufferKey == undefined)
    {
        this.circleColorBufferKey = gl.createBuffer();
        var circleArray = this.getColorArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.circleColorBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, circleArray, gl.STATIC_DRAW);
    }
    return this.circleColorBufferKey;
}

HJ_TextureCircle.prototype.getNormalBufferKey = function (gl)
{
    if(this.circleNormalBufferKey == undefined)
    {
        this.circleNormalBufferKey = gl.createBuffer();
        var circleArray = this.getNormalArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.circleNormalBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, circleArray, gl.STATIC_DRAW);
    }
    return this.circleNormalBufferKey;
}
HJ_TextureCircle.prototype.getTexCoordBufferKey = function (gl)
{
    if(this.circleTexcoordBufferKey == undefined)
    {
        this.circleTexcoordBufferKey = gl.createBuffer();
        var circleArray = this.getTexCoordArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.circleTexcoordBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, circleArray, gl.STATIC_DRAW);
    }
    return this.circleTexcoordBufferKey;
}
HJ_TextureCircle.prototype.draw = function (gl, shaderProgram, hjLoader)
{
    var count = this.triangleArray.length;
    var circlePositionBufferKey = this.getPositionBufferKey(gl);
    var circleColorBufferKey = this.getColorBufferKey(gl);
    var circleNormalBufferKey = this.getNormalBufferKey(gl);
    var circleTexCoordBufferKey = this.getTexCoordBufferKey(gl);

    if(this.ImageID == undefined && this.ImageLoadingStarted == false)
    {
        var ImagePath = "/MyImages/starImage.png";
        hjLoader.loadImage(gl, ImagePath, this);
        this.ImageLoadingStarted = true;
    }
    if(this.ImageID != undefined)
    {
        gl.uniform1i(shaderProgram.diffuseTex, 0);
        gl.activeTexture(gl.TEXTURE0);

        gl.bindTexture(gl.TEXTURE_2D, this.ImageID);
        gl.disable(gl.TEXTURE_2D);

        gl.uniform1i(shaderProgram.hasTexture , 1);
    }
    else {
        gl.uniform1i(shaderProgram.hasTexture, 0);
        return;
    }

    Cesium.Transforms.eastNorthUpToFixedFrame(this.location, undefined, this.transforMat4);

    this.transforMat4[12] = 0;
    this.transforMat4[13] = 0;
    this.transforMat4[14] = 0;


    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
   // gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.enableVertexAttribArray(shaderProgram.aTexcoord);


    gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);
    gl.bindBuffer(gl.ARRAY_BUFFER,circlePositionBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, circleColorBufferKey);
 //   gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4 , gl.FLOAT, false, 0,0);
 //   gl.bindBuffer(gl.ARRAY_BUFFER, circleNormalBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, circleTexCoordBufferKey);
    gl.vertexAttribPointer(shaderProgram.aTexcoord, 2, gl.FLOAT, false, 0,0);
    gl.drawArrays(gl.TRIANGLES, 0, count * 3);
}

var HJ_Epeltop = function ()
{
    this.triangleArray = [];
    this.trianglePositionBufferKey = undefined;
    this.triangleTexBufferKey = undefined;
    this.triangleNormalBufferKey = undefined;

    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 100.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);

    this.ImageID = undefined;
    this.ImageLoadingStarted = false;
}
HJ_Epeltop.prototype.makeEpeltop = function ()
{
    var triangle = new HJ_Triangle();
    triangle.setNormal();
    triangle.set(-1000,0,0,  1000,0,0, 0,1000,7000); //front
    triangle.setTexcoord(0,0,  1,0, 0.5,0.5);
    this.triangleArray.push(triangle);
    var triangle = new HJ_Triangle();
    triangle.setNormal();
    triangle.set(-1000,2000,0,  -1000,0,0, 0,1000,7000 ); // left
    triangle.setTexcoord(0,0,  1,0, 0.5,0.5);
    this.triangleArray.push(triangle);
    var triangle = new HJ_Triangle();
    triangle.setNormal();
    triangle.set( 1000,2000,0, -1000,2000,0, 0,1000,7000); //behind
    triangle.setTexcoord(0,0,  1,0, 0.5,0.5);
    this.triangleArray.push(triangle);
    var triangle = new HJ_Triangle();
    triangle.setNormal();
    triangle.set(1000,0,0,  1000,2000,0,  0,1000,7000); // right;
    triangle.setTexcoord(0,0,  1,0, 0.5,0.5);
    this.triangleArray.push(triangle);
    var triangle = new HJ_Triangle();
    triangle.setNormal();
    triangle.set(-1000,0,0,  1000,0,0,  -1000,2000,0);
    triangle.setTexcoord(0,0,  1,0, 0.5,0.5);
    this.triangleArray.push(triangle);
    var triangle = new HJ_Triangle();
    triangle.setNormal();
    triangle.set(1000,0,0,  1000,2000,0,  -1000,2000,0);
    this.triangleArray.push(triangle);
}
HJ_Epeltop.prototype.getPositionTriangleArray = function ()
{
    var count = this.triangleArray.length;
    var floatvalues = count * 3 * 3;
    var triangleArray = new Float32Array(floatvalues);
    for(var i = 0 ; i < count; i++)
    {
        var tri = this.triangleArray[i];
        triangleArray[i*9] = tri.point1.x;
        triangleArray[i*9 + 1] = tri.point1.y;
        triangleArray[i*9 + 2] = tri.point1.z;

        triangleArray[i*9 + 3] = tri.point2.x;
        triangleArray[i*9 + 4] = tri.point2.y;
        triangleArray[i*9 + 5] = tri.point2.z;

        triangleArray[i*9 + 6] = tri.point3.x;
        triangleArray[i*9 + 7] = tri.point3.y;
        triangleArray[i*9 + 8] = tri.point3.z;
    }
    return triangleArray;
}

HJ_Epeltop.prototype.getTexCoordArray = function ()
{
    var count = this.triangleArray.length;
    var floatvalues = count * 2 * 3;
    var triangleArray = new Float32Array(floatvalues);
    for(var i = 0 ; i < count; i++)
    {
        var tri = this.triangleArray[i];
        triangleArray[i*6] = tri.point1.texCoord.x;
        triangleArray[i*6 + 1] = tri.point1.texCoord.y;

        triangleArray[i*6 + 2] = tri.point2.texCoord.x;
        triangleArray[i*6 + 3] = tri.point2.texCoord.y;

        triangleArray[i*6 + 4] = tri.point3.texCoord.x;
        triangleArray[i*6 + 5] = tri.point3.texCoord.y;
    }
    return triangleArray;
}

HJ_Epeltop.prototype.getNormalTriangleArray = function ()
{
    var count = this.triangleArray.length;
    var floatvalues = count * 3 * 3;
    var triangleArray = new Float32Array(floatvalues);
    for(var i = 0 ; i < count; i++)
    {
        var tri = this.triangleArray[i];
        triangleArray[i*9] = tri.point1.normal.x;
        triangleArray[i*9 + 1] = tri.point1.normal.y;
        triangleArray[i*9 + 2] = tri.point1.normal.z;

        triangleArray[i*9 + 3] = tri.point2.normal.x;
        triangleArray[i*9 + 4] = tri.point2.normal.y;
        triangleArray[i*9 + 5] = tri.point2.normal.z;

        triangleArray[i*9 + 6] = tri.point3.normal.x;
        triangleArray[i*9 + 7] = tri.point3.normal.y;
        triangleArray[i*9 + 8] = tri.point3.normal.z;
    }
    return triangleArray;
}

HJ_Epeltop.prototype.getPositionBufferKey = function (gl)
{
    if(this.trianglePositionBufferKey == undefined)
    {
        this.trianglePositionBufferKey = gl.createBuffer();
        var triangleArray = this.getPositionTriangleArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglePositionBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
    }
    return this.trianglePositionBufferKey;
}
HJ_Epeltop.prototype.getTexBufferKey = function (gl)
{
    if(this.triangleTexBufferKey == undefined)
    {
        this.triangleTexBufferKey = gl.createBuffer();
        var triangleArray = this.getTexCoordArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleTexBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
    }
    return this.triangleTexBufferKey;
}
HJ_Epeltop.prototype.getNormalBufferKey = function (gl)
{
    if(this.triangleNormalBufferKey == undefined)
    {
        this.triangleNormalBufferKey = gl.createBuffer();
        var triangleArray = this.getNormalTriangleArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleNormalBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
    }
    return this.triangleNormalBufferKey;
}

HJ_Epeltop.prototype.draw = function (gl, shaderProgram, hjLoader)
{
    if(this.ImageID == undefined && this.ImageLoadingStarted == false)
    {
        var ImagePath = "/MyImages/epelTop.png";
        hjLoader.loadImage(gl, ImagePath, this);
        this.ImageLoadingStarted = true;
    }
    if(this.ImageID != undefined)
    {
        gl.uniform1i(shaderProgram.diffuseTex, 0);
        gl.activeTexture(gl.TEXTURE0);

        gl.bindTexture(gl.TEXTURE_2D, this.ImageID);

        gl.uniform1i(shaderProgram.hasTexture , 1);
    }
    else {
        gl.uniform1i(shaderProgram.hasTexture, 0);
        return;
    }

    Cesium.Transforms.eastNorthUpToFixedFrame(this.location, undefined, this.transforMat4);

    var count = this.triangleArray.length;
    this.transforMat4[12] = 0;
    this.transforMat4[13] = 0;
    this.transforMat4[14] = 0;

    var trianglePositionBufferKey = this.getPositionBufferKey(gl);
    var triangleTextureBufferKey = this.getTexBufferKey(gl);
    var triangleNormalBufferKey = this.getNormalBufferKey(gl);

    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.enableVertexAttribArray(shaderProgram.aTexcoord);
    gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);
    gl.bindBuffer(gl.ARRAY_BUFFER,trianglePositionBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
       gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleTextureBufferKey);
    gl.vertexAttribPointer(shaderProgram.aTexcoord, 2, gl.FLOAT, false, 0,0);
    gl.drawArrays(gl.TRIANGLES, 0, count * 3 );

}
var Cesium_SuperObj = function ()
{
    this.pointUp = [];
    this.pointDw = [];
    this.pointContaner = [];
    this.triangleArray = [];

    this.positionBufferKey = undefined;
    this.textureBufferKey = undefined;
    this.normalBufferKey = undefined;

    this.ImageID = undefined;
    this.ImageLoadingStarted = false;

    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 2000.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
}
Cesium_SuperObj.prototype.newPointlist  = function ()
{
    var pointlist = new Game_PointList();
    this.pointContaner.push(pointlist);
    return pointlist;
}
Cesium_SuperObj.prototype.makeObj = function (r, height)
{
    var count = this.pointContaner.length;
    for(var i = 0; i < count - 1; i++)
    {
        var dw = this.pointContaner[i+1];
        var up = this.pointContaner[i];
        this.makemeshObj(dw, up, r, height);
    }
}
Cesium_SuperObj.prototype.makemeshObj = function (dw, up ,r ,height )
{
    var count = up.pointArray.length;
    var sIncre = 1/(count);
    for(var i = 0 ; i < count; i++)
    {
        if(i == count - 1)
        {
            var up1 = up.pointArray[i];
            var up2 = up.pointArray[0];

            var dw1 = dw.pointArray[i];
            var dw2 = dw.pointArray[0];

            var dw1ps = (sIncre*i);
            var dw1pt = (0);

            var dw2ps = (sIncre*(i+1));
            var dw2pt = (0);

            var up1ps = (sIncre*i);
            var up1pt = (1);

            var up2ps = (sIncre*(i+1));
            var up2pt = (1);



            var triangle = new HJ_Triangle();
            triangle.set(dw1.x, dw1.y, dw1.z, dw2.x,dw2.y,dw2.z, up1.x,up1.y,up1.z );
            triangle.setTexcoord(0,0, 1,0, 1,1);
            triangle.CalculateNormal();
            this.triangleArray.push(triangle);
            triangle = new HJ_Triangle();
            triangle.set( dw2.x,dw2.y,dw2.z,up2.x,up2.y, up2.z, up1.x,up1.y, up1.z);
            triangle.setTexcoord(0,0, 1,0, 1,1);


            triangle.CalculateNormal();
            this.triangleArray.push(triangle);
        }
        else
            {
                var up1 = up.pointArray[i];
                var up2 = up.pointArray[i+1];

                var dw1 = dw.pointArray[i];
                var dw2 = dw.pointArray[i+1];

                var dw1ps = (sIncre*i);
                var dw1pt = (0);

                var dw2ps = (sIncre*(i+1));
                var dw2pt = (0);

                var up1ps = (sIncre*i);
                var up1pt = (1);

                var up2ps = (sIncre*(i+1));
                var up2pt = (1);

                var dist = Math.sqrt(Math.pow((dw1.x - dw2.x),2) + Math.pow((dw1.y - dw2.y),2) + Math.pow((dw1.z - dw2.z),2))/(2*Math.PI*r);
                var distup = Math.sqrt(Math.pow((up1.x - up2.x),2) + Math.pow((up1.y - up2.y),2) + Math.pow((up1.z - up2.z),2))/(2*Math.PI*r);

                var triangle = new HJ_Triangle();
                triangle.set(dw1.x, dw1.y, dw1.z, dw2.x,dw2.y,dw2.z, up1.x,up1.y,up1.z );
                triangle.setTexcoord(0,0, 1,0, 1,1);
                triangle.CalculateNormal();
                this.triangleArray.push(triangle);
                triangle = new HJ_Triangle();
                triangle.set( dw2.x,dw2.y,dw2.z,up2.x,up2.y, up2.z, up1.x,up1.y, up1.z);
                triangle.setTexcoord(0,0, 1,0, 1,1);
                triangle.CalculateNormal();
                this.triangleArray.push(triangle);
        }
    }
}

Cesium_SuperObj.prototype.getPositionArray = function ()
{
    var count = this.triangleArray.length;
    var floatvaluse = count * 3 *3;
    var triangleArray = new Float32Array(floatvaluse);
    for(var i = 0 ; i < count; i++)
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
Cesium_SuperObj.prototype.getTextureArray = function ()
{
    var count = this.triangleArray.length;
    var floatvaluse = count * 2 *3;
    var triangleArray = new Float32Array(floatvaluse);
    for(var i = 0 ; i < count; i++)
    {
        var triangle = this.triangleArray[i];
        triangleArray[i*6] = triangle.point1.texCoord.x;
        triangleArray[i*6+1] = triangle.point1.texCoord.y;

        triangleArray[i*6+2] = triangle.point2.texCoord.x;
        triangleArray[i*6+3] = triangle.point2.texCoord.y;

        triangleArray[i*6+4] = triangle.point3.texCoord.x;
        triangleArray[i*6+5] = triangle.point3.texCoord.y;
    }
    return triangleArray;
}
Cesium_SuperObj.prototype.getNormalArray = function ()
{
    var count = this.triangleArray.length;
    var floatvaluse = count * 3 *3;
    var triangleArray = new Float32Array(floatvaluse);
    for(var i = 0 ; i < count; i++)
    {
        var triangle = this.triangleArray[i];
        triangleArray[i*9] = triangle.point1.normal.x;
        triangleArray[i*9+1]= triangle.point1.normal.y;
        triangleArray[i*9+2]= triangle.point1.normal.z;

        triangleArray[i*9+3]= triangle.point2.normal.x;
        triangleArray[i*9+4]= triangle.point2.normal.y;
        triangleArray[i*9+5]= triangle.point2.normal.z;

        triangleArray[i*9+6]= triangle.point3.normal.x;
        triangleArray[i*9+7]= triangle.point3.normal.y;
        triangleArray[i*9+8]= triangle.point3.normal.z;
    }
    return triangleArray;
}
Cesium_SuperObj.prototype.getPositionBufferKey = function (gl)
{
    if(this.positionBufferKey == undefined)
    {
        var triangleArray = this.getPositionArray();
        this.positionBufferKey = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
    }
    return this.positionBufferKey;

}
Cesium_SuperObj.prototype.getTextureBufferKey = function (gl)
{
    if(this.textureBufferKey == undefined)
    {
        var triangleArray = this.getTextureArray();
        this.textureBufferKey = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
    }
    return this.textureBufferKey;

}
Cesium_SuperObj.prototype.getNormalBufferKey = function (gl)
{
    if(this.normalBufferKey == undefined)
    {
        var triangleArray = this.getNormalArray();
        this.normalBufferKey = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
    }
    return this.normalBufferKey;
}
Cesium_SuperObj.prototype.draw = function (gl, shaderProgram, hjLoader, Imagename)
{
    Cesium.Transforms.eastNorthUpToFixedFrame(this.location, undefined, this.transforMat4);

    this.transforMat4[12] = 0;
    this.transforMat4[13] = 0;
    this.transforMat4[14] = 0;

    if(this.ImageID == undefined && this.ImageLoadingStarted == false)
    {
        var image = Imagename
        var ImagePath = "/MyImages/"+image;
        hjLoader.loadImage(gl, ImagePath, this);
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
    gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.enableVertexAttribArray(shaderProgram.aTexcoord);
    var count = this.triangleArray.length;
    var positionBufferKey = this.getPositionBufferKey(gl);
    var textureBufferKey = this.getTextureBufferKey(gl);
    var normalBufferKey = this.getNormalBufferKey(gl);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3 , gl.FLOAT, false, 0 ,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBufferKey);
    gl.vertexAttribPointer(shaderProgram.aTexcoord, 2 , gl.FLOAT, false, 0 ,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3 , gl.FLOAT, false, 0 ,0);
    gl.drawArrays(gl.TRIANGLES, 0, count * 3);
}


var HJ_BlueMartble = function ()
{
    this.superObj = new Cesium_SuperObj();
}
HJ_BlueMartble.prototype.makeBlueMartble = function ()
{
    var count = 30;
    var radias = 3000;
    var height = 8000
    var pointlist1 = this.superObj.newPointlist();
    pointlist1.makeCircle(0,0,count);
    var pointlist2 = this.superObj.newPointlist();
    pointlist2.makeCircle(radias,0,count);
    var pointlist3 = this.superObj.newPointlist();
    pointlist3.makeCircle(radias,height,count);
    var pointlist4 = this.superObj.newPointlist();
    pointlist4.makeCircle(0,height,count);

    this.superObj.makeObj(radias, height ); // if(circle) radias
}
HJ_BlueMartble.prototype.draw = function (gl, shaderProgram, hjLoader, ImageName)
{
    this.superObj.draw(gl, shaderProgram, hjLoader, ImageName);
}
var HJ_One_Side = function ()
{
    this.point1 = new Game_Point();
    this.point2 = new Game_Point();
    this.point3 = new Game_Point();
    this.point4 = new Game_Point();

    this.pointlist = [];


    this.positionBufferKey = undefined;
    this.textureBufferKey = undefined;
    this.normalBufferKey = undefined;

    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 2000.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
    this.ImageID = undefined;
    this.ImageLoadingStarted = false;
}
HJ_One_Side.prototype.set = function ()
{
    this.point1.set(0,0,0);
    this.point2.set(1000,0,0);
    this.point3.set(1000,5000,0);
    this.point4.set(0,5000,0);

    this.point1.texCoord.set(0.5,0);
    this.point2.texCoord.set(1,0);
    this.point3.texCoord.set(1,1);
    this.point4.texCoord.set(0.5,1);

    this.point1.normal.set(0,0,1);
    this.point2.normal.set(0,0,1);
    this.point3.normal.set(0,0,1);
    this.point4.normal.set(0,0,1);


}
HJ_One_Side.prototype.makeOne_side = function ()
{
    this.set();
    this.pointlist.push(this.point1);
    this.pointlist.push(this.point2);
    this.pointlist.push(this.point3);

    this.pointlist.push(this.point1);
    this.pointlist.push(this.point3);
    this.pointlist.push(this.point4);
}
HJ_One_Side.prototype.getPositionArray = function ()
{

    var floatvalues = 6 * 3 ;
    var pointArray = new Float32Array(floatvalues);
    for(var i = 0 ; i < 1; i++)
    {
        var point = this.pointlist[i];
        pointArray[i*18 ]= this.point1.x;
        pointArray[i*18+ 1]=  this.point1.y;
        pointArray[i*18+2 ]=  this.point1.z;

        pointArray[i*18+ 3]=  this.point2.x;
        pointArray[i*18+ 4]=  this.point2.y;
        pointArray[i*18+ 5]=  this.point2.z;

        pointArray[i*18+ 6]=  this.point3.x;
        pointArray[i*18+ 7]=  this.point3.y;
        pointArray[i*18+ 8]=  this.point3.z;

        pointArray[i*18+ 9]=  this.point1.x;
        pointArray[i*18+ 10]= this.point1.y;
        pointArray[i*18+ 11]= this.point1.z;

        pointArray[i*18+12 ]= this.point3.x;
        pointArray[i*18+ 13]= this.point3.y;
        pointArray[i*18+ 14]= this.point3.z;

        pointArray[i*18+ 15]= this.point4.x;
        pointArray[i*18+ 16]= this.point4.y;
        pointArray[i*18+ 17]= this.point4.z;
    }
    return pointArray;
}

HJ_One_Side.prototype.getTexArray = function ()
{

    var floatvalues = 6 * 2 ;
    var pointArray = new Float32Array(floatvalues);
    for(var i = 0 ; i < 1; i++)
    {
        var point = this.pointlist[i];
        pointArray[i*12 ]= this.point1.texCoord.x;
        pointArray[i*12+ 1]= this.point1.texCoord.y;

        pointArray[i*12+ 2]= this.point2.texCoord.x;
        pointArray[i*12+ 3]= this.point2.texCoord.y;

        pointArray[i*12+ 4]= this.point3.texCoord.x;
        pointArray[i*12+ 5]= this.point3.texCoord.y;

        pointArray[i*12+ 6]= this.point1.texCoord.x;
        pointArray[i*12+ 7]= this.point1.texCoord.y;

        pointArray[i*12+8 ]= this.point3.texCoord.x;
        pointArray[i*12+ 9]= this.point3.texCoord.y;

        pointArray[i*12+ 10]= this.point4.texCoord.x;
        pointArray[i*12+ 11]= this.point4.texCoord.y;
    }
    return pointArray;
}

HJ_One_Side.prototype.getNormalArray = function ()
{

    var floatvalues = 6 * 3 ;
    var pointArray = new Float32Array(floatvalues);
    for(var i = 0 ; i < 1; i++)
    {
        var point = this.pointlist[i];
        pointArray[i*18 ] =  this.point1.normal.x;
        pointArray[i*18+ 1]= this.point1.normal.y;
        pointArray[i*18+2 ]= this.point1.normal.z;

        pointArray[i*18+ 3]= this.point2.normal.x;
        pointArray[i*18+ 4]= this.point2.normal.y;
        pointArray[i*18+ 5]= this.point2.normal.z;

        pointArray[i*18+ 6]= this.point3.normal.x;
        pointArray[i*18+ 7]= this.point3.normal.y;
        pointArray[i*18+ 8]= this.point3.normal.z;

        pointArray[i*18+ 9]=  this.point1.normal.x;
        pointArray[i*18+ 10]= this.point1.normal.y;
        pointArray[i*18+ 11]= this.point1.normal.z;

        pointArray[i*18+12 ]= this.point3.normal.x;
        pointArray[i*18+ 13]= this.point3.normal.y;
        pointArray[i*18+ 14]= this.point3.normal.z;

        pointArray[i*18+ 15]= this.point4.normal.x;
        pointArray[i*18+ 16]= this.point4.normal.y;
        pointArray[i*18+ 17]= this.point4.normal.z;
    }
    return pointArray;
}
HJ_One_Side.prototype.getPositionBufferKey = function (gl)
{
    if(this.positionBufferKey == undefined)
    {
        this.positionBufferKey = gl.createBuffer();
        var pointArray = this.getPositionArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);

    }
    return this.positionBufferKey;
}

HJ_One_Side.prototype.getTexBufferKey = function (gl)
{
    if(this.textureBufferKey == undefined)
    {
        this.textureBufferKey = gl.createBuffer();
        var pointArray = this.getTexArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);

    }
    return this.textureBufferKey;
}

HJ_One_Side.prototype.getNormalBufferKey = function (gl)
{
    if(this.normalBufferKey == undefined)
    {
        this.normalBufferKey = gl.createBuffer();
        var pointArray = this.getNormalArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);

    }
    return this.normalBufferKey;
}

HJ_One_Side.prototype.draw = function (gl, shaderProgram, hjLoader)
{
    Cesium.Transforms.eastNorthUpToFixedFrame(this.location, undefined, this.transforMat4);

    this.transforMat4[12] = 0;
    this.transforMat4[13] = 0;
    this.transforMat4[14] = 0;

    //gl.disable(gl.TEXTURE_2D);
    if(this.ImageID == undefined && this.ImageLoadingStarted == false)
    {
        var ImagePath = "/MyImages/map.jpg";
        hjLoader.loadImage(gl, ImagePath, this);
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
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.enableVertexAttribArray(shaderProgram.aTexcoord);

    //gl.disableVertexAttribArray(shaderProgram.aTexcoord);

    var RectanglePositionBufferKey = this.getPositionBufferKey(gl);
    var RectangleNormalBufferKey = this.getNormalBufferKey(gl);
    var RectangleTextureBufferKey = this.getTexBufferKey(gl);

    gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);

    gl.bindBuffer(gl.ARRAY_BUFFER,RectanglePositionBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, RectangleNormalBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, RectangleTextureBufferKey);
    gl.vertexAttribPointer(shaderProgram.aTexcoord, 2, gl.FLOAT, false, 0,0);
    gl.drawArrays(gl.TRIANGLES, 0, 6 );
}
var HJ_Ground_1 = function ()
{
    this.up = [];
    this.dw = [];
    this.main_pointArray = [];
    this.triangleArray = [];

    this.positionBufferKey = undefined;
    this.NormalBufferKey = undefined;
    this.TexCoordBufferKey = undefined;

    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 2000.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
    this.ImageID = undefined;
    this.ImageLoadingStarted = false;
}
HJ_Ground_1.prototype.makeGround = function (n,m)
{
    var mx = 0;
    var ny = 0;
    var l = 0;
    for(var i = 0 ; i < n+1; i++)
    {
        this.pointlist = [];
        for(var j = 0 ; j < m; j++)
        {
            var point = new Game_Point();
            point.set(mx,ny,0);
            this.pointlist.push(point);
            mx += 1000;
        }
        this.main_pointArray.push(this.pointlist);

        mx = 0;
        ny += 1000;

    }


    for(var i = 0 ; i < n; i++)
    {

        var sincre = 1/ m;
        var tincre = 1/ n;


        var dw = this.main_pointArray[i];
        var up = this.main_pointArray[i+1];
        for(var j = 0 ; j < m-1; j++)
        {
            var dwpoint1 = dw[j];
            var dwpoint2 = dw[j+1];
            var uppoint1 = up[j];
            var uppoint2 = up[j+1];

            var minx = 0;
            var maxx = 1000*m;
            var s =  (dwpoint2-minx)/maxx;
            var dw1ps = dwpoint1/(maxx);
            var dw1pt = (0);

            var dw2ps =( dwpoint2-dwpoint1)/(maxx);
            var dw2pt = (0);

            var up1ps = (sincre*(j));
            var up1pt = (tincre*j);

            var up2ps = (sincre*(j+1));
            var up2pt = (tincre*(j+1));

            var triangle = new HJ_Triangle();
            triangle.set(dwpoint1.x,dwpoint1.y,dwpoint1.z, dwpoint2.x,dwpoint2.y,dwpoint2.z, uppoint2.x,uppoint2.y,uppoint2.z);
           //triangle.setTexcoord(0,0,1,0,1,1);
            triangle.setTexcoord(dw1ps,dw1pt,dw2ps,dw2pt,1,1);
            this.triangleArray.push(triangle);
            triangle = new HJ_Triangle();
            triangle.set(dwpoint1.x,dwpoint1.y,dwpoint1.z,  uppoint2.x,uppoint2.y,uppoint2.z, uppoint1.x,uppoint1.y,uppoint1.z);
           // triangle.setTexcoord(0,0,1,1,0,1);
          //  triangle.setTexcoord(dw1ps,dw1pt,up2ps,up2pt,up1ps,up1pt);
          //  this.triangleArray.push(triangle);
        }

    }
}

HJ_Ground_1.prototype.getPositionArray = function ()
{
    var count = this.triangleArray.length;
    var floatvaluse = count * 3 * 3;
    var pointArray = new Float32Array(floatvaluse);
    for(var i = 0 ; i < count; i++)
    {
        var point = this.triangleArray[i];
        pointArray[i*9] = point.point1.x;
        pointArray[i*9+1] = point.point1.y;
        pointArray[i*9+2] = point.point1.z;

        pointArray[i*9+3] = point.point2.x;
        pointArray[i*9+4] = point.point2.y;
        pointArray[i*9+5] = point.point2.z;

        pointArray[i*9+6] = point.point3.x;
        pointArray[i*9+7] = point.point3.y;
        pointArray[i*9+8] = point.point3.z;

    }
    return pointArray
}

HJ_Ground_1.prototype.getNormalArray = function ()
{
    var count = this.triangleArray.length;
    var floatvaluse = count * 3 * 3;
    var pointArray = new Float32Array(floatvaluse);
    for(var i = 0 ; i < count; i++)
    {
        var point = this.triangleArray[i];
        pointArray[i*9] = point.point1.normal.x;
        pointArray[i*9+1] = point.point1.normal.y;
        pointArray[i*9+2] = point.point1.normal.z;

        pointArray[i*9+3] = point.point2.normal.x;
        pointArray[i*9+4] = point.point2.normal.y;
        pointArray[i*9+5] = point.point2.normal.z;

        pointArray[i*9+6] = point.point3.normal.x;
        pointArray[i*9+7] = point.point3.normal.y;
        pointArray[i*9+8] = point.point3.normal.z;

    }
    return pointArray;
}
HJ_Ground_1.prototype.getTexArray = function ()
{
    var count = this.triangleArray.length;
    var floatvaluse = count * 2 * 3;
    var pointArray = new Float32Array(floatvaluse);
    for(var i = 0 ; i < count; i++)
    {
        var point = this.triangleArray[i];

        pointArray[i*6] = point.point1.texCoord.x;
        pointArray[i*6+1] = point.point1.texCoord.y;

        pointArray[i*6+2] = point.point2.texCoord.x;
        pointArray[i*6+3] = point.point2.texCoord.y;

        pointArray[i*6+4] = point.point3.texCoord.x;
        pointArray[i*6+5] = point.point3.texCoord.y;
    }
    return pointArray;
}
HJ_Ground_1.prototype.getPositionBufferKey = function (gl)
{
    if(this.positionBufferKey == undefined)
    {
        this.positionBufferKey = gl.createBuffer();
        var pointArray = this.getPositionArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);
    }
    return this.positionBufferKey;
}
HJ_Ground_1.prototype.getNormalBufferKey = function (gl)
{
    if(this.normalBufferKey == undefined)
    {
        this.normalBufferKey = gl.createBuffer();
        var pointArray = this.getNormalArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);
    }
    return this.normalBufferKey;
}
HJ_Ground_1.prototype.getTexBufferKey = function (gl)
{
    if(this.texCoordBufferKey == undefined)
    {
        this.texCoordBufferKey = gl.createBuffer();
        var pointArray = this.getTexArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);
    }
    return this.texCoordBufferKey;
}
HJ_Ground_1.prototype.draw = function (gl, shaderProgram, hjLoader)
{
    Cesium.Transforms.eastNorthUpToFixedFrame(this.location, undefined, this.transforMat4);

    this.transforMat4[12] = 0;
    this.transforMat4[13] = 0;
    this.transforMat4[14] = 0;

    //gl.disable(gl.TEXTURE_2D);
    if(this.ImageID == undefined && this.ImageLoadingStarted == false)
    {
        var ImagePath = "/MyImages/hojunbox.jpg";
        hjLoader.loadImage(gl, ImagePath, this);
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
    var texCoordBufferKey = this.getTexBufferKey(gl);
    var count = this.triangleArray.length;
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.enableVertexAttribArray(shaderProgram.aTexcoord);

    gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferKey );
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3 , gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferKey );
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3 , gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBufferKey );
    gl.vertexAttribPointer(shaderProgram.aTexcoord, 2 , gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, count * 3 );

}

var HJ_Ground = function ()
{
    this.triangleArray = [];
    this.pointArray = [];

    this.positionBufferKey = undefined;
    this.normalBufferKey = undefined;
    this.texBufferKey = undefined;

    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 2000.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
    this.ImageID = undefined;
    this.ImageLoadingStarted = false;

}

HJ_Ground.prototype.makeGround = function (x_size,y_size,x_count,y_count)
{
    var j=0;
    var point_y=0;
    for(var j = 0 ; j < y_count+1; j++)
    {
        this.point = [];
             var point_x = 0;
             for(var i = 0 ; i < x_count+1;i++)
             {
                 var point = new Game_Point();
                 point.set(point_x, point_y, 0);
                 point.normal.set(0,0,1);
                 this.point.push(point);
                 point_x += (x_size/x_count);
             }
             point_y += y_size/y_count;
             this.pointArray.push(this.point);


    }



        for(var i = 0 ; i < y_count; i++)
        {
            var dw = this.pointArray[i];
            var up = this.pointArray[i+1];



            for(var j = 0 ; j < x_count; j++)
            {
                var dwpoint1 = dw[j];
                var dwpoint2 = dw[j+1];

                var uppoint1 = up[j];
                var uppoint2 = up[j+1];

                var triangle = new HJ_Triangle();
                triangle.set(dwpoint1.x,dwpoint1.y,dwpoint1.z, dwpoint2.x,dwpoint2.y,dwpoint2.z, uppoint2.x,uppoint2.y,uppoint2.z);
              //  triangle.setTexcoord(0,0,1,0,1,1);
                this.triangleArray.push(triangle);
                triangle = new HJ_Triangle();
                triangle.set(dwpoint1.x,dwpoint1.y,dwpoint1.z, uppoint2.x,uppoint2.y,uppoint2.z, uppoint1.x,uppoint1.y,uppoint2.z);
                //triangle.setTexcoord(0,0,1,0,1,1);
                this.triangleArray.push(triangle);
            }
        }

        // Calculate texCoords.**************************************************
    var texCoordMaker = new HJ_RectangleTextureMaker(0,x_size,0,y_size);

        var count = this.triangleArray.length;
        for(var i = 0; i < count; i++)
        {
            var triangle = this.triangleArray[i];
           var texC = texCoordMaker.getTexCoord(triangle.point1.x,triangle.point1.y);
           triangle.point1.texCoord.set(texC.x,texC.y);
           texC = texCoordMaker.getTexCoord(triangle.point2.x,triangle.point2.y);
            triangle.point2.texCoord.set(texC.x,texC.y);
            texC = texCoordMaker.getTexCoord(triangle.point3.x,triangle.point3.y);
            triangle.point3.texCoord.set(texC.x,texC.y);

        }
}

HJ_Ground.prototype.getPositionArray = function ()
{
    var count = this.triangleArray.length;
    var floatvalues = count * 3 * 3;
    var triangleArray = new Float32Array(floatvalues);

    for(var  i = 0 ; i < count; i ++)
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
HJ_Ground.prototype.getNormalArray = function ()
{
    var count = this.triangleArray.length;
    var floatvalues = count * 3 * 3;
    var triangleArray = new Float32Array(floatvalues);

    for(var  i = 0 ; i < count; i ++)
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
HJ_Ground.prototype.getTexCoordArray = function ()
{
    var count = this.triangleArray.length;
    var floatvalues = count * 2 * 3;
    var triangleArray = new Float32Array(floatvalues);

    for(var  i = 0 ; i < count; i ++)
    {
        var triangle = this.triangleArray[i];
        triangleArray[i*6] = triangle.point1.texCoord.x;
        triangleArray[i*6+1] = triangle.point1.texCoord.y;

        triangleArray[i*6+2] = triangle.point2.texCoord.x;
        triangleArray[i*6+3] = triangle.point2.texCoord.y;

        triangleArray[i*6+4] = triangle.point3.texCoord.x;
        triangleArray[i*6+5] = triangle.point3.texCoord.y;

    }
    return triangleArray;
}
HJ_Ground.prototype.getPositionBufferKey = function (gl)
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
HJ_Ground.prototype.getNormalBufferKey = function (gl)
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
HJ_Ground.prototype.getTexCoordBufferKey = function (gl)
{
    if(this.texBufferKey == undefined)
    {
        this.texBufferKey = gl.createBuffer();
        var triangleArray = this.getTexCoordArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
    }
    return this.texBufferKey;
}
HJ_Ground.prototype.draw = function (gl, shaderProgram, hjLoader)
{
    Cesium.Transforms.eastNorthUpToFixedFrame(this.location, undefined, this.transforMat4);

    this.transforMat4[12] = 0;
    this.transforMat4[13] = 0;
    this.transforMat4[14] = 0;

    //gl.disable(gl.TEXTURE_2D);
    if(this.ImageID == undefined && this.ImageLoadingStarted == false)
    {
        var ImagePath = "/MyImages/hojunbox.jpg";
        hjLoader.loadImage(gl, ImagePath, this);
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
    var texBufferKey = this.getTexCoordBufferKey(gl);

    var count  = this.triangleArray.length;
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.enableVertexAttribArray(shaderProgram.aTexcoord);

    gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, texBufferKey);
    gl.vertexAttribPointer(shaderProgram.aTexcoord, 2, gl.FLOAT, false, 0,0);
    gl.drawArrays(gl.TRIANGLES, 0 , count * 3);
}
var HJ_RectangleTextureMaker = function (min_x,max_x, min_y,max_y)
{
    this.minx = min_x;
    this.maxx = max_x;
    this.miny = min_y;
    this.maxy = max_y;
    this.width = max_x-min_x;
    this.height = max_y-min_y;



}
HJ_RectangleTextureMaker.prototype.getTexCoord = function (x,y)
{
    var texCoord = new Point_2D();
    var s = (x-this.minx)/this.width;
    var t = (y-this.miny)/this.height;
    texCoord.set(s,t);
    return texCoord;
}

var HJ_63buliding = function ()
{
    this.triangleArray = [];
    this.pointArray = [];

    this.traingleBufferKey = undefined;
    this.normalBufferKey = undefined;
    this.texCoordBufferKey = undefined;

    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 2000.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
    this.ImageID = undefined;
    this.ImageLoadingStarted = false;
}
HJ_63buliding.prototype.makebulidng = function ()
{
    var height = 63;
    var x = 0;
    var z = 0;
    var y = 0;
    for(var i = 0 ; i < height+1; i++)
    {
        var pointarray = [];
        x = 0;
        for(var j = 0; j < 15; j++)
        {
            var point = new Game_Point();
            point.set(x,y,z);
            point.normal.set(0,0,1);
            pointarray.push(point);
            x += 20;
        }
        z += 40;
        y += 10;
        this.pointArray.push(pointarray);
    }

    //trianglemake*****************************************************
    for(var i = 0 ; i < height;i++)
    {
        var dw = this.pointArray[i];
        var up = this.pointArray[i+1];

        for(var j = 0; j < 14; j++)
        {
            var dwpoint1 = dw[j]
            var dwpoint2 = dw[j+1]

            var uppoint1 = up[j];
            var uppoint2 = up[j+1];

            var triangle = new HJ_Triangle();
            triangle.set(dwpoint1.x,dwpoint1.y,dwpoint1.z, dwpoint2.x,dwpoint2.y,dwpoint2.z, uppoint2.x,uppoint2.y,uppoint2.z);
            triangle.setTexcoord(0,0, 1,0, 1,1);
            this.triangleArray.push(triangle);
            triangle = new HJ_Triangle();
            triangle.set(dwpoint1.x,dwpoint1.y,dwpoint1.z, uppoint2.x,uppoint2.y,uppoint2.z, uppoint1.x,uppoint1.y,uppoint1.z);
            triangle.setTexcoord(0,0, 1,0, 1,1);
            this.triangleArray.push(triangle);

        }
    }
}
HJ_63buliding.prototype.getTriangleArray = function ()
{
    var count = this.triangleArray.length;
    var floatvaluse = count * 3 * 3;
    var triangleArray = new Float32Array(floatvaluse);
    for(var i = 0 ; i < count; i++)
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

HJ_63buliding.prototype.getNormalArray = function ()
{
    var count = this.triangleArray.length;
    var floatvaluse = count * 3 * 3;
    var triangleArray = new Float32Array(floatvaluse);
    for(var i = 0 ; i < count; i++)
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

HJ_63buliding.prototype.getTexCoordArray = function ()
{
    var count = this.triangleArray.length;
    var floatvaluse = count * 2 * 3;
    var triangleArray = new Float32Array(floatvaluse);
    for(var i = 0 ; i < count; i++)
    {
        var triangle = this.triangleArray[i];
        triangleArray[i*6] = triangle.point1.texCoord.x;
        triangleArray[i*6+1] = triangle.point1.texCoord.y;

        triangleArray[i*6+2] = triangle.point2.texCoord.x;
        triangleArray[i*6+3] = triangle.point2.texCoord.y;

        triangleArray[i*6+4] = triangle.point3.texCoord.x;
        triangleArray[i*6+5] = triangle.point3.texCoord.y;
    }
    return triangleArray;
}
HJ_63buliding.prototype.getTriangleBufferKey = function (gl)
{
    if(this.traingleBufferKey == undefined)
    {
        this.traingleBufferKey = gl.createBuffer();
        var triangleArray = this.getTriangleArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.traingleBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
    }
    return this.traingleBufferKey;
}
HJ_63buliding.prototype.getNormalBufferKey = function (gl)
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
HJ_63buliding.prototype.getTexCoorBufferKey = function (gl)
{
    if(this.texCoordBufferKey == undefined)
    {
        this.texCoordBufferKey = gl.createBuffer();
        var triangleArray = this.getTexCoordArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleArray, gl.STATIC_DRAW);
    }
    return this.texCoordBufferKey;
}

HJ_63buliding.prototype.draw = function (gl,shaderProgram,hjLoader)
{
    Cesium.Transforms.eastNorthUpToFixedFrame(this.location, undefined, this.transforMat4);

    this.transforMat4[12] = 0;
    this.transforMat4[13] = 0;
    this.transforMat4[14] = 0;

    //gl.disable(gl.TEXTURE_2D);
    if(this.ImageID == undefined && this.ImageLoadingStarted == false)
    {
        var ImagePath = "/MyImages/window.jpg";
        hjLoader.loadImage(gl, ImagePath, this);
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

    var positionBufferKey = this.getTriangleBufferKey(gl);
    var normalBufferKey = this.getNormalBufferKey(gl);
    var texBufferKey = this.getTexCoorBufferKey(gl);

    var count  = this.triangleArray.length;
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.enableVertexAttribArray(shaderProgram.aTexcoord);

    gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, texBufferKey);
    gl.vertexAttribPointer(shaderProgram.aTexcoord, 2, gl.FLOAT, false, 0,0);
    gl.drawArrays(gl.TRIANGLES, 0 , count * 3);
}
