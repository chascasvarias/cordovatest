/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var IdU; 
var IdS; 

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		
		var url="http://pronamic.net";
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('scan').addEventListener('click', this.scan, false);

		window.addEventListener("message", function(event) {
			  var iframe = document.getElementById('proframe');			
			  if (event.origin == url) {
				if (event.data == "camera") {
				  navigator.camera.getPicture(function(imageData) {
					iframe.contentWindow.postMessage({
					  image: imageData
					}, url);
				  }, function(message) {
					iframe.contentWindow.postMessage({
					  error: message
					}, url);
				  }, {
					quality: 50,
					destinationType: 0,
					targetWidth: 600,
					targetHeight: 600
				  });
				}
				if (event.data.test) {
					eval(event.data.test);
				}
				
			  }
	    }, false);
	
        //document.getElementById('encode').addEventListener('click', this.encode, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		//window.localStorage.setItem("IdU", "");
		//window.localStorage.setItem("IdS", "");
		$("#errorMsg").hide();
		
		IdU = window.localStorage.getItem("IdU");
		IdS = window.localStorage.getItem("IdS");
		console.log("IdU:"+IdU);
		if (IdU!="" && IdS!="" )
		{
			$.post("http://pronamic.net/procms/chk_session_app.pro",{ idu : IdU, ids : IdS, ip: device.uuid},function(respuesta){
				if (respuesta == "1") {
					console.log("autologin Ok");
					$("#contenido1").hide();
					$('<iframe id="proframe" src="http://pronamic.net/procms/Apps/DocuCAE/1.5/admin_app.pro?ids=' + IdS + '&idu=' + IdU + '&ip=' + device.uuid +'" height="100%" width="550px" frameborder="0" style="min-height:400px" ></iframe>').appendTo('#contenido2');				
					$.mobile.changePage("#demo-page");
				}
				else{
					console.log("autologin Error");
					window.localStorage.setItem("IdU", "");
					window.localStorage.setItem("IdS", "");
					IdU="";				
					IdS="";				
					$.mobile.changePage("#login");
				}
			});		
		}
		else
		{
			$.mobile.changePage("#login");
		}
		$("#btnError").click(function(){
			$.mobile.changePage("#login");
		});
		$("#btnLogin").click(function(){
			console.log("login Click");
			var usu = $("#txtuser").val();
			var pass = $("#txtpassword").val();
			$.post("http://pronamic.net/procms/entrar_app.pro",{ user : usu, clave : pass, ip: device.uuid},function(respuesta){
								//$.mobile.changePage("#demo-page");
				if (respuesta != "0") {
					console.log("login Ok");
					IdU=respuesta.substring(22);
					IdS=respuesta.substring(0,22);
					window.localStorage.setItem("IdU",IdU);
					window.localStorage.setItem("IdS",IdS);
					$("#info").html("IdU:"+IdU+"<br />IdS:"+IdS+"<br />IP:"+device.uuid);
					$("#contenido1").hide();
					$('<iframe id="proframe" src="http://pronamic.net/procms/Apps/DocuCAE/1.5/admin_app.pro?ids=' + IdS + '&idu=' + IdU + '&ip=' + device.uuid +'" height="100%" width="550px" frameborder="0" style="min-height:400px" ></iframe>').appendTo('#contenido2');
					$.mobile.changePage("#demo-page");
				}
				else{
					console.log("login Error");
					window.localStorage.setItem("IdU", "");
					window.localStorage.setItem("IdS", "");
					IdU="";
					IdS="";
					$.mobile.changePage('#pageError', 'pop', true, true);
					
				}
			});
		});
		/*$("#btnWeb").click(function(){
					$("#contenido1").hide();
					$('<iframe id="proframe" src="http://pronamic.net/procms/Apps/DocuCAE/1.5/admin_app.pro?ids=' + IdS + '&idu=' + IdU + '&ip=' + device.uuid +'" height="100%" width="550px" frameborder="0" style="min-height:400px" ></iframe>').appendTo('#contenido2');
		});
		$("#btnWeb2").click(function(){
			window.open('http://pronamic.net/procms/Apps/DocuCAE/1.5/admin_app.pro?ids=' + IdS + '&idu=' + IdU + '&ip=' + device.uuid ,'_self','location=no','closebuttoncaption=Return');
		});*/
		
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
       /* var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    },
    scan: function() {
        console.log('scanning');
        
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.scan( function (result) { 
			
            /*alert("We got a barcode\n" + 
            "Result: " + result.text + "\n" + 
            "Format: " + result.format + "\n" + 
            "Cancelled: " + result.cancelled);  */
		   document.getElementById("proframe").src="http://pronamic.net/procms/Apps/DocuCAE/1.5/VerObj_app.pro?id=" + result.text + "&ids=" + window.localStorage.getItem("IdS") + "&idu=" + window.localStorage.getItem("IdU") + "&ip=" + device.uuid + "";
           /*console.log("Scanner result: \n" +
                "text: " + result.text + "\n" +
                "format: " + result.format + "\n" +
                "cancelled: " + result.cancelled + "\n");
            document.getElementById("info").innerHTML = result.text;
            console.log(result);*/
            /*
            if (args.format == "QR_CODE") {
                window.plugins.childBrowser.showWebPage(args.text, { showLocationBar: false });
            }
            */

        }, function (error) { 
            console.log("Scanning failed: ", error); 
        } );
    },

    encode: function() {
        var scanner = cordova.require("cordova/plugin/BarcodeScanner");

        scanner.encode(scanner.Encode.TEXT_TYPE, "http://www.nhl.com", function(success) {
            alert("encode success: " + success);
          }, function(fail) {
            alert("encoding failed: " + fail);
          }
        );

    }
};


