app.filter('type', function() { //可以注入依赖
    return function(text) {
        if(text === 0){
            return text = "首页banner"
        }
        if(text === 1){
            return text = "找职位banner "
        }
        if(text === 2){
            return text = "找精英banner"
        }
        if(text === 3){
            return text = "行业大图"
        }
    }
});

app.filter('status', function() { //可以注入依赖
    return function(text) {
        if(text === 1){
            return text = "草稿"
        }
        if(text === 2){
            return text = "上线"
        }
    }
});

app.filter('typeFilter',function(){
    return function (a){
        switch (a){
            case "首页Banner":
                a =  0;
                break;
            case "找职位Banner":
                a = 1;
                break;
            case "行业大图":
                a = 3;
                break;
            case "找精英Banner":
                a = 2;
                break;
        }
        return a;
    }
});

app.filter('statusFilter',function(){
    return function (a){
        switch (a){
            case "草稿":
                a = 1;
                break;
            case "上线":
                a = 2;
                break;

        }
        return a;
    }
});