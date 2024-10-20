document.addEventListener('DOMContentLoaded', function () {
    const sceneEl = document.querySelector('a-scene');
    const introScreen = document.querySelector('.intro-screen');
    const loadingState = document.querySelector('.loading__state');
    const startButton = document.querySelector('#start-button');
    const ambient = document.querySelector('#entity_ambient');
    let voice = document.getElementById('voice_sound');
    const imageTarget = document.querySelector('#image_target');

    /*sceneEl.addEventListener("arReady", (event) => {
        loadingState.classList.add('hidden');
        startButton.classList.remove('hidden');
    });*/

    function start() {
        introScreen.classList.add('fadeout');
        ambient.components.sound.playSound();
        initVoiceAudio();
    }

    // imageTarget.addEventListener("targetFound", event => playVoice());
    // imageTarget.addEventListener("targetLost", event => stopVoice());

    startButton.addEventListener('click', start);

    /**
     * Voice audio logic
     */
    let audioContext, voiceBuffer, voiceSource, voiceGain;

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
        voiceSource = playAudio(voiceBuffer, voiceGain, false);
        voiceGain.gain.setValueAtTime(0.1, audioContext.currentTime);
    }


    const startVoiceButton = document.querySelector('#start-voice-button');
    startVoiceButton.addEventListener('click', async () => {
        await initAudio();
        startVoiceAudio();
    });










    function initVoiceAudio() {
        voice.volume = 0.0001;
        voice.play();
    }

    function playVoice() {
        voice.currentTime = 0;
        voice.volume = 1;
        setTimeout(() => {
            stopVoice();
        }, 3600);
    }

    function stopVoice() {
        // fadeOutSound(voice);
        voice.volume = 0.0001;
    }

})
