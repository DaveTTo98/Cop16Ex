function fadeInSound(audioElement, duration = 1000) {
    let volume = 0;
    const startTime = performance.now();

    function fade() {
        // Calculate the elapsed time
        const elapsed = performance.now() - startTime;
        // Calculate how far along we are (a value between 0 and 1)
        const progress = elapsed / duration;

        // Set volume based on the progress (clamp to 1)
        audioElement.volume = Math.min(progress, 1).toFixed(2);

        // Continue the fade until volume reaches 1
        if (progress < 1) {
            requestAnimationFrame(fade);
        }
    }

    // Start the fade effect
    fade();
}

function fadeOutSound(audioElement, duration = 2000) {
    const startVolume = audioElement.volume;
    const startTime = performance.now();

    function fade() {
        // Calculate the elapsed time
        const elapsed = performance.now() - startTime;
        // Calculate how far along we are (a value between 0 and 1)
        const progress = elapsed / duration;

        // Set volume based on reverse progress (clamp to 0)
        audioElement.volume = Math.max(startVolume - progress, 0).toFixed(2);

        // Continue the fade until volume reaches 0
        if (progress < 1 && audioElement.volume > 0) {
            requestAnimationFrame(fade);
        } else {
            audioElement.pause(); // Optionally stop audio when fade out is complete
        }
    }

    // Start the fade effect
    fade();
}
