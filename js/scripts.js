/*
сделать каждый раз создание новой страницы, каждый раз проверять какие блоки заполнены и по новой добавлять всю инфу на
страницу, т.е. не отталкиваться от open блоков, а проверять все
*/
skillsDict = {
    'Backend': ['SQL', 'Kafka', 'RabbitMQ', 'Docker', 'Git'],
    'Frontend': ['Webpack', 'HTML', 'CSS', 'Git'],
    'FullStack': ['SQL', 'Kafka', 'Docker', 'Webpack', 'HTML', 'CSS', 'Git'],
    'Android': ['Jetpack Compose', 'Git'],
    'iOS': ['RX Swift', 'Git'],
    'Infosecurity': ['SQL Injection', 'Git'],
    'QA Automation': ['Selenium', 'Postman', 'Git'],
    'QA Manual': ['Postman', 'Git'],
    'Unity': ['Unity', 'Git'],
    'Unreal Engine': ['Unreal Engine', 'Git'],
}

companies = {
    'gamedev': ['Mundfish', 'Wargaming', 'Gaijin Entertainment', 'Mail.Ru Games', 'Nival', 'GSC Game World',
                'Battlestate Games'],
    'other': ['Совкомбанк Технологии', 'Авито Tech', 'Sber Devices', 'VK', 'Яндекс', 'Ozon Tech', 'Тинькофф Технологии'],
    'infosecurity': ['Лаборатория Касперского', 'Positive Technologies', 'Group-IB', 'InfoWatch Group'],
}

function start() {
    let pdfViewer = document.getElementById('pdf-viewer');
    const height = window.innerHeight * 0.93;
    const { jsPDF } = window.jspdf;
    // Default export is a4 paper, portrait, using millimeters for units
    var doc = new jsPDF();
    var pdfData = doc.output('datauristring');
    var iframe = `<iframe id="pdf-view" width='100%' height='${height}px' src='${pdfData}'></iframe>`;
    pdfViewer.innerHTML = iframe;
}

function addInfo() {
    var row = 1
    // Получение элемента контейнера для отображения PDF
    let pdfViewer = document.getElementById('pdf-viewer');
    const height = window.innerHeight * 0.93;
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();
    doc.addFont('../fonts/times.ttf', '_TimesNewRoman', 'normal');
    doc.addFont('../fonts/timesbd.ttf', '_TimesNewRomanBold', 'normal');
    // установка шрифта для всего документа
    //doc.setFont('_TimesNewRoman');
    /* название резюме */
    var firstName = document.getElementById('first-name').value
    var lastName = document.getElementById('last-name').value
    var area = document.getElementById('programming-area').value
    var lang = document.getElementById('programming-language').value
    var framework = document.getElementById('framework').value
    /* контактная информация */
    var email = document.getElementById('email').value
    var phone = document.getElementById('phone').value
    var telegram = document.getElementById('telegram').value
    /* о себе */
    var experience = parseFloat(document.getElementById('experience').value)

    if (firstName && lastName) {
        row = 1
        doc.setFont('_TimesNewRomanBold');
        doc.setFontSize(13)

        doc.text(`${lastName} ${firstName}, ${lang} ${area} Developer`, 10, 10 * row)
    }
    if (email || telegram || phone) {
        doc.setFont('_TimesNewRoman');
        doc.setFontSize(9)

        row = 3
        if (email) {
            doc.text(`E-mail: ${email}`, 10, 5 * row)
            row += 1
        }
        if (phone) {
            doc.text(`Phone: ${phone}`, 10, 5 * row)
            row += 1
        }
        if (telegram) {
            doc.text(`Telegram: `, 10, 5 * row)
            doc.textWithLink(telegram, 25, 5 * row, { url: `"https://${telegram}"` })
            row += 1
        }
    }
    if (experience) {
        experience += 2
        row = 4
        doc.setFont('_TimesNewRomanBold');
        doc.setFontSize(13)
        doc.text(`Обо мне:`, 10, 10 * row)
        row += 1
        doc.setFont('_TimesNewRoman');
        doc.setFontSize(9)
        doc.text(`${area} разработчик с ${experience} годами опыта.`, 10, 9 * row)
    }
    /* составляем карту навыков */
    var skills = skillsDict[area].join(', ')
    skills = `${lang}, ${framework}, ${skills}`
    doc.setFont('_TimesNewRomanBold');
    doc.setFontSize(13)
    row += 1
    doc.text(`Навыки: `, 10, 10 * row++)
    doc.setFont('_TimesNewRoman');
    doc.setFontSize(9)
    doc.text(skills, 10, 9.5 * row++)
    /* предыдущие места работы */
    workplaces = getWorkplaces(area)
    workDates = getDateRanges(experience)
    doc.setFont('_TimesNewRomanBold');
    doc.setFontSize(13)
    doc.text(`Опыт работы: `, 10, 10 * row++)

    doc.setFontSize(13)
    doc.text(workplaces[0], 10, 10 * row++)
    doc.setFontSize(9)
    doc.text(workDates[1], 10, 9.7 * row)
    row += 0.5
    doc.text(`Обязанности: `, 10, 9.7 * row)
    doc.setFont('_TimesNewRoman');
    doc.text(`красил кнопки`, 32, 9.7 * row)
    row += 0.5
    doc.setFont('_TimesNewRomanBold');
    doc.text(`Достижения: `, 10, 9.7 * row)
    doc.setFont('_TimesNewRoman');
    doc.text(`закрасил все ёбаные кнопки`, 32, 9.7 * row++)

    doc.setFont('_TimesNewRomanBold');
    doc.setFontSize(13)
    doc.text(workplaces[1], 10, 10 * row++)
    doc.setFontSize(9)
    doc.text(workDates[0], 10, 9.7 * row)
    row += 0.5
    doc.text(`Обязанности: `, 10, 9.7 * row)
    doc.setFont('_TimesNewRoman');
    doc.text(`перекладывал джейсоны`, 32, 9.7 * row)
    row += 0.5
    doc.setFont('_TimesNewRomanBold');
    doc.text(`Достижения: `, 10, 9.7 * row)
    doc.setFont('_TimesNewRoman');
    doc.text(`кто такой этот ваш Джейсон, которого все перекладывают?`, 32, 9.7 * row++)

    var pdfData = doc.output('datauristring');
    var iframe = `<iframe id="pdf-view" width='100%' height='${height}px' src='${pdfData}'></iframe>`;
    pdfViewer.innerHTML = iframe;
    //doc.save("a4.pdf");
}

function getWorkplaces(area) {
    var companyArray
    if (['Unreal Engine', 'Unity'].includes(area)) {
        companyArray = companies['gamedev']
    } else if (area == 'infosecurity') {
        companyArray = companies[area]
    } else {
        companyArray = companies['other']
    }

    let randomIndex1, randomIndex2

    // генерируем два случайных неповторяющихся индекса
    do {
      randomIndex1 = Math.floor(Math.random() * companyArray.length)
      randomIndex2 = Math.floor(Math.random() * companyArray.length)
    } while (randomIndex1 === randomIndex2)

    return [companyArray[randomIndex1], companyArray[randomIndex2]]
}

function getLayout(category) {
    // сохраняем категорию в объекте sessionStorage браузера
    sessionStorage.setItem("category", category)
    // открываем страницу шаблона
    window.location.href = window.location.href.replace("index.html", "layout.html").replace("index", "layout")
}