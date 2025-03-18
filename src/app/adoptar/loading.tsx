import CardPichiriKa from "@/components/cardpichirika";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full gap-2">
            <ul className="flex flex-wrap justify-center gap-2 py-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
                    <CardPichiriKa
                        key={index}
                        title=""
                        image=""
                        ubication="capital"
                        id=""
                        skeleton
                    />
                ))}
            </ul>
        </div>
    );
}
