'use script';

const formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
inputDateDepart = document.querySelector('.input__date-depart');

const proxy = '​https://cors-anywhere.herokuapp.com/',
    citiesAPI = 'http://api.travelpayouts.com/data/ru/cities.json',
    keyAPI = '0e0696b07d29106cb0c8007f0e7f46a9',
    calendar = 'http://min-prices.aviasales.ru/calendar_preload',
    citiesDB = 'dataBase/cities.json',
     searchTickets = '?origin=SVX&destination=KGD&depart_date=2020-05-25&one_way=false';

let city = [];
let tickets = [];

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
            const fixItem = elem.name.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
        });

        filterCity.forEach((elem) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = elem.name;
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

dropdownCitiesFrom.addEventListener('click', (event) => {
    selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesTo.addEventListener('click', (event) => { 
    selectCity(event, inputCitiesTo, dropdownCitiesTo);
});

/*
getData(calendar, (data) => {
    city = JSON.parse(data).filter((item) => item.name);
}); */

getData(calendar + searchTickets, (data) => {
    tickets = JSON.parse(data);
    // Получаем массив минимальных цен, соответствующих заданной дате вылета
    console.log(tickets.current_depart_date_prices);
    //Получаем  массив минимальных цен для различных дней вылета
    console.log( tickets.best_prices);
});