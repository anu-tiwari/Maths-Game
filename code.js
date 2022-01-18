var isPlaying = 0;
var correctAns = 0;
var candidate = 0;
var score = 0;
var no_wrong = 0;
var timeout;
var timer;
var time;

function startPress()
{
    if (isPlaying==0)
    {
        //start
        isPlaying = 1;
        document.getElementById("prompt").innerHTML = "Choose the correct answer:";
        document.getElementById("start").innerHTML = "Restart";
        reset();
    }
    else
    {
        //reload
        document.location.reload();
    }
}

function reset()
{
    hideTimer();
    correctAns = 0;
    candidate = 0;
    no_wrong = 0;
    genQuestion();
}

function setTimer()
{
    disTimer();
    time = 15;
    timer = setInterval(function(){
        time--;
        document.getElementById("remTimeVal").innerHTML = time;
    },1000)
    timeout = setTimeout(function(){gameOver()},15000);
}

function disTimer()
{   
    document.getElementById("time").style.display = "inherit";
    document.getElementById("remTimeVal").innerHTML = "15";
}

function hideTimer()
{
    document.getElementById("time").style.display = "none";
}

function genQuestion()
{
    var first = Math.round(Math.random()*10);
    var second = Math.round(Math.random()*10);

    correctAns = first*second;
    var corOpt = 0;
    while(corOpt == 0)
    {
        corOpt = Math.round(Math.random()*4);
    }

    document.getElementById("question").innerHTML = first+"x"+second;

    document.getElementById("opt"+corOpt).innerHTML = correctAns;

    for (i=1; i<=4; i++)
    {
        if (i!=corOpt)
        {
            while(true)
            {
                document.getElementById("opt"+i).innerHTML = Math.round(Math.random()*100);
                if (document.getElementById("opt"+i).innerHTML!=correctAns)
                    break;
            }
        }
    }
    setTimer();
}

function opt1clicked()
{
    if (isPlaying==0)
        return;
    candidate = document.getElementById("opt1").innerHTML;
    // window.alert(candidate+" clicked");
    check();
}

function opt2clicked()
{
    if (isPlaying==0)
        return;
    candidate = document.getElementById("opt2").innerHTML;
    // window.alert(candidate+" clicked");
    check();
}

function opt3clicked()
{
    if (isPlaying==0)
        return;
    candidate = document.getElementById("opt3").innerHTML;
    check();
}

function opt4clicked()
{
    if (isPlaying==0)
        return;
    candidate = document.getElementById("opt4").innerHTML;
    check();
}

function disCorrect()
{
    document.getElementById("correct").style.display = 'inherit';
    var delay = setTimeout(function(){
        document.getElementById("correct").style.display = 'none';
    },1000);
}

function disWrong()
{
    document.getElementById("try").style.display = 'inherit';
    var delay = setTimeout(function(){
        document.getElementById("try").style.display = 'none';
    },1000);
}

function check()
{
    if (candidate == correctAns)
    {
        corrAns();
    }
    else
    {
        wrongAns();
    }
}

function wrongAns()
{
    no_wrong++;
    disWrong();
    if (no_wrong==3)
    {
        gameOver();
    }
}

function corrAns()
{
    score++;
    updateScore();
    disCorrect();
    clearTimeout(timeout);
    clearInterval(timer);
    reset();
}

function updateScore()
{
    document.getElementById("scoreVal").innerHTML = score;
}

function gameOver()
{
    document.getElementById("over").style.display = "inherit";
    document.getElementById("finscoreVal").innerHTML = score;
    document.getElementById("start").innerHTML = "Replay";
    disableOptions();
    clearTimeout(timeout);
    clearInterval(timer);
}

function disableOptions()
{
    document.getElementById("opt1").style.pointerEvents = "none";
    document.getElementById("opt2").style.pointerEvents = "none";
    document.getElementById("opt3").style.pointerEvents = "none";
    document.getElementById("opt4").style.pointerEvents = "none";
    document.getElementById("opt1").style.boxShadow = "none";
    document.getElementById("opt2").style.boxShadow = "none";
    document.getElementById("opt3").style.boxShadow = "none";
    document.getElementById("opt4").style.boxShadow = "none";
}