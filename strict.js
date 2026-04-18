// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initMobileMenu();
  initModal();
  initForms();
  initSmoothScroll();
  initAnimateOnScroll();
});



// Мобильное меню
function initMobileMenu() {
  const burger = document.querySelector('.nav-mobile__burger');
  const mobileNav = document.querySelector('.nav-mobile__list');

  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-mobile__list .nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
      });
    });
  }
}

// Модальное окно контактов
function initModal() {
  const modal = document.getElementById('contactModal');
  const closeBtn = document.querySelector('.close');

  if (modal && closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
}

// Обработка форм
function initForms() {
  // Основная форма
  const form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Форма в модальном окне
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.querySelector('input[name="name"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const message = form.querySelector('textarea[name="message"]').value.trim();

  // Валидация
  let isValid = true;
  let errorMessage = '';

  if (!name) {
    isValid = false;
    errorMessage = 'Заполните поле "Имя"';
  } else if (!email) {
    isValid = false;
    errorMessage = 'Заполните поле "Email"';
  } else if (!isValidEmail(email)) {
    isValid = false;
    errorMessage = 'Введите корректный email-адрес';
  } else if (!message) {
    isValid = false;
    errorMessage = 'Заполните поле "Сообщение"';
  }

  if (!isValid) {
    alert(errorMessage);
    return;
  }

  // Здесь можно добавить отправку данных на сервер
  showSuccessMessage(form);

  form.reset();

  // Если это форма в модальном окне — закрываем его
  if (form.id === 'contactForm') {
    const modal = document.getElementById('contactModal');
    if (modal) modal.style.display = 'none';
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showSuccessMessage(form) {
  alert('Сообщение отправлено! Спасибо, что связались со мной.');
}

// Плавная прокрутка к якорям
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Анимация появления элементов при скролле
function initAnimateOnScroll() {
  const elements = document.querySelectorAll('.work, .about__skill-box');

  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
  });

  function checkScroll() {
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100 && !element.classList.contains('animated')) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.classList.add('animated');
      }
    });
  }

  window.addEventListener('load', checkScroll);
  window.addEventListener('scroll', checkScroll);
}