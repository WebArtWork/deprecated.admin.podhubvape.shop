import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument
} from 'wacom';

export interface Warehouse extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root'
})
export class WarehouseService extends CrudService<Warehouse> {
	warehouses: Warehouse[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'warehouse'
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((warehouses: Warehouse[]) =>
			this.warehouses.push(...warehouses)
		);

		_core.on('warehouse_create').subscribe((warehouse: Warehouse) => {
			this.warehouses.push(warehouse);
		});

		_core.on('warehouse_delete').subscribe((warehouse: Warehouse) => {
			this.warehouses.splice(
				this.warehouses.findIndex((o) => o._id === warehouse._id),
				1
			);
		});
	}
}
