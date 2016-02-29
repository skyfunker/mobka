/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var cId = $('#calendar'); //Change the name if you want. I'm also using thsi add button for more actions

    //Generate the Calendar
    cId.fullCalendar({
        header: {
            right: '',
            center: 'prev, title, next',
            left: ''
        },
        theme: true, //Do not remove this as it ruin the design
        selectable: true,
        selectHelper: true,
        editable: true,
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
            $('#addNew-event').modal('show');
            $('#addNew-event input:text').val('');
            $('#getStart').val(start);
            $('#getEnd').val(end);
        },
        eventClick: function (calEvent, jsEvent, view) {

            alert('Event: ' + calEvent.id + ' ' + calEvent.title);
//            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
//            alert('View: ' + view.name);
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
    $('body').on('click', '#addEvent', function () {
        var eventName = $('#eventName').val();
        var tagColor = $('.event-tag > span.selected').attr('data-tag');
        if (eventName !== '') {
            //Render Event
            $('#calendar').fullCalendar('renderEvent', {
                title: eventName,
                start: $('#getStart').val(),
                end: $('#getEnd').val(),
                allDay: true,
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


