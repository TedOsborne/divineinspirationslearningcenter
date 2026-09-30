;(function ($) {

    "use strict";

    $(document).ready(function () {
        $('.pxl-date input').datetimepicker({
            timepicker: true,
            format:'H:i - F j, Y'
        });  
    });

})(jQuery);