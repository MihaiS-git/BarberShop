import PageContent from "../components/PageContent";

export default function HomePage() {
    return (
        <PageContent className="flex items-center justify-center h-screen w-full">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-yellow-950 bg-yellow-200 rounded-3xl p-4 font-extrabold opacity-80">
                Welcome to Barber Shop!
            </h3>
        </PageContent>
    );
}
