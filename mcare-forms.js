
function hideDevices() {
    var devices = document.querySelectorAll('.js-device-radio-button');
    devices.forEach((device) => {
      device.style.display = 'none';
    });
}

function hideSections() {
    var sections = document.querySelectorAll('.js-device-section');
    sections.forEach((section) => {
      section.style.display = 'none';
    });
}

function displayDevices(manufacturer) {
    hideDevices();
    var manufacturerName = manufacturer.nextElementSibling.textContent;
    var devices = document.querySelectorAll('.js-device-radio-button');
    devices.forEach((device) => {
        if (device.querySelector('.js-brandname').textContent == manufacturerName) {
            device.style.display = 'block';
        }
    });
    displaySections(manufacturerName);
}

function displaySections(manufacturerName) {
    hideSections();
    var sections = document.querySelectorAll('.js-device-section');
    
    sections.forEach((section) => {
        var brandNames = [];
        var devices = section.querySelectorAll('.js-device-radio-button');
        devices.forEach((device) => {
            if (device.style.display === 'block') {
                var brand = device.querySelector(".js-brandname").textContent;
                brandNames.push(brand);
            }
        });
        brandNames = [...new Set(brandNames)];

        var arrayContainsManufacturer = (brandNames.indexOf(manufacturerName) > -1);

        if (arrayContainsManufacturer) {
            section.style.display = 'block';
        }
    });

}

function displayLocations(deliveryOption) {
    if (deliveryOption.id == 'Drop-off') {
        document.querySelector('.js-locations').style.display = 'block';
        document.querySelector('.js-send-in').style.display = 'none';
        document.querySelector('.js-home-package').style.display = 'none';
    } else if (deliveryOption.id == 'send-in') {
        document.querySelector('.js-locations').style.display = 'none';
        document.querySelector('.js-send-in').style.display = 'block';
        document.querySelector('.js-home-package').style.display = 'none';
    } else if (deliveryOption.id == 'home-package') {
        document.querySelector('.js-locations').style.display = 'none';
        document.querySelector('.js-send-in').style.display = 'none';
        document.querySelector('.js-home-package').style.display = 'block';
    } else {
        document.querySelector('.js-locations').style.display = 'none';
        // Uncheck the dropoff location
        if (document.querySelector('input[type="radio"][name="Dropoff-Location"]:checked')) {
            document.querySelector('input[type="radio"][name="Dropoff-Location"]:checked').closest('.w-radio').querySelector('.w-radio-input').classList.remove('w--redirected-checked');
            document.querySelector('input[type="radio"][name="Dropoff-Location"]:checked').checked = false;
        }

    }
}

function displayAdditionals(product) {
    var services = document.querySelectorAll('.js-service');
    var deviceType = product.dataset.devicetype;

    services.forEach((service) => {
        service.style.display = 'none';
    });

    var allServicesHidden = true;

    services.forEach((service) => {
        var deviceTypeServices = service.querySelectorAll('.js-devicetype > div');
        deviceTypeServices.forEach((deviceTypeService) => {
            if (deviceTypeService.textContent == deviceType) {
                service.style.display = 'block';
                allServicesHidden = false;
            }
        });
    });

    var allServicesContainer = document.querySelector('.js-additional-services');
    if (allServicesHidden == true) {
        allServicesContainer.style.display = 'none'
    } else {
        allServicesContainer.style.display = 'block'
    }
}


function trackChanges() {
    var manufacturers = document.querySelectorAll('input[type=radio][name="Manufacturer"]');
    manufacturers.forEach(manufacturer => manufacturer.addEventListener('change', () => displayDevices(manufacturer)));
    
    // Change input attributes with js
    document.querySelectorAll('.js-device-input-change').forEach((item, index) => {
        var value = item.getAttribute('data-value');
        var optionValue = item.getAttribute('data-option-value');
        if (value) {
            var input = item.closest('.sell-form-devices-item').querySelector('input[type=radio][name="Product-family-Product"]');
            input.setAttribute('id', value + '-' + index);
            input.setAttribute('data-devicetype', value);
            input.setAttribute('value', optionValue);
        }
    });

    // Change input attributes with js
    document.querySelectorAll('.js-manufacturor-input-change').forEach((item, index) => {
        var value = item.getAttribute('data-value');
        if (value) {
            var input = item.closest('.brands-order-grid-item-select').querySelector('input[type=radio][name="Manufacturer"]');
            input.setAttribute('id', value + '-' + index);
            input.setAttribute('value', value);
        }
    });

    var products = document.querySelectorAll('input[type=radio][name="Product-family-Product"]');
    products.forEach(product => product.addEventListener('change', () => {
        var selectedProduct = document.querySelector('input[type=radio][name="Product-family-Product"]:checked');
        displayAdditionals(selectedProduct);
    }));
    
    var deliveryOptions = document.querySelectorAll('input[type=radio][name="delivery"]');
    deliveryOptions.forEach(deliveryOption => deliveryOption.addEventListener('change', () => displayLocations(deliveryOption)));
}


document.addEventListener("DOMContentLoaded", function() {
    hideDevices();
    hideSections();
    trackChanges();
});


const checkboxes = document.querySelectorAll('.order-additionalservices-checkbox-checkbox');
const hiddenInput = document.querySelector('#additional-services-input');

// Add event listener to each checkbox
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    let checkedServices = []; // Array to store the checked checkbox values

    // Loop through all the checkboxes and add the checked ones to the array
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        checkedServices.push(checkbox.value);
      }
    });

    // Set the value of the hidden input field to the comma-separated list of checked checkbox values
    hiddenInput.value = checkedServices.join(', ');
  });
});

// Thank you message

document.addEventListener('DOMContentLoaded', function() {
    
    
    const printButton = document.querySelector('.order-kiosk-print');

    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }



    // Capture changes for Manufacturer radio buttons
    const manufacturerRadioButtons = document.querySelectorAll('input[type="radio"][data-name="Manufacturer"]');
    manufacturerRadioButtons.forEach(function(radio) {
        radio.addEventListener('change', function() {
            if (this.checked) {
                const value = this.value;
                document.getElementById('manufacturerDisplay').textContent = value;
            }
        });
    });

    // Capture changes for Product family Product radio buttons
    const productFamilyRadioButtons = document.querySelectorAll('input[type="radio"][data-name="Product family Product"]');
    productFamilyRadioButtons.forEach(function(radio) {
        radio.addEventListener('change', function() {
            if (this.checked) {
                const value = this.value;
                document.getElementById('productFamilyDisplay').textContent = value;
            }
        });
    });

    // Capture changes for Serial number text input
    const serialNumberInput = document.querySelector('input[name="Serial-number"]');
    serialNumberInput.addEventListener('input', function() {
        const value = this.value;
        document.getElementById('serialNumberDisplay').textContent = value;
    });

    // Capture changes for Email text input
    const emailInput = document.querySelector('input[name="Email"]');
    emailInput.addEventListener('input', function() {
        const value = this.value;
        document.getElementById('emailDisplay').textContent = value;
    });

    // Combine and display values from Firstname and Lastname text inputs
    const firstNameInput = document.querySelector('input[name="Firstname"]');
    const lastNameInput = document.querySelector('input[name="Lastname"]');
    
    function updateFullNameDisplay() {
        const combinedName = `${firstNameInput.value} ${lastNameInput.value}`;
        document.getElementById('fullNameDisplay').textContent = combinedName.trim();
    }

    firstNameInput.addEventListener('input', updateFullNameDisplay);
    lastNameInput.addEventListener('input', updateFullNameDisplay);

    // Capture changes for Phone text input
    const phoneInput = document.querySelector('input[name="Phone"]');
    phoneInput.addEventListener('input', function() {
        const value = this.value;
        document.getElementById('phoneDisplay').textContent = value;
    });
  
  
  
  
  
});
