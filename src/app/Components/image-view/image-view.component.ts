import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isImage } from 'src/app/Helpers/utils';

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
            let newEl =  new TextDecoder("utf-8").decode(new Uint8Array(element.image.data));
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

        const file = event.target.files[0]
        const self: any = this
        
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

        /*const files = event.target.files
        console.log(files)
        const self: any = this

        for(let index= 0; index < files.length; index++){
            const file = files[index]
            // console.log(file)
           
            if(!isImage(file.name)) {
                this.errorMessage = "Error file type!"
                return
            }
            this.errorMessage = ''

            if(file) {
                let fileReader = new FileReader();
                fileReader.readAsDataURL(file)
                fileReader.onload = function() {
                    if(self.isUpdating) {
                        console.log('is updating')
                        //update
                        const url = self.isUpdating
                        self.isUpdating = false
                        self.files = self.files.map((fileItem: any) => {
                            if(fileItem.imageUrl === url) {
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
                        console.log('is add')
                        // console.log(self.file)

                        // console.log( this.images)
                        // self.file.forEach((element:any) => {
                        //     element = new TextDecoder("utf-8").decode(new Uint8Array(element.image.data));
                        //     console.log(element)
                        // });

                        // let result:any = fileReader.result
                        // console.log(result)
                        // if(result){
                        //     let urlResult = new TextDecoder("utf-8").decode(new Uint8Array(result));
                        //     console.log(urlResult)
                        // }
                        

                        self.file.push({
                            imageUrl: fileReader.result,
                            action: 'ADD',
                            file
                        })
                        self.updateFile()
                    }
                    
                }
            }
    
        }*/
        
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



        // console.log("update")
        // console.log(this.file)
       // this.file = this.file.filter((fileItem: any) => fileItem.action !== "REMOVE")
        // console.log(this.files)
        //this.availableFiles = this.file.filter((fileItem: any) => fileItem.action !== 'DELETE')
        // console.log(this.files)
        // const filesArray = this.files.join(';')
        // console.log(filesArray)
        // const sendFiles = this.file.filter((fileItem: any) => fileItem.action !== "OLD")
        // this.emitFile.emit(sendFiles)
    }

    

}
