import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../services/http.service';

interface DataItem { 
  category: string, 
  description: string, 
  done: boolean | string, 
  label: string, 
  id?: number, 
  isEdit?: boolean 
};

let ELEMENT_DATA: DataItem[] = [];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<DataItem>;
  q: string = '';
  displayedColumns: string[] = ['position', 'label', 'description', 'category', 'done', 'actions'];
  
  constructor(private http: HttpService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    ELEMENT_DATA = this.route.snapshot.data.list;
    this.updateTable();
  }

  delete(data: DataItem) {
    let i = ELEMENT_DATA.findIndex(item => item === data);
    if (data.id !== null) {
      this.http.delete(data.id)
        .subscribe(response => {},
        error => {
            console.log(error);
        });
    }
    ELEMENT_DATA.splice(i, 1);
    this.updateTable();
  }

  add() {
    const newItem: DataItem = {
      category: "",
      description: "",
      done: false,
      label: "",
      isEdit: true,
      id: null
    };
    ELEMENT_DATA.push(newItem);
    this.updateTable();
  }

  patch(data: any, id: number) {
    this.http.patch(id, data)
        .subscribe(response => {
                ELEMENT_DATA.forEach(item => {
                  if (item.id === id) {
                    item.isEdit = false;
                  }
                });
            },
            error => {
                console.log(error);
            });
  }

  edit(data: DataItem) {
    data.isEdit = true;
  }

  save(data: DataItem) {
    let i = ELEMENT_DATA.findIndex(item => item === data);
    
    if (data.id === null) {
      data.isEdit = false;
      this.http.post(data)
        .subscribe(response => {
                ELEMENT_DATA[i] = response;
                this.updateTable();
            },
            error => {
                console.log(error);
            });
    } else {
      this.patch(data, data.id);
    }
  }

  done(value: string | boolean, id: number) {
    if (!id) {
      return;
    }
    this.patch({ done: value ? formatDate(Date.now(),'dd-MM-yyyy', 'en-US') : false }, id);
  }

  updateTable() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.filterPredicate = this.filterFunc;
    
    if (this.q) {
      this.q = '';
      this.dataSource.filter = this.q;
    }
  }

  filterFunc(item: DataItem, searchValue: string): boolean {
    if (searchValue) {
      let q = searchValue.trim().toLowerCase()
      if (item.category.trim().toLowerCase().includes(q) || item.label.trim().toLowerCase().includes(q) || item.description.trim().toLowerCase().includes(q)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
