TripApp.controller('helpUsCtrl', ['$scope', 'addLocation', 'addSite', 'getLocations', function ($scope, addLocation, addSite, getLocations) {

    // Scrolling the page up
    window.scrollTo(0, 0);

    // Init the google map
    function init_map() {
        var var_location = new google.maps.LatLng(45.430817, 12.331516);

        var var_mapoptions = {
            center: var_location,
            zoom: 14
        };

        var var_marker = new google.maps.Marker({
            position: var_location,
            map: var_map,
            title: "Earth"
        });

        var var_map = new google.maps.Map(document.getElementById("map-container"),
            var_mapoptions);

        var_marker.setMap(var_map);
    }

    google.maps.event.addDomListener(window, 'load', init_map);

    // Init the image preview
    $(document).on('click', '#close-preview', function () {
        $('.image-preview').popover('hide');
        // Hover befor close the preview
        $('.image-preview').hover(
            function () {
                $('.image-preview').popover('show');
            },
            function () {
                $('.image-preview').popover('hide');
            }
        );
    });

    $(function () {

        // Create the close button
        var closebtn = $('<button/>', {
            type: "button",
            text: 'x',
            id: 'close-preview',
            style: 'font-size: initial;',
        });
        closebtn.attr("class", "close pull-right");

        // Set the popover default content
        $('.image-preview').popover({
            trigger: 'manual',
            html: true,
            title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
            content: "There's no image",
            placement: 'bottom'
        });

        // Clear event
        $('.image-preview-clear').click(function () {
            $('.image-preview').attr("data-content", "").popover('hide');
            $('.image-preview-filename').val("");
            $('.image-preview-clear').hide();
            $('.image-preview-input input:file').val("");
            $(".image-preview-input-title").text("Browse");
        });

        // Create the preview image
        $(".image-preview-input input:file").change(function () {
            var img = $('<img/>', {
                id: 'dynamic',
                width: 250,
                height: 200
            });
            var file = this.files[0];
            var reader = new FileReader();

            // Set preview image into the popover data-content
            reader.onload = function (e) {
                $(".image-preview-input-title").text("Change");
                $(".image-preview-clear").show();
                $(".image-preview-filename").val(file.name);
                img.attr('src', e.target.result);
                $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
            }
            reader.readAsDataURL(file);
        });
    });

    // Choose the adding option
    $scope.addLocationFlag = false;
    $scope.addSiteFlag = false;

    // Getting all the locations from the server
    getLocations.getAllLocations().success(function(data){

        // Save all the locations
        $scope.allLocations = data;
    }).error(function(data){
        console.log(data);
    });

    $scope.AddLocationBool = function () {

        // Check if the location if false
        if ($scope.addLocationFlag == false)
        {
            $scope.addLocationFlag = true;
            $scope.addSiteFlag = false;
        }
        else if ($scope.addLocationFlag == true)
        {
            $scope.addLocationFlag = false;
        }
    }

    $scope.AddSiteBool = function () {

        // Check if the location if false
        if ($scope.addSiteFlag == false)
        {
            $scope.addSiteFlag = true;
            $scope.addLocationFlag = false;
        }
        else if ($scope.addSiteFlag == true)
        {
            $scope.addSiteFlag = false;
        }
    }

    $scope.AddNewLocation = function () {

        debugger;
        // Init the variables
        var file = document.getElementById('locationFile').files[0];
        var fd = new FormData();
        fd.append('file', file);

        // Check if the location is already exists
        var isExists = false;
        for (var i = 0, len = $scope.allLocations.length; i < len; i++) {
            if ($scope.allLocations[i].name == $scope.formLocaion.name)
            {
                isExists = true;
            }
        }

        // Send the data to the server
        if (!isExists) {

            debugger;
            addLocation.addNewLocation($scope.formLocaion.name, fd).success(function (data) {
                console.log("The location info saved");

                BootstrapDialog.show({
                    message: 'Your location have been saved. Thank you for helping us!'
                });

            }).error(function (data) {
                console.log(data);
                console.log("The location info did not save");
            });
        }
        else {
            BootstrapDialog.show({
                message: 'The location you added is allredy exists.'
            });
        }

        // Clearing the boxes
        $scope.formLocaion.name = "";
        $scope.LformLocation.img = "";

    }

    // Add new site
    $scope.AddNewSite = function () {

    }

}]);