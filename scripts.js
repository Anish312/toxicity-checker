window.onload = () => {
    const threshold = 0.9;
    const loader = document.getElementById("loader");
    const checkButton = document.getElementById("check-button");
    const inputField = document.getElementById("text-input");
    const resultsDiv = document.querySelector(".results");

    // Load the model when the window loads
    toxicity.load(threshold).then(model => {
        // Button click event to analyze the input text
        checkButton.addEventListener("click", () => {
            const sentence = inputField.value.trim();

            if (sentence) {
                resultsDiv.innerHTML = ""; // Clear previous results
                loader.style.display = "block"; // Show the loader

                model.classify([sentence]).then(predictions => {
                    loader.style.display = "none"; // Hide the loader once done

                    // Display the results
                    predictions.forEach(prediction => {
                        const resultParagraph = document.createElement("p");
                        const isToxic = prediction.results[0].match;     

                        resultParagraph.textContent = `${prediction.label}: ${isToxic ? "Toxic" : "Non-toxic"}`;
                        resultParagraph.classList.add(isToxic ? "toxic" : "non-toxic");
                        resultsDiv.appendChild(resultParagraph);
                    });
                }).catch(error => {
                    loader.style.display = "none"; // Hide loader in case of error
                    console.error("Error analyzing text:", error);
                });
            }
        });
    });
};

