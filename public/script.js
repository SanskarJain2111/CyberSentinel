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


//Signs of Compromise
$('.compro-slider').slick({
    arrows:false,
    dots: true,
    infinite: false,
    autoplay: true,
    speed: 300,
    slideshow: 4,
    slidesToScroll: 1,
    responsive:[{
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
        }
    },
    {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
        }
    },
    {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        }
    }

]
})






