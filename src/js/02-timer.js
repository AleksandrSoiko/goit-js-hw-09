import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const myInput = document.querySelector('#datetime-picker');
const buttonStartRef = document.querySelector('[data-start]');
const daysFieldRef = document.querySelector('[data-days]');
const hoursFieldRef = document.querySelector('[data-hours]');
const minutesFieldRef = document.querySelector('[data-minutes]');
const secondsFieldRef = document.querySelector('[data-seconds]');

buttonStartRef.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (fp.selectedDates[0].getTime() - fp.now.getTime() > 5000) {
      buttonStartRef.disabled = false;
    } else {
      buttonStartRef.disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
    }
  },
};

const fp = flatpickr(myInput, options);

buttonStartRef.addEventListener('click', timeLeftCalc);

function timeLeftCalc() {
  const setIntervalId = setInterval(() => {
    const currentTime = new Date().getTime();
    let timeLeft = fp.selectedDates[0].getTime() - currentTime;
    if (timeLeft <= 1000) {
      clearInterval(setIntervalId);
      myInput.disabled = false;
      Notiflix.Notify.success('time end : 00:00:00:00');
    }
    interfaceUpdate(convertMs(timeLeft));
  }, 1000);
  buttonStartRef.disabled = true;
  myInput.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function interfaceUpdate({ days, hours, minutes, seconds }) {
  daysFieldRef.textContent = addLeadingZero(days);
  hoursFieldRef.textContent = addLeadingZero(hours);
  minutesFieldRef.textContent = addLeadingZero(minutes);
  secondsFieldRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
