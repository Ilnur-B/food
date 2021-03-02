document.addEventListener("DOMContentLoaded", () => {
  //Tabs

  let tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    tabParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    //  в скобках - параметр по умолчанию
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }
  hideTabContent();
  showTabContent();

  tabParent.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          //если эл-т по которому кликнули = эл-ту находящемуся в псевдомассиве
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer

  const finish = "2021-05-20";

  function getTimeRemaining(deadline) {
    //высчитывается время до дедлайнаб в массив записываются преобразованные из мсек числа
    const total = Date.parse(deadline) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      hours = Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((total / (1000 * 60)) % 60),
      seconds = Math.floor((total / 1000) % 60);

    return {
      total: total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function zero(num) {
    // добавляется 0 если число из массива состоит из одного символа
    if (num > 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock(); // обновляет таймер до момента установки интервала

    function updateClock() {
      //записывает в таймер  значения из массива
      const t = getTimeRemaining(finish);

      days.innerHTML = zero(t.days); //значение из фукции с добавлением 0
      hours.innerHTML = zero(t.hours);
      minutes.innerHTML = zero(t.minutes);
      seconds.innerHTML = zero(t.seconds);
      if (t.total <= 0) {
        //условие остановки таймера
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", finish);

  //modal

  const modalBtns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function modalShow() {
    modal.classList.add("show", "fade");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden"; //чтобы не прокручивалась страница если открыто окно
    clearInterval(modalTimeId);
  }

  modalBtns.forEach((item) => {
    item.addEventListener("click", modalShow);
  });

  function modalClose() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
  modal.addEventListener("click", (e) => {
    //закрытие окна при нажатии на свободное пространство(обёртку)
    if (e.target == modal || e.target.classList.contains("modal__close")) {
      modalClose();
    }
  });
  document.addEventListener("keydown", (e) => {
    //закрытие окна при нажатии esc(если окно показано)
    if (e.code == "Escape" && modal.classList.contains("show")) {
      modalClose();
    }
  });

  const modalTimeId = setTimeout(modalShow, 50000);

  function showModalByScroll() {
    //показ окна при долистывании до конца страницы с последующим удалением этого события
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      //   document.documentElement.scrollHeight
      4000
    ) {
      modalShow();
      window.removeEventListener("scroll", showModalByScroll);
      console.log(document.documentElement.scrollHeight);
      console.log(window.pageYOffset + document.documentElement.clientHeight);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  // cards

  class MenuCards {
    constructor(src, alt, title, text, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.text = text;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.taransfer = 27;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.taransfer * this.price;
    }
    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        //добавление дефолтного класса если в рест аргумент ничего не передано
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
                ${this.text}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>`;
      this.parent.append(element);
    }
  }
  const newCard = new MenuCards(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
  );
  newCard.render();

  new MenuCards(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    'Меню "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    ".menu .container"
  ).render();

  new MenuCards(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    21,
    ".menu .container"
  ).render();

  //POST

  const forms = document.querySelectorAll("form");
  const messages = {
    //объект с сообщениями о статусе
    loading: "img/form/spinner.svg",
    succes: "данные отправлены, с Вами свяжутся",
    failure: "что-то пошло не так",
  };

  forms.forEach((item) => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener("submit", (e) => {
      //событие сабмита формы
      e.preventDefault();
      const statusMessage = document.createElement("img"); //добавление спинера в момент отправки данных
      statusMessage.src = messages.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      // form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage); //добавление спинера без поломки верстки
      const request = new XMLHttpRequest(); //отправки данных на сервер в формате JSON
      request.open("POST", "js/server.php");
      request.setRequestHeader("Content-type", "application/json");
      const formData = new FormData(form);
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      const json = JSON.stringify(object);
      request.send(json);
      console.log(formData);

      request.addEventListener("load", () => {
        //событие успешной отправки
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(messages.succes); //вызывается функция показа нового окна
          form.reset();
          statusMessage.remove();
        } else {
          showThanksModal(messages.failure);
        }
      });
    });
  }

  // функция показ благодарственного окна

  function showThanksModal(message) {
    const prevModal = document.querySelector(".modal__dialog");
    prevModal.classList.add("hide"); //удаление первичного окна

    modalShow(); //создание нового окна с добавлением тех же классов
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    document.querySelector(".modal").append(thanksModal);

    setTimeout(() => {
      //сброс нового окна и показ старого по таймауту
      thanksModal.remove();
      prevModal.classList.add("show");
      prevModal.classList.remove("hide");
      modalClose();
    }, 4000);
  }
});
