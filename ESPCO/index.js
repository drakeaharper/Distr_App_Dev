var cardTypes = [ 'circle', 'square', 'star', 'plus', 'wave' ]
var winCondition = 5
var correctAnswers = 0
var roundTracker = 1
var numberOfRounds = 10
var currentCard = _.sample(cardTypes)
var disableButtons = false
console.log(`current card: ${currentCard}`)
updateDiplays()

function initializeGame() {
    roundTracker = 1
    correctAnswers = 0
    updateDiplays()
    disableButtons = true
    toggleCard('./playing_card.JPG')
    document.querySelector('#winning-message').setAttribute('class', 'hide-element')
    document.querySelector('#losing-message').setAttribute('class', 'hide-element')
    toggleButtons()
}

function playRound(guess) {
    toggleButtons()
    console.log({card: currentCard, player_guess: guess, round: roundTracker})
    if (guess.includes(currentCard)) {
        correctAnswers++
        updateDiplays()
        new Audio('./correct.mp3').play()
    } else {
        window.navigator.vibrate(200)
    }
    if (roundTracker < numberOfRounds) {
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
    } else {
        toggleCard('')
        if (correctAnswers >= winCondition) {
            new Audio('./winner.mp3').play()
            document.querySelector('#winning-message').setAttribute('class', '')
        } else {
            new Audio('./lose_sound.mp3').play()
            document.querySelector('#losing-message').setAttribute('class', '')
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
