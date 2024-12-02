document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.role-option');
    const agentCards = document.querySelectorAll('.agent-card');
    const customSelect = document.querySelector('.custom-select');
    const selectTrigger = document.querySelector('.select-trigger');
    const options = document.querySelectorAll('.select-option');
    const triggerSpan = selectTrigger.querySelector('span');

    function updateAgentCards(selectedRole) {
        agentCards.forEach(card => {
            card.style.animation = 'none';
            card.offsetHeight;
            card.style.animation = 'fadeSlideUp 0.5s ease forwards';

            if (selectedRole === 'all') {
                card.style.display = 'block';
            } else {
                const roleImg = card.querySelector('.agent-role');
                const cardRole = roleImg.getAttribute('alt');
                card.style.display = cardRole === selectedRole ? 'block' : 'none';
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateAgentCards(button.getAttribute('data-role'));
        });
    });

    selectTrigger.addEventListener('click', () => {
        customSelect.classList.toggle('active');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            const text = option.querySelector('span').textContent;
            const img = option.querySelector('img');
            
            const existingIcon = selectTrigger.querySelector('.role-icon');
            if (existingIcon) {
                existingIcon.remove();
            }

            triggerSpan.textContent = text;
            
            if (img && value !== 'all') {
                const newIcon = document.createElement('img');
                newIcon.src = img.src;
                newIcon.alt = 'role icon';
                newIcon.className = 'role-icon';
                selectTrigger.insertBefore(newIcon, triggerSpan);
            }
            
            customSelect.classList.remove('active');
            
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-role') === value) {
                    btn.classList.add('active');
                }
            });
            
            updateAgentCards(value);
        });
    });

    document.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('active');
        }
    });

    agentCards.forEach(card => {
        card.style.animation = 'fadeSlideUp 0.5s ease forwards';
    });
});