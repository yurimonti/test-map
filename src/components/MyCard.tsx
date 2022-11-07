import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react'
import React from 'react';
import "./MyCard.css";

interface Props {
    title?: string | undefined ,
    subtitle?: string | undefined,
    content?: string | React.ReactNode | undefined
}

const MyCard: React.FC<Props> = ({title,subtitle,content}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{subtitle}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        {content}
      </IonCardContent>
    </IonCard>
  )
}
export default MyCard;