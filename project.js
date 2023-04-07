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
        const lines = parseFloat(prompt("Enter number of lines (3): "));
        if (isNaN(lines) || lines <= 0 || lines>3) {
            console.log("Invalid lines!Try again");
        } else {
            return lines;
        }
    }
};
//collect bet amount
//some logical mistakes 
function betAmount(totalAmount , totalLines) {
    let bet= 0;
    const tl = totalLines;
    while (true) {
        while(totalLines!=0){
            let betInput = parseFloat(prompt("Enter bet amount per line : "));
            if (isNaN(betInput) || betInput<=0 || betInput>totalAmount/totalLines ) {
                console.log("Invalid!Try again");
                totalLines++;
            }else{
                bet = bet+betInput;
            }     
            totalLines--;   
        }
            return bet
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

    console.log(reel)

    return reel;
}

function transpose(reel){
    const transposeArr = [];
    const actualTranArr = [];
    for(let j = 0;j<reel.length;j++)
    {
        const temp = [];
        let tempArr2 = "";
        for(let [index,value] of reel.entries()){
           // console.log(index,value)
           temp.push(value[j]);
            tempArr2 +=value[j];              
            if(index < value.length-1){
                tempArr2 += "|";
            }
        }
        transposeArr.push(tempArr2);
        actualTranArr.push(temp);

    }
    console.log(transposeArr.join('\r\n'))
    
    
    return actualTranArr

};

function wincheck(tr){
    const boolArr = [];
    for(let t of tr){
        const result = t.every(item => {
            if(item === t[0])
            {
                return true;                
            }
        });
        boolArr.push(result);

    }
    console.log(boolArr)
    return boolArr;
    
};

function winCondition(totalAmount,totalBet,tr){
    const resultArr = wincheck(tr);
    if (!resultArr.includes(true)){
        console.log("You lost")
    }
    else{
        for(let i=0;i<resultArr.length;i++){
            if(resultArr.pop() === true)
            {
                const element = tr.at(i)[0];
                const winAmount = totalBet*slotValue[element];
                console.log("you won!",winAmount);
                totalAmount+=winAmount; 
    
            }
        }

    }

    
   





};


//win??update user money
//lost?update user money
//play again(if he has money left)

function game(){
    let totalAmount = deposit();
    let totalLines = betLine();
    let totalBet = betAmount(totalAmount,totalLines);
    console.log(totalBet);
    const res = slotMachine();
    const tr = transpose(res);
    winCondition(totalAmount,totalBet,tr);

}
game()



