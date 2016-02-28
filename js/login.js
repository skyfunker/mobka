// Global vars container object and properties
cwpanel.ismobile = false;

// cwpanel object methods
cwpanel.login = function (user, pwd) {
    $('#btnSubmit').button('disable');
    var jqxhr = $.post(cwpanel.wrapper.ajax, { req : cwpanel.ajaxreq.login, username : user, userpwd : pwd });
    // Set another completion function for the request above
    jqxhr.always(function () {
        $('#btnSubmit').button('enable');
    });
};

cwpanel.init = function () {
    $('#btnSubmit').click(function (e) {
        cwpanel.login($('#username').val(), $('#userpwd').val());
    });
    $('#btnReset').click(function (e) {
        $('#username').val('');
        $('#userpwd').val('');
        $('#btnSubmit').button('enable');
    });
};

$(document).ready(function () {
    // Detect mobile browser
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('html').addClass('ismobile');
        cwpanel.ismobile = true;
    }
	cwpanel.init();
});