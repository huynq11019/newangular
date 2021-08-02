import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  private id: string = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    console.log(this.id);
  }

}
