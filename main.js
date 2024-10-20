document.addEventListener('DOMContentLoaded', function () {
    const sceneEl = document.querySelector('a-scene');
    const introScreen = document.querySelector('.intro-screen');
    const loadingState = document.querySelector('.loading__state');
    const startButton = document.querySelector('#start-button');
    const ambient = document.querySelector('#entity_ambient');
    const voice = document.getElementById('voice_sound');
    const imageTarget = document.querySelector('#image_target');

    sceneEl.addEventListener("arReady", (event) => {
        loadingState.classList.add('hidden');
        startButton.classList.remove('hidden');
    });

    function start() {
        introScreen.classList.add('fadeout');
        ambient.components.sound.playSound();
        initVoiceAudio();
    }

    function initVoiceAudio() {
        voice.volume = 0;
        voice.play();
    }

    function playVoice() {
        voice.currentTime = 0;
        fadeInSound(voice);
    }

    function stopVoice() {
        fadeOutSound(voice);
    }

    imageTarget.addEventListener("targetFound", event => playVoice());
    imageTarget.addEventListener("targetLost", event => stopVoice());

    startButton.addEventListener('click', start);
})