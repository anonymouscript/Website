var level = 1;
var Cards = /** @class */ (function () {
    function Cards(level, sideLength) {
        this.cardNums = this.makeVolorbArr(level, sideLength);
    }
    Cards.prototype.randbetween = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    Cards.prototype.ones = function (length) {
        var arr;
        for (var i = 0; i < length; i++) {
            arr[i] = 1;
        }
        return arr;
    };
    Cards.prototype.swap = function (arr, a, b) {
        var c = arr[a];
        arr[a] = arr[b];
        arr[b] = c;
    };
    Cards.prototype.shuffleArr = function (arr) {
        for (var a = 0; a < arr.length; a++) {
            var b = this.randbetween(a, arr.length);
            this.swap(arr, a, b);
        }
    };
    Cards.prototype.makeVolorbArr = function (level, sideLength) {
        var volorbs = level + 2;
        //starts with 5
        var cardArr;
        var nums = this.ones(sideLength * sideLength);
        for (var i = 0; i < volorbs; i++) {
            nums[i] = 0;
        }
        for (var i = 0; i < volorbs + sideLength; i++) {
            nums[this.randbetween(volorbs, sideLength * sideLength)] += 1;
        }
        this.shuffleArr(nums);
        for (var a = 0; a < sideLength; a++) {
            for (var b = 0; b < sideLength; b++) {
                cardArr[a][b] = nums[a * sideLength + b];
            }
        }
        console.log(cardArr);
        return cardArr;
    };
    return Cards;
}());
