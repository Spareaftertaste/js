

$(function(){
	$('.login').click(function(){
		var username = $(".username").val(),
            password = $(".password").val(),
            ajax = null;
    if(window.XMLHttpRequest) {//兼容ie
    	ajax = new XMLHttpRequest();
    	} else {
		ajax = new window.ActiveXObject("Microsoft.XMLHTTP");
	    }
	$.ajax({
        type:"post",//请求的方式
        url:"/carrots-admin-ajax/a/login",//请求的url地址
        dataType:"JSON",//返回格式为json
        data:{//参数值
            "name":username,
            "pwd":password
        },
        async:true,//请求是否异步，默认为异步，这也是ajax重要特性
        beforeSend:function(){
            //请求前的处理
        },
        success:function(a){//请求成功时的处理
            if(a.message === "success"){
                alert("登录成功");
            } else {
                $(".alert").text(a.message);
            }
        },
        complete:function(){
            //请求完成的处理
        },
        error:function() {
            //请求出错处理
        }
        });
	})
});


