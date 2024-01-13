export function autoscroll(node: HTMLElement) {
    let mouseX = 0;
    let mouseY = 0;
    let dndRefY = 0;
    let dragging: boolean;

    function handlePointerMove(e: PointerEvent) {
        const { top, left } = node.getBoundingClientRect();
        mouseY = e.clientY - top;
        mouseX = e.clientX - left;
    }

    function handleScroll() {
        dndRefY = node.scrollLeft;
    }

    window.addEventListener('pointermove', handlePointerMove);
    node.addEventListener('scroll', handleScroll);
    
    return {
        destroy() {
            window.removeEventListener('pointermove', handlePointerMove)
            node.removeEventListener('scroll', handleScroll)
        }
    }
}