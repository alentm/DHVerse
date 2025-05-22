document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("textContainer");
    container.textContent = "Loading quote...";

    fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const quote = data?.data?.content || "No quote found.";
            animateQuote(quote);
        })
        .catch(error => {
            console.error("Error fetching quote:", error);
            animateQuote("Failed to load quote.");
        });
});

function animateQuote(text) {
    const container = document.getElementById("textContainer");
    container.textContent = ""; // clear existing content

    const customColors = [
        '#FF8080', '#FFCF96', '#39A7FF', '#FFF78A',
        '#FFC7EA', '#88D66C', '#D8B4F8', '#FAF2D3'
    ];

    const words = text.split(' ');
    let letterIndex = 0;

    words.forEach((word, wordIndex) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "word";

        for (let i = 0; i < word.length; i++) {
            const letterSpan = document.createElement("span");
            letterSpan.className = "letter";
            letterSpan.textContent = word[i];
            const randomColor = customColors[Math.floor(Math.random() * customColors.length)];
            letterSpan.style.setProperty('--randomColor', randomColor);
            const delay = letterIndex * 0.1;
            letterSpan.style.animation = `letterAnimation 1s forwards ${delay}s`;
            wordSpan.appendChild(letterSpan);
            letterIndex++;
        }

        container.appendChild(wordSpan);

        if (wordIndex < words.length - 1) {
            container.appendChild(document.createTextNode(" "));
            letterIndex++;
        }
    });
}
