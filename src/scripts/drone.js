let Drone = function(){
    let Y_coordinate = 0;
    let X_coordinate = 0;
    let Deployed = false;
    let Direction ;

    this.InitiateDrone = function(){
        this.Direction = document.getElementById("direction").value;
        this.X_coordinate = document.getElementById("x_coordinate").value;
        this.Y_coordinate = document.getElementById("y_coordinate").value;
    }

    this.Report = function(){
        validator.Info( "Output:" + this.Y_coordinate + ',' + this.X_coordinate + ',' + this.Direction);
    }

    this.ChangeDirection = function(direction){
        if (direction == "Right")
        {
            if (this.Direction == "North")
                this.Direction = "East";
            else if (this.Direction == "East")
                this.Direction = "South";
            else if (this.Direction == "South")
                this.Direction = "West";
            else if (this.Direction == "West")
                this.Direction = "North";
        }
        else if (direction == "Left")
        {
            if (this.Direction == "North")
                this.Direction = "West";
            else if (this.Direction == "West")
                this.Direction = "South";
            else if (this.Direction == "South")
                this.Direction = "East";
            else if (this.Direction == "East")
                this.Direction = "North";
        }
    }

    this.Move = function(){
        let x = + this.X_coordinate;
        let y = + this.Y_coordinate;

        if (this.Direction == "North")
            y--;
        if (this.Direction == "South")
            y++;
        if (this.Direction == "East")
            x++;
        if (this.Direction == "West")
            x--;
        this.X_coordinate = x+'';
        this.Y_coordinate = y+'';
    }

    this.Attack = function(iterations){
        let x = + this.X_coordinate;
        let y = + this.Y_coordinate;
        
        if (this.Direction === "North"){
            if (iterations === 2)
                y--;
            else
                y -= 2;
        }

        if (this.Direction === "South"){
            if (iterations === 2)
                y++;
            else
                y += 2;
        }

        if (this.Direction === "East"){
            if (iterations === 2)
                x++;
            else
                x += 2;
        }

        if (this.Direction === "West"){
            if (iterations === 2)
                x--;
            else
                x -= 2;
        }

        let image =  "img" + y + x;

        if (iterations > 0){
            let Parent = this; 
            setTimeout(function() {                    
                DisplayProjectile(image, (iterations + 1));
                Parent.Attack(iterations);
            }, 200)
        }
        
        iterations--;
    }

    this.Place = function(){
        let imageId = "img" + this.Y_coordinate + this.X_coordinate;
        let image = (this.Direction == "North") ? "./src/Drones/North.png" :
        (this.Direction == "South") ? "./src/Drones/South.png" :
        (this.Direction == "East") ? "./src/Drones/East.png" : "./src/Drones/West.png";
        this.Deployed = true;

        $('#'+imageId).attr("src", image);
    }

    this.Remove = function(){
        let imageId = "img" + this.Y_coordinate + this.X_coordinate;
        let image =  "./src/Drones/transparent.png";

        $('#'+imageId).attr("src", image);
    }

    function DisplayProjectile(imageId, iteration){
        let image = (iteration === 2) ? "./src/Drones/bullet.jpg" : "./src/Drones/explosion.png";

        $('#'+imageId).attr("src", image);

        if (iteration > 0){
            setTimeout(function() {                    
                RemoveProjectile(imageId);
            }, 200)
        }
    }

    function RemoveProjectile(imageId){
        let image =  "./src/Drones/transparent.png";

        $('#'+imageId).attr("src", image);
    }
};