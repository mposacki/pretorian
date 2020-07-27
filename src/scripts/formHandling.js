import axios from 'axios'

const formSubmit = document.querySelector('#contact-form');

if (formSubmit) {

  formSubmit.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cfname'),
      email = document.getElementById('cfmail'),
      subject = document.getElementById('cfsubject'),
      content = document.getElementById('cfcontent'),
      checkbox = document.getElementById('cfrodo'),
      msgBox = document.querySelector('.form__message-box');

      if (!checkbox.checked) {
        checkbox.classList.add('form__input--error');
        e.preventDefault();
        return;
      }

    const validateEmail = email => {
      var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      return re.test(email);
    }

    if (name.checkValidity() && validateEmail(email.value) && subject.checkValidity() && content.checkValidity()) {
      const formData = new FormData();

      formData.append('name', name.value);
      formData.append('email', email.value);
      formData.append('subject', subject.value);
      formData.append('content', content.value);

      const sendData = () => {
        return axios.post(window.location.protocol + '//' + window.location.hostname + '/includes/mail.php', formData)
          .then(function (response) {
            return response.data;
          })
      }

      sendData().then((data) => {
        if (data[0] === '1') {
          const letterEl = document.createElement('span');
          letterEl.classList.add('form__error');
          letterEl.textContent = data;
          msgBox.appendChild(letterEl);
          setTimeout(function () {
            msgBox.removeChild(letterEl);
          }, 3000)
        } else {
          const letterEl = document.createElement('span');
          letterEl.classList.add('form__success');
          letterEl.textContent = data;
          msgBox.append(letterEl);
          document.querySelector('.form__submit').disabled = true;
          setTimeout(function () {
            msgBox.removeChild(letterEl);
          }, 3000)
        }
      }).catch((err) => {
        const letterEl = document.createElement('span');
        letterEl.classList.add('form__error');
        letterEl.textContent = err;
        msgBox.appendChild(letterEl);
        setTimeout(function () {
          msgBox.removeChild(letterEl);
        }, 3000)
      })
    } else {
      const letterEl = document.createElement('span');
      letterEl.classList.add('form__error');
      letterEl.textContent = 'Proszę poprawić dane';
      setTimeout(function () {
        msgBox.appendChild(letterEl);
      }, 250)
      setTimeout(function () {
        msgBox.removeChild(letterEl);
      }, 3000)
    }
  })
}
