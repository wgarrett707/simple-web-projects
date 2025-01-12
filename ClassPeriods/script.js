NORMAL_SCHEDULE = [
    {date: new Date(2022, 0, 1, 0, 0), name: 'Before School'},
    {date: new Date(2022, 0, 1, 7, 40), name: 'AP Physics'},
    {date: new Date(2022, 0, 1, 8, 35), name: 'AP Language and Composition'},
    {date: new Date(2022, 0, 1, 9, 30), name: 'COMPASS'},
    {date: new Date(2022, 0, 1, 10, 10), name: 'AP European History'},
    {date: new Date(2022, 0, 1, 11, 5), name: 'Homeroom/Lunch'},
    {date: new Date(2022, 0, 1, 12, 0), name: 'Japanese'},
    {date: new Date(2022, 0, 1, 12, 55), name: 'Adventure Education'},
    {date: new Date(2022, 0, 1, 13, 50), name: 'Integerated Mathematics'},
    {date: new Date(2022, 0, 1, 14, 45), name: 'School is Over'}]

WEDS_SCHEDULE = [
    {date: new Date(2022, 0, 1, 0, 0), name: 'Before School'},
    {date: new Date(2022, 0, 1, 9, 40), name: 'AP Physics'},
    {date: new Date(2022, 0, 1, 10, 24), name: 'AP Language and Composition'},
    {date: new Date(2022, 0, 1, 11, 8), name: 'AP European History'},
    {date: new Date(2022, 0, 1, 11, 52), name: 'Homeroom/Lunch'},
    {date: new Date(2022, 0, 1, 12, 36), name: 'Japanese'},
    {date: new Date(2022, 0, 1, 13, 20), name: 'Adventure Education'},
    {date: new Date(2022, 0, 1, 14, 4), name: 'Integerated Mathematics'},
    {date: new Date(2022, 0, 1, 14, 48), name: 'School is Over'}]

CLASSROOM_LINKS = [
    '#',
    'https://classroom.google.com/u/1/c/NDQzNjE4MDY1ODk0',
    'https://classroom.google.com/u/1/c/Mzc3MjIxNjg1MjY3',
    'https://classroom.google.com/u/1/c/Mzc3MjIwNTY0OTQz',
    'https://classroom.google.com/u/1/c/NDQzNjE4ODcyNTI3',
    '#',
    'https://classroom.google.com/u/1/c/Mzc3MjIyNDc5MjQw',
    'https://classroom.google.com/u/1/c/NDQzNTg4NTI3NTc1',
    'https://classroom.google.com/u/1/c/Mzc3MjIyNDUzNDY3',
    '#'
]

CALENDARS = [
    '#',
    'https://docs.google.com/document/d/14AeOFXkyi19VgPpYQhmKT7F2_EYxOJyKx7McMLwhh1Q/edit',
    'https://docs.google.com/document/d/1hA_tGoWDrw7ZLrpy9urqmjovMu9HTHNPJ0dyr3ZSBeQ/edit',
    '#',
    '#', // ap euro calendar changes every week
    '#',
    '#',
    '#',
    '#', // math calendar changes every week
    '#'
]

function setSpans(value) {
    value = value.toString()
    if (value.length == 1) {
        value = '0' + value;
    }
    return value;
}

function updateClock() {
    const DATE = new Date();

    // testing purposes
    // DATE.setHours(8);
    // DATE.setMinutes(DATE.getMinutes() + 27);

    let hour = DATE.getHours();
    let min = DATE.getMinutes();
    let sec = DATE.getSeconds();

    let hourSpan = document.getElementById('hour');
    let minSpan = document.getElementById('min');
    let secSpan = document.getElementById('sec');

    secSpan.innerHTML = setSpans(sec);
    minSpan.innerHTML = setSpans(min);
    hourSpan.innerHTML = setSpans(hour > 12 ? hour - 12 : hour);

    CURRENT_TIME = new Date(2022, 0, 1, hour, min, sec);

    let schedule;
    let periodLength;
    if (DATE.getDay() == 3) {
        schedule = WEDS_SCHEDULE;
        periodLength = 39
    } else {
        schedule = NORMAL_SCHEDULE;
        periodLength = 50
    }

    let currentClass = '';
    let classNum = -1;
    for (const e of schedule) {
        if (CURRENT_TIME >= e.date) {
            currentClass = e;
            classNum++
            // COMPASS is the 4th in the "normal schedule" but we need to skip it in the wednesday schedule. Otherwise, calendar, classroom, etc. links will not work.
            if (schedule == WEDS_SCHEDULE && classNum == 3) {
                classNum++
            }
        }
    }

    if (classNum == 3) {
        periodLength = 35
    }

    const MS_IN_MIN = 60000 // milliseconds in a minute
    // the percentage of how much of the class is done
    const BAR_WIDTH = (CURRENT_TIME - currentClass.date - (MS_IN_MIN * 5)) / (periodLength * MS_IN_MIN) * 100;

    let progress = document.getElementById('classBarProgress');

    // makes sure the bar isn't negative (passing period) or overflowing, and that school is still actively going on.
    if ((0 < BAR_WIDTH && BAR_WIDTH <= 100) && !(currentClass.name == 'School is Over' || currentClass.name == 'Before School')) {
        progress.style.width = BAR_WIDTH + '%';
        progress.style.backgroundColor = 'green';
    } else {
        progress.style.width = '100%'
        progress.style.backgroundColor = 'firebrick';
    }

    document.getElementById('className').innerHTML = currentClass.name;
    document.getElementById('googClass').href = CLASSROOM_LINKS[classNum];
    document.getElementById('calendar').href = CALENDARS[classNum];
}

function initClock() {
    updateClock();
    repeatClock = window.setInterval('updateClock()', 1000);
}

function toggleNav() {
    let nav = document.getElementById('resourcesPanel');
    console.log(nav.children)
    for (e of nav.children) {
        console.log(e)
        e.classList.toggle('openNav');
    }
}