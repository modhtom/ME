class UIController {
    constructor() {
        this.elements = {
            surahSelect: document.getElementById('surah'),
            editionSelect: document.getElementById('edition'),
            verseContainer: document.getElementById('verse-container'),
            playButton: document.getElementById('play-button'),
            pauseButton: document.getElementById('pause-button'),
            resumeButton: document.getElementById('resume-button'),
            stopButton: document.getElementById('stop-button'),
            translationToggle: document.getElementById('translation-toggle'),
            loading: document.getElementById('loading'),
            progressBar: document.getElementById('progress-bar')
        };
    }

    populateSelect(selectElement, items, valueKey, textFormatter) {
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item[valueKey];
            option.textContent = textFormatter(item);
            selectElement.appendChild(option);
        });
    }

    showLoading() {
        this.elements.loading.style.display = 'flex';
    }

    hideLoading() {
        this.elements.loading.style.display = 'none';
    }

    updateProgressBar(progress) {
        this.elements.progressBar.style.width = `${progress}%`;
    }

    updateControlButtons(isPlaying, isPaused) {
        if (isPlaying) {
            this.elements.playButton.style.display = 'none';
            this.elements.stopButton.style.display = 'inline-flex';
            
            if (isPaused) {
                this.elements.pauseButton.style.display = 'none';
                this.elements.resumeButton.style.display = 'inline-flex';
            } else {
                this.elements.pauseButton.style.display = 'inline-flex';
                this.elements.resumeButton.style.display = 'none';
            }
        } else {
            this.elements.playButton.style.display = 'inline-flex';
            this.elements.pauseButton.style.display = 'none';
            this.elements.resumeButton.style.display = 'none';
            this.elements.stopButton.style.display = 'none';
        }
    }

    renderVerses(verses, translations) {
        this.elements.verseContainer.innerHTML = '';
        const elements = [];

        verses.forEach((verse, index) => {
            const verseBox = document.createElement('div');
            verseBox.classList.add('verse-box');

            const verseElement = document.createElement('div');
            verseElement.classList.add('verse');
            verseElement.textContent = `${verse.numberInSurah}. ${verse.text}`;
            verseBox.appendChild(verseElement);

            const translationBox = document.createElement('div');
            translationBox.classList.add('translation-box');
            const translationElement = document.createElement('div');
            translationElement.classList.add('translation');
            translationElement.textContent = `التفسير: ${translations[index].text}`;
            translationBox.appendChild(translationElement);
            verseBox.appendChild(translationBox);

            this.elements.verseContainer.appendChild(verseBox);
            elements.push(verseElement);
        });

        return elements;
    }

    toggleTranslations() {
        const translationBoxes = document.querySelectorAll('.translation-box');
        const isHidden = translationBoxes[0].style.display === 'none' || 
                        translationBoxes[0].style.display === '';
        
        translationBoxes.forEach(box => {
            box.style.display = isHidden ? 'block' : 'none';
        });
    }
}