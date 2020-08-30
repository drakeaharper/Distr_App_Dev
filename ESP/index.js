function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

var cardTypes = [ 'Circle', 'Square', 'Star', 'Plus', 'Wave' ]

var t_star   = '\u2606' // star
var t_circle = '\u25EF' // circle
var t_square = '\u20DE' // square
var t_wave   = '\u222D' // wave
var t_plus   = '\uFF0B' // plus

var deck = []

cardTypes.forEach(item => {
    for (let i = 0; i < cardTypes.length; i++) {
        deck.push(item)
    }
})

function initializeGame() {
    correct_answers = 0
    deck = shuffle(deck)
    deck_position = 0
    setScore()
}

var deck_position = 0
 function startGame() {
    initializeGame()
    announce("I'm going to test you for extra sensory power. The other side of this card is a circle, plus, waves, square, or star. Clear your mind.");
    announce("Let's begin");
    setTimeout( () => {
        playGame(0)
    }, 12000)
}

var correct_answers = 0
function playGame(index) {
    announce("What is your guess")
    setTimeout(() => {
        playRound(deck[index])
    }, 3000)
}

function playRound(card) {
    showCard()
    // console.log(`current card: ${card}`)

    recognition.start();
}

function announce(words) {
    var msg = new SpeechSynthesisUtterance(words);
    window.speechSynthesis.speak(msg);
}

function showCard() {
    $('#card-display').show()
    $('#shape-display').hide()
}

function showShape(shape) {
    $('#card-display').hide()
    $('#shape-display').first().text(shape)
    $('#shape-display').show()
}

function setScore() {
    $('#score-board').first().text(`${correct_answers}/${deck.length}`)
}

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var shapes = cardTypes
var grammar = '#JSGF V1.0; grammar shapes; public <shape> = ' + shapes.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = function(event) {
    var shape = event.results[0][0].transcript;
    switch(deck[deck_position]) {
        case 'Star':
            showShape(t_star)
            break
        case 'Circle':
            showShape(t_circle)
            break
        case 'Square':
            showShape(t_square)
            break
        case 'Plus':
            showShape(t_plus)
            break
        case 'Wave':
            showShape(t_wave)
            break
        default:
            break
    }
    if (shape.toLocaleLowerCase() === deck[deck_position].toLocaleLowerCase()) {
        correct_answers++
        setScore()
    }
    deck_position++
    // console.log({card: deck[deck_position - 1], guess: shape, correct_answers: correct_answers, deck_position: deck_position})
    if (deck_position < deck.length) {
        setTimeout(() => {
            playGame(deck_position)
        }, 3000)
    } else if (deck_position >= deck.length) {
        if (correct_answers >= Math.round(deck.length * .48)) {
            announce("You have E S P")
        } else {
            announce("You do not have E S P")
        }
    }
}

recognition.onspeechend = function(event) {
    recognition.stop();
}

recognition.onnomatch = function(event) {
    console.log('I didnt recognize that answer.')
    announce("Sorry, I didn't hear you.")
        setTimeout(() => {
            playGame(deck_position)
        }, 3000)
}

recognition.onerror = function(event) {
    console.log('Error occurred in recognition: ' + event.error)
    if (event.error == "not-allowed") {
        announce("Sorry, I permission to use your microphone")
        setTimeout(() => {
            playGame(deck_position)
        }, 3500)
    } else {
        announce("Sorry, I didn't hear you.")
        setTimeout(() => {
            playGame(deck_position)
        }, 3000)
    }
}
