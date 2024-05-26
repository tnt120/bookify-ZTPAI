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
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DivieWordsPipe } from './pipes/divie-words.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from './components/snackbar/custom-snackbar/custom-snackbar.component';


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
    FilterTranformLabelPipe,
    SearchBarComponent,
    ConfirmationDialogComponent,
    DivieWordsPipe,
    CustomSnackbarComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
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
    FilterControlComponent,
    FilterTranformLabelPipe,
    SearchBarComponent,
    ConfirmationDialogComponent,
    DivieWordsPipe
  ]
})
export class SharedModule { }
