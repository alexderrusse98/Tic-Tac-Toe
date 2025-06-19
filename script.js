let fields = [
    null,
    null,
    'x',
    null,
    null,
    null,
    'o',
    null,
    null
];

function init(){
    render();
}

  function render() {
  let html = '<table>';

  for (let i = 0; i < 3; i++) {
    html += '<tr>';
    for (let j = 0; j < 3; j++) {
      const index = i * 3 + j;
      let symbol = '';

      if (fields[index] === 'x') {
        symbol = '❌';
      } else if (fields[index] === 'o') {
        symbol = '⭕';
      } else {
        symbol = '';
      }

      html += `<td onclick="handleClick(${index})">${symbol}</td>`;
    }
    html += '</tr>';
  }

  html += '</table>';
  document.getElementById('content').innerHTML = html;
}


    function handleClick(index) {
      if (fields[index] !== null) return; // Feld belegt, nichts tun
      fields[index] = 'x'; // Beispiel: immer ein X setzen
      render(); // neu rendern
    }

    render(); // Initial aufrufen
