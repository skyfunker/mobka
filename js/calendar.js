/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var timer;
var processedEvents = [];

var ne = new NotificationEngine();

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

function munitesBefore(deltamin, upcomingDate) {
    var delta = Math.round((upcomingDate.getTime() - (new Date()).getTime())/60000);
    return (deltamin == delta);
}

function playAlarm() {
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
            if(munitesBefore(15, new Date(obj.start))) {
                events.push({id: obj.id, title: obj.title, 
                    clientName: obj.clientName, "clientPhone": obj.clientPhone,
                    start: obj.start, end: obj.end});
            }
        });
    } 
    for(var i = 0; i < events.length; i++) {
        playAlarm();
        ne.processed.push(events[i]);
        var body = events[i].title + ' ' + events[i].clientName
                + ' ' + events[i].clientPhone;
//        var body = '<h3>' + events[i].title + '<small>' + events[i].clientName 
//                + ' <a href="tel:' + events[i].clientPhone + '">' + events[i].clientPhone + '</a></small></h3>';
       // $('#notifications').parent().removeClass('hidden');
       
       ne.notify('Запись на мойку' + ' на ' + events[i].start.format('HH:mm'), body, true, '#notifications');
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
            eventColor: data.eventColor,
            clientName: data.clientName,
            clientPhone: data.clientPhone,
            carModel: data.carModel,
            carNumber: data.carNumber
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
        slotDuration: '00:15:00',
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
                id: 'А023SPO',
                title: 'Lexus А023SPO',
                start: addMinutes(new Date(), 16),
                end: addMinutes(new Date(), 46),
                className: 'bg-green',
                eventColor: 'bg-green',
                clientName: 'МУХТАР АРМАН',
                clientPhone: '87784338839',
                carModel: 'Lexus',
                carNumber: 'А023SPO'
            },
            {
                id: '392DLA',
                title: 'Mercedes 392DLA',
                start: addMinutes(new Date(), 21),
                end: addMinutes(new Date(), 81),
                className: 'bg-orange',
                eventColor: 'bg-orange',
                clientName: 'Абылай',
                clientPhone: '87783515620',
                carModel: 'Mercedes',
                carNumber: '392DLA'
            },
            {
                id: '852DKA',
                title: 'Volkswagen 852DKA',
                start: new Date(y, m, d, 10, 30, 00, 00),
                end: new Date(y, m, d, 10, 45, 00, 00),
                className: 'bg-pink',
                eventColor: 'bg-pink',
                clientName: 'Алена',
                clientPhone: '87773937623',
                carModel: 'Volkswagen',
                carNumber: '852DKA'
            }
        ],
        //On Day Select
        select: function (start, end, allDay) {
            $('#clientName').val('');
            $('#clientPhone').val('');
            $('#carModel').val('');
            $('#carNumber').val('');
            $('#bookingStartTime').data('DateTimePicker').date(start);
            $('#bookingEndTime').data('DateTimePicker').date(end);
            $('#eventId').val('');
            // set color tag
            $('.event-tag > span').removeClass('selected');
            $('.event-tag > span:first-child').addClass('selected');
            $('#deleteEvent').addClass('hidden');
            // show dialog
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
            // set color tag
            $('.event-tag > span').removeClass('selected');
            $('.event-tag > span[data-tag="' + calEvent.eventColor + '"]').addClass('selected');
            $('#deleteEvent').removeClass('hidden');
            // show dialog
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
        var eventColor = $('.event-tag > span.selected').attr('data-tag');
        var clientName = $('#clientName').val();
        var clientPhone = $('#clientPhone').val();
        var carModel = $('#carModel').val();
        var carNumber = $('#carNumber').val();
        
        // event exists
        if(eventId == '' || eventId == undefined) { eventId = carNumber; }
        updateEvent(eventId, 
            {"title": (carModel + ' ' + carNumber), 
            "className": eventColor,
            "eventColor": eventColor,
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

    if(ne.checkSupport()) {
        // if !ne.granted
        ne.requestPermission();
    }
    
    (function() {
        // set up timer for event processing
        timer = setInterval(processEvents, 60000); // every 1 min run event processing
    })();
});


