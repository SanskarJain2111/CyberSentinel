

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


// Wait until the window loads

// Sql Injection Attack


//Notable Incident

document.querySelectorAll('.incident-event').forEach(event => {
    event.addEventListener('click', () => {
        const detailsDiv = event.querySelector('.incident-details');
        const content = event.getAttribute('data-content');

        // Collapse any other opened details
        document.querySelectorAll('.incident-details.active').forEach(activeDetail => {
            if (activeDetail !== detailsDiv) {
                activeDetail.classList.remove('active');
                activeDetail.innerHTML = ''; // Clear content when collapsing other details
            }
        });

        // Toggle current event's details
        if (detailsDiv.classList.contains('active')) {
            // Collapse the details
            detailsDiv.classList.remove('active');
            detailsDiv.innerHTML = ''; // Clear content on collapse
        } else {
            // Expand the details
            detailsDiv.classList.add('active');
            detailsDiv.innerHTML = content; // Set content when expanding
        }
    });
});


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

                    acoimg[otherIndex].src = 'Images/icon/plus.png';
                    acoimg[otherIndex].style.transform = 'rotate(0deg)';
                    otherButton.style.backgroundColor = "#fff";
                }
            });

            if (collapse.style.maxHeight) {
                collapse.style.maxHeight = null;
                acoimg[index].src = "Images/icon/plus.png";
                acoimg[index].style.transform = "rotate(90deg)";
                button.style.backgroundColor = '';
            } else {
                collapse.style.maxHeight = collapse.scrollHeight + "px";

                acoimg[index].src = "Images/icon/menus.png";
                acoimg[index].style.transform = "rotate(180deg)";
                button.style.backgroundColor = '#c1b0b5';
            }
        });
    });
});



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
