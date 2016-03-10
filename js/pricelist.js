/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $("#grid-pricelist").bootgrid({
        navigation: 1,
        rowCount: [10, 25, 50, -1],
        selection: false,
        multiSelect: false,
        sorting: true,
        multiSort: false,
        keepSelection: false,
        caseSensitive: true,
        ajax: true,
        url: 'http://cwport.com/mobka/data/pricelist.json',
        ajaxSettings: {
          method: "GET",
          cache: false
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
            iconUp: 'zmdi-expand-less'
        },
        formatters: {
            "inservice": function (column, row) {
                var html = '<div class="radio cr-alt m-b-20"><label><input type="checkbox" name="inService" value="' 
                        + row.pricelistId + '" ' 
                        + (row.inService == "1" ? 'checked' : '') 
                        + '><i class="input-helper"></i></label></div>';
                return html;
            },
            "inaction": function (column, row) {
                var html = '<div class="radio cr-alt m-b-20"><label><input type="checkbox" name="inAction" value="' 
                        + row.pricelistId + '" ' 
                        + (row.inAction == "1" ? 'checked' : '') 
                        + '><i class="input-helper"></i></label></div>';
                return html;
            },
            "commands": function (column, row) {
                return "<button type=\"button\" class=\"btn btn-icon btn-info command-edit\" data-row-id=\"" 
                        + row.pricelistId + "\"><span class=\"zmdi zmdi-edit\"></span></button> " 
                        + "<button type=\"button\" class=\"btn btn-icon btn-info command-delete\" data-row-id=\"" 
                        + row.pricelistId + "\"><span class=\"zmdi zmdi-delete\"></span></button>";
            }
        }
    });
});
