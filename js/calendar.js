/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function CWBooking(cwevent, params) {
    this.event = cwevent;
    this.params = params;
};

function CWEvent(id, name, momentStart, momentEnd, tag) {
    this.id = id;
    this.name = name;
    this.start = momentStart;
    this.end = momentEnd;
    this.tag = tag;
};

var cProcessor = {
    events: [],
    initEventDialog: function(elDialog, cwBooking, cwEvent) {
        
    }
};

$(document).ready(function () {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var cId = $('#calendar'); 

    //Generate the Calendar
    cId.fullCalendar({
        height: 'auto', // removes scrollbar in agenda views
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
            },
            {
                id: (new String('Jeep RND876')).replace(/\s/g, '_'),
                title: 'Jeep RND876',
                start: new Date(y, m, d, 12, 15, 00, 00),
                end: new Date(y, m, d, 12, 45, 00, 00),
                className: 'bg-orange'
            }
        ],
        //On Day Select
        select: function (start, end, allDay) {
            $('#eventStartTime').val(start);
            $('#eventEndTime').val(end);
            $('#eventId').val('');
            $('#dialogEvent').modal('show');
        },
        eventClick: function (calEvent, jsEvent, view) {
            $('#eventName').val(calEvent.title);
            $('#eventStartTime').val(calEvent.start);
            $('#eventEndTime').val(calEvent.end);
            $('#eventId').val(calEvent.id);
            $('#dialogEvent').modal('show');
        }
    });
    //Create and ddd Action button with dropdown in Calendar header. 
    var actionMenu = '<ul class="actions actions-alt" id="fc-actions">' +
            '<li class="dropdown">' +
            '<a href="" data-toggle="dropdown"><i class="zmdi zmdi-more-vert"></i></a>' +
            '<ul class="dropdown-menu pull-right">' +
//            '<li class="active">' +
//            '<a data-view="month" href="">Month View</a>' +
//            '</li>' +
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
    //Event Tag Selector
    (function () {
        $('body').on('click', '.event-tag > span', function () {
            $('.event-tag > span').removeClass('selected');
            $(this).addClass('selected');
        });
    })();
    //Add new Event
    $('body').on('click', '#saveEvent', function () {
        var eventName = $('#eventName').val();
        var tagColor = $('.event-tag > span.selected').attr('data-tag');
        if (eventName !== '') {
            //Render Event
            $('#calendar').fullCalendar('renderEvent', {
                title: eventName,
                start: $('#eventStartTime').val(),
                end: $('#eventEndTime').val(),
                allDay: false,
                className: tagColor

            }, true); //Stick the event

            $('#addNew-event form')[0].reset();
            $('#addNew-event').modal('hide');
        }

        else {
            $('#eventName').closest('.form-group').addClass('has-error');
        }
    });
    //Calendar views
    $('body').on('click', '#fc-actions [data-view]', function (e) {
        e.preventDefault();
        var dataView = $(this).attr('data-view');
        $('#fc-actions li').removeClass('active');
        $(this).parent().addClass('active');
        cId.fullCalendar('changeView', dataView);
    });
    cId.fullCalendar('changeView', 'agendaDay');
});


