export function longpress(node: HTMLElement, delay = 500) {
    let timeout: number;
    let dragging = false;

    function handlePointerDown(e: PointerEvent) {
        if (e.pointerType === 'mouse') {
            node.dispatchEvent(new CustomEvent('longpress'));
        }
    }

    function handleTouchStart(e: TouchEvent) {
        if (!dragging) {
            window.addEventListener('touchmove', handleEndBeforeLong);
            timeout = window.setTimeout(() => {
                window.removeEventListener('touchmove', handleEndBeforeLong)
                dragging = true;
                node.dispatchEvent(new CustomEvent('longpress'));
                window.setTimeout(() => node.dispatchEvent(e), 0);
            }, delay);
        }
        e.stopPropagation();
    }
    
    function handleEndBeforeLong(e: TouchEvent) {
        if (!dragging) {
            dragging = false;
            window.clearTimeout(timeout);
            window.removeEventListener('touchmove', handleEndBeforeLong);
        }
    }
    
    function handlePointerUp(e: PointerEvent) {
        if (e.pointerType === 'mouse') {
            dragging = false;
            e.stopPropagation();
        }
    }

    function handleTouchEnd(e: TouchEvent) {
        dragging = false;
        window.clearTimeout(timeout);
        window.removeEventListener('touchmove', handleEndBeforeLong);
        e.stopPropagation();
    }

    function handleContextMenu(e: MouseEvent) {
        e.preventDefault();
    }

    function handleTouchMove(e: TouchEvent) {
        if (dragging) {
            e.preventDefault();
        }
    }

    node.addEventListener('pointerdown', handlePointerDown);
    node.addEventListener('pointerup', handlePointerUp);
    node.addEventListener('touchstart', handleTouchStart);
    node.addEventListener('touchend', handleTouchEnd);
    node.addEventListener('touchmove', handleTouchMove);
    node.addEventListener('contextmenu', handleContextMenu)

    return {
        destroy() {
            node.removeEventListener('pointerdown', handlePointerDown);
            node.removeEventListener('pointerup', handlePointerUp);
            node.removeEventListener('touchstart', handleTouchStart);
            node.removeEventListener('touchend', handleTouchEnd);
            node.removeEventListener('contextmenu', handleContextMenu)
        }
    };
}
