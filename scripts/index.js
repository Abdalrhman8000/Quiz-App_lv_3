var data = [
    {
        index: '#1',
        quest: 'Javascript is an _______ language?',
        a: 'Object-Oriented',
        b: 'Object-Based',
        c: 'Procedural',
        answer: 'a'
    },
    {
        index: '#2',
        quest: 'Which of the following keywords is used to define a variable in Javascript?',
        a: 'var',
        b: 'let',
        c: 'Both A and B',
        answer: 'c'
    },
    {
        index: '#3',
        quest: 'Which of the following methods is used to access HTML elements using Javascript?',
        a: 'getElementbyId()',
        b: 'getElementsByClassName()',
        c: 'Both A and B',
        answer: 'c'
    },
    {
        index: '#4',
        quest: 'Upon encountering empty statements, what does the Javascript Interpreter do?',
        a: 'Throws an error',
        b: 'Ignores the statements',
        c: 'Gives a warning',
        answer: 'b'
    },
];
var quest = document.querySelector('.quest');
var answer = document.querySelectorAll('.answer');
var btn = document.querySelector('.next');
var repeat = document.querySelector('.repeat');
var line = document.querySelector('.line');
var index = document.querySelector('.index');
var timerText = document.querySelector('.timer');
var spans = document.querySelectorAll('.pd span');
var scores_data = document.querySelector('.scores h1');
var scoresContent = document.querySelector('.scores');
var timerStart = 30;
var Index = 0;
var lineWidth = 0;
var scoures = 0;
window.onload = function () {
    DrawUi();
    TimerSlide();
    lineTimer();
};
// =======  Draw Ui =============>
function DrawUi() {
    quest.innerText = data[Index].quest;
    answer[0].innerText = data[Index].a;
    answer[1].innerText = data[Index].b;
    answer[2].innerText = data[Index].c;
    index.innerText = "#0".concat(Index + 1);
}
// =======  Answer checker =============>
function answerChecker() {
    answer.forEach(function (e) {
        if (e.getAttribute('answer') == data[Index].answer) {
            e.innerHTML += "<img src=\"./icons/correct.svg\" alt=\"\"></img>";
            e.classList.add('true');
        }
        else {
            e.innerHTML += "<img src=\"./icons/false.svg\" alt=\"\"></img>";
            e.classList.add('false');
        }
    });
    btnClicker();
}
// ======= Handel Num Timer =============>
function HndelNum(num) {
    if (num < 10) {
        return "0".concat(num);
    }
    else {
        return num;
    }
}
// ======= Num Timer =============>
function TimerSlide() {
    var time_out = setTimeout(TimerSlide, 400);
    if (timerStart > 0) {
        timerStart--;
        timerText.innerText = "".concat(HndelNum(timerStart));
    }
    else {
        clearTimeout(time_out);
        answerChecker();
    }
}
// =======  Delete Active Items =============>
function deletClasses() {
    answer.forEach(function (e) {
        e.classList.remove('false');
        e.classList.remove('true');
    });
    btn.classList.remove('active-btn');
    btn.removeEventListener('click', click);
}
// =======  Slider Timer =============>
function lineTimer() {
    var timer_out_2 = setTimeout(lineTimer, 115);
    lineWidth < 100 ? lineWidth++ : clearTimeout(timer_out_2);
    line.style.width = "".concat(lineWidth, "%");
    deletClasses();
}
// =======  Slide Sections =============>
function btnClicker() {
    btn.classList.add('active-btn');
    btn.addEventListener('click', click);
}
function click() {
    if (Index < data.length - 1) {
        Index++;
        timerStart = 30;
        lineWidth = 0;
        DrawUi();
        TimerSlide();
        lineTimer();
    }
    else {
        repeat.classList.add('active-btn');
        btn.classList.remove('active-btn');
        scoresContent.classList.add('active_score');
        scores_data.innerText = "".concat(scoures, "/4");
    }
}
// =======  Rest Data =============>
answer.forEach(function (ele) {
    ele.addEventListener('click', checkerAnswers);
});
function checkerAnswers(e) {
    if (e.target.getAttribute('answer') == data[Index].answer && e.target.classList.contains('true') != true) {
        scoures++;
    }
    timerStart = 0;
    lineWidth = 100;
}
// =======  Reapeat Data Quiz =============>
repeat.addEventListener('click', function (e) {
    if (Index == data.length - 1) {
        Index = 0;
        lineWidth = 0;
        timerStart = 30;
        scoures = 0;
        DrawUi();
        TimerSlide();
        lineTimer();
        var ele = e.target;
        ele.classList.remove('active-btn');
        scoresContent.classList.remove('active_score');
    }
});
