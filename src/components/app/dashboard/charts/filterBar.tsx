"use client"

import dayjs from "dayjs";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { Filter, Filters, TransactionFilters } from "./chartSpace";

export default function FilterBar({ setFilters, filters }: { filters: Filters, setFilters: Dispatch<SetStateAction<Filters>> }) {


    return (
        <section className=" h-32 bg-zinc-100 shadow-sm w-full">
            <input type="" />
        </section>
    )
}