
$http({
    method: "GET",
    url: "data.json",
    eventHandlers: {
        progress: function(event) {
            console.log("progress");
            console.log(event);
        },
        readystatechange: function(event) {
            console.log("change");
            console.log(event);
        }
    },
    uploadEventHandlers: {
        progress: function(object) {
            console.log(object);
        }
    }
})
    .success(function(json) { // succès
        $scope.lemmes = json;
        //console.log($http);
    }).error(function(error) { // erreur
    console.log(error);
});