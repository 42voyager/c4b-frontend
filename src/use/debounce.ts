/**
 * Function that creates a debounce function that can be called and it
 * will wait a "timeout" time in ms to be called or canceled if another
 * call is made between that window of time.
 * @param cb function to be called
 * @param timeOut delay time in ms
 */
export const debounce = <F extends (...args: any[]) => unknown>(
    cb: F,
    timeOut = 500
): ((...args: Parameters<F>) => void) => {
    let timer = 0

    return (...args: Parameters<F>) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            cb.apply(this, args)
        }, timeOut)
    }
}
