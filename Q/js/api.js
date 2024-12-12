const API = {
    BASE_URL: 'https://api.alquran.cloud/v1',

    async getSurahs() {
        const response = await fetch(`${this.BASE_URL}/surah`);
        const data = await response.json();
        return data.data;
    },

    async getEditions() {
        const response = await fetch(`${this.BASE_URL}/edition?format=audio&language=ar`);
        const data = await response.json();
        return data.data;
    },

    async getSurahWithTranslation(surahNumber, edition) {
        const response = await fetch(
            `${this.BASE_URL}/surah/${surahNumber}/editions/${edition},ar.muyassar`
        );
        const data = await response.json();
        return data.data;
    }
};