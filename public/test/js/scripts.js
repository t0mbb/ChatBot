/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 15,
    initialSlide: 2
});

document.getElementById('slide-0').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('services').scrollIntoView({ });
    setTimeout(() => swiper.slideTo(0), 450);
});

document.getElementById('slide-1').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('services').scrollIntoView({ });
    setTimeout(() => swiper.slideTo(1), 450);
});

document.getElementById('slide-2').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('services').scrollIntoView({  });
    setTimeout(() => swiper.slideTo(2), 450);
});


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
document.getElementById('time').addEventListener('keydown', function(event) {
    event.preventDefault();
});


document.getElementById('addcart').addEventListener('click', function() {
    var quantity = document.querySelector('#inputQuantity').value;
    document.querySelector('#quantity').value = quantity;

    var size = document.querySelector('#inputSize').value;
    document.querySelector('#size').value = size;
    
    var totalPrice = quantity * 350000;
    var formatter = new Intl.NumberFormat('vi-VN');

    document.getElementById('totalPrice').textContent = formatter.format(totalPrice) + " VND";
});
flatpickr(".flatpickr", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
});
