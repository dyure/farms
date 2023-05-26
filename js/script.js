"use strict";

document.addEventListener('DOMContentLoaded', () => {
    $('.input_phone').inputmask({
        "mask" : "+7 (999) 999-99-99"
    });

    let forms = document.getElementsByTagName('form');
    for (let i = 0; i < forms.length; i++) {
        const buttonID = '#button_phone' + forms[i][0].id;
        const inputPhone = document.getElementById(forms[i][0].id);
        inputPhone.oninput = function() {
            if ((inputPhone.value.replace(/[\D]+/g, '').length) == 11) {
                $(buttonID).addClass('active');
            } else {
                $(buttonID).removeClass('active');
            }
        }
    }

    const form1 = document.getElementById('form1');
    form1.addEventListener('submit', formSend);
    const form2 = document.getElementById('form2');
    form2.addEventListener('submit', formSend);
    const form3 = document.getElementById('form3');
    form3.addEventListener('submit', formSend);
    const form4 = document.getElementById('form4');
    form4.addEventListener('submit', formSend);
    
    async function formSend(e){
        e.preventDefault();
        let formData;
        const ID = e.srcElement[0].id;
        switch(ID){
            case '1':
                formData = new FormData(form1);
            break;
            case '2':
                formData = new FormData(form2);
            break;
            case '3':
                formData = new FormData(form3);
            break;
            case '4':
                formData = new FormData(form4);
            break;
        }
        
        if ($('#button_phone' + ID).hasClass('active')) {
            $('#form' + ID).addClass('_sending');
            const response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok){
                $('#form' + ID).removeClass('_sending');
                if (ID == 1 || ID == 4) {
                    $('#success1').addClass('active');
                    $('#success4').addClass('active');
                    $('.form_phone').addClass('unactive');
                    $('#form_title1').html('Ваша заявка успешно<br>отправлена');
                    $('#form_title4').html('Ваша заявка успешно<br>отправлена');
                } else {
                    $('#success' + ID).addClass('active');
                    $('#form2').addClass('unactive');
                    $('#form3').addClass('unactive');
                    $('#form_title' + ID).html('Ваша заявка успешно<br>отправлена');
                }
            } else {
                $('#form' + ID).removeClass('_sending');
                $('#button_phone' + ID).removeClass('active');
            }
        } else {
            $('#error_input' + ID).addClass('active');
        }
    }
});