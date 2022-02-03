/**
 * Função utilizada para converter os numero para o formato
 * da moeda brasileira Real.
 * @param {number} num - o numero que deseja converte
 * @returns String do numero convertido em formato de Real
 */
export const currencyFormatBR = (num: number): string => {
    const number = Number(num)
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    if (number == 'NaN')
        return '0,00'
    else
        return number
}