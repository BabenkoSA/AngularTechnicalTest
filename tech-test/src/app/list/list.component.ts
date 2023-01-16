import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

interface Item { category: string, description: string, done: boolean | string, label: string, id?: number, isEdit?: boolean };

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  items: Item[];
  url: string = 'http://localhost:3000/tasks';
  q: string = '';
  
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.http.get<Item[]>(this.url)
            .subscribe(response => {
                this.items = response;
            },
            error => {
                console.log(error);
            });
  }

  delete(id: number, index: number) {
    if (id) {
      this.http.delete(`${this.url}/${id}`)
          .subscribe(response => {
          },
          error => {
			        console.log(error);
          });
    }
    this.items.splice(index, 1);
  }

  add() {
    const newItem: Item = {
      category: "",
      description: "",
      done: false,
      label: "",
      isEdit: true
    };
    this.items.push(newItem);
  }

  patch(data: any, id: number) {
    delete data.isEdit;
    this.http.patch(`${this.url}/${id}`, data)
        .subscribe(response => {
                this.items.forEach(item => {
                  if (item.id === id) {
                    item.isEdit = false;
                  }
                })
            },
            error => {
                console.log(error);
            });
  }

  edit(data: Item) {
    data.isEdit = true;
  }

  save(data: Item) {
    if (!data.id) {
      data.id = !this.items.length ? 1 : this.items[this.items.length - 1].id + 1;
      delete data.isEdit;
      this.http.post(this.url, data)
        .subscribe(response => {
                data.isEdit = false;
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
  
}
