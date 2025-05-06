import Footer from "@/Components/Shered/Footer/Footer";
import Navbar from "../../Components/Shered/Navbar/Navbar";
import { Toaster } from "sonner";







export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="overflow-hidden ">
            <Navbar />
            {children}
            <Toaster position="top-right"
                className="!fixed !top-4 !right-4 !w-auto !z-[100]" />
            <Footer />
        </div>

    );
}