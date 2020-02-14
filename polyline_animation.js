ymaps.ready(['AnimatedLine']).then(init);

function init(ymaps) {
    // Создаем карту.
    var myMap = new ymaps.Map("map", {
        center: [54.937273,82.8994626],
        zoom: 16
    }, {
        searchControlProvider: 'yandex#search'
    });
    // Создаем ломаные линии.
    var firstAnimatedLine = new ymaps.AnimatedLine([
        [54.937273,82.8994626] ,
[54.9372972,82.8994747] ,
[54.9372137,82.899459] ,
[54.9371347,82.8994192] ,
[54.937182,82.8991811] ,
[54.9371691,82.8990082] ,
[54.9372613,82.8987319] ,
[54.9375705,82.8978146] ,
[54.9379675,82.8968089] 

    ], {}, {
        // Задаем цвет.
        strokeColor: "#ED4543",
        // Задаем ширину линии.
        strokeWidth: 5,
        // Задаем длительность анимации.
        animationTime: 4000
    });
    var secondAnimatedLine = new ymaps.AnimatedLine([
[54.9386905,82.8969406] ,
[54.938221,82.8987087] ,
[54.9381529,82.8983343] ,
[54.937475,82.8984212] ,
[54.9370494,82.899238] ,
[54.9365791,82.8995852] ,
[54.9371982,82.8991061] ,
[54.937228,82.8994202] ,
[54.9372271,82.899485] 
    ], {}, {
        strokeColor: "#1E98FF",
        strokeWidth: 5,
        animationTime: 4000
    });
    // Добавляем линии на карту.
    myMap.geoObjects.add(firstAnimatedLine);
    myMap.geoObjects.add(secondAnimatedLine);
    // Создаем метки.
    var firstPoint = new ymaps.Placemark([54.937273,82.8994626], {}, {
        preset: 'islands#redRapidTransitCircleIcon'
    });
    var secondPoint = new ymaps.Placemark([54.9379675,82.8968089] , {}, {
        preset: 'islands#blueMoneyCircleIcon'
    });
    var thirdPoint = new ymaps.Placemark([54.9372271,82.899485] , {}, {
        preset: 'islands#blackZooIcon'
    });
    // Функция анимации пути.
    function playAnimation() {
        // Убираем вторую линию.
        secondAnimatedLine.reset();
        // Добавляем первую метку на карту.
        myMap.geoObjects.add(firstPoint);
        // Анимируем первую линию.
        firstAnimatedLine.animate()
            // После окончания анимации первой линии добавляем вторую метку на карту и анимируем вторую линию.
            .then(function() {
                myMap.geoObjects.add(secondPoint);
                return secondAnimatedLine.animate();
            })
            // После окончания анимации второй линии добавляем третью метку на карту.
            .then(function() {
                myMap.geoObjects.add(thirdPoint);
                // Добавляем паузу после анимации.
                return ymaps.vow.delay(null, 2000);
            })
            // После паузы перезапускаем анимацию.
            .then(function() {
                // Удаляем метки с карты.
                myMap.geoObjects.remove(firstPoint);
                myMap.geoObjects.remove(secondPoint);
                myMap.geoObjects.remove(thirdPoint);
                // Убираем вторую линию.
                secondAnimatedLine.reset();
                // Перезапускаем анимацию.
                playAnimation();
            });
    }
    // Запускаем анимацию пути.
    playAnimation();
}
