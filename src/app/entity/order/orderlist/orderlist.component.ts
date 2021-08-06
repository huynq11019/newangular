import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  constructor() {
  }

  private queryParam = {
    page: 0,
    limit: 10,
    keyword: ''
  };

  ngOnInit(): void {
  }

  changePage(event: any): void {
    console.log(event);
    // lấy size
    // lấy page index
    //load
  }

  //tìm kiếm
}
