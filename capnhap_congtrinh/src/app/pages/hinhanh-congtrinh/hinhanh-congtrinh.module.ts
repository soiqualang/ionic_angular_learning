import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HinhanhCongtrinhPage } from './hinhanh-congtrinh.page';

const routes: Routes = [
  {
    path: '',
    component: HinhanhCongtrinhPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HinhanhCongtrinhPage]
})
export class HinhanhCongtrinhPageModule {}
