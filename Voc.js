const chapterInput = document.getElementById('chapterInput');
const wordInput = document.getElementById('wordInput');
const transInput = document.getElementById('transInput');
const tbody = document.getElementById('vocabTableBody');
const exportBtn = document.getElementById('exportBtn');
const importFile = document.getElementById('importFile');

let vocabList = [];

function addWord() {
    const chapter = chapterInput.value.trim();
    const word = wordInput.value.trim();
    const translation = transInput.value.trim();
    
    if (!word) {
        wordInput.focus();
        return;
    }
    
    vocabList.push({ chapter, word, translation });
    renderTable();

    wordInput.value = '';
    transInput.value = '';
    wordInput.focus();
}

function renderTable() {
    if (vocabList.length === 0) return;
    
    tbody.innerHTML = vocabList.map(v => 
        `<tr>
            <td>${v.chapter || '<span style="color: rgba(255, 255, 255, 0.4);">-</span>'}</td>
            <td>${v.word}</td>
            <td>${v.translation || '<span style="color: rgba(255, 255, 255, 0.4);">-</span>'}</td>
        </tr>`
    ).join('');
}

[wordInput, transInput, chapterInput].forEach(input => {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addWord();
        }
    });
});

importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const text = event.target.result;

        const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
        if (lines.length <= 1) {
            alert("File is empty or doesn't have enough data.");
            return;
        }

        lines.shift();

        const wordsPerChapter = prompt(`Found ${lines.length} words!\nDo you want to automatically split them into chapters?\n\nEnter the amount of words per chapter (e.g. 20), or leave it blank to keep them as they are.`);
        const chunkSize = parseInt(wordsPerChapter);

        let importedCount = 0;

        lines.forEach((line, index) => {
            let parts = line.split(',');
            parts = parts.map(p => p.replace(/^"|"$/g, '').trim());

            let word = parts[0] || '';
            let translation = parts[1] || '';
            let chapter = parts[2] || ''; 

            if (!isNaN(chunkSize) && chunkSize > 0) {
                chapter = "Chapter " + (Math.floor(index / chunkSize) + 1);
            }

            if (word) {
                vocabList.push({ chapter, word, translation });
                importedCount++;
            }
        });

        renderTable();
        e.target.value = ''; 
        alert(`Successfully imported ${importedCount} words!`);
    };
    reader.readAsText(file);
});

exportBtn.addEventListener('click', () => {
    if (vocabList.length === 0) {
        alert("You haven't added any words yet!");
        return;
    }

    let csvContent = "\uFEFFWord,Translation,Chapter\n";
    
    csvContent += vocabList.map(v => {
        let w = `"${v.word.replace(/"/g, '""')}"`;
        let t = `"${v.translation.replace(/"/g, '""')}"`;
        let c = `"${(v.chapter || '').replace(/"/g, '""')}"`;
        return `${w},${t},${c}`;
    }).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'My_Vocabulary_Chapters.csv');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});

document.getElementById('copySheetsBtn').addEventListener('click', () => {
    if (vocabList.length === 0) {
        alert("Yout dont have any words...");
        return;
    }
})