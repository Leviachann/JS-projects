const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}
var playSoundClass = 'is-playing';
var assetsUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/',
    sound = [
      'smb3_1-up.mp3',
      'smb3_nspade_match.mp3',
      'smb3_bonus_game_no_match.mp3'
    ],
    soundSuccess = new Audio(assetsUrl + sound[0]),
    soundMatch = new Audio(assetsUrl + sound[1]),
    soundNoMatch = new Audio(assetsUrl + sound[2]);

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}
const shuffle = array => {
    const clonedArray = [...array]

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

const generateGame = (dimensions) => {
    if (dimensions % 2 !== 0) {
        throw new Error("The dimension of the board must be an even number.")
    }

    const svgPaths = ['media/bug.svg', 'media/hammer.svg', 'media/guide.svg', 'media/questions.svg', 'media/solution.svg', 'media/virus.svg', 'media/andrioud.svg', 'media/pear.svg','media/html.svg','media/wordpress.svg', 'media/bug.svg', 'media/hammer.svg', 'media/guide.svg', 'media/questions.svg', 'media/solution.svg', 'media/virus.svg', 'media/andrioud.svg', 'media/pear.svg','media/html.svg','media/wordpress.svg']
    const picks = pickRandom(svgPaths, (dimensions * dimensions) / 2) 
    const items = shuffle([...picks, ...picks])
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items.map(item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">
                        <img src="${item}" alt="SVG Image">
                    </div>
                </div>
            `).join('')}
       </div>
    `
    
    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `time: ${state.totalTime} sec`
    }, 1000)
}

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')
        const [firstCard, secondCard] = flippedCards;

       
        const firstImageSrc = firstCard.querySelector('img').src;
        const secondImageSrc = secondCard.querySelector('img').src;

        if (firstImageSrc === secondImageSrc) {
            firstCard.classList.add('matched');
            secondCard.classList.add('matched');
            state.flippedCards = 0
            soundMatch.play(); 
        } else {
            setTimeout(() => {
                flipBackCards()
                soundNoMatch.play(); 
            }, 1000);
        }
    }

    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            soundSuccess.play(); 
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    Congratulations!!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    within <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `

            clearInterval(state.loop)
        }, 1000)
    }
}


const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.className === 'startbutton' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}
function ez(){
    generateGame(2)
    document.getElementById('easy').style.display='none';
    document.getElementById('medium').style.display='none';
    document.getElementById('difficult').style.display='none';
    document.getElementById('startb').style.display='block';
    document.getElementById('mvs').style.display='block';
    document.getElementById('tmr').style.display='block';
}
function med(){
    generateGame(4)
    document.getElementById('easy').style.display='none';
    document.getElementById('medium').style.display='none';
    document.getElementById('difficult').style.display='none';
    document.getElementById('startb').style.display='block';
    document.getElementById('mvs').style.display='block';
    document.getElementById('tmr').style.display='block';
}
function diff(){
    generateGame(6)
    document.getElementById('easy').style.display='none';
    document.getElementById('medium').style.display='none';
    document.getElementById('difficult').style.display='none';
    document.getElementById('startb').style.display='block';
    document.getElementById('mvs').style.display='block';
    document.getElementById('tmr').style.display='block';
}
attachEventListeners()
