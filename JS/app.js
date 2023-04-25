const arr = [
    "0","1","2"
,   "3","4","5"
,   "6","7","8"
];
let turn = 'x';
let gameIsFinish = false;

let Items = document.getElementsByClassName("box");
for(const item of Items){
    item.addEventListener("click" , () => {
        let value = item.getAttribute("value");
        if(arr[value] == 'X' || arr[value] == 'O'){
            return;
            console.log("same");
        }
        if(gameIsFinish){
            return;
        }
        arr[value] = turn.toUpperCase();
        document.querySelector(`.box[value='${value}'] .square-content`).innerHTML = turn.toUpperCase();
        evaluateBoard();
        (turn == 'x') ? turn = 'o' : turn = 'x';  
        document.getElementById("instruction").innerHTML = `${turn.toUpperCase()} Turn`;

    });
}

function evaluateBoard(){
    if(
        // Rows
        (arr[0] == arr[1] && arr[1] == arr[2]) ||
        (arr[3] == arr[4] && arr[4] == arr[5]) ||
        (arr[6] == arr[7] && arr[7] == arr[8]) ||

        // Columns
        (arr[0] == arr[3] && arr[3] == arr[6]) ||
        (arr[1] == arr[4] && arr[4] == arr[7]) ||
        (arr[2] == arr[5] && arr[5] == arr[8]) ||

        // Diagol 
        (arr[0] == arr[4] && arr[4] == arr[8]) ||
        (arr[2] == arr[4] && arr[4] == arr[6]) 
    )
    {
        // alert(turn);
        Swal.fire(`(${turn}) is winner`);
        gameIsFinish = true;
    }

    let isDraw = true;
    for(const i of arr){
        if(i != 'X' &&  i != 'O'){
            isDraw = false;
        }
    }

    if(isDraw && !gameIsFinish){
        gameIsFinish = true;
        // alert("Draw");
        Swal.fire("Draw");
    }
}   

document.getElementById("reset").addEventListener("click" , ()=> {
    reset();
})

function reset() {
    const boxes = document.getElementsByClassName("box");
    turn = 'x';
    document.getElementById("instruction").innerHTML = `${turn.toUpperCase()} Turn`;
    for(const i of boxes){
        let value = i.getAttribute("value");
        document.querySelector(`.box[value='${value}'] .square-content`).innerHTML = "";
        arr[value] = `'${value}'`;
    }
    gameIsFinish = false;
}