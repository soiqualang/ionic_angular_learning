import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListCongHientrangPointPage } from './list-cong-hientrang-point.page';

const routes: Routes = [
  {
    path: '',
    component: ListCongHientrangPointPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListCongHientrangPointPage]
})
export class ListCongHientrangPointPageModule {}
