let Automator = function(){
    this.Enemies= [];

    this.SpawnEnemies = function(){
        if (this.Enemies.length < 1){
            let enemy = new Drone();
            enemy.InitiateEnemy();
            enemy.Place()
            this.Enemies.push(enemy);
            enemy.Automate();
        }
    }
}