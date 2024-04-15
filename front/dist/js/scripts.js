/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

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

   function updateModal(modalId, eventName, place, description) {
    document.querySelector(modalId + ' .modal-body h2').innerText = eventName;
    document.querySelector(modalId + ' .item-intro').innerText = place;
    document.querySelector(modalId + ' .item-description').innerText = description;
}

// Google Sign-In function
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

document.getElementById('donationForm').onsubmit = function(e) {
    e.preventDefault(); // Prevent actual form submission
    var myModal = new bootstrap.Modal(document.getElementById('confirmationModal'), {
        keyboard: false
    });
    myModal.show();
};


// JavaScript to handle tab click and maintain yellow background on active tab - INICIATIVAS
function changeTab(tab, element) {
  // Clear all active classes
  var buttons = document.getElementsByClassName('tab-button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }
  // Add active class to the clicked button
  element.classList.add('active');
  
  // Additional code to filter events based on the tab can go here
}


