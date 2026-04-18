import { txtInfinity } from "@/helpers/landing";

export default function InfinityScroll () {

    return (
        <div className="relative w-full h bg-accent overflow-hidden" style={{"--h": "80px"}}>
            <ul className="w-full h-full flex items-center gap-md animation-infinify-scroll">
                {txtInfinity.map((txt, i) => (
                    <li key={i} className="text-white py-sm px-md">{txt}</li>
                ))}
                {txtInfinity.map((txt, i) => (
                    <li key={`dup-${i}`} className="text-white py-sm px-md">{txt}</li>
                ))}
            </ul>
        </div>
    )

}