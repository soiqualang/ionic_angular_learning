import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChitietCongtrinhThuyloiPage } from './chitiet-congtrinh-thuyloi.page';

const routes: Routes = [
  {
    path: '',
    component: ChitietCongtrinhThuyloiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChitietCongtrinhThuyloiPage]
})
export class ChitietCongtrinhThuyloiPageModule {}
