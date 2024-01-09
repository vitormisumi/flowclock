export function longpress(node: HTMLElement, delay = 500) {
    let timeout: number;
    let dragging = false;

    function handlePointerDown(e: PointerEvent) {
        if (e.pointerType === 'mouse') {
            node.dispatchEvent(new CustomEvent('longpress'))
        } else if (e.pointerType === 'touch') {
            window.addEventListener('pointermove', handleEndBeforeLong);
            timeout = window.setTimeout(() => {
                if (!dragging) {
                    console.log('touch long')
                    node.dispatchEvent(new CustomEvent('longpress'));
                    dragging = true;
                }
                e.preventDefault();
                const event = new MouseEvent('mousedown', {
                    clientX: e.clientX,
                    clientY: e.clientY
                })
                window.setTimeout(() => node.dispatchEvent(event), 0);
            }, delay);
        }
        e.stopPropagation();
    }

    function handleEndBeforeLong(e: PointerEvent) {
        if (!dragging) {
            console.log('before')
            window.clearTimeout(timeout);
            window.removeEventListener('pointermove', handleEndBeforeLong);
            dragging = false;
        }
    }
    
    function handlePointerUp(e: PointerEvent) {
        dragging = false;
        console.log('up')
        window.clearTimeout(timeout);
        window.removeEventListener('pointermove', handleEndBeforeLong);
        e.stopPropagation();
    }

    function handleContextMenu(e: MouseEvent) {
        e.preventDefault();
    }

    node.addEventListener('pointerdown', handlePointerDown);
    node.addEventListener('pointerup', handlePointerUp);
    node.addEventListener('contextmenu', handleContextMenu)

    return {
        destroy() {
            node.removeEventListener('pointerdown', handlePointerDown);
            node.removeEventListener('pointerup', handlePointerUp);
            node.removeEventListener('contextmenu', handleContextMenu)
        }
    };
}
