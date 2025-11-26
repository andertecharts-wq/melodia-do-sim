// Enhancements para Melodia do Sim
// Este arquivo adiciona funcionalidades extras ao site

document.addEventListener('DOMContentLoaded', function () {
    // 1. Atualizar links de redes sociais
    updateSocialMediaLinks();

    // 2. Adicionar botão de admin no rodapé
    addAdminButton();

    // 3. Conectar formulário ao backend
    setupBackendIntegration();
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

// Adicionar botão de admin no menu principal
function addAdminButton() {
    const config = window.MELODIA_CONFIG || {
        adminPanelUrl: 'https://melodia-do-sim-backend.onrender.com/login.html'
    };

    // Tenta encontrar o menu de navegação
    const navMenu = document.querySelector('nav ul') || document.querySelector('.nav-links') || document.querySelector('header ul');

    if (!navMenu) {
        console.log('⚠️ Menu de navegação não encontrado para adicionar botão Admin');
        return;
    }

    // Criar item de lista para o botão
    const adminLi = document.createElement('li');

    // Criar o link/botão
    const adminLink = document.createElement('a');
    adminLink.href = config.adminPanelUrl;
    adminLink.target = '_blank';
    adminLink.rel = 'noopener noreferrer';
    adminLink.className = 'btn-admin-menu'; // Classe para estilização específica se necessário
    adminLink.innerHTML = '<i class="fas fa-lock"></i> Área Admin';

    // Estilização inline para garantir destaque (pode ser movido para CSS depois)
    adminLink.style.cssText = `
        background-color: #d4af37;
        color: white;
        padding: 8px 15px;
        border-radius: 20px;
        font-weight: bold;
        text-decoration: none;
        transition: background 0.3s;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        margin-left: 10px;
    `;

    // Efeito hover
    adminLink.addEventListener('mouseenter', () => adminLink.style.backgroundColor = '#c5a028');
    adminLink.addEventListener('mouseleave', () => adminLink.style.backgroundColor = '#d4af37');

    adminLi.appendChild(adminLink);
    navMenu.appendChild(adminLi);

    console.log('✅ Botão de admin adicionado ao menu principal');
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
