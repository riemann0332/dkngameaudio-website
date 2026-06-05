const videoWrappers = document.querySelectorAll(".entry-video-wrapper");

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            const iframe = entry.target.querySelector('iframe');
            if (iframe) {
                iframe.contentWindow.postMessage(
                    '{"event":"command","func":"pauseVideo","args":""}',
                    '*'
                );
            }
        }
    })
}, { threshold: 0.2 });

videoWrappers.forEach(wrapper => videoObserver.observe(wrapper));