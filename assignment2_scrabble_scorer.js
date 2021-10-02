const input = require('readline-sync');

const welcome = {
    line1: 'Welcome to the Scrabble score calculator!\n',
    line2: '\nWhich scoring algorithm would you like to use?\n',
    option0: '\n0 - Scrabble: The traditional scoring algorithm.',
    option1: '\n1 - Simple Score: Each letter is worth 1 point.',
    option2: '\n2 - Bonus Vowels: Vowels are worth 3 pts, and consonants are 1 pt.' 
};

const oldPointStructure = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D', 'G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q', 'Z']
 };

let newPointStructure = {};

// Code your transform function here:
function transform (pointStructureObject) {
    for (item in pointStructureObject) {
        for (let i = 0; i < pointStructureObject[item].length; i++) {
            newPointStructure[pointStructureObject[item][i].toLowerCase()] = item;
        }
    }
    newPointStructure[' '] = 0;
    return newPointStructure;
}

// Code your initialPrompt function here:
function initialPrompt () {
    let validInputs = ['0', '1', '2'];
    console.log(`${welcome.line1} ${welcome.line2} ${welcome.option0} ${welcome.option1} ${welcome.option2}`);
    let algorithmSelection = input.question('\nEnter 0, 1, or 2: ');

    while (!validInputs.includes(algorithmSelection)) {
        algorithmSelection = input.question('\nInvalid input. Enter 0, 1, or 2: ');
    } 
    return algorithmSelection;   
}

// Use the transform function to create the newPointStructure object here:
transform(oldPointStructure);

// Code scoring algorithms
function simpleScore (word) {   
    let score = 0;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === ' ') {      // Bonus -- spaces do not increase score
            score += 0;
        } else {
            score++;
        }
    }
    return score;
}

function bonusVowels (word) {
    let wordArray = word.toLowerCase().split('');
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let score = 0;
    for (let i = 0; i < wordArray.length; i++) {
        if (vowels.includes(wordArray[i])) {
            score += 3;
        } else if (wordArray[i] === ' ') {
            score += 0;
        } else {
            score++;
        }
    }
    return score;
}

function scrabbleScore (word, pointStructure = newPointStructure) {     // make sure not to name a parameter the same thing as its default value
    let wordArray = word.toLowerCase().split('');
    let score = 0;
    for (let i = 0; i < wordArray.length; i++) {
        for (item in pointStructure) {
            if (wordArray[i] === item) {
                score += Number(pointStructure[item]);
            }
        }
    }
    return score;
}

// Create your scoringAlgorithms array here:
let scrabbleObjectDetails = {
    name: 'Scrabble',
    description: 'The traditional scoring algorithm.',
    scoreFunction: scrabbleScore        // make sure not to CALL the function here if that isn't what you intend to do -- this breaks things further along in the code
};

let simpleScoreDetails = {
    name: 'Simple Score',
    description: 'Each letter is worth 1 point.',
    scoreFunction: simpleScore
};

let bonusVowelsDetails = {
    name: 'Bonus Vowels',
    description: 'Vowels are 3 pts, consonants are 1 pt.',
    scoreFunction: bonusVowels
};

let scoringAlgorithms = [scrabbleObjectDetails, simpleScoreDetails, bonusVowelsDetails];

// For bonus mission -- create array of valid characters from oldPointStructure to use in the runProgram function
function createValidCharactersArray (pointStructureObject) {
    validCharacters = Object.keys(pointStructureObject);
    return validCharacters;
}

// Code your runProgram function here:
function runProgram (scoringAlgorithms) {
    let validCharacters = createValidCharactersArray(newPointStructure);
    let selectedAlgorithm = initialPrompt(); 
    console.log(`\nUsing algorithm: ${scoringAlgorithms[selectedAlgorithm].name}\n`);
    let wordToScore = input.question('Enter a word to be scored, or \'Stop\' to quit: ');
    
    while (wordToScore.toLowerCase() !== 'stop') {
        for (let i = 0; i < wordToScore.length; i++) {
            // Changed from if conditional to while loop; if statement was only rejecting every other invalid input
            while (!validCharacters.includes(wordToScore.toLowerCase().split('')[i])) {
                wordToScore = input.question('Invalid input. Enter a word to be scored, or \'Stop\' to quit: ');
                // Without reassigning i to 0, all new inputs will be rejected if they're shorter than the previously rejected wordToScore.length
                i = 0;      
            }
        }
        if (wordToScore.toLowerCase() === 'stop') {
            break;
        } else {
            console.log(scoringAlgorithms[selectedAlgorithm].scoreFunction(wordToScore.toLowerCase()), '\n');
            wordToScore = input.question('Enter a word to be scored, or \'Stop\' to quit: ');
        }
    }
    return;
}

// Call the runProgram function here:
runProgram(scoringAlgorithms);