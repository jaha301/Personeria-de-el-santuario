import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
	selector: 'app-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss'],
	providers: [{
	    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
	}]
})

export class StepperComponent implements OnInit {

	nombre = ""
	celular = ""
	solicitud = ""
	
	isLinearvarient = false;
  	varientfirstFormGroup: FormGroup=Object.create(null);
 	varientsecondFormGroup: FormGroup=Object.create(null);
	varientthirdFormGroup: FormGroup=Object.create(null);
	 
	constructor(private _formBuilder: FormBuilder) {
	
	}

	ngOnInit() {
		// varient
		this.varientfirstFormGroup = this._formBuilder.group({
		      varientfirstCtrl: ['', Validators.required]
		});
		this.varientsecondFormGroup = this._formBuilder.group({
		      varientsecondCtrl: ['', Validators.required]
		});
		this.varientthirdFormGroup = this._formBuilder.group({
			varientthirdCtrl: ['', Validators.required]
	  });

		
	}
	
	setSolicitud(inputValue1:string,inputValue2:string,){
		this.nombre = inputValue1
		this.celular = inputValue2
	
		if(this.nombre==""||this.celular=="")
		{
			this.alerta2()
		}
		else{
		console.log(this.nombre)
		console.log(this.celular)

		}
	}
	alerta2()
	{
		window.alert("Debe llenar todos los Campos.")
	}

}
