// Refer to the online book to access detailed instructions for this project.

// URL = https://education.launchcode.org/intro-to-professional-web-dev/assignments/candidateQuiz.html

// Welcome to your first assignment.
// Login and then fork this repl.it
// Add your code here. You can do it!

const input = require('readline-sync');

// Define question and answer arrays
let questions = [
  "True or false: 5000 meters = 5 kilometers.",
  "(5 + 3)/2 * 10 = ?",
  `Given the array [8, "Orbit", "Trajectory", 45], what entry is at index 2?`,
  "Who was the first American woman in space?",
  "What is the minimum crew size for the International Space Station (ISS)?"
];

let answers = [
  "true",
  "40",
  "Trajectory",
  "Sally Ride",
  "3"
];

let candidateResponses = [];

// Obtain candidate's name
let name = input.question("Enter your name: ");

// Loop through array of questions and prompt candidate for answers
for (let i = 0; i < questions.length; i++) {
    console.log(`\n${[i + 1]}) ${questions[i]}`);
    let answer = input.question("Type your answer: ");
    candidateResponses.push(answer);
}

let correctAnswers = 0;

// Update variable correctAnswers to tally number of correct responses
for (let i = 0; i < candidateResponses.length; i++) {
    if (candidateResponses[i].toLowerCase() === answers[i].toLowerCase()) {
        correctAnswers++;
    }
}

// Results output
console.log(`\nCandidate Name: ${name}`);
for (let i = 0; i < questions.length; i++) {
    console.log(`${[i + 1]}) ${questions[i]} \nYour Answer: ${candidateResponses[i]} \nCorrect Answer: ${answers[i]}\n`);
}

console.log(`>>> Overall Grade: ${(correctAnswers / 5) * 100}% (${correctAnswers} of 5 responses correct) <<<`);

if (correctAnswers >= 4) {
    console.log('>>> Status: PASSED <<<');
} else {
    console.log('>>> Status: FAILED <<<');
}