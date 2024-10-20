document.addEventListener('DOMContentLoaded', function () {
    const sceneEl = document.querySelector('a-scene');
    const introScreen = document.querySelector('.intro-screen');
    const loadingState = document.querySelector('.loading__state');
    const startButton = document.querySelector('#start-button');
    const ambient = document.querySelector('#entity_ambient');
    const imageTarget = document.querySelector('#image_target');

    sceneEl.addEventListener("arReady", (event) => {
        loadingState.classList.add('hidden');
        startButton.classList.remove('hidden');
    });

    function start() {
        introScreen.classList.add('fadeout');
        ambient.components.sound.playSound();
    }

    // imageTarget.addEventListener("targetFound", event => initVoiceAudio());
    // imageTarget.addEventListener("targetLost", event => stopVoice());

    startButton.addEventListener('click', start);

    /**
     * Voice audio logic
     */
    let audioContext, voiceBuffer, voiceSource, voiceGain, voiceLoaded = false, voiceLoading = false;

    async function loadAudio(url) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
    }

    async function initAudio() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        voiceBuffer = await loadAudio('https://davetto98.github.io/Cop16Ex/assets/audio/voice.mp3');
        voiceGain = audioContext.createGain();
    }

    function playAudio(buffer, gainNode, loop = true) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = loop;
        source.connect(gainNode).connect(audioContext.destination);
        source.start(0);
        return source;
    }

    function startVoiceAudio() {
        voiceGain.gain.setValueAtTime(0.5, audioContext.currentTime);
        voiceSource = playAudio(voiceBuffer, voiceGain, false);
    }

    function playVoice() {
        voiceGain.gain.setValueAtTime(0.7, audioContext.currentTime);
        setTimeout(() => {
            stopVoice();
        }, 3600);
    }

    function stopVoice() {
        voiceGain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    }

    async function initVoiceAudio() {
        // if (voiceLoaded || voiceLoading) return;
        voiceLoading = true;
        await initAudio();
        startVoiceAudio();
        voiceLoaded = true;
    }

})
