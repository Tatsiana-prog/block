document.addEventListener('DOMContentLoaded', function() {
 // Массив кнопок и элементов с текстом
  let buttons = [];
  let textElements = [];

  // Получаем все кнопки и элементы текста
  for (let i = 1; i <= 8; i++) {
    buttons.push(document.getElementById('btn' + i));  // Получаем кнопки
    textElements.push(document.getElementById('text' + i));  // Получаем элементы с текстом
  }
   // Функция для обработки кликов по кнопке
   function handleClick(index) {
    // Убираем класс 'slide-in' и добавляем 'slide-left' для всех других текстовых блоков
    textElements.forEach((textElement, i) => {
      if (i !== index) {
        if (textElement.classList.contains('slide-in')) {
          textElement.classList.remove('slide-in');
          textElement.classList.add('slide-left');
          textElement.style.opacity = "0.5";
        }
      }
    });

    // Для текущего элемента с индексом index переключаем классы
    let currentTextElement = textElements[index];
    currentTextElement.classList.remove('slide-left');
    currentTextElement.classList.add('slide-in');
    currentTextElement.style.display="block";

  }

  // Обработчик для кнопок
  buttons.forEach((button, index) => {
    button.addEventListener('click', function () {
      // Убираем класс active у всех кнопок
      buttons.forEach(btn => btn.classList.remove('active'));
      // Добавляем класс active к текущей кнопке
      this.classList.add('active');

      // Показываем/скрываем текст при клике на кнопку
      handleClick(index);
      // Перемещаем кликнутую кнопку на 3-й индекс (что соответствует 4-й позиции)
      moveButtonToThirdPosition(this);
    });
  });
  handleClick(3);
  // Функция для перемещения кнопки на 3-й индекс
  function moveButtonToThirdPosition(clickedButton) {
    let parent = clickedButton.parentNode;  // Получаем родительский элемент (контейнер для кнопок)
    let buttonsArray = Array.from(parent.children);  // Получаем все кнопки в родительском контейнере

    // Если кликнутая кнопка не на 4-й позиции, перемещаем ее туда
    let currentIndex = buttonsArray.indexOf(clickedButton);
    if (currentIndex !== 3) {
      // Убираем кликнутую кнопку из текущей позиции
      buttonsArray.splice(currentIndex, 1);
      // Вставляем ее на 4-ю позицию
      buttonsArray.splice(3, 0, clickedButton);
      // Перезаписываем порядок кнопок в родительском элементе
      buttonsArray.forEach(button => parent.appendChild(button));
    }
}
});