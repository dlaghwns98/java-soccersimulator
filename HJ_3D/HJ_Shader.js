/**
 * Created by hojun Lim on 2016-11-15.
 */
var HJ_Shader = function ()
{
    this.shader_vertex_source = undefined;
    this.shader_fragment_source = undefined;
    this.shaderProgram = undefined;
    this.shader_vertex = undefined;
    this.shader_fragment = undefined;
    this.position = undefined;

    //*******************************************
    this.vertexPositionAttribute = undefined;
    this.vertexColorAttribute = undefined;
    this.vertexNormalAttribute = undefined;
    this.pMatrixUniform = undefined;
    this.mvMatrixUniform = undefined;
    this.nMatrixUniform = undefined;
    this.objposUniform = undefined;
    this.mvProjectionRelToEyeUniformMatrix = undefined;
}
var HJ_Shader_Manger = function ()
{
    this.shader_array = [];
}


 HJ_Shader_Manger.prototype.getShader = function(gl, source, type, typeString)
 {
     // Source from internet.***
     var shader = gl.createShader(type);
     gl.shaderSource(shader, source);
     gl.compileShader(shader);
         if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
         alert("ERROR IN " + typeString + " SHADER : " + gl.getShaderInfoLog(shader));
         return false;}
     return shader;
 }


HJ_Shader_Manger.prototype.createShader = function (gl)
{
    var shader = new HJ_Shader();
    this.shader_array.push(shader);

    shader.shader_fragment_source = "\n\
    precision mediump float;\n\
    uniform sampler2D diffuseTex;\n\
    varying vec4 vColor;\n\
    varying  vec3 vLighting;\n\
    varying vec2 vTexcoord;\n\
    uniform bool hasTexture;\n\
    void main(void) {\n\
        //if(hasTexture == 1)\n\
        {\n\
            vec4 textureColor = texture2D(diffuseTex, vec2(vTexcoord.s, vTexcoord.t));\n\
            gl_FragColor = vec4(textureColor.rgb * vLighting, textureColor.a);\n\
        }\n\
        //else gl_FragColor = vec4(vColor.xyz * vLighting, vColor.w);\n\
        //gl_FragColor = vec4(vColor.xyz * vLighting, vColor.w);\n\
    }";

    shader.shader_vertex_source = " \n\
    attribute  vec3 aVertexNormal;\n\
    attribute vec2 a_texcoord;\n\
    attribute  vec3 aVertexPosition;\n\
    attribute vec4 aVertexColor;\n\
    uniform  mat4 uNMatrix;\n\
    uniform  mat4 uMVMatrix;\n\
    uniform  mat4 uPMatrix;\n\
    uniform  mat4 uMVProjectionMatrixRelToEye;\n\
    uniform mat4 objTransfMat4;\n\
    uniform  vec3 objectPosition;\n\
    uniform vec3 encodedCameraPositionMCHigh;\n\
	uniform vec3 encodedCameraPositionMCLow;\n\
    varying  vec3 vLighting;\n\
    varying vec4 vColor;\n\
    varying vec2 vTexcoord;\n\
    void main(void) {\n\
        vec4 transformedPos = objTransfMat4 * vec4(aVertexPosition, 1.0);\n\
        vec3 highDifference = objectPosition.xyz -  encodedCameraPositionMCHigh.xyz;\n\
        vec3 lowDifference = transformedPos.xyz - encodedCameraPositionMCLow.xyz;\n\
        vec4 pos = vec4(highDifference.xyz + lowDifference.xyz, 1.0);\n\
        //gl_Position = uPMatrix * uMVMatrix * pos;\n\
        gl_Position = uMVProjectionMatrixRelToEye * pos;\n\
        vColor = aVertexColor;\n\
        //gl_PointSize = 3.0;\n\
         vec3 ambientLight = vec3(0.6, 0.6, 0.6);\n\
         vec3 directionalLightColor = vec3(0.5, 0.5, 0.75);\n\
         vec3 directionalVector = normalize(vec3(0.85, 0.8, -0.75));\n\
         vec4 transformedNormal = uNMatrix * vec4(aVertexNormal, 1.0);\n\
        // vec3 tranfNorm = normalize(vec3(transformedNormal.x, transformedNormal.y, transformedNormal.z));\n\
         float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);\n\
        vLighting = ambientLight + (directionalLightColor * directional);\n\
        vTexcoord = a_texcoord;\n\
        \n\
    }";


    shader.shaderProgram = gl.createProgram();
    shader.shader_fragment = this.getShader(gl, shader.shader_fragment_source, gl.FRAGMENT_SHADER, "shader-fs","ghh");
    shader.shader_vertex = this.getShader(gl, shader.shader_vertex_source, gl.VERTEX_SHADER, "shader-vs");

    gl.attachShader(shader.shaderProgram, shader.shader_vertex);
    gl.attachShader(shader.shaderProgram, shader.shader_fragment);
    gl.linkProgram(shader.shaderProgram);

    if (!gl.getProgramParameter(shader.shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shader.shaderProgram);

    shader.vertexPositionAttribute = gl.getAttribLocation(shader.shaderProgram, "aVertexPosition");
    shader.vertexColorAttribute = gl.getAttribLocation(shader.shaderProgram, "aVertexColor");
    shader.vertexNormalAttribute = gl.getAttribLocation(shader.shaderProgram, "aVertexNormal");
    shader.camPosHigh = gl.getUniformLocation(shader.shaderProgram, "encodedCameraPositionMCHigh");
    shader.camPosLow = gl.getUniformLocation(shader.shaderProgram, "encodedCameraPositionMCLow");
    shader.aTexcoord = gl.getAttribLocation(shader.shaderProgram, "a_texcoord");


    shader.pMatrixUniform = gl.getUniformLocation(shader.shaderProgram, "uPMatrix");
    shader.mvMatrixUniform = gl.getUniformLocation(shader.shaderProgram, "uMVMatrix");
    shader.nMatrixUniform = gl.getUniformLocation(shader.shaderProgram, "uNMatrix");
    shader.objTransfMat4 = gl.getUniformLocation(shader.shaderProgram, "objTransfMat4");
    shader.objposUniform = gl.getUniformLocation(shader.shaderProgram, "objectPosition");
    shader.mvProjectionRelToEyeUniformMatrix = gl.getUniformLocation(shader.shaderProgram, "uMVProjectionMatrixRelToEye");
    shader.hasTexture = gl.getUniformLocation(shader.shaderProgram, "hasTexture");
    shader.diffuseTex = gl.getUniformLocation(shader.shaderProgram, "diffuseTex");

}
