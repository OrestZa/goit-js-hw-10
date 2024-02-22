import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', e => {
  event.preventDefault();

  const delay = Number(e.target.elements.delay.value);
  const state = e.target.elements.state.value;

  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        title: 'Ok',
        message: `✅ Fulfilled promise in ${value}ms`,
      });
    })
    .catch(value => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${value}ms`,
      });
    });
  e.target.elements.delay.value = '';
});
