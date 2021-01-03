import React, { useContext } from 'react';
import { IonButton, IonLabel, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonList, IonLoading, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { RouteComponentProps } from 'react-router';
import { ItemContext } from './ItemProvider';
import { Item } from '../item/Item';
import { add } from 'ionicons/icons';
import {getItems} from '../../common/ItemApi'
import { AuthContext } from '../auth/AuthProvider';
import {IonInfiniteScroll,
    IonInfiniteScrollContent,
    useIonViewWillEnter} from '@ionic/react';
    import  { useEffect, useState } from 'react';
    import { useAppState } from '../../common/network/useAppState';
import { useNetwork } from '../../common/network/useNetwork';
import { Plugins } from '@capacitor/core';
import { createGesture, CreateAnimation, Gesture, GestureDetail } from '@ionic/react';


import { useBackgroundTask } from '../../common/network/useBackgroundTask';
const ItemList : React.FC<RouteComponentProps> = ({history}) => {
    const {items,fetching} = useContext(ItemContext);
    const {logout} = useContext(AuthContext);
    const { networkStatus } = useNetwork();
    const [disableInfiniteScroll, setDisableInfiniteScroll] = useState<boolean>(false);
    console.log('render ItemList');
    const { Storage } = Plugins;
    function checkConnection(){
        if (networkStatus.connected.toString() == 'true'){
            return 'CONNECTED'
        }
        return 'DISCONNECTED'
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle slot='start'>Aplicație IONICă</IonTitle>
                    <IonButtons slot='start'>
                        <IonLabel>{checkConnection()}</IonLabel>
                        <IonButton shape="round" color="tertiary" fill="outline" onClick = {logout}>Logout</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonLoading isOpen = {fetching} message="Fetching items..."/>
                { items && (
                    <IonList>
                        {
                        items.map( ({id ,titlu,autor,data,rating,user, status}) =>
                            <Item key={id}
                                id = {id} 
                                titlu = {titlu} 
                                autor = {autor} 
                                data = {data} 
                                rating = {rating}
                                user = {user}
                                status = {status}
                                onEdit = {id => history.push(`/item/${id}`)}
                            />)
                        }
                    

                    </IonList>                    
                )}
                <IonFab vertical='bottom' horizontal='start'  slot='fixed'>
                    <IonFabButton color="danger" onClick = { () => history.push('/item') }>
                        <IonIcon icon = { add } />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default ItemList;