document.addEventListener("DOMContentLoaded", () => {
    const suggestions = [
        { 
            title: "Blues in Am", 
            chords: "Am, Dm, E7", 
            text: "Klassische Blues-Progression in A-Moll", 
            category: "Blues",
            image: "images/blues-in-a.jpg"
        },
        { 
            title: "Jazz Blues in G", 
            chords: "G7, C7, D7", 
            text: "Jazzige Blues-Progression in G", 
            category: "Jazz Blues",
            image: "images/jazz-blues-in-g.jpg"
        },
        { 
            title: "Pop Standard", 
            chords: "C, G, Am, F", 
            text: "Sehr häufige Akkordfolge in C-Dur", 
            category: "Pop",
            image: "images/blues-in-a.jpg"
        },
        { 
            title: "Rock Klassiker", 
            chords: "D, A, Bm, G", 
            text: "Klassische Rock-Akkorde in D", 
            category: "Rock",
            image: "images/jazz-blues-in-g.jpg"
        },
        { 
            title: "Rock Klassiker", 
            chords: "D, A, Bm, G", 
            text: "Klassische Rock-Akkorde in D", 
            category: "Rock",
            image: "images/blues-in-a.jpg"
        },
        { 
            title: "Rock Klassiker", 
            chords: "D, A, Bm, G", 
            text: "Klassische Rock-Akkorde in D", 
            category: "Rock",
            image: "images/jazz-blues-in-g.jpg"
        },
        { 
            title: "Rock Klassiker", 
            chords: "D, A, Bm, G", 
            text: "Klassische Rock-Akkorde in D", 
            category: "Rock",
            image: "images/blues-in-a.jpg"
        }
    ];

    const grid = document.querySelector(".suggestions-grid");


    function renderSuggestions(filter = null) {
        grid.innerHTML = ""; // Grid leeren
        const filteredSuggestions = filter 
            ? suggestions.filter(s => s.category === filter) 
            : suggestions;
    
        filteredSuggestions.forEach(({ title, chords, text, image }) => {
            const card = document.createElement("div");
            card.classList.add("suggestion-card");
            card.setAttribute("data-chords", chords);
    
            // Bildcontainer hinzufügen
            card.innerHTML = `
                <div class="suggestion-bg" style="background-image: url(${image});"></div>
                <div class="suggestion-overlay"></div>
                <div class="suggestion-content">
                    <h3 class="suggestion-title">${title}</h3>
                    <p class="suggestion-chords">${chords}</p>
                    <p class="suggestion-text">${text}</p>
                </div>
            `;
    
            grid.appendChild(card);
        });
    };
    

    // Initial Cards anzeigen
    renderSuggestions();

    // Event Listener für "Jam"-Buttons
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("suggestion-button")) {
            const card = event.target.closest(".suggestion-card");
            const chords = card.getAttribute("data-chords");

            // Akkorde ins Eingabefeld setzen
            const inputField = document.getElementById("chord-input");
            if (inputField) {
                inputField.value = chords;
            }

            // Skalen berechnen und anzeigen
            showScales(chords);
        }
    });
});

// Funktion zur Berechnung der passenden Skalen
function showScales(chords) {
    console.log(`Berechne Skalen für: ${chords}`);
    
    // Hier kannst du deine eigentliche Skalen-Logik einfügen:
    if (typeof getScalesForChords === "function") {
        const scaleResults = getScalesForChords(chords);
        displayResults(scaleResults);
    } else {
        console.error("Skalen-Funktion nicht gefunden!");
    }
}

// Dummy-Funktion: Hier muss deine echte Logik hin
function getScalesForChords(chords) {
    // Beispielhafte Rückgabe, später durch deine Logik ersetzen
    return [`Skala 1 für ${chords}`, `Skala 2 für ${chords}`];
}

// Ergebnisse im UI anzeigen
function displayResults(scales) {
    const resultsSection = document.getElementById("results-section");
    resultsSection.innerHTML = ""; // Vorherige Ergebnisse löschen

    scales.forEach(scale => {
        const scaleCard = document.createElement("div");
        scaleCard.classList.add("scale-card");
        scaleCard.textContent = scale;
        resultsSection.appendChild(scaleCard);
    });
}
