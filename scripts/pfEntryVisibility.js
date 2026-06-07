const rowsAndToolsStrip = document.querySelectorAll(".portfolio-entry-row, .portfolio-entry-row-squares, .tools-strip-desktop, .tools-strip-mobile");

const rowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
        } else {
            entry.target.classList.remove("is-visible")
        }
    })
}, { threshold: 0.75 } )

rowsAndToolsStrip.forEach(row => rowObserver.observe(row));