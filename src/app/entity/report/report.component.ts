import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ReportService} from '../../service/report.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  productReport: any;
  CateReport: any;
  CateReportQuery = {
    page: 1,
    limit: 5
  };
  ProductReportQuery = {
    page: 1,
    limit: 5
  };

  constructor(private spinner: NgxSpinnerService,
              private reportService: ReportService,
              private toasrt: ToastrService
  ) {
  }

  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

    this.loadCateReport();
    this.loadProductReport();
  }

  loadCateReport(): void {
    this.reportService.getCateReport(this.CateReportQuery).subscribe(
      respon => {
        this.CateReport = respon.body;
      },
      error => {
        console.log(error);
        this.toasrt.warning('xảy ra một hiện tượng lạ', error.status);
      }
    );
  }

  loadProductReport(): void {
    this.reportService.getProductReport(this.ProductReportQuery).subscribe(
      respon => {
        this.productReport = respon.body;
      },
      error => {
        console.log(error);
        this.toasrt.warning('xảy ra một hiện tượng lạ', error.status);
      }
    );
  }

}
