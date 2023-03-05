import React from 'react'
import ClassicInput from './ClassicInput'
import InputSelect from './InputSelect'
import CategoriesComponent from './CategoriesComponent'
import DropDownComponent from './DropDownComponent'
import { IonIcon } from '@ionic/react'
import { phonePortraitOutline,timeOutline } from 'ionicons/icons'
import DayHoursComponent from './DayHoursComponent'

interface Props {
    buttons: any[],
    inputs: any,
    actions: any
}

const FormInfo: React.FC<Props> = ({ inputs, actions, buttons }) => {
    return (
        <form>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <br />
                    <p>Informazioni Poi</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nome POI */}
                        <ClassicInput
                            name="name"
                            value={inputs?.inputsString?.name}
                            setValue={actions.handleInputsString}
                            label="Nome"
                            type="text"
                            placeholder="Nome del Poi"
                            min=""
                        />

                        {/* Descrizione */}
                        <label
                            htmlFor="about"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Descrizione
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-200"
                                placeholder="Descrizione ..."
                                value={inputs.inputsString.description}
                                onChange={actions.handleInputsString}
                            />
                        </div>
                    </div>

                    {/* city */}
                    {inputs.city!==undefined && (
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:gap-6">
                            <InputSelect
                                values={inputs.cities}
                                value={inputs.city}
                                onChange={actions.setCity}
                                keyValue="Città"
                                toView="name"
                            />
                        </div>
                    )}

                    <div className="md:grid md:grid-cols-2 md:gap-6">
                        {/* indirizzo */}
                        <label
                            htmlFor="poi-via"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Via POI
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                type="text"
                                name="street"
                                id="street"
                                className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-600"
                                placeholder="Via del punto"
                                value={inputs.inputsString.street}
                                onChange={actions.handleInputsString}
                            />
                        </div>
                        <label
                            htmlFor="poi-numero"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Numero Civico
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                                type="number"
                                name="number"
                                id="number"
                                className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-600"
                                placeholder="numero della via"
                                value={inputs.inputsString.number}
                                onChange={actions.handleInputsString}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {/* lat */}
                        <div>
                            <ClassicInput
                                name="lat"
                                value={inputs.inputsString.lat}
                                setValue={actions.handleInputsString}
                                label="lat"
                                type="number"
                                placeholder="latitudine del Poi"
                                min="0"
                            />
                        </div>
                        {/* lon */}
                        <div>
                            <ClassicInput
                                name="lon"
                                value={inputs.inputsString.lon}
                                setValue={actions.handleInputsString}
                                label="lon"
                                type="number"
                                placeholder="longitudine del Poi"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* categories input select */}
                    {/*rivedere metodi del componente */}
                    <CategoriesComponent
                        categories={inputs.categories}
                        setCategories={actions.setCategories}
                        categoryValues={inputs.categoryValues}
                        setCategoryValues={actions.setCategoryValues}
                        types={inputs.types}
                        setTypeValues={actions.setTypeValues}
                        typeValues={inputs.typeValues}
                        setTypes={actions.setTypes}
                        tagValues={inputs.tagValues}
                        setTagValues={actions.setTagValues}
                        getTypesFiltered={actions.getTypesFiltered}
                    />
                    <br />
                    <p>Visita</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* ticket input */}
                        <ClassicInput
                            name="ticket"
                            symbol="€"
                            value={inputs.inputsString.ticket}
                            setValue={actions.handleInputsString}
                            label="ticket"
                            type="number"
                            placeholder="Prezzo"
                            min="0.00"
                        />

                        {/* time to visit input */}
                        <ClassicInput
                            name="timeToVisit"
                            value={inputs.inputsString.timeToVisit}
                            setValue={actions.handleInputsString}
                            label="timeToVisit"
                            type="number"
                            placeholder="Tempo Visita"
                            min="0"
                        />
                    </div>
                    <br />
                    <DropDownComponent
                        label="Contatti"
                        icon={
                            <IonIcon icon={phonePortraitOutline} color='tertiary' slot='end' className='align-middle my-auto' />
                        }
                        menuStyle="bg-white w-80 mt-4 px-6 rounded-md bg-white ring-2 ring-indigo-600 overflow-hidden"
                        buttonStyle="bg-gray-50 ring-2 ring-indigo-600 inline-flex rounded-xl px-4 py-2"
                    >
                        <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* email input */}
                            <ClassicInput
                                name="emailContacts"
                                value={inputs.inputsString.emailContacts}
                                setValue={actions.handleInputsString}
                                label="emailContacts"
                                type="text"
                                placeholder="example@domain.com"
                                min=""
                            />
                            {/* cellphone input */}
                            <ClassicInput
                                name="phoneContacts"
                                symbol="+39"
                                value={inputs.inputsString.phoneContacts}
                                setValue={actions.handleInputsString}
                                label="phoneContacts"
                                type="number"
                                placeholder="0123456789"
                                min=""
                            />
                            {/* fax input */}
                            <ClassicInput
                                name="faxContacts"
                                //symbol="+39"
                                value={inputs.inputsString.faxContacts}
                                setValue={actions.handleInputsString}
                                label="faxContacts"
                                type="text"
                                placeholder="fax"
                                min=""
                            />
                        </div>
                    </DropDownComponent>

                    {/* timepicker */}
                    <br />

                    <DropDownComponent
                        label="Orari"
                        icon={
                            <IonIcon icon={timeOutline} color='tertiary' slot='end' className='align-middle my-auto' />
                        }
                        menuStyle="bg-white w-80 mt-4 px-6 rounded-md bg-white ring-2 ring-indigo-600 overflow-hidden"
                        buttonStyle="bg-gray-50 ring-2 ring-indigo-600 inline-flex rounded-xl px-4 py-2"
                    >
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 text-center py-2 pr-4">
                            <DayHoursComponent
                                keyValue="Lunedì"
                                value={inputs.monday}
                                setValue={actions.setMonday}
                            />
                            <DayHoursComponent
                                keyValue="Martedì"
                                value={inputs.tuesday}
                                setValue={actions.setTuesday}
                            />
                            <DayHoursComponent
                                keyValue="Mercoledì"
                                value={inputs.wednesday}
                                setValue={actions.setWednesday}
                            />
                            <DayHoursComponent
                                keyValue="Giovedì"
                                value={inputs.thursday}
                                setValue={actions.setThursday}
                            />
                            <DayHoursComponent
                                keyValue="Venerdì"
                                value={inputs.friday}
                                setValue={actions.setFriday}
                            />
                            <DayHoursComponent
                                keyValue="Sabato"
                                value={inputs.saturday}
                                setValue={actions.setSaturday}
                            />
                            <DayHoursComponent
                                keyValue="Domenica"
                                value={inputs.sunday}
                                setValue={actions.setSunday}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={actions.resetHours}
                            className="ring-2 ring-red-500 hover:bg-red-400 rounded-md flex m-auto my-2 px-2 justify-center"
                        >
                            reset
                        </button>
                    </DropDownComponent>
                </div>
                <div className="px-4 py-3 bg-gray-100 text-right sm:px-6">
                    <button
                        type="button"
                        className="inline-flex mr-3 justify-center py-2 px-4 ring-2 ring-red-500 shadow-red-400 shadow-sm text-sm font-medium rounded-md text-black bg-white "
                        onClick={buttons[0].onClick}
                    >
                        {buttons[0].text}
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center py-2 px-4 ring-2 ring-indigo-600 shadow-indigo-500 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600"
                        onClick={buttons[1].onClick}
                    >
                        {buttons[1].text}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default FormInfo