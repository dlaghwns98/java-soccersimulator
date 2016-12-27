/**
 * Created by hojun Lim on 2016-11-04.
 */
var Game_Bounding_Box = function ()
{
    this.min_x = 0;
    this.max_x = 0;

    this.min_y = 0;
    this.max_y = 0;

    this.min_z = 0;
    this.max_z = 0;
}
Game_Bounding_Box.prototype.isPointinside = function (point_x,point_y,point_z)
{
        var is_point_inside = false;

    if( point_x > this.min_x && point_x <this.max_x)
    {
        if(point_y > this.min_y && point_y < this.max_y)
        {
            if(point_z > this.min_z && point_z < this.max_z)
            {
                is_point_inside = true;
            }
        }
    }

    return is_point_inside;
}
Game_Bounding_Box.prototype.Growup = function (growup_x,growup_y,growup_z)
{
    this.min_x -= growup_x;
    this.max_x += growup_x;

    this.min_y -= growup_y;
    this.max_y += growup_y;

    this.min_z -= growup_z;
    this.max_z += growup_z;
}