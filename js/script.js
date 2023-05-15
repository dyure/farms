"use strict"
//после полной загрузки документа
document.addEventListener('DOMContentLoaded', function(){
    //объявляем переменную form, в которую помещаются все поля формы
    const form = document.getElementById('form');
    //отслеживаем нажатие кнопки и передаем работу в функцию formSend
    form.addEventListener('submit', formSend);

    async function formSend(e){
        //запрещение стандартной обработки формы
        e.preventDefault();
        //функция валидации полей
        let error = formValidate(form);
        //получим данные формы
        let formData = new FormData(form);

        if (error === 0) {
            //если все ок, добавим класс _sending, который скроет форму и добавит анимированную картинку
            form.classList.add('_sending');
            const response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok){
                //let result = await response.json();
                alert(response.ok);
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert ('Ошибка!');
                form.classList.remove('_sending');
            }
        } else {
            alert('Заполните поле правильно!');
        }
    }

    function formValidate(form) {
        let error = 0;
        //поместим в переменную formRequired все обязательные поля (с классом _required)
        let formRequired = document.querySelectorAll('._required');
        //цикл по обязательным полям
        for (let index = 0; index < formRequired.length; index++){
            const input = formRequired[index];
            formRemoveError(input);
            if (input.classList.contains('input_phone')) {
                if (phoneTest(input)){
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    //добавим класс _error не правильно заполненному полю
    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    //уберем класс _error из правильно заполненного поля
    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    //проверка телефона
    function phoneTest(input) {
        return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
    }
});