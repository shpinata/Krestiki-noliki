const krestik = document.querySelector("#krestik");
/*забрали из html кнопку по id (element.querySelector(selector) 
возвращает ссылку на первый элемент, соответствующий selector)*/
const nolik = document.querySelector("#nolik");
const div2 = document.querySelectorAll(".div2");
/*забрали из html div (клетки) по class (querySelectorAll(selectors) возвращает 
Node List (список узлов (НЕ МАССИВ, но похоже)), содержащий ссылки на все элементы, соответствующие selectors)*/

let player = null; //задаем начальное значение
let computer = null;

krestik.addEventListener("click", function (event) {
    player = "X";
    event.target.style.border = '10px solid #de9002';
    computer = "O";
});
/*обработчик addEventListener отслиживает клик по кнопке (krestik) и если клик произошел,
то назначает игроку Х, а компьютеру О. Пр  этом делая рамку кнопки шире */

nolik.addEventListener("click", function (event) {
    player = "O";
    event.target.style.border = '10px solid #004e9e';
    computer = "X";
});

const div4 = document.querySelector("#div4");

const pobeda = [
    [div2[0], div2[1], div2[2]],
    [div2[3], div2[4], div2[5]],
    [div2[6], div2[7], div2[8]]
];
/*создаем массив сетки*/

function filterDiv() {
    let newMassiv = Array.from(div2).filter(pustota => pustota.innerText == "");
    return newMassiv;
}
// Array.from создает массив из querySelectorAll 

function computerFirstStep() {
    let filter = filterDiv();
    const random = Math.floor(Math.random() * filter.length); //Компьютер рандомно выдает параметр
    filter[random].innerText = computer;
    colorXandO(filter[random]);
}

function colorXandO(element) {
    if (computer === "X") {
        element.style.color = '#ffa500';
    }
    if (computer === "O") {
        element.style.color = '#006ad6';
    }
}

function computerStep() {
    let diagonalRight = 0;
    let diagonalLeft = 0;
    let elDiagonalRight;
    let elDiagonalLeft;
    for (let i = 0; i < pobeda.length; i++) {
        let horizontal = pobeda[i].filter(responsePlayer => responsePlayer.innerText == player);
        if (horizontal.length == 2) {
            for (let j = 0; j < pobeda[i].length; j++) {
                if (pobeda[i][j].innerText == "") {
                    pobeda[i][j].innerText = computer;
                    colorXandO(pobeda[i][j]);
                    return;
                }
            }
        }

        let vertical = 0;
        let elVertical;
        for (let v = 0; v < pobeda[i].length; v++) {
            if (pobeda[v][i].innerText == player) {
                vertical++;
            }
            if (pobeda[v][i].innerText == "") {
                elVertical = pobeda[v][i];
            }
        }
        if (vertical == 2 && elVertical != undefined) {
            elVertical.innerText = computer;
            colorXandO(elVertical);
            return;
        }

        if (pobeda[i][i].innerText == player) {
            diagonalRight++;
        }
        if (pobeda[i][i].innerText == "") {
            elDiagonalRight = pobeda[i][i];
        }

        if (pobeda[2 - i][i].innerText == player) {
            diagonalLeft++;
        }
        if (pobeda[2 - i][i].innerText == "") {
            elDiagonalLeft = pobeda[2 - i][i];
        }
    }
    if (diagonalRight == 2 && elDiagonalRight != undefined) {
        elDiagonalRight.innerText = computer;
        colorXandO(elDiagonalRight);
        return;
    }
    if (diagonalLeft == 2 && elDiagonalLeft != undefined) {
        elDiagonalLeft.innerText = computer;
        colorXandO(elDiagonalLeft);
        return;
    }
    computerFirstStep();
}

function check(symbol) {
    const text = symbol === "X" ? "Оранжевый!" : "Синий!"; // Если symbol === "X", то "Оранжвый!" : "Синий!"
    for (let i = 0; i < pobeda.length; i++) {
        if (pobeda[i][0].innerText === symbol && pobeda[i][1].innerText === symbol && pobeda[i][2].innerText === symbol) {
            div4.innerText = "Победа" + "\n" + text;
        }
        if (pobeda[0][i].innerText === symbol && pobeda[1][i].innerText === symbol && pobeda[2][i].innerText === symbol) {
            div4.innerText = "Победа" + "\n" + text;
        }
    }
    if (pobeda[0][0].innerText === symbol && pobeda[1][1].innerText === symbol && pobeda[2][2].innerText === symbol) {
        div4.innerText = "Победа" + "\n" + text;
    }
    if (pobeda[2][0].innerText === symbol && pobeda[1][1].innerText === symbol && pobeda[0][2].innerText === symbol) {
        div4.innerText = "Победа" + "\n" + text;
    }
    nobody();
}

function nobody() {
    for (let j = 0; j < pobeda.length; j++) {
        let notEmpty = Array.from(div2).filter(notEmptyFilter => notEmptyFilter.innerText === "");
        if (notEmpty.length == 0) {
            div4.innerText = "Ничья!";
        }
    }
}

let firstStep = false;

div2.forEach(function (choice) {
    choice.addEventListener("click", function (event) {
        choice.innerText = player;
        setTimeout(function () {
            if (firstStep === false) {
                computerFirstStep();
                firstStep = true;
            } else {
                computerStep();
            }
            check(computer);
        }, 500);
        if (player === "X") {
            event.target.style.color = '#ffa500';
        }
        if (player === "O") {
            event.target.style.color = '#006ad6';
        }
        check(player);
    });
})
/*в игровой сетке создаем цикл с функцией и с параметром. К этому параметру создаем обработчик. Если
произойдет клик, то параметр передает игрок (в соответствии с кнопкой), далее происходит разрыв интервала
по времени выбора компьютера*/