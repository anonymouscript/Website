

class Collision {
    //checks if there is a collision between two objects
    //this is the code that the tutorial instructed me to use, but phaser might have better functions to use
    //not only might they be built in, but this function may have a few things that would cause it to be inaccurate
    // for instance, what if the origins of sprites or images are not in the center?
    
    static checkCollide(obj1, obj2) {
        var distX = Math.abs(obj1.x - obj2.x);
        var distY = Math.abs(obj1.y - obj2.y);
        if (obj1.width > distX) {
            if (obj1.height > distY) {
                return true;
            }
        }
        return false;
    }
}
