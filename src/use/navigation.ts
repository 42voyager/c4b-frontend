/**
 * Scroll a tela para o elemento indicado com o id 
 * @param id id do elemento html
 */
export const goToElement = (id: string): void => {
    const node = document.getElementById(id)!
    node.scrollIntoView({
        behavior: 'smooth',
    })
    const scrolledY = node.offsetTop
    if (scrolledY) {
        window.scroll(0, scrolledY)
    }
}
