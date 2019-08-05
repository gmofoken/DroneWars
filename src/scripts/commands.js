let Commands = function(){
    this.commandList = [];
    this.errors = false;

    this.AddCommand = function(cmd){
        this.commandList.push(cmd);
    }

    this.Abort = function(){
        if (this.commandList.length > 0)
            validator.Info("Aborting commands.");
        else
            validator.Warning("No Commands entered");
        this.commandList = [];
    }

    this.ExecuteCommands = function(){
        if (this.commandList.length > 0){
            let commands = this.commandList;                   
            RunCommand(commands, this.errors);
            this.commandList = [];
        }
    }

    function RunCommand(commands, errors){
        let command = commands[0];
        
        if (command.Drone !== null){
            if (validator.IsDroneDeployed()){
                validator.Warning("Drone has already been deployed. Aborting remaining commands.");
                return;
            }
            drone.Place();
        } else if (command.drone === undefined){
            if (validator.IsDroneDeployed() === false){
                validator.Danger("Drone has not been deployed");
                return;
            }

            if (command.Instruction === "Left" || command.Instruction === "Right"){
                drone.ChangeDirection(command.Instruction);
                drone.Remove();
                drone.Place();
            }  
            if (command.Instruction === "Move"){
                if (validator.CanMove() === true){
                    drone.Remove();
                    drone.Move();
                    drone.Place();
                } else {
                    validator.Danger("Move out of bounds. Ignoring command.");
                    this.errors = true;
                }
            }
            if (command.Instruction === "Report")
                drone.Report();
            if (command.Instruction === "Attack"){
                if (validator.CanFire() === true)
                    drone.Attack(2);
                else{
                    this.errors = true;
                    validator.Warning("Action is too risky. Ignoring command.");
                }
            }
        }
        commands.shift();
        if (commands.length > 0){
            setTimeout(function() {                    
                RunCommand(commands, errors);
            }, 1000)
        }else{
            if (errors === false)
                validator.Success("All commands have been excecuted succesfully.");
            else
                validator.Danger("Commands have been excecuted with errors.");
        }
    }
}