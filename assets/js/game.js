var randomNumber = function(min, max){
    var value = Math.floor(Math.random()*(max-min +1)+min);
    return value;
};

var shop = function(){
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for 'REFILL', 2 for 'UPGRADE', or 3 for 'LEAVE' to make a choice.");
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt){
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("leaving the store");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

var fightOrSkip = function(){
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    console.log(promptFight);
    if (!promptFight){
        window.alert("You need to provide a valid answer! Please try again.");
        fightOrSkip();
    }
    if(promptFight.toLowerCase()==="skip"){
        var confirmSkip= window.confirm("Are you sure you want to quit?");
        if (confirmSkip){
            window.alert(playerInfo.name + " has decided to quit a fight. Goodbye!")
            playerInfo.money = Math.max(0, playerInfo.money -10);
            console.log("Player Money ", playerInfo.money );
            return true;
        }
    }
    return false;
};

var fight = function(enemy) {
    while( enemy.health >0 && playerInfo.health>0) {
    if(fightOrSkip()){
        break;
    }

    var damage = randomNumber(playerInfo.attack-3, playerInfo.attack);
    enemy.health=Math.max(0, enemy.health-damage);
    console.log(playerInfo.name+ " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.")

    // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            playerInfo.money =playerInfo.money +20;
            break;
        } 
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        var damage = randomNumber(enemy.attack-3, enemy.attack);
        playerInfo.health=Math.max(0, playerInfo.health-damage);
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
        
        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        } 
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

var getPlayerName = function(){
    var name = "";
    while(name==="" || name===null){
        name= prompt("What is your robot's name?");
    }
    console.log(name);
    return name;
};

var playerInfo ={ 
    name : getPlayerName(),
    health : 100,
    attack : 10,
    money : 10,
    reset: function(){        
    this.health = 100;
    this.attack = 10;
    this.money  = 10;
    },
    refillHealth: function(){
        if (this.money >= 7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else{
            window.alert("You don't have enough money!")
        }
    },
    upgradeAttack: function(){
        if (this.money >= 7){
            window.alert("Upgarding player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else{
            window.alert("You don't have enough money!")
        }
    }
};

// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyInfo = [
    {
        name: "Roborto",
        attack : randomNumber(10,14)
    }, 
    {
        name: "Amy Android",
        attack : randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack : randomNumber(10,14)
    }
];


var startGame = function(){
    playerInfo.reset();

    for (var i=0; i<enemyInfo.length; i++){
        var pickedEnemyObj = enemyInfo[i];
        if (playerInfo.health>0) {
                window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
                pickedEnemyObj.health=randomNumber(40,60);
                fight(pickedEnemyObj);
                if (playerInfo.health>0 && i<enemyInfo.length-1){
                    var storeConfirm = window.confirm('The fight is over, visit the store before the next round ?')
                    if (storeConfirm){
                        shop();
                    }
                }
            }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    endGame();
};

var endGame = function() {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
      window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money  + ".");
    } 
    else {
      window.alert("You've lost your robot in battle.");
    }
    // ask player if they'd like to play again
var playAgainConfirm = window.confirm("Would you like to play again?");

if (playAgainConfirm) {
  // restart the game
  startGame();
} 
else {
  window.alert("Thank you for playing Robot Gladiators! Come back soon!");
}
};

startGame();

