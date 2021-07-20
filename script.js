let color = 'red';
let numberPosition = {
    '0': ['row-1', 'row-2', 'row-3', 'row-4', 'col-1', 'col-3'],
    '1': ['row-2', 'row-3'],
    '2': ['row-2', 'row-4', 'col-1', 'col-2', 'col-3'],
    '3': ['row-2', 'row-3', 'col-1', 'col-2', 'col-3'],
    '4': ['row-1', 'row-2', 'row-3', 'col-2'],
    '5': ['row-1', 'row-3', 'col-1', 'col-2', 'col-3'],
    '6': ['row-1', 'row-3', 'row-4', 'col-1', 'col-2', 'col-3'],
    '7': ['row-2', 'row-3', 'col-1'],
    '8': ['row-1', 'row-2', 'row-3', 'row-4', 'col-1', 'col-2', 'col-3'],
    '9': ['row-1', 'row-2', 'row-3', 'col-1', 'col-2', 'col-3']
};


function selectors(selector, number, position) {
    let selectNumber = document.querySelector(`.${selector}.number-${number}`);
    return selectNumber.querySelector(`.${position}`);
}

function clearColor(selector) {
    for (let number = 1; number <= 2; number++) {
        let selectNumber = document.querySelector(`.${selector}.number-${number}`);
        let row = selectNumber.getElementsByClassName('row');
        let col = selectNumber.getElementsByClassName('col');

        for (let i = 0; i < row.length; i++) {
            row[i].style.setProperty('--bgc', '#636d80');
        }
        for (let i = 0; i < col.length; i++) {
            col[i].style.setProperty('--bgc', '#636d80');
        }
    }
}

function setNumberColor(time, number) {
    clearColor(time);

    let numberStr = number.toString();
    numberStr = numberStr.length === 1 ? '0' + numberStr : numberStr;

    for (let i = 0; i < numberStr.length; i++) {
        for (let j = 0; j < numberPosition[numberStr[i]].length; j++) {
            let numberIndex = selectors(time, i + 1, numberPosition[numberStr[i]][j]);
            numberIndex.style.setProperty('--bgc', color);
        }
    }
}

let date = new Date();
let minutes = date.getMinutes();
let hours = date.getHours();

let getTimes = () => {
    let date = new Date();
    setNumberColor('seconds', date.getSeconds());

    if (minutes < date.getMinutes()) {
        setNumberColor('minutes', date.getMinutes());
        minutes = date.getMinutes();
    }

    if (hours < date.getHours()) {
        hours = hours > 12 ? hours - 12 : hours === 0 ? hours + 12 : hours;
        setNumberColor('hours', hours);
        hours = date.getHours();
    }
};


function start() {
    startTime = setInterval(() => {
        getTimes();
    }, 1000);

    let dot = document.getElementsByClassName('dot');
    setTimeout(() => {
        setNumberColor('minutes', date.getMinutes());
        hours = hours > 12 ? hours - 12 : hours === 0 ? hours + 12 : hours;
        setNumberColor('hours', hours);

        for (let i = 0; i < dot.length; i++) {
            dot[i].style.backgroundColor = color;
        }
    }, 1000);
}

start();

