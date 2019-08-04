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
        return "Output:" + this.Y_coordinate + ',' + this.X_coordinate + ',' + this.Direction;
    }
};