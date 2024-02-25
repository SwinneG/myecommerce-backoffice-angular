import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    
    
    @Input() modalTitle: string = ""
    @Input() modalContent: string = ""
    @Input() entityData: any

    @Output() confirmAction = new EventEmitter<any>()
    @Output() closeModal = new EventEmitter<any>()

    myModal: any

    constructor() {}

    ngOnInit() {}

    handleCloseModal() {
        this.myModal.hide()
        this.closeModal.emit(true)
    }

    handleConfirmModal() {
        this.confirmAction.emit(true)
    }
}
