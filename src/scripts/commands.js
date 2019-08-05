let Commands = function(){
    this.commandList = [];
    this.errors = false;
    let Parent = this;
    this.Automate = false;

    this.AddCommand = function(cmd){
        this.commandList.push(cmd);
    }

    this.Automate = function(){
        if (this.commandList.length > 0)
            validator.Info("Aborting commands.");
        else
            validator.Warning("No Commands entered");
        this.commandList = [];
    }

    this.ExecuteCommands = function(drone){
        if (this.commandList.length > 0){
            let commands = this.commandList;                   
            RunCommand(commands, drone);
            this.commandList = [];
        }
    }

    function RunCommand(commands, drone){
        let command = commands[0];
        if (command.Drone !== null){
            if (validator.IsDroneDeployed(drone)){
                validator.Warning("Drone has already been deployed. Aborting command.");
                return;
            }
            drone.Place();
        } else if (command.drone === undefined){
            if (validator.IsDroneDeployed(drone) === false){
                validator.Danger("Drone has not been deployed");
                return;
            }

            if (command.Instruction === "Left" || command.Instruction === "Right"){
                drone.ChangeDirection(command.Instruction);
                drone.Remove();
                drone.Place();
            }  
            
            if (command.Instruction === "Move"){
                if (validator.CanMove(drone) === true){
                    drone.Remove();
                    drone.Move();
                    drone.Place();
                } else {
                    validator.Danger("Move out of bounds. Ignoring command.");
                    Parent.errors = true;
                }
            }
            if (command.Instruction === "Report")
                drone.Report();
            if (command.Instruction === "Attack"){
                if (validator.CanFire(drone) === true)
                    drone.Attack(2);
                else{
                    Parent.errors = true;
                    validator.Warning("Action is too risky. Ignoring command.");
                }
            }
        }
        commands.shift();
        if (commands.length > 0){
            setTimeout(function() {                    
                RunCommand(commands, drone);
            }, 1000)
        }else{
            // if (Parent.errors === false)
            //     validator.Success("All commands have been excecuted succesfully.");
            // else
            //     validator.Danger("Commands have been excecuted with errors.");
            Parent.errors = false;
        }
    }
}