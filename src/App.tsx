import HeroSection from "./componenets/HeroSection";
import Main from "./layouts/Main";
import "./index.css"
function App() {
  return (
    <>
      <Main>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <HeroSection />
      </Main>
    </>
  );
}

export default App;
