import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    
    // @Input() entityDelete: any
    @Input() modalTitle: string = ""
    @Input() modalContent: string = ""
    @Input() entityData: any

    @Output() confirmAction = new EventEmitter<any>()
    @Output() closeModal = new EventEmitter<any>()

    myModal: any

    constructor() {}

    ngOnInit() {
        const WT: any = window
        this.myModal = new WT['bootstrap'].Modal('#deleteModal', {keyboard: false})
        this.myModal.show()
    }

    handleCloseModal() {
        this.myModal.hide()
        this.closeModal.emit(true)
    }

    handleConfirmModal() {
        this.confirmAction.emit(true)
    }
}
