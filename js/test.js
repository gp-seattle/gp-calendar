var data = require('./calDataToJson');

//takes in a starting date and removes anything from data that isnt on or after the starting date
function startDate(start){
    var temp = []
    for (i = data.length - 1; i >= 0; i--) {
        if (parseInt(data[i]['Date']) >= start) {
            temp.unshift(data[i])
        }
    }
    data = temp;
    temp = []

}

//takes in an end date and removes anything from data that isnt on or before the end date
function endDate(end){
    var temp = []
    for (i = data.length - 1; i >= 0; i--) {
        if (parseInt(data[i]['Date']) <= end) {
            temp.unshift(data[i])
        }
    }
    data = temp;
    temp = []

}


console.log(data.length)
