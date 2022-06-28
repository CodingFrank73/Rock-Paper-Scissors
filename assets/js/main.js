let round = 1;
let maxRounds = 5;
let userChoice = 0;
let pcChoice = 0;
let userScore = 0;
let pcScore = 0;
let click = "";
let keyValue = ['Rock', 'Paper', 'Scissors']

document.getElementById('restart').addEventListener('click', () => {
    location.reload();
})

let numberOfRounds = document.querySelectorAll('input[type=radio][name=rounds]');
numberOfRounds.forEach(radio => radio.addEventListener('change', () => {

    if (numberOfRounds.item(0).checked == true) {
        maxRounds = 5;
    } else if (numberOfRounds.item(1).checked == true) {
        maxRounds = 10;
    } else if (numberOfRounds.item(2).checked == true) {
        maxRounds = 15;
    } else if (numberOfRounds.item(3).checked == true) {
        maxRounds = 20;
    }

    event.preventDefault();
}));

let selection = document.querySelectorAll('button');
selection.forEach(btn => btn.addEventListener('click', (e) => {

    switch (e.target.id) {
        case 'btnRock':
            click = 'btnRock';
            startTheGame(1, getRandomIntInclusive());
            break;

        case 'btnPaper':
            click = 'btnPaper';
            startTheGame(2, getRandomIntInclusive());
            break;

        case 'btnScissors':
            click = 'btnScissors';
            startTheGame(3, getRandomIntInclusive());
            break;
    }

    event.preventDefault();
}))

selection.forEach(btn => btn.addEventListener('mouseout', (e) => {
    document.getElementById(`${e.target.id}`).style.borderColor = 'whitesmoke';
}))

function getRandomIntInclusive() {
    min = Math.ceil(1);
    max = Math.floor(3);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startTheGame(userChoice, pcChoice) {
    let text = "";

    if (round == 1) {

        document.getElementsByClassName('cls-round-select')[0].style.display = "none";
        document.getElementsByClassName('cls-round-counter')[0].style.display = "block";
    }

    if (round < maxRounds) {
        switch (whoWin(userChoice, pcChoice)) {
            case 0:
                text = `It was a draw ! You both chose ${keyValue[userChoice - 1]}`;
                break;

            case 1:
                text = `${keyValue[userChoice - 1]} <sup>(User)</sup>  beats ${keyValue[pcChoice - 1]} <sup>(Comp)</sup>. You win!`;
                userScore++;
                document.getElementById(`${click}`).style.borderColor = "green";
                break;

            case -1:
                text = `${keyValue[pcChoice - 1]} <sup>(Comp)</sup> beats ${keyValue[userChoice - 1]}<sup>(User)</sup>. You lose!`;
                pcScore++;
                document.getElementById(`${click}`).style.borderColor = "red";
                break;
        };

    } else if (round = maxRounds) {
        if (userScore > pcScore) {
            text = `The user wins`;
            document.getElementsByClassName('fa-user')[0].style.color = "green";
        } else if (userScore < pcScore) {
            text = `The Computer wins`;
            document.getElementsByClassName('fa-user')[0].style.color = "red";
        } else {
            text = `It was a draw - No winner.....`;
        }

    } else {
        return;
    };

    document.getElementById("result").innerHTML = text;
    document.getElementById("score").innerHTML = `${userScore} : ${pcScore}`;
    document.getElementById("counter").innerHTML = `${round} / ${maxRounds}`;

    round++;
}

function whoWin(userChoice, pcChoice) {
    let winner;

    if (userChoice == pcChoice) { return 0 };

    switch (userChoice) {
        case 1:
            pcChoice == 2 ? winner = -1 : winner = 1;
            break;
        case 2:
            pcChoice == 3 ? winner = -1 : winner = 1;
            break;
        case 3:
            pcChoice == 1 ? winner = -1 : winner = 1;
    };

    return winner;
}