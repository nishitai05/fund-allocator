document.getElementById('add-fund').addEventListener('click', () => {
    const container = document.getElementById('funds-container');
    const row = document.createElement('div');
    row.className = 'fund-row';
    row.innerHTML = \`
        <input type="text" placeholder="ファンド名" class="fund-name" required>
        <input type="number" placeholder="現在額" class="current-amount" required>
        <input type="number" placeholder="比率" class="ratio" required>
        <button type="button" class="remove-btn">−</button>
    \`;
    container.appendChild(row);
});

document.getElementById('funds-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        e.target.parentElement.remove();
    }
});

document.getElementById('fund-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const names = [...document.querySelectorAll('.fund-name')].map(el => el.value);
    const currents = [...document.querySelectorAll('.current-amount')].map(el => parseFloat(el.value));
    const ratios = [...document.querySelectorAll('.ratio')].map(el => parseFloat(el.value));
    const newAmount = parseFloat(document.getElementById('new-amount').value);

    const totalCurrent = currents.reduce((a, b) => a + b, 0);
    const totalTarget = totalCurrent + newAmount;
    const ratioSum = ratios.reduce((a, b) => a + b, 0);

    const targets = ratios.map(r => totalTarget * (r / ratioSum));
    const additions = targets.map((t, i) => (t - currents[i]));

    let resultHTML = '<h2>振り分け結果</h2><ul>';
    additions.forEach((add, i) => {
        resultHTML += \`<li>\${names[i]} に \${add.toFixed(2)} 円入金</li>\`;
    });
    resultHTML += '</ul>';

    document.getElementById('result').innerHTML = resultHTML;
});