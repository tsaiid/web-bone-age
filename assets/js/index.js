$(function() {
    $().tab;

    function show_image(img_url) {
        $('#bone-age-img').fadeOut(100, function() {
            $('#bone-age-img').html(function() {
                return '<img src="' + img_url + '" alt="">';
            });
            $(this).fadeIn(100);
        });
    }

    $(':radio').change(function() {
        var img_url = $(this).val();
        //alert($(this).val());
        show_image(img_url);
    });

    // Hot Keys
    $(document).keydown(function(event) {
        // get current position
        var cur_tab = $('#myTab > li.active');
        var cur_tab_id = cur_tab.find('a').attr('id');
        //alert(cur_tab.find('a').attr('id'));
        //return;
        var cur_pos = $('.' + cur_tab_id).find(':radio:checked');
        //alert(cur_pos.val());

        switch (event.which) {
            case 37: // left
                event.preventDefault();
                $('#tabFemale').click();
                // update image
                show_image($('.tabFemale').find(':radio:checked').val());
                break;
            case 38: // up
                event.preventDefault();
                if (cur_pos.length) {
                    var prv_pos = cur_pos.parent().parent().prev().find('input').first();
                    if (prv_pos.length) {
                        prv_pos.click();
                    }
                }
                break;
            case 39: // right
                event.preventDefault();
                $('#tabMale').click();
                // update image
                show_image($('.tabMale').find(':radio:checked').val());
                break;
            case 40: // down
                event.preventDefault();
                if (cur_pos.length) {
                    var nxt_pos = cur_pos.parent().parent().next().find('input').first();
                    if (nxt_pos.length) {
                        nxt_pos.click();
                    }
                }
                break;
        }
    });

    // preload images
    $(':radio').each(function() {
        $('<img/>')[0].src = $(this).val();
    });

    // select default radio
    $('#male').find(':radio').first().click();
    $('#female').find(':radio').first().click();
});
