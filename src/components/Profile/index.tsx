import gsap from "gsap";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.scss";
import Nav from "../Nav";
import * as assets from "../../assets";
import { colors } from "../../utils/data";

function Profile({ ...props }) {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapper.current) return console.warn("#profile_wrapper ref not set");

    const tl = gsap.timeline();

    {
      tl.to(wrapper.current, {
        x: props.profile ? 0 : "-100%",
        ease: "expo.inOut",
        duration: 0.75,
        delay: 0.1,
      });
    }

    return () => {
      tl.kill();
    };
  }, [props.profile]);

  return (
    <>
      <div ref={wrapper} id="profile_wrapper">
        <div>{props.cart.length > 0 ? "Bag" : "Your Bag is empty"}</div>
        <div>
          <div>
            {props.cart.map(
              (el: { type: string; color: string }, i: number) => (
                <div key={i}>
                  <div>
                    <img
                      src={
                        assets[
                          `lanyard_store_lanyards_${el.type || "progression"}_${
                            el.color || "080808"
                          }` as keyof typeof assets
                        ]
                      }
                      alt=""
                    />
                  </div>
                  <div>
                    THE LANYARD{" "}
                    {el.type.charAt(0).toUpperCase() + el.type.slice(1)}{" "}
                    {Object.keys(colors).find(
                      (k) => colors[k as keyof typeof colors] === el.color
                    )}
                  </div>
                </div>
              )
            )}
          </div>
          <div>Review Bag</div>
        </div>
        <div>
          <div>My Profile</div>
          <Link to="/orders">Orders</Link>
          <Link to="/checkout">Your Saves</Link>
          <Link to="/account">Account</Link>
          <Link to="#">Sign in</Link>
        </div>
      </div>
      <Nav
        loaded={true}
        profile={props.profile}
        setProfile={props.setProfile}
        style={{
          zIndex: 12,
          background: "white",
          transform: "translateY(0)",
          display: props.profile ? "flex" : "none",
        }}
      />
    </>
  );
}

export default Profile;
