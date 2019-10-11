import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewCongtrinhThuyloiPage } from './view-congtrinh-thuyloi.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCongtrinhThuyloiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewCongtrinhThuyloiPage]
})
export class ViewCongtrinhThuyloiPageModule {}
