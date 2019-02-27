import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChannelComponent} from './channel.component';
import {RouterModule} from '@angular/router';
import {channelRouter} from './channel.router';
import {ExcelModule, GridModule, PDFModule} from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [ChannelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(channelRouter),
    PDFModule,
    ExcelModule,
    GridModule
  ]
})
export class ChannelModule {
}
