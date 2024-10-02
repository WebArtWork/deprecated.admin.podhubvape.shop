import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { AlertModule } from './modules/alert/alert.module';
import { ModalModule } from './modules/modal/modal.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { OwnersGuard } from './core/guards/owners.guard';
import { AgentsGuard } from './core/guards/agents.guard';

const ownerPages = [
	{
		path: 'stores',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Stores'
			}
		},
		loadChildren: () =>
			import('./modules/store/pages/stores/stores.module').then(
				(m) => m.StoresModule
			)
	},
	{
		path: 'warehouses',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Warehouses'
			}
		},
		loadChildren: () =>
			import(
				'./modules/warehouse/pages/warehouses/warehouses.module'
			).then((m) => m.WarehousesModule)
	},
	{
		path: 'tags',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Tags'
			}
		},
		loadChildren: () =>
			import('./modules/tag/pages/tags/tags.module').then(
				(m) => m.TagsModule
			)
	},
	{
		path: 'products',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Admin Products'
			}
		},
		loadChildren: () =>
			import('./modules/product/pages/products/products.module').then(
				(m) => m.ProductsModule
			)
	},
	{
		path: 'articles',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Articles'
			}
		},
		loadChildren: () =>
			import('./modules/article/pages/articles/articles.module').then(
				(m) => m.ArticlesModule
			)
	},
	{
		path: 'contents',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Contents'
			}
		},
		loadChildren: () =>
			import('./modules/content/pages/contents/contents.module').then(
				(m) => m.ContentsModule
			)
	},
	{
		path: 'clients',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Clients'
			}
		},
		loadChildren: () =>
			import('./modules/user/pages/clients/clients.module').then(
				(m) => m.ClientsModule
			)
	},
	{
		path: 'orders',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Orders'
			}
		},
		loadChildren: () =>
			import('./modules/order/pages/orders/orders.module').then(
				(m) => m.OrdersModule
			)
	},
	{
		path: 'discounts',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Discounts'
			}
		},
		loadChildren: () =>
			import('./modules/discount/pages/discounts/discounts.module').then(
				(m) => m.DiscountsModule
			)
	}
];

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* user */
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import('./modules/form/pages/forms/forms.module').then(
						(m) => m.FormsModule
					)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: 'owner',
		canActivate: [OwnersGuard],
		component: UserComponent,
		children: [
			/* owner */
			...ownerPages
		]
	},
	{
		path: 'agent',
		canActivate: [AgentsGuard],
		component: UserComponent,
		children: [
			/* owner */
			...ownerPages
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent],
	imports: [
		AlertModule,
		ModalModule,
		CoreModule,
		BrowserModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: 'Pod Hub Vape Shop',
					titleSuffix: ' | Pod Hub Vape Shop',
					'og:image': 'https://webart.work/api/user/cdn/waw-logo.png'
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard,
		OwnersGuard,
		AgentsGuard,
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
