let rootStyle = getComputedStyle(document.querySelector(':root'));
let offColor = rootStyle.getPropertyValue('--offcolor');
let onColor = rootStyle.getPropertyValue('--oncolor');

let numberPosition = [
    ['row-1', 'row-2', 'row-3', 'row-4', 'col-1', 'col-3'],
    ['row-2', 'row-3'],
    ['row-2', 'row-4', 'col-1', 'col-2', 'col-3'],
    ['row-2', 'row-3', 'col-1', 'col-2', 'col-3'],
    ['row-1', 'row-2', 'row-3', 'col-2'],
    ['row-1', 'row-3', 'col-1', 'col-2', 'col-3'],
    ['row-1', 'row-3', 'row-4', 'col-1', 'col-2', 'col-3'],
    ['row-2', 'row-3', 'col-1'],
    ['row-1', 'row-2', 'row-3', 'row-4', 'col-1', 'col-2', 'col-3'],
    ['row-1', 'row-2', 'row-3', 'col-1', 'col-2', 'col-3']
]


function selectors(selector, number, position) {
    let selectNumber = document.querySelector(`.${selector}.number-${number}`);
    return selectNumber.querySelector(`.${position}`);
}

function clearNumberColor(selector) {
    for (let number = 1; number <= 2; number++) {
        let selectNumber = document.querySelector(`.${selector}.number-${number}`);
        let row = selectNumber.getElementsByClassName('row');
        let col = selectNumber.getElementsByClassName('col');

        for (let i = 0; i < row.length; i++) {
            row[i].style.setProperty('--color', offColor);
            col[i]?.style.setProperty('--color', offColor);
        }
    }
}

function setNumberColor(time, number) {
    clearNumberColor(time);

    for (let i = 0; i < number.length; i++) {
        for (let j = 0; j < numberPosition[number[i]].length; j++) {
            let numberIndex = selectors(time, i + 1, numberPosition[number[i]][j]);
            numberIndex.style.setProperty('--color', onColor);
        }
    }
}


function startTimes() {
    const prefix0 = (num) => {
        let numStr = num.toString()
        return numStr.length === 1 ? '0' + numStr : numStr
    }

    const date = new Date()
        , hours = date.getHours()
        , minutes = date.getMinutes()
        , seconds = date.getSeconds()

        , hours12 = 1 <= hours && hours <= 12 ? hours : hours === 0 ? 12 : hours - 12
        , times = 0 <= hours && hours <= 11 ? 'AM' : 'PM'
        , toDay = date.getDate()
        , month = date.getMonth()

    setNumberColor('hours', prefix0(hours12))
    setNumberColor('minutes', prefix0(minutes))
    setNumberColor('seconds', prefix0(seconds))

    let timesId = document.getElementById('times')
    timesId.innerText = times
    timesId.style.color = onColor

    let dates = document.getElementById('dates')
    dates.innerText = `${prefix0(toDay)}-${prefix0(month + 1)}`
    dates.style.color = onColor



    let dot = document.getElementsByClassName('dot');
    for (let i = 0; i < dot.length; i++) {
        dot[i].style.backgroundColor = onColor;
    }
}

startTimes()
setInterval(startTimes, 1000)

