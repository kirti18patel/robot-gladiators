var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    while( enemyHealth>0 && playerHealth>0) {
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    if(promptFight==="skip" || promptFight==="Skip" || promptFight==="SKIP"){
        var confirmSkip= window.confirm("Are you sure you want to quit?");
        if (confirmSkip){
            window.alert(playerName + " has decided to quit a fight. Goodbye!")
            playerMoney=playerMoney-10;
            console.log("Player Money ", playerMoney);
            break;
        }
    }

    enemyHealth=enemyHealth-playerAttack;
    console.log(playerName+ " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.")

    // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            playerMoney=playerMoney+20;
            break;
        } 
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        playerHealth=playerHealth-enemyAttack;
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
        
        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        } 
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

for (var i=0; i<enemyNames.length; i++){
if (playerHealth>0) {
        window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
        enemyHealth=50;
        fight(enemyNames[i]);
    }
else {
    window.alert("You have lost your robot in battle! Game Over!");
    break;
}
}