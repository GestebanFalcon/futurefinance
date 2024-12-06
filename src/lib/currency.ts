/** Format cents -- ex: formatC(1234) -> "$12.34" */
export const formatC = (cents: number) => {
    return (
        (cents * 100).toLocaleString("en-US", { style: "currency", currency: "USD" })
    )
}