import { Component, OnInit, ViewChild } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import { Firestore, collection, addDoc, DocumentReference} from "@angular/fire/firestore";
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {MessageI} from "src/app/Models/message.interface";
import {DataDbService} from "src/app/service/data-db.service";
import { Location } from '@angular/common';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";

@Component({
  selector: 'app-profile',
  templateUrl: './valores.html',
})
export class Valores implements OnInit {
 
  valores: string = 'La Personería de El santuario al finalizar el cuatrienio 2020-2024, será identificada local y globalmente como una entidad comprometida en el cumplimiento de su mandato constitucional, en la protección a los derechos humanos, al medio ambiente, el hábitat, a los seres sintientes, a la diversidad, a los diferentes grupos étnicos. Cercana a la comunidad a través de la inclusión con enfoque diferencial de los sectores más vulnerables; acompañando a las víctimas del conflicto, liderando la lucha anticorrupción; orientando la formulación y aplicación de las políticas públicas que aseguren la diversidad, el pluralismo, la convivencia pacífica; vigilando el desarrollo de los acuerdos del post-conflicto; adaptada a las nuevas tecnologías y transformada para asumir grandes retos; fortalecida en su recurso humano, mejorando la prestación de sus servicios.';
  mensaje={
    nombreProduccion: "nombreRef",
    id:'valores',
    descripcion: this.valores,
    archivo: "this.archivofotos",
      }

    constructor(public auth: AuthService, private dbData: DataDbService, private storageProduccion: AngularFireStorage,  private locacion: Location) {
      this.getInfo();
    }  
    save(dato:string):void{     //este es el metodo que estoy usando para guardar los datos en firebase

      const mensajeId= this.mensaje?.id;
      this.mensaje.descripcion = dato;
      this.dbData.onSaveP(this.mensaje, mensajeId);
       
      }
      async getInfo(){ //este es el get
       this.valores = await this.dbData.getDato('valores');
       }
  ngOnInit(): void {
  }

}
