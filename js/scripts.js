/*
сделать каждый раз создание новой страницы, каждый раз проверять какие блоки заполнены и по новой добавлять всю инфу на
страницу, т.е. не отталкиваться от open блоков, а проверять все
*/
skillsDict = {
    'Backend': ['SQL', 'Kafka', 'RabbitMQ', 'Docker'],
    'Frontend': ['Webpack', 'HTML', 'CSS'],
    'FullStack': ['SQL', 'Kafka', 'Docker', 'Webpack', 'HTML', 'CSS'],
    'Android': ['Jetpack Compose',],
    'iOS': ['RX Swift'],
    'Infosecurity': ['SQL Injection'],
    'QA Automation': ['Selenium', 'Postman'],
    'QA Manual': ['Postman'],
    'Unity': ['Unity'],
    'Unreal Engine': ['Unreal Engine'],
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
    // Default export is a4 paper, portrait, using millimeters for units
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
    doc.text(`Навыки: `, 10, 10 * row)
    row += 1
    doc.setFont('_TimesNewRoman');
    doc.setFontSize(9)
    doc.text(skills, 10, 9.5 * row)

    var pdfData = doc.output('datauristring');
    var iframe = `<iframe id="pdf-view" width='100%' height='${height}px' src='${pdfData}'></iframe>`;
    pdfViewer.innerHTML = iframe;
    //doc.save("a4.pdf");
}

function getLayout(category) {
    // сохраняем категорию в объекте sessionStorage браузера
    sessionStorage.setItem("category", category)
    // открываем страницу шаблона
    window.location.href = window.location.href.replace("index.html", "layout.html").replace("index", "layout")
}

//class MyVariables {
//  constructor() {
//    // ежемесячные расходы
//    this.monthlyExpenses = 0;
//    // сумма роста ежемесячных расходов
//    this.monthlyExpensesRise = 0;
//    // период роста ежемесячных расходов
//    this.monthlyExpensesRisePeriod = 0;
//    // размер зарплаты
//    this.salary = 0;
//    // стаж работы
//    this.salaryMonth = 0;
//    // период роста зарплаты
//    this.risePeriod = 0;
//    // сумма роста зарплаты
//    this.riseAmount = 0;
//    // сумма НДФЛ
//    this.salaryTax = 0;
//    // процент накопительного вклада
//    this.accumulativeInterest = 0
//    // накопления
//    this.accumulation = 0;
//    // налоговый вычет за кредит
//    this.creditTaxDeduction = 0;
//    // налоговый вычет за проценты
//    this.percentsTaxDeduction = 0;
//    // цена квартиры
//    this.apartmentPrice = 0;
//    // первоначальный взнос за ипотеку (по умолчанию равен моей доле от продажи квартиры)
//    this.mortgageDownPayment = 0;
//    // сумма ипотеки
//    this.mortgage = 0;
//    // период досрочного погашения ипотеки
//    this.prepaymentPeriod = 12;
//    // процент ипотеки
//    this.mortgagePercent = 0;
//    // сумма выплаченного тела кредита за год
//    this.creditFromYear = 0;
//    // сумма выплаченных процентов за год
//    this.percentsFromYear = 0;
//  }
//
//    reset() {
//        for (const item in this) {
//            if (this.hasOwnProperty(item)) {
//                this[item] = 0
//            }
//        }
//        this.prepaymentPeriod = 12
//    }
//}


function viewResult() {
    document.getElementById('mortgage-table').innerHTML = ''
    myVars.apartmentPrice = parseInt(document.getElementById('apartment-price').value)
    myVars.mortgagePercent = parseInt(document.getElementById('mortgage-percent').value)
    myVars.monthlyExpenses = parseInt(document.getElementById('monthly-expenses').value)
    myVars.monthlyExpensesRise = parseInt(document.getElementById('monthly-expenses-rise').value)
    myVars.monthlyExpensesRisePeriod = parseInt(document.getElementById('monthly-expenses-rise-period').value)
    myVars.salary = parseInt(document.getElementById('salary').value)
    myVars.risePeriod = parseInt(document.getElementById('rise-period').value)
    myVars.riseAmount = parseInt(document.getElementById('rise-amount').value)
    myVars.accumulativeInterest = parseInt(document.getElementById('accumulative-interest').value) / 100
    // myVars.accumulation = parseInt(document.getElementById('accumulation').value)
    myVars.creditTaxDeduction = parseInt(document.getElementById('credit-tax-deduction').value)
    myVars.percentsTaxDeduction = parseInt(document.getElementById('percents-tax-deduction').value)
    myVars.mortgageDownPayment = parseInt(document.getElementById('mortgage-down-payment').value)
    var mortgagePeriod = parseInt(document.getElementById('mortgage-period').value)
    var annualInterestRate = parseInt(document.getElementById('mortgage-percent').value)
    var loanAmount = myVars.apartmentPrice - myVars.mortgageDownPayment
}