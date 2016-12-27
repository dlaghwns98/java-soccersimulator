var Game_Point = function ()
{
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.color = new Game_Color();
    this.normal = new Game_Normal();
    this.texCoord = new Point_2D();



    this.pointPositionBufferKey = undefined;
    this.colorbufferKey = undefined;
    this.normalBufferKey = undefined;
    this.texCoordBufferKey = undefined;
}

Game_Point.prototype.set = function(x,y,z)
{
  this.x = x;
  this.y = y;
  this.z = z;
}
Game_Point.prototype.getModul = function ()
{
    var modul = Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    return modul;
}
Game_Point.prototype.Normalize = function ()
{
    var modul = this.getModul();
    this.x = this.x/modul;
    this.y = this.y/modul;
    this.z = this.z/modul;
}
var Game_Color = function ()
 {
   this.r =0;
   this.g = 0;
   this.b = 0;
   this.a = 0;
}

Game_Color.prototype.setColor = function (r,g,b,a)
{
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

var Game_Normal = function ()
{
    this.x = 0;
    this.y  = 0;
    this.z = 0;
}
Game_Normal.prototype.set = function (x,y,z)
{
    this.x =x;
    this.y =y;
    this.z =z;
}
var Point_2D = function ()
{
    this.x = 0;
    this.y = 0;
}
Point_2D.prototype.set = function (x,y)
{
    this.x = x;
    this.y = y;
}

var Game_PointList = function ()
{
    this.pointArray = [];
    this.pointTexCoordtrunoff = false;
}


Game_PointList.prototype.newPoint = function (x,y,z, s,t)
{
    var point = new Game_Point();
    point.set(x,y,z);
    point.normal.set(0,0,1);
    if(this.pointTexCoordtrunoff == true)
    {
        this.setTexCoord(s,t);
    }
    this.pointArray.push(point);

    return point;
}
Game_PointList.prototype.setTexCoord = function (s,t)
{
    for(var i = 0 ; i < this.pointArray.length; i++)
    {
        var point = this.pointArray[i];
        point.texCoord.set(s,t);
    }
}
Game_PointList.prototype.getPointArray = function ()
{
    var pointcount = this.pointArray.length;
    var float32values_count = pointcount * 3;
    var PointsArray = new Float32Array(float32values_count);

    for(var i = 0; i < pointcount; i++)
    {
      var point = this.pointArray[i];
      PointsArray[i*3] = point.x;
      PointsArray[i*3+1] = point.y;
      PointsArray[i*3+2] = point.z;
    }
    return PointsArray;
}
Game_PointList.prototype.getTexCoordArray = function ()
{
    var pointcount = this.pointArray.length;
    var float32valuues_count = pointcount * 2;
    var PointArray = new Float32Array(float32valuues_count);

    for(var i = 0; i < pointcount; i++)
    {
        var point = this.pointArray[i];
        PointArray[i*2] = point.x;
        PointArray[i*2+1] = point.y;
    }
}
Game_PointList.prototype.getColorArray = function ()
{
    var pointcount = this.pointArray.length;
    var float32values_count = pointcount * 3 * 4;
    var ColorArray = new Float32Array(float32values_count);

    for(var i = 0; i < pointcount; i++)
    {
      var point = this.pointArray[i];
      ColorArray[i*4] = point.color.r;
      ColorArray[i*4+1] = point.color.g;
      ColorArray[i*4+2]  = point.color.b;
      ColorArray[i*4+3]  = point.color.a;
    }
    return ColorArray;
}

Game_PointList.prototype.getNormalArray = function ()
{
    var pointcount = this.pointArray.length;
    var float32values_count = pointcount * 3;
    var PointsArray = new Float32Array(float32values_count);

    for(var i = 0; i < pointcount; i++)
    {
        var point = this.pointArray[i];
        PointsArray[i*3] = point.normal.x;
        PointsArray[i*3+1] = point.normal.y;
        PointsArray[i*3+2] = point.normal.z;
    }
    return PointsArray;
}


Game_PointList.prototype.getPositionBufferKey = function (gl)
{
    if(this.pointPositionBufferKey == undefined)
    {
        this.pointPositionBufferKey = gl.createBuffer();
        var pointArray = this.getPointArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.pointPositionBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, pointArray, gl.STATIC_DRAW);
    }
    return this.pointPositionBufferKey;
}
Game_PointList.prototype.getTexCoordBufferKey = function (gl)
{
    if(this.texCoordBufferKey == undefined)
    {
        this.texCoordBufferKey = gl.createBuffer();
        var textCoordArray = this.getTexCoordArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, textCoordArray, gl.STATIC_DRAW);
    }
    return this.texCoordBufferKey;
}
Game_PointList.prototype.getColorBufferKey = function (gl)
{
    if(this.colorbufferKey == undefined)
    {
        this.colorbufferKey = gl.createBuffer();
        var colorArray = this.getColorArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorbufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, colorArray, gl.STATIC_DRAW);
    }
    return this.colorbufferKey;
}

Game_PointList.prototype.getNormalBufferKey = function (gl)
{
    if(this.normalBufferKey == undefined)
    {
        this.normalBufferKey = gl.createBuffer();
        var normalarray = this.getNormalArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, normalarray, gl.STATIC_DRAW);
    }
    return this.normalBufferKey;
}
Game_PointList.prototype.makeline = function (x,y,z)
{
    this.pointTexCoordtrunoff = true;
    this.newPoint(x+100,y,z ,1,1);
    this.newPoint(x+200,y,z ,1,1);
    this.newPoint(x+300,y,z ,1,1);
    this.newPoint(x+400,y,z ,1,1);
    this.newPoint(x+500,y,z ,1,1);
    this.newPoint(x+600,y,z ,1,1);
    this.newPoint(x+700,y,z ,1,1);
    this.newPoint(x+800,y,z ,1,1);
}
Game_PointList.prototype.makepolygon = function (x,y,z)
{
    this.pointTexCoordtrunoff = true;
    this.newPoint(-x,-y,z, 1,1)
    this.newPoint(x,-y,z ,1,1)
    this.newPoint(x,-y/2,z ,1,1)
    this.newPoint(x*2,-y/2,z ,1,1)
    this.newPoint(x*2,y/2,z ,1,1)
    this.newPoint(x,y/2,z ,1,1)
    this.newPoint(x,y,z ,1,1)
    this.newPoint(-x,y,z ,1,1)
    this.newPoint(-x,y/2,z ,1,1)
    this.newPoint(-x*2,y/2,z ,1,1)
    this.newPoint(-x*2,-y/2,z ,1,1)
    this.newPoint(-x,-y/2,z ,1,1)


}
Game_PointList.prototype.makeCircle = function (r, height, count)
{
    var incRad = (360/count)*Math.PI/180;
    var angle = 0;
    var sx =0.05;
    var sy = 0.05;
    var sz = 0.05;
    for(var i = 0 ; i < count; i++)
    {
            this.newPoint(r*Math.sin(angle),r*Math.cos(angle),height);
        angle += incRad;
    }

}
Game_PointList.prototype.makestick = function (x,y,z)
{
    this.newPoint(0.05*x,0,0.05*z);
    this.newPoint(0.05*-x,0,0.05*z);
    this.newPoint(0.05*-x,0.05*y,0.05*z);
    this.newPoint(0.05*x,0.05*y,0.05*z);
}
Game_PointList.prototype.makeArch = function (r,arc_x,arc_y, height, count)
{
    var incRad = (180/count)*Math.PI/180;
    var angle = 0;

    for(var i = 0 ; i < count+1; i++)
    {
        this.newPoint(r*Math.sin(angle)*arc_x,r*Math.cos(angle)*arc_y,height);
        angle += incRad;
    }

}
Game_PointList.prototype.makesphere = function (n)
{
    var radian = (Math.PI)/n;
    var angle = 0;
    var cpx,cpy,cpz;
    cpx = 0;
    cpy = 0;

    for(var i = 0; i < n+1; i++)
    {
        cpz = -01* Math.cos(angle);
        var r = 6000 * Math.sin(angle);
        this.makeCircle(r, cpx,cpy,cpz ,n);
        angle += radian;
    }
}
Game_PointList.prototype.makeDronpropellr = function (x,y,z)
{
    var sx =0.05;
    var sy = 0.05;
    var sz = 0.05;

    this.newPoint(sx*200*x,0*y,sz*z);
    this.newPoint(sx*200*x,sy*1000*y,sz*z);
    this.newPoint(sx*600*x,sy*2000*y,sz*z);
    this.newPoint(sx*600*x,sy*4000*y,sz*z);
    this.newPoint(0,sy*5000*y,sz*z);
    this.newPoint(sx*-600*x,sy*4000*y,sz*z);
    this.newPoint(sx*-600*x,sy*2000*y,sz*z);
    this.newPoint(sx*-200*x,sy*1000*y,sz*z);
    this.newPoint(sx*-200*x,0*y,sz*z);

    this.newPoint(sx*-200*x,0*y,sz*z);
    this.newPoint(sx*-200*x,sy*-1000*y,sz*z);
    this.newPoint(sx*-600*x,sy*-2000*y,sz*z);
    this.newPoint(sx*-600*x,sy*-4000*y,sz*z);
    this.newPoint(0,sy*-5000*y,sz*z);
    this.newPoint(sx*600*x,sy*-4000*y,sz*z);
    this.newPoint(sx*600*x,sy*-2000*y,sz*z);
    this.newPoint(sx*200*x,sy*-1000*y,sz*z);
    this.newPoint(sx*200*x,sy*0*y,sz*z);
}
Game_PointList.prototype.makeSide = function (x,y,z)
{
    this.newPoint(0,0,z);
    this.newPoint(x,0,z);
    this.newPoint(x,y,z);
    this.newPoint(0,y,z);
}
Game_PointList.prototype.makeDronlegright = function (x,y,z)
{
    this.newPoint(1000*x,-2000*y,0.0);
    this.newPoint(1000*x,-2000*y,-2000*z);
    this.newPoint(1000*x,2000*y,-2000*z);
    this.newPoint(1000*x,2000*y,0.0);



}

Game_PointList.prototype.makepropellr = function (r,arc_x,arc_y, height, count)
{

    var incRad = (180/count)*Math.PI/180;
    var angle = 0;

    for(var i = 0 ; i < count+1; i++)
    {
        this.newPoint(r*Math.sin(angle)*arc_x,r*Math.cos(angle)*arc_y,height);
        angle += incRad;
    }

}
Game_PointList.prototype.makeCube1 = function (x, y, z)
{
    var px = x*0.1;
    var py = y*0.1;
    var pz = z*0.1;

    this.newPoint(px,py,pz);
    this.newPoint(-px,py,pz);
    this.newPoint(-px,-py,pz);
    this.newPoint(px,-py,pz);

}
Game_PointList.prototype.makeDirection = function (x,y,z)
{
    var px = 0.1*x;
    var py = 0.1*y;
    var pz = 0.1*z;
    this.newPoint(px,py,pz);
    this.newPoint(0,2*py,pz);
    this.newPoint(-px,py,pz);
    this.newPoint(-px,-py,pz);
    this.newPoint(px,-py,pz);
}
Game_PointList.prototype.makeCannon = function (r, h)
{
    var count = 36;
    var degree = 360/count;
    var radian = degree * Math.PI/180;
    var angle = 0;
    for(var i = 0; i < count; i++)
    {
        this.newPoint(r * Math.sin(angle) , r*Math.cos(angle), h);
       angle += radian;
    }
}
Game_PointList.prototype.makeHead = function (x,y,z)
{
    this.newPoint(1.2*x,0.0*y,0.1*z);
    this.newPoint(1.0*x,1.0*y,0.1*z);
    this.newPoint(0.8*x,1.5*y,0.1*z);
    this.newPoint(0.0*x,1.6*y,0.1*z);
    this.newPoint(-0.8*x,1.5*y,0.1*z);
    this.newPoint(-1.0*x,1.0*y,0.1*z);
    this.newPoint(-1.2*x,0.0*y,0.1*z);

    this.newPoint(-1.2*x,0.0*y,0.1*z);
    this.newPoint(-1.0*x,-1.0*y,0.1*z);
    this.newPoint(-0.8*x,-1.5*y,0.1*z);
    this.newPoint(0.0*x,-1.6*y,0.1*z);
    this.newPoint(0.8*x,-1.5*y,0.1*z);
    this.newPoint(1.0*x,-1.0*y,0.1*z);
    this.newPoint(1.2*x,0.0*y,0.1*z);

}
Game_PointList.prototype.makewheel = function (x,y,z)
{
    this.newPoint(1.0*x,1.0*y,0.0);
    this.newPoint(1.0*x,1.2*y,0.1*z);
    this.newPoint(1.0*x,1.0*y,0.2*z);

    this.newPoint(1.0*x,0.0*y,0.2*z);
    this.newPoint(1.0*x,-1.0*y,0.2*z);
    this.newPoint(1.0*x,-1.2*y,0.1*z);
    this.newPoint(1.0*x,-1.0*y,0.0*z);
}
Game_PointList.prototype.makeWorldCup_body = function (x,y,z)
{
    this.newPoint(x,-y,z);
    this.newPoint(x-200,0,z);
    this.newPoint(x,y,z);

    this.newPoint(0,y-100,z);

    this.newPoint(-x,y,z);
    this.newPoint(-x+200,0,z);
    this.newPoint(-x,-y,z);

    this.newPoint(0,-y+100,z);

}
Game_PointList.prototype.makeCheer = function (x,y,z)
{
    this.newPoint(0,y,z);
    this.newPoint(x/2,y,z);
    this.newPoint(x/2,y/2,z);
    this.newPoint(x,y/2,z);
    this.newPoint(x,0,z);
    this.newPoint(0,0,z);
}

Game_PointList.prototype.getBoundingBox = function ()
{
    var bbox = new Game_Bounding_Box();
    var count = this.pointArray.length;
    for(var i = 0; i < count; i++)
    {
        var point = this.pointArray[i];
        if( i == 0)
        {
            bbox.min_x = point.x;
            bbox.max_x = point.x;

            bbox.min_y = point.y;
            bbox.max_y = point.y;

            bbox.min_z = point.z;
            bbox.max_z = point.z;
        }
        else
        {
            if(point.x < bbox.min_x)
            {
                bbox.min_x = point.x;
            }
            else if(point.x > bbox.max_x)
            {
                bbox.max_x = point.x;
            }

            if(point.y < bbox.min_y)
            {
                bbox.min_y = point.y;
            }
            else if(point.y > bbox.max_y)
            {
                bbox.max_y = point.y;
            }

            if(point.z < bbox.min_z)
            {
                bbox.min_z = point.z;
            }
            else if(point.z > bbox.max_z)
            {
                bbox.max_z = point.z;
            }
        }

    }
    return bbox;
}
Game_PointList.prototype.makeArrow = function (x,y,z)
{
    this.newPoint(0.1*x,0.0,z);
    this.newPoint(0.1*x,0.1*y,z);
    this.newPoint(0.2*x,0.1*y,z);
    this.newPoint(0.0*x,0.3*y,z);


    this.newPoint(0.0*x,0.3*y,z);
    this.newPoint(-0.2*x,0.1*y,z);
    this.newPoint(-0.1*x,0.1*y,z);
    this.newPoint(-0.1*x,0.0,z);
}
var Game_Line = function ()
{
  this.point1 = new Game_Point();
  this.point2 = new Game_Point();

    this.fx = 0;
    this.fy = 0;
    this.fz = 0;


}
Game_Line.prototype.setLine = function (x,y,z,x1,y1,z1)
 {
   this.point1.set(x,y,z);
   this.point2.set(x1,y1,z1);


}
Game_Line.prototype.setColor = function (r,g,b,a) {

}

var Game_LineList = function ()
{
    this.position = new Game_Point();
    this.lineArray = [];
    this.pointlist = new Game_PointList();
    this.linelistPositionBufferKey = undefined;
    this.linelistColorBufferKey = undefined;
}
Game_LineList.prototype.calculateTransformationMatrix4 = function ()
{
    var translation = vec3.create();
    translation[0] = this.position.x;
    translation[1] = this.position.y;
    translation[2] = this.position.z;
    mat4.identity(this.transfMat4);
    mat4.translate(this.transfMat4, translation);

}
Game_LineList.prototype.setPosition = function (x,y,z)
{
    this.position.set(x,y,z);
    this.calculateTransformationMatrix4();
}

Game_LineList.prototype.addPosition = function (x,y,z) {
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;

    this.calculateTransformationMatrix4();
}

Game_LineList.prototype.newLine = function (x,y,z,x1,y1,z1)
{
    var line = new Game_Line();
    line.setLine(x,y,z,x1,y1,z1);
    this.lineArray.push(line);
    return line;
}
Game_LineList.prototype.getVertexPositionArray = function ()
{
    var linecount = this.lineArray.length;
    var float32values_count = linecount * 3 * 2;
    var linesArray = new Float32Array(float32values_count);
    for(var i = 0 ; i < linecount; i++)
    {
      var line = this.lineArray[i];
      linesArray[i*6] = line.point1.x;
      linesArray[i*6+1] = line.point1.y;
      linesArray[i*6+2] = line.point1.z;

      linesArray[i*6+3] = line.point2.x;
      linesArray[i*6+4] = line.point2.y;
      linesArray[i*6+5] = line.point2.z;
    }
    return linesArray;
}
Game_LineList.prototype.makeGroundLine = function (x,y,z,x2,y2,z2) {
    var groundlinelist = this.newLine(x, -y, z, x2, y2, z2);
    groundlinelist.point1.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist.point2.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist = this.newLine(-x, y, z, x2, y2, z2);
    groundlinelist.point1.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist.point2.color.setColor(1.0, 1.0, 1.0, 1.0);

    groundlinelist = this.newLine(-x, 2 / y, z, x2, 2 / y2, z2);
    groundlinelist.point1.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist.point2.color.setColor(1.0, 1.0, 1.0, 1.0);

    groundlinelist = this.newLine(-x, -y, z, -x2, y2, z2);
    groundlinelist.point1.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist.point2.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist = this.newLine(-x, -y, z, x2, -y2, z2);
    groundlinelist.point1.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist.point2.color.setColor(1.0, 1.0, 1.0, 1.0);

}
Game_LineList.prototype.makeGround_minLine = function (x,y,z,x2,y2,z2) {
    var groundlinelist = this.newLine(x, -y, z, x2, y2, z2);
    groundlinelist.point1.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist.point2.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist = this.newLine(-x, y, z, x2, y2, z2);
    groundlinelist.point1.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist.point2.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist = this.newLine(-x, -y, z, -x2, y2, z2);
    groundlinelist.point1.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist.point2.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist = this.newLine(-x, -y, z, x2, -y2, z2);
    groundlinelist.point1.color.setColor(1.0, 1.0, 1.0, 1.0);
    groundlinelist.point2.color.setColor(1.0, 1.0, 1.0, 1.0);

}
Game_LineList.prototype.getColorArray = function ()
{
    var linecount = this.lineArray.length;
    var float32values_count = linecount * 2 * 4;
    var colorArray = new Float32Array(float32values_count);
    for(var i = 0 ; i < linecount; i++)
    {
      var line = this.lineArray[i];
      colorArray[i*8] = line.point1.color.r;
      colorArray[i*8+1] = line.point1.color.g;
      colorArray[i*8+2] = line.point1.color.b;
      colorArray[i*8+3] = line.point1.color.a;

      colorArray[i*8+4] = line.point2.color.r;
      colorArray[i*8+5] = line.point2.color.g;
      colorArray[i*8+6] = line.point2.color.b;
      colorArray[i*8+7] = line.point2.color.a;
    }
    return colorArray;
}
Game_LineList.prototype.getVertexPositionBufferKey = function (gl)
{
  if(this.linelistPositionBufferKey == undefined)
  {
    this.linelistPositionBufferKey = gl.createBuffer();
    var linelistArray = this.getVertexPositionArray();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.linelistPositionBufferKey);
    gl.bufferData(gl.ARRAY_BUFFER, linelistArray,gl.STATIC_DRAW);
  }
  return this.linelistPositionBufferKey;
}

Game_LineList.prototype.getColorBufferKey = function (gl)
{
  if(this.linelistColorBufferKey == undefined)
  {
    this.linelistColorBufferKey = gl.createBuffer();
    var linelistArray = this.getColorArray();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.linelistColorBufferKey);
    gl.bufferData(gl.ARRAY_BUFFER, linelistArray,gl.STATIC_DRAW);
  }
  return this.linelistColorBufferKey;
}
Game_LineList.prototype.draw = function (gl, shaderProgram)
{
    var linelistPositionBufferKey = this.getVertexPositionBufferKey(gl);
    var linelistColorBufferKey = this.getColorBufferKey(gl);
    var linecount = this.lineArray.length;
    gl.bindBuffer(gl.ARRAY_BUFFER, linelistPositionBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, linelistColorBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.LINES, 0, linecount * 2)

}
Game_LineList.prototype.makecameraline = function (x,y,z,x2,y2,z2)
{

    var linelist = this.newLine(x,y,z,  x2,y2,z2);
    linelist.point1.color.setColor(0.0,1.0,1.0,1.0);
    linelist.point2.color.setColor(0.0,1.0,1.0,1.0);
    linelist = this.newLine(-x,y,z,  x2,y2,z2);
    linelist.point1.color.setColor(0.0,1.0,1.0,1.0);
    linelist.point2.color.setColor(0.0,1.0,1.0,1.0);
    linelist = this.newLine(-x,-y,z,  x2,y2,z2);
    linelist.point1.color.setColor(0.0,1.0,1.0,1.0);
    linelist.point2.color.setColor(0.0,1.0,1.0,1.0);
    linelist =  this.newLine(x,-y,z,  x2,y2,z2);
    linelist.point1.color.setColor(0.0,1.0,1.0,1.0);
    linelist.point2.color.setColor(0.0,1.0,1.0,1.0);
}

var Game_Axis =  function ()
{
    this.linelist = new Game_LineList();
}
Game_Axis.prototype.makeAxis = function (x,y,z)
{
    var axis = this.linelist.newLine(0.0,0.0,0.0,x,0.0,0.0);
    axis.point1.color.setColor(1.0,0.0,0.0,1.0);
    axis.point2.color.setColor(1.0,0.0,0.0,1.0);
    axis = this.linelist.newLine(0.0,0.0,0.0,0.0,y,0.0);
    axis.point1.color.setColor(0.0,1.0,0.0,1.0);
    axis.point2.color.setColor(0.0,1.0,0.0,1.0);
    axis = this.linelist.newLine(0.0,0.0,0.0,0.0,0.0,z);
    axis.point1.color.setColor(0.0,0.0,1.0,1.0);
    axis.point2.color.setColor(0.0,0.0,1.0,1.0);
}

var Game_Triangle = function ()
{
    this.point1 = new Game_Point();
    this.point2 = new Game_Point();
    this.point3 = new Game_Point();

    this.trianglePositionBufferKey = undefined;
    this.triangleColorBufferKey = undefined;
    this.triangleNoramlBufferKey = undefined;
}
Game_Triangle.prototype.setPoints = function (p1,p2,p3)
{
    this.point1 = p1;
    this.point2 = p2;
    this.point3 = p3;
}
Game_Triangle.prototype.setColor = function (r,g,b,a)
{
    this.point1.color.setColor(r,g,b,a);
    this.point2.color.setColor(r,g,b,a);
    this.point3.color.setColor(r,g,b,a);
}
Game_Triangle.prototype.getEdge = function (index)
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

Game_Triangle.prototype.CalculateNormal = function ()
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
Game_Triangle.prototype.getPointArray = function ()
{
    var triangleCount = 1;
    var float32count = triangleCount * 3 * 3;
    var TriangleArray = new Float32Array(float32count);

    for(var i = 0 ; i < triangleCount; i++)
    {
        TriangleArray[i*9] = this.point1.x;
        TriangleArray[i*9+1] = this.point1.y;
        TriangleArray[i*9+2] = this.point1.z;

        TriangleArray[i*9+3] = this.point2.x;
        TriangleArray[i*9+4] = this.point2.y;
        TriangleArray[i*9+5] = this.point2.z;

        TriangleArray[i*9+6] = this.point3.x;
        TriangleArray[i*9+7] = this.point3.y;
        TriangleArray[i*9+8] = this.point3.z;
    }
    return TriangleArray;
}

Game_Triangle.prototype.getColorArray = function ()
{
    var triangleCount = 1;
    var float32count = triangleCount * 4 * 3;
    var colorArray = new Float32Array(float32count);

    for(var i = 0 ; i < triangleCount; i++)
    {

        colorArray[i*12] = this.point1.color.r;
        colorArray[i*12+1] = this.point1.color.g;
        colorArray[i*12+2] = this.point1.color.b;
        colorArray[i*12+2] = this.point1.color.a;

        colorArray[i*12+3] = this.point2.color.r;
        colorArray[i*12+4] = this.point2.color.g;
        colorArray[i*12+5] = this.point2.color.b;
        colorArray[i*12+5] = this.point2.color.a;

        colorArray[i*12+6] = this.point3.color.r;
        colorArray[i*12+7] = this.point3.color.g;
        colorArray[i*12+8] = this.point3.color.b;
        colorArray[i*12+8] = this.point3.color.a;
    }
    return colorArray;
}

Game_Triangle.prototype.getNormalArray = function ()
{
    var triangleCount = 1;
    var float32count = triangleCount * 3 * 3;
    var NormalArray = new Float32Array(float32count);

    for(var i = 0 ; i < triangleCount; i++)
    {
        NormalArray[i*9] = this.point1.x;
        NormalArray[i*9+1] = this.point1.normal.y;
        NormalArray[i*9+2] = this.point1.normal.z;

        NormalArray[i*9+3] = this.point2.normal.x;
        NormalArray[i*9+4] = this.point2.normal.y;
        NormalArray[i*9+5] = this.point2.normal.z;

        NormalArray[i*9+6] = this.point3.normal.x;
        NormalArray[i*9+7] = this.point3.normal.y;
        NormalArray[i*9+8] = this.point3.normal.z;
    }
    return NormalArray;
}
Game_Triangle.prototype.getPositionBufferKey = function (gl)
{
    if(this.trianglePositionBufferKey == undefined)
    {
        this.trianglePositionBufferKey = gl.createBuffer();
        var trianglePositionArray = this.getPointArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglePositionBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, trianglePositionArray, gl.STATIC_DRAW);
    }
    return this.trianglePositionBufferKey;
}

Game_Triangle.prototype.getColorBufferKey = function (gl)
{
    if(this.triangleColorBufferKey == undefined)
    {
        this.triangleColorBufferKey = gl.createBuffer();
        var triangleColorArray = this.getColorArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleColorBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleColorArray, gl.STATIC_DRAW);
    }
    return this.triangleColorBufferKey;
}

Game_Triangle.prototype.getNormalArray = function (gl)
{
    if(this.triangleNoramlBufferKey == undefined)
    {
        this.triangleNoramlBufferKey = gl.createBuffer();
        var triangleNormalArray = this.getNormalArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleNoramlBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleNormalArray, gl.STATIC_DRAW);
    }
    return this.triangleNoramlBufferKey;
}

var Game_TriangleList = function ()
{
    this.triangleArray = [];
    this.trianglePositionBufferKey = undefined;
    this.triangleColorBufferKey = undefined;
    this.triangleNormalBufferKey = undefined;
}
Game_TriangleList.prototype.newTriangle = function ()
{
    var triangle = new Game_Triangle();
    this.triangleArray.push(triangle);
    return triangle;
}

Game_TriangleList.prototype.CalculateNormals = function ()
{
    var tricount = this.triangleArray.length;
    for(var i = 0 ; i < tricount; i++)
    {
        var triangle = this.triangleArray[i];
        triangle.CalculateNormal();
    }

}
Game_TriangleList.prototype.setColor = function (r,g,b,a)
{
    var count = this.triangleArray.length;

    for(var i = 0 ; i < count; i++)
    {
       var triangle = this.triangleArray[i];
        triangle.setColor(r,g,b,a);
    }
}
Game_TriangleList.prototype.getPointArray = function ()
{
    var tricount = this.triangleArray.length;
    var float32_values  = tricount * 3 * 3;
    var triangle_Array = new Float32Array(float32_values);

    for(var i = 0 ; i < tricount; i++)
    {
        var tri = this.triangleArray[i];
        triangle_Array[i*9] = tri.point1.x;
        triangle_Array[i*9+1] = tri.point1.y;
        triangle_Array[i*9+2] = tri.point1.z;

        triangle_Array[i*9+3] = tri.point2.x;
        triangle_Array[i*9+4] = tri.point2.y;
        triangle_Array[i*9+5] = tri.point2.z;

        triangle_Array[i*9+6] = tri.point3.x;
        triangle_Array[i*9+7] = tri.point3.y;
        triangle_Array[i*9+8] = tri.point3.z;
    }
    return triangle_Array;
}
Game_TriangleList.prototype.getColorArray = function ()
{
    var tricount = this.triangleArray.length;
    var float32_values  = tricount * 3 * 4;
    var color_Array = new Float32Array(float32_values);

    for(var i = 0 ; i < tricount; i++)
    {
        var tri = this.triangleArray[i];
        color_Array[i*12] = tri.point1.color.r;
        color_Array[i*12+1] = tri.point1.color.g;
        color_Array[i*12+2] = tri.point1.color.b;
        color_Array[i*12+3] = tri.point1.color.a;

        color_Array[i*12+4] = tri.point2.color.r;
        color_Array[i*12+5] = tri.point2.color.g;
        color_Array[i*12+6] = tri.point2.color.b;
        color_Array[i*12+7] = tri.point2.color.a;

        color_Array[i*12+8] = tri.point3.color.r;
        color_Array[i*12+9] = tri.point3.color.g;
        color_Array[i*12+10] = tri.point3.color.b;
        color_Array[i*12+11] = tri.point3.color.a;
    }
    return color_Array;
}
Game_TriangleList.prototype.getNormalArray = function ()
{
    var tricount = this.triangleArray.length;
    var float32_values  = tricount * 3 * 3;
    var normalArray = new Float32Array(float32_values);

    for(var i = 0 ; i < tricount; i++)
    {
        var tri = this.triangleArray[i];
        normalArray[i*9] = tri.point1.normal.x;
        normalArray[i*9+1] = tri.point1.normal.y;
        normalArray[i*9+2] = tri.point1.normal.z;

        normalArray[i*9+3] = tri.point2.normal.x;
        normalArray[i*9+4] = tri.point2.normal.y;
        normalArray[i*9+5] = tri.point2.normal.z;

        normalArray[i*9+6] = tri.point3.normal.x;
        normalArray[i*9+7] = tri.point3.normal.y;
        normalArray[i*9+8] = tri.point3.normal.z;
    }
    return normalArray;
}
Game_TriangleList.prototype.getPositionBufferKey = function (gl)
{
    if(this.trianglePositionBufferKey == undefined)
    {
        this.trianglePositionBufferKey = gl.createBuffer();
        var trianglePostionArray = this.getPointArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.trianglePositionBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, trianglePostionArray, gl.STATIC_DRAW);
    }
    return this.trianglePositionBufferKey;
}

Game_TriangleList.prototype.getColorBufferKey = function (gl)
{
    if(this.triangleColorBufferKey == undefined)
    {
        this.triangleColorBufferKey = gl.createBuffer();
        var triangleColorArray = this.getColorArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleColorBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleColorArray, gl.STATIC_DRAW);
    }
    return this.triangleColorBufferKey;
}

Game_TriangleList.prototype.getNormalBufferKey = function (gl)
{
    if(this.triangleNormalBufferKey == undefined)
    {
        this.triangleNormalBufferKey = gl.createBuffer();
        var triangleNormalArray = this.getNormalArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.triangleNormalBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, triangleNormalArray, gl.STATIC_DRAW);
    }
    return this.triangleNormalBufferKey;
}

Game_TriangleList.prototype.draw = function (gl, shaderProgram)
{
    var trianglePositionBufferKey = this.getPositionBufferKey(gl);
    var triangleColorBufferKey = this.getColorBufferKey(gl);
    var triangleNormalBufferKey = this.getNormalBufferKey(gl);

    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    var count = this.triangleArray.length;
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePositionBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3 ,gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4 ,gl.FLOAT, false, 0, 0 );
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3 ,gl.FLOAT, false, 0, 0 );
    gl.drawArrays(gl.TRIANGLES, 0, count * 3 )
}

//******************************************************************************************************
var HJ_Rectangle = function ()
{
    this.point1 = new Game_Point();
    this.point2 = new Game_Point();
    this.point3 = new Game_Point();
    this.point4 = new Game_Point();

    this.lat = 37.5172076;
    this.lon = 126.929;
    this.height = 2000.0;
    this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
    this.ImageID = undefined;
    this.ImageLoadingStarted = false;
    this.RectanglePositionBufferKey = undefined;
    this.RectangleColorBufferKey = undefined;
    this.RectangleNormalBufferKey = undefined;
    this.RectangleTextureBufferKey = undefined;

}

HJ_Rectangle.prototype.setPosition = function (x,y,z   ,x2, y2, z2,  x3,y3,z3 ,  x4, y4, z4)
{
    this.point1.set(x,y,z);
    this.point2.set(x2,y2,z2);
    this.point3.set(x3,y3,z3);
    this.point4.set(x4,y4,z4);
}
HJ_Rectangle.prototype.setColor = function (r,g,b,a)
{
    this.point1.color.setColor(r,g,b,a);
    this.point2.color.setColor(r,g,b,a);
    this.point3.color.setColor(r,g,b,a);
    this.point4.color.setColor(r,g,b,a);
}
HJ_Rectangle.prototype.setNormal = function (x,y,z)
{
    this.point1.normal.set(x,y,z);
    this.point2.normal.set(x,y,z);
    this.point3.normal.set(x,y,z);
    this.point4.normal.set(x,y,z);
}
HJ_Rectangle.prototype.setTexcoord = function (x,y)
{
    this.point1.texCoord.set(0,0);
    this.point2.texCoord.set(x,0);
    this.point3.texCoord.set(x,y);
    this.point4.texCoord.set(0,y);
}
HJ_Rectangle.prototype.getpointPositionArray = function ()
{
    var trianglesCount = 2;
    var pointsCount = trianglesCount *  3;
    var floatvalues = pointsCount * 3;
    var pointpositionArray = new Float32Array(floatvalues);
    pointpositionArray[0] = this.point1.x;
    pointpositionArray[1] = this.point1.y;
    pointpositionArray[2] = this.point1.z;

    pointpositionArray[3] = this.point2.x;
    pointpositionArray[4] = this.point2.y;
    pointpositionArray[5] = this.point2.z;

    pointpositionArray[6] = this.point3.x;
    pointpositionArray[7] = this.point3.y;
    pointpositionArray[8] = this.point3.z;

    pointpositionArray[9] = this.point1.x;
    pointpositionArray[10] = this.point1.y;
    pointpositionArray[11] = this.point1.z;

    pointpositionArray[12] = this.point3.x;
    pointpositionArray[13] = this.point3.y;
    pointpositionArray[14] = this.point3.z;

    pointpositionArray[15] = this.point4.x;
    pointpositionArray[16] = this.point4.y;
    pointpositionArray[17] = this.point4.z;
    return pointpositionArray;
}
HJ_Rectangle.prototype.getNormalArray = function ()
{
    var pointsCount = 6;
    var floatvalues = pointsCount * 3;
    var pointNormalArray = new Float32Array(floatvalues);
    pointNormalArray[0] = this.point1.normal.x;
    pointNormalArray[1] = this.point1.normal.y;
    pointNormalArray[2] = this.point1.normal.z;

    pointNormalArray[3] = this.point2.normal.x;
    pointNormalArray[4] = this.point2.normal.y;
    pointNormalArray[5] = this.point2.normal.z;

    pointNormalArray[6] = this.point3.normal.x;
    pointNormalArray[7] = this.point3.normal.y;
    pointNormalArray[8] = this.point3.normal.z;

    pointNormalArray[9] = this.point1.normal.x;
    pointNormalArray[10] = this.point1.normal.y;
    pointNormalArray[11] = this.point1.normal.z;

    pointNormalArray[12] = this.point3.normal.x;
    pointNormalArray[13] = this.point3.normal.y;
    pointNormalArray[14] = this.point3.normal.z;

    pointNormalArray[15] = this.point4.normal.x;
    pointNormalArray[16] = this.point4.normal.y;
    pointNormalArray[17] = this.point4.normal.z;
    return pointNormalArray;
}
HJ_Rectangle.prototype.getColorArray = function ()
{
    var pointsCount = 6;
    var floatvalues = pointsCount * 4;
    var PointColorArray = new Float32Array(floatvalues);
    PointColorArray[0] = this.point1.color.r;
    PointColorArray[1] = this.point1.color.g;
    PointColorArray[2] = this.point1.color.b;
    PointColorArray[3] = this.point1.color.a;

    PointColorArray[4] = this.point2.color.r;
    PointColorArray[5] = this.point2.color.g;
    PointColorArray[6] = this.point2.color.b;
    PointColorArray[7] = this.point2.color.a;

    PointColorArray[8] = this.point3.color.r;
    PointColorArray[9] = this.point3.color.g;
    PointColorArray[10] = this.point3.color.b;
    PointColorArray[11] = this.point3.color.a;

    PointColorArray[12] = this.point1.color.r;
    PointColorArray[13] = this.point1.color.g;
    PointColorArray[14] = this.point1.color.b;
    PointColorArray[15] = this.point1.color.a;

    PointColorArray[16] = this.point3.color.r;
    PointColorArray[17] = this.point3.color.g;
    PointColorArray[18] = this.point3.color.b;
    PointColorArray[19] = this.point3.color.a;

    PointColorArray[20] = this.point4.color.r;
    PointColorArray[21] = this.point4.color.g;
    PointColorArray[22] = this.point4.color.b;
    PointColorArray[23] = this.point4.color.a;
    return PointColorArray;
}
HJ_Rectangle.prototype.getTexCoordArray = function ()
{
    var pointcount = 6;
    var floatvalues = pointcount * 2;
    var pointTexCoordArray = new Float32Array(floatvalues);

    pointTexCoordArray[0] = this.point1.texCoord.x;
    pointTexCoordArray[1] = this.point1.texCoord.y;

    pointTexCoordArray[2] = this.point2.texCoord.x;
    pointTexCoordArray[3] = this.point2.texCoord.y;

    pointTexCoordArray[4] = this.point3.texCoord.x;
    pointTexCoordArray[5] = this.point3.texCoord.y;

    pointTexCoordArray[6] = this.point1.texCoord.x;
    pointTexCoordArray[7] = this.point1.texCoord.y;

    pointTexCoordArray[8] = this.point3.texCoord.x;
    pointTexCoordArray[9] = this.point3.texCoord.y;

    pointTexCoordArray[10] = this.point4.texCoord.x;
    pointTexCoordArray[11] = this.point4.texCoord.y;

    return pointTexCoordArray;

}
HJ_Rectangle.prototype.getRectanglePositionBufferKey = function (gl)
{
    if(this.RectanglePositionBufferKey == undefined)
    {
        this.RectanglePositionBufferKey = gl.createBuffer();
        var RectangleArray = this.getpointPositionArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.RectanglePositionBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, RectangleArray, gl.STATIC_DRAW);
    }
    return this.RectanglePositionBufferKey;
}
HJ_Rectangle.prototype.getColorBufferKey = function (gl)
{
    if(this.RectangleColorBufferKey == undefined)
    {
        this.RectangleColorBufferKey = gl.createBuffer();
        var RectangleArray = this.getColorArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.RectangleColorBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, RectangleArray, gl.STATIC_DRAW);
    }
    return this.RectangleColorBufferKey;
}
HJ_Rectangle.prototype.getNormalBufferKey = function (gl)
{
    if(this.RectangleNormalBufferKey == undefined)
    {
        this.RectangleNormalBufferKey = gl.createBuffer();
        var RectangleArray = this.getNormalArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.RectangleNormalBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, RectangleArray, gl.STATIC_DRAW);
    }
    return this.RectangleNormalBufferKey;
}
HJ_Rectangle.prototype.getTextureBufferKey = function (gl)
{
    if(this.RectangleTextureBufferKey == undefined)
    {
        this.RectangleTextureBufferKey = gl.createBuffer();
        var texCoordArray = this.getTexCoordArray();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.RectangleTextureBufferKey);
        gl.bufferData(gl.ARRAY_BUFFER, texCoordArray, gl.STATIC_DRAW);
    }
    return this.RectangleTextureBufferKey;
}
HJ_Rectangle.prototype.makeRectangle = function (x,y,z   ,x2, y2, z2,  x3,y3,z3 ,  x4, y4, z4)
{
    this.setPosition(x,y,z   ,x2, y2, z2,  x3,y3,z3 ,  x4, y4, z4);
    this.setColor(1.0,0.0,0.0,1.0);
    this.setNormal(0,0,1);
    this.setTexcoord(1,1);
}
HJ_Rectangle.prototype.draw = function (gl, shaderProgram, hjLoader)
{
    //this.location = Cesium.Cartesian3.fromDegrees(this.lon, this.lat, this.height);

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
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
    gl.enableVertexAttribArray(shaderProgram.aTexcoord);

    //gl.disableVertexAttribArray(shaderProgram.aTexcoord);

    var RectanglePositionBufferKey = this.getRectanglePositionBufferKey(gl);
    var RectangleColorBufferKey = this.getColorBufferKey(gl);
    var RectangleNormalBufferKey = this.getNormalBufferKey(gl);
    var RectangleTextureBufferKey = this.getTextureBufferKey(gl);
    var mainMat4 = mat4.create();
    mat4.identity(mainMat4);
    gl.uniform3fv(shaderProgram.objposUniform, [this.location.x, this.location.y, this.location.z]);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);

    mat4.multiply(mainMat4, this.transforMat4);
    gl.bindBuffer(gl.ARRAY_BUFFER,RectanglePositionBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, RectangleColorBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4 , gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, RectangleNormalBufferKey);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 3, gl.FLOAT, false, 0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER, RectangleTextureBufferKey);
    gl.vertexAttribPointer(shaderProgram.aTexcoord, 2, gl.FLOAT, false, 0,0);
    gl.drawArrays(gl.TRIANGLES, 0, 6 );
}
