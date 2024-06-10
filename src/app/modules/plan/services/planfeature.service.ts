import { Injectable } from '@angular/core';
import { MongoService, AlertService } from 'wacom';

export interface Planfeature {
	_id: string;
	name: string;
	plan: string;
	description: string;
	price: number;
	inPlan: Record<string, boolean>;
	order: number;
}

@Injectable({
	providedIn: 'root'
})
export class PlanfeatureService {
	planfeatures: Planfeature[] = [];

	_planfeatures: any = {};

	plan(planId: string) {
		return this._planfeatures.plan
			? this._planfeatures.plan[planId] || []
			: [];
	}

	new(): Planfeature {
		return {} as Planfeature;
	}

	constructor(private mongo: MongoService, private alert: AlertService) {
		this.planfeatures = mongo.get(
			'userfeature',
			{
				replace: {
					inPlan: mongo.beObj,
					inDone: mongo.beObj
				},
				sort: mongo.sortAscNumber('order')
			},
			(arr: any, obj: any) => {
				this._planfeatures = obj;
			}
		);
	}

	create(
		planfeature: Planfeature = this.new(),
		callback = (created: Planfeature) => {},
		text = 'planfeature has been created.'
	) {
		if (planfeature._id) {
			this.save(planfeature);
		} else {
			this.mongo.create(
				'userfeature',
				planfeature,
				(created: Planfeature) => {
					callback(created);
					this.alert.show({ text });
				}
			);
		}
	}

	doc(planfeatureId: string): Planfeature {
		if (!this._planfeatures[planfeatureId]) {
			this._planfeatures[planfeatureId] = this.mongo.fetch(
				'userfeature',
				{
					query: {
						_id: planfeatureId
					}
				}
			);
		}
		return this._planfeatures[planfeatureId];
	}

	update(
		planfeature: Planfeature,
		callback = (created: Planfeature) => {},
		text = 'planfeature has been updated.'
	): void {
		this.mongo.afterWhile(planfeature, () => {
			this.save(planfeature, callback, text);
		});
	}

	save(
		planfeature: Planfeature,
		callback = (created: Planfeature) => {},
		text = 'planfeature has been updated.'
	): void {
		this.mongo.update('userfeature', planfeature, () => {
			if (text) this.alert.show({ text, unique: planfeature });
		});
	}

	delete(
		planfeature: Planfeature,
		callback = (created: Planfeature) => {},
		text = 'planfeature has been deleted.'
	): void {
		this.mongo.delete('userfeature', planfeature, () => {
			if (text) this.alert.show({ text });
		});
	}
}
