let rootStyle = getComputedStyle(document.querySelector(':root'));
let offColor = rootStyle.getPropertyValue('--offcolor');
let onColor = rootStyle.getPropertyValue('--oncolor');

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

    let numberStr = number.toString();
    numberStr = numberStr.length === 1 ? '0' + numberStr : numberStr;

    for (let i = 0; i < numberStr.length; i++) {
        for (let j = 0; j < numberPosition[numberStr[i]].length; j++) {
            let numberIndex = selectors(time, i + 1, numberPosition[numberStr[i]][j]);
            numberIndex.style.setProperty('--color', onColor);
        }
    }
}

let minutes, hours, date;

function getTimes() {
    let date = new Date();
    setNumberColor('seconds', date.getSeconds());

    if (minutes < date.getMinutes() || !date.getMinutes()) {
        minutes = date.getMinutes();
        setNumberColor('minutes', minutes);
    }

    if (hours < date.getHours() || !date.getHours()) {
        hours = date.getHours();
        hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        setNumberColor('hours', hours);
        hours = date.getHours();
    }
};


function start() {
    setInterval(() => {
        getTimes();
    }, 1000);

    date = new Date();
    minutes = date.getMinutes();
    hours = date.getHours();

    setNumberColor('seconds', date.getSeconds());
    setNumberColor('minutes', minutes);
    hours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    setNumberColor('hours', hours);
    hours = date.getHours();

    let dot = document.getElementsByClassName('dot');
    for (let i = 0; i < dot.length; i++) {
        dot[i].style.backgroundColor = onColor;
    }
}

start();

