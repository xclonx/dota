$('.owl-carousel').owlCarousel({
    margin:14,
    nav:true,
    navText:true,
    slideBy:4,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        1000:{
            items:4
        }
    }
});


$('.mobile-menu-activate').click(function () {
    $('#mobile-menu').slideToggle();
    $('body').toggleClass('oflow-hid');
});

function Auth()
{
    var server = $('#game-server').val();
    var unickname = $('#user-login').val();
    var upassword = $('#user-password').val();
    var code = $('#code-security').val();
    var cresponse = grecaptcha.getResponse();
    $.post("/cabinet/login", {
        server: "" + server + "",
        nickname: "" + unickname + "",
        password: "" + upassword + "",
        code: "" + code + "",
        grecaptcharesponse: "" + cresponse + ""
    })
        .done(function (data) {
            //alert(data);
            if (data == "incorrect_nickname") {
                $("#infomessage").text("Указан недопустимый ник!");
            }
            else if (data == "incorrect_password") {
                $("#infomessage").text("Указан недопустимый пароль!");
            }
            else if (data == "incorrect_code") {
                $("#infomessage").text("Недопустимый код безопасности!");
            }
            else if (data == "invalid_nickname") {
                $("#infomessage").text("Аккаунт не существует!");
            }
            else if (data == "invalid_password") {
                $("#infomessage").text("Указан неверный пароль!");
            }
            else if (data == "invalid_code") {
                $("#infomessage").text("Указан неверный код безопасности!");
            }
            else if (data == "no_captcha") {
                $("#infomessage").text("Пройдите проверку каптчи!");
            }
            else if (data == "invalid_captcha") {
                $("#infomessage").text("Проверка каптчи пройдена неверно!");
            }
            else if (data == "error_session_init") {
                $("#infomessage").text("Ошибка инициализации сессии");
            }
            else if (data == "user_authorized") {
                $("#infomessage").text("Вы уже авторизованы!");
                window.location = "/cabinet/";
            }
            else if (data == "success_login") {
                window.location = "/cabinet/";
            }
            if (data != "success_login") {
                $(".warning").stop(true, true).show().fadeOut(4000, function () {
                    $(this).hide();
                });
            }
        });
}
