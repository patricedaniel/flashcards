window.onload = function() {
    var card = document.getElementById('flashcard');
    var nextButton = document.getElementById('nextButton');
    var lineNumberInput = document.getElementById('lineNumber');
    var goToLineButton = document.getElementById('goToLine');
    var showCSVButton = document.getElementById('showCSV');
    var infoButton = document.getElementById('info');
    var infoButton = document.getElementById('info');
    var popup = document.getElementById('popup');
    var closePopupButton = document.getElementById('closePopup');
    var data; // will be data parsed from the csv


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
        var table = '<style>table {border-collapse: collapse;} table, th, td {border: 1px solid black; padding: 10px;} tr td:nth-child(n+2):nth-child(-n+4) {background-color: lightblue;} tr td:nth-child(n+5) {background-color: lightsalmon;}</style><table>';
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

    infoButton.addEventListener('click', function() {
        popup.style.display = 'block';
    });
    
    closePopupButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });
    popup.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // display the content in the flashcard // 3 columns on the front, 6 columns on the backside
    function showFlashcard(index) {
        var flashcardData = data[index];

        var front = card.querySelector('.front');
        front.innerHTML = `<p class="infinitive">${flashcardData[0] || ''}</p><p>${flashcardData[1] || ''}</p><p>${flashcardData[2] || ''}</p><p class="small-text">- ${index + 1} -</p>`;

        var back = card.querySelector('.back');
        back.innerHTML = `<p class="infinitive">${flashcardData[3] || ''}</p><p>${flashcardData[4] || ''}</p><p>${flashcardData[5] || ''}</p><p>${flashcardData[6] || ''}</p><p>${flashcardData[7] || ''}</p><p>${flashcardData[8] || ''}</p>`;

        ///////////////////////////////////////
        /// display a picture from pexels /////
        ///////////////////////////////////////

        // get the search promt out of the current line in the csv flashcardData[0]
        var word = flashcardData[0];

        // Erstelle einen neuen XMLHttpRequest-Objekt
        var xhr = new XMLHttpRequest();

        // Öffne eine GET-Anfrage an die Pexels API mit dem Suchbegriff als Parameter
        xhr.open("GET", "https://api.pexels.com/v1/search?query=" + word + "&per_page=1&page=1");

        // Setze den Authorization-Header mit deinem API-Schlüssel
        xhr.setRequestHeader("Authorization", config.pexels_api_key);

        // Definiere eine Funktion, die ausgeführt wird, wenn die Anfrage abgeschlossen ist
        xhr.onload = function() {
            // Überprüfe, ob die Anfrage erfolgreich war
            if (xhr.status == 200) {
            // Parse die Antwort als JSON-Objekt
            var response = JSON.parse(xhr.responseText);

            // Erhalte die URL des ersten gefundenen Bildes
            var imageUrl = response.photos[0].src.large; // original // large2x // large // medium // small // portrait // landscape // tiny
            // see src description here: https://www.pexels.com/de-de/api/documentation/#photos-overview__response__src

            // Setze das Bild als Hintergrundbild des div-Elements
            var imageContainer = document.querySelector(".back");
            imageContainer.style.backgroundImage = "url(" + imageUrl + ")";
            } else {
            // Zeige eine Fehlermeldung an, wenn die Anfrage fehlgeschlagen ist
            console.error("An error occurred: " + xhr.statusText);
            }
        };

        // Sende die Anfrage
        xhr.send();
        
    }

}
