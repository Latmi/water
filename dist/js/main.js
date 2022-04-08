const swiper = new Swiper('.projects__swiper', {
    direction: 'horizontal',
    loop: false,
    navigation: {
        nextEl: '.projects .slider-arrow--next',
        prevEl: '.projects .slider-arrow--prev',
    },
});

const swiperNews = new Swiper('.news__swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: "auto",
    spaceBetween: 30,
    navigation: {
        nextEl: '.news .slider-arrow--next',
        prevEl: '.news .slider-arrow--prev',
    },
});

$(function () {

    const $switchGIS = $('.js-switch-gis')
    const $feedbackForm = $('.js-feedback-form')
    const $feedbackClose = $('.js-feedback-close')
    const $inputPhone = $('input[type=tel]')
    const $feedbackFormButton = $('.js-submit-button')
    const $redirectButton = $('.js-redirect-button')
    const $modalFeedback = $('.js-feedback')
    const $feedbackShow = $('.js-feedback-show')
    const $feedbackOverlay = $('.feedback__overlay')
    const $hamburger = $('.hamburger')
    const $mobileMenu = $('.header__menu_wrapper')

    $hamburger.on('click', function () {
        $(this).toggleClass('is-active')
        if ($(this).hasClass('is-active')) {
            $mobileMenu.show()
        } else {
            $mobileMenu.hide()

        }
    })

    $inputPhone.inputmask({"mask": "+7 (999) 999-99-99"});

    $switchGIS.on('click', function() {
        console.log('click')
        $(this).toggleClass('active')
        if ($(this).hasClass('active')) {
            $(this).text('Свернуть')
            $(this).prev().css('display', 'block')
        } else {
            $(this).text('Подробнее')
            $(this).prev().css('display', 'none')
        }
    })

    $feedbackClose.on('click', function () {
        $('body').css({height: 'unset', overflow: 'unset'})
        $modalFeedback.removeClass('feedback--show')
    })

    $feedbackForm.on('submit', function (e) {
        e.preventDefault()

        const formData = new FormData($(this)[0])

        fetch('feedback.php', {
            method: 'post',
            body: formData,
        }).then(response => {
            if (response.data.send === 'OK') {

            }
        }).catch(error => {

            $feedbackFormButton.css('display', 'none')
            $feedbackOverlay.css('display', 'flex')
            $redirectButton.css('display', 'block')
            console.info(error)
        })

    })

    $redirectButton.on('click', function () {
        $feedbackClose.trigger('click')
    })

    $feedbackShow.on('click', function () {
        $('body').css({height: '100vh', overflow: 'hidden'})
        $modalFeedback.addClass('feedback--show')
    })

})

