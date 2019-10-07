import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'congtrinh-thuyloi', loadChildren: './pages/congtrinh-thuyloi/congtrinh-thuyloi.module#CongtrinhThuyloiPageModule' },
  { path: 'chitiet-congtrinh-thuyloi', loadChildren: './pages/chitiet-congtrinh-thuyloi/chitiet-congtrinh-thuyloi.module#ChitietCongtrinhThuyloiPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
