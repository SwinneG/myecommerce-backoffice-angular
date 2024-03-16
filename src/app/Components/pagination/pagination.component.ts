import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges{

    @Input() currentPage: number = 1
    @Input() paginateLength: number = 5
    @Input() total: number = 5
    @Input() totalByPage: number = 5
    @Input() totalPages: number = 1
    @Input() nextPage: number|null = 2
    @Input() previousPage: number|null = null

    @Output() pageSelected = new EventEmitter<number>()

    items: Array<number|string> = []
    min: number = 1
    max: number = 1

    constructor() {}

    ngOnInit() {
        this.initPagination()
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initPagination()
    }

    initPagination(){
        this.min = 1
        this.max = Math.ceil(this.total / this.totalByPage) 
        

        if(this.paginateLength > this.max) {
            this.items = []
            for(let index = this.min; index <= this.max; index++) {
                this.items.push(index)
            }
        }
        else {
            this.items = [this.min, "<<", ">>", this.max]
            let index = 0 
            let maxNewElement = this.paginateLength - this.items.length 

            while(index < maxNewElement) {
                let value: any;
    
                if( (this.currentPage > this.min) && (this.currentPage < this.max)) {
                    value = this.currentPage+index -1
                } 
                if(this.currentPage === this.max) {
                    value = this.currentPage+index - maxNewElement
                }
                if(this.currentPage === this.min) {
                    value = this.currentPage+index +1
                }
                this.items.splice(2+index, 0, value)
                index ++
            }
        }


       
    }

    handleSetPage(page: any) {
        // console.log(page)

        let newPage: number = page

        if(page === "<<") {
            newPage = this.currentPage - 1
        }
        if(page === ">>") {
            newPage = this.currentPage + 1
        }
        if( (newPage >= this.min) && (newPage <= this.max)) {
            this.pageSelected.emit(newPage)
        }
    }
}
