import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent {

    @Input() srcs: any 
    @Output() closeModal = new EventEmitter<any>()
    myModal: any

    constructor() {}

    ngOnInit() {

        if(!(this.srcs instanceof Array)) {
           this.srcs = [this.srcs]
        }

        const WT: any = window
        this.myModal = new WT['bootstrap'].Modal('#imagePreview', {keyboard: false})
        this.myModal.show()
    }

    handleCloseModal() {
        this.myModal.hide()
        this.closeModal.emit(true)
    }

}
