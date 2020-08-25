'use script';

const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = document.querySelector('.input__cities-from'),
    dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
    inputCitiesTo = document.querySelector('.input__cities-to'),
    dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
    inputDateDepart = document.querySelector('.input__date-depart'),
    cheapestTicket = document.getElementById('cheapest-ticket'),
    otherCheapTickets = document.getElementById('other-cheap-tickets');
console.log('otherCheapTickets: ', otherCheapTickets);

const proxy = '​https://cors-anywhere.herokuapp.com/',
    citiesAPI = 'http://api.travelpayouts.com/data/ru/cities.json',
    keyAPI = '0e0696b07d29106cb0c8007f0e7f46a9',
    calendar = 'http://min-prices.aviasales.ru/calendar_preload',
    citiesDB = 'dataBase/cities.json',
    searchTickets = '?origin=SVX&destination=KGD&depart_date=2020-05-25&one_way=false',
    maxCount = 15;

let city = [];
let tickets = [];

const getData = (url, callback, errorReq = console.error) => {

    const request = new XMLHttpRequest();

    request.open('GET', url);

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
            return;
        }
        if (request.status === 200) {
            callback(request.response);
        } else {
            errorReq(request.status);
        }
    });

    request.send();
};

const showCity = (input, list) => {
    list.textContent = '';

    if (input.value !== '') {
        const filterCity = city.filter((elem) => {
            const fixItem = elem.name.toLowerCase();
            return fixItem.startsWith(input.value.toLowerCase());
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

const getNameCity = (code) => {
    const objCity = city.find(item => item.code === code);
    return objCity.name;
};

const getDate = (date) => {
    return new Date(date).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });
};

const getChanges = (num) => {
    if (num) {
        return num === 1 ? 'C одной пересадкой' : 'С двумя пересадками';
    } else {
        return 'Без пересадок';
    }
};

const getLinkAviasales = (data) => {
    let link = 'https://www.aviasales.ru/search/';

    link += data.origin;

    const date = new Date(data.depart_date);

    const day = date.getDate();

    link += day < 10 ? '0' + day : day;

    const month = date.getMonth() + 1;

    link += month < 10 ? '0' + month : month;

    link += date.destination;

    link += '1';

    return link;
};

const createCard = (data) => {
    const ticket = document.createElement('article');
    ticket.classList.add('ticket');

    let deep = '';

    if (data) {
        deep = `
        <h3 class="agent">${data.gate}</h3>
            <div class="ticket__wrapper">
            <div class="left-side">
                <a href="${getLinkAviasales(data)}" target ="_blank" class="button button__buy">Купить
                    за ${data.value}</a>
            </div>
            <div class="right-side">
                <div class="block-left">
                    <div class="city__from">Вылет из города
                        <span class="city__name">${getNameCity(data.origin)}</span>
                    </div>
                    <div class="date">${getDate(data.depart_date)}</div>
                </div>
                <div class="block-right">
                    <div class="changes">${getChanges(data.number_of_changes)}</div>
                    <div class="city__to">Город назначения:
                        <span class="city__name">${getNameCity(data.destination)}</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    } else {
        deep = '<h3>К сожалению на текущую дату билетов не нашлось!</h3>';
    }

    ticket.insertAdjacentHTML('afterbegin', deep);

    return ticket;
};

const renderCheapDay = (cheapTicket) => {
    cheapestTicket.style.display = 'block';
    cheapestTicket.innerHTML = '<h2>Самые дешевые билеты на выбранную дату</h2>';

    const ticket = createCard(cheapTicket[0]);
    cheapestTicket.append(ticket);
};

const renderCheapYear = (cheapTickets) => {
    otherCheapTickets.style.display = 'block';
    otherCheapTickets.innerHTML = '<h2>Самые дешевые билеты на другие даты</h2>';

    cheapTickets.sort((a, b) => a.value - b.value);

    for (let i = 0; cheapTickets.length && i < maxCount; i++) {
        const ticket = createCard(cheapTickets[i]);
        otherCheapTickets.append(ticket);
    }
};

const renderCheap = (data, date) => {
    const cheapTicketYear = JSON.parse(data).best_prices;

    const cheapTicketDay = cheapTicketYear.filter((item) => {
        return item.depart_date === date;
    });

    renderCheapDay(cheapTicketDay);
    renderCheapYear(cheapTicketYear);
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

formSearch.addEventListener('submit', (event) => {
    event.preventDefault();

    const cityFrom = city.find((item) => inputCitiesFrom.value === item.name).code;
    const cityTo = city.find((item) => inputCitiesTo.value === item.name).code;

    const formData = {
        from: cityFrom,
        to: cityTo,
        when: inputDateDepart.value,
    };

    if (formData.from && formData.to) {
        // интерполяция
        const requestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true`;

        getData(calendar + requestData,
            (response) => {
                renderCheap(response, formData.when);
            },
            (error) => {
                cheapestTicket.style.display = 'block';
                cheapestTicket.innerHTML = '<h2 class ="error">В этом направлении нет рейсов</h2>';
                console.error('Ошибка ', error);
            });
    } else {
        alert('Введите корректное название города!');
    }

});

// && item.destination && item.origin

getData(citiesDB, (data) => {
    city = JSON.parse(data).filter(item => item.name);

    city.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    });

    console.log('city: ', city);

});

//  from: city.find((item) => inputCitiesFrom.value === item.name).code

// getData(calendar + searchTickets + keyAPI, (data) => {
//     tickets = JSON.parse(data).best_prices.filter(item => item.depart_date === '2020-05-29');
//     // Получаем массив, соответствующих заданной дате вылета
//     console.log(tickets);
// });

const arr = ['Самара', 'Тюмень', 'Москва', 'Санкт-Петербург', 'Минск', 'Челябинск',
    'Керч', 'Волгоград', 'Днепропетровск', 'Екатеринбург', 'Ульяновск', 'Нижневартовкс',
    'Ростов-на-дону', 'Калининград', 'Нижний новгород', 'Одесса', 'Тобольск', 'Краснодар', 'Сочи'
];