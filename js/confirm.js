import {Modal}  from './modal.js';

export class Confirm extends Modal {
    constructor(root) {
        super(root);
    }

    confirmation() {
        return new Promise((resolve) => {
            this.buttonConfirm = this.element.
            querySelector('.modal-footer .confirm-button');
            
            this.buttonConfirm.addEventListener('click', () => {
                this.close();
                resolve(true);
            });
    
            this.buttonClose.addEventListener('click', () => {
                this.close();
                resolve(false);
            });
        });
    }
}