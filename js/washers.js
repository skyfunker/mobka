/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
//    $('#workingDate').text(moment().format('DD/MM/YYYY'));
    $("#grid-data").bootgrid({
        navigation: 1,
        rowCount: [10, 25, 50, -1],
        selection: false,
        multiSelect: false,
        sorting: true,
        multiSort: false,
        keepSelection: false,
        caseSensitive: true,
        ajax: true,
        url: 'http://cwport.com/mobka/data/washers.json',
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
            "flags": function (column, row) {
                var html = '<span class="f-20 c-gray" title="Включено"><i class="zmdi ' 
                        + (row.working == '1' ? 'zmdi-check' : 'zmdi-close') + ' zmdi-hc-fw" data-row-id="'
                        + row.pricelistId + '"></i></span>';
                
                return html;
            },
            "commands": function (column, row) {
                return "<button type=\"button\" class=\"btn btn-icon btn-info command-edit\" data-row-id=\""
                        + row.washerId + "\"><span class=\"zmdi zmdi-edit\"></span></button>";
            }
        }
    });
});
