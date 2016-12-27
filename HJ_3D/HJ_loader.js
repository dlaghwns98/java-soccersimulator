/**
 * Created by hojun Lim on 2016-12-06.
 */
var HJ_Loader = function ()
{

}
HJ_Loader.prototype.loadImage = function(gl, imagePath, object)
{


    var handleTextureLoaded = function handleTextureLoaded(gl, image, texture)
    {
        // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL
        //var gl = viewer.scene.context._gl;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true); // if need vertical mirror of the image.***
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image); // Original.***
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };

    var loadedImage = new Image();

    loadedImage.onload = function ()
    {
        //console.log("Image Onload");
        if(object.ImageID == undefined)
            object.ImageID = gl.createTexture();
        handleTextureLoaded(gl, loadedImage, object.ImageID);

    };

    loadedImage.onerror = function() {
        // doesn't exist or error loading
        return;
    };

    loadedImage.src = imagePath;
}