const dataTargets = document.querySelectorAll("div[data-target]");

for (let element of dataTargets) {
    element.addEventListener('click', () => {
        const rect = element.getBoundingClientRect();
        if (rect.left < 0 || rect.right > window.innerWidth) {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            return;
        }

        element.classList.add('card-selected');
        const current = document.querySelector(".is-active");
        const sectionId = element.dataset.target;
        const targetSection = document.getElementById(sectionId);
        setTimeout(
            () => {
                current.classList.remove("is-active");
                targetSection.classList.add('is-active')
            }, 350,
        );
        
    })
}