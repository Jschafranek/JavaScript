const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // const cityDetail = data.cityDetail;
    // const weather = data.weather;

    //destrctured properties ^^^
    const { cityDetail, weather } = data;

    //update the details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetail.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
    `;

    //update night & day image and icons

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' :'img/night.svg';
    time.setAttribute('src', timeSrc);

    //remove d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {

    const cityDetail = await getCity(city);
    const weather = await getWeather(cityDetail.Key);

    return {cityDetail, weather};

};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update user interface with new city
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

});