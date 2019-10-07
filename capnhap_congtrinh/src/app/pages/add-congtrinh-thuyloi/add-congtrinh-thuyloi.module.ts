import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddCongtrinhThuyloiPage } from './add-congtrinh-thuyloi.page';

const routes: Routes = [
  {
    path: '',
    component: AddCongtrinhThuyloiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddCongtrinhThuyloiPage]
})
export class AddCongtrinhThuyloiPageModule {}
