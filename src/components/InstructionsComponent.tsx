import {FC} from 'react'
import './icon.css';

interface Props {
geojson:any | undefined
}

const InstructionsComponent:FC<Props> = ({geojson}) => {
    function directive() {
        return geojson?.features[0]?.properties?.segments?.map((segment:any) => {
            return segment?.steps?.map((step:any) => {
                return (
                    <li key={Math.random()}>
                        {step?.instruction}
                    </li>
                );
            });
        });
    }

    return (
        <ol>
            {directive()}
        </ol>
    );
}

export default InstructionsComponent