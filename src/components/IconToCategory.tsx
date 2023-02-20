import React, { ReactNode } from 'react';
import { bookOutline,businessOutline,sunnyOutline,scaleOutline,sparklesOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

interface Props {
    height:number,
    width:number,
    category:string
}

const IconToCategory: React.FC<Props> = ({category,width,height}) => {
    let result:ReactNode;
    switch (category) {
        case "Culturale":
            result = <IonIcon icon={bookOutline} size="small" color='tertiary' className='align-middle'/*  className={iconStyle} aria-hidden="true" */ />;
            break;
        case "Architetturale":
            result = <IonIcon icon={businessOutline} size='small' color='danger' className='align-middle'/* className={iconStyle} aria-hidden="true" */ />;
            break;
        case "Naturalistica":
            result = <IonIcon icon={sunnyOutline} size='small' color='warning' className='align-middle' /* className={iconStyle} aria-hidden="true" */ />;
            break;
        case "ZonaParcheggio":
            result = <IonIcon icon={scaleOutline} size='small' color='secondary' className='align-middle'/* className={iconStyle} color="#4F46E5" */ />;
            break;
        case "Spirituale":
            result = <IonIcon icon={sparklesOutline} size='small' color='warning' className='align-middle' /* className={iconStyle} color="#4F46E5" */ />;
            break;
        default:
            result = <></>;
    }
    return result;
};

export default IconToCategory