export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-start w-full h-screen gap-4 pt-16">
			<div className="flex flex-col items-center justify-center w-full h-full">
				{children}
			</div>
		</section>
	);
}
