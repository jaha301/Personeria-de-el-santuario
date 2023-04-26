import { MatMenuModule } from '@angular/material/menu';
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
import { FileI } from 'src/app/Models/file.interface';
import { serverTimestamp } from 'firebase/firestore';
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
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})


export class MenuComponent {
  url ="hhh";
  imagen: string="";
  uploadProgress$: Observable<number|undefined> = new Observable<0>;
  mision: string = 'esto debe ser diferente.';
  file:any; 
  idd:string='1';

  mensaje={
    nombre: "nombre",
    id:'1',
    descripcion: "descripcion",
    archivo: "imagen",
      }

    public posts$: Observable<MessageI[]>=new Observable<[]>;
    



  constructor(public auth: AuthService, private dbData: DataDbService, private storageProduccion: AngularFireStorage,  private locacion: Location) {
    this.geturl();

  } 


    uploadImagen($event:any){ //metodo para subir imagen al storge, funciona
      this.file = $event.target.files[0];
   
    }

    async subirImagen(){
      const a = this.dbData.uploadFile(this.mensaje,this.file);
      this.url = await this.dbData.getUrl();
      this.uploadProgress$=this.dbData.getProgres();
    }

    async geturl(){
      this.url = await this.dbData.getUrl();
      
      this.posts$=this.dbData.getAllProduccion();
    
      }

 
      
   async save(imagen:string, noticia:string, titulo:string){     //este es el metodo que estoy usando para guardar los datos en firebase
    
    this.idd = await this.dbData.getId('identificador');
    this.idd = this.idd.slice(1, -1);
    this.mensaje.id = this.idd;
    console.log('mid:',this.mensaje.id)
    console.log('id:  ', this.idd)
    this.mensaje.archivo = imagen;
    this.mensaje.nombre = titulo;
    this.mensaje.descripcion  = noticia;
    
    this.dbData.onSaveP(this.mensaje, 'identificador');
    this.dbData.onSavePost(this.mensaje, this.mensaje.id);
  
     }
   
     borrar(dato:string){
      this.dbData.deleteProduccion(dato);
     }

    mostrar(){
     alert("Noticia Publicada.");
    }

    confirmar(){
      return confirm("seguro que quieres publicar?")
      
   }

    eliminada(){
      alert("Noticia Eliminada");
     }


}

