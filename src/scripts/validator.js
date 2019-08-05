let Validator = function() {
    this.IsDroneDeployed = function(drone){
        if (drone.Deployed === false || drone.Deployed === undefined)
            return false;
        else
            return true;
    }

    this.Success = function(message){
        bootoast.toast({
            message: message,
            type: 'success',
            position: 'bottom-right'
        });
    }

    this.Danger = function(message){
        bootoast.toast({
            message: message,
            type: 'danger',
            position: 'bottom-right',
            icon: 'glyphicon glyphicon-user'
        });
    }

    this.Info = function(message){
        bootoast.toast({
            message: message,
            type: 'info',
            position: 'bottom-right'
        });
    }

    this.Warning = function(message){
        bootoast.toast({
            message: message,
            type: 'warning',
            position: 'bottom-right'
        });
    }

    this.CanFire = function(drone){
        if (DistanceFromWall(drone) >= 2)
            return true;
        else
            return false;
    }

    this.CanMove = function(drone){
        if (DistanceFromWall(drone) > 0)
            return true;
        else
            return false;
    }

    function DistanceFromWall(drone) {
        let x = + drone.X_coordinate;
        let y = + drone.Y_coordinate;

        if (drone.Direction === "North")
            return y;
        
        if (drone.Direction === "South")
            return 9 - y;

        if (drone.Direction === "East")
            return 9 - x;

        if (drone.Direction === "West")
            return x;
    }
};