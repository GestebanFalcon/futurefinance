import Skeleton from "@/components/util/skeleton";

export default function LoadingSkeleton() {
    return (
        <>
            <div className="flex flex-col w-[512px] h-full gap-8 ">
                <div className=" w-full h-64">
                    <Skeleton />
                </div>
                <div className=" flex-grow w-full">
                    <Skeleton />
                </div>
            </div>
            <div className="flex-grow h-full flex flex-col gap-8">
                <div className="w-full h-32"><Skeleton /></div>
                <Skeleton />
            </div>
        </>
    )
}