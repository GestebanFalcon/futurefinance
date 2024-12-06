// import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
// import MaskedInput from "react-text-mask";
// import createNumberMask from 'text-mask-addons/dist/createNumberMask'

// const defaultMaskOptions = {
//     prefix: '$',
//     suffix: '',
//     includeThousandsSeparator: true,
//     thousandsSeparatorSymbol: ',',
//     allowDecimal: true,
//     decimalSymbol: '.',
//     decimalLimit: 2, // how many digits allowed after the decimal
//     allowNegative: false,
//     allowLeadingZeroes: false,
// }

// /**Minimally styled, smaller textfield component to fit in dashboard but it only accepts monetary input */
// export default function MoneyField({ value, onChange, name, label, optional, disabled }: { type?: HTMLInputTypeAttribute, value: number, onChange: ChangeEventHandler<HTMLInputElement>, name?: string, label?: string, optional?: boolean, disabled?: boolean }) {
//     return (
//         <div className="w-full">
//             <h3 className="text-neutral-500 ml-1 text-xs mb-2 font-bold">{label}</h3>
//             <MaskedInput type="text" inputMode="numeric" mask={createNumberMask(defaultMaskOptions)} disabled={disabled} className={`
//                 ${disabled && "bg-zinc-200"}

//                 focus:bg-emerald-50

//                 py-1.5

//                 px-2

//                 w-full
//                 text-sm
//                 font-semibold
//                 border-zinc-400
//                 border-[1px]
                
//                 focus:outline-none

//                 rounded-sm

//             `} onChange={onChange} name={name} required={!optional} />
//         </div>
//     )
// }

// //this trash can doesnt even work i give up