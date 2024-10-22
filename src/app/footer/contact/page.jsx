import Image from "next/image";
import React from "react";
import Link from "next/link";
import phone from "../../../../Public/icons/home/footer/phone.svg";
import location from "../../../../Public/icons/home/footer/whiteLocation.svg";
import facebook from "../../../../Public/icons/home/footer/facebook.svg";
import twitter from "../../../../Public/icons/home/footer/twitter.svg";
import linkedin from "../../../../Public/icons/home/footer/linkedin.svg";
import ContactForm from "@/components/Footer/Contact/ContactForm";

const page = () => {
  return (
    <div>
      <div className="w-full z-[999999] lg:py-0 py-2  bg-[#2B2B2B]">
        <div className="px-5 max-w-6xl mx-auto">
          <div className=" lg:py-28 py-20 flex lg:flex-row flex-col md:items-center justify-between lg:gap-44 mx-4 md:mt-4 ">
            {/* left section  */}
            <div className="flex flex-col w-full md:max-w-[80%] lg:max-w-[50%] text-white">
              <h2 className="font-bold text-heading">Meet us</h2>
              <div className=" mt-10">
                <div className="flex gap-6 items-center opacity-90">
                  <Image
                    height={8}
                    width={8}
                    src={phone}
                    alt="phone"
                    className=" w-auto h-auto"
                  />

                  <Link
                    href="tel:01321-757092"
                    className="text-paragraph font-normal"
                  >
                    01321-757092
                  </Link>
                </div>
                <div className="flex gap-6 items-center opacity-90 mt-6">
                  <Image
                    height={8}
                    width={8}
                    src={location}
                    alt="phone"
                    className=" w-auto h-auto"
                  />
                  <span className="text-paragraph text-wrap font-normal antialiased ">
                    1, Software Technology Park, Vision 2021 Tower, Level 4,
                    Kawran Bazar Rd, Dhaka 1215
                  </span>
                </div>
              </div>
              <div className="flex gap-10 items-center mt-10">
                <Link href={"https://www.facebook.com"}>
                  <Image
                    src={facebook}
                    className=" h-auto"
                    width={10}
                    alt="facebook"
                  />
                </Link>
                <Link href={"https://www.twitter.com"}>
                  <Image
                    src={twitter}
                    className="h-auto"
                    width={20}
                    alt="twitter"
                  />
                </Link>
                <Link href={"https://www.linkedin.com"}>
                  <Image
                    src={linkedin}
                    className=" h-auto"
                    width={20}
                    alt="linkedin"
                  />
                </Link>
              </div>
            </div>
            {/* form section  */}
            <div className="lg:flex-1 md:w-full md:max-w-[80%] mt-20">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full z-[999999] lg:py-0 py-2">
          <div className="px-5 max-w-6xl mx-auto">
            <div className="flex justify-center items-center mt-16 mb-24 lg:mt-32 lg:mb-40">
              <iframe
                className="w-full h-[250px] md:max-w-[80%] md:h-[350px] lg:h-[450px] rounded-lg px-4 md:p-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29212.942698699542!2d90.385715718251!3d23.761003691827558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b91150a85dd7%3A0xfbcc72df205d27ba!2sTARS%20INDUSTRIES!5e0!3m2!1sen!2sbd!4v1710568083379!5m2!1sen!2sbd@"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
