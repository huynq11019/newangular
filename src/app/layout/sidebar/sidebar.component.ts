import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }
logoutFunction(){
    if (confirm("bạn có chắc chắn muốn đăng xuất khum?")){
      this.route.navigate(['/auth/'])
    }
}
}
