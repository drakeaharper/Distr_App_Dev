var cardTypes = [ 'circle', 'square', 'star', 'plus', 'wave' ]
var winCondition = 5
var correctAnswers = 0
var roundTracker = 0
var numberOfRounds = 10
var currentCard = _.sample(cardTypes)
console.log(`current card: ${currentCard}`)
updateDiplays()

function initializeGame() {
    roundTracker = 0
    correct_answers = 0
    updateDiplays()
    // document.querySelector('#start-btn').innerHTML = 'Reset Game'
}

function playRound(guess) {
    if (roundTracker < numberOfRounds) {
        console.log({card: currentCard, player_guess: guess, round: roundTracker})
        if (guess === currentCard) {
            correctAnswers++
            new Audio('./correct.mp3').play()
        } else {
            window.navigator.vibrate(200)
        }
        roundTracker++
        currentCard = _.sample(cardTypes)
        console.log(`current card: ${currentCard}`)
        updateDiplays()
    }

    if (correctAnswers >= winCondition && roundTracker >= numberOfRounds) {
        new Audio('./winner.mp3').play()
    } else {
        new Audio('./lose_sound.mp3').play()

    }
}

function updateDiplays() {
    document.querySelector('#score-display').innerHTML = `Score: ${correctAnswers}/${numberOfRounds}`
    document.querySelector('#round-display').innerHTML = `Round: ${roundTracker}/${numberOfRounds}`
}
