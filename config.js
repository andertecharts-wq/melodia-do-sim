// Configurações do Site - Melodia do Sim
const CONFIG = {
    // URL do Painel Administrativo (Render.com)
    adminPanelUrl: 'https://melodia-do-sim-backend.onrender.com/login.html',

    // URL da API Backend
    apiUrl: 'https://melodia-do-sim-backend.onrender.com/api',

    // Links de Redes Sociais
    socialMedia: {
        instagram: 'https://instagram.com/melodiadosim.oficial',
        facebook: 'https://facebook.com/melodiadosim',
        youtube: 'https://youtube.com/@MelodiadoSim.oficial'
    },

    // Informações de Contato
    contact: {
        whatsapp: '5543991916007',
        email: 'melodiadosim.oficial@gmail.com',
        location: 'Tamarana, PR'
    }
};

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.MELODIA_CONFIG = CONFIG;
}
