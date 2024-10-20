document.addEventListener('DOMContentLoaded', function () {
    const sceneEl = document.querySelector('a-scene');
    const introScreen = document.querySelector('.intro-screen');
    const loadingState = document.querySelector('.loading__state');
    const startButton = document.querySelector('#start-button');
    const imageTarget = document.querySelector('#image_target');

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let voiceBuffer;
    let voiceSource;
    let voiceGain;

    async function loadAudio(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
    }

    async function initAudio() {
        voiceBuffer = await loadAudio('./assets/audio/voice.mp3');
    }

    function playAudio(buffer, gainNode, loop = true) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = loop;
        source.connect(gainNode).connect(audioContext.destination);
        source.start(0);
        return source;
    }

    function fadeIn(gainNode, duration) {
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + duration);
    }

    function fadeOut(gainNode, duration) {
        gainNode.gain.setValueAtTime(1, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
    }

    function start() {
        introScreen.classList.add('fadeout');
        initVoiceAudio();
    }

    function initVoiceAudio() {
        voiceGain = audioContext.createGain();
        voiceSource = playAudio(voiceBuffer, voiceGain);
        voiceGain.gain.setValueAtTime(0, audioContext.currentTime);
    }

    function playVoice() {
        voiceSource = playAudio(voiceBuffer, voiceGain);
        fadeIn(voiceGain, 0.5);
        setTimeout(() => {
            stopVoice();
        }, 3600);
    }

    function stopVoice() {
        fadeOut(voiceGain, 0.5);
    }

    sceneEl.addEventListener("arReady", (event) => {
        loadingState.classList.add('hidden');
        startButton.classList.remove('hidden');
    });

    imageTarget.addEventListener("targetFound", event => playVoice());
    imageTarget.addEventListener("targetLost", event => stopVoice());

    startButton.addEventListener('click', start);

    initAudio();
});