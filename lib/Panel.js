class Panel {

    constructor(window) {
        this.window = window;

        this.container = document.createElement('div');
        this.container.id = 'hallo';
        this.container.style.setProperty('display', 'block', 'important');
        this.container.style.setProperty('position', 'absolute', 'important');
        this.container.style.setProperty('z-index', '2147483647', 'important');
        this.container.style.setProperty('background-color', 'lightblue');
        this.container.innerHTML = 'Hi!';

        this.window.document.body.appendChild(this.container)
    }

    alignTo(element) {
        const targetRelativeRect = element.getBoundingClientRect();
        const preferredContainerHeight = 300;
        const containerWidth = 400;
        let containerHeight = preferredContainerHeight;
        let positionAbove = false;

        const targetTop = targetRelativeRect.top + this.window.scrollY;
        const targetBottom = targetRelativeRect.bottom + this.window.scrollY;
        const preferredBottom = targetRelativeRect.bottom + preferredContainerHeight;

        if (preferredBottom > this.window.innerHeight) {
            const preferredTop = targetRelativeRect.top - preferredContainerHeight;
            if (preferredTop >= 0) {
                positionAbove = true;
            } else {
                const overflowBottom = preferredBottom - this.window.innerHeight;
                const overflowTop = -preferredTop;
                if (overflowBottom > overflowTop) {
                    positionAbove = true;
                    containerHeight = preferredContainerHeight - overflowTop;
                } else {
                    containerHeight = preferredContainerHeight - overflowBottom;
                }
            }
        }

        const preferredArrowXCoord = targetRelativeRect.right - 37;
        const targetWidth = preferredArrowXCoord - targetRelativeRect.left;
        let relativeLeft;
        if (targetWidth < containerWidth) {
            relativeLeft = Math.min(targetRelativeRect.left, window.innerWidth - containerWidth);
        } else {
            relativeLeft = preferredArrowXCoord - containerWidth;
        }

        const top = positionAbove ? targetTop - containerHeight : targetBottom;
        const left = relativeLeft + this.window.scrollX;
        this.container.style.setProperty('width', `${containerWidth}px`, 'important');
        this.container.style.setProperty('height', `${containerHeight}px`, 'important');
        this.container.style.setProperty('top', `${top}px`, 'important');
        this.container.style.setProperty('left', `${left}px`, 'important');
    }
}