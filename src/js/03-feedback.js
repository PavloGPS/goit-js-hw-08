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
  //Additional requirements from Slack channel (#mentor Hryhorii Chernysh  10:13) 
  //The form should be sent only when both fields are filled
  if (!refs.inputEmail.value || !refs.inputMessage.value) {
    alert('Please fill all the fields, to submit your feedback!');
    return;
  }
  // imitation of sending form
  console.log(formDataObj);
  evt.currentTarget.reset();
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
