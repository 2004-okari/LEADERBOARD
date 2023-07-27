import './styles.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const gameName = { name: 'Okari Game' };
let gameId = '0ToP2vQsz2wd4sNV2QT';

const createGame = async () => {
  try {
    const response = await fetch(`${url}games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameName),
    });
    const data = await response.json();
    gameId = data.result.split(' ')[3];
  } catch (e) {
    console.error('Error creating game', e);
  }
};

document.querySelector('.head-1').innerHTML = gameId;

const submitScore = async (user, score) => {
  try {
    const response = await fetch(`${url}games/${gameId}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, score }),
    });
    const data = await response.json();
  } catch (error) {
    console.error('Error submitting score:', error);
  }
};

const displayLeaderboard = async () => {
  const scoreTable = document.querySelector('.table');
  scoreTable.innerHTML = '';

  try {
    const response = await fetch(`${url}games/${gameId}/scores/`);
    const data = await response.json();
    data.result.forEach((scoreData) => {
      const lineStore = document.createElement('tr');
      lineStore.innerHTML = `
        <td class="name">${scoreData.user}</td>
        <td class="score">${scoreData.score}</td>
      `;
      scoreTable.appendChild(lineStore);
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
};

const submitScoreData = () => {
  const nameInput = document.querySelector('.name-input');
  const scoreInput = document.querySelector('.score-input');

  if (nameInput && scoreInput) {
    const name = nameInput.value;
    const score = scoreInput.value;
    submitScore(name, score);
  } 
};

const submitButton = document.querySelector('.submit-btn');
submitButton.addEventListener('click', submitScoreData);