import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import { useContext, useState } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { AuthContext } from "./AuthProvider";

interface LoginState {
    username? : string;
    password? : string;
}

export const Login : React.FC<RouteComponentProps> = ({history}) => {
    const { isAuthenticated, isAuthenticating, pendingAuthenticating,authenticationError, login } = useContext(AuthContext);
    const [state,setState] = useState<LoginState>({});
    const { username, password } = state;

    const handleLogin = () => {
        login?.(username,password);
    };

    if(isAuthenticated){
        console.log('intru aici');
        return <Redirect to = {{pathname : '/'}} />
    }

    console.log('render Login');
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Sign in</IonTitle>
                    
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonInput
                    placeholder = "Username"
                    value = { username }
                    onIonChange = { e => setState({
                        ...state,
                        username : e.detail.value || ''
                    })}
                />
                <IonInput
                    placeholder = "Password"
                    value = { password }
                    type = "password"
                    onIonChange = { e => setState({
                        ...state,
                        password : e.detail.value || ''                        
                    })}
                />
                <IonButton fill="outline" color="danger" expand="block" shape="round" onClick = { handleLogin }>Login</IonButton>
                <IonLoading isOpen = { isAuthenticating } />
            </IonContent>
        </IonPage>
    );
};