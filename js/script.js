"use strict";

//после полной загрузки документа
document.addEventListener('DOMContentLoaded', function(){
    document.addEventListener('click', e => {
        if(e.target.closest('input') != null){
            $('.input_phone').inputmask({
                "mask" : "+7 (999) 999-99-99"
            });
            //id input по которому кликнули
            const clicked = e.target.closest('input');
            const inputID = $(clicked).attr('id');
            //alert(clicked);
            //id сообщения об ошибке
            const errorID = '#error_input' + inputID;
            //id кнопки
            const buttonID = '#button_phone' + inputID;
            //id формы
            const formID = 'form' + inputID;
            //создаем реакцию на ввод каждого символа
            const inputPhone = document.getElementById(inputID);
            //функция подсчета количества введенных символов
            inputPhone.oninput = function() {
                if ((inputPhone.value.replace(/[\D]+/g, '').length) == 11) {
                    $(buttonID).addClass('active');
                    $(errorID).removeClass('active');
                } else {
                    $(buttonID).removeClass('active');
                    $(errorID).addClass('active');
                }
            }
        
            const form = document.getElementById(formID);
            //перехватываем нажатие кнопки
            form.addEventListener('submit', formSend);
            //отправка формы если нет ошибок и количество символов 11
            async function formSend(e){
                e.preventDefault();
                let error = formValidate(form);
                let formData = new FormData(form);
        
                if (error === 0 && $(buttonID).hasClass('active')) {
                    form.classList.add('_sending');
                    const response = await fetch('sendmail.php', {
                        method: 'POST',
                        body: formData
                    });
                    
                    if (response.ok){
                        //let result = await response.json();
                        // alert(response.ok);
                        //form.reset();
                        form.classList.remove('_sending');
                        //$(buttonID).removeClass('active');
                        $('.form_phone').addClass('unactive');
                        $('.success').addClass('active');
                        $('.form_title').html('Ваша заявка успешно<br>отправлена');
                    } else {
                        //alert ('Ошибка!');
                        form.classList.remove('_sending');
                        $(buttonID).removeClass('active');
                    }
                } else {
                    // alert('Заполните поле правильно!');
                    $(errorID).addClass('active');
                }
            }
            function formValidate(form) {
                let error = 0;
                //поместим в переменную formRequired все обязательные поля (с классом _required)
                let formRequired = form.querySelectorAll('._required');
                //цикл по обязательным полям
                for (let index = 0; index < formRequired.length; index++){
                    const input = formRequired[index];
                    formRemoveError(input);
                    if (input.classList.contains('input_phone')) {
                        if (phoneTest(input)){
                            //formAddError(input);
                            error++;
                        }
                    } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                        formAddError(input);
                        error++;
                    } else {
                        if (input.value === '') {
                            //formAddError(input);
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
                $(errorID).removeClass('active');
            }
        
            //проверка телефона
            function phoneTest(input) {
                return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
            }
        }
    });
});