// side bar start

function openNav(){
    'use strict';
    const sidepanel = document.getElementById('mySidepanel');
    if(sidepanel){
        sidepanel.style.left = '0';
    }else{
        console.error('error: side panel not found');
    }
}

function closeNav(){
    'use strict';
    const sidepanel = document.getElementById('mySidepanel');
    if(sidepanel){
        sidepanel.style.left = '-320px';
    }else{
        console.error('error: side panel not found');
    }
}

function open_search(){
    'use strict';
    const searchpanel = document.getElementById('search-bar');
    if(searchpanel){
        searchpanel.style.height = '100vh';
        searchpanel.style.borderRadius = '0';
    }else{
        console.error('error: search panel not found');
    }
}

function close_search(){
    'use strict';
    const searchpanel = document.getElementById('search-bar');
    if(searchpanel){
        searchpanel.style.height = '0';
        searchpanel.style.borderTopLeftRadius = '100%';
        searchpanel.style.borderTopRightRadius = '100%';
    }else{
        console.error('error: search panel not found');
    }
}


document.addEventListener('DOMContentLoaded', function() {
        let accordionButtons = document.querySelectorAll('.accordion-button');
        let acoimg = document.querySelectorAll('.accordion-button img');

        accordionButtons.forEach(function(button, index) {
            button.addEventListener('click', function() {
                let collapse = this.parentElement.nextElementSibling;

                accordionButtons.forEach(function(otherButton, otherIndex) {
                    if (otherButton !== button) {
                        let otherCollapse = otherButton.parentElement.nextElementSibling;
                        otherCollapse.style.maxHeight = null;

                        acoimg[otherIndex].src = '/Images/icon/plus.png';
                        acoimg[otherIndex].style.transform = 'rotate(0deg)';
                        otherButton.style.backgroundColor = "#fff";
                    }
                });

                if (collapse.style.maxHeight) {
                    collapse.style.maxHeight = null;
                    acoimg[index].src = "/Images/icon/plus.png";
                    acoimg[index].style.transform = "rotate(90deg)";
                    button.style.backgroundColor = '';
                } else {
                    collapse.style.maxHeight = collapse.scrollHeight + "px";

                    acoimg[index].src = "/Images/icon/menus.png";
                    acoimg[index].style.transform = "rotate(180deg)";
                    button.style.backgroundColor = '#c1b0b5';
                }
            });
        });
    });


//Scroll to top
let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let progressRing = document.querySelector("#progress-ring circle");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);

    // Display scroll percentage
    progressValue.textContent = `${scrollValue}%`;

    // Show or hide scroll button
    if (pos > 100) {
      scrollProgress.style.display = "grid";
    } else {
      scrollProgress.style.display = "none";
    }

    // Calculate offset based on scroll percentage
    let offset = 188.4 - (scrollValue / 100) * 188.4;
    progressRing.style.strokeDashoffset = offset;

    // Scroll to top functionality
    scrollProgress.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;
