'use script';

const formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
inputDateDepart = document.querySelector('.input__date-depart');

const city = ['Москва', 'Самара', 'Тюмень', 'Санкт-Петербург', 'Минск', 'Челябинск', 
'Керч', 'Волгоград', 'Днепропетровск', 'Екатеринбург','Ульяновск', 'Нижневартовск', 
'Ростов-на-дону', 'Калининград', 'Нижний новгород', 'Одесса', 'Тобольск', 'Краснодар', 'Сочи'];

const showCity = (input, list) => {
    list.textContent = '';

    if (input.value !== '') {
        const filterCity = city.filter((elem) => {
            const fixItem = elem.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
        });

        filterCity.forEach((elem) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = elem;
            list.append(li);
        });
    }
};

inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesFrom.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        inputCitiesFrom.value = target.textContent;
        dropdownCitiesFrom.textContent = '';
    }
});

inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesTo.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        inputCitiesTo.value = target.textContent;
        dropdownCitiesTo.textContent = '';
    }
});