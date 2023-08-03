function round(number, n) {
    return Math.floor(number * 10 ** n) / 10 ** n
}

function toggle(target) {
    var targetElement = document.getElementsByClassName(`${target}OptionsWrapper`)[0]
    var openElement = document.getElementsByClassName('open')[0]

    if (targetElement.classList.contains('open')) {
        var option = 'del'
    } else {
        var option = 'add'
    }

    if (openElement) {
        openElement.classList.remove('open')
        openElement.previousElementSibling.firstElementChild.classList.replace('arrow-up', 'arrow-down')
    }

    if (option == 'del') {
        targetElement.classList.remove('open')
        targetElement.previousElementSibling.firstElementChild.classList.replace('arrow-up', 'arrow-down')
    } else {
        targetElement.classList.add('open')
        targetElement.previousElementSibling.firstElementChild.classList.replace('arrow-down', 'arrow-up')
    }
}

function getDateRanges(rangeNumber) {
    const currentDate = new Date();

    const startRangeDate = new Date(currentDate.getFullYear() - rangeNumber, currentDate.getMonth());
    const endRangeDate = currentDate;

    // Вычисляем середину диапазона
    const middleRangeDate = new Date(startRangeDate.getTime() + Math.floor((endRangeDate.getTime() - startRangeDate.getTime()) / 2));

    // Вычисляем диапазон в 5 месяцев до и после середины
    const rangeBefore = new Date(middleRangeDate.getTime() - 5 * 30 * 24 * 60 * 60 * 1000);
    const rangeAfter = new Date(middleRangeDate.getTime() + 5 * 30 * 24 * 60 * 60 * 1000);

    // Получаем случайную дату в диапазоне rangeBefore - rangeAfter
    const randomMonth = new Date(rangeBefore.getTime() + Math.random() * (rangeAfter.getTime() - rangeBefore.getTime()));

    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    const firstRangeString = `${monthNames[startRangeDate.getMonth()]}, ${startRangeDate.getFullYear()} — ${monthNames[randomMonth.getMonth()]}, ${randomMonth.getFullYear()}`;
    const secondRangeString = `${monthNames[randomMonth.getMonth()]}, ${randomMonth.getFullYear()} — ${monthNames[endRangeDate.getMonth()]}, ${endRangeDate.getFullYear()}`;

    return [firstRangeString, secondRangeString];
}
