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
