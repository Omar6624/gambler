const arrayofObjects = [];
const objectsOfSlot ={
    A:3,
    B:4,
    C:6,
    D:6
};

const slotValue = {
    A:5,
    B:4,
    C:3,
    D:2
};


//deposit some money
const prompt = require("prompt-sync")();

function deposit() {
    while (true) {
        const depositAmount = parseFloat(prompt("Enter a deposit amount: "));
        if (isNaN(depositAmount) || depositAmount <= 0) {
            console.log("Invalid amount!Try again");
        } else {
            return depositAmount;
        }
    }
};
// console.log(depAmount);

//number of line to bet on
function betLine() {
    while (true) {
        const lines = parseFloat(prompt("Enter number of lines (1-3): "));
        if (isNaN(lines) || lines <= 0 || lines>3) {
            console.log("Invalid lines!Try again");
        } else {
            return lines;
        }
    }
};
//collect bet amount
function betAmount(totalAmount , totalLines) {
    let bet= 0;
    const tl = totalLines;
    while (true) {
        while(totalLines!=0){
            let betInput = parseFloat(prompt("Enter bet amount per line : "));
            if (isNaN(betInput) || betInput<=0 || betInput>totalAmount ) {
                console.log("Invalid!Try again");
                totalLines++;
            }else{
                bet = bet+betInput;
            }     
            totalLines--;   
        }

            if(bet>totalAmount){
                console.log("not enough credit!Try again");
                bet = 0;  
                totalLines = tl;                                     
            }else{
                return bet;
            }
    }
};
//spin slot machine
function slotMachine(){
    
    const slots=[];
    const col = 3;
    const row = 3;
    for(let [sub,count] of Object.entries(objectsOfSlot))
    {
        for(let i = 0 ; i< count ; i++)
        {
            arrayofObjects.push(sub);
        } 
    }
    const reel = [];
    //random select
    const reelArray = [...arrayofObjects];
    for(let i = 0;i<col;i++){
        const tempArr = []
        for(let j = 0;j<row;j++){
            const randomIndex = Math.floor(Math.random()*reelArray.length);
            tempArr.push(reelArray[randomIndex]);
        }
        reel.push(tempArr);
    }
    console.log(reel);
    return reel;
}

slotMachine();

//win??update user money
//lost?update user money
//play again(if he has money left)


// let totalAmount = deposit();
// let totalLines = betLine();
// let totalBet = betAmount(totalAmount,totalLines);
// console.log(totalBet);