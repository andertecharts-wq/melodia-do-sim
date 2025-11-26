// Enhancements para Melodia do Sim
// Este arquivo adiciona funcionalidades extras ao site

document.addEventListener('DOMContentLoaded', function () {
    // 1. Atualizar links de redes sociais
    updateSocialMediaLinks();

    // 2. Adicionar botão de admin no rodapé
    addAdminButton();

    // 3. Conectar formulário ao backend (opcional - mantém WhatsApp como principal)
    // setupBackendIntegration();
});

// Atualizar links de redes sociais com URLs reais
function updateSocialMediaLinks() {
    const config = window.MELODIA_CONFIG || {
        socialMedia: {
            instagram: 'https://instagram.com/melodiadosim',
            facebook: 'https://facebook.com/melodiadosim',
            youtube: 'https://youtube.com/@melodiadosim'
        }
    };

    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
        if (!icon) return;

        if (icon.classList.contains('fa-instagram')) {
            link.href = config.socialMedia.instagram;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        } else if (icon.classList.contains('fa-facebook')) {
            link.href = config.socialMedia.facebook;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        } else if (icon.classList.contains('fa-youtube')) {
            link.href = config.socialMedia.youtube;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });

    console.log('✅ Links de redes sociais atualizados');
}

// Adicionar botão discreto de admin no rodapé
function addAdminButton() {
    const config = window.MELODIA_CONFIG || {
        adminPanelUrl: 'https://melodia-do-sim-backend.onrender.com/login.html'
    };

    const footer = document.querySelector('footer .container');
    if (!footer) return;

    // Criar link discreto para admin
    const adminLink = document.createElement('a');
    adminLink.href = config.adminPanelUrl;
    adminLink.target = '_blank';
    adminLink.rel = 'noopener noreferrer';
    adminLink.style.cssText = `
        display: inline-block;
        margin-top: 10px;
        font-size: 0.75rem;
        color: #666;
        opacity: 0.5;
        transition: opacity 0.3s ease;
    `;
    adminLink.innerHTML = '<i class="fas fa-lock"></i> Painel Admin';

    adminLink.addEventListener('mouseenter', function () {
        this.style.opacity = '1';
    });

    adminLink.addEventListener('mouseleave', function () {
        this.style.opacity = '0.5';
    });

    footer.appendChild(adminLink);
    console.log('✅ Botão de admin adicionado ao rodapé');
}

// Integração com backend (opcional - salva dados no banco além do WhatsApp)
function setupBackendIntegration() {
    const config = window.MELODIA_CONFIG || {
        apiUrl: 'https://melodia-do-sim-backend.onrender.com/api'
    };

    const form = document.getElementById('contactForm');
    if (!form) return;

    // Interceptar o envio do formulário
    const originalSendToWhatsapp = window.sendToWhatsapp;

    window.sendToWhatsapp = async function () {
        // Coletar dados do formulário
        const formData = {
            nome: document.getElementById('name').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('phone').value,
            data_evento: document.getElementById('date').value,
            mensagem: document.getElementById('message').value
        };

        // Tentar salvar no backend (não bloqueia se falhar)
        try {
            const response = await fetch(`${config.apiUrl}/eventos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('✅ Dados salvos no backend');
            }
        } catch (error) {
            console.log('⚠️ Não foi possível salvar no backend (normal se offline):', error.message);
        }

        // Continuar com o envio para WhatsApp
        if (originalSendToWhatsapp) {
            originalSendToWhatsapp();
        }
    };

    console.log('✅ Integração com backend configurada');
}

// Função auxiliar para verificar disponibilidade de data
async function checkDateAvailability(date) {
    const config = window.MELODIA_CONFIG || {
        apiUrl: 'https://melodia-do-sim-backend.onrender.com/api'
    };

    try {
        const response = await fetch(`${config.apiUrl}/disponibilidade/${date}`);
        const data = await response.json();
        return data.disponivel;
    } catch (error) {
        console.error('Erro ao verificar disponibilidade:', error);
        return true; // Assume disponível se não conseguir verificar
    }
}

// Exportar funções para uso global
window.MelodiaSim = {
    checkDateAvailability,
    updateSocialMediaLinks,
    addAdminButton
};

console.log('🎵 Melodia do Sim - Enhancements carregados!');
