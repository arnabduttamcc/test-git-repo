import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LongpressDirective } from './directives/longpress.directive';
import { File } from '@awesome-cordova-plugins/file/ngx/index';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';

@NgModule({
  declarations: [AppComponent,],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [File, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, FileOpener, FileTransfer, FileTransferObject,],
  bootstrap: [AppComponent],
})
export class AppModule { } 
