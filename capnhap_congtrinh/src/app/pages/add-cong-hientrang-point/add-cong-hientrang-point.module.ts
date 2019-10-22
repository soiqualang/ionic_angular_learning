import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddCongHientrangPointPage } from './add-cong-hientrang-point.page';

const routes: Routes = [
  {
    path: '',
    component: AddCongHientrangPointPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddCongHientrangPointPage]
})
export class AddCongHientrangPointPageModule {}
