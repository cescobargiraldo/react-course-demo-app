export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    }
}

export const checkInputValidity = (value, rules) => {
    let valid = true

    if (!rules) {
        return valid
    }

    if (rules.required) {
        valid = value !== '' && valid
    }

    if (rules.minLength) {
        valid = value.length >= rules.minLength && valid
    }

    if (rules.maxLength) {
        valid = value.length <= rules.maxLength && valid
    }

    return valid
}
