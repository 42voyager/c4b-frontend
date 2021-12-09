export const checkErrorsReturn = (data: Array<string>): boolean => {
	if (data != undefined && data.length != 0) return false;
	else return true;
}