/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $('#workingDate').text(moment().format('DD/MM/YYYY'));
    $("#grid-invoices").bootgrid({
        navigation: 1,
        rowCount: [10, 25, 50, -1],
        selection: false,
        multiSelect: false,
        sorting: true,
        multiSort: false,
        keepSelection: false,
        caseSensitive: true,
        ajax: true,
        url: 'http://cwport.com/mobka/data/invoices.json',
        ajaxSettings: {
          method: "GET",
          cache: true
        },
        requestHandler: function(request) {
            return request;
        },
        responseHandler: function(response) {
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
            "num": function (column, row) {
                var html = '<div class="c-black">' + row.invoiceNum + '</div>'
                        + '<div class="c-gray">' + row.creator + '</div>';
                return html;
            },
            "car": function (column, row) {
                var html = ''; 
                if(row.payType == "-1") {
                    html = '<div class="c-blue">Расходная</div>';
                } else {
                    html = '<div class="c-black">' + (row.carNumber !== 'undefined' ? row.carNumber : '') + '</div>'
                    + '<div class="c-gray">' + (row.brand !== 'undefined' ? row.brand : '') + '</div>';
                }
                return html;
            },
            "date": function (column, row) {
                var html = '<div class="c-gray">Создана: ' + moment(row.createDate).format('HH:mm') + '</div>'
                        + '<div class="c-black">Оплачена: ' + moment(row.payDate).format('HH:mm') + '</div>';
                return html;
            },
            "total": function (column, row) {
                var html = '<div class="c-gray">' + row.summa + ' (' + row.discount +'%)</div>'
                        + '<div class="c-black">' + row.total + '</div>';
                return html;
            },
            "commands": function (column, row) {
                return "<button type=\"button\" class=\"btn btn-icon btn-info command-edit\" data-row-id=\"" 
                        + row.invoiceId + "\"><span class=\"zmdi zmdi-edit\"></span></button> " 
                        + "<button type=\"button\" class=\"btn btn-icon btn-info command-delete\" data-row-id=\"" 
                        + row.invoiceId + "\"><span class=\"zmdi zmdi-delete\"></span></button>";
            }
        }
    });
});
