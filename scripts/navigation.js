// Navigate from Character Select screen to one of the portfolios
const dataTargets = document.querySelectorAll("div[data-target]");

for (let element of dataTargets) {
    element.addEventListener('click', () => {
        // for mobile: scrolls the off-screen card in view if tapped
        const rect = element.getBoundingClientRect();
        if (rect.left < 0 || rect.right > window.innerWidth) {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            return;
        }
        // forward navigation logic
        element.classList.add('card-selected');
        const current = document.querySelector(".is-active");
        const sectionId = element.dataset.target;
        history.replaceState(null, '', '#' + sectionId);
        const targetSection = document.getElementById(sectionId);
        setTimeout(
            () => {
                current.classList.remove("is-active");
                targetSection.classList.add('is-active')
            }, 350,
        );
        
    })
}

// Navigate from one of the portfolios back to the Character Select screen
const backTargets = document.querySelectorAll("[data-target='character-select']");

for (let element of backTargets) {
    element.addEventListener('click', () => {
        const current = document.querySelector(".is-active");
        const targetSection = document.getElementById("character-select");
        document.querySelector(".card-selected")?.classList.remove("card-selected");
        history.replaceState(null, '', '#character-select');
        current.classList.remove("is-active");
        targetSection.classList.add("is-active");
    })
}

// reloads the current page on refresh instead of going back to character select
const hash = window.location.hash.slice(1);
if (hash) {
    const target = document.getElementById(hash);
    if (target) {
        document.querySelector('.is-active').classList.remove('is-active');
        target.classList.add('is-active');
    }
}