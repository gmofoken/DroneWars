let Player = new Drone();
let commands = new Commands();
let validator = new Validator();

$(function() {
    Init();

    $("#btnPlaceDrone").click(function(){
        Player.InitiateDrone();
        PlaceDrone();
    })

    $(".commands").click(function(){
        let instruction = this.id;

        Command(instruction);
    });

    $("#btnExecute").click(function(){
        validator.Info("Executing commands.");
        commands.ExecuteCommands(Player);
    });

    $("#btnAbort").click(function(){
        commands.Abort();
    });
});

function Command(instruction){
    let command = {
        Drone : null,
        Instruction : instruction
    };
    commands.AddCommand(command);
    //validator.Info(instruction + " command has been entered.");
    commands.ExecuteCommands(Player);
}

function Init(){
    let sideCol = '<div class="col col-xs-1"></div>';

    for (i = 0; i < 10; i++){
        $("#board").append(sideCol);
        for (j = 0; j < 10; j++){
            var bg_image = ' <img class="image" id="img'+i+j+'"> '
            var innerCol = '<div class="col col-xs-1 board_cells" id="'+ i+ j+ '">'+bg_image+'</div>';
            $("#board").append(innerCol);
        }
        $("#board").append(sideCol);
    }

    let height = document.getElementById("00").clientWidth;
    let el = document.getElementsByClassName("col");

    for(i = 0; i < el.length; i++)
        el[i].style.height = height+"px";
}

function PlaceDrone(){
    let command = {
        Drone : Player,
        Instruction :  "place"
    };
    commands.AddCommand(command);
    //validator.Info("Drone has been deployed.");
    commands.ExecuteCommands(Player);
}

function AutoPlaceDrone(){
    if (validator.IsDroneDeployed(Player) === false)
        Player.SpawnPlayer();
    PlaceDrone();
}

function KeyLog(){
    let x = event.which || event.keyCode;
    let instruction;

    if (x === 119)
        instruction = "Move";
    else if(x === 97)
        instruction = "Left";
    else if (x === 100)
        instruction = "Right";
    else if (x === 102)
        instruction = "Attack";
    else if (x === 114)
        instruction = "Report";
    else if (x === 112)
        AutoPlaceDrone();

    if (instruction !== undefined)
        Command(instruction);
}