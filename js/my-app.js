// Initialize your app
var myApp = new Framework7({
     pushState: true,
   // swipePanel: 'left',
    material:true,
    materialPageLoadDelay:20
});

// Export selectors engine
var $$ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

var shareto=[];

var inetrest=[];

$$("#signup").on('click', function(){
  mainView.router.load({ url: "form.html" }, { force: true });
});

$$("#login").on('click',function(){
    var email = $$("#email").val();
    var password = $$("#password").val();
    
    var jsonObject = {
        "email": email,
        "password": password
    }
    
    var valid = ValidateLogin(JSON.stringify(jsonObject));
     if(valid == true){
        myApp.showPreloader("Loading");
        $$.ajax({
          type: "POST",
          url: "http://sitrep2.azurewebsites.net/api/Login",
          data: jsonObject,
          success: function(data) {
            var result = JSON.parse(data);
            if(result.success) {
                localStorage.setItem("id", result.id);
                if(!result.hasInterest)
                    mainView.router.load({ url: "inet1.html" }, { force: true });
                else if(!result.hasCommunities)
                    mainView.router.load({ url: "com1.html"}, { force: true });
                else
                    mainView.router.load({ url: "Sitereps.html"}, { force: true });
            } else {
                myApp.alert(result.error);
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              myApp.alert("Error please contact the admin");
          },
          complete: function(){
            myApp.hidePreloader("Loading");
          }
        });
     } else {
         myApp.alert(valid);
     }
});

$$("#siterep").on("click",function(){

  takepicture();
    });

$$("#intrest").on('click',function(){
    mainView.router.load({ url: "com1.html"},{force:true});
});

myApp.onPageInit('signupform', function (page) {
    $$("#signupuser").on('click',function(){         
    var firstname = $$("#firstname").val();
    var lastname = $$("#lastname").val();
    var gender = $$("#gender").val();
    var dateofbirth = $$("#birth").val();
    var email = $$("#signupemail").val();
    var phone = $$("#phone").val();
    var lat=0;
    var long=0;
    var password=$$("#pssword").val();
        
    var jsonObject = {
        "firstname": firstname,
        "lastname": lastname,
        "password": password,
        "dateofbirth": dateofbirth,
        "email": email,
        "phonenumber": phone,
        "gender": gender,
        "country": "jordan",
        "longitude": "0.123456",
        "laiitude": "0.123456"
    }
    var valid = ValidateSignup(JSON.stringify(jsonObject));
     if(valid == true){
        myApp.showPreloader("Loading");
        $$.ajax({
          type: "POST",
          url: "http://sitrep2.azurewebsites.net/api/Register",
          data: jsonObject,
          success: function(data) {
            var result = JSON.parse(data);
            if(result.success) {
                localStorage.setItem("id", result.id);
                mainView.router.load({ url: "inet1.html" }, { force: true });
            } else {
                myApp.alert(result.error);
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              myApp.alert("Error please contact the admin");
          },
          complete: function(){
            myApp.hidePreloader("Loading");
          }
        });
     } else {
         myApp.alert(valid);
     }
    });
});

myApp.onPageInit('baseinterest', function (page) {
    GettingBaseInterest();
  
    var ptrContent = $$('.pull-to-refresh-content');
    ptrContent.on('refresh', function (e) {
        mainView.router.reloadPage('inet1.html');
    });
    
    $$("#nextToCommuntiy").on('click',function() {
        if($$('#interestlist a[data-status="2"]').length > 0) {
            mainView.router.load({ url: "com1.html"}, { force: true });
        } else {
            myApp.alert("Error follow at least one interest");
        }
    });
    
    $$('#interestlist').on('click','a',function(){
        var ele = $$(this);
        
        var jsonData = {
            "userId": localStorage.getItem('id'),
            "interestId": ele.data('id'),
            "userInterestId" : ele.data('uiid')
        }
        
        myApp.showPreloader("Loading");
        $.ajax({
            type: "POST",
            url: ele.data('status') == 1 ? "http://sitrep2.azurewebsites.net/api/AddUserInterest"
            : "http://sitrep2.azurewebsites.net/api/RemoveUserInterest",
            data: jsonData,
            success: function(data) {
                if(ele.data('status') == 1) {
                    ele.removeClass('join');
                    ele.addClass('joined');
                    ele.html("UnFollow");
                    ele.attr('data-status', 2);
                    ele.attr('data-uiid', data.id);
                } else {
                    ele.removeClass('joined');
                    ele.addClass('join');
                    ele.html("Follow");
                    ele.attr('data-status', 1);
                    ele.attr('data-uiid', 0);
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                myApp.alert("Error please contact the admin");
            },
            complete: function() {
                myApp.hidePreloader("Loading");
            }
        });
    });
});

myApp.onPageInit('basecommunity', function (page) {
   GettingBaseCommunity();
    
     var ptrContent = $$('.pull-to-refresh-layer');
    ptrContent.on('refresh', function (e) {
        mainView.router.reloadPage('com1.html');
    });
  
    $$("#nextToHomePage").on('click',function(){
        if($$('#communitylist a[data-status="2"], #communitylist a[data-status="3"]').length > 0) {
            mainView.router.load({ url: "Sitereps.html" }, { force: true });
        } else {
            myApp.alert("Error join at least one community");
        }
    });
    
    $$('#communitylist').on('click','a',function(){
        var ele = $$(this);
        
        var jsonData = {
            "userId": localStorage.getItem('id'),
            "communityId": ele.data('id'),
            "userCommunityId" : ele.data('ucid')
        }
        
        myApp.showPreloader("Loading");
        $.ajax({
            type: "POST",
            url: ele.data('status') == 1 ? "http://sitrep2.azurewebsites.net/api/AddUserCommunity"
            : "http://sitrep2.azurewebsites.net/api/RemoveUserCommunity",
            data: jsonData,
            success: function(data) {
                if(ele.data('status') == 1) {
                    ele.removeClass('join');
                    ele.addClass('joined');
                    if(data.usertype == 1) {
                        ele.html("Requested");
                        ele.attr('data-status', 2);
                    } else {
                        ele.html("Joined");
                        ele.attr('data-status', 3);
                    }
                    ele.attr('data-ucid', data.id);
                } else {
                    ele.removeClass('joined');
                    ele.addClass('join');
                    ele.html("Join");
                    ele.attr('data-status', 1);
                    ele.attr('data-ucid', 0);
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                myApp.alert("Error please contact the admin");
            },
            complete: function() {
                myApp.hidePreloader("Loading");
            }
        });
    });
});

myApp.onPageInit('homepage', function (page){
    GettingHomepage();
    
    var ptrContent = $$('.pull-to-refresh-content');
    ptrContent.on('refresh', function (e) {
        mainView.router.reloadPage('Sitereps.html');
    });
    
    $$("#addSitrep").on('click',function(){
        mainView.router.load({ url: "CreateSitereps.html" }, { force: true });
    });
});

myApp.onPageInit('createsitrep', function (page) {
    
    var createdonLongitude;
    var createdonLatitude;
    var actionLongitude;
    var actionLatitude;
    
    $$("#cam").on('click', function(){
      capturePhotoWithData();  
     // takepicture();
    });

    var map = new GMaps({
        div: '#map',
        lat: -12.043333,
        lng: -77.028333
    });

    GMaps.geolocate({
        success: function(position) {
            map.setCenter(position.coords.latitude, position.coords.longitude);
            map.addMarker({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                draggable: true,
                title: 'your location'
            });
            createdonLongitude = position.coords.longitude;
            createdonLatitude = position.coords.latitude;
        },
        error: function(error) {
        },
        not_supported: function() {
        },
        always: function() {
        }
    });

    GMaps.once('click', map.map, function(event) {
        var index = map.markers.length;
        actionLongitude = event.latLng.lng();
        actionLatitude = event.latLng.lat();

        map.addMarker({
          lat: actionLatitude,
          lng: actionLongitude,
          draggable:true,
          title: 'Marker #' + index,
          infoWindow: {},
          dragend: function(e) {
            actionLongitude = e.latLng.lng();
            actionLatitude = e.latLng.lat();
          }
        });
    });
    
    $$("#shareSitrep").on("click", function() {
        var site = {
            "userId": localStorage.getItem('id'),
            "title": $$("#title").val(),      
            "description": $$("#descrption").val(),
            "witness": $$("#witness")[0].checked,
            "reporter": $$("#reporter")[0].checked,
            "datetime": $$("#datetime").val(),
            "longitude": actionLongitude,
            "latitude": actionLatitude,
            "createdlongitude": createdonLongitude ,
            "createdlatitude": createdonLatitude,
            "communities": []
        }
        localStorage.setItem('sitrep', JSON.stringify(site));
        mainView.router.load({ url: "sharto.html" }, { force: true }); 
    });
});

myApp.onPageInit('sharetocommunities', function (page) {
    console.log(JSON.parse(localStorage.getItem('sitrep')));
/*    
    Gettingpulice();
    
    $$('#pup').on('click','li',function(){
        debugger;
        var id=this.id;
         var val=$$('#'+id).prop('checked');
    //    var type=$$("#"+id).data('type');
        if(true==true){
        var json={
			"communityId":id,
			"isPublic": true
        }
        shareto.push(json);
        }
    });
    $$('#tab2').once('show', function () {
        
    Gettingpri();
        
         var ptrContent = $$('.pull-to-refresh-content');
    ptrContent.on('refresh', function (e) {
        debugger;
        mainView.router.reloadPage('inet1.html');
    });
        
        $$('#pri').on('click','li',function(){
      debugger;
        var id=this.id;
    var val=$$('#'+id).prop('checked');
            
            //    var type=$$("#"+id).data('type');
            if(true==true){
        var json={
			"communityId":id,
			"isPublic": false
        }
                shareto.push(json);
            }
    });
        
    });
    
    $$("#done").on('click',function(){
        var obj=localStorage.getItem('site');
        var site=JSON.parse(obj);
        site.communities=shareto;
        psotsite(site);
         mainView.router.load({ url: "Sitereps.html"},{force:true});
    });
    */
});

myApp.onPageInit('ab2out', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

myApp.onPageInit('Createcoum', function (page){
    
    debugger
    debugger;
    $$("#goint").on("click",function(){
        debugger;
        mainView.router.load({ url: "about.html"},{force:true});
    });
    
    $$("#createcom").on('click',function(){
    debugger;
     var comname=$$("#comname").val();
    var descrption=$$("#textarea").val();
    var comtype=$$("#comtype").val();
    var loc=$$("#location").val();
    
    var id=localStorage.getItem('id');
    
var Param=
{
	"name": comname,
	"description": descrption,
	"userid": id,
	"communitytype": comtype,
	"communityclass": "sport",
	"country": "jordan",
	"city": "amman",
	"longitude": 123.123456789,
	"latitude": 123.123456789,
	"interests": [
	]
}

Param.interests=JSON.parse(localStorage.getItem('intrest'));;
psotcoms(Param);

 mainView.router.load({ url: "com1.html"},{force:true});
    });
    
});

myApp.onPageInit('about', function (page){
    debugger;
    $$("#mod2").addClass('none');
$$("#city").on('click',function(){
    debugger;
$$("#mod2").addClass('none');       
$$("#mod1").removeClass('none');           
}); 

$$("#rad").on('click',function(){
    debugger;
       $$("#mod1").addClass('none');       
$$("#mod2").removeClass('none');        
});
    
   /*if(city){
$$("#mod2").addClass('none');       
$$("#mod1").removeClass('none');       
   }else if(rad){
       $$("#mod1").addClass('none');       
$$("#mod2").removeClass('none');       
   }*/
    var map=new GMaps({
  div: '#map2',
  lat: -12.043333,
  lng: -77.028333
});
    
    $$("#Ser").on('click',function(page){
    GMaps.geocode({
  address: $$('#Sea').val(),
  callback: function(results, status) {
    if (status == 'OK') {
        debugger;
        console.log(results);
        localStorage.setItem('location23',JSON.stringify(results));
         appendloc();
      var latlng = results[0].geometry.location;
      map.setCenter(latlng.lat(), latlng.lng());
      map.addMarker({
        lat: latlng.lat(),
        lng: latlng.lng()
      });
    }
  }
});
   
    });
    
    $$("#curr").on('click',function(){
        
         GMaps.geolocate({
  success: function(position) {
      debugger;
     
    map.setCenter(position.coords.latitude, position.coords.longitude);
      map.addMarker({
  lat: position.coords.latitude,
  lng: position.coords.longitude,
  title: '',
  click: function(e) {
  }
});
       localStorage.setItem("latitude",position.coords.latitude);
       localStorage.setItem("longitudes",position.coords.longitude);
     
      var sli=$$("#slider").val()
      var sl=parseInt(sli);
      
      /*polygon = map.drawCircle({
 lat: position.coords.latitude,
  lng: position.coords.longitude,
radius:sl,
  strokeColor: '#BBD8E9',
  strokeOpacity: 1,
  strokeWeight: 3,
  fillColor: '#BBD8E9',
  fillOpacity: 0.6
});*/
      
      
  },
  error: function(error) {
    alert('Geolocation failed: '+error.message);
  },
  not_supported: function() {
    alert("Your browser does not support geolocation");
  },
  always: function() {
    alert("Done!");
  }
}); 
});
    
    $$("#slider").touchend(function(){
        debugger;
        var sli=$$("#slider").val()
      var sl=parseInt(sli);
        var lat=parseFloat(localStorage.getItem("latitude"));
        var long=parseFloat(localStorage.getItem("longitudes"))
         polygon = map.drawCircle({
 lat: lat,
  lng: long,
radius:sl,
  strokeColor: '#BBD8E9',
  strokeOpacity: 1,
  strokeWeight: 3,
  fillColor: '#BBD8E9',
  fillOpacity: 0.6
});
      
        
        
    });
    var lav="";
     $$('#ul').on('click','label',function(){
         lav=this.id;
     });
    
    
   
    $$("#Add").on('click',function(){
        debugger;
         var intin=$$("#intin").val();
   var inet={
			"name": intin,
			"country": localStorage.getItem('locz'),
			"city": lav,
			"longitude":parseFloat(localStorage.getItem("longitudes")),
			"latitude": parseFloat(localStorage.getItem("latitude"))
		}
   
   inetrest.push(inet);
        console.log(inetrest);
    localStorage.setItem('intrest',JSON.stringify(inetrest));
    
        mainView.router.back({ url: "createcouminty.html"},{force:true})
        
    });
    
});

myApp.onPageInit('Inrest', function (page) {
html='';
    $$("#IN").on('click',function(){
        debugger;
     myApp.prompt('Type your Intrest?', function (value) {
        //myApp.alert('Your name is "' + value + '". You clicked Ok button');
        html='<li class="item-content"><div class="item-media"><i class="icon checked"></i></div><div class="item-inner"><div class="item-title">'+value+'</div></div></li>';
         $$("#u").append(html);
    });    
        
    });
    
    
});

var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}