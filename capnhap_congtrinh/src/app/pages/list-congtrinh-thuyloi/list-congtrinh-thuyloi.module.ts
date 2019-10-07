import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListCongtrinhThuyloiPage } from './list-congtrinh-thuyloi.page';

const routes: Routes = [
  {
    path: '',
    component: ListCongtrinhThuyloiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListCongtrinhThuyloiPage]
})
export class ListCongtrinhThuyloiPageModule {}
