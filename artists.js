document.addEventListener("DOMContentLoaded", () => {
    const artists = [
        { 
            title: "Alex Ferran",
            progression: "i · iv · V · i", 
            chords: "Am, Dm, E7, Am", 
            text: "Take the Marc Ribot approach by emphasizing those 6th intervals", 
            category: "Jazz Noir",
            image: "images/artists/alex-ferran.jpg"
        },
        { 
            title: "Jack Ruch",
            progression: "I · IV · V · I",  
            chords: "G7, C7, D7, G7", 
            text: "Spice up your chord changes using diminished and altered scales", 
            category: "Jazz Blues",
            image: "images/artists/jack-ruch.jpg"
        },
        { 
            title: "Robben Ford",
            progression: "I · IV · V · I",  
            chords: "A, D, E, A", 
            text: "Walk from one chord to the next melodically", 
            category: "Jazz Blues",
            image: "images/artists/robben-ford.jpg"
        },
        { 
            title: "Corey Congilio",
            progression: "I · V · vi · IV",  
            chords: "C, G, Am, F", 
            text: "Add gain your Rock progressions", 
            category: "Rock",
            image: "images/artists/corey-congilio.jpg"
        }
    ];

    const grid = document.querySelector(".artists-grid");

    function renderArtists(filter = null) {
        grid.innerHTML = ""; // Clear grid
        const filteredArtists = filter 
            ? artists.filter(s => s.category === filter) 
            : artists;

        filteredArtists.forEach(({ title, progression, chords, text, category, image }) => {
            const card = document.createElement("div");
            card.classList.add("artist-card");
            card.setAttribute("data-chords", chords);

            // Add image container
            card.innerHTML = `
                <div class="artist-bg" style="background-image: url(${image});"></div>
                <div class="artist-overlay"></div>
                <div class="artist-card-category">${category}</div>
                <div class="artist-content">
                    <h3 class="artist-card-title">${title}</h3>
                    <p class="artist-card-description">${text}</p>
                    <p class="artist-card-progression">${progression}</p>
                    <p class="artist-card-chords">${chords}</p>
                </div>
            `;

            // Event listener for clicking the entire card
            card.addEventListener("click", () => {
                const inputField = document.getElementById("chord-input");
                if (inputField) {
                    inputField.value = chords;
                }

                // Simulate clicking the submit button
                const submitButton = document.getElementById("submit-button");
                if (submitButton) {
                    submitButton.click();
                } else {
                    console.error("Submit button not found!");
                }
            });

            grid.appendChild(card);
        });
    }

    // Initial rendering of artist cards
    renderArtists();
});
