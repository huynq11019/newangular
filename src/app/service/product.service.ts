import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
// import {ToastrService} from 'ngx-toastr';
// import {NgxSpinner} from 'ngx-spinner';
import {Observable, throwError} from 'rxjs';
import {productApi} from '../core/constans/common';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {Product} from '../core/model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient,
              private toasr: ToastrService,
              private spiner: NgxSpinnerService
  ) {
  }

  getistProduct(param?: any): Observable<any> {
    if(param.page > 0){
      param.page = param.page - 1;
    }
    const newParam = new HttpParams({fromObject: param});
    console.log(param);
    console.log(newParam);
    return this.http.get(productApi.getPage, {observe: 'response', params: newParam})
      // .pipe(retry(3),
      //   catchError(this.handleError))
      ;
  }

  getProduct(idProduct?: any): Observable<any> {
    return this.http.get(productApi.getProduct + idProduct, {observe: 'response', withCredentials: true});
  }

  createProdc(product?: Product): Observable<any> {
    return this.http.post(productApi.createProduct, product, {observe: 'response'});
  }

  removeProduct(idProduct?: number): Observable<any> {
    return this.http.delete(productApi.deleteProduct + idProduct, {observe: 'response'});
  }

  updateProduct(product?: Product): Observable<any> {
    return this.http.put(productApi.updateProduct + product?.id, product, {observe: 'response'});
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else if (error.status === 401) {
      console.warn('xảy ra lỗi khi dăng nhập' + error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // đóng spiner
    console.log('hello mother fnck');
    // this.spiner.hide();

    // Return an observable with a user-facing error message.
    // this.toasr.error(error.error.message, error.error);
    this.toasr.error('error message', 'error code');
    return throwError(
      'Something bad happened; please try again later.');
  }


}
