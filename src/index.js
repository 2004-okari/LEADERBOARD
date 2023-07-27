import './styles.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const gameName = { name: 'Okari Game' };
let gameId = 'AkSDZZAGMMaVZfipeCTI';

const createGame = async () => {
  try {
    const response = await fetch(`${url}games/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameName),
    });
    const { result } = await response.json();
    [, , , gameId] = result.split(' ');
  } catch (e) {
    console.error('Error creating game', e);
  }
};

const submitScore = async (user, score) => {
  try {
    await fetch(`${url}games/${gameId}/scores/`, {
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
  nameInput.value = '';
  scoreInput.value = '';
};

const refreshButton = document.querySelector('.refresh-btn');
refreshButton.addEventListener('click', displayLeaderboard);

const submitButton = document.querySelector('.submit-btn');
submitButton.addEventListener('click', submitScoreData);

export { createGame, displayLeaderboard };