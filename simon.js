let btns = document.querySelectorAll(".btn");
let newH3 = document.querySelector('h3');

let gameSeq = [];
let userSeq = [];
let scores = [];
let allBtns = ["cement","green","caramel","pink"];

let started = false;
let level = 0;
let maxScore = 0;


document.addEventListener('keypress',function(){
    if (started == false){
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level ++;
    newH3.innerText = `Level ${level}, Good luck!!`

    let randNum = Math.floor(Math.random()*3);
    console.log(randNum);
    randIdx = allBtns[randNum];
    let randBtn = document.querySelector(`.${randIdx}`);
    gameSeq.push(randIdx);
    flashBtn(randBtn);
}

function flashBtn(btn) {
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    }, 250);
}

function flashUser(btn) {
    btn.classList.add("flashuser");
    setTimeout(function(){
        btn.classList.remove("flashuser")
    }, 250);
}

function btnPress() {
    let btn = this;
    flashUser(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

/*function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]){
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        scores.push(level);
        getMax(...scores);
        newH3.innerHTML = `Game Over! your score was <b> ${level} </b> <br> press any key to start again 
        <br> Your highest score was ${maxScore}<b> `
        /*
        document.querySelector('body').style.background = 'red';
        setTimeout(function(){
            document.querySelector('body').style.background = 'linear-gradient(135deg, #4a4e69, #9a8c98, #c9ada7)';
        }, 150); 
        
        gameReset();
    }
}*/

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Save score and highest score
        scores.push(level);
        getMax(...scores);

        // Flash background using CSS class
        document.body.classList.add('flash');
        setTimeout(() => {
            document.body.classList.remove('flash');
        }, 500);

        // Show overlay with scores
        document.getElementById('finalScore').innerText = level;
        document.getElementById('highestScore').innerText = maxScore;
        document.getElementById('gameOverOverlay').style.display = 'flex';

        // Reset game
        gameReset();
    }
}

function restartGame() {
    document.getElementById('gameOverOverlay').style.display = 'none';
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    newH3.innerText = 'Press any key to start the game';
}


function getMax(...array) {
    maxScore = Math.max(...array);
}

for (btn of btns){
    btn.addEventListener("click",btnPress);
}

function gameReset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}