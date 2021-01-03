import React from 'react';
import { IonItem, IonLabel } from "@ionic/react";
import { ItemPropsExtended } from './ItemPropsExtended';
import { createGesture, CreateAnimation, Gesture, GestureDetail } from '@ionic/react';

export const Item : React.FC<ItemPropsExtended> = ({id,titlu,autor,data,rating,onEdit}) => {
    
    var animation: React.RefObject<CreateAnimation> = React.createRef();
    var gesture: Gesture;
    var started: boolean = false;
    var initialStep: number = 0;

    return (
        <IonItem onClick = { () =>  onEdit(id) }>
            <IonLabel>{titlu}</IonLabel>
            <IonLabel>{autor}</IonLabel>
         
        </IonItem>
    );
};

