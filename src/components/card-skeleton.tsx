import CardPichiriKa from "@/components/cardpichirika";
import RegisterPetCTA from "@/components/register-pet-cta";

export function CardSkeleton() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full gap-2">
            <ul className="flex flex-wrap justify-center gap-2 py-2">
                {/* Include the RegisterPetCTA in the skeleton for consistent layout */}
                <RegisterPetCTA registerUrl="/adoptar/registrar-mascota" />

                {/* Show skeleton cards */}
                {Array(9)
                    .fill(0)
                    .map((_, index) => (
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
