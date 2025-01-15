const questions = [
    {
        question: "Who founded the Brahmo Samaj in 1828?",
        options: ["Swami Vivekananda", "Raja Ram Mohan Roy", "Dayananda Saraswati", "Ishwar Chandra Vidyasagar"],
        answer: "Raja Ram Mohan Roy"
    },
    {
        question: "Which city will host the 2028 Summer Olympics?",
        options: ["Paris", "Tokyo", "Los Angeles", "London"],
        answer: "Los Angeles"
    },
    {
        question: "Which young revolutionary threw a bomb in the Central Legislative Assembly in 1929?",
        options: ["Chandrashekhar Azad", "Bhagat Singh", "Rajguru", "Sukhdev"],
        answer: "Bhagat Singh"
    },
    {
        question: "What is the largest desert in the world?",
        options: ["Sahara", "Gobi", "Atacama", "Thar"],
        answer: "Sahara"
    },
    {
        question: "Who is called the 'Father of the Indian Renaissance'?",
        options: ["Raja Ram Mohan Roy", "Mahatma Gandhi", "Rabindranath Tagore", "Ishwar Chandra Vidyasagar"],
        answer: "Raja Ram Mohan Roy"
    },
    {
        question: "Who is the current captain of the Indian men’s cricket team in ODIs?",
        options: ["Virat Kohli", "MS Dhoni", "KL Rahul", "Rohit Sharma"],
        answer: "Rohit Sharma"
    },
    {
        question: "Which leader established the Indian National Army (INA)?",
        options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Bhagat Singh", "Bal Gangadhar Tilak"],
        answer: "Subhas Chandra Bose"
    },
    {
        question: "Which country won the FIFA World Cup 2022?",
        options: ["France", "Argentina", "Brazil", "Germany"],
        answer: "Argentina"
    },
    {
        question: "Who wrote the book Anandamath, which inspired the national song 'Vande Mataram'?",
        options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Ishwar Chandra Vidyasagar", "Raja Ram Mohan Roy"],
        answer: "Bankim Chandra Chatterjee"
    },
    {
        question: "Which Indian won the gold medal in javelin at the 2024 Asian Games?",
        options: ["Hima Das", "Neeraj Chopra", "Arshad Nadeem", "Annu Rani"],
        answer: "Neeraj Chopra"
    },
    {
        question: "What was the movement launched by Gandhi after the Chauri Chaura incident?",
        options: ["Civil Disobedience", "Quit India", "Non-Cooperation", "Salt Satyagraha"],
        answer: "Non-Cooperation"
    },
    {
        question: "Who gave the title 'Mahatma' to Gandhi?",
        options: ["Rabindranath Tagore", "Jawaharlal Nehru", "Bal Gangadhar Tilak", "Subhas Chandra Bose"],
        answer: "Rabindranath Tagore"
    },
    {
        question: "What is the currency of Japan?",
        options: ["Dollar", "Yen", "Won", "Yuan"],
        answer: "Yen"
    },
    {
        question: "Which leader is associated with the Kakori Conspiracy?",
        options: ["Chandrashekhar Azad", "Ashfaqulla Khan", "Bhagat Singh", "Rajguru"],
        answer: "Ashfaqulla Khan"
    },
    {
        question: "Who is the youngest Indian cricketer to score a double century in ODIs?",
        options: ["Shubman Gill", "Ishan Kishan", "Rishabh Pant", "Yashasvi Jaiswal"],
        answer: "Ishan Kishan"
    },
    {
        question: "What is the slogan of the Swadeshi Movement?",
        options: ["Vande Mataram", "Quit India", "Swaraj is my birthright", "Jai Hind"],
        answer: "Vande Mataram"
    },
    {
        question: "Who founded the Arya Samaj in 1875?",
        options: ["Swami Dayananda Saraswati", "Swami Vivekananda", "Sri Aurobindo", "Ishwar Chandra Vidyasagar"],
        answer: "Swami Dayananda Saraswati"
    },
    {
        question: "What is the nickname of the planet Mars?",
        options: ["Blue Planet", "Red Planet", "Green Planet", "Yellow Planet"],
        answer: "Red Planet"
    },
    {
        question: "Who started the newspaper Indian Opinion in South Africa?",
        options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Rabindranath Tagore"],
        answer: "Mahatma Gandhi"
    },
    {
        question: "What is the official motto of the Olympic Games?",
        options: ["Faster, Higher, Stronger – Together", "One World, One Dream", "Inspire a Generation", "Breaking Barriers"],
        answer: "Faster, Higher, Stronger – Together"
    }
];

let currentQuestionIndex = 0;
let timer = 10;
let interval;
let score = 0;
let totalTime = 0;
const leaderboard = [];

function showQuestion() {
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const timerEl = document.getElementById("timer");
    const nextBtn = document.getElementById("next-btn");

    questionEl.textContent = questions[currentQuestionIndex].question;
    optionsEl.innerHTML = "";
    timer = 10;

    questions[currentQuestionIndex].options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = () => selectAnswer(li);
        optionsEl.appendChild(li);
    });

    nextBtn.style.display = "none";
    timerEl.textContent = `Time Left: ${timer}s`;

    interval = setInterval(() => {
        timer--;
        timerEl.textContent = `Time Left: ${timer}s`;
        totalTime++;
        if (timer === 0) {
            clearInterval(interval);
            nextBtn.style.display = "block";
        }
    }, 1000);
}

function selectAnswer(selectedOption) {
    clearInterval(interval);
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption.textContent === correctAnswer) {
        selectedOption.classList.add("correct");
        score++;
    } else {
        selectedOption.classList.add("wrong");
    }
    document.getElementById("next-btn").style.display = "block";
}

function updateLeaderboard() {
    const leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = "";

    leaderboard.sort((a, b) => a.time - b.time);
    leaderboard.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score} points in ${entry.time}s`;
        leaderboardList.appendChild(li);
    });
}

document.getElementById("next-btn").onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        const name = prompt("Enter your name for the leaderboard:");
        leaderboard.push({ name, score, time: totalTime });
        updateLeaderboard();

        document.querySelector(".quiz-container").innerHTML = `
            <h1>Quiz Completed!</h1>
            <p>Your Score: ${score}/${questions.length}</p>
            <p>Total Time: ${totalTime}s</p>
            <div class="leaderboard">
                <h2>Leaderboard</h2>
                <ul id="leaderboard-list"></ul>
            </div>
        `;

        updateLeaderboard();
    }
};

showQuestion();