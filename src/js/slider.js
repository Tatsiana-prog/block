var radius = 380; // Размер радиуса
  var autoRotate = true; // Автоматическое вращение
  var rotateSpeed = -60; // скорость вращения
  var imgWidth = 303;
  var imgHeight = 215; // Высота изображений

  let autoSpinInterval;  // Здесь объявляем переменную

  var odrag = document.getElementById('drag-container');
  var ospin = document.getElementById('spin-container');
  var aImg = ospin.getElementsByTagName('img');
  var aVid = ospin.getElementsByTagName('video');
  var aEle = [...aImg, ...aVid]; // объединить 2 массива

  // Размер изображений
  ospin.style.width = imgWidth + "px";
  ospin.style.height = imgHeight + "px";

  // Размер земли - зависит от радиуса
  var ground = document.getElementById('ground');
  ground.style.width = radius * 3 + "px";
  ground.style.height = radius * 3 + "px";

  // Функция инициализации с настройкой начальной позиции второго изображения
  function init(delayTime) {
    var startIndex = 1; // Начинаем с второго изображения (index 1)

    for (var i = 0; i < aEle.length; i++) {
      // Вычисляем угол для каждого элемента
      var angle = (i + startIndex) * (360 / aEle.length);
      aEle[i].style.transform = "rotateY(" + angle + "deg) translateZ(" + radius + "px)";
      aEle[i].style.transition = "transform 1s";
      aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
    }
  }

  // Вызываем функцию инициализации после задержки
  setTimeout(init, 1000);

  // Настройка автоматического вращения
  if (autoRotate) {
    var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
    ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
  }

  // Обработчик перемещения мыши для вращения карусели
  var sX, sY, nX, nY, desX = 0, desY = 0, tX = 0, tY = 10;
  document.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    sX = e.clientX;
    sY = e.clientY;

    this.onpointermove = function (e) {
      e = e || window.event;
      nX = e.clientX;
      nY = e.clientY;
      desX = nX - sX;
      desY = nY - sY;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      sX = nX;
      sY = nY;
    };

    this.onpointerup = function () {
      odrag.timer = setInterval(function () {
        desX *= 0.95;
        desY *= 0.95;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        playSpin(false);
        if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
          clearInterval(odrag.timer);
          playSpin(true);
        }
      }, 17);
      this.onpointermove = this.onpointerup = null;
    };

    return false;
  };

  function applyTranform(obj) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;
    obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
  }

  function playSpin(yes) {
    ospin.style.animationPlayState = (yes ? 'running' : 'paused');
  }

  document.onmousewheel = function (e) {
    e = e || window.event;
    var d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
  };
  // Функция автопрокрутки карусели
  function autoSpin() {
    tX += 0.1; // вращаем карусель по оси Y
    applyTranform(odrag);
  }

  // Функция для смены положения карусели
  function rotateCarousel(index) {
    var angle = index * (360 / aEle.length);
    ospin.style.transform = `rotateY(${angle}deg)`;
  }
;