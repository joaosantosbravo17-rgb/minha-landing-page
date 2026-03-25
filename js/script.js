/* JAVASCRIPT - PULSE MARKETING 
   Foco: Interatividade e Conversão
*/

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-pulse');
    const whatsappInput = document.getElementById('whatsapp');

    // 1. Efeito de Escala nos Cards ao Rolar (Scroll Reveal)
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

    // 2. Máscara de Telefone Automática (O toque de mestre)
    if (whatsappInput) {
        whatsappInput.addEventListener('input', (e) => {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // 3. Lógica do Formulário de Conversão
    if (form) {
        const submitBtn = form.querySelector('.btn-submit');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const businessName = form.querySelector('input[type="text"]').value;
            const whatsapp = whatsappInput.value;

            // Estilo de "Carregando"
            submitBtn.disabled = true;
            submitBtn.style.cursor = 'not-allowed';
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sincronizando Pulso...';
            submitBtn.style.opacity = '0.7';

            // Simula o envio
            setTimeout(() => {
                submitBtn.innerHTML = 'Dados Enviados! 🚀';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745, #218838)';
                submitBtn.style.opacity = '1';
                
                alert(`Valeu, mano! Recebemos o contato da ${businessName}. \n\nNosso estrategista vai analisar o seu nicho e te chamar no ${whatsapp} em breve.`);

                // Reseta tudo após 3 segundos
                setTimeout(() => {
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.style.cursor = 'pointer';
                    submitBtn.innerHTML = 'Enviar e Pulsar Vendas 🚀';
                    submitBtn.style.background = 'linear-gradient(135deg, #ff552e, #e61e2b)';
                }, 3000);
            }, 2000);
        });
    }

    // 4. Efeito de Navbar Dinâmica
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 5%';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.padding = '1.5rem 5%';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
});