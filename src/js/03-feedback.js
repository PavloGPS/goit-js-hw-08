import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('form.feedback-form'),
  inputEmail: document.querySelector('input[name="email"]'),
  inputMessage: document.querySelector('textarea[name="message"]'),
};
const LOCALSTORAGE_KEY = 'feedback-form-state';
const formDataObj = {};

fillFormData();

// Event delegation:
refs.feedbackForm.addEventListener(
  'input',
  throttle(evt => {
    formDataObj.email = refs.inputEmail.value;
    formDataObj.message = refs.inputMessage.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formDataObj));
  }, 500)
);

refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);

function onFeedbackFormSubmit(evt) {
  evt.preventDefault();
  // imitation of sending form
  console.log('Sending data:', formDataObj);
  evt.currentTarget.reset();
  console.log(evt.currentTarget);

  localStorage.removeItem(LOCALSTORAGE_KEY);
}

function fillFormData() {
  const savedData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (savedData) {
    formDataObj.email = savedData.email;
    formDataObj.message = savedData.message;
    refs.inputEmail.value = formDataObj.email;
    refs.inputMessage.value = formDataObj.message;
  }
}
