// ===============================
// CATEGORY SELECTION
// ===============================

const categoryButtons = document.querySelectorAll(".category-btn");

let selectedCategory = "all";

categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active class from all buttons
        categoryButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        // Get selected category
        selectedCategory = button.dataset.category;

        console.log("Selected category:", selectedCategory);
    });

});


// ===============================
// ELEMENTS
// ===============================

const button = document.getElementById("btn");
const topic = document.getElementById("topic");
const timer = document.getElementById("timer");

const startTimerButton = document.getElementById("start-timer");
const stopTimerButton = document.getElementById("stop-timer");


// ===============================
// TIMER VARIABLES
// ===============================

let timerInterval = null;

// 5 minutes = 300 seconds
let timeLeft = 5 * 60;


// ===============================
// START TIMER
// ===============================

function startTimer() {

    // Prevent multiple timers
    // from running at the same time
    if (timerInterval) {
        return;
    }

    timerInterval = setInterval(() => {

        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timer.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


        // Timer finished
        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timerInterval = null;

            timer.textContent = "00:00";

            topic.textContent = "Time's up!";
        }

    }, 1000);
}


// ===============================
// STOP / PAUSE TIMER
// ===============================

function stopTimer() {

    clearInterval(timerInterval);

    timerInterval = null;
}


// ===============================
// START TIMER BUTTON
// ===============================

startTimerButton.addEventListener("click", () => {

    startTimer();

});


// ===============================
// STOP TIMER BUTTON
// ===============================

stopTimerButton.addEventListener("click", () => {

    stopTimer();

});


// ===============================
// GENERATE TOPIC
// ===============================

button.addEventListener("click", async () => {

    try {

        // Disable button while generating
        button.disabled = true;


        // ===============================
        // RESET TIMER
        // ===============================

        clearInterval(timerInterval);

        timerInterval = null;

        timeLeft = 5 * 60;

        timer.textContent = "05:00";


        // ===============================
        // GET TOPIC FROM OUR API
        // ===============================

        const response = await fetch(
            `/random-topic?category=${selectedCategory}`
        );


        // Check if request was successful
        if (!response.ok) {
            throw new Error("Failed to fetch topic");
        }


        const data = await response.json();

        const finalTopic = data.topic;


        // ===============================
        // SHUFFLE WORDS
        // ===============================

        const shuffleWords = [
            "Technology",
            "Success",
            "Freedom",
            "Leadership",
            "Friendship",
            "Education",
            "Creativity",
            "Failure",
            "Adventure",
            "Future"
        ];


        let count = 0;

        const totalShuffles = 25;


        // ===============================
        // SHUFFLE ANIMATION
        // ===============================

        function shuffle() {

            const randomIndex = Math.floor(
                Math.random() * shuffleWords.length
            );


            topic.textContent = shuffleWords[randomIndex];


            count++;


            // ===============================
            // SHOW FINAL TOPIC
            // ===============================

            if (count >= totalShuffles) {

                topic.textContent = finalTopic;

                button.disabled = false;

                return;
            }


            // Constant shuffle speed
            const delay = 50;

            setTimeout(shuffle, delay);
        }


        // Start shuffle
        shuffle();


    } catch (error) {

        console.log(error);

        topic.textContent = "Could not generate a topic.";

        button.disabled = false;
    }

});