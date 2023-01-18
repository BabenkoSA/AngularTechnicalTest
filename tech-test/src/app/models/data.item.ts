export class DataItem {
    category: string; 
    description: string; 
    done: boolean | string; 
    label: string; 
    id?: number; 
    isEdit?: boolean; 
    constructor(category: string = '', 
                description: string = '', 
                done: boolean | string = false, 
                label: string = '', 
                id: number = null, 
                isEdit: boolean = true) {
        this.category = category; 
        this.description = description; 
        this.done = done; 
        this.label = label; 
        this.id = id; 
        this.isEdit = isEdit; 
    }
}