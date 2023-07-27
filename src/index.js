import './styles.css';

const API_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const gameName = { name: 'Okari Game' };
let gameId = '0ToP2vQsz2wd4sNV2QT';

const createGame = async () => {
  try {
    const response = await fetch(`${API_URL}games/`, {
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
    await fetch(`${API_URL}games/${gameId}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user, score }),
    });
  } catch (error) {
    console.error('Error submitting score:', error);
  }
};

const displayLeaderboard = async () => {
  const scoreTable = document.querySelector('.table');
  scoreTable.innerHTML = '';

  try {
    const response = await fetch(`${API_URL}games/${gameId}/scores/`);
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

const submitScoreData = async () => {
  const nameInput = document.querySelector('.name');
  const scoreInput = document.querySelector('.score');

  if (nameInput && scoreInput) {
    const name = nameInput.value;
    const score = scoreInput.value;
    await submitScore(name, score);
    displayLeaderboard(); // Refresh the leaderboard after saving score
  } else {
    console.error('Error: Elements with classes "name" and/or "score" not found.');
  }
};

const submitButton = document.querySelector('.submit-btn');
submitButton.addEventListener('click', submitScoreData);