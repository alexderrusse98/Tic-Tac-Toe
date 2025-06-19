let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'x';
let gameOver = false;

function init() {
  render(); // nur das Spielfeld aufbauen
}

function generateAnimatedCircleSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 70 70">
      <circle cx="35" cy="35" r="30"
              fill="none" stroke="#00B0EF" stroke-width="8"
              stroke-dasharray="188.4" stroke-dashoffset="188.4">
        <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="1s" fill="freeze"/>
      </circle>
    </svg>
  `;
}

function generateAnimatedCrossSVG() {
  return `
    <svg width="70" height="70" viewBox="0 0 70 70">
      <line x1="15" y1="15" x2="55" y2="55" stroke="#00B0EF" stroke-width="8" stroke-linecap="round"
            stroke-dasharray="56.57" stroke-dashoffset="56.57">
        <animate attributeName="stroke-dashoffset" from="56.57" to="0" dur="0.5s" fill="freeze"/>
      </line>
      <line x1="55" y1="15" x2="15" y2="55" stroke="#00B0EF" stroke-width="8" stroke-linecap="round"
            stroke-dasharray="56.57" stroke-dashoffset="56.57">
        <animate attributeName="stroke-dashoffset" from="56.57" to="0" begin="0.5s" dur="0.5s" fill="freeze"/>
      </line>
    </svg>
  `;
}

function render() {
  let html = '<table>';
  for (let i = 0; i < 3; i++) {
    html += '<tr>';
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      html += `<td id="cell-${index}" onclick="handleClick(${index})"></td>`;
    }
    html += '</tr>';
  }
  html += '</table>';
  document.getElementById('content').innerHTML = html;
}

function handleClick(index) {
  if (fields[index] !== null || gameOver) return;

  fields[index] = currentPlayer;

  const cell = document.getElementById(`cell-${index}`);
  cell.innerHTML = currentPlayer === 'x'
    ? generateAnimatedCrossSVG()
    : generateAnimatedCircleSVG();

  const winnerInfo = checkWinner();
  if (winnerInfo) {
    showWinLine(winnerInfo.line);
    showMessage(`Herzlichen Glückwunsch, ${winnerInfo.player.toUpperCase()} hat gewonnen!`);
    gameOver = true;
    setTimeout(resetGame, 10000);
    return;
  }

  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

function checkWinner() {
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const line of winningLines) {
    const [a, b, c] = line;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      return { player: fields[a], line };
    }
  }
  return null;
}

function showWinLine(line) {
  const cellSize = 80;  // Muss zur td-Größe in CSS passen
  const positions = [
    { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
    { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
    { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }
  ];
  const [start, , end] = line;
  const startPos = positions[start];
  const endPos = positions[end];

  const width = cellSize * 3;
  const height = cellSize * 3;

  document.getElementById('overlay').innerHTML = `
    <svg width="${width}" height="${height}">
      <line x1="${startPos.x * cellSize + cellSize / 2}" y1="${startPos.y * cellSize + cellSize / 2}"
            x2="${endPos.x * cellSize + cellSize / 2}" y2="${endPos.y * cellSize + cellSize / 2}"
            stroke="white" stroke-width="8" stroke-linecap="round" />
    </svg>
  `;
}

function showMessage(text) {
  document.getElementById('message').textContent = text;
}

function resetGame() {
  fields = Array(9).fill(null);
  currentPlayer = 'x';
  gameOver = false;
  document.getElementById('overlay').innerHTML = '';
  document.getElementById('message').textContent = '';
  render();
}


function restart(){
    render();
}