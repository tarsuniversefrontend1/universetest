import ClientWrapper from "@/components/ClientWrapper/ClientWrapper";
import Navbar from "@/shared/Navbar/Navbar"


const layout = ({children}) => {
  return (
    <>
      <ClientWrapper>
        <div className="lg:px-4 mt-16 lg:mt-[4.6rem] max-w-6xl mx-auto">
          {children}
        </div>
      </ClientWrapper>
    </>
  );
}

export default layout