import {Component, OnInit} from '@angular/core';
import {AuthrorityService} from '../../../service/authrority.service';
import {AuthService} from '../../../service/auth.service';
import {Account} from '../../../core/model/Account';
import {Role} from '../../../core/model/Role';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})

export class PermissionComponent implements OnInit {

  listAuthro?: Array<Role>;
  listUser?: Array<Account>;

  constructor(private permissionService: AuthrorityService,
              private authService: AuthService,
              private toasr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadAuthrority();
    this.loadUser();
  }

  private loadAuthrority(): void {
    this.permissionService.getAllAuthrority().subscribe(respon => {
      // console.log(respon);
      this.listAuthro = respon.body;
    }, error => {
      console.log(error);
    });
  }

  private loadUser(): void {
    this.authService.loadAllUser({page: 0}).subscribe(
      respon => {
        console.log(respon);
        this.listUser = respon;

      },
      error => {
        console.error(error);
      }
    );
  }

  authrority_of(account: Account, role: Role): any {
    // return null;
    if (account.authrority) {
      return account.authrority.find(r => r === role.name);
    }
  }

  authrority_change(account: Account, role: Role): void {
    //kiểm tra có quyền đó chưa
    // nếu chưa có cấp quyền
    //có rồi thì thu quyền
    if (this.authrority_of(account, role)) {
      this.revoke_role(account, role);
    } else {
      this.grant_role(account, role);
    }
  }

  revoke_role(account: Account, role: Role): void {
    console.log('thu hồi quyền');
    account.authrority = account.authrority.filter(r => r !== role?.name);
    // console.log(account, role);
    this.permissionService.updatePermistion(account).subscribe(
      respon => {
        // console.log(respon);
        this.toasr.warning('revoke permission ', respon.statusText);

      },
      error => console.error(error)
    )
    ;
  }

  grant_role(account: Account, role: Role): void {
    console.log('cấp quyền quyền');
    account.authrority = [...account.authrority, role.name];
    // console.log(account, role);
    this.permissionService.updatePermistion(account).subscribe(
      respon => {
        // console.log(respon);
        this.toasr.success('add permission', respon.statusText);

      },
      error => console.error(error)
    )
    ;
  }
}
