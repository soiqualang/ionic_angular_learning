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
  { path: 'list-congtrinh-thuyloi', loadChildren: './pages/list-congtrinh-thuyloi/list-congtrinh-thuyloi.module#ListCongtrinhThuyloiPageModule' },
  { path: 'list-congtrinh-thuyloi/:id', loadChildren: './pages/view-congtrinh-thuyloi/view-congtrinh-thuyloi.module#ViewCongtrinhThuyloiPageModule' },
  { path: 'add-congtrinh-thuyloi', loadChildren: './pages/add-congtrinh-thuyloi/add-congtrinh-thuyloi.module#AddCongtrinhThuyloiPageModule' },
  { path: 'hinhanh-congtrinh/:tbl_name/:id_congtrinh', loadChildren: './pages/hinhanh-congtrinh/hinhanh-congtrinh.module#HinhanhCongtrinhPageModule' },
  { path: 'map-modal', loadChildren: './map-modal/map-modal.module#MapModalPageModule' },
  { path: 'list-cong-hientrang-point', loadChildren: './pages/list-cong-hientrang-point/list-cong-hientrang-point.module#ListCongHientrangPointPageModule' },
  { path: 'list-cong-hientrang-point/:id', loadChildren: './pages/view-cong-hientrang-point/view-cong-hientrang-point.module#ViewCongHientrangPointPageModule' },
  { path: 'add-cong-hientrang-point', loadChildren: './pages/add-cong-hientrang-point/add-cong-hientrang-point.module#AddCongHientrangPointPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
