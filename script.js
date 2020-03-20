'use script';

const formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
inputDateDepart = document.querySelector('.input__date-depart');

const proxy = '​https://cors-anywhere.herokuapp.com',
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
            return fixItem.startWith(input.value.toLowerCase());
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

const getNameCity = (code)

const getData = (data) => {
    return new Data(data).toLocalString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        
    });
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
                <a href="https://www.aviasales.ru/search/SVX2905KGD1" class="button button__buy">Купить
                    за ${data.value}</a>
            </div>
            <div class="right-side">
                <div class="block-left">
                    <div class="city__from">Вылет из города
                        <span class="city__name">${getNameCity}</span>
                    </div>
                    <div class="date">${getData(data.depart_date)}</div>
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
        deep = '<h3>К сожалению на текущую дату билетов не нашлось!</h3>'
    }

    ticket.insertAdjacentHTML('');
    return ticket;
};

const renderCheapDay = (cheapTicket) => {
    
    console.log('ticket: ', cheapTicket);
};

const renderCheapYear = (cheapTickets) => {
    cheapestTicket
    console.log('tickets: ', cheapTickets);
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

    const cityFrom = city.find((item) => inputCitiesFrom.value === item.name);
    const cityTo = city.find((item) => inputCitiesTo.value === item.name);

    const formData = {
        from: cityFrom.code,
        to: cityTo.code,
        when: inputDateDepart.value,
    };

    // интерполяция
    const requestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true`;

    getData(calendar + requestData, (response) => {
        renderCheap(response, formData.when);
    });
});

// getData(citiesDB, (data) => {
//     city = JSON.parse(data).filter((item) => item.name);
//     console.log('city: ', city);
// });

//  from: city.find((item) => inputCitiesFrom.value === item.name).code

// getData(calendar + searchTickets + keyAPI, (data) => {
//     tickets = JSON.parse(data).best_prices.filter(item => item.depart_date === '2020-05-29');
//     // Получаем массив, соответствующих заданной дате вылета
//     console.log(tickets);
// });

const arr = ['Москва', 'Самара', 'Тюмень', 'Санкт-Петербург', 'Минск', 'Челябинск', 
'Керч', 'Волгоград', 'Днепропетровск', 'Екатеринбург','Ульяновск', 'Нижневартовкс', 
'Ростов-на-дону', 'Калининград', 'Нижний новгород', 'Одесса', 'Тобольск', 'Краснодар', 'Сочи'];

arr.filter((item, i, array) => {

});