export function drag(node: HTMLElement, delay = 500) {
    let timeout: number;
    let dragging = false;

    function handlePointerDown(e: PointerEvent) {
        if (e.pointerType === 'mouse') {
            dragging = true;
            node.dispatchEvent(new CustomEvent('dragging'));
        }
        e.stopPropagation();
    }
    
    function handlePointerUp(e: PointerEvent) {
        if (e.pointerType === 'mouse') {
            dragging = false;
        }
    }
    
    function handleTouchStart(e: TouchEvent) {
        window.addEventListener('touchmove', handleEndBeforeLong);
        timeout = window.setTimeout(() => {
            window.removeEventListener('touchmove', handleEndBeforeLong)
            dragging = true;
            node.dispatchEvent(new CustomEvent('dragging'));
            window.setTimeout(() => node.dispatchEvent(e), 0);
        }, delay);
        e.stopPropagation();
    }
    
    function handleTouchEnd() {
        dragging = false;
        window.clearTimeout(timeout);
        window.removeEventListener('touchmove', handleEndBeforeLong);
    }
    
    function handleEndBeforeLong() {
        if (!dragging) {
            window.clearTimeout(timeout);
            window.removeEventListener('touchmove', handleEndBeforeLong);
        }
    }
    
    function handleTouchMove(e: TouchEvent) {
        if (dragging) {
            e.preventDefault();
        }
    }
    
    function handleContextMenu(e: MouseEvent) {
        e.preventDefault();
    }

    node.addEventListener('pointerdown', handlePointerDown);
    node.addEventListener('pointerup', handlePointerUp);
    node.addEventListener('touchstart', handleTouchStart);
    node.addEventListener('touchend', handleTouchEnd);
    node.addEventListener('touchmove', handleTouchMove);
    node.addEventListener('contextmenu', handleContextMenu);

    return {
        destroy() {
            node.removeEventListener('pointerdown', handlePointerDown);
            node.removeEventListener('pointerup', handlePointerUp);
            node.removeEventListener('touchstart', handleTouchStart);
            node.removeEventListener('touchend', handleTouchEnd);
            node.removeEventListener('contextmenu', handleContextMenu);
        }
    };
}
