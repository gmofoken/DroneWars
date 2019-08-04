let drone = new Drone();
let commands = new Commands();
let validator = new Validator();

$(function() {
    Init();

    $( "#success" ).click(function() {
        bootoast.toast({
            message: 'This is a success toast message',
            type: 'success'
        });
    });

    $("#btnPlaceDrone").click(function(){
        drone.InitiateDrone();
        let command = {
            Drone : drone,
            Instruction :  "place"
        };
        commands.AddCommand(command);
        validator.Info("Drone has been deployed.");
    })

    $(".commands").click(function(){
        let instruction = this.id;

        let command = {
            Drone : null,
            Instruction : instruction
        };
        commands.AddCommand(command);
        validator.Info(instruction + " command has been entered.");
    });

    $("#btnExecute").click(function(){
        validator.Info("Executing commands.");
        commands.ExecuteCommands();
    });

    $("#btnAbort").click(function(){
        commands.Abort();
    });
});

function Init(){
    var sideCol = '<div class="col col-xs-1"></div>';

    for (i = 0; i < 10; i++){
        $("#board").append(sideCol);
        for (j = 0; j < 10; j++){
            var bg_image = ' <img class="image" id="img'+i+j+'"> '
            var innerCol = '<div class="col col-xs-1 board_cells" id="'+ i+ j+ '">'+bg_image+'</div>';
            $("#board").append(innerCol);
        }
        $("#board").append(sideCol);
    }

    var height = document.getElementById("00").clientWidth;
    var el = document.getElementsByClassName("col");

    for(i = 0; i < el.length; i++)
        el[i].style.height = height+"px";
}