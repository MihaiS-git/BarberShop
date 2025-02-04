import { Outlet } from "react-router-dom";
import Header from './Header';
import Footer from './Footer'

export default function RootLayout() {
    return (
        <main className="flex flex-col bg-gradient-to-r from-yellow-950 to-yellow-100 min-h-screen font-serif overflow-y-auto">
            <div className="min-h-screen w-full bg-contain"
                style={{
                    backgroundImage: "url('background/bb_bg_04.png')",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                }}
            >
                <Header />
                <Outlet />
                <Footer />
            </div>
        </main>
    );
}