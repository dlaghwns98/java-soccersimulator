/**
 * Created by hojun Lim on 2016-11-29.
 */

HJ_Manager.prototype.drawScenOnCesium = function (gl, scene, cameraPosition)
{
    var lat = 37.5172076;
    var lon = 126.929;
    var height = 10000.0;
    //gl.enable(gl.CULL_FACE);
    var position = Cesium.Cartesian3.fromDegrees(lon, lat, height);
    var absPos = vec3.create([position.x, position.y,position.z]);
    //gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);




    Cesium.Matrix4.toArray(scene._context._us._modelView, this.mvMatrix);
    Cesium.Matrix4.toArray(scene._context._us._projection, this.pMatrix);

    // Cesium globe transformation matrix.********************************************************
    Cesium.Transforms.eastNorthUpToFixedFrame(position, undefined, this.transforMat4);
    this.transforMat4[12] = 0;
    this.transforMat4[13] = 0;
    this.transforMat4[14] = 0;
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


    gl.useProgram(shaderProgram.shaderProgram);
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, this.pMatrix);
    gl.uniform3fv(shaderProgram.objposUniform, [position.x, position.y,position.z]);
    //1
    gl.uniformMatrix4fv(shaderProgram.mvProjectionRelToEyeUniformMatrix, false, this.modelViewProjRelToEye_matrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mvMatrix);
    //1
    gl.uniform3fv(shaderProgram.camPosHigh, this.encodedCamPosMC_High);
    gl.uniform3fv(shaderProgram.camPosLow, this.encodedCamPosMC_Low);

    //drawtransforMatrix
    var normalMatrix = mat4.create();
    mat4.toInverseMat3(this.mvMatrix, normalMatrix);
    mat4.transpose(normalMatrix);
    gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, normalMatrix);

    var identityMat = mat4.create();
    mat4.identity(identityMat);
    gl.uniformMatrix4fv(shaderProgram.objTransfMat4, false, this.transforMat4);
    this.Artiability.drawwingright(gl, shaderProgram, this.transforMat4);



    //************************************************************************
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.depthRange(0, 1);

}