document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("dark-light-toggle");
    const root = document.documentElement; // `:root` ist `document.documentElement`

    console.log("Dark Mode Script loaded"); // Debugging

    // Prüfen, ob Dark Mode im Local Storage gespeichert ist
    if (localStorage.getItem("dark-mode") === "enabled") {
      root.classList.add("dark-mode");
      console.log("Dark mode is enabled from localStorage");
    }

    toggleButton.addEventListener("click", () => {
      console.log("Button clicked"); // Debugging

      root.classList.toggle("dark-mode");

      // Dark Mode Zustand speichern
      if (root.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
        console.log("Dark mode enabled");
      } else {
        localStorage.setItem("dark-mode", "disabled");
        console.log("Dark mode disabled");
      }
    });
});
  