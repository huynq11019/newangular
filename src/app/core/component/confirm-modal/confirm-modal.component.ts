import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  @Input() title?: string;
  @Input() body?: string;
  @Input() confirmButton?: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

}
