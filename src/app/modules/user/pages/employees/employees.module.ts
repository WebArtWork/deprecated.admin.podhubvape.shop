import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { EmployeesComponent } from './employees.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: EmployeesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [EmployeesComponent],
	providers: []
})
export class EmployeesModule {}
