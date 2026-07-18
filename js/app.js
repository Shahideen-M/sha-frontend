const buttons = document.querySelectorAll("nav button");
const sections = document.querySelectorAll("main section");

buttons.forEach((button) => {
    button.addEventListener("click", () => {

        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const sectionId = button.id.replace("-btn", "");

        showSection(sectionId);
    });
});

function showSection(sectionId) {

    sections.forEach((section) => {

        section.style.display = "none";

        if (section.id === sectionId) {
            section.style.display = "block";
        }

    });

}