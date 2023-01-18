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

  updateTable() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  delete(id: number, index: number) {
    if (id !== null) {
      console.log('if', id);
      
      this.http.delete(id)
        .subscribe(response => {},
        error => {
            console.log(error);
        });
    }
    console.log('after if', id);
    ELEMENT_DATA.splice(index, 1);
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
    delete data.isEdit;
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
    if (data.id === null) {
      delete data.isEdit;
      this.http.post(data)
        .subscribe(response => {
                data.isEdit = false;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
