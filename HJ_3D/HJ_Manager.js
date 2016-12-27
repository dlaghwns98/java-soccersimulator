/**
 * Created by hojun Lim on 2016-11-14.
 */
var HJ_Manager = function ()
{
    this.location = new Game_Point();
    this.shpere = new HJ_Sphere();
    this.shpere.makeSphere();
    this.circle = new HJ_TextureCircle();
    this.circle.makeCircle();
    this.epeltop = new HJ_Epeltop();
    this.epeltop.makeEpeltop();
    this.bluemarble = new HJ_BlueMartble();
    this.bluemarble.makeBlueMartble();
    this.oneside = new HJ_One_Side();
    this.oneside.makeOne_side();
    this.hjbuliding = new HJ_63buliding();
    this.hjbuliding.makebulidng();
    this.ground = new HJ_Ground();
    this.ground.makeGround(2000,2000,2000,1)
    this.cube = new HJ_TextureCube();
    this.cube.makeCube();
    this.dron = new HJ_Dron();
    this.dron.makeDron();

    this.ufo = new HJ_SpaceShip();
    this.ufo.ufo.setPosition();
    this.ufo.makeUFO();

    this.ufolon = [];
    this.ufolat = [];
    this.lon = 0;
    this.lat = 0;
    this.ufoposition = [];
    this.twopoint = new HJ_selectTwoPoint();
    this.ufoArray = [];
    this.position = 0;
    this.twopointArray = [];
    this.PolygonLineArray = [];
    this.hjLoader = new HJ_Loader();
    //this.Airplane = new Air_plane_main();
    //this.Airplane.makeMain();

    //this.cesiumModelView_matrix = undefined;
    this.mvMatrix = mat4.create();
    //this.mvProjectionMatrix = mat4.create();
    this.mvMatrixStack = [];
    mat4.identity(this.mvMatrix);
    this.pMatrix = mat4.create();
    mat4.identity(this.pMatrix );
    this.pvMatrixInverse = mat4.create();
    mat4.identity(this.pvMatrixInverse );
    this.transforMat4 = mat4.create();
    mat4.identity(this.transforMat4);
    this.positionMat4 = mat4.create();
    mat4.identity(this.positionMat4);

    this.HJ_ShaderManger = new HJ_Shader_Manger();
    this.encodedCamPosMC_High = new Float32Array(3);
    this.encodedCamPosMC_Low = new Float32Array(3);
    this.modelViewProjRelToEye_matrix = new Float32Array(16);

    this.label_lon = this.dron.lon;
    this.label_lat = this.dron.lat;
    this.added_label = false;
    this.clickcount = 0;

    this.lineArray = [];
    this.i = 10;
    this.j = 0;

    this.whatiamDrawing = 0;
}
HJ_Manager.prototype.makePoylgonLine = function(lon,lat,height)
{
    this.lineArray.push([lon,lat,height]);
    if(this.lineArray.length >1)
    {

        for(var i = 0 ; i < 1; i++)
        {
            var lonlatheight1 = this.lineArray[this.j];
            var lonlatheight2 = this.lineArray[this.j+1];

            var lon1 = lonlatheight1[0];
            var lat1 = lonlatheight1[1];
            var heigth1 = lonlatheight1[2];

            var lon2 = lonlatheight2[0];
            var lat2 = lonlatheight2[1];
            var heigth2 = lonlatheight2[2];

            var twopoint = new HJ_selectTwoPoint();
            twopoint.selectPoint(lon1, lat1, heigth1);
            twopoint.selectPoint(lon2, lat2, heigth2);
            this.ufoposition.push(lon1);
            this.ufoposition.push(lat1);

            this.j+= 1;
        }
        this.PolygonLineArray.push(twopoint);
    }

    /*
     var twopoint = new HJ_selectTwoPoint();
     twopoint.selectPoint(lon_1, lat_1);
     if(count =1 )
     {
     twopoint.selectPoint(lon, lat);
     }
     this.twopointArray.push(this.twopoint);
     */
}

HJ_Manager.prototype.makeUFO = function(lon, lat)
{
    var SpaceShips = new HJ_SpaceShip();
    SpaceShips.ufo.transPosition = true;
    SpaceShips.ufo.setPosition(lon, lat);
    var tt =  Cesium.Cartesian3.fromDegrees(lon, lat, this.height);
    SpaceShips.makeUFO();
    this.ufoArray.push(SpaceShips);
    console.log([tt]);
}
HJ_Manager.prototype.drawScenOnCesium = function (gl, scene, cameraPosition)
{
    //viewer.entities.remove(label)
    // var absPos = vec3.create([position.x, position.y,position.z]);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.disable(gl.CULL_FACE);
    gl.depthRange(0, 1);
    Cesium.Matrix4.toArray(scene._context._us._modelView, this.mvMatrix);
    Cesium.Matrix4.toArray(scene._context._us._projection, this.pMatrix);

    var identityMat = mat4.create();
    mat4.identity(identityMat);
    // Cesium globe transformation matrix.********************************************************
    //-----------------------------------------------------------------------------------------------

    this.calculate_encodedCameraPositionMC_HighLow(this.encodedCamPosMC_High, this.encodedCamPosMC_Low, cameraPosition);
    // Calculate "modelViewProjectionRelativeToEye".*********************************************************
    this.reCalculate_ModelViewProjectionRelToEyeMatrix(scene);

    if(this.HJ_ShaderManger.shader_array.length == 0)
    {
        this.HJ_ShaderManger.createShader(gl);
    }
    //********************************************************************
     var shaderProgram = this.HJ_ShaderManger.shader_array[0];
    //********************************************************************
    //1
    gl.useProgram(shaderProgram.shaderProgram);
    gl.uniformMatrix4fv(shaderProgram.mvProjectionRelToEyeUniformMatrix, false, this.modelViewProjRelToEye_matrix);
    // gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mvMatrix);
    //gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, this.pMatrix);
     var normalMatrix = mat4.create();
     mat4.toInverseMat3(this.mvMatrix, normalMatrix);
     mat4.transpose(normalMatrix);
     gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    //1
    gl.uniform3fv(shaderProgram.camPosHigh, this.encodedCamPosMC_High);
    gl.uniform3fv(shaderProgram.camPosLow, this.encodedCamPosMC_Low);

//  mat4.translate(this.positionMat4, [1, this.position,1]);
// mat4.multiply(this.transforMat4, this.positionMat4 );
// gl.uniformMatrix4fv(shaderProgram.objposUniform, false, this.transforMat4);
//this.dronCamera.draw(gl,shaderProgram,this.transforMat4);
// this.dron.draw(gl,shaderProgram);
//this.worldcup.draw(gl,shaderProgram);
// this.cube.draw(gl,shaderProgram, this.hjLoader);
// this.circle.draw(gl,shaderProgram, this.hjLoader);
// this.epeltop.draw(gl,shaderProgram, this.hjLoader);
//this.bluemarble.draw(gl,shaderProgram, this.hjLoader, 'map.jpg');
// this.hjbuliding.draw(gl,shaderProgram, this.hjLoader);

    var hole = 0;



    if(this.PolygonLineArray.length >= 1)
    {
        //if(this.whatiamDrawing == 1)
        {
            for(var i = 0; i < this.PolygonLineArray.length; i++)
            {
                var line = this.PolygonLineArray[i]
                line.draw(gl, shaderProgram );
            }
        }

    }


    for(var i = 0 ; i < this.ufoArray.length; i++)
    {
        //if(this.whatiamDrawing == 2)
        {
            var ufo = this.ufoArray[i];
            ufo.drawUFO(gl,shaderProgram);
        }

    }



    if(this.whatiamDrawing == 3 && this.clickcount>= 1)
    {

        this.ufo.drawUFO(gl, shaderProgram,this.ufolon,this.ufolat)
    }
}

HJ_Manager.prototype.reCalculate_ModelViewProjectionRelToEyeMatrix = function(scene)
{
    if(scene.context._us._modelView[0] == 0 && scene.context._us._modelView[1] == 0 && scene.context._us._modelView[2] == 0 && scene.context._us._modelView[3] == 0 &&
        scene.context._us._modelView[4] == 0 && scene.context._us._modelView[5] == 0 && scene.context._us._modelView[6] == 0 && scene.context._us._modelView[7] == 0 &&
        scene.context._us._modelView[8] == 0 && scene.context._us._modelView[9] == 0 && scene.context._us._modelView[10] == 0 && scene.context._us._modelView[11] == 0 &&
        scene.context._us._modelView[12] == 0 && scene.context._us._modelView[13] == 0 && scene.context._us._modelView[14] == 0 && scene.context._us._modelView[15] == 0 )
    {
        return;
    }
    var modelViewRelToEye = new Cesium.Matrix4();
    modelViewRelToEye = Cesium.Matrix4.clone(scene.context._us._modelView);
    modelViewRelToEye[12] = 0.0;
    modelViewRelToEye[13] = 0.0;
    modelViewRelToEye[14] = 0.0;
    var modelViewProjectionRelToEye = new Cesium.Matrix4();
    Cesium.Matrix4.multiply(scene.context._us._projection, modelViewRelToEye, modelViewProjectionRelToEye);
    Cesium.Matrix4.toArray(modelViewProjectionRelToEye, this.modelViewProjRelToEye_matrix);
}

HJ_Manager.prototype.calculate_encodedCameraPositionMC_HighLow = function(encodedCamPosMC_High, encodedCamPosMC_Low, cameraPosition)
{
    var camSplitVelue_X  = Cesium.EncodedCartesian3.encode(cameraPosition.x);
    var camSplitVelue_Y  = Cesium.EncodedCartesian3.encode(cameraPosition.y);
    var camSplitVelue_Z  = Cesium.EncodedCartesian3.encode(cameraPosition.z);

    this.encodedCamPosMC_High[0] = camSplitVelue_X.high;
    this.encodedCamPosMC_High[1] = camSplitVelue_Y.high;
    this.encodedCamPosMC_High[2] = camSplitVelue_Z.high;

    this.encodedCamPosMC_Low[0] = camSplitVelue_X.low;
    this.encodedCamPosMC_Low[1] = camSplitVelue_Y.low;
    this.encodedCamPosMC_Low[2] = camSplitVelue_Z.low;
};