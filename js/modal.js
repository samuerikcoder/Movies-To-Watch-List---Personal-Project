export class Modal {
    constructor(root) {
        this.element = document.querySelector(root);
        this.handleClose();
    }
     message(message) {
        this.warning = this.element.querySelector('.modal-body p');
        this.warning.textContent = message;
    }

    open() {
        this.element.classList.remove('close');
    }

    handleClose() {
        this.buttonClose = this.element.querySelector('.modal-footer .close-modal');
        this.buttonClose.addEventListener('click', () => this.close());
    }

    close() {
        this.element.classList.add('close');
    }
}