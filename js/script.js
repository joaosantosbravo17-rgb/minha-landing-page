/* JAVASCRIPT - PULSE MARKETING 
   Foco: Interatividade e Conversão Real
*/

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-pulse');
    const whatsappInput = document.getElementById('whatsapp');

    // 1. Efeito de Scroll Reveal nos Cards
    const cards = document.querySelectorAll('.card');
    const observerOptions = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // 2. Máscara de Telefone Automática
    if (whatsappInput) {
        whatsappInput.addEventListener('input', (e) => {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // 3. LOGICA DE ENVIO PARA WHATSAPP (A MÁGICA ACONTECE AQUI)
    window.enviarWhatsApp = function() {
        const businessName = document.getElementById('business-name').value;
        const phone = document.getElementById('whatsapp').value;
        const budget = document.getElementById('budget').value;
        const challenge = document.getElementById('challenge').value;
        const submitBtn = document.querySelector('.btn-submit');

        // Validação básica
        if (!businessName || !phone || !budget) {
            alert("Mano, preenche os campos obrigatórios aí! (Nome, Whats e Investimento)");
            return;
        }

        // Efeito visual de carregamento
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gerando Diagnóstico...';
        submitBtn.style.opacity = '0.7';

        // Configuração da mensagem
        const meuNumero = "5541987613156";
        const mensagem = `Olá Pulse! 🚀%0A%0A` +
            `*Novo Lead do Site*%0A` +
            `*------------------------*%0A` +
            `*Empresa:* ${businessName}%0A` +
            `*WhatsApp:* ${phone}%0A` +
            `*Investimento:* R$ ${budget}%0A` +
            `*Desafio:* ${challenge}`;

        const url = `https://api.whatsapp.com/send?phone=${meuNumero}&text=${mensagem}`;

        // Simula um pequeno delay para dar sensação de processamento
        setTimeout(() => {
            window.open(url, '_blank');
            
            // Reseta o botão
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Enviar e Pulsar Vendas 🚀';
            submitBtn.style.opacity = '1';
            
            // Limpa o form
            document.getElementById('form-pulse').reset();
        }, 1200);
    }

    // 4. Efeito de Navbar Dinâmica
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});