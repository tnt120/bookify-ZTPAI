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
import { FilterControlComponent } from './components/filter-control/filter-control.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FilterTranformLabelPipe } from './pipes/filter-tranform-label.pipe';


@NgModule({
  declarations: [
    InputComponent,
    MultiSelectComponent,
    SearchButtonComponent,
    TitleBarComponent,
    TabsComponent,
    TabComponent,
    TableComponent,
    CapitalizeFirstPipe,
    FilterControlComponent,
    FilterTranformLabelPipe
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    InputComponent,
    MultiSelectComponent,
    SearchButtonComponent,
    TitleBarComponent,
    TabsComponent,
    TabComponent,
    CapitalizeFirstPipe,
    TableComponent,
    FilterControlComponent
  ]
})
export class SharedModule { }
