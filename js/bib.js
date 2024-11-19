function copyBibtex() {
    const bibtexContent = document.getElementById("bibtexText").textContent;
    navigator.clipboard.writeText(bibtexContent).then(() => {
        const button = document.querySelector(".copy-button");
        const icon = button.querySelector("img");

        // Change the icon to the green checkmark
        icon.src = "images/checkmark.svg";
        icon.classList.add("success");

        // Reset to original icon after 2 seconds
        setTimeout(() => {
            icon.src = "images/copy-icon.svg";
            icon.classList.remove("success");
        }, 2000);
    }).catch(err => {
        console.error("Failed to copy text: " + err);
    });
}