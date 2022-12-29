const bodyDocumentRef = document.querySelector('body');
const buttonStartChangeThemeRef = document.querySelector('[data-start]');
const buttonStopChangeThemeRef = document.querySelector('[data-stop]');

buttonStartChangeThemeRef.addEventListener('click', () => {
  const setIntervalId = setInterval(() => {
    bodyDocumentRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStartChangeThemeRef.disabled = true;
  buttonStopChangeThemeRef.addEventListener('click', () => {
    clearInterval(setIntervalId);
    buttonStartChangeThemeRef.disabled = false;
  });
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
