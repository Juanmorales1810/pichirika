import { Link } from "@nextui-org/link";
import { AlertIcon, CallIcon, Logo, PetIcon } from "@/components/icons";
import { fontMono } from "@/config/fonts";
import { Button } from "@nextui-org/button";


export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4">
			<div className="relative flex w-full h-full min-h-screen justify-center items-center overflow-hidden">
				<div className="flex flex-col justify-between items-center gap-4 w-full max-w-6xl z-20 md:flex-row">
					<div className="flex flex-col justify-center items-center w-auto mt-12 md:mt-0">
						<Logo className="fill-zinc-950 dark:fill-zinc-300 transition-[fill] ease-in-out duration-700" size={300} />
						<h1 className={"font-[900] text-7xl text-zinc-950 dark:text-zinc-200 transition-colors ease-in-out duration-700 " + fontMono.className}>PichiriKa</h1>
					</div>
					<div className="flex flex-col justify-center items-center max-w-xl px-2 md:items-start">
						<h2 className={"font-bold text-4xl mb-4 " + fontMono.className}>¿Qué es PichiriKa?</h2>
						<p className="text-lg text-center font-medium text-pretty mb-3 md:text-start">Es un portal web para la adopción y cuidado de animales es una plataforma virtual que facilita la conexión entre mascotas necesitadas de hogar y personas interesadas en brindarles amor y cuidados. Ofrece perfiles detallados de animales disponibles, información sobre cuidados básicos y salud, citas para visitar refugios, sistemas de donaciones y foros comunitarios. Promueve la adopción responsable y el bienestar animal.</p>
						<div className="flex gap-4 mb-2">
							<Button as={Link} href="/adopt" className="bg-lime-600 font-semibold text-zinc-950 dark:text-zinc-200 dark:bg-lime-800" endContent={<PetIcon className="fill-zinc-950 dark:fill-zinc-200" />} >Adopta</Button>
							<Button as={Link} href="tel:4213280" className="bg-red-700 font-semibold text-zinc-950 dark:text-zinc-200 dark:bg-red-900" endContent={<CallIcon className="fill-zinc-950 dark:fill-zinc-200" />} >Denuncia</Button>
						</div>
						<small className="flex items-center gap-1 text-red-600">
							<AlertIcon className="stroke-red-600" size={14} />
							Las llamadas de denuncia solo son para la provincia de<strong>San Juan</strong></small>
					</div>
				</div>
				<div className="absolute w-full h-[55vh] rounded-t-[112px] dark:rounded-b-[112px] dark:rounded-t-none top-[48%] md:top-0 dark:-top-14 md:h-screen bg-lime-300 z-10 md:dark:rounded-full md:rounded-full md:dark:top-0 md:left-[40%] dark:bg-green-700 md:dark:-left-[50%] transition-[color_left] ease-in-out duration-700"></div>
			</div>

			{/* <div className="flex flex-col w-full max-w-6xl gap-3">

				<iframe className="w-full h-[1330px] md:h-[700px]" src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3OdN21XIbeRFYxeki99sPDNjmBZx18ybR4kbdy9cSy2Szcd30Owmioa1vqMQnXqjzamOX8XyW-?gv=true"></iframe>



			</div> */}
		</section>
	);
}
