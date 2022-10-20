import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common/common.service';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { ApiResponse } from './db.interface';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  public httpOptions: any;
  constructor(
    private http: HttpClient,
    private common: CommonService,
    private localStorage: LocalstorageService,
    private router: Router
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }
  }
  //=========[Post method (AD)]=================
  public postApiCall(base: string, url: string, object: any = null, loadingTxt: string = "Loading data ...", hideAlert: boolean = false): Observable<ApiResponse> {
    this.common.activatedLoader(loadingTxt);
    const params = new HttpParams({ fromObject: { ...object } });
    let finalUrl = this.getApiUrl(base, url);
    return this.http.post(finalUrl, params, this.httpOptions).pipe(
      map((res) => this.extractData(res, hideAlert)))
  }
  private checkValidUserAndRecord(res, hideAlert: boolean = false): void {
    this.common.dismissLoader();
    if ((res && res.UserValid?.ValidUserYN == 'N') || (res && res.ValidSession == 'N' && res.MsgCount == 0)) this.logoutAndClearData();
    if (((res.noOfRecord == 0 || res.noOfRecord == -1) || !res) && !hideAlert) this.promptMessage(res.msg);
  }
  private logoutAndClearData(): void {
    // this.router.navigate(['/landing-page'], { replaceUrl: true })
  }
  private promptMessage(msg): void {
    this.common.presentToast(msg ? msg : 'No record found', 'error');
  }
  private extractData(res, hideAlert: boolean = false) {
    this.checkValidUserAndRecord(res, hideAlert);
    let body = res;
    return body || {};
  }
  public getApiUrl(baseMethod, functionName): string { return environment.BASE_URL + baseMethod + functionName; }
}
