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
    // Get the canvas element
    var ctx = document.getElementById('phishingPrevalenceChart').getContext('2d');

    // Data for the chart
    var prevalenceData = {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [{
            label: 'Number of Phishing Attacks',
            data: [12000, 15000, 25000, 40000, 45000, 50000], // Example data
            backgroundColor: 'rgba(60, 196, 196, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1, 
        }]
    };

    // Configuration for the bar chart
    var config = {
        type: 'bar',
        data: prevalenceData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Attacks',
                        color: '#bcbcbc',  // Color of y-axis title
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

    // Initialize the chart
    var phishingPrevalenceChart = new Chart(ctx, config);
};



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






