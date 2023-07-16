/**
 * @param { string } str
 * @returns { string } 
 */
export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @param { string } str
 * @returns { string } 
 */
export const populateForm = (form, data) => {

    for (let key in data) {
        if (form.value[key]) form.value[key].value = data[key];
    }

   // return form
};