import { Component, OnInit } from '@angular/core';

interface Link { route: string, title: string }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  links: Link[] = [{
    route: '/to-do-list',
    title: 'To Do List'
  },{
    route: '#',
    title: 'Another link 1'
  },{
    route: '#',
    title: 'Another link 2'
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
