/**
 * Created by hojun Lim on 2016-11-03.
 */
var Game_SuperObj = function ()
{
    this.pointlist_contaner = [];
    this.trianglelist = new Game_TriangleList();
    this.bbox = new Game_Bounding_Box();
    this.Axis = new Game_Axis();

    this.position = new Game_Point();
    this.rotation = new Game_Point();

    this.trianglePositionBufferKey = undefined;
    this.triangleColorBufferKey = undefined;
    this.triangleNormalBufferKey = undefined;
    this.matrix4 = mat4.create();
    mat4.identity(this.matrix4);
    this.transfMat4 = mat4.create();
    mat4.identity(this.transfMat4);

}
Game_SuperObj.prototype.newPointlist = function ()
{
    var pointlist = new Game_PointList();
    this.pointlist_contaner.push(pointlist);
    return pointlist;
}
Game_SuperObj.prototype.makeMash = function (dw, up)
{
    var count = up.pointArray.length;
    for(var i = 0 ; i < count; i++ )
    {
        if(i == count-1)
        {
            var dw1 = dw.pointArray[0];
            var dw2 = dw.pointArray[i];

            var up1 = up.pointArray[0];
            var up2 = up.pointArray[i];


            var tri1 = this.trianglelist.newTriangle();
            tri1.point1.set(dw1.x, dw1.y, dw1.z);
            tri1.point3.set(dw2.x, dw2.y, dw2.z);
            tri1.point2.set(up1.x, up1.y, up1.z);

            var tri2 = this.trianglelist.newTriangle();
            tri2.point1.set(up1.x, up1.y, up1.z);
            tri2.point2.set(up2.x, up2.y, up2.z);
            tri2.point3.set(dw2.x, dw2.y, dw2.z);

            this.trianglelist.setColor(0.5,0.0,0.0,1.0);
            this.trianglelist.CalculateNormals();
        }

        else
        {
            var dw1 = dw.pointArray[i];
            var dw2 = dw.pointArray[i+1];

            var up1 = up.pointArray[i];
            var up2 = up.pointArray[i+1];


            var tri1 = this.trianglelist.newTriangle();
            tri1.point1.set(dw1.x, dw1.y, dw1.z);
            tri1.point2.set(dw2.x, dw2.y, dw2.z);
            tri1.point3.set(up1.x, up1.y, up1.z);

            var tri2 = this.trianglelist.newTriangle();
            tri2.point1.set(up1.x, up1.y, up1.z);
            tri2.point3.set(up2.x, up2.y, up2.z);
            tri2.point2.set(dw2.x, dw2.y, dw2.z);

            this.trianglelist.setColor(0.5,0.0,0.0,1.0);
            this.trianglelist.CalculateNormals();
        }

    }


}
Game_SuperObj.prototype.makeObj = function ()
{
    var count = this.pointlist_contaner.length;
    for(var i = 0; i < count-1; i++)
    {
        var up = this.pointlist_contaner[i];
        var dw = this.pointlist_contaner[i+1];
        this.makeMash(dw, up);
    }
}
Game_SuperObj.prototype.calculateTransformationMatrix4 = function ()
{
    var translation = vec3.create();
    translation[0] = this.position.x;
    translation[1] = this.position.y;
    translation[2] = this.position.z;
    mat4.identity(this.transfMat4);
    mat4.translate(this.transfMat4, translation);

    mat4.rotate(this.transfMat4, this.rotation.x, [1,0,0]);
    mat4.rotate(this.transfMat4, this.rotation.y, [0,1,0]);
    mat4.rotate(this.transfMat4, this.rotation.z, [0,0,1]);
}
Game_SuperObj.prototype.calculateBoundingBox = function ()
{
    var count = this.pointlist_contaner.length;
    for(var i = 0; i < count; i++)
    {
        var pointlist = this.pointlist_contaner[i];
        var bbox = pointlist.getBoundingBox();

        if(i ==0)
        {
            this.bbox = bbox;
        }
        else
        {
            if(this.bbox.min_x > bbox.min_x)
            {
                this.bbox.min_x = bbox.min_x;
            }
            if(this.bbox.max_x < bbox.max_x)
            {
                this.bbox.max_x = bbox.max_x;
            }

            if(this.bbox.min_y > bbox.min_y)
            {
                this.bbox.min_y = bbox.min_y;
            }
            if(this.bbox.max_y < bbox.max_y)
            {
                this.bbox.max_y = bbox.max_y;
            }

            if(this.bbox.min_z > bbox.min_z)
            {
                this.bbox.min_z = bbox.min_z;
            }
            if(this.bbox.max_z < bbox.max_z)
            {
                this.bbox.max_z = bbox.max_z;
            }
        }
    }
}

Game_SuperObj.prototype.setPosition = function (x,y,z)
{
    this.position.set(x,y,z);
    this.calculateTransformationMatrix4();
}

Game_SuperObj.prototype.setRotation = function (px,py,pz)
{
    this.radian_x = px * Math.PI/180;
    this.radian_y = py * Math.PI/180;
    this.radian_z = pz * Math.PI/180;
    this.rotation.set(this.radian_x,this.radian_y,this.radian_z);
    this.calculateTransformationMatrix4();
}

Game_SuperObj.prototype.addPosition = function (x,y,z) {
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;

    this.calculateTransformationMatrix4();
}

Game_SuperObj.prototype.setColor = function (r,g,b,a)
{
    this.trianglelist.setColor(r,g,b,a);
}

Game_SuperObj.prototype.getVertexPositionArray = function ()
{
    var trianglePositionArray = this.trianglelist.getPointArray();
    return trianglePositionArray;
}

Game_SuperObj.prototype.getColorArray = function ()
{
    var triangleColorArray = this.trianglelist.getColorArray();
    return triangleColorArray;
}

Game_SuperObj.prototype.getNormalArray = function ()
{
    var triangleNormalArray = this.trianglelist.getNormalArray();
    return triangleNormalArray;
}

Game_SuperObj.prototype.getPositionBufferKey = function (gl)
{
    if(this.trianglePositionBufferKey == undefined)
    {
        this.trianglePositionBufferKey = this.trianglelist.getPositionBufferKey(gl);
    }
    return this.trianglePositionBufferKey;
}

Game_SuperObj.prototype.getColorBufferKey = function (gl)
{
    if(this.triangleColorBufferKey == undefined)
    {
        this.triangleColorBufferKey = this.trianglelist.getColorBufferKey(gl);
    }
    return this.triangleColorBufferKey;
}

Game_SuperObj.prototype.getNormalBufferKey = function (gl)
{
    if(this.triangleNormalBufferKey == undefined)
    {
        this.triangleNormalBufferKey = this.trianglelist.getNormalBufferKey(gl);
    }
    return this.triangleNormalBufferKey;
}

Game_SuperObj.prototype.makeAxis = function (x,y,z)
{
    this.Axis.makeAxis(x,y,z)
}

Game_SuperObj.prototype.draw = function (gl, shaderProgram)
{
    var trianglePositionBufferKey = this.getPositionBufferKey(gl);
    var triangleColorBufferKey = this.getColorBufferKey(gl);
    var triangleNormalBufferKey = this.getNormalBufferKey(gl);

    gl.disableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    if(this.Axis.linelist.length > 0)
    {
        this.Axis.linelist.draw(gl, shaderProgram);
    }

    //cube **************************************************************
    //gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transfMat4);// TRANSFORMATION MATRIX.****
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

    var trianglecount = this.trianglelist.triangleArray.length;
    if(trianglecount == 0)
    {
        return;
    }
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    //gl.uniform3f(shaderProgram.objPositionUniform, this.position.x, this.position.y, this.position.z);
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePositionBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4 , gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0,0);
    gl.drawArrays(gl.TRIANGLES, 0, trianglecount * 3);

}

var Game_SuperObjList = function ()
{
    this.SuperObjArray = [];

}
Game_SuperObjList.prototype.newSuperObject = function ()
{
    var superobj = new Game_SuperObj();
    superobj.newPointlist();
    this.SuperObjArray.push(superobj);
    return superobj;
}

Game_SuperObjList.prototype.draw = function (gl, shaderProgram)
{
    var superObjCount = this.SuperObjArray.length;
    for(var i = 0 ;  i < superObjCount; i++)
    {
        var superobj = this.SuperObjArray[i];
        superobj.draw(gl, shaderProgram);
    }
}
