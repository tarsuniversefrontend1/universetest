
import AuthLogo from "@/components/AuthLogo/AuthLogo";
import AuthenticationFooter from "@/shared/AuthenticationFooter/AuthenticationFooter";


const layout = ({children}) => {
  
   
  return (
    <div className="flex  mt-8 md:mt-[5%]  items-center justify-center">
      <div className="">
        <AuthLogo />
        <div className="mt-6"> {children}</div>
        <AuthenticationFooter />
      </div>
    </div>
  );
}

export default layout