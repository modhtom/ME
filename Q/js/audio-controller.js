class AudioController {
    constructor() {
        this.audioQueue = [];
        this.currentVerseIndex = 0;
        this.isPaused = false;
        this.currentAudio = null;
    }

    stopCurrentAudio() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
    }

    setAudioQueue(verses, elements) {
        this.audioQueue = verses.map((verse, index) => ({
            audio: new Audio(verse.audio),
            element: elements[index]
        }));
    }

    playNextVerse(onProgress, onComplete) {
        if (this.currentVerseIndex < this.audioQueue.length && !this.isPaused) {
            const verseData = this.audioQueue[this.currentVerseIndex];
            const { audio, element } = verseData;

            document.querySelectorAll('.verse').forEach(verse => 
                verse.classList.remove('highlight')
            );
            element.classList.add('highlight');
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            this.currentAudio = audio;
            this.currentAudio.play();

            this.currentAudio.onended = () => {
                this.currentVerseIndex++;
                onProgress(this.currentVerseIndex / this.audioQueue.length * 100);
                this.playNextVerse(onProgress, onComplete);
            };
        } else if (this.currentVerseIndex >= this.audioQueue.length) {
            onComplete();
        }
    }

    playVerseAt(index, onProgress) {
        this.stopCurrentAudio();
        this.currentVerseIndex = index;
        this.isPaused = false;
        onProgress(this.currentVerseIndex / this.audioQueue.length * 100);
        this.playNextVerse(onProgress);
    }

    pause() {
        this.isPaused = true;
        if (this.currentAudio) {
            this.currentAudio.pause();
        }
    }

    resume() {
        this.isPaused = false;
        if (this.currentAudio) {
            this.currentAudio.play();
        }
    }

    reset() {
        this.stopCurrentAudio();
        this.currentVerseIndex = 0;
        this.isPaused = false;
    }
}