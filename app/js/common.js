$(function() {

    //parallax
    $(".s-features").parallax({imageSrc: './img/bg2.jpg'});

    //EqualHeight
    $(".item-text").equalHeights();

    $(".js-button").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $("#catalog").offset().top
        }, 700)
    });

	//Magnific Popup
    var portfolioItem = $('.portfolio-item');
    portfolioItem.each(function (e) {
        var th = $(this);
        th.attr('href', '#portfolio-img-' + e)
            .find('.portfolio-popup')
            .attr('id', 'portfolio-img-' + e);
    });
    portfolioItem.magnificPopup({
        mainClass: 'my-mfp-zoom-in',
        removalDelay: 300,
        type: 'inline'
    });

    var callBack = $('a[href="#callback"]');
    callBack.magnificPopup({
        mainClass: 'my-mfp-zoom-in',
        removalDelay: 300,
        type: 'inline'
    });
    callBack.on('click', function () {
        var dataForm = $(this).data('form');
        var dataText = $(this).data('text');
        $('.form-callback h4').text(dataText);
        $('.form-callback [name=admin-data]').val(dataForm);
    });
    $('.popup-youtube').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    //Owl Carousel
    var owlTes = $('.carousel-testimonials');
    owlTes.owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        margin: 10,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
            0: {
                items: 1
            }
        }
    });
    owlTes.on('mousewheel', '.owl-stage', function (e) {
        if (e.deltaY > 0) {
            owlTes.trigger('prev.owl');
        } else {
            owlTes.trigger('next.owl');
        }
        e.preventDefault();
    });

		//Replace all SVG images with inline SVG
    $('img.img-svg').each(function () {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');
            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    //E-mail Ajax Send
    $('form').submit(function () { //Change
        var th = $(this);
        $.ajax({
            type: 'POST',
            url: 'mail.php', //Change
            data: th.serialize()
        }).done(function () {
            $.magnificPopup.close();
            setTimeout(function () {
                // Done Functions
                $('.success, #js-overlay').fadeIn(500);
                th.trigger('reset');
            }, 1000);
            setTimeout(function () {
                // Done Functions
                $('.success, #js-overlay').fadeOut(500);
                th.trigger('reset');
            }, 2000);
        });
        return false;
    });
});
