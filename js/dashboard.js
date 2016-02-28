$(document).ready(function(){
    
    /* --------------------------------------------------------
        Growl Function
    -----------------------------------------------------------*/
    function notify(from, align, icon, type, animIn, animOut, title, message){
       $.growl({
           icon: icon,
           title: title || 'Bootstrap Growl ',
           message: message || 'Turning standard Bootstrap alerts into awesome notifications',
           url: ''
       },{
               element: 'body',
               type: type,
               allow_dismiss: true,
               placement: {
                       from: from,
                       align: align
               },
               offset: {
                   x: 20,
                   y: 85
               },
               spacing: 10,
               z_index: 1031,
               delay: 2500,
               timer: 1000,
               url_target: '_blank',
               mouse_over: false,
               animate: {
                       enter: animIn,
                       exit: animOut
               },
               icon_type: 'class',
               template: '<div data-growl="container" class="alert" role="alert">' +
                               '<button type="button" class="close" data-growl="dismiss">' +
                                   '<span aria-hidden="true">&times;</span>' +
                                   '<span class="sr-only">Close</span>' +
                               '</button>' +
                               '<span data-growl="icon"></span>' +
                               '<span data-growl="title"></span>' +
                               '<span data-growl="message"></span>' +
                               '<a href="#" data-growl="url"></a>' +
                           '</div>'
       });
    };
    
    /* --------------------------------------------------------
        Welcome Message
    -----------------------------------------------------------*/
    // notify('top', 'right', '', 'inverse', 'animated fadeIn', 'animated fadeOut', 'Welcome back ', 'Mallinda Hollaway!');
    
    /* --------------------------------------------------------
        Notifications and Dialog
    -----------------------------------------------------------*/
    /*
     * Notifications
     */ 
    $('.notifications > div > .btn').click(function(e){
        e.preventDefault();
        var nFrom = $(this).attr('data-from');
        var nAlign = $(this).attr('data-align');
        var nIcons = $(this).attr('data-icon');
        var nType = $(this).attr('data-type');
        var nAnimIn = $(this).attr('data-animation-in');
        var nAnimOut = $(this).attr('data-animation-out');
        
        notify(nFrom, nAlign, nIcons, nType, nAnimIn, nAnimOut);
    });

    /*
     * Dialogs
     */
 
    //Basic
    $('#sa-basic').click(function(){
        swal("Here's a message!");
    });
 
    //A title with a text under
    $('#sa-title').click(function(){
        swal("Here's a message!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis")
    });
 
    //Success Message
    $('#sa-success').click(function(){
        swal("Good job!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis", "success")
    });
 
    
    /* --------------------------------------------------------
        Calendar Widget
    -----------------------------------------------------------*/
    if($('.calendar-widget')[0]) {
        (function(){
            $('.calendar-widget').fullCalendar({
		contentHeight: 'auto',
		theme: true,
                header: {
                    right: 'month, agendaWeek, agendaDay',
                    center: 'prev, title, next',
                    left: ''
                },
                defaultView: 'agendaDay',
                defaultDate: new Date(),
                minTime: "09:00:00",
                editable: true,
                events: [
                    {
                        title: 'All Day',
                        start: '2016-02-17',
                        className: 'bg-cyan'
                    },
                    {
                        title: 'Birthday',
                        start: '2016-02-18T10:00',
                        end: '2016-02-18T13:00',
                        className: 'bg-amber',
                        allDay: false
                        
                    },
                    {
                        title: 'Google',
                        url: 'http://google.com/',
                        start: '2016-02-19',
                        className: 'bg-blue'
                    }
                ]
            });
        })();
    }
});