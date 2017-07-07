(function (){
    var elements = {
        btnOpen: document.getElementById("open-modal"),
        modal: document.getElementById("modal-window"),
        btnClose : document.getElementById("close-modal"),
        selectYearInput : document.getElementById("manufacturingYear"),
        damagedVehicle : document.getElementById("damagedVehicle"),
        radioBtns: document.querySelectorAll("input[name=damaged]"),
        textareaDamaged : document.getElementById("damagedVehicle"),
        btnSubmit : document.getElementById("submit"),
        btnCancel : document.getElementById("cancel"),
        inputAnnouncement : document.querySelector("input[name=announcement_title]"),
        selectBrand : document.querySelector("select[name=car_brand]"),
        inputCarYear : document.querySelector("input[name=car_year]"),
        inputMileage : document.querySelector("input[name=mileage_number]"),
        inputPrice : document.querySelector("input[name=car_price]"),
        selectFuel : document.querySelector("select[name=fuel_type]"),
        inputCarColor : document.querySelector("input[name=car_color]"),
        carColor : document.getElementById("car-color"),
        carBrandImage : document.getElementById("car-brand-image"),
        announcementWarning : document.querySelector("div.announcement .warning"),
        carMileageWarning : document.querySelector("div.carMileage .warning"),
        carYearWarning : document.querySelector("div.carYear .warning"),
        carFuelWarning : document.querySelector("div.carFuel .warning"),
        carColorWarning : document.querySelector("div.carColor .warning"),
        carBrandWarning : document.querySelector("div.carBrand .warning"),
        damagedVehicleWarning : document.querySelector("div.damaged-vehicle .warning"),
        carPriceWarning : document.querySelector("div.car-price .warning")

    };

    var methods = {
        openModal : function() {
            elements.modal.style.visibility = "inherit";
            this.style.display = "none";
        },
        closeModal : function(e) {
            e.preventDefault();
            elements.modal.style.visibility = "hidden";
            elements.btnOpen.style.display = "block";
        },
        populateManufacturingYear : function () {
            var date = new Date();
            var currentYear = date.getFullYear();
            for(i=currentYear; i>=1900; i--) {
                elements.selectYearInput.innerHTML += "<option value='" + i +"'>"+i+"</option>";
            }
        },
        checkDamagedOption : function () {
            for(var i =0 ; i<elements.radioBtns.length; i++) {
                elements.radioBtns[i].addEventListener("click", function (e) {
                    if(this.getAttribute("value") === "Yes" && this.checked) {
                        elements.textareaDamaged.style.display = "block";
                    } else {
                        elements.textareaDamaged.style.display = "none";
                        elements.textareaDamaged.value = "";
                    }
                });
            }
        },
        validateAnnouncement : function () {
            var regExp = /(^[^\s\W][a-z\d\s]*$)/gi;
            if(elements.inputAnnouncement.value.match(regExp)) {
                elements.announcementWarning.innerHTML = ""
                elements.inputAnnouncement.style.border = "1px solid  #d9d9d9";
                elements.inputAnnouncement.style.borderTop = "1px solid #c0c0c0";
                return true;
            } else {
                elements.announcementWarning.innerHTML = "*Fill with letters and numbers please";
                elements.inputAnnouncement.style.border = "1px solid #ca5656";
                return false;
            }
        },
        validateMileage : function () {
            var regExp = /(^[^\s][\d\s]*$)/gi;
            if(elements.inputMileage.value.match(regExp)) {
                elements.carMileageWarning.innerHTML = "";
                elements.inputMileage.style.border = "1px solid  #d9d9d9";
                elements.inputMileage.style.borderTop = "1px solid  #c0c0c0";
                return true;
            } else {
                elements.carMileageWarning.innerHTML = "*Fill with numbers only please";
                elements.inputMileage.style.border = "1px solid #ca5656";
                return false;
            }
        },
        validateManufacturingYear : function() {
            if(elements.selectYearInput.value === "") {
                elements.carYearWarning.innerHTML = "*Please choose an year";
                elements.selectYearInput.style.border = "1px solid #ca5656";
                return false;
            } else {
                elements.carYearWarning.innerHTML = "";
                elements.selectYearInput.style.border = "1px solid  #d9d9d9";
                elements.selectYearInput.style.borderTop = "1px solid  #c0c0c0";
                return true;
            }
        },
        validateFuelType : function() {
            if(elements.selectFuel.value === "") {
                elements.carFuelWarning.innerHTML = "*Please choose the fuel type";
                elements.selectFuel.style.border = "1px solid #ca5656";
                return false;
            } else {
                elements.carFuelWarning.innerHTML = "";
                elements.selectFuel.style.border = "1px solid  #d9d9d9";
                elements.selectFuel.style.borderTop = "1px solid  #c0c0c0";
                return true;
            }
        },
        validateCarColor : function () {
            //validate only HEX, rgba, and normal color names formats
            elements.carColor.removeAttribute("style");
            elements.carColor.style.background = elements.inputCarColor.value;
            var regExp = /(^[#]{1}[a-f0-9]{3}$)|(^[#]{1}[a-f0-9]{6}$)|(^[^\s][a-z]{2,}$)|(^rgb\(\b(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\b,\b(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\b,\b(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\b\))/gi;
            if(elements.inputCarColor.value.match(regExp) &&
                elements.carColor.style.background.length) {
                elements.carColorWarning.innerHTML = "";
                elements.inputCarColor.style.borderTop = "1px solid  #c0c0c0";
                elements.inputCarColor.style.border = "1px solid  #d9d9d9";
                elements.carColor.style.background = elements.inputCarColor.value;
                return true;
            } else {
                elements.carColorWarning.innerHTML = "*Enter a valid color type"
                elements.inputCarColor.style.border = "1px solid #ca5656";
                return false;
            }
        },
        validateCarBrand : function () {
            if(elements.selectBrand.value === "") {
                elements.carBrandWarning.innerHTML = "*Please choose the car brand";
                elements.selectBrand.style.border = "1px solid #ca5656";
                return false;
            } else {
                elements.carBrandWarning.innerHTML = "";
                elements.selectBrand.style.border = "1px solid  #d9d9d9";
                elements.selectBrand.style.borderTop = "1px solid  #c0c0c0";
                elements.carBrandImage.style.backgroundImage = "url('imgs/"+ elements.selectBrand.value +".png')";
                return true;
            }

        },
        carDamagedWarning: function () {
            if(!elements.radioBtns[0].checked && !elements.radioBtns[1].checked) {
                elements.damagedVehicleWarning.innerHTML = "*Please select the vehicle condition";
                return false;
            }else {
                if(elements.textareaDamaged.style.display === "block" &&
                    elements.textareaDamaged.value=== "") {
                    elements.damagedVehicleWarning.innerHTML = "*Please add damage details";
                    elements.textareaDamaged.style.border = "1px solid #ca5656";
                } else {
                    elements.damagedVehicleWarning.innerHTML = "";
                    elements.textareaDamaged.style.border = "1px solid  #d9d9d9";
                }
                return true;
            }
        },
        validateCarPrice :function () {
            var regExp = /(^[^\s][\d\s]*$)/gi;
            if(elements.inputPrice.value.match(regExp)) {
                elements.carPriceWarning.innerHTML = "";
                elements.inputPrice.style.border = "1px solid  #d9d9d9";
                elements.inputPrice.style.borderTop = "1px solid  #c0c0c0";
                return true;
            } else {
                elements.carPriceWarning.innerHTML = "*Fill with numbers only please";
                elements.inputPrice.style.border = "1px solid #ca5656";
                return false;
            }
        },
        onSubmit : function (event) {
            event.preventDefault();
            methods.validateAnnouncement();
            methods.validateCarBrand();
            methods.validateMileage();
            methods.validateManufacturingYear();
            methods.validateFuelType();
            methods.validateCarColor();
            methods.carDamagedWarning();
            methods.validateCarPrice();
            //do ajax request and send form data to server side
        }
    };

    methods.checkDamagedOption();
    methods.populateManufacturingYear();

    elements.btnOpen.addEventListener("click", methods.openModal);
    elements.btnClose.addEventListener("click", methods.closeModal);
    elements.btnCancel.addEventListener("click", methods.closeModal);

    elements.inputCarColor.addEventListener("focusout", methods.validateCarColor);
    elements.selectBrand.addEventListener("change", methods.validateCarBrand);

    elements.btnSubmit.addEventListener("click", methods.onSubmit);

})();
