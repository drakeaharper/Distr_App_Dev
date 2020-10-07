var cardTypes = [ 'circle', 'square', 'star', 'plus', 'waves' ]
var winCondition = 5
var correctAnswers = 0
var roundTracker = 1
var numberOfRounds = 10
var currentCard = _.sample(cardTypes)
var disableButtons = false
var mainImageDisplay = document.getElementById('main-display')
var browserCookies = getCookies()
console.log(`current card: ${currentCard}`)
updateDiplays()

console.log(browserCookies['darkMode'])
console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)

console.log("Icons made by Freepik https://www.flaticon.com/authors/freepik")

if (browserCookies['darkMode'] === undefined) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        darkModeActivate()
    } else {
        darkModeDeactivate()
    }
} else if (browserCookies['darkMode'] === 'true') {
    darkModeActivate()
} else {
    darkModeDeactivate()
}

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

console.log(browserCookies['darkMode'])
console.log(window.matchMedia('(prefers-color-scheme: dark)').matches)

var vibrateSupported = false

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
        if (vibrateSupported) {
            window.navigator.vibrate(200)
        } else if (reduceMotion) {
            mainImageDisplay.setAttribute('class', 'img-fluid danger')
            setTimeout(() => {
                mainImageDisplay.setAttribute('class', 'img-fluid')
            }, 1500)
        } else {
            document.querySelector('body').setAttribute('class', ' main-background flex-column shaker')
            setTimeout(() => {
                document.querySelector('body').setAttribute('class', 'main-background flex-column')
            }, 1500)
        }
    }
    if (roundTracker < numberOfRounds) {
        let pathToShow = `./Zener_Cards/${currentCard}.svg`
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
        if (correctAnswers >= winCondition) {
            new Audio('./winner.mp3').play()
            document.querySelector('#winning-message').setAttribute('class', '')
            toggleCard('./Zener_Cards/happy.svg')
        } else {
            toggleCard('./Zener_Cards/sad.svg')
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
    mainImageDisplay.src = path
}

function toggleButtons() {
    disableButtons = !disableButtons
    document.querySelectorAll('button').forEach(item => {if (item.id != 'start-btn' && item.id != 'dark-mode-btn') {item.disabled = disableButtons}})
}

function toggleDarkMode() {
    console.log('toggle dark')
    if (browserCookies['darkMode'] === 'true') {
        darkModeDeactivate()
    } else {
        darkModeActivate()
    }
}

function getCookies() {
    let cookies = {}
    if (document.cookie != "") {
        document.cookie.split(';').map(item => {
            let dough = item.split('=')
            cookies[dough[0]] = dough[1]
        })
    }
    return cookies
}

function writeCookie() {
    var date = new Date();
    date.setTime(date.getTime() + (182 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    console.log(browserCookies)
    for(key in browserCookies) {
        console.log(`key: ${key}, value: ${browserCookies[key]}`)
        document.cookie = `${key}=${browserCookies[key]}; ${expires}; path=/`
    }
    console.log(document.cookie)
}

function darkModeDeactivate() {
    console.log('deactivate')
    var sheet = document.createElement('style')
    sheet.innerHTML = ".main-background {background-color: green;} #start-btn, #dark-mode-btn {background-color: #0d6efd;}";
    document.body.appendChild(sheet);
    browserCookies['darkMode'] = 'false'
    document.getElementById('dark-mode-btn').innerText = 'Dark Mode: Off'
    writeCookie()
}

function darkModeActivate() {
    console.log('activate')
    var sheet = document.createElement('style')
    sheet.innerHTML = ".main-background {background-color: black;} #start-btn, #dark-mode-btn {background-color: #272727;}";
    document.body.appendChild(sheet);
    browserCookies['darkMode'] = 'true'
    document.getElementById('dark-mode-btn').innerText = 'Dark Mode: On'
    writeCookie()
}
