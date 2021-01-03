import { IonButton, IonRow,IonFab, IonIcon, IonFabButton, IonActionSheet, IonCol, IonImg, IonButtons, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { ItemContext } from "../items/ItemProvider";
import { ItemProps } from "./ItemProps";
import { useMyLocation } from '../../common/maps/useLocation';
import { MyMap } from '../../common/maps/MyMap';
import { camera, close, trash } from 'ionicons/icons';
import { Photo, usePhotoGallery } from './../../common/camera/useGallery';
interface ItemEditProps extends RouteComponentProps<{
    id? : string;
}>{}

const ItemEdit : React.FC<ItemEditProps> = ({history,match}) => {
    const {items,saving,saveItem} = useContext(ItemContext);
    const [titlu,setTitlu] = useState<string>('');
    const [autor,setAutor] = useState<string>('');
    const [data,setData] = useState<string>();
    const [rating,setRating] = useState<string>('');
    const [user,setUserId] = useState<string>('');
    const [item,setItem] = useState<ItemProps>();
    const [status, setStatus] = useState<string>('');
    const myLocation = useMyLocation();
    const { photos, takePhoto, deletePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<Photo>();
    var { latitude: lat, longitude: lng } = myLocation.position?.coords || {}
    var canBack = true;
    useEffect( () => {
        console.log('useEffect');
        console.log(typeof(match.params.id));
        let routeId = Number(match.params.id);
        if(isNaN(routeId)){
            //create
            routeId = -1;
            
        }
        let item = items?.find(it => it.id === routeId);
        setItem(item);
        if(item){
            //update
            setTitlu(item.titlu);
            setAutor(item.autor);
            setData(new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDay());
            setRating(item.rating);
            setUserId(item.user);
            setStatus(item.status);
        }
    },
    [match.params.id,items]
    );

    const handleSave = () => {
        if(data === undefined){
            setData(new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDay());
        }
        
        const editedItem = item? {...item,titlu,autor,data,rating,user,status} : {titlu,autor,data,rating,user,status};
        console.log(editedItem);
        saveItem && saveItem(editedItem).then(() => {
            if(!canBack){
                history.block(false);
                canBack = true;
            }
            history.goBack();
            
        }).catch(err => {
            if(canBack){
                history.block(true);
                canBack = false;
            } 
        });
    }



    console.log('render ItemEdit');
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Edit Item</IonTitle>
                    <IonButtons slot="end">
                        
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>

     

            <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg onClick={() => setPhotoToDelete(photo)}
                        src={photo.webviewPath}/>
              </IonCol>
            ))}
          </IonRow>
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}/>
          </IonFabButton>
        </IonFab>
        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
                <IonInput placeholder="Titlu" value={titlu} onIonChange = {e => setTitlu(e.detail.value || '')} />
                <IonInput placeholder="Autor" value={autor} onIonChange = {e => setAutor(e.detail.value || '')} />
                <IonInput placeholder="Rating" value={rating} onIonChange = {e => setRating(e.detail.value || '')} />
                <IonInput placeholder="Data" value={data}  onIonChange = {e => setData(e.detail.value || '')}/>
                <IonInput value={status} onIonChange={e => setStatus(e.detail.value || '')}/>
               
                <IonLoading isOpen = {saving} />
            
                Latitude : <IonInput value = {lat}></IonInput>
                Longitude : <IonInput value = {lng}></IonInput>
                
                  
        {lat && lng &&
          <MyMap
            lat={lat}
            lng={lng}
            onMapClick={log('onMap')}
            onMarkerClick={log('onMarker')}
          />}

           <IonButton color="success" fill="outline" shape="round" expand="block" onClick = {handleSave}>BOOM!</IonButton>
            </IonContent>
        </IonPage>
    );

    function log(source: string) {
        return (e: any) =>{lat=e.latLng.lat(); console.log(source, e.latLng.lat(), e.latLng.lng())};
      }
};

export default ItemEdit;