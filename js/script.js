window.onload = function() {
    var card = document.getElementById('flashcard');
    var nextButton = document.getElementById('nextButton');
    var lineNumberInput = document.getElementById('lineNumber');
    var goToLineButton = document.getElementById('goToLine');
    var showCSVButton = document.getElementById('showCSV');
    var data;


    // read the data from the ;-separated csv using papa parse
    fetch('data/data.csv')
        .then(response => response.text())
        .then(csvData => {
            data = Papa.parse(csvData, {delimiter: ';', skipEmptyLines: true}).data;
            showFlashcard(0);
        });
        
    
    // Event-Listeners for card and buttons
    card.addEventListener('click', function() {
        this.classList.toggle('is-flipped');
    });

    nextButton.addEventListener('click', function() {
        var randomIndex = Math.floor(Math.random() * data.length);
        card.classList.remove('is-flipped'); 
        showFlashcard(randomIndex);
    });

    goToLineButton.addEventListener('click', function() {
        var lineNumber = lineNumberInput.value;
        if (lineNumber > 0 && lineNumber <= data.length) {
            card.classList.remove('is-flipped');
            showFlashcard(lineNumber - 1);
        }
    });

    showCSVButton.addEventListener('click', function() {
        var table = '<style>table {border-collapse: collapse;} table, th, td {border: 1px solid black; padding: 10px;} tr td:nth-child(n+2):nth-child(-n+5) {background-color: lightblue;} tr td:nth-child(n+6):nth-child(-n+10) {background-color: lightsalmon;}</style><table>';
        data.forEach(function(row, index) {
            table += '<tr><td>' + (index + 1) + '</td>';
            row.forEach(function(cell) {
                table += '<td>' + cell + '</td>';
            });
            table += '</tr>';
        });
        table += '</table>';

        var newWindow = window.open('', '_blank');
        newWindow.document.write(table);
        newWindow.document.close();
    });


    // display the content in the flashcard // 3 columns on the front, 6 columns on the backside
    function showFlashcard(index) {
        var flashcardData = data[index];

        var front = card.querySelector('.front');
        front.innerHTML = `<p class="infinitive">${flashcardData[0] || ''}</p><p>${flashcardData[1] || ''}</p><p>${flashcardData[2] || ''}</p><p class="small-text">- ${index + 1} -</p>`;

        var back = card.querySelector('.back');
        back.innerHTML = `<p class="infinitive">${flashcardData[3] || ''}</p><p>${flashcardData[4] || ''}</p><p>${flashcardData[5] || ''}</p><p>${flashcardData[6] || ''}</p><p>${flashcardData[7] || ''}</p><p>${flashcardData[8] || ''}</p>`;
    }
}
