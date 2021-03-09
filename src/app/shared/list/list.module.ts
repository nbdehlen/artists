import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, BrowserModule],
})
export class ListModule {}
