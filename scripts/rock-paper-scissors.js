let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

const autoplayButtonElement = document.querySelector('.auto-play-button');

autoplayButtonElement.addEventListener('click', autoPlay);

autoplayButtonElement.addEventListener('click', () => {
  if(isAutoPlaying) {
    autoplayButtonElement.innerHTML = 'Stop Playing';
  } else {
    autoplayButtonElement.innerHTML = 'Auto Play';
  }
});
//We could do the same thing to modify the text in autoplay button by changing the innerHTML in autoplay function. 

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }

  if(event.key === 'a') {
    autoPlay();
  }

  if(event.key === 'Backspace') {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  /* Added the following code to have emojies when rendering the result, but didn't look good, so removed it.
  if (result === 'You win.') {
    result += '&#x1F3C6;';
  } else if (result === 'You lose.') {
    result += '&#x1F61E;';
  } else if (result === 'Tie.') {
    result += '&#x1F91D;';
  }
  */

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon"> &#124;
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

const showResetWarning = () => {
  document.querySelector('.reset-score-warning')
    .classList.add('show-reset-warning');
}

const hideResetWarning = () => {
  document.querySelector('.reset-score-warning')
    .classList.remove('show-reset-warning');
}

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    showResetWarning();

    const warning = `
    <div class="warning-message">Are you sure you want to reset the score?</div>
    
    <button class="yes-reset-button" onclick="
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
      document.querySelector('.reset-score-warning')
        .innerHTML = '';
      hideResetWarning();
    ">
      Yes
    </button> 

    <button class="no-reset-button" onclick="
      document.querySelector('.reset-score-warning')
        .innerHTML = '';
      hideResetWarning();
    ">
      No
    </button> 
    `;
    
    document.querySelector('.reset-score-warning')
      .innerHTML = warning;
})

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins : ${score.wins} <span>&#124;</span> Losses : ${score.losses} <span>&#124;</span> Ties : ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}