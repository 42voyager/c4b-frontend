export enum EValidity {
    Valid,
    Invalid,
    Undefined
}
export const checkErrorsReturn = (data: Array<string>): boolean => {
    console.log(data, 'teste')
    if (data != undefined && data.length != 0) return false
    else return true
}