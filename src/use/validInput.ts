export enum EValidity {
    Valid,
    Invalid,
    Undefined
}

/**
 * Check if data is empty or undefined
 * @param data the array to be checked
 * @returns False if data is empty or undefined. Otherwise true.
 */
export const checkErrorsReturn = (data: Array<string>): boolean => {
    if (data != undefined && data.length != 0) return false
    else return true
}

/**
 * Capitalize the string passed
 * @param name The string to be capitalize
 * @returns The capitalized string.
 */
export const capitalize = (name: string): string => {
    return name[0].toUpperCase() + name.substr(1).toLowerCase()
}

/**
 * Validate the name passed.
 * Only character is allowed.
 * @param name The name to be validated
 * @returns On sucess true. False if something its not right.
 */
export const validName = (name: string): boolean => {
    if (name.length < 2)
        return false
    const reg = /[a-zA-Z\u00C0-\u00FF ]+/i
    return reg.test(name)
}

/**
 * Validate the email passed.
 * @param email The email to be validate.
 * @returns On sucess true. False if something its not right.
 */
export const validEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

/**
 * Validate the cellphone number with the mask.
 * @param phone The number to be validate.
 * @returns On sucess true. False if something its not right.
 */
export const validPhone = (phone: string): boolean => {
    const regex = new RegExp(/(\(\d{2}\)\s)(\d{5}-\d{4})/g)
    return regex.test(phone)
}

/**
 * Validate the cnpj passed with the mask.
 * @param cnpj The CNPJ to be validate.
 * @returns On sucess true. False if something its not right.
 */
export const validCnpj = (cnpj: string): boolean => {
    const regex = /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/
    return regex.test(cnpj)
}