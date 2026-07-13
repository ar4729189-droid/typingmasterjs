
// paragraphs in array

const paragraphs = [
    "There is a garden in front of my house. It has many plants and trees. In the spring season, flowers of various colors bloom. Their fragrance spreads all  over the garden. In the evening, children play in the garden and elders sit there for a walk.",
    "Hazrat Muhammad (PBUH) was born in Makkah. His father's name was Hazrat Abdullah. He (PBUH) invited the people to the Oneness of Allah. He (PBUH) told them that I am the last Prophet of Allah and there is no God but Allah.",
    "Quaid-e-Azam Muhammad Ali Jinnah worked very hard day and night for the Muslims of the subcontinent. He wanted a separate homeland for them where they could live according to their religion. Due to his great leadership and efforts, Pakistan came into being on August 14, 1947.",
    "Anarkali is the busiest bazaar in Lahore. It is always crowded with people. Shopkeepers have decorated their shops beautifully. You can buy almost everything from here, such as clothes, shoes, and toys. Many people go there for shopping, while some go just to see the hustle and bustle of the market. The prices are usually reasonable, but one must be good at bargaining."
];

// let time etc

let timeleft = 60;
let timer;
let timestarter = false;
let mistakes = 0;
totaltime = timeleft;

// variable to html 

const timeDisplay = document.getElementById("time");
const accuracyDisplay = document.getElementById("accu");
const wpmDisplay = document.getElementById("wpm");
const displaypara = document.getElementById("para");
const textarea = document.getElementById("text");
const resetbtn = document.getElementById("rest-btn")
const startBtn = document.getElementById("start-btn");
const resultDisplay = document.getElementById("result");
const stopBtn = document.getElementById("stop");

// displaying default 

accuracyDisplay.innerText = "Accuracy: 0%";
wpmDisplay.innerText = "WPM: 0";
timeDisplay.innerText = "Time: 60";

// loading paragraph 

function loadPara() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const selectedPara = paragraphs[randomIndex];

    displaypara.innerHTML = "";

    for (let i = 0; i < selectedPara.length; i++) {
        let span = document.createElement("span");
        span.innerText = selectedPara[i];
        displaypara.appendChild(span);
    }
}

// starting time 

function startTimer() {
    if (timeleft > 0) {
        timeleft--;
        timeDisplay.innerText = `Time:` + timeleft;
    } else {
        clearInterval(timer);
        timestarter = false;
        textarea.disabled = true;
        let words = (textarea.value.length / 5);
        let mins = 60 / 60;
        let WPM = Math.round(words / mins);
        let Spans = displaypara.querySelectorAll("span");
        let typedText = textarea.value;
        let Mistakes = 0;
        for (let i = 0; i < typedText.length; i++) {
            if (typedText[i] !== Spans[i].innerText) {
                Mistakes++;
            }
        }

        let totalTyped = typedText.length;
        let acc = totalTyped > 0 ? Math.round(((totalTyped - Mistakes) / totalTyped) * 100) : 0;
        wpmDisplay.innerText = `Final WPM:` +  WPM || 0;
        accuracyDisplay.innerText = `Final Accuracy:` + acc + "%";
        alert(`Times up!`)
    }
};

textarea.addEventListener("input", () => {
    if (timestarter === false) {
        timer = setInterval(startTimer, 1000);
        timestarter = true;
    }

    let Spans = displaypara.querySelectorAll("span");
    let typedText = textarea.value;

    for (let i = 0; i < Spans.length; i++) {
        let Match = Spans[i].innerText;
        let typed = typedText[i];

        if (typed == null) {
            Spans[i].style.color = "black";
        } else if (typed === Match) {
            Spans[i].style.color = "green";
        } else {
            Spans[i].style.color = "red";
        }
    }
});

// for start btn 

function start() {
    if (timestarter === false) {
        timer = setInterval(startTimer, 1000);
        timestarter = true;
        textarea.disabled = false;
        textarea.focus();
    }


};

//  for stop btn 

function stop() {
    clearInterval(timer);
    timestarter = false;
    showResult();
};

// for reset btn 

function reset() {
    clearInterval(timer);
    timeleft = 60;
    timestarter = false;
    textarea.disabled = false;
    textarea.value = "";
    resultDisplay.innerText = "";
    accuracyDisplay.innerText = "Accuracy: 0%";
    wpmDisplay.innerText = "WPM: 0";
    timeDisplay.innerText = "Time: 60";
    loadPara();
};

loadPara();
