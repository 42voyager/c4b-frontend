export enum EValidity {
    Valid,
    Invalid,
    Undefined
}
export const checkErrorsReturn = (data: Array<string>): boolean => {
    if (data != undefined && data.length != 0) return false
    else return true
}
export const capitalize = (name: string): string => {
    return name[0].toUpperCase() + name.substr(1).toLowerCase()
}