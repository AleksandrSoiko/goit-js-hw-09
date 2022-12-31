import Notiflix, { Notify } from 'notiflix';

const delayValueRef = document.querySelector('input[name=delay]');
const stepValueRef = document.querySelector('input[name=step]');
const amountValueRef = document.querySelector('input[name=amount]');
const createPromiseButton = document.querySelector('button');
const ARRAY = [];
let testQuantity = 0;
createPromiseButton.addEventListener('click', event => {
  if (
    delayValueRef.value !== '' &&
    stepValueRef.value !== '' &&
    amountValueRef.value !== ''
  ) {
    event.preventDefault();
    const quantityPromise = amountValueRef.value;
    testQuantity = quantityPromise;
    let DELAY_PROMICE = Number(delayValueRef.value);
    const STEP_PROMISE = Number(stepValueRef.value);
    startGenerationPromise(quantityPromise, DELAY_PROMICE, STEP_PROMISE);
  } else {
    Notiflix.Notify.warning('Please fill in all the fields!!!');
  }
});

function startGenerationPromise(quantity, delay, step) {
  toNotActiveInputElement();
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
    .finally(() => {
      ARRAY.push(promise);
      if (Number(testQuantity) === ARRAY.length) {
        promiseAllResult([...ARRAY]);
      }
    });
}

function toActiveInputElement() {
  createPromiseButton.disabled = false;
  delayValueRef.disabled = false;
  stepValueRef.disabled = false;
  amountValueRef.disabled = false;
}

function toNotActiveInputElement() {
  createPromiseButton.disabled = true;
  delayValueRef.disabled = true;
  stepValueRef.disabled = true;
  amountValueRef.disabled = true;
}

function promiseAllResult(array) {
  Promise.all(array)
    .then(() => {})
    .catch(() => {})
    .finally(() => {
      toActiveInputElement();
      ARRAY.splice(0, ARRAY.length - 1);
    });
}
