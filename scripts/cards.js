const dataTargets = document.querySelectorAll("div[data-target]");

for (let element of dataTargets) {
    element.addEventListener('click', () => {
        const current = document.querySelector(".is-active");
        current.classList.remove("is-active");
        const sectionId = element.dataset.target;
        const targetSection = document.getElementById(sectionId);
        targetSection.classList.add('is-active');
    })
}