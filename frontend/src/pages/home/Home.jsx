import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <>
      <div className=" flex sm:h-[650px] md:h-[650px] md:w-[80%] rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <Sidebar />
        <MessageContainer />
      </div>
    </>
  );
};

export default Home;
