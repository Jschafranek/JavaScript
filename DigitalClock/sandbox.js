clock = document.querySelector('.clock');
day = document.querySelector('.day');

tick = () => {

    now = new Date();

    h = dateFns.format(now, 'hh');
    m = dateFns.format(now, 'mm');
    s = dateFns.format(now, 'ss');
    ampm = dateFns.format(now, 'A');

    dayOfWeek = dateFns.format(now, 'dddd');
    month = dateFns.format(now, 'MMM');
    date = dateFns.format(now, 'do');
    year = dateFns.format(now, 'YYYY');

    dHtml = `
    <span>${dayOfWeek},</span> 
    <span>${month}.</span> 
    <span>${date}</span>  
    <span>${year}</span> 
    `;

    day.innerHTML = dHtml;


    html = `
    <span>${h}</span> :
    <span>${m}</span> :
    <span>${s}</span>  
    <span>${ampm}</span> 
    `;

    clock.innerHTML = html;

};

setInterval(tick, 1000);