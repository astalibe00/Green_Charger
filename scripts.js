// Language toggle logic
document.addEventListener('DOMContentLoaded', () => {
  const langButtons = {
    ru: document.getElementById('lang-ru'),
    uz: document.getElementById('lang-uz'),
  };
  const sections = document.querySelectorAll('[data-lang]');
  function setLang(lang) {
    sections.forEach((el) => {
      if (el.getAttribute('data-lang') === lang) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }
  // default language
  setLang('ru');
  langButtons.ru.addEventListener('click', () => setLang('ru'));
  langButtons.uz.addEventListener('click', () => setLang('uz'));
});

// Send form data to Telegram bot.  This function uses the Telegram Bot API.
function sendForm(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();
  // Telegram configuration: replace with your bot token and chat ID.
  const token = '8509335187:AAFbeBUt1B6E9wmkJRwWVqHNDhoXxW0v8IA';
  const chatId = '8509335187';
  const text = encodeURIComponent(`\u2705 Новая заявка\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`);
  // If token or chatId not provided, just display an alert and return false.
  if (!token || !chatId || token.includes('YOUR_TELEGRAM')) {
    alert('Форма отправки не настроена. Пожалуйста, укажите токен бота и chat_id в scripts.js.');
    return false;
  }
  fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`)
    .then((response) => {
      if (response.ok) {
        alert('Спасибо! Ваша заявка отправлена.');
        form.reset();
      } else {
        alert('Ошибка отправки. Пожалуйста, попробуйте позже.');
      }
    })
    .catch(() => {
      alert('Ошибка соединения. Попробуйте позже.');
    });
  return false;
}
