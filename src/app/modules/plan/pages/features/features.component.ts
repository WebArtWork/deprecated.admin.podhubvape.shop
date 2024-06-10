import { Component } from "@angular/core";
import { FormService } from "src/app/modules/form/form.service";
import { AlertService, CoreService } from "wacom";
import { TranslateService } from "src/app/modules/translate/translate.service";
import { FormInterface } from "src/app/modules/form/interfaces/form.interface";
import { Router } from "@angular/router";
import { Planfeature, PlanfeatureService } from "../../services/planfeature.service";

@Component({
	templateUrl: "./features.component.html",
	styleUrls: ["./features.component.scss"],
})
export class FeaturesComponent {
	plan = this._router.url.replace('/admin/plan/', '');

	columns = ["inPlan", "inDone", "name", "price", "yearPrice"];

	form: FormInterface = this._form.getForm("features", {
		formId: "features",
		title: "Features",
		components: [
			{
				name: "Text",
				key: "name",
				focused: true,
				fields: [
					{
						name: "Placeholder",
						value: "fill feature title",
					},
					{
						name: "Label",
						value: "Title",
					},
				],
			},
			{
				name: "Text",
				key: "url",
				fields: [
					{
						name: "Placeholder",
						value: "fill feature url",
					},
					{
						name: "Label",
						value: "Url",
					},
				],
			},
			{
				name: "Text",
				key: "description",
				fields: [
					{
						name: "Placeholder",
						value: "fill feature description",
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
						value: "fill feature price",
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
						value: "fill feature year price",
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
			this._form.modal<Planfeature>(this.form, {
				label: "Create",
				click: (created: unknown, close: () => void) => {
					this._sp.create(created as Planfeature, this.sort.bind(this));
					close();
				},
			});
		},
		update: (doc: Planfeature) => {
			this._form
				.modal<Planfeature>(this.form, [], doc)
				.then((updated: Planfeature) => {
					this._core.copy(updated, doc);
					this._sp.save(doc);
				});
		},
		delete: (doc: Planfeature) => {
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
				click: (doc: Planfeature) => {
					const docs = this.rows;
					const index = docs.findIndex(d => d._id === doc._id);
					[docs[index], docs[index - 1]] = [docs[index - 1], docs[index]];
					this.sort();
				}
			}
		]
	};

	get rows(): Planfeature[] {
		return this._sp.planfeatures;
	}

	constructor(
		private _sp: PlanfeatureService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) { }

	update(feature: Planfeature) {
		this._sp.update(feature);
	}
}
