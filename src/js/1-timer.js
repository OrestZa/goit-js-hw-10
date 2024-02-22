import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const daysValueEl = document.querySelector('[data-days]');
const hoursValueEl = document.querySelector('[data-hours]');
const minutesValueEl = document.querySelector('[data-minutes]');
const secondsValueEl = document.querySelector('[data-seconds]');
const startButtonEl = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectFromUserDate = selectedDates[0];

    if (selectFromUserDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'You must choose a future date',
      });
      startButtonEl.disabled = true;
    } else {
      startButtonEl.disabled = false;
    }
  },
};

const methodFlatpicrk = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startButtonEl.addEventListener('click', function () {
  const selectedDate = methodFlatpicrk.selectedDates[0];
  const currentTime = Date.now();
  let cutterTime = selectedDate - currentTime;

  const intervalOfTime = setInterval(function () {
    const { days, hours, minutes, seconds } = convertMs(cutterTime);

    daysValueEl.textContent = days >= 0 ? addLeadingZero(days) : '00';
    hoursValueEl.textContent = hours >= 0 ? addLeadingZero(hours) : '00';
    minutesValueEl.textContent = minutes >= 0 ? addLeadingZero(minutes) : '00';
    secondsValueEl.textContent = seconds >= 0 ? addLeadingZero(seconds) : '00';

    if (cutterTime <= 0) {
      clearInterval(intervalOfTime);
      iziToast.success({
        title: 'Success',
        message: 'The countdown to the selected date has ended',
      });
    }

    cutterTime -= 1000;
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startButtonEl.disabled = true;
