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