/* eslint-disable indent */
const gformArr = document.querySelectorAll('.js-gform');

function validEmail(email) { // see:
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

// get all data in form and return object
function getFormData(currentForm) {
    const form = currentForm;
    const elements = form.elements; // all form elements
    const fields = Object.keys(elements).filter((k) =>
        // the filtering logic is simple, only keep fields that are not the honeypot
        (elements[k].name !== 'honeypot')).map((k) => {
        if (elements[k].name !== undefined) {
            return elements[k].name;
            // special case for Edge's html collection
        } else if (elements[k].length > 0) {
            return elements[k].item(0).name;
        }
    }).filter((item, pos, self) => self.indexOf(item) == pos && item);
    const data = {};
    fields.forEach((k) => {
        data[k] = elements[k].value;
        let str = ''; // declare empty string outside of loop to allow
        // it to be appended to for each item in the loop
        if (elements[k].type === 'checkbox') { // special case for Edge's html collection
            str = `${str + elements[k].checked}, `; // take the string and append
            // the current checked value to
            // the end of it, along with
            // a comma and a space
            data[k] = str.slice(0, -2); // remove the last comma and space
            // from the  string to make the output
            // prettier in the spreadsheet
        } else if (elements[k].length) {
            for (let i = 0; i < elements[k].length; i++) {
                if (elements[k].item(i).checked) {
                    str = `${str + elements[k].item(i).value}, `; // same as above
                    data[k] = str.slice(0, -2);
                }
            }
        }
    });

    // add form-specific values into the data
    data.formDataNameOrder = JSON.stringify(fields);
    data.formGoogleSheetName = form.dataset.sheet || 'responses'; // default sheet name
    data.formGoogleSendEmail = form.dataset.email || ''; // no email by default

    //console.log(data);
    return data;
}

function handleFormSubmit(event) {  // handles form submit withtout any jquery
    event.preventDefault();           // we are submitting via xhr below

    const currentForm = event.target;
    const data = getFormData(currentForm);         // get the values submitted in the form
    $(currentForm).find('input[type=tel]').val('');
    $(currentForm).find('input[type=tel]').attr("placeholder", "Заявка отправлена").focus().blur();

    if (data.email && !validEmail(data.email)) {   // if email is not valid show error
        const invalidEmail = document.getElementById('email-invalid');
        if (invalidEmail) {
            invalidEmail.style.display = 'block';
            return false;
        }
    } else {
        const url = event.target.action;  //
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            //console.log(xhr.status, xhr.statusText);
            //console.log(xhr.responseText);
            $('.js-modal-form-vp').modal('show');

            setTimeout(function () {
                $('.js-modal-form-vp').modal('hide');
            }, 10000);

        };
        // url encode form data for sending as post data
        const encoded = Object.keys(data).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&');
        xhr.send(encoded);
    }
}

function loaded() {
    for (let i = 0; i < gformArr.length; i++) {
        gformArr[i].addEventListener('submit', handleFormSubmit, false);
    }
}

if (gformArr.length > 0) {
    document.addEventListener('DOMContentLoaded', loaded, false);
}


