class Board{ 
    /* control level constants from here. 
    This will allow me to fine tune it later
    */
    levelToSideLengths = [4,5,5,6,6,6,7,7];
    levelToVolorbs = [3,4,5,6,8,9,10,12];
    constructor(level){
        //naming convention: basic data types are going to use lower case names
        //while arrays and complex objects have upper case names (for members)
        //variables will still use camel case
        this.sideLength = levelToSideLengths[level];
        this.Volorbs = levelToVolorbs[level];
        this.Cards = fillBoard(sideLength, 4);
        this.Canvas = HTMLCanvasElement(document.getElementById("board"));
        this.Canvas.displayHeight = 400;
        this.Canvas.displayWidth = 300;
        this.Canvas.backgroundColor = "Red";
    }
    fillBoard(sideLength, Volorbs) {
        board = [];
        // fill the board with 1's
        for (let row = 0; row < array.length; row++) {
            board[row] = [];
            for(let col = 0; col < board.length; col++) {
                board[row][col] = 1;
            }
        }    
        //make those zero's because they are volorbs (0's)
        for(let i = 0; i < Volorbs; i++){
            let row = Math.floor(Math.random() * sideLength);
            let col = Math.floor(Math.random() * sideLength);
            //check if square is already a volorb in the square
            if(board[row][col] == 0){
                // if there is -> deincrement i and try again (redo)
                i--;
                continue
            }

            board[row][col] = 0;

        }
        /* now increment the values in so that for each volorb, you add 1 somewhere else. 
        I would check to make sure that I'm not putting them in a volorb square, but frankly
        I'm going to not. That way, the amount of volorbs will start low and get asymtotically high, 
        It's wierd but I'm going to do it for now
        */
        for(let i = 0; i < Volorbs; i++){
            let row = Math.floor(Math.random() * sideLength);
            let col = Math.floor(Math.random() * sideLength);
            if(board[row][col] == 3){
                i --;
                continue;
            }
            board[row][col] += 1;
        }                
        return board;

    }
    clearBoard(){
        
        while (this.table.hasChildNodes()) {
            this.table.removeChild(this.table.children[0]);
        }
    }
    displayBoard(){
        console.error("This isn't implementedd yet");
    }
    
}