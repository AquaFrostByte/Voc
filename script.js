const transInput = document.getElementById('transInput');
const tbody = document.getElementById('vocabTableBody');
const exportBtn = document.getElementById('exportBtn');
const wordInput = document.getElementById('wordInput');

let vocabList = [];

function addWord() {
    const word = wordInput.value.trim();
    const translation = transInput.value.trim();
    
    if (!word) return;
    
    vocabList.push({ word, translation });
    renderTable();
    
    wordInput.value = '';
    transInput.value = '';
    wordInput.focus();
}
function renderTable() {
    if (vocabList.length === 0) return;
    
    tbody.innerHTML = vocabList.map(v => 
        `<tr>
        <td>${v.word}</td>
        <td>${v.translation || '<span style="color:#ccc;">-</span>'}</td>
        </tr>`
    ).join('');
}

wordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addWord();
    }
});

transInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addWord();
    }
});

exportBtn.addEventListener('click', () => {
    if (vocabList.length === 0) {
        alert("You haven't added any words yet!");
        return;
    }
    
    let csvContent = "\uFEFFWord,Translation\n";
    
    csvContent += vocabList.map(v => {
        let w = `"${v.word.replace(/"/g, '""')}"`;
        let t = `"${v.translation.replace(/"/g, '""')}"`;
        return `${w},${t}`;
    }).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'My_Vocabulary.csv');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});