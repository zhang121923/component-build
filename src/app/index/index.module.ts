import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TooltipModule} from '@progress/kendo-angular-tooltip';
import {GridModule} from '@progress/kendo-angular-grid';
import {BrowserModule} from '@angular/platform-browser';
import {ChartsModule} from '@progress/kendo-angular-charts';
import {ChartModule} from 'primeng/primeng';
import {IndexComponent} from './index.component';
import {indexRouter} from './index.router';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    GridModule,
    ChartsModule,
    ChartModule,
    TooltipModule,
    RouterModule.forChild(indexRouter)
  ]
})
export class IndexModule {
}
