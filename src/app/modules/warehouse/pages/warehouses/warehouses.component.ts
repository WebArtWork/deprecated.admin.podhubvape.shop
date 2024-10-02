import { Component } from '@angular/core';
import { FormService } from 'src/app/modules/form/form.service';
import { WarehouseService, Warehouse } from '../../services/warehouse.service';
import { AlertService, CoreService } from 'wacom';
import { TranslateService } from 'src/app/modules/translate/translate.service';
import { FormInterface } from 'src/app/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './warehouses.component.html',
	styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('warehouses', {
		formId: 'warehouses',
		title: 'Warehouses',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill warehouses title'
					},
					{
						name: 'Label',
						value: 'Title'
					}
				]
			},
			{
				name: 'Text',
				key: 'description',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill warehouses description'
					},
					{
						name: 'Label',
						value: 'Description'
					}
				]
			}
		]
	});

	config = {
		create: () => {
			this._form.modal<Warehouse>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._sw.create(created as Warehouse);
					close();
				}
			});
		},
		update: (doc: Warehouse) => {
			this._form
				.modal<Warehouse>(this.form, [], doc)
				.then((updated: Warehouse) => {
					this._core.copy(updated, doc);
					this._sw.update(doc);
				});
		},
		delete: (doc: Warehouse) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this cservice?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: () => {
							this._sw.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Warehouse) => {
					this._form.modalUnique<Warehouse>('warehouses', 'url', doc);
				}
			}
		]
	};

	get rows(): Warehouse[] {
		return this._sw.warehouses;
	}

	constructor(
		private _translate: TranslateService,
		private _alert: AlertService,
		private _sw: WarehouseService,
		private _form: FormService,
		private _core: CoreService
	) {}
}
