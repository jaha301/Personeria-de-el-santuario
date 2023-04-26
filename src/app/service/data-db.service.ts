import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {finalize, map} from 'rxjs/operators';
import {MessageI} from "../Models/message.interface";
import {FileI} from "../Models/file.interface";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import { Console } from 'console';
import { doc, getDoc, orderBy,query } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})

export class DataDbService {
  private contactCollection: AngularFirestoreCollection<MessageI>;// MessageI
  private contactCollectionPost: AngularFirestoreCollection<MessageI>;// MessageI
  private filePath: any;
  private produccionaB: AngularFirestoreDocument<MessageI> | undefined;
  private downloadURL: string = "no hay archivo"; // variable string para guardar la direccion de la imagen
  uploadProgress$: Observable<number|undefined> = new Observable<0>;
  urlImagen:string ="";
  mensaje={
    nombreProduccion: "nombreRef",
    id:'0',
    descripcion: 'descripcion',
    archivo: this.downloadURL
    }

  
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.contactCollection = afs.collection<MessageI>('Personeria'); // MessageI
    this.contactCollectionPost = afs.collection<MessageI>('PostsFire');
    }
  
  onSaveP(mensaje: MessageI,datoId:string): Promise<void>{  //este es el metodo que mejor esta guardando y guarda la ID pero guarda la que nosotros ponemos, mo la que pone firebase
    return new Promise(async (resolve, reject)=>{
  try{
    const id = datoId || this.afs.createId();
    const data = {id, ...mensaje};
    const result = await this.contactCollection.doc(id).set(data);
    resolve(result);
    }catch(err) {
    console.log(err);
  }});
 }
 onSavePost(mensaje: MessageI,datoId:string): Promise<void>{  //este es el metodo que mejor esta guardando y guarda la ID pero guarda la que nosotros ponemos, mo la que pone firebase
  return new Promise(async (resolve, reject)=>{
try{
  const id = datoId || this.afs.createId();
  const data = {id, ...mensaje};
  const result = await this.contactCollectionPost.doc(id).set(data);
  
  resolve(result);
  }catch(err) {
  console.log(err);
}});
}
  
  async getDato(dato:string) //este es el get que funciona y el que estamos usando para los datos string
  {    
    const documento = await getDoc(doc( this.afs.firestore , 'Personeria', dato));
    return documento.get('descripcion');
  }
  async getId(dato:string) //este es el get que funciona y el que estamos usando para los datos string
  {    
    const documento = await getDoc(doc( this.afs.firestore , 'Personeria', dato));
    return documento.get('id');
  }
  async getUrl():Promise<string>//get para retornar el valor de las imagenes(archivo)..... esposible que debamos isertar un dato en el metodo para el id imagen1
  { 
    const documento = await getDoc(doc( this.afs.firestore , 'Personeria', 'imagen'));
    const documento2 = await getDoc(doc( this.afs.firestore , 'Personeria', 'imagen'));
    const urlImagen2 = documento2.get('archivo') ; 
   
    return urlImagen2
  }  

    uploadFile(produccion: MessageI, file: FileI ) {//sube la imagen al storage

    this.filePath = `pesoneriaImages/${file.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, file);
    this.uploadProgress$ = task.percentageChanges();
    
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.getUrl();
          fileRef.getDownloadURL().subscribe(urlArchivo => {
            this.downloadURL = urlArchivo;
            this.pasaUrl(this.downloadURL);
            this.onSaveP(this.mensaje, 'imagen');
          })
        })
      ).subscribe(); 
  }
    




  getProgres(){
    return this.uploadProgress$;
  }
  pasaUrl(dato:string){ //pasa el dato del archivo a mensaje. de otra forma no graba.
    this.mensaje.archivo = dato;
  }



  

  public getAllProduccion():Observable<MessageI[]>{
    return this.afs
      .collection('PostsFire')
       .snapshotChanges()
        .pipe(
          map(actions =>
      actions.map(a => {
    const data = a.payload.doc.data() as MessageI;
 
    const id = a.payload.doc.id;
    return {id, ...data};
    })
     ));
  }
  
  deleteProduccion(idProduccion: string): void {
    this.produccionaB = this.afs.doc<MessageI>(`PostsFire/${idProduccion}`)
    this.produccionaB.delete();
  }


  
  //----------------------------------------------------------------------------------------------
  
  
  
  saveMessage(datos: MessageI):void{ // este metodo solo guardo datos internos, por el momento no se usa
 
    const productObj = {
      nombreProduccion: datos.nombreProduccion,
      descripcion: datos.descripcion,
      archivo: "nombre de archivo",
      fileRef: "this.filePath"
    };
    //Editar Produccion tambien
   //return this.contactCollection.add(productObj); // MessageI
    
  }



  public preAddProduccion(produccion:MessageI, file: FileI):void{
    this.uploadFile(produccion, file);
  }


    public getProduccion(documentId: string) {
      console.log(this.contactCollection.doc(documentId).snapshotChanges());
      }
      


  }



