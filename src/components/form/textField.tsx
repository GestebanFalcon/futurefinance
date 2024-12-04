import { ChangeEventHandler } from "react";
export default function TextField({ type, value, onChange, name, label, optional }: { type?: string, value?: string, onChange?: ChangeEventHandler<HTMLInputElement>, name?: string, label?: string, optional?: boolean }) {
    return (
        <div>
            <h3 className="text-neutral-900 ml-1 text-sm">{label}</h3>
            <input className=" p-3 border-2 border-neutral-300 focus:border-emerald-400 transition-colors rounded-md focus:outline-none text-sm" type={type} onChange={onChange} value={value} name={name} required={!optional} />
        </div>
    )
}