document.addEventListener('DOMContentLoaded', function() {
    const ui = new UIController();
    const audio = new AudioController();
    let isPlaying = false;

    async function initializeApp() {
        try {
            const [surahs, editions] = await Promise.all([
                API.getSurahs(),
                API.getEditions()
            ]);

            ui.populateSelect(
                ui.elements.surahSelect,
                surahs,
                'number',
                surah => `${surah.number}. ${surah.englishName} (${surah.name})`
            );

            ui.populateSelect(
                ui.elements.editionSelect,
                editions,
                'identifier',
                edition => `${edition.englishName} (${edition.name})`
            );
        } catch (error) {
            console.error('Error initializing app:', error);
            alert('حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.');
        }
    }

    async function handlePlay() {
        const surahNumber = ui.elements.surahSelect.value;
        const edition = ui.elements.editionSelect.value;

        if (!surahNumber || !edition) {
            alert('الرجاء اختيار السورة والقارئ');
            return;
        }

        try {
            ui.showLoading();
            audio.reset();
            const data = await API.getSurahWithTranslation(surahNumber, edition);
            const elements = ui.renderVerses(data[0].ayahs, data[1].ayahs);
            
            audio.setAudioQueue(data[0].ayahs, elements);
            isPlaying = true;
            ui.updateControlButtons(isPlaying, audio.isPaused);
            audio.playNextVerse(
                progress => ui.updateProgressBar(progress),
                () => {
                    isPlaying = false;
                    ui.updateControlButtons(isPlaying, false);
                }
            );
        } catch (error) {
            console.error('Error playing surah:', error);
            alert('حدث خطأ أثناء تشغيل السورة. يرجى المحاولة مرة أخرى.');
        } finally {
            ui.hideLoading();
        }
    }

    ui.elements.playButton.addEventListener('click', handlePlay);

    ui.elements.pauseButton.addEventListener('click', () => {
        audio.pause();
        ui.updateControlButtons(isPlaying, true);
    });

    ui.elements.resumeButton.addEventListener('click', () => {
        audio.resume();
        ui.updateControlButtons(isPlaying, false);
    });

    ui.elements.stopButton.addEventListener('click', () => {
        audio.reset();
        isPlaying = false;
        ui.updateControlButtons(isPlaying, false);
        ui.updateProgressBar(0);
    });

    ui.elements.translationToggle.addEventListener('click', () => {
        ui.toggleTranslations();
    });

    ui.elements.verseContainer.addEventListener('click', (e) => {
        const verseElement = e.target.closest('.verse');
        if (verseElement) {
            const verseElements = Array.from(document.querySelectorAll('.verse'));
            const index = verseElements.indexOf(verseElement);
            if (index !== -1) {
                isPlaying = true;
                ui.updateControlButtons(isPlaying, false);
                audio.playVerseAt(
                    index,
                    progress => ui.updateProgressBar(progress)
                );
            }
        }
    });

    initializeApp();
});