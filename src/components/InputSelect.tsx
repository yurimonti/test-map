import React from 'react'
import { Listbox } from "@headlessui/react";
import { chevronDownOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

interface Props {
    value:any | any[],
    onChange:any,
    multiple?:boolean,
    values:any[],
    toView?:string,
    keyValue:string,
    displayString?:boolean
}

const InputSelect: React.FC<Props> = ({
    value,
    onChange,
    multiple,
    values,
    toView,
    keyValue,
    displayString
}) => {
    function realValue(value:any) {
        if (!displayString) return toView ? value[toView] : value;
        else return value.toString();
    }

    function toSet(value: any) {
        if (value === null || value === undefined || value.length === 0 || Object.keys(value).length === 0) return "Nessuna";
        if (multiple) {
            return value.map((sel:any) => realValue(sel)).join(", ");
        } else return realValue(value);
    }

    return (
        <Listbox value={value} onChange={onChange} multiple={multiple}>
            <Listbox.Label className="block text-sm font-medium text-gray-700 mr-3">
                {keyValue}
            </Listbox.Label>
            <div className="mt-1 relative">
                <Listbox.Button
                    className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default ring-1 ring-indigo-500 ring-opacity-100"
                >
                    {toSet(value)}
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <IonIcon icon={chevronDownOutline} color='primary' slot='end' className='align-middle'/>
                    </span>
                </Listbox.Button>
                <Listbox.Options
                    className="z-10 mt-1 p-2 w-full bg-white shadow-lg max-h-56 rounded-md py-1 
            ring-2 ring-indigo-500 ring-opacity-100 overflow-auto text-sm"
                >
                    {values.map((val) => (
                        <Listbox.Option key={realValue(val)} value={val}>
                            {realValue(val)}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    );
}

export default InputSelect