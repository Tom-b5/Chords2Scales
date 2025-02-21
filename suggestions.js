document.addEventListener("DOMContentLoaded", () => {
    const suggestions = [
        { 
            title: "Minor Blues",
            progression: "i · iv · V · i", 
            chords: "Am, Dm, E7, Am", 
            text: "Blues in A Minor", 
            category: "Blues",
            image: "images/minor-blues.jpg"
        },
        { 
            title: "Major Blues",
            progression: "I · IV · V · I",  
            chords: "G7, C7, D7, G7", 
            text: "Major Blues in G Major", 
            category: "Blues",
            image: "images/jazz-blues-in-g.jpg"
        },
        { 
            title: "Classic Rock",
            progression: "I · IV · V · I",  
            chords: "A, D, E, A", 
            text: "Make my Heart Sing in A Major", 
            category: "Rock",
            image: "images/classic-rock.jpg"
        },
        { 
            title: "Rock ’n’ Pop",
            progression: "I · V · vi · IV",  
            chords: "C, G, Am, F", 
            text: "Don’t Stop Believin’ in C Major", 
            category: "Pop Rock",
            image: "images/pop-rock.jpg"
        },
        { 
            title: "Blues Rock",
            progression: "I · IV · I · V",  
            chords: "E, A, E, B", 
            text: "Johnny B. Good in E Major", 
            category: "Blues Rock",
            image: "images/rock-classic.jpg"
        },
        { 
            title: "Rock Ballad",
            progression: "vi · IV · I · V",  
            chords: "Em, C, G, D", 
            text: "Get Emotional in G Major", 
            category: "Rock",
            image: "images/rock-ballad.jpg"
        }
    ];

    const grid = document.querySelector(".suggestions-grid");

    function renderSuggestions(filter = null) {
        grid.innerHTML = ""; // Clear grid
        const filteredSuggestions = filter 
            ? suggestions.filter(s => s.category === filter) 
            : suggestions;

        filteredSuggestions.forEach(({ title, progression, chords, text, category, image }) => {
            const card = document.createElement("div");
            card.classList.add("suggestion-card");
            card.setAttribute("data-chords", chords);

            // Add image container
            card.innerHTML = `
                <div class="suggestion-bg" style="background-image: url(${image});"></div>
                <div class="suggestion-overlay"></div>
                <div class="suggestion-card-category">${category}</div>
                <div class="suggestion-content">
                    <h3 class="suggestion-card-title">${title}</h3>
                    <p class="suggestion-card-progression">${progression}</p>
                    <p class="suggestion-card-chords">${chords}</p>
                    <p class="suggestion-card-description">${text}</p>
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

    // Initial rendering of suggestion cards
    renderSuggestions();
});
