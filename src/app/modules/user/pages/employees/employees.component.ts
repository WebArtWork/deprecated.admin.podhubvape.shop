import { Component } from '@angular/core';
import { FormService } from 'src/app/modules/form/form.service';
import { FormInterface } from 'src/app/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/modules/translate/translate.service';
import { AlertService, CoreService } from 'wacom';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
	readonly roles = this._us.roles;

	readonly roleName = this._us.roleName;

	readonly roleDescription = this._us.roleDescription;

	columns = ['name', 'email'];

	get users(): User[] {
		return this._us.users;
	}

	form: FormInterface = this._form.getForm('user');

	config = {
		create: () => {
			this._form
				.modal<User>(this.form, {
					label: 'Create',
					click: (created: unknown, close: () => void) => {
						this._us.addRole(created as User, close.bind(this));
					}
				})
				.then(this._us.create.bind(this));
		},
		update: (doc: User) => {
			this._form.modal<User>(this.form, [], doc).then((updated: User) => {
				this._core.copy(updated, doc);
				this._us.update(doc, {
					alert: 'User has been updated'
				});
			});
		},
		delete: (user: User) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this user?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: () => {
							this._us.delete(user, {
								name: 'admin',
								alert: 'User has been deleted',
								callback: () => {
									// this.setUsers();
								}
							});
						}
					}
				]
			});
		}
	};

	constructor(
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _us: UserService
	) {
		for (const role of this._us.roles) {
			this.columns.push(this._us.roleName[role] || role);
		}
	}

	update(user: User): void {
		this._us.updateAdmin(user);
	}
}
