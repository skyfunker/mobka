/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var timer;


function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

function minutesUntil(deltamin, upcomingDate) {
    var delta = Math.round((upcomingDate.getTime() - (new Date()).getTime())/60000);
//    if(delta > 0) {
//        console.log(Math.round((upcomingDate.getTime() - (new Date()).getTime())/60000));
//    }
    return (deltamin == delta);
}

function alarm() {
    var player = document.getElementById('alarmPlayer');
    player.play();
};

function processEvents() {
    var clientEvents = cId.fullCalendar('clientEvents');
    var events = new Array();
    var curTime = new Date();
    if($.isArray(clientEvents)) {
        $.each(clientEvents, function (i, obj){
            // if 15 minutes till next event
            if(minutesUntil(15, new Date(obj.start))) {
                events.push({id: obj.id, title: obj.title, start: obj.start, end: obj.end});
            }
        });
    } 
    for(var i = 0; i < events.length; i++) {
        // alarm();
        swal('Запись на мойку', events[i].title, "warning");
    }
};

function updateEvent(eventId, eventData) {
    var result = false;
    deleteEvent(eventId);
    addEvent(eventId, eventData);
    return result;
}

function addEvent(eventId, data) {
    try {
        $('#calendar').fullCalendar('renderEvent',{
            id: eventId,
            title: data.title,
            start: data.start,
            end:  data.end,
            allDay: false,
            className: data.className,
            clientName: data.clientName,
            clientPhone: clientPhone,
            carModel: carModel,
            carNumber: carNumber
        }, true ); // Stick the event to calendar
        
    } catch(e) {
        console.error(e.name + ' | ' + e.message);
    }
}
function deleteEvent(eventId) {
    try {
        cId.fullCalendar('removeEvents', eventId);
    } catch(e) {
        console.error(e.name + '|' + e.message);
    }
}

$(document).ready(function () {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    cId = $('#calendar'); 

    //Generate the Calendar
    cId.fullCalendar({
        height: 'auto', // removes scrollbar in agenda views
        defaultView: 'agendaDay',
        // nowIndicator: true, // available from v.2.6
        allDaySlot: false,
        // slotDuration: '00:15:00',
        header: {
            right: '',
            center: 'prev, title, next',
            left: ''
        },
        theme: true, //Do not remove this as it ruin the design
        selectable: true, // allows and processes click on calendar
        selectHelper: true,
        editable: false, // prevents dragging events
        //Add Events
        events: [
            {
                id: (new String('CAR TEST1')).replace(/\s/g, '_'),
                title: 'CAR TEST1',
                start: addMinutes(new Date(), 16),
                end: addMinutes(new Date(), 46),
                className: 'bg-yellow'
            },
            {
                id: (new String('CAR TEST2')).replace(/\s/g, '_'),
                title: 'CAR TEST2',
                start: addMinutes(new Date(), 21),
                end: addMinutes(new Date(), 81),
                className: 'bg-orange'
            },
            {
                id: (new String('BMW KZ0298')).replace(/\s/g, '_'),
                title: 'BMW KZ0298',
                start: new Date(y, m, d, 10, 00, 00, 00),
                end: new Date(y, m, d, 10, 30, 00, 00),
                className: 'bg-red'
            },
            {
                id: (new String('Opel 345678JK')).replace(/\s/g, '_'),
                title: 'Opel 345678JK',
                start: new Date(y, m, d, 10, 00, 00, 00),
                end: new Date(y, m, d, 10, 30, 00, 00),
                className: 'bg-green'
            },
            {
                id: (new String('Toyota Camry 777KGB')).replace(/\s/g, '_'),
                title: 'Toyota Camry 777KGB',
                start: new Date(y, m, d, 10, 30, 00, 00),
                end: new Date(y, m, d, 10, 45, 00, 00),
                className: 'bg-black'
            }
        ],
        //On Day Select
        select: function (start, end, allDay) {
            $('#clientName').val();
            $('#clientPhone').val();
            $('#carModel').val();
            $('#carNumber').val();
            $('#bookingStartTime').data('DateTimePicker').date(start);
            $('#bookingEndTime').data('DateTimePicker').date(end);
            $('#eventId').val('');
            $('#dialogEvent').modal('show');
        },
        eventClick: function (calEvent, jsEvent, view) {
            
            $('#bookingStartTime').data('DateTimePicker').date(calEvent.start);
            $('#bookingEndTime').data('DateTimePicker').date(calEvent.end);
            $('#eventId').val(calEvent.id);
            // TODO: custom fields are not being saved !!!!
            $('#clientName').val(calEvent.clientName);
            $('#clientPhone').val(calEvent.clientPhone);
            $('#carModel').val(calEvent.carModel);
            $('#carNumber').val(calEvent.carNumber);
            $('#dialogEvent').modal('show');
        }
    });

    //Event Tag Selector
    (function () {
        $('body').on('click', '.event-tag > span', function () {
            $('.event-tag > span').removeClass('selected');
            $(this).addClass('selected');
        });
    })();

    //Add new Event or Save after edit
    $('body').on('click', '#saveEvent', function () {
        // var eventName = $('#eventName').val();
        var eventId = $('#eventId').val();
        var tagColor = $('.event-tag > span.selected').attr('data-tag');
        var clientName = $('#clientName').val();
        var clientPhone = $('#clientPhone').val();
        var carModel = $('#carModel').val();
        var carNumber = $('#carNumber').val();
        
        // event exists
        if(eventId == '' || eventId == undefined) { eventId = carNumber; }
        updateEvent(eventId, 
            {"title": (carModel + ' ' + carNumber), 
            "className": tagColor,   
            "start": $('#bookingStartTime').data('DateTimePicker').date(),
            "end": $('#bookingEndTime').data('DateTimePicker').date(), 
            "clientName": clientName, "clientPhone": clientPhone, 
            "carNumber": carNumber, "carModel": carModel});
        $('#dialogEvent').modal('hide');
    });
    
    // delete event
    $('body').on('click', '#deleteEvent', function () {
        var eventId = $('#eventId').val();
        if (eventId != '' && eventId != undefined) {
            deleteEvent(eventId);
            $('#dialogEvent').modal('hide');
        } else {
            console.error('EventId is empty');
        }
    });

        //Create and ddd Action button with dropdown in Calendar header. 
    var actionMenu = '<ul class="actions actions-alt" id="fc-actions">' +
            '<li class="dropdown">' +
            '<a href="" data-toggle="dropdown"><i class="zmdi zmdi-more-vert"></i></a>' +
            '<ul class="dropdown-menu pull-right">' +
            '<li class="active">' +
            '<a data-view="agendaDay" href="">Agenda Day View</a>' +
            '</li>' +
            '<li>' +
            '<a data-view="agendaWeek" href="">Agenda Week View</a>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</li>';
    cId.find('.fc-toolbar').append(actionMenu);

    //Calendar views
    $('body').on('click', '#fc-actions [data-view]', function (e) {
        e.preventDefault();
        var dataView = $(this).attr('data-view');
        $('#fc-actions li').removeClass('active');
        $(this).parent().addClass('active');
        cId.fullCalendar('changeView', dataView);
    });
    // cId.fullCalendar('changeView', 'agendaDay');

    $('#bookingStartTime').datetimepicker({
                locale: 'ru',
                format: 'DD/MM/YYYY hh:mm'
    });
    $('#bookingEndTime').datetimepicker({
                locale: 'ru',
                format: 'DD/MM/YYYY hh:mm'
    });
    
    (function() {
        // set up timer for event processing
        // timer = setInterval(processEvents, 10000); // every 1 min run event processing
    })();
});


