let AI = function(){
    this.Player1;
    this.EnemyCommands = ["Move", "Left", "Right", "Attack"];

    this.TrackPlayer = function(player){
        this.Player1 = player;
        if (this.Player1.Moves > 3){
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
        let dec = OrientSelf(drone.Direction, dir);
        return dec;
    }

    function OrientSelf(face, dir){
        let command;
        if (face === dir)
            return "Move"
        if (face === "North")
            command = (dir === "East") ? "Right" : "Left";
        if (face === "South")
            command = (dir === "East") ? "Left" : "Right";
        if (face === "East")
            command = (dir === "North") ? "Left" : "Right";
        if (face === "West")
            command = (dir === "East") ? "Right" : "Left";
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