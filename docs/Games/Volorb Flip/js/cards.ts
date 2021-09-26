var level = 1;
class Cards {
    cardNums: number[][];

    constructor(level: number, sideLength: number) {
        this.cardNums = this.makeVolorbArr(level, sideLength);

    }
    

    randbetween(min: number, max: number){
        return Math.floor(Math.random() * (max-min) + min);
    }
    ones(length: number): number[]{
        var arr;
        for(var i = 0; i < length; i ++){
            arr[i] = 1;
        }
        return arr;
    }
    swap(arr, a, b){
        var c = arr[a];
        arr[a] = arr[b];
        arr[b] = c;
    }
    shuffleArr(arr: number[]){
        for(var a = 0; a < arr.length; a++){
            let b = this.randbetween(a, arr.length)
            this.swap(arr, a , b);

        }
    }
    makeVolorbArr(level: number, sideLength: number): number[][] {
        var volorbs = level + 2;
        //starts with 5
        let cardArr: number[][];
        var nums = this.ones(sideLength * sideLength);
        for (let i = 0; i < volorbs; i ++){
            nums[i] = 0;
        }
        for(let i = 0; i < volorbs + sideLength; i ++){
            nums[this.randbetween(volorbs, sideLength * sideLength)] += 1;
        }
        this.shuffleArr(nums);
        for(let a = 0; a < sideLength; a ++){
            for (let b = 0; b < sideLength; b++) {
                cardArr[a][b] = nums[a * sideLength + b]
                
            }
        }
        console.log(cardArr);
        return cardArr;
    }
}
