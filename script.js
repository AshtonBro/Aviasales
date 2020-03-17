'use script';

const formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
inputDateDepart = document.querySelector('.input__date-depart');

const city = ['Москва', 'Самара', 'Тюмень', 'Санкт-Петербург', 'Минск', 'Челябинск', 
'Керч', 'Волгоград', 'Днепропетровск', 'Екатеринбург','Ульяновск', 'Нижневартовкс', 
'Ростов-на-дону', 'Калининград', 'Нижний новгород', 'Одесса', 'Тобольск', 'Краснодар', 'Сочи'];

inputCitiesFrom.addEventListener('input', () => {
    city.forEach(elem => {
        const filterCity = city.filter((elem) => {
            const fixItem = elem.toLowerCase();
            return elem.includes(inputCitiesFrom.value);
        });
    });
});