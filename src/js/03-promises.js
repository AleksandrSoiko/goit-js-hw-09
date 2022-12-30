import Notiflix from 'notiflix';

const delayValueRef = document.querySelector('input[name=delay]');
const stepValueRef = document.querySelector('input[name=step]');
const amountValueRef = document.querySelector('input[name=amount]');
const createPromiseButton = document.querySelector('button');
createPromiseButton.addEventListener('click', event => {
  event.preventDefault();
  const quantityPromise = amountValueRef.value;
  let DELAY_PROMICE = Number(delayValueRef.value);
  const STEP_PROMISE = Number(stepValueRef.value);
  startGenerationPromise(quantityPromise, DELAY_PROMICE, STEP_PROMISE);
});

function startGenerationPromise(quantity, delay, step) {
  for (let i = 0; i < quantity; i += 1) {
    setTimeout(createPromise, delay, i, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(
        `✅ Fulfilled promise ${position + 1} in ${delay}ms`
      );
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.warning(
        `❌ Rejected promise ${position + 1} in ${delay}ms`
      );
    })
    .finally(
      (delayValueRef.value = ''),
      (stepValueRef.value = ''),
      (amountValueRef.value = '')
    );
}
