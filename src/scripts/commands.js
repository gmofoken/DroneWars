let Commands = function(){
    this.commandList = [];

    this.AddCommand = function(cmd){
        this.commandList.push(cmd);
    }

    this.ExecuteCommands = function(){
        let commands = this.commandList;
        setTimeout(function() {                    
            RunCommand(commands);
        }, 1000)
        this.commandList = [];
    }

    function RunCommand(commands){
        let command = commands[0];
        commands.shift();
        if (command.Drone !== null && command.Drone.Deployed === undefined){
            PlaceDrone();
            drone.Deployed = true;
        } else if (command.drone === undefined){
            if (command.Instruction === "Left" || command.Instruction === "Right"){
                ChangeDirection(command.Instruction);
                RemoveDrone();
                PlaceDrone();
            }  
            if (command.Instruction === "Move"){
                RemoveDrone();//setTimeout(RemoveDrone,2000)
                MoveDrone();
                PlaceDrone();
            }
            if (command.Instruction === "Report")
                $("#announce").text(drone.Report());
            if (command.Instruction === "Attack"){
                Attack(2);   
            }
        }
        if (commands.length > 0){
            setTimeout(function() {                    
                RunCommand(commands);
            }, 1000)
        }
    }

    function Attack(iterations){
        let x = + drone.X_coordinate;
        let y = + drone.Y_coordinate;
        
        if (drone.Direction === "North"){
            if (iterations === 2)
                y--;
            else
                y -= 2;
        }

        if (drone.Direction === "South"){
            if (iterations === 2)
                y++;
            else
                y += 2;
        }

        if (drone.Direction === "East"){
            if (iterations === 2)
                x++;
            else
                x += 2;
        }

        if (drone.Direction === "West"){
            if (iterations === 2)
                x--;
            else
                x -= 2;
        }

        let image =  "img" + y + x;

        if (iterations > 0){
            setTimeout(function() {                    
                DisplayProjectile(image, (iterations + 1));
                Attack(iterations);
            }, 200)
        }
        
        iterations--;
    }

    function MoveDrone()
    {
        let x = + drone.X_coordinate;
        let y = + drone.Y_coordinate;

        if (drone.Direction == "North")
            y--;
        if (drone.Direction == "South")
            y++;
        if (drone.Direction == "East")
            x++;
        if (drone.Direction == "West")
            x--;
        drone.X_coordinate = x+'';
        drone.Y_coordinate = y+'';
    }

    function ChangeDirection(direction){
        if (direction == "Right")
        {
            if (drone.Direction == "North")
                drone.Direction = "East";
            else if (drone.Direction == "East")
                drone.Direction = "South";
            else if (drone.Direction == "South")
                drone.Direction = "West";
            else if (drone.Direction == "West")
                drone.Direction = "North";
        }
        else if (direction == "Left")
        {
            if (drone.Direction == "North")
                drone.Direction = "West";
            else if (drone.Direction == "West")
                drone.Direction = "South";
            else if (drone.Direction == "South")
                drone.Direction = "East";
            else if (drone.Direction == "East")
                drone.Direction = "North";
        }
    }

    function RemoveDrone(){
        let imageId = "img" + drone.Y_coordinate + drone.X_coordinate;
        let image =  "./src/Drones/transparent.png";

        $('#'+imageId).attr("src", image);
    }

    function PlaceDrone(){
        let imageId = "img" + drone.Y_coordinate + drone.X_coordinate;
        let image = (drone.Direction == "North") ? "./src/Drones/North.png" :
        (drone.Direction == "South") ? "./src/Drones/South.png" :
        (drone.Direction == "East") ? "./src/Drones/East.png" : "./src/Drones/West.png";

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

        console.log(imageId);
        let image =  "./src/Drones/transparent.png";

        $('#'+imageId).attr("src", image);
    }
}