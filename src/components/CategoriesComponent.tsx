import React, { useEffect } from 'react'
import CheckBoxComponent from './CheckBoxComponent';
import InputSelect from './InputSelect';
import { getAllCategories, getAllTypes } from '../api/touristApi';
import { CategoryType, PoiTagRel, PoiType, Tag } from '../utility/types';
import { HttpResponse } from '@capacitor/core';

interface Props {
    tagValues: PoiTagRel[],
    setTagValues: any,
    categories: CategoryType[],
    setCategories: (categories: CategoryType[]) => void,
    categoryValues: string[],
    setCategoryValues: (categoryValues: string[]) => void,
    types: PoiType[],
    setTypes: (types: PoiType[]) => void,
    typeValues: PoiType[],
    setTypeValues: (typeValues: PoiType[]) => void,
    getTypesFiltered: (filter : any) => void
}

const CategoriesComponent: React.FC<Props> = ({
    tagValues,
    setTagValues,
    categories,
    setCategories,
    categoryValues,
    setCategoryValues,
    types,
    setTypes,
    typeValues,
    setTypeValues,
    getTypesFiltered
}) => {
    /* function getCategories() {
        getAllCategories()
            .then((res: any) => {
                setCategories(res.data);
                console.log(res.status);
            })
            .catch((err) => {
                console.log(err);
            });
    } */

    /**
     * 
     * @param {Object[]} filter : array of categories to apply the filter for types contained in;
     * Filtered types from server
     */
    /* function getTypesFiltered(filter: any) {
        getAllTypes(filter)
            .then((res: any) => {
                setTypes(res.data);
                console.log(res.status);
            })
            .catch((err) => console.log(err));
    } */

    //--------------------------------------useEffect----------------------------------
    /* useEffect(() => {
        getCategories();
        getTypesFiltered([]);
        return () => {
            setCategoryValues([]);
            setCategories([]);
            setTypeValues([]);
            setTypes([]);
            setTagValues([]);
        };
    }, []); */

    //---------------------------------------some functions----------------------------------

    /**
     * 
     * @param {string | boolean} typeValuesToAdd values to add to default;
     * initializes tags with default values. 
     */
    function initTagsFromSelectedTypes(typeValuesToAdd: PoiType[]) {
        if (typeValuesToAdd.length === 0) setTagValues([]);
        else {
            setTypeValues(typeValuesToAdd);
            typeValuesToAdd.forEach((toAdd: PoiType) => {
                toAdd.tags.forEach((t) => {
                    setTagValues((prev:PoiTagRel[]) => {
                        !prev.map(p => p.tag.id ).includes(t.id) && prev.push({ id:null,tag: t, booleanValue:false, stringValue:""});
                        
                        /* const distinct = prev.filter((a:any,b:any,c:any)=> c.findIndex((d:any) => d.tag.id === a.tag.id)===b); */
                        /* let result = [...new Map(prev.map(item =>
                          [item["tag"]["id"], item])).values()]; */
                        return prev;
                    /* if (tagValues.filter((tv) => tv.tag?.id === t.id).length <= 0) { */
                    //let defaultTagValue = t.isBooleanType ? false : "";
                    // DA QUI
                    /* setTagValues((prev: any[]) => {
                        if (!prev.includes((tagValue: PoiTagRel) => t.id === tagValue.tag.id)) {
                            const newValue = { id: null, tag: t, booleanValue: false, stringValue: "" };
                            console.log(newValue)
                            prev.push(newValue);
                        };
                        let ids = [...prev];
                        ids = ids.map((p:PoiTagRel) => p.tag).map((t:Tag)=> t.id).filter((value, index, self) => self.indexOf(value) === index);
                        console.log(ids);
                        let result:any = [];
                        prev.forEach(v => {
                            if(ids.includes(v.tag.id)){
                                result.push(v);
                                ids = ids.filter(id => id!==v.tag.id);
                            }
                        })
                        return result; */
                        //FINO A QUI
                        //vedere meglio
                        /* let result = [...new Map(prev.map((item:any) =>
                            [item["tag"]["id"], item])).values()];
                        return result; */
                    });
                    /* } */
                });
            });
        }
    }


    function handleCheckTagInput(event: any, tagValue: PoiTagRel) {
        let checkedEvent = event.target.checked;
        console.log(tagValues);
        setTagValues(
            tagValues.map((v) => {
                if (v.tag.id === tagValue.tag.id) {
                    v.booleanValue = checkedEvent;
                }
                return v;
            })
        );
    }


    function handleTextTagInput(event: any, tagValue: PoiTagRel) {
        let currentValue = event.target.value;
        setTagValues(
            tagValues.map((v) => {
                if (v.tag.id === tagValue.tag.id) {
                    v.stringValue = currentValue;
                }
                return v;
            })
        );
    }

    /**
     * 
     * @returns all Tags HtmlElement
     * CheckBok if is a boolean type, textarea otherwise
     */
    function renderAllTags() {
        return tagValues.map((v) => {
            if (v.tag.isBooleanType) {
                return (
                    <div className="grid grid-cols-2 gap-6" key={v.tag.id}>
                        <CheckBoxComponent
                            onChange={(e: any) => {
                                handleCheckTagInput(e, v);
                            }}
                            tagValue={v.booleanValue}
                            keyValue={v.tag.name}
                        />
                    </div>
                );
            } else
                return (
                    <div className="grid grid-cols-2 gap-6" key={v.tag.id}>
                        <label
                            htmlFor={v.tag.name}
                            className="block text-sm font-medium text-gray-700"
                        >
                            {v.tag.name}
                        </label>
                        <textarea
                            id={v.tag.id.toString()}
                            name={v.tag.name}
                            rows={3}
                            className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-200"
                            placeholder={v.tag.name}
                            value={v.stringValue as string}
                            onChange={(e) => {
                                handleTextTagInput(e, v);
                            }}
                        />
                    </div>
                );
        });
    }

    //---------------------------------------return Component----------------------------------
    return (
        <>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-6">
                <InputSelect
                    values={categories}
                    value={categoryValues}
                    multiple={true}
                    onChange={(values: any[]) => {
                        setCategoryValues(values);
                        getTypesFiltered(values);
                    }}
                    keyValue="Categorie"
                    toView="name"
                />
                {/* ----------------------------bottone cancellazione----------------------------------------- */}
                {/* <div className="flex-box">
                    <button
                        type="button"
                        onClick={() => {
                            setCategoryValues([]);
                            setTypeValues([]);
                            getTypesFiltered(categoryValues);
                            setTagValues([]);
                        }}
                        className="ml-5 mt-1.5 bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        cancella
                    </button>
                </div> */}
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-6">
                {/* --------------------------select box----------------------------------- */}
                <InputSelect
                    values={types}
                    value={typeValues}
                    multiple={true}
                    onChange={initTagsFromSelectedTypes}
                    keyValue="Tipi"
                    toView="name"
                />
            </div>
            <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => {
                            setCategoryValues([]);
                            setTypeValues([]);
                            getTypesFiltered(categoryValues);
                            setTagValues([]);
                        }}
                        className="ml-5 mt-1.5 bg-white py-2 px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium text-gray-700 ring-1 ring-indigo-500 ring-opacity-100"
                    >
                        cancella
                    </button>
                </div>
            {/* //-------------------------tags------------------------------------ */}
            {renderAllTags()}
        </>
    );
}

export default CategoriesComponent