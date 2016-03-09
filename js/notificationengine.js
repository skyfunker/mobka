/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function NotificationEngine() {
    this.supported = false;
    this.granted = false;
    this.processed = []; // array of processed event objects 
    this.icon = 'img/logo_32x32.png';
    
    this.checkSupport = function () {
        if (!("Notification" in window)) {
            this.supported = false;
            console.log("This browser does not support system notifications");
        } else {
            this.supported = true;
            console.log("This browser supports system notifications!");
        }
        if(this.supported) {
            this.checkPermission();
        }
        return this.supported;
    };
    
    this.checkPermission = function() {
        this.granted = (Notification.permission === 'granted'); 
    };

    this.requestPermission = function () {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                this.granted = true;
            }
        });
    };
    
    this.notify = function(title, body, modal, parentid) {
        if(this.supported && this.granted) {
            var n = new Notification(title, { body: body, icon: this.icon});
            setTimeout(n.close.bind(n), 60000); // close desktop popup in 60 sec
        } else {
            // Show sweet alarm (script has to be included)
            if(modal) {
                swal({title: title, text: body, html: true, type: "warning"});
            } else {
                // add warning dismissable alert to the parent element
                if(parentid !== 'undefined') {
                    $(parentid).append('<div class="alert alert-warning alert-dismissible" role="alert">' +
                    '<button type="button" class="close" data-dismiss="alert">' + 
                    '<span aria-hidden="true">&times;</span></button>' +
                    '<strong>' + title + '</strong> ' + body + '</div>');
                    $('html, body').animate({scrollTop: $(parentid).offset().top}, 2000);
                } else {
                    // just show old-school browser alert
                    alert(title + ' ' + body);
                }
            }
        }
    };
}

