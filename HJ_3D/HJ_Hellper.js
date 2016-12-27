/**
 * Created by hojun Lim on 2016-11-09.
 */
var HJ_Helper = function ()
{

}
HJ_Helper.prototype.fromDegreesToRadians = function (degreeAngle)
{
    var radianAngle  = degreeAngle*Math.PI/180;
    return radianAngle;
}