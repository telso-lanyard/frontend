import { useEffect } from "react";

import Landing from "./components/Landing";
import Lanyard from "./components/Lanyard";
import Nav from "../../../../components/Nav";

function Home({ ...props }) {
  useEffect(() => props.setLoaded(false), []);

  return (
    <>
      <Nav
        loaded={props.loaded}
        profile={props.profile}
        setProfile={props.setProfile}
        pageWidth={props.pageWidth}
      />
      <Landing setLoaded={props.setLoaded} />
      <Lanyard />
    </>
  );
}

export default Home;
