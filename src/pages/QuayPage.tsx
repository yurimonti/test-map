import React from 'react'
import MyHeader from '../components/MyHeader'
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon } from '@ionic/react'
import paperoPic from "../images/Screenshot_20230212-015736_Instagram.jpg";
import { heart } from 'ionicons/icons';

const QuayPage = () => {
  return (
    <MyHeader title='Quay' backButton>
      <div className='flex align-middle justify-center items-center'>
        <IonCard color='danger'>
          <img alt="Un papero Nikko" src={paperoPic} />
          <IonCardHeader>
            <IonCardTitle>Auguri Quay<IonIcon></IonIcon></IonCardTitle>
            <IonCardSubtitle>Sei un Papero Nikko</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Ciao!
          </IonCardContent>
        </IonCard>
      </div>
    </MyHeader>
  )
}

export default QuayPage