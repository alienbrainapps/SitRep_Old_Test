function GettingBaseCommunity(){
    myApp.showPreloader("Loading");
    $$.ajax({
        url: "http://sitrep2.azurewebsites.net/api/GetAllCommunities?lastindex=0&pagesize=10&userId="+localStorage.getItem("id"),
        method: "GET",
        success: function (data) {
            var dataResult = JSON.parse(data);
            var result = dataResult.result;
            var html='';
            var getStatus = function(dataResult) {
                if(dataResult.isjoin){
                    return 3;
                } else if(dataResult.isfollow) {
                    return 2;
                } else {
                    return 1;
                }
            };
            var getStatusText = function(dataResult) {
                var status = getStatus(dataResult);
                if(status == 1) {
                    return "Join";
                } else if(status == 2) {
                    return "Requested";
                } else {
                    return "Joined";
                }
            };
            for(var i=0;i<result.length;i++){
                html+='<li class="item-content"><div class="item-inner"><div class="item-title">'+result[i].name+'</div><div style="padding-bottom:34px"class="item-after"><p><a data-id="'+result[i].id+'" data-status="'+getStatus(result[i])+'" data-ucid="'+result[i].ucid+'" href="#" class="button '+(getStatus(result[i]) == 1 ? 'join' : 'joined')+'">'+getStatusText(result[i])+'</a></p></div></div></li>';
            }
            $$("#communitylist").append(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            myApp.alert("Error please contact the admin");
        },
        complete: function() {
            myApp.hidePreloader("Loading");
        }
    });   
    
}

function GettingBaseInterest(){
    myApp.showPreloader("Loading");
    $$.ajax({
        url: "http://sitrep2.azurewebsites.net/api/GetAllInterests?lastindex=0&pagesize=10&userId="+localStorage.getItem("id"),
        method: "GET",
        success: function (data) {
            var dataResult = JSON.parse(data);
            var result = dataResult.result;
            var html='';
            for(var i=0;i<result.length;i++){
                html+='<li class="item-content"><div class="item-inner"><div class="item-title">'+result[i].name+'</div><div style="padding-bottom:34px"class="item-after"><p><a data-id="'+result[i].id+'" data-status="'+(result[i].isfollow ? 2 : 1)+'" data-uiid="'+result[i].uiid+'" href="#" class="button '+(result[i].isfollow ? 'joined' : 'join')+'">'+(result[i].isfollow ? 'UnFollow' : 'Follow')+'</a></p></div></div></li>';
            }
            $$("#interestlist").append(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            myApp.alert("Error please contact the admin");
        },
        complete: function() {
            myApp.hidePreloader("Loading");
        }
    });   
}

function GettingHomepage() {
    myApp.showPreloader("Loading");
    $$.ajax({
        url: "http://sitrep2.azurewebsites.net/api/GetAllSitreps?lastindex=0&pagesize=10&userId="+localStorage.getItem("id"),
        method: "GET",
        success: function (data) {
            var dataResult = JSON.parse(data);
            var result = dataResult.result;
            var html='';
            for(var i=0;i<result.length;i++){
                html+='<div class="card facebook-card"><div class="card-header"><div class="facebook-avatar"><img  src="http://sitrep2.azurewebsites.net/Image/GetUserPhoto/'+result[i].createdby+'" width="34" height="34"></div><div class="facebook-name">'+result[i].createdbyname+'</div><div class="facebook-date">Monday at 2:15 PM</div></div><div class="card-content"><div class="card-content-inner"><p>'+result[i].description+'</p><img src="http://sitrep2.azurewebsites.net/Image/GetSitrepPhoto/'+result[i].id+'" width="100%"><p class="color-gray">Likes: 112    Comments: 43</p></div></div><div class="card-footer"><a href="#" class="link">Like</a><a href="#" class="link">Comment</a><a href="#" class="link">Share</a></div></div>';
            }
            $$("#sitreplist").append(html);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            myApp.alert("Error please contact the admin");
        },
        complete: function() {
            myApp.hidePreloader("Loading");
        }
    });
}

function GettingPRPU(){
    
    var id=localStorage.getItem('id');
     myApp.showPreloader("Loading");
    $$.ajax(
    {
        url:"http://sitrep.azurewebsites.net/api/GetPublicAndPrivateCommunities?userid="+id,
        method: "Get",
       
        success: function (data, xhr)
        {
            debugger;
            debugger;
            localStorage.setItem("PRPU",data);
          console.log(JSON.parse(localStorage.getItem("storeditem")));
           // GetPromotions();
        //  GetBundless();
            myApp.hidePreloader("Loading")
        //  Summation(data);
          var x= localStorage.getItem(0);
          var z=JSON.parse(x);
            
            
        },
        error: function (jqXhr, textStatus, errorThrown)
        {
                debugger;
          myApp.alert('error');
             myApp.hidePreloader();
        }
    });   
     
    
}

function Gettingpulice(){
    debugger;
    var id=localStorage.getItem('id');
     myApp.showPreloader("Loading");
    $$.ajax(
    {
        url:" http://sitrep.azurewebsites.net/api/GetPublicCommunities?lastindex=0&pagesize=40&userid="+id,
        method: "Get",
        success: function (data, xhr)
        {
            debugger;
            localStorage.setItem("pupcom",data);
            myApp.hidePreloader("Loading");
            appnedpupcom();
        },
        error: function (jqXhr, textStatus, errorThrown)
        {
                debugger;
          myApp.alert('error');
             myApp.hidePreloader();
        }
    });   
}

function Gettingpri(){
    var id=localStorage.getItem('id');
    debugger;
     myApp.showPreloader("Loading");
    $$.ajax(
    {
        url:" http://sitrep.azurewebsites.net/api/GetPrivateCommunities?lastindex=0&pagesize=40&userid="+id,
        method: "Get",
        success: function (data, xhr)
        {
            debugger;
            localStorage.setItem("pricom",data);
            myApp.hidePreloader("Loading");
            appnedpricom();
        },
        error: function (jqXhr, textStatus, errorThrown)
        {
                debugger;
          myApp.alert('error');
             myApp.hidePreloader();
        }
    });   
     
    
}

function  appnedpupcom(){
    debugger;
    var s=localStorage.getItem('pupcom');
    var d=JSON.parse(s);
    var r=d.result;
    html='';
    
    for(var i=0;i<r.length;i++){
        html+='<li id="'+r[i].id+'" class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner"><div class="item-title">"'+r[i].description+'"</div><div class="item-after"> <input id="'+r[i].id+'" type="checkbox" name="my-checkbox" value="Books" checked="checked"><div class="item-media"><i class="icon icon-form-checkbox"></i></div></div></div></li>'; 
    }
    $$("#pup").append(html);
    
    
}

function  appnedpricom(){
    debugger;
    var s=localStorage.getItem('pricom');
    var d=JSON.parse(s);
    var r=d.result;
    
    html='';
    
    for(var i=0;i<r.length;i++){
        html+='<li id="'+r[i].id+'" class="item-content"><div class="item-media"><i class="icon icon-f7"></i></div><div class="item-inner"><div class="item-title">'+r[i].description+'</div><div class="item-after"> <input data-type="'+r[i].communitytype+'" id="'+r[i].id+'" type="checkbox" name="my-checkbox" value="Books" checked="checked"><div class="item-media"><i class="icon icon-form-checkbox"></i></div></div></div></li>';    
    }
    $$("#pri").append(html);
}

function appnedPRPU(){    
}

function appendloc(){
    debugger;
var location=localStorage.getItem('location23');
var locationjson=JSON.parse(location);
var loc0=locationjson[0].address_components;
localStorage.setItem('locz',loc0[0].long_name)
  
    html=''
    for(var i=1;i<loc0.length;i++){
    html+='<li> <label id="'+loc0[i].long_name+'"  class="label-radio item-content"><input type="radio" name="my-radio" value="Books" checked="checked"><div class="item-media"><i class="icon icon-form-radio"></i></div><div class="item-inner"><div class="item-title">"'+loc0[i].long_name+'"</div></div></label></li>';}
    $$("#ul").append(html)
    
    
    
    
    
    
}