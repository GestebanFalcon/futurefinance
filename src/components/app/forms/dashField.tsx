import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

/**Minimally styled, smaller textfield component to fit in dashboard */
export default function DashField({ type, value, onChange, name, label, optional, disabled }: { type?: HTMLInputTypeAttribute, value?: string, onChange?: ChangeEventHandler<HTMLInputElement>, name?: string, label?: string, optional?: boolean, disabled?: boolean }) {
    return (
        <div className="w-full">
            <h3 className="text-neutral-500 ml-1 text-xs mb-2 font-bold">{label}</h3>
            <input disabled={disabled} className={`
                ${disabled && "bg-zinc-200"}

                focus:bg-emerald-50

                py-1.5

                px-2

                w-full
                text-sm
                font-semibold
                border-zinc-400
                border-[1px]
                
                focus:outline-none

                rounded-sm

            `} type={type} onChange={onChange} value={value} name={name} required={!optional} />
        </div>
    )
}
