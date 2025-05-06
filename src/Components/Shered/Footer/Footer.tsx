import Image from "next/image";
import Link from "next/link";
import logo from "../../../image/Logo.svg";
import NewsletterSection from "./NewsletterSection";

const Footer = () => {
  return (
    <section className="bg-[#F1F8FE] pt-20 pb-10">
      <div className="custom-container">
        <NewsletterSection />

        <footer className=" py-8 px-4 md:px-0">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">
                ©2025 Transcripts Today. All right reserved
              </p>
            </div>

            <div className="flex items-center justify-center mb-4 md:mb-0">
              <Image
                src={logo}
                alt="Logo"
                width={120}
                height={40}
                className="h-10"
              />
            </div>

            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                Terms of service
              </Link>
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-gray-900"
              >
                Privacy policy
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
