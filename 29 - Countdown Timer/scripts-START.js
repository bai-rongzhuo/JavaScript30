const buttons = document.querySelectorAll('[data-time]');
const customTime = document.querySelector('#custom');
const timeLeftElem = document.querySelector('.display__time-left');
const endTimeElem = document.querySelector('.display__end-time');

let countdown;

buttons.forEach(button => button.addEventListener('click', function () {
    timer(parseInt(this.dataset.time));
}));

customTime.addEventListener('submit', function(e) {
    e.preventDefault();
    timer(this.minutes.value * 60);
    this.reset();
})


function displayTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    document.title = timerText;
    timeLeftElem.textContent = timerText;
}

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTime(seconds)
    const endTime = new Date(then);
    endTimeElem.textContent = `Be Back At ${endTime.getHours()}:${endTime.getMinutes() < 10 ? '0' : ''}${endTime.getMinutes()}:${endTime.getSeconds() < 10 ? '0' : ''}${endTime.getSeconds()}`;
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTime(secondsLeft);
    }, 1000);
}