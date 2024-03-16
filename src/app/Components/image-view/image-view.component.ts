import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isImage } from 'src/app/Helpers/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent {

    @Input() images: any = ''

    @Output() emitFile = new EventEmitter<any>()

    imageUrl: any
    files: any
    errorMessage: string = ''
    availableFiles: any
    isUpdating: any = false


    constructor() {}  

    ngOnInit() {

        this.files = this.images.map((element:any) => {
            const imageUrlBase = environment.apiUrl;
            let newEl = imageUrlBase + element.image
            return {
                imageUrl: newEl,
                oldImage: newEl,
                action: 'OLD'
            }
        });

        this.updateFile()
      
    }

    setImageView(url: any) {
        if(url) {
            this.imageUrl = url
        }
        else {
            this.imageUrl = null
        }
    }

    handleAddFile(event: any) {
        const fileInput: any = document.querySelector('#file')
        fileInput?.click()
    }

    addFile(event: any) {

        const files = event.target.files
        const self: any = this
        
        for(let index=0; index < files.length; index++){
            const file = files[index]

            if(!isImage(file.name)) {
                this.errorMessage = "Error file type!"
                return
            }
            this.errorMessage = ""

            if(file) {
                let fileReader = new FileReader();
                fileReader.readAsDataURL(file)
                fileReader.onload = function() {
                    if(self.isUpdating) {
                        //UPDATE
                        const url = self.isUpdating
                        self.isUpdating = false
                        self.files = self.files.map((fileItem:any) => {
                            if(fileItem.imageUrl === url ) {
                                if(fileItem.action === 'OLD') {
                                    fileItem.imageUrl = fileReader.result
                                    fileItem.file = file
                                    fileItem.action = 'UPDATE'
                                }
                                else {
                                    fileItem.imageUrl = fileReader.result
                                    fileItem.file = file
                                }
                                
                            }
                            return fileItem
                        })
                    }
                    else {
                        //ADD
                        self.files.push({
                            imageUrl: fileReader.result,
                            action: 'ADD',
                            file
                        })
                    }
                    
                   
                   self.updateFile()
                }
            }
        }
        
    }

    removeImage(url: string) {
        this.files = this.files.map((fileItem:any) => {
            if(fileItem.imageUrl === url) {
                if(fileItem.action == 'ADD') {
                    fileItem.action = 'REMOVE' 
                }
                else {
                    fileItem.action = 'DELETE'
                }
            }
            return fileItem
        })
        this.updateFile()
    }

    updateImage(url: string) {
        this.isUpdating = url
        this.handleAddFile(null)
    }

    updateFile() {
        this.files = this.files.filter((fileItem:any) => fileItem.action !== 'REMOVE')
        this.availableFiles = this.files.filter((fileItem:any) => fileItem.action !== 'DELETE')
        const sendFiles = this.files.filter((fileItem:any) => fileItem.action !== 'OLD')
        this.emitFile.emit(sendFiles)
    }

    

}
