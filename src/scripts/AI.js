let AI = function(){
    this.Player1;
    this.EnemyCommands = ["Move", "Left", "Right", "Attack"];
    Parent = this;

    this.TrackPlayer = function(player){
        this.Player1 = player;
        if (this.Player1.Moves > 1){
            automator.SpawnEnemies();
        }
    }

    this.DetermineSafeCoordinates = function(){
        let x, y, d;
        if (this.Player1.X_coordinate < 5)
            x = + this.Player1.X_coordinate + 5;
        else
            x = + this.Player1.X_coordinate - 5;

        if (this.Player1.Y_coordinate < 5){
            y = + this.Player1.X_coordinate + 5;
            d = "North"
        }
        else{
            y = + this.Player1.Y_coordinate - 5;
            d = "South";
        }

        return ({x : x, y : y, d : d});
    }

    this.MakeDecision = function(drone){
        let dir = TrackPlayer(drone, this.Player1);
        let dec = OrientSelf(drone, dir);
        return dec;
    }

    function IsPlayerInRange(drone){
        if (drone.X_coordinate === Parent.Player1.X_coordinate || drone.Y_coordinate === Parent.Player1.Y_coordinate)
            return true;
    }

    function OrientSelf(drone, dir){
        let command;
        let face = drone.Direction;
        if (face === dir){
            if (IsPlayerInRange(drone) === true)
                return "Attack";
            return "Move";
        }
        if (face === "North")
            command = (dir === "East" || dir === "South") ? "Right" : "Left";
        if (face === "South")
            command = (dir === "East" || dir === "North") ? "Left" : "Right";
        if (face === "East")
            command = (dir === "North" || dir === "West") ? "Left" : "Right";
        if (face === "West")
            command = (dir === "East" || dir === "North") ? "Right" : "Left";
        return command;
    }

    function TrackPlayer(e, player){
        let x, y, lat, lon;
        if (+player.X_coordinate > +e.X_coordinate){
            x = (+player.X_coordinate) - (+e.X_coordinate);
            lat = "East";
        }else{
            x = (+e.X_coordinate) - (+player.X_coordinate);
            lat = "West";
        }

        if (+player.Y_coordinate > +e.Y_coordinate){
            y = (+player.Y_coordinate) - (+e.Y_coordinate);
            lon = "South";
        }else{
            y = (+e.Y_coordinate) - (+player.Y_coordinate);
            lon = "North";
        }

        if (x > y)
            return lat;
        else
            return lon;
    }
}