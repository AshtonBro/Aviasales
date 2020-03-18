'use script';

const formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
inputDateDepart = document.querySelector('.input__date-depart');

const citiesApi = 'http://api.travelpayouts.com/data/ru/cities.json',
    citiesDB = 'dataBase/cities.json',
    proxy = '​https://cors-anywhere.herokuapp.com/';

const city = ['Москва', 'Самара', 'Тюмень', 'Санкт-Петербург', 'Минск', 'Челябинск', 
'Керч', 'Волгоград', 'Днепропетровск', 'Екатеринбург','Ульяновск', 'Нижневартовск', 
'Ростов-на-дону', 'Калининград', 'Нижний новгород', 'Одесса', 'Тобольск', 'Краснодар', 'Сочи'];

const getData = (url, callback) => {
    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {return;}

        if (request.status === 200) {
            callback(request.response);
        } else {
            console.error(request.status);
        }
    });
    request.send();
};

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

const selectCity = (event, input, list) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        input.value = target.textContent;
        list.textContent = '';
    }
};


inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesFrom.addEventListener('input', () => {
    showCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesTo.addEventListener('input', () => {
    showCity(event, inputCitiesTo, dropdownCitiesTo);
});

getData(citiesDB, (data) => {
    console.log('data: ', data);
});