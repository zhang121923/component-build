import {Routes} from '@angular/router';

export const appRouter: Routes = [
  {
    path: 'index',
    loadChildren: './index/index.module#IndexModule'
  },
  {
    path: 'channel',
    loadChildren: './channel/channel.module#ChannelModule'
  }
];
