// ----- Data & Helper Functions -----

// Note names used for calculation (using sharps only)
const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Standard tuning for 6 strings (from top to bottom: e, B, G, D, A, E)
const tuning = ["E", "B", "G", "D", "A", "E"];

// Scale definitions – Pflege erfolgt ausschließlich über die Intervalle.
// Jede Skala enthält zusätzlich die Eigenschaft "chordTypes", die angibt, für welche
// Akkordqualitäten sie passend ist.
const scales = [
  {
    name: "Major Pentatonic",
    intervals: ["1", "2", "3", "5", "6"],
    semitones: [0, 2, 4, 7, 9],
    chordTypes: ["major"]
  },
  {
    name: "Minor Pentatonic",
    intervals: ["1", "b3", "4", "5", "b7"],
    semitones: [0, 3, 5, 7, 10],
    chordTypes: ["minor", "minor7"]
  },
  {
    name: "Mixolydian",
    intervals: ["1", "2", "3", "4", "5", "6", "b7"],
    semitones: [0, 2, 4, 5, 7, 9, 10],
    chordTypes: ["major", "dominant"]
  },
  {
    name: "Half-Whole Diminished",
    intervals: ["1", "b2", "b3", "3", "b5", "5", "6", "b7"],
    semitones: [0, 1, 3, 4, 6, 7, 9, 10],
    chordTypes: ["diminished", "half-diminished"]
  },
  {
    name: "Locrian ♮2",
    intervals: ["1", "2", "b3", "4", "b5", "b6", "b7"],
    semitones: [0, 2, 3, 5, 6, 8, 10],
    chordTypes: ["half-diminished"]
  },
  {
    name: "Natural Minor (Aeolian)",
    intervals: ["1", "2", "b3", "4", "5", "b6", "b7"],
    semitones: [0, 2, 3, 5, 7, 8, 10],
    chordTypes: ["minor", "minor7"]
  },
  {
    name: "Dorian",
    intervals: ["1", "2", "b3", "4", "5", "6", "b7"],
    semitones: [0, 2, 3, 5, 7, 9, 10],
    chordTypes: ["minor", "minor7"]
  },
  {
    name: "Lydian",
    intervals: ["1", "2", "3", "#4", "5", "6", "7"],
    semitones: [0, 2, 4, 6, 7, 9, 11],
    chordTypes: ["major"]
  },
  {
    name: "Phrygian",
    intervals: ["1", "b2", "b3", "4", "5", "b6", "b7"],
    semitones: [0, 1, 3, 5, 7, 8, 10],
    chordTypes: ["minor"]
  },
  {
    name: "Phrygian Dominant",
    intervals: ["1", "b2", "3", "4", "5", "b6", "b7"],
    semitones: [0, 1, 4, 5, 7, 8, 10],
    chordTypes: ["dominant"]
  },
  {
    name: "Minor Blues",
    intervals: ["1", "b3", "4", "b5", "5", "b7"],
    semitones: [0, 3, 5, 6, 7, 10],
    chordTypes: ["minor", "dominant"]
  },
  {
    name: "Major Blues",
    intervals: ["1", "2", "b3", "3", "5", "6"],
    semitones: [0, 2, 3, 4, 7, 9],
    chordTypes: ["major", "dominant"]
  },
  {
    name: "Ionian (Major)",
    intervals: ["1", "2", "3", "4", "5", "6", "7"],
    semitones: [0, 2, 4, 5, 7, 9, 11],
    chordTypes: ["major", "major7"]
  },
  {
    name: "Aeolian",
    intervals: ["1", "2", "b3", "4", "5", "b6", "b7"],
    semitones: [0, 2, 3, 5, 7, 8, 10],
    chordTypes: ["minor", "minor7"]
  },
  {
    name: "Altered",
    intervals: ["1", "b2", "#2", "3", "b5", "#5", "b7"],
    semitones: [0, 1, 3, 4, 6, 8, 10],
    chordTypes: ["dominant", "altered"]
  },
  {
    name: "Harmonic Minor",
    intervals: ["1", "2", "b3", "4", "5", "b6", "7"],
    semitones: [0, 2, 3, 5, 7, 8, 11],
    chordTypes: ["minor"]
  },
  {
    name: "Melodic Minor",
    intervals: ["1", "2", "b3", "4", "5", "6", "7"],
    semitones: [0, 2, 3, 5, 7, 9, 11],
    chordTypes: ["minor"]
  },
  {
    name: "Lydian Dominant",
    intervals: ["1", "2", "3", "#4", "5", "6", "b7"],
    semitones: [0, 2, 4, 6, 7, 9, 10],
    chordTypes: ["dominant"]
  },
  {
    name: "Bebop Mixolydian",
    intervals: ["1", "2", "3", "4", "5", "6", "b7", "b8", "9"],
    semitones: [0, 2, 4, 5, 7, 9, 10, 11, 14],
    chordTypes: ["dominant"]
  }
];

/**
 * Returns the index of a note (e.g. "C#", "E") in the noteNames array.
 * Comparison is case-insensitive.
 */
function getNoteIndex(note) {
  note = note.trim();
  const normalized = note[0].toUpperCase() + note.slice(1);
  return noteNames.indexOf(normalized);
}

/**
 * Given a root note (e.g. "C") and a scale definition,
 * returns an array of note names that form the scale.
 */
function getScaleNotes(root, scaleDef) {
  const rootIndex = getNoteIndex(root);
  if (rootIndex === -1) return []; // Absicherung gegen ungültige Noten
  return scaleDef.semitones.map(semi => noteNames[(rootIndex + semi) % 12]);
}

/**
 * Parses the chord progression input.
 * Measures are separated by "|" and chords within a measure by commas.
 */
function parseChords(input) {
  const measures = input.split("|");
  const chords = [];
  measures.forEach(measure => {
    const measureChords = measure.split(",")
      .map(chord => chord.trim())
      .filter(chord => chord !== "");
    chords.push(...measureChords);
  });
  return chords;
}







/**
 * Extracts the root note from a chord string.
 */
function extractRoot(chord) {
  const match = chord.match(/^([A-G](#|b)?)/);
  return match ? match[1] : null;
}

/**
 * Determines the chord quality based on the chord string.
 */
function getChordQuality(chord) {
  const chordLower = chord.toLowerCase();

  if (chordLower.includes("m7b5") || chordLower.includes("dim7")) return "half-diminished";
  if (chordLower.includes("dim")) return "diminished";
  if (chordLower.includes("maj7")) return "major7";
  if (chordLower.includes("m7")) return "minor7";
  if (chordLower.includes("7") && (chordLower.includes("b9") || chordLower.includes("#9") || chordLower.includes("b13") || chordLower.includes("#5"))) return "altered";
  if (chordLower.includes("9") && !chordLower.includes("m") && !chordLower.includes("add")) return "dominant9";
  if (chordLower.includes("m") && !chordLower.includes("maj")) return "minor";
  if (chordLower.includes("7")) return "dominant";
  return "major";
}

/**
 * Returns an array of chord tone note names for the given chord root and quality.
 */
function getChordTones(chordRoot, chordQuality) {
  const chordIntervals = {
    "minor": [0, 3, 7],
    "minor7": [0, 3, 7, 10],
    "major": [0, 4, 7],
    "major7": [0, 4, 7, 11],
    "dominant": [0, 4, 7, 10],
    "half-diminished": [0, 3, 6, 10],
    "diminished": [0, 3, 6, 9],
    "dominant9": [0, 4, 7, 10, 2],
    "altered": [0, 4, 7, 10, 1, 3, 6]
  };
  const offsets = chordIntervals[chordQuality] || [0, 4, 7];
  const rootIndex = getNoteIndex(chordRoot);
  return offsets.map(offset => noteNames[(rootIndex + offset) % 12]);
}

/**
 * Scores the compatibility of a scale with a given chord.
 */
function getScaleCompatibilityScore(scaleNotes, chordTones, chordQuality) {
  if (chordTones.every(note => scaleNotes.includes(note))) return 3;
  const essentialTones = chordTones.filter(note => ["1", "3", "5", "7"].includes(note));
  let score = essentialTones.every(note => scaleNotes.includes(note)) ? 2 : 0;

  if (scaleNotes.includes("#4") && chordQuality.includes("major")) score = Math.max(score, 2);
  if ((scaleNotes.includes("b9") || scaleNotes.includes("#9") || scaleNotes.includes("b5")) && chordQuality.includes("dominant")) score = Math.max(score, 2);
  if ((scaleNotes.includes("b3") || scaleNotes.includes("b5")) && chordQuality.includes("dominant")) score = Math.max(score, 1);

  // **NEU: Spezielle Blues- und modale Skalen-Ausnahmen**
  if (chordQuality === "dominant" && scaleNotes.includes("b3")) score = Math.max(score, 2); // Dominant kann Minor Pentatonic akzeptieren
  if (chordQuality === "minor7" && (scaleNotes.includes("b3") || scaleNotes.includes("b7"))) score = Math.max(score, 3); // Minor7 bevorzugt Dorian, Minor Pentatonic, Blues
  
  return score;
}

/**
 * Filters and sorts scales based on compatibility score.
 */
function getCompatibleScales(chord) {
  console.log("getCompatibleScales wurde aufgerufen!"); // Testausgabe zur Bestätigung
  const root = extractRoot(chord);
  const quality = getChordQuality(chord);
  const chordTones = getChordTones(root, quality);

  // Ausgabe von root, quality und chordTones
  console.log("Root: ", root);
  console.log("Chord Quality: ", quality);
  console.log("Chord Tones: ", chordTones);

  let filteredScales = scales.filter(scale => getScaleCompatibilityScore(getScaleNotes(root, scale), chordTones, quality) > 0);

  filteredScales.sort((a, b) => {
    const scoreA = getScaleCompatibilityScore(getScaleNotes(root, a), getChordTones(root, chordQuality), chordQuality);
    const scoreB = getScaleCompatibilityScore(getScaleNotes(root, b), getChordTones(root, chordQuality), chordQuality);
    return scoreB - scoreA;  // Höherer Score bekommt eine höhere Priorität
  });

  return filteredScales;
}











/**
 * Creates a fretboard diagram as a DOM element.
 * 
 * @param {string} displayType - Either "notes" or "intervals".
 * @param {string} chordRoot - The root note of the chord (e.g. "C").
 * @param {object} scaleDef - The scale definition object.
 * @param {string} chordQuality - The chord quality (optional) for highlighting chord tones.
 * @returns {HTMLElement} The fretboard element.
 */
function createFretboard(displayType, chordRoot, scaleDef, chordQuality) {
  const fretboard = document.createElement("div");
  fretboard.classList.add("fretboard");

  // Pre-calculate scale notes (for "notes" display)
  const scaleNotes = getScaleNotes(chordRoot, scaleDef);
  const scaleNotesSet = new Set(scaleNotes);  

  // Falls chordQuality angegeben ist, berechne die Chord Tones
  let chordTonesSet = new Set();
  if (chordQuality) {
    const chordTones = getChordTones(chordRoot, chordQuality);
    chordTonesSet = new Set(chordTones);
  }

  // Das Grid: 7 Zeilen x 14 Spalten.
  // Zeile 0: Header-Zeile (Spalte 0 leer; Spalten 1–13 zeigen Fret-Nummern 0 bis 12)
  // Zeilen 1–6: Jede Zeile repräsentiert eine Saite.
  //   - Spalte 0: Open-String (Tuning-Note)
  //   - Spalten 1–13: Entsprechen den Bünden.
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 14; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (row === 0) {
        // Header-Zeile: Fret-Nummern.
        cell.classList.add("header");
        cell.textContent = col === 0 ? "" : col - 1;
      } else {
        if (col === 0) {
          // Erste Spalte: Tuning-Note.
          cell.classList.add("header");
          cell.textContent = tuning[row - 1];
        } else {
          const fretNumber = col - 1;
          const openNote = tuning[row - 1];
          const openIndex = getNoteIndex(openNote);
          const cellNote = noteNames[(openIndex + fretNumber) % 12];

          if (displayType === "notes") {
            if (scaleNotesSet.has(cellNote)) {
              cell.textContent = cellNote;
              cell.classList.add("highlight");
              // Zusätzliche Hervorhebung, wenn der Ton auch ein Chord Tone ist.
              if (chordTonesSet.has(cellNote)) {
                cell.classList.add("chord-tone");
              }
            }
          } else if (displayType === "intervals") {
            const chordRootIndex = getNoteIndex(chordRoot);
            const cellNoteIndex = getNoteIndex(cellNote);
            const diff = (cellNoteIndex - chordRootIndex + 12) % 12;
            const idx = scaleDef.semitones.indexOf(diff);
            if (idx !== -1) {
              cell.textContent = scaleDef.intervals[idx];
              cell.classList.add("highlight");
              // Für Intervalle könntest du optional auch Chord-Tones hervorheben.
            }
          }
        }
      }
      fretboard.appendChild(cell);
    }
  }
  return fretboard;
}

// ----- Main Application Logic -----

function processInput() {
  const input = document.getElementById("chord-input").value;
  const chords = parseChords(input);
  const resultsSection = document.getElementById("results-section");
  resultsSection.innerHTML = ""; // Alte Ergebnisse löschen

  chords.forEach(chordStr => {
    const root = extractRoot(chordStr);
    if (!root) return; // Überspringen, wenn kein gültiger Root gefunden wurde

    const chordQuality = getChordQuality(chordStr);
    
// Filtere Skalen basierend auf der Akkordqualität (über den "chordTypes"-Array)
let filteredScales = scales.filter(scaleDef => {
  // Wenn Akkordqualität "minor7", nur passende Skalen hinzufügen
  if (chordQuality === "minor7") {
      return (scaleDef.chordTypes.includes("minor7") || scaleDef.chordTypes.includes("minor")) &&
             scaleDef.name !== "Harmonic Minor" &&
             scaleDef.name !== "Melodic Minor";
  } 
  
  // Erweiterung für Akkorde mit 9, 11, 13 sowie add9, add11, add13
  if (["9", "add9", "dominant9"].includes(chordQuality)) {
    return scaleDef.chordTypes.includes("dominant") || scaleDef.chordTypes.includes("major");
}
if (["11", "add11", "dominant11"].includes(chordQuality)) {
    return scaleDef.chordTypes.includes("dominant") || scaleDef.chordTypes.includes("major") || scaleDef.chordTypes.includes("lydian");
}
if (["13", "add13", "dominant13"].includes(chordQuality)) {
    return scaleDef.chordTypes.includes("dominant") || scaleDef.chordTypes.includes("major") || scaleDef.chordTypes.includes("mixolydian");
}

// Für alle anderen Akkordqualitäten
return scaleDef.chordTypes.includes(chordQuality);
});


// Filterung der Skalen basierend auf spezifischen Akkordqualitäten
filteredScales = filteredScales.filter(scaleDef => {
  // Spezielle Skalen ausschließen, die für diesen Akkord nicht passen (z.B. Harmonic Minor)
  if (chordQuality === "dominant" && scaleDef.name === "Harmonic Minor") {
    return false; // Harmonic Minor nicht für Dominant-Akkorde verwenden
  }
  return true;  // Alle anderen Skalen zulassen
});

filteredScales = [...new Set(filteredScales)];


// Zusätzliche Skalen basierend auf speziellen Bedingungen hinzufügen
if (chordQuality === "dominant") {
  const majorPentatonic = scales.find(scaleDef => scaleDef.name === "Major Pentatonic");
  if (majorPentatonic && !filteredScales.includes(majorPentatonic)) {
    filteredScales.push(majorPentatonic);
  }
}

    // Erstelle eine Card für diesen Akkord.
    const card = document.createElement("div");
    card.classList.add("card");

    // Erstelle den Titel für den Akkord (nur den Akkordnamen)
    const cardTitle = document.createElement("h2");
    cardTitle.textContent = `${chordStr}`;
    card.appendChild(cardTitle);



// Erstelle den Bereich für Root, Quality und Intervals
const rootQualityContainer = document.createElement("div");
rootQualityContainer.classList.add("root-quality");
rootQualityContainer.textContent = `Root: ${root}, Quality: ${chordQuality}`;

// Erstelle den Bereich für die Intervalle
const intervalContainer = document.createElement("div");
intervalContainer.classList.add("intervals");

// Hole die Akkordtöne
const chordTones = getChordTones(root, chordQuality); // Akkordtöne

// Bestimme die Intervalle der Akkordtöne
const intervals = [];
const intervalNames = {
  0: "Root", 1: "b2", 2: "2", 3: "b3", 4: "3", 5: "4", 6: "b5", 7: "5", 8: "b6", 9: "6", 10: "b7", 11: "7"
};

// Bestimme die Intervalle relativ zum Root
const chordRootIndex = getNoteIndex(root);
chordTones.forEach(tone => {
  const toneIndex = getNoteIndex(tone);
  const interval = (toneIndex - chordRootIndex + 12) % 12;
  intervals.push(intervalNames[interval]);
});

// Zeige die Akkordtöne an
let chordTonesText = "Chord Tones: ";
chordTones.forEach((note) => {
  chordTonesText += `${note} `;
});
const chordTonesContainer = document.createElement("div");
chordTonesContainer.classList.add("chord-tones");
chordTonesContainer.textContent = chordTonesText;
intervalContainer.appendChild(chordTonesContainer);

// Zeige die Intervalle an
let intervalsText = "Intervals: ";
intervals.forEach((interval) => {
  intervalsText += `${interval} `;
});
const intervalsContainer = document.createElement("div");
intervalsContainer.classList.add("intervals");
intervalsContainer.textContent = intervalsText;
intervalContainer.appendChild(intervalsContainer);

// Füge den Bereich zur Karte hinzu
card.appendChild(rootQualityContainer);  // Füge Root und Quality hinzu
card.appendChild(intervalContainer);  // Füge nur Intervals hinzu



filteredScales.forEach(scaleDef => {
  const scaleHeader = document.createElement("h3");
  scaleHeader.textContent = scaleDef.name;
  card.appendChild(scaleHeader);

  const boardsContainer = document.createElement("div");

  // Skalen-Noten und Intervall-Informationen sammeln
  const scaleNotesText = getScaleNotes(root, scaleDef).join(" ");
  const intervalsText = scaleDef.intervals.join(" ");

  // Fretboard mit Skalen-Noten (inklusive Hervorhebung der Chord Tones)
  const notesLabel = document.createElement("p");
  notesLabel.textContent = `Scale Notes: ${scaleNotesText}`;
  boardsContainer.appendChild(notesLabel);
  const notesBoard = createFretboard("notes", root, scaleDef, chordQuality);
  boardsContainer.appendChild(notesBoard);

  // Fretboard mit Intervall-Bezeichnungen
  const intervalsLabel = document.createElement("p");
  intervalsLabel.textContent = `Intervals: ${intervalsText}`;
  intervalsLabel.classList.add("interval-label");  // Klasse hinzufügen
  boardsContainer.appendChild(intervalsLabel);
  const intervalsBoard = createFretboard("intervals", root, scaleDef, chordQuality);
  boardsContainer.appendChild(intervalsBoard);

  card.appendChild(boardsContainer);
});




    resultsSection.appendChild(card);
  });
}


document.getElementById("submit-button").addEventListener("click", processInput);
document.getElementById("chord-input").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    processInput();
  }
});
