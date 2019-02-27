import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {appRouter} from './app.router';
import {ChannelModule} from './channel/channel.module';
import {IndexModule} from './index/index.module';
import {FormsModule} from '@angular/forms';
import {PDFModule} from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRouter, {useHash: false}),
    IndexModule,
    ChannelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
