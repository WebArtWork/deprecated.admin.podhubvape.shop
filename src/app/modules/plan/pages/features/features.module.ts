import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { FeaturesComponent } from './features.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: FeaturesComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		FeaturesComponent
	],
	providers: []

})

export class FeaturesModule { }
