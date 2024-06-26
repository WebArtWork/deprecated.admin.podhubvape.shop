import { Component } from "@angular/core";
import { FormService } from "src/app/modules/form/form.service";
import {
	PlanService,
	Plan,
} from "../../services/plan.service";
import { AlertService, CoreService } from "wacom";
import { TranslateService } from "src/app/modules/translate/translate.service";
import { FormInterface } from "src/app/modules/form/interfaces/form.interface";

@Component({
	templateUrl: "./plans.component.html",
	styleUrls: ["./plans.component.scss"],
})
export class PlansComponent {
	columns = ["name", "price", "yearPrice"];

	form: FormInterface = this._form.getForm("plan", {
		formId: "plan",
		title: "Plan",
		components: [
			{
				name: "Text",
				key: "name",
				focused: true,
				fields: [
					{
						name: "Placeholder",
						value: "fill plan title",
					},
					{
						name: "Label",
						value: "Title",
					},
				],
			},
			{
				name: "Text",
				key: "description",
				fields: [
					{
						name: "Placeholder",
						value: "fill plan description",
					},
					{
						name: "Label",
						value: "Description",
					},
				],
			},
			{
				name: "Number",
				key: "price",
				fields: [
					{
						name: "Placeholder",
						value: "fill plan price",
					},
					{
						name: "Label",
						value: "Price",
					},
				],
			},
			{
				name: "Number",
				key: "yearPrice",
				fields: [
					{
						name: "Placeholder",
						value: "fill plan year price",
					},
					{
						name: "Label",
						value: "Year Price",
					},
				],
			},
		],
	});

	sort() {
		const docs = this.rows;
		for (let i = 0; i < docs.length; i++) {
			if (docs[i].order !== i) {
				docs[i].order = i;
				this._sp.save(docs[i], () => { }, '');
			}
		}
	}

	config = {
		create: () => {
			this._form.modal<Plan>(this.form, {
				label: "Create",
				click: (created: unknown, close: () => void) => {
					this._sp.create(created as Plan, this.sort.bind(this));
					close();
				},
			});
		},
		update: (doc: Plan) => {
			this._form
				.modal<Plan>(this.form, [], doc)
				.then((updated: Plan) => {
					this._core.copy(updated, doc);
					this._sp.save(doc);
				});
		},
		delete: (doc: Plan) => {
			this._alert.question({
				text: this._translate.translate(
					"Common.Are you sure you want to delete this cservice?"
				),
				buttons: [
					{
						text: this._translate.translate("Common.No"),
					},
					{
						text: this._translate.translate("Common.Yes"),
						callback: () => {
							this._sp.delete(doc);
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'arrow_upward',
				click: (doc: Plan) => {
					const docs = this.rows;
					const index = docs.findIndex(d => d._id === doc._id);
					[docs[index], docs[index - 1]] = [docs[index - 1], docs[index]];
					this.sort();
				}
			},
			{
				icon: 'segment',
				hrefFunc: (doc: Plan) => {
					return `/admin/plan/${doc._id}`;
				}
			}
		]
	};

	get rows(): Plan[] {
		return this._sp.plans;
	}

	constructor(
		private _sp: PlanService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) { }
}
