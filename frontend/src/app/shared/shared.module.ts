import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { SearchButtonComponent } from './components/search-button/search-button.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { TableComponent } from './components/table/table.component';
import { CapitalizeFirstPipe } from './pipes/capitalize-first.pipe';



@NgModule({
  declarations: [
    InputComponent,
    MultiSelectComponent,
    SearchButtonComponent,
    TitleBarComponent,
    TabsComponent,
    TabComponent,
    TableComponent,
    CapitalizeFirstPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    InputComponent,
    MultiSelectComponent,
    SearchButtonComponent,
    TitleBarComponent,
    TabsComponent,
    TabComponent,
    CapitalizeFirstPipe,
    TableComponent
  ]
})
export class SharedModule { }
