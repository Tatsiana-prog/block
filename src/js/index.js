// Получаем все кнопки и текстовые элементы с помощью массива и метода querySelectorAll
let buttons = [];
let textElements = [];

for (let i = 1; i <= 8; i++) {
    buttons.push(document.getElementById('btn' + i));
    textElements.push(document.getElementById('text' + i));
}

// Функция для обработки кликов по кнопке
function handleClick(index) {
    // Убираем класс 'slide-in' и добавляем 'slide-left' для всех других текстовых блоков
    textElements.forEach((textElement, i) => {
        if (i !== index) {
            if (textElement.classList.contains('slide-in')) {
                textElement.classList.remove('slide-in');
                textElement.classList.add('slide-left');
            }
        }
    });

    // Для текущего элемента с индексом index переключаем классы
    let currentTextElement = textElements[index];
    currentTextElement.classList.remove('slide-left');
    currentTextElement.classList.add('slide-in');
    currentTextElement.style.display = 'block'; // Убедимся, что текст отображается
}

// Добавляем обработчик событий для каждой кнопки
buttons.forEach((button, i) => {
    button.addEventListener('click', function() {
        handleClick(i);
    });
    handleClick(0);
});