export const validateInput = (input) => {
    if (input.validation === undefined) {
        return;
    }
    let valid = true;
    if (input.validation.required && input.value.trim() === '') {
        valid = false;
    }
    if (input.validation.minLength && input.value.trim().length < input.validation.minLength) {
        valid = false;
    }
    if (input.validation.isEmail && !input.value.trim().includes('@') ) {
        valid = false;
    }

    input.valid = valid;
};


export const validateForm = (form) => {
    let valid = true;
    for(const input of form.inputs) {
        if (input.validation) {
             valid = input.valid && valid;
        }
    }
    form.valid = valid;
};
