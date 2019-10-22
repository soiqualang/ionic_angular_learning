import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewCongHientrangPointPage } from './view-cong-hientrang-point.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCongHientrangPointPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewCongHientrangPointPage]
})
export class ViewCongHientrangPointPageModule {}
