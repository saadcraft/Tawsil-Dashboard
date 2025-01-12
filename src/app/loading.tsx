import { TbLoader3 } from "react-icons/tb";

export default function Loading() {
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 md:left-80 flex justify-center items-center pt-20">
            <h1 className="text-2xl flex items-center justify-center gap-5">Loading... <TbLoader3 className="animate-spin text-4xl" /></h1>
        </div>
    )
}