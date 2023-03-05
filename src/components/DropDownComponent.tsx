import { Menu, Transition } from '@headlessui/react'
import { Fragment,FC, ReactNode } from 'react'

interface Props {
    label?:string,
    icon?:ReactNode,
    children:ReactNode,
    buttonStyle:string,
    menuStyle:string
}

const DropDownComponent:FC<Props> = ({label,icon,children,buttonStyle,menuStyle}) => {
    return (
        <div className="m-auto flex">
          <Menu as="div" className="inline-block text-left">
            <div>
              <Menu.Button className={buttonStyle}>
                {label && label}
                {icon!==undefined && icon}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className={menuStyle}>
                {children}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      )
}

export default DropDownComponent