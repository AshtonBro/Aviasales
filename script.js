'use script';

const formSearch = document.querySelector('.form-search'),
inputCitiesFrom = document.querySelector('.input__cities-from'),
dropdownCitiesFrom = document.querySelector('.dropdown__cities-from'),
inputCitiesTo = document.querySelector('.input__cities-to'),
dropdownCitiesTo = document.querySelector('.dropdown__cities-to'),
inputDateDepart = document.querySelector('.input__date-depart'),
cheapestTicket = document.getElementById('cheapest-ticket'),
otherCheapTickets = document.getElementById('other-cheap-tickets');

const proxy = '​https://cors-anywhere.herokuapp.com',
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
        if (request.readyState !== 4) {return;}

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



const getData = (data) => {
    return new Data(data).toLocalString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        
    });
};

const getNameCity = (code) => {
    const objCity = city.find(item => item.code === code);
    return objCity.name;
};

const getChanges = (num) => {
    if (num) {
        return n === 1 ? 'C одной пересадкой' : 'С двумя пересадками';
    } else {
        return 'Без пересадок';
    }
};


const renderCheapDay = (cheapTicket) => {
    const ticket = createCard(cheapTicket[0]);

    cheapestTicket.append(ticket);
    console.log('ticket: ', ticket);
};

const renderCheapYear = (cheapTickets) => {
    otherCheapTickets.style.display = 'none';
    ot

    cheapestTicket.sort((a, b) => a.value - b.value);

    for (let i = 0; i < cheapTickets.lenght && i < maxCount; i++) {
        const ticket = createCard(cheapTickets[i]);
        otherCheapTickets.append(ticket);
    }

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

    cheapestTicket.innerHtml = '<h2>Самый дешевый билет на выбранную даиу</h2>';

    otherCheapTickets.innerHtml = '<h2>Самый дешевый билет на выбранную даиу</h2>';

    const cityFrom = city.find((item) => inputCitiesFrom.value === item.name);
    const cityTo = city.find((item) => inputCitiesTo.value === item.name);

    const formData = {
        from: cityFrom.code,
        to: cityTo.code,
        when: inputDateDepart.value,
    };

    if (formData.from && formData.to) {
        // интерполяция
        const requestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true`;

        getData(calendar + requestData, (response) => {
            renderCheap(response, formData.when);
        });
    } else {
        alert('Введите корректное название города!');
    }

});

const getLinkAviasales = (date) => {
    let link = 'https://www.aviasales.ru/search/'

    link += day < 10 ? '0' + day : day;

    const month = date.getMonth() + 1;

    link += month < 10 ? '0' 
}

getData(citiesDB, (data) => {
    city = JSON.parse(data).filter((item) => item.name);
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

const arr = [ 'Самара', 'Тюмень', 'Москва', 'Санкт-Петербург', 'Минск', 'Челябинск', 
'Керч', 'Волгоград', 'Днепропетровск', 'Екатеринбург','Ульяновск', 'Нижневартовкс', 
'Ростов-на-дону', 'Калининград', 'Нижний новгород', 'Одесса', 'Тобольск', 'Краснодар', 'Сочи'];

arr.filter((item, i, array) => {

});