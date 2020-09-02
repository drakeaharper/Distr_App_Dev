var cardTypes = [ 'circle', 'square', 'star', 'plus', 'wave' ]
var winCondition = 5
var correctAnswers = 0
var roundTracker = 0
var numberOfRounds = 10
var currentCard = _.sample(cardTypes)
var disableButtons = false
console.log(`current card: ${currentCard}`)
updateDiplays()

function initializeGame() {
    roundTracker = 0
    correctAnswers = 0
    updateDiplays()
    // document.querySelector('#start-btn').innerHTML = 'Reset Game'
}

function playRound(guess) {
    toggleButtons()
    if (roundTracker < numberOfRounds) {
        console.log({card: currentCard, player_guess: guess, round: roundTracker})
        if (guess.includes(currentCard)) {
            correctAnswers++
            new Audio('./correct.mp3').play()
        } else {
            window.navigator.vibrate(200)
        }
        let pathToShow = `./Zener_Cards/${currentCard}.svg`
        console.log(pathToShow)
        toggleCard(pathToShow)
        roundTracker++
        currentCard = _.sample(cardTypes)
        console.log(`current card: ${currentCard}`)
        updateDiplays()
        setTimeout(() => {
            toggleCard('./playing_card.JPG')
            toggleButtons()
        }, 1500)
    }
    if (roundTracker >= numberOfRounds) {
        toggleButtons()
        if (correctAnswers >= winCondition) {
            new Audio('./winner.mp3').play()
        } else {
            new Audio('./lose_sound.mp3').play()
        }
    }
}

function updateDiplays() {
    document.querySelector('#score-display').innerHTML = `Score: ${correctAnswers}/${numberOfRounds}`
    document.querySelector('#round-display').innerHTML = `Round: ${roundTracker}/${numberOfRounds}`
}

function toggleCard(path) {
    document.querySelector('#main-display').src = path
}

function toggleButtons() {
    disableButtons = !disableButtons
    document.querySelectorAll('button').forEach(item => {if (item.id != 'start-btn') {item.disabled = disableButtons}})
}
