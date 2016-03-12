/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $('#workingDate').text(moment().format('DD/MM/YYYY'));
    $("#grid-cash").bootgrid({
        navigation: 1,
        rowCount: [10, 25, 50, -1],
        selection: false,
        multiSelect: false,
        sorting: true,
        multiSort: false,
        keepSelection: false,
        caseSensitive: true,
        ajax: true,
        url: 'http://cwport.com/mobka/data/cash.json',
        ajaxSettings: {
            method: "GET",
            cache: true
        },
        requestHandler: function (request) {
            return request;
        },
        responseHandler: function (response) {
            return response;
        },
//        searchSettings: {
//          delay: 100,
//          characters: 3
//        },
        labels: {
            noResults: "No records downloaded"
        },
        css: {
            icon: 'zmdi icon',
            iconColumns: 'zmdi-view-module',
            iconDown: 'zmdi-expand-more',
            iconRefresh: 'zmdi-refresh',
            iconUp: 'zmdi-expand-less',
            iconSearch: 'zmdi-search'
        },
        formatters: {
            "date": function (column, row) {
                var html = '<span class="c-black">' + moment(row.opDate).format('HH:mm') + '</span>'
                return html;
            },
            "cashop": function (column, row) {
                var html = '';
                html = '<span class="c-black">' + (row.cashopId !== 'undefined' ? row.cashopId : '') + '</span>';
                return html;
            },
            "sum": function (column, row) {
                var html = '<span class="c-black">' + row.summa + '</span>';
                return html;
            },
            "commands": function (column, row) {
                return "<button type=\"button\" class=\"btn btn-icon btn-info command-edit\" data-row-id=\""
                        + row.cashId + "\"><span class=\"zmdi zmdi-edit\"></span></button> "
                        + "<button type=\"button\" class=\"btn btn-icon btn-info command-delete\" data-row-id=\""
                        + row.cashId + "\"><span class=\"zmdi zmdi-delete\"></span></button>";
            }
        }
    });
});
