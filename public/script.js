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
window.onload = function() {
    var chartRendered = false; // To prevent multiple re-renders
    
    var config = {
        type: 'bar',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Number of Phishing Attacks',
                data: [12000, 15000, 25000, 40000, 45000, 50000],
                backgroundColor: 'rgba(60, 196, 196, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Attacks',
                        color: '#bcbcbc',
                        font: {
                            weight: 'bold',
                            size: 13
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Years',
                        color: '#bcbcbc',
                        font: {
                            weight: 'bold',
                            size: 13
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Prevalence of Phishing Attacks (2018-2023)',
                    color: '#bcbcbc',
                    font: {
                        size: 20
                    }
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                }
            }
        }
    };

    var observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting && !chartRendered) {
            chartRendered = true; // Ensure chart renders only once
            var ctx = document.getElementById('phishingPrevalenceChart').getContext('2d');
            new Chart(ctx, config);
        }
    }, {
        threshold: 0.5 // Chart will animate when 50% of it is visible
    });

    // Target the chart container
    var chartContainer = document.querySelector('.chart-container');
    observer.observe(chartContainer);
};


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






