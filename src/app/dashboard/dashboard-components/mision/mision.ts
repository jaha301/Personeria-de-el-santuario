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
  selector: "app-our-visiter",
  templateUrl: "./mision.html"
})


export class Mision implements OnInit{
  mision: string = 'La Personería de El santuario protege y promueve los derechos humanos, vigila la conducta oficial de quienes desempeñen funciones públicas, protege el interés público y el medio ambiente, aporta a la solución alternativa de conflictos; al fortalecimiento, respeto y garantía de la diversidad y grupos poblacionales, buscando estar más cerca de la comunidad.';
  mensaje={
    nombreProduccion: "nombreRef",
    id:'mision',
    descripcion: this.mision,
    archivo: "this.archivofotos",
       }
  
  @ViewChild("visitor-chart") chart2: ChartComponent = Object.create(null);


  constructor(public auth: AuthService, private dbData: DataDbService, private storageProduccion: AngularFireStorage,  private locacion: Location) {
      this.getInfo();
    }  


   save(dato:string):void{     //este es el metodo que estoy usando para guardar los datos en firebase

   const mensajeId= this.mensaje?.id;
   this.mensaje.descripcion = dato;
   this.dbData.onSaveP(this.mensaje, mensajeId);
   }
   async getInfo(){ //este es el get
    this.mision = await this.dbData.getDato('mision');
    }


  ngOnInit(): void {}

  
  }
