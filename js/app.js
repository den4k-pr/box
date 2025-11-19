(function() {
    const startDays = 5;
    const countEl = document.querySelector('.count');

    // Отримуємо дані з кешу
    let savedData = JSON.parse(localStorage.getItem('offerCountdown'));

    // Якщо даних немає — створюємо нові
    if (!savedData) {
        savedData = {
            daysLeft: startDays,
            lastUpdate: Date.now()
        };
        localStorage.setItem('offerCountdown', JSON.stringify(savedData));
    }

    function updateCountdown() {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        // Рахуємо, скільки часу минуло
        const diff = now - savedData.lastUpdate;

        if (diff >= oneDay) {
            // На кожну минулу добу зменшуємо на 1
            const daysPassed = Math.floor(diff / oneDay);
            savedData.daysLeft -= daysPassed;

            // Якщо < 0 — перезапускаємо
            if (savedData.daysLeft <= 0) {
                savedData.daysLeft = startDays;
            }

            savedData.lastUpdate = now;
            localStorage.setItem('offerCountdown', JSON.stringify(savedData));
        }

        // Оновлюємо текст
        countEl.textContent = `Offer expires in ${savedData.daysLeft} days`;
    }

    // Оновлюємо одразу при завантаженні
    updateCountdown();

    // Перевіряємо кожну хвилину (достатньо)
    setInterval(updateCountdown, 60 * 1000);
})();
