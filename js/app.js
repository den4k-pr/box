(function() {
    const startDays = 10;
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


(function() {
    const totalDays = 10;
const startValue = 100;

// Отримуємо елемент
const counterEl = document.querySelector('.spotsCount-value');

// Перевіряємо, чи вже є записана дата старту та початкове значення
let savedData = localStorage.getItem('spotsCounter');
let startDate, currentValue;

if (savedData) {
  savedData = JSON.parse(savedData);
  startDate = new Date(savedData.startDate);
  currentValue = savedData.currentValue;
} else {
  startDate = new Date(); // сьогодні
  currentValue = startValue;
}

// Функція для оновлення лічильника
function updateCounter() {
  const now = new Date();
  const diffTime = now - startDate; // різниця в мс
  const diffDays = diffTime / (1000 * 60 * 60 * 24); // переводимо в дні

  // Розрахунок нового значення
  const newValue = Math.max(Math.round(startValue - (startValue * (diffDays / totalDays))), 0);

  counterEl.textContent = newValue;

  // Зберігаємо у localStorage
  localStorage.setItem('spotsCounter', JSON.stringify({
    startDate: startDate,
    currentValue: newValue
  }));
}

// Оновлюємо при завантаженні сторінки
updateCounter();

// За потреби можна оновлювати кожну годину (щоб був плавний рух без перезавантаження)
setInterval(updateCounter, 60 * 60 * 1000);
})