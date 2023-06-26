"use strict";

document.addEventListener('DOMContentLoaded', () => {
    $('.input_phone').inputmask({
        "mask" : "+7 (999) 999-99-99"
    });

    let forms = document.getElementsByTagName('form');
    for (let i = 0; i < forms.length; i++) {
        const buttonID = '#button_phone' + forms[i][0].id;
        const inputPhone = document.getElementById(forms[i][0].id);
        const inputCheck = document.getElementById(forms[i][3].id);
        //
        inputPhone.oninput = function() {
            if ((inputPhone.value.replace(/[\D]+/g, '').length) == 11 && inputCheck.checked === true) {
                $(buttonID).addClass('active');
            } else {
                $(buttonID).removeClass('active');
            }
        }
        inputCheck.onchange = function() {
            if ((inputPhone.value.replace(/[\D]+/g, '').length) == 11 && inputCheck.checked === true) {
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
            const response = await fetch('https://lineferm.ru/sendmail.php', {
                method: 'POST',
                body: formData
            });

            let curWidth = $(window).width();
            if (curWidth > '1199') curWidth = 370;
            if (curWidth <= '1199' && curWidth > '767') curWidth = 350;
            if (curWidth <= '767' && curWidth > '575') curWidth = 294;
            if (curWidth < '575') curWidth = 375;            
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
                    $('#form_text_first' + ID).html('Мы свяжемся с вами в течение рабочего&nbsp;дня');
                    $('#form_text_last' + ID).css('display', 'none');
                    $('#parallax_out' + ID).css('height', curWidth + 'px');
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

$(document).on('ready', () => {
    $('.slider').slick({
        slidesToShow:1,
        slidesToScroll:1,
        arrows:true,
        dots:true,
        variableWidth:false,
        responsive:[
            {
                breakpoint:1200,
                settings:{
                    arrows:false,
                    variableWidth:true,
                }
            },
            {
                breakpoint:768,
                settings:{
                    arrows:false,
                    variableWidth:true,
                }
            }
        ]
    });
    $('.slider').on('afterChange', function(){
        $('.last_slide').css('display','grid');
    });

    $('.quest').on('click', function () {
        $(this).toggleClass('active').next().slideToggle();
        $('.quest').not(this).removeClass('active').next().slideUp();
    });

    function windowSize(){
        if ($(window).width() <= '575'){
            $('.mySwiper').attr('slides-per-view', 'auto');
        } else {
            $('.mySwiper').attr('slides-per-view', '2');
        }
    }

    $(window).on('load resize', windowSize);

    $(".soundoff").on('click', function () {
        if( $(this).parent().find("video").prop('muted') ) {
            $('.soundoff').html('<img src="https://lineferm.ru/wp/wp-content/themes/d5/img/on.png" alt="" />');
            $(this).parent().find("video").prop('muted', false);
        } else {
            $('.soundoff').html('<img src="https://lineferm.ru/wp/wp-content/themes/d5/img/off.png" alt="" />');
            $(this).parent().find("video").prop('muted', true);
        }
    });

    $('.consult').on('click', () => {
        $('.dm-overlay').css('display', 'block');
    });
    $('.close').on('click', () => {
        $('.dm-overlay').css('display', 'none');
    });
});