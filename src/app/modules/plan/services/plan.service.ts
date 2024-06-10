import { Injectable } from '@angular/core';
import { MongoService, AlertService } from 'wacom';

export interface Plan {
	_id: string;
	name: string;
	description: string;
	order: number;
	price: number;
}

@Injectable({
	providedIn: 'root'
})
export class PlanService {
	plans: Plan[] = [];

	_plans: any = {};

	new(): Plan {
		return {} as Plan;
	}

	constructor(
		private mongo: MongoService,
		private alert: AlertService
	) {
		this.plans = mongo.get('userplan', {
			sort: mongo.sortAscNumber('order')
		}, (arr: any, obj: any) => {
			this._plans = obj;
		});
	}

	create(
		plan: Plan = this.new(),
		callback = (created: Plan) => {},
		text = 'plan has been created.'
	) {
		if (plan._id) {
			this.save(plan);
		} else {
			this.mongo.create('userplan', plan, (created: Plan) => {
				callback(created);
				this.alert.show({ text });
			});
		}
	}

	doc(planId: string): Plan {
		if(!this._plans[planId]){
			this._plans[planId] = this.mongo.fetch('userplan', {
				query: {
					_id: planId
				}
			});
		}
		return this._plans[planId];
	}

	update(
		plan: Plan,
		callback = (created: Plan) => {},
		text = 'plan has been updated.'
	): void {
		this.mongo.afterWhile(plan, ()=> {
			this.save(plan, callback, text);
		});
	}

	save(
		plan: Plan,
		callback = (created: Plan) => {},
		text = 'plan has been updated.'
	): void {
		this.mongo.update('userplan', plan, () => {
			if(text) this.alert.show({ text, unique: plan });
		});
	}

	delete(
		plan: Plan,
		callback = (created: Plan) => {},
		text = 'plan has been deleted.'
	): void {
		this.mongo.delete('userplan', plan, () => {
			if(text) this.alert.show({ text });
		});
	}
}
