var row = 1

function addInfo() {
//    var resume = document.getElementById('mortgage-table')
//    var rows = ''
//    for (var i = 1; i < 54; i++) {
//        rows += `<div class="row"><div class="row-number">${i}</div></div>`
//    }
//    resume.innerHTML = rows
    const { jsPDF } = window.jspdf;

    // Получение элемента контейнера для отображения PDF
    let pdfViewer = document.getElementById('pdf-viewer');
    const height = window.innerHeight * 0.93;

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF();
    doc.addFont('../fonts/Times.ttf', 'ARIALUNI', 'normal');

    // установка шрифта для всего документа
    doc.setFont('ARIALUNI');
    doc.setFontSize(10)

    var target = document.getElementsByClassName('open')[0]
    if (target.classList.contains('mortgageOptionsWrapper')) {
        var email = document.getElementById('apartment-price')
        var telegram = document.getElementById('mortgage-down-payment')
        var phone = document.getElementById('mortgage-period')
        if (email.value) {
            doc.text(`E-mail: ${email.value}`, 10, 10 * row)
            row += 1
        }
        if (phone.value) {
            doc.text(`Phone: ${phone.value}`, 10, 10 * row)
            row += 1
        }
        if (telegram.value) {
            doc.text(`Telegram: ${telegram.value}`, 10, 10 * row)
            row += 1
        }
    } else if (target.classList.contains('accumulationOptionsWrapper')) {
        var firstName = document.getElementById('salary').value
        var lastName = document.getElementById('rise-period').value
        var area = document.getElementById('programming-area').value
        var lang = document.getElementById('programming-language').value
        doc.text(`${lastName} ${firstName}, ${lang} ${area} Developer`, 10, 10 * row)
    }

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