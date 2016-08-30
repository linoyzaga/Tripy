TripApp.controller('helpUsCtrl', ['$scope', '$q', 'addLocation', 'addSite', 'getLocations', 'getSites', 'uploadILocation', 'uploadSite',
    function ($scope, $q, addLocation, addSite, getLocations, getSites, uploadILocation, uploadSite) {
        // Choose the adding option
        $scope.addLocationFlag = false;
        $scope.addSiteFlag = false;

        // Init the variables
        $scope.formLocaion = {};
        $scope.site = [];
        $scope.site.activityHours = "";
        $scope.site.price = "";
        $scope.site.publicTransport = "";
        $scope.site.history = "";
        $scope.site.tips = "";
        $scope.site.rating = 0;
        $scope.site.latitude = 0;
        $scope.site.longitude = 0;

        // Scrolling the page up
        window.scrollTo(0, 0);

        $scope.loadImageLoader = function() {
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
        }

        // Function to covert address to Latitude and Longitude
        $scope.getCoordinates =  function(address) {

            var def = $q.defer();
            var geocoder = new google.maps.Geocoder();

            // Getting the coordinates
            geocoder.geocode( {'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    def.resolve(results);
                } else {
                    def.reject();
                }
            });

            //$scope.site.latitude = latitude;
            //$scope.site.longitude = longitude;
            return def.promise;
        }

        // Getting all the locations from the server
        getLocations.getAllLocations().success(function(data){

            // Save all the locations
            $scope.allLocations = data;
        }).error(function(data){
            console.log(data);
        });

        // Getting all the sites from the server
        getSites.getAllSites().success(function(data){

            // Save all the sites
            $scope.allSites = data;

        }).error(function(data){
            console.log(data);
        })

        $scope.AddLocationBool = function () {

            // Check if the location if false
            if ($scope.addLocationFlag == false)
            {
                $scope.addLocationFlag = true;
                $scope.addSiteFlag = false;
                $scope.loadImageLoader();
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
                $scope.loadImageLoader();
            }
            else if ($scope.addSiteFlag == true)
            {
                $scope.addSiteFlag = false;
            }
        }

        $scope.AddNewLocation = function () {

            // Init the variables
            var file = document.getElementById('locationFile').files[0];

            // Check if the file exist
            if (file != undefined) {
                var name = $scope.formLocaion.name + '.jpg';

                var fd = new FormData();
                fd.append('file', file, name);

                // Check if the location is already exists
                var isExists = false;
                for (var i = 0, len = $scope.allLocations.length; i < len; i++) {
                    if ($scope.allLocations[i].name == $scope.formLocaion.name) {
                        isExists = true;
                    }
                }

                // Send the data to the server
                if (!isExists) {

                    // Upload the image
                    uploadILocation.uploadNewImage(fd).success(function (data) {
                        console.log(data);

                    }).error(function (data) {
                        console.log(data);
                    })

                    // Add the location to database
                    addLocation.addNewLocation($scope.formLocaion.name).success(function (data) {

                        BootstrapDialog.show({
                            message: 'Your location have been saved. Thank you for helping us!'
                        });

                    }).error(function (data) {
                        console.log(data);
                    });
                }
                else {
                    BootstrapDialog.show({message: 'The location you added is allredy exists.'});
                }

                // Hiding the boxes
                $scope.addLocationFlag = false;
                $scope.formLocaion.name = "";

                // Reload locations
                getLocations.getAllLocations();
            }
            else {
                BootstrapDialog.show({message: 'Please enter a photo.'});
            }
        }

        // Add new site
        $scope.AddNewSite = function () {

            // Init the variables
            var file = document.getElementById('siteFile').files[0];

            // Check if the file exist
            if (file != undefined) {

                // Check if the location is already exists
                var isExists = false;
                for (var i = 0, len = $scope.allSites.length; i < len; i++) {
                    if ($scope.allSites[i].name == $scope.site.name) {
                        isExists = true;
                    }
                }

                // Send the data to the server
                if (!isExists) {

                    // Init the image variables
                    var name = $scope.site.name.replace(/\s/g, "") + '.jpg';
                    var fd = new FormData();
                    fd.append('file', file, name);

                    // Upload the image
                    uploadSite.uploadNewImage(fd).success(function (data) {
                        console.log(data);

                    }).error(function (data) {
                        console.log(data);
                    })

                    // Init the site variables
                    $scope.site.image = "images/sites/" + name;
                    $scope.site.locationID = $scope.site.locationID._id;

                    // Getting the coordinates
                    $scope.getCoordinates($scope.site.address).then(function(results){

                        $scope.site.latitude = results[0].geometry.location.lat();
                        $scope.site.longitude = results[0].geometry.location.lng();

                        // Insert the site data to the database
                        addSite.addNewSite($scope.site.name, $scope.site.image, $scope.site.rating, $scope.site.address,
                            $scope.site.activityHours, $scope.site.history, $scope.site.publicTransport, $scope.site.price,
                            $scope.site.tips, $scope.site.locationID, $scope.site.latitude, $scope.site.longitude)
                            .success(function (data) {

                                BootstrapDialog.show({message: 'Your site have been saved. Thank you for helping us!'});

                                // Clearing the boxes
                                $scope.site.name = "";
                                $scope.site.locationID = "";
                                $scope.site.activityHours = "";
                                $scope.site.address = "";
                                $scope.site.price = "";
                                $scope.site.publicTransport = "";
                                $scope.site.history = "";
                                $scope.site.tips = "";
                                $scope.site.rating = 0;
                                $scope.site.latitude = 0;
                                $scope.site.longitude = 0;

                                // Hiding the form
                                $scope.addSiteFlag = false;

                            }).error(function (data) {
                                 console.log(data);
                        });
                    });
                }
                else {
                    BootstrapDialog.show({message: 'The site you added is allready exists.'});
                }

                // Init all sites again
                getSites.getAllSites().success(function(data){

                    // Save all the sites
                    $scope.allSites = data;

                })

            } else { BootstrapDialog.show({message: 'Please enter a photo.'}); }
        }

        // Star rating
        $scope.rating = 0;
        $scope.ratings = [{
            current: 1,
            max: 5
        }];

        $scope.getSelectedRating = function (rating) {
            $scope.site.rating = rating.current;
        }
    }]);