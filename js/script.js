"use strict"
//после полной загрузки документа
document.addEventListener('DOMContentLoaded', function(){

    const inputPhone = document.querySelector("input");
    inputPhone.addEventListener("input", updateValue);
    //проверка на количество введенных символов
    function updateValue(e) {
        if ((inputPhone.value.replace(/[\D]+/g, '').length) == 11) {
            $('.button_phone').addClass('active');
            $('._error_input').css('display', 'none');
        } else {
            $('.button_phone').removeClass('active');
            $('._error_input').css('display', 'block');
        }
    }
    
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);
    //отправка формы если нет ошибок и количество символов 11
    async function formSend(e){
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);

        if (error === 0 && $('.button_phone').hasClass('active')) {
            form.classList.add('_sending');
            const response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok){
                //let result = await response.json();
                // alert(response.ok);
                form.reset();
                form.classList.remove('_sending');
            } else {
                //alert ('Ошибка!');
                form.classList.remove('_sending');
            }
        } else {
            // alert('Заполните поле правильно!');
            $('._error_input').css('display','block');
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
        // input.parentElement.classList.add('_error');
        // input.classList.add('_error');
    }

    //уберем класс _error из правильно заполненного поля
    function formRemoveError(input){
        // input.parentElement.classList.remove('_error');
        // input.classList.remove('_error');
        $('._error_input').css('display','none');
    }

    //проверка телефона
    function phoneTest(input) {
        return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
    }
});