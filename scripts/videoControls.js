const videoWrappers = document.querySelectorAll(".entry-video-wrapper");

// When a video starts playing, pause all others
window.addEventListener('message', (event) => {
    if (event.origin !== 'https://www.youtube.com') return;
    console.log(event.data);
    let data;
    try {
        data = JSON.parse(event.data);
    } catch (e) {
        return;
    }
    if (data.event === 'onStateChange' && data.info === 1) {
        for (let wrapper of videoWrappers) {
            const iframe = wrapper.querySelector('iframe');
            if (iframe.contentWindow !== event.source) {
                iframe.contentWindow.postMessage(
                    '{"event":"command","func":"pauseVideo","args":""}',
                    '*'
                )
            }
        }
    }
})

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

// Subscribe each iframe to broadcast state changes to this window
for (let wrapper of videoWrappers) {
    const iframe = wrapper.querySelector("iframe");
    iframe.addEventListener('load', () => {
        console.log('load fired:', iframe.src);
        iframe.contentWindow.postMessage(
            '{"event":"command","func":"addEventListener","args":["onStateChange"]}',
            '*'
        );

    })
}