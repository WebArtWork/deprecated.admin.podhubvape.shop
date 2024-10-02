import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { WarehousesComponent } from './warehouses.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: WarehousesComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		WarehousesComponent
	],
	providers: []

})

export class WarehousesModule { }
