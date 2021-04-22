function openCategory(evt, idName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(idName).style.display = 'block';
    evt.currentTarget.className += " active";
    if (idName == "All") {
        limitProduct();
    }
}

function limitProduct() {
    var i = 0;
    var numItems = $('.product').length - 3;
    $('.product').each(function() {
        i++;
        if (i > numItems) {

            $(this).addClass("d-none");
        }
    });

}


$(document).ready(function() {
    $('#btnAllWork').click(function(event) {
        var options = {};
        $('.d-none').toggle("explode", options, 500);

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = ".product";
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top

        }, 200, function() {
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
        setTimeout(function() {
            if ($('#arrow').attr("dataname") == 'arrow_down') {
                $('#arrow').attr('src', 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_up_48px-128.png');
                $('#arrow').attr('dataname', 'arrow_up');
            } else {
                $('#arrow').attr('src', 'https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_keyboard_arrow_down_48px-128.png');
                $('#arrow').attr('dataname', 'arrow_down');
            }
        }, 300);

    });
    $('#sroll_on_top').click(function(event) {
        event.preventDefault();
        var hash = ".header";
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top

        }, 200, function() {
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    });
});
window.onload = function() {
    document.getElementById('btnAll').click();
    limitProduct();
    $(".title").css({ "left": "500px" }).animate({ "left": "0px" }, "slow");




};