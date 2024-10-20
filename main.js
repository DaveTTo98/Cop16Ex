document.addEventListener('DOMContentLoaded', function () {
    const sceneEl = document.querySelector('a-scene');
    const introScreen = document.querySelector('.intro-screen');
    const loadingState = document.querySelector('.loading__state');
    const startButton = document.querySelector('#start-button');
    const ambient = document.querySelector('#entity_ambient');
    const voice = document.querySelector('#entity_voice');
    const imageTarget = document.querySelector('#image_target');

    sceneEl.addEventListener("arReady", (event) => {
        loadingState.classList.add('hidden');
        startButton.classList.remove('hidden');
    });

    /*imageTarget.addEventListener("targetFound", event => {
        voice.components.sound.playSound();
    });*/

    function start() {
        introScreen.classList.add('fadeout');
        ambient.components.sound.playSound();
        // voice.components.sound.playSound();
    }

    startButton.addEventListener('click', start);
})