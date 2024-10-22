import Footer from "@/components/Footer/Contact/Footer";
import Navbar from "@/components/Footer/Contact/Navbar";

const layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </>
  );
};

export default layout;
