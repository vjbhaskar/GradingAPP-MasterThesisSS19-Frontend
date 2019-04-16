import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatChipsModule, MatProgressSpinnerModule, MatProgressBarModule, MatBottomSheetModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule, MatTab } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';





@NgModule({
    exports: [
        MatSelectModule,
        MatCheckboxModule,
        MatRadioModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatChipsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatTabsModule,
        MatCardModule,
        MatDialogModule,
        MatToolbarModule,
        MatMenuModule,
        MatListModule,
        MatSidenavModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatStepperModule,
        MatGridListModule,
        MatExpansionModule,
        MatTableModule,
        MatBottomSheetModule,
        MatRippleModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule
    ]
})
export class MaterialComponentsModule {
}
