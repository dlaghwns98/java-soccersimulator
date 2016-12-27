/**
 * Created by hojun Lim on 2016-12-14.
 */
var HJ_Polygon = function ()
{
    this.pointlist = new Game_PointList();
    this.lineArray = [];

    this.pointBufferKey = undefined;
    this.NormalBufferKey = undefined;
    this.TexBufferKey = undefined;

    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 2000.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
    this.ImageID = undefined;
    this.ImageLoadingStarted = false;
}
HJ_Polygon.prototype.makePolygon = function ()
{
    var x = 1000;
    var y = 1000;
    var z = 0;

   // this.pointlist.makepolygon(x,y,z);
}

 HJ_Polygon.prototype.getPointArray = function ()
 {
    var count = this.lineArray.length;
    var floatvalues = count * 2 * 3;
    var lineArray = new Float32Array(floatvalues);

    for(var i = 0 ; i < count; i++)
    {
        var linelist = this.lineArray[i];
        for(var j = 0; j < 1; j++)
        {
            var line = linelist[j];
            var line2 = linelist[j+1];
            lineArray[i*6] = line.x;
            lineArray[i*6+1] = line.y;
            lineArray[i*6+2] = line.z;

            lineArray[i*6+3] = line2.x;
            lineArray[i*6+4] = line2.y;
            lineArray[i*6+5] = line2.z;
        }

    }
    return lineArray;
 }

HJ_Polygon.prototype.getNormalArray = function ()
{
    var count = this.lineArray.length;
    var floatvalues = count * 2 * 3;
    var lineArray = new Float32Array(floatvalues);

    for(var i = 0 ; i < count; i++)
    {
        var linelist = this.lineArray[i];
        for(var j = 0; j < 1; j++)
        {
            var line = linelist[j];
            var line2 = linelist[j+1];
            lineArray[i*6] = line.normal.x;
            lineArray[i*6+1] = line.normal.y;
            lineArray[i*6+2] = line.normal.z;

            lineArray[i*6+3] = line2.normal.x;
            lineArray[i*6+4] = line2.normal.y;
            lineArray[i*6+5] = line2.normal.z;
        }

    }
    return lineArray;
}

HJ_Polygon.prototype.getTexCoordArray = function ()
{
    var count = this.lineArray.length;
    var floatvalues = count * 2 * 2;
    var lineArray = new Float32Array(floatvalues);

    for(var i = 0 ; i < count; i++)
    {
        var linelist = this.lineArray[i];
        for(var j = 0; j < 1; j++)
        {
            var line = linelist[j];
            var line2 = linelist[j+1];
            lineArray[i*4] = line.texCoord.x;
            lineArray[i*4+1] = line.texCoord.y;

            lineArray[i*4+2] = line2.texCoord.x;
            lineArray[i*4+3] = line2.texCoord.y;
        }

    }
    return lineArray;
}
HJ_Polygon.prototype.getPointBufferKey = function (gl)
{
    if(this.pointBufferKey == undefined)
    {
        this.pointBufferKey = gl.createBuffer();
        var lineArray = this.getPointArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.pointBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, lineArray, gl.STATIC_DRAW);
    }
    return this.pointBufferKey;
}

HJ_Polygon.prototype.getNormalBufferKey = function (gl)
{
    if(this.NormalBufferKey == undefined)
    {
        this.NormalBufferKey = gl.createBuffer();
        var lineArray = this.getNormalArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.NormalBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, lineArray, gl.STATIC_DRAW);
    }
    return this.NormalBufferKey;
}

HJ_Polygon.prototype.getTexBufferKey = function (gl)
{
    if(this.TexBufferKey == undefined)
    {
        this.TexBufferKey = gl.createBuffer();
        var lineArray = this.getTexCoordArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.TexBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, lineArray, gl.STATIC_DRAW);
    }
    return this.TexBufferKey;
}

HJ_Polygon.prototype.draw = function (gl, shaderProgram, hjLoader)
{
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

        gl.lineWidth(5);
        var maxWidth = gl. getParameter(gl.ALIASED_LINE_WIDTH_RANGE );

        var positionBufferKey = this.getPointBufferKey(gl);
        var normalBufferKey = this.getNormalBufferKey(gl);
        var texBufferKey = this.getTexBufferKey(gl);

        var count  = this.lineArray.length;
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
        gl.drawArrays(gl.LINES, 0 , count * 2);
    }
}
var HJ_polygon2 = function ()
{
    this.pointlist = new Game_PointList();
    this.pointArray = [];
    this.open = true;
    this.pointBufferKey == undefined;
    this.normalBufferKey == undefined;
    this.texCoordBufferKey == undefined;
    this.z = 0;

    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 2000.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
    this.ImageID = undefined;
    this.ImageLoadingStarted = false;
    this.result_x  = 0;
    this.result_y  = 0;
    this.result_z  = 0;
    this.textureAux_1x1 = undefined;
}
HJ_polygon2.prototype.makePolygon = function ()
{
    var x =0;
    var y =0;
    this.z = 0;
    //this.pointlist.makepolygon(x,y,this.z);
    //this.pointlist.makeline(x,y,this.z);
    var count = 10;
    this.open = false;
    /*
     for(var i = 0 ; i <= count; i++ )
     {
     var point = new Game_Point();
     point.set(x,y,this.z);
     this.pointlist.pointArray.push(point);
     x +=100;
     }
     */
    /*
     var point = new Game_Point();
     point.set(1000,0,7000);
     this.pointArray.push(point);
     point = new Game_Point();
     point.set(3000,0,5000);
     this.pointArray.push(point);
     point = new Game_Point();
     point.set(3000,0,4000);
     this.pointArray.push(point);
     point = new Game_Point();
     point.set(2000,0,3000);
     this.pointArray.push(point);
     point = new Game_Point();
     point.set(2000,0,2000);
     this.pointArray.push(point);
     point = new Game_Point();
     point.set(3000,0,1000);
     this.pointArray.push(point);
     point = new Game_Point();
     point.set(3000,0,0);
     this.pointArray.push(point);

    /*
    count = 36;
    var incRad = (180/count)*Math.PI/180;
    var angle = 0;
     for(var i = 0 ; i < count; i++)
     {
     var point = new Game_Point();
     point.set(1000*Math.sin(angle),0,1000*Math.cos(angle));
     angle += incRad;
     this.pointArray[i] = point;
     }

     */
    /*
    var point = new Game_Point();
    point.set(0,0,8200);
    this.pointArray.push(point);
    point = new Game_Point();
    point.set(1000,0,8200);
    this.pointArray.push(point);
    point = new Game_Point();
    point.set(1000,0,8000);
    this.pointArray.push(point);
    point = new Game_Point();
    point.set(3000,0,8000);
    this.pointArray.push(point);
    point = new Game_Point();
    point.set(3000,0,1000);
    this.pointArray.push(point);
    point = new Game_Point();
    point.set(2000,0,1000);
    this.pointArray.push(point);
    point = new Game_Point();
    point.set(2000,0,500);
    this.pointArray.push(point);
    point = new Game_Point();
    point.set(0,0,500);
    this.pointArray.push(point);
    */
    var point = new Game_Point();
    point.set(1000,0,7000);
    this.pointArray.push(point);
    point = new Game_Point();
    point.set(3000,0,7000);
    this.pointArray.push(point);
    point = new Game_Point();
    point.set(3000,0,2000);
    this.pointArray.push(point);
    point = new Game_Point();
    point.set(1000,0,2000);
    this.pointArray.push(point);
}
HJ_polygon2.prototype.getPointArray = function ()
{
    var count = this.pointlist.pointArray.length;
    var floatvaluse = count * 3;
    var pointArray = new Float32Array(floatvaluse);

    for(var i = 0 ; i < count; i++)
    {
        var point = this.pointlist.pointArray[i];
        pointArray[i*3] = point.x;
        pointArray[i*3+1] = point.y;
        pointArray[i*3+2] = point.z;
    }
    return pointArray
}

HJ_polygon2.prototype.getNormalArray = function ()
{
    var count = this.pointlist.pointArray.length;
    var floatvaluse = count * 3;
    var pointArray = new Float32Array(floatvaluse);

    for(var i = 0 ; i < count; i++)
    {
        var point = this.pointlist.pointArray[i];
        pointArray[i*3] = point.normal.x;
        pointArray[i*3+1] = point.normal.y;
        pointArray[i*3+2] = point.normal.z;
    }
    return pointArray
}

HJ_polygon2.prototype.getTexCoordArray = function ()
{
    var count = this.pointlist.pointArray.length;
    var floatvaluse = count * 2;
    var pointArray = new Float32Array(floatvaluse);

    for(var i = 0 ; i < count; i++)
    {
        var point = this.pointlist.pointArray[i];
        pointArray[i*3] = point.texCoord.x;
        pointArray[i*3+1] = point.texCoord.y;
    }
    return pointArray
}

HJ_polygon2.prototype.getPoinBufferKey = function (gl)
{
    if(this.pointBufferKey == undefined)
    {
        this.pointBufferKey = gl.createBuffer();
        var pointArray = this.getPointArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.pointBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);
    }
    return this.pointBufferKey;
}

HJ_polygon2.prototype.getNormalBufferKey = function (gl)
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

HJ_polygon2.prototype.getTexCoordBufferKey = function (gl)
{
    if(this.texCoordBufferKey == undefined)
    {
        this.texCoordBufferKey = gl.createBuffer();
        var pointArray = this.getTexCoordArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);
    }
    return this.texCoordBufferKey;
}

HJ_polygon2.prototype.draw = function (gl, shaderProgram, hjLoader)
{
        Cesium.Transforms.eastNorthUpToFixedFrame(this.location, undefined, this.transforMat4);

        this.transforMat4[12] = 0;
        this.transforMat4[13] = 0;
        this.transforMat4[14] = 0;

        //gl.disable(gl.TEXTURE_2D);

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

        gl.lineWidth(5);
        var maxWidth = gl. getParameter(gl.ALIASED_LINE_WIDTH_RANGE );

        var positionBufferKey = this.getPoinBufferKey(gl);
        var normalBufferKey = this.getNormalBufferKey(gl);
        var texBufferKey = this.getTexCoordBufferKey(gl);

        var count  = this.pointlist.pointArray.length;
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
        gl.drawArrays(gl.LINE_LOOP, 0 , count );

}
var HJ_3Dobj = function ()
{
    this.polygon = new HJ_polygon2();
    this.polygonArray = [];
    this.triangleArray = [];
    this.pointArray = [];

    this.positionBufferKey = undefined;
    this.normalBufferKey = undefined;
    this.texcoordBufferKey = undefined;

    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 2000.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
    this.ImageID = undefined;
    this.ImageLoadingStarted = false;

    this.textureAux_1x1 = undefined;
}
HJ_3Dobj.prototype.make3Dobj_extrude = function (dir_x,dir_y,dir_z,dis,count)
{
    var distance = dis/count;
    var current_x = 0;
    var current_y = 0;
    var current_z = 0;
    var point = [];
    var x = 0;
    var y = 0;
    this.polygon.makePolygon();

    var module = Math.sqrt(dir_x*dir_x + dir_y*dir_y + dir_z*dir_z);
    var ndx = dir_x/module;
    var ndy = dir_y/module;
    var ndz = dir_z/module;

     for(var i = 0 ; i < this.polygon.pointlist.pointArray.length; i++)
     {
         var polygon = this.polygon.pointlist.pointArray[i];
         point[i] = polygon;
     }

     var polygonPointArray = [];
     polygonPointArray.push(point);

         for(var i = 0 ;i <= count; i++)
         {
         var pointArray1 = [];
         var pointArrray = polygonPointArray[0];
         for(var j = 0; j < pointArrray.length; j++)
             {
             var Polygon_point = pointArrray[j];
             Polygon_point.x = Polygon_point.x + ndx * distance;
             Polygon_point.y = Polygon_point.y + ndy * distance;
             Polygon_point.z = Polygon_point.z + ndz * distance;
             var point = new Game_Point();
             point.set(Polygon_point.x,Polygon_point.y,Polygon_point.z);
             pointArray1[j] = point ;
             }
               //  this.polygon.z += distance;
                 this.polygonArray[i] = pointArray1;


        }



    for(var i = 0 ; i < this.polygonArray.length-1; i++)
    {

        var dw = this.polygonArray[i];
        var up = this.polygonArray[i+1];

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
                    this.triangleArray.push(triangle);
                    triangle = new HJ_Triangle();
                    triangle.set(dw1.x,dw1.y,dw1.z, up2.x,up2.y,up2.z, up1.x,up1.y,up1.z);
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
               // triangle.set(dw1.x,dw1.y,dw1.z, dw2.x,dw2.y,dw2.z, up2.x,up2.y,up2.z);
                triangle.setTexcoord(0,0, 1,0, 1,1);
                this.triangleArray.push(triangle);
                triangle = new HJ_Triangle();
                //triangle.set(dw1.x,dw1.y,dw1.z, up2.x,up2.y,up2.z, up1.x,up1.y,up1.z);
                triangle.setTexcoord(0,0, 1,0, 1,1);
                this.triangleArray.push(triangle);
            }

        }
    }
}

HJ_3Dobj.prototype.setClose = function()
{
    this.polygon.open = false;
}
HJ_3Dobj.prototype.setOpen = function()
{
    this.polygon.open = true;
}

HJ_3Dobj.prototype.getPositionArray = function ()
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
HJ_3Dobj.prototype.getNormalArray = function ()
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
HJ_3Dobj.prototype.getTexCoordArray = function ()
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
HJ_3Dobj.prototype.getPositionBufferKey = function (gl)
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
HJ_3Dobj.prototype.getNormalBufferKey = function (gl)
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
HJ_3Dobj.prototype.getTexCoordBuffer = function (gl)
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
HJ_3Dobj.prototype.draw = function (gl, shaderProgram, hjLoader)
{
    Cesium.Transforms.eastNorthUpToFixedFrame(this.location, undefined, this.transforMat4);

    this.transforMat4[12] = 0;
    this.transforMat4[13] = 0;
    this.transforMat4[14] = 0;

    //gl.disable(gl.TEXTURE_2D);

    if(this.textureAux_1x1 == undefined)
    {
        this.textureAux_1x1 = gl.createTexture();
        // Test wait for texture to load.********************************************
        gl.bindTexture(gl.TEXTURE_2D, this.textureAux_1x1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255])); // red
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
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, texBufferKey);
    gl.vertexAttribPointer(shaderProgram.aTexcoord, 2, gl.FLOAT, false, 0,0);
    gl.drawArrays(gl.TRIANGLES, 0 , count * 3);
}
var HJ_3Dobj_Revolution = function()
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

HJ_3Dobj_Revolution.prototype.setPosition = function(longitude, latitude)
{
    this.lon = longitude;
    this.lat = latitude;
}
HJ_3Dobj_Revolution.prototype.getPosition = function()
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


HJ_3Dobj_Revolution.prototype.make3D_Revolution = function(x,y,z)
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
HJ_3Dobj_Revolution.prototype.getPositionArray = function ()
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
HJ_3Dobj_Revolution.prototype.getNormalArray = function ()
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
HJ_3Dobj_Revolution.prototype.getTexCoordArray = function ()
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
HJ_3Dobj_Revolution.prototype.getPositionBufferKey = function (gl)
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
HJ_3Dobj_Revolution.prototype.getNormalBufferKey = function (gl)
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
HJ_3Dobj_Revolution.prototype.getTexCoordBuffer = function (gl)
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
HJ_3Dobj_Revolution.prototype.draw = function (gl, shaderProgram, r,g,b,a, ballMat4)
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

var HJ_SpaceShip = function()
{
    this.body_front = new HJ_3Dobj_Revolution();
    this.ufo = new HJ_3Dobj_Revolution();

    this.wing = new HJ_3Dobj_Revolution();
    this.wing2 = new HJ_3Dobj_Revolution();
    this.rotation = new Game_Point();
    this.position = new Game_Point();
    this.pointArray = [];
    this.ufo_make = false;
}
HJ_SpaceShip.prototype.makeUFO = function ()
{
    var point = new Game_Point();
    point.set(0,0,7000);
    this.ufo.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1000,0,6500);
    this.ufo.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(2000,0,5500);
    this.ufo.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(3000,0,5000);
    this.ufo.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(4000,0,4500);
    this.ufo.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(3000,0,4000);
    this.ufo.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(2000,0,4500);
    this.ufo.polygon.pointArray.push(point);
    this.ufo.make3D_Revolution(0,0,1);
}

HJ_SpaceShip.prototype.drawUFO = function (gl,shaderProgram , lon ,lat)
{
    var transMat4 = mat4.create();
    mat4.identity(transMat4);
    var rotateMat4 = mat4.create();
    mat4.identity(rotateMat4);
    var identiyMat4 = mat4.create();
    mat4.identity(identiyMat4);

    mat4.rotate(rotateMat4, this.rotation.z, [0,0,1]);

    mat4.translate(transMat4, [lon ,lat,0], identiyMat4);
    mat4.multiply(identiyMat4, rotateMat4);
    this.ufo.draw(gl, shaderProgram, 150,150,150,255, identiyMat4);
    this.rotation.z +=0.1;
}

HJ_SpaceShip.prototype.makebodyfront = function()
{

    var point = new Game_Point();
    point.set(0,0,10000);
    this.body_front.polygon.pointArray.push(point);
    var point = new Game_Point();
    point.set(300,0,9700);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(500,0,9400);
    this.body_front.polygon.pointArray.push(point);


    //wing****************************************************

    point = new Game_Point();
    point.set(2000,0,9400);
    this.wing.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(3000,0,9400);
    this.wing.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(3000,0,8000);
    this.wing.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(2000,0,8000);
    this.wing.polygon.pointArray.push(point);

    //wing****************************************************

    //win2g****************************************************

    point = new Game_Point();
    point.set(2000,0,9400);
    this.wing2.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(3000,0,9400);
    this.wing2.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(3000,0,8000);
    this.wing2.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(2000,0,8000);
    this.wing2.polygon.pointArray.push(point);

    //wing2****************************************************

    point = new Game_Point();
    point.set(1000,0,8000);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(900,0,7800);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(900,0,7600);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1200,0,7500);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1200,0,6000);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1100,0,5800);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1100,0,5600);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1400,0,5500);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1400,0,3000);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(500,0,2900);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(500,0,2800);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1600,0,2750);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1600,0,0);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1000,0,-500);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1300,0,-600);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1300,0,-1100);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1300,0,-2000);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1000,0,-2000);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(900,0,-2000);
    this.body_front.polygon.pointArray.push(point);
    point = new Game_Point();
    point.set(1000,0,-2100);
    this.body_front.polygon.pointArray.push(point);
    this.body_front.make3D_Revolution(0,0,1);
    this.wing.make3D_Revolution(0,0,1);
    this.wing2.make3D_Revolution(0,0,1);

}
HJ_SpaceShip.prototype.draw = function (gl, shaderProgram)
{

    var transMat4 = mat4.create();
    mat4.identity(transMat4);
    var rotateMat4 = mat4.create();
    mat4.identity(rotateMat4);
    var identiyMat4 = mat4.create();
    mat4.identity(identiyMat4);

    this.body_front.draw(gl, shaderProgram, 255,255,255,255, identiyMat4);
    transMat4 = mat4.create();
    mat4.identity(transMat4);
    mat4.translate(transMat4, [0,0,-7500], identiyMat4);
    this.wing.draw(gl, shaderProgram, 150,150,150,255, identiyMat4);

    mat4.identity(identiyMat4);
    mat4.identity(transMat4);
    mat4.translate(transMat4, [0,0,-3000], identiyMat4);
    this.wing2.draw(gl, shaderProgram, 150,150,150,255, identiyMat4);

}
var HJ_Ship = function () {
    this.ship_body = new Cesium_SuperObj();

}
HJ_Ship.prototype = function () {
    var shipbody1 = this.ship_body.newPointlist();
    shipbody1.set(3000,0,0);

}