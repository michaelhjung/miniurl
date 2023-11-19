import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Footer } from "../components/Footer";
import { LandingNav } from "../components/Nav/LandingNav";

export const Landing = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) return navigate("/dashboard");
  }, [currentUser, navigate]);

  return (
    <div>
      <LandingNav />

      <main>
        <section className="hero-section">
          <h1>The minimalist's URL shortener with insightful analytics</h1>
        </section>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacinia
          quis vel eros donec ac. Non odio euismod lacinia at quis risus sed
          vulputate. Neque convallis a cras semper auctor neque vitae. Proin
          libero nunc consequat interdum varius. Aliquet bibendum enim facilisis
          gravida neque convallis a. Iaculis urna id volutpat lacus laoreet non
          curabitur gravida. Vivamus at augue eget arcu dictum varius duis at.
          Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing
          elit. Nulla porttitor massa id neque aliquam vestibulum morbi blandit
          cursus. Nunc scelerisque viverra mauris in. Nunc consequat interdum
          varius sit amet mattis vulputate enim. Eget dolor morbi non arcu risus
          quis varius. Massa id neque aliquam vestibulum morbi blandit cursus.
          Nisl rhoncus mattis rhoncus urna neque. Ut lectus arcu bibendum at
          varius vel.
          <br />
          <br />
          Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit
          ullamcorper. Nulla aliquet enim tortor at auctor urna nunc id cursus.
          Dis parturient montes nascetur ridiculus mus mauris vitae ultricies
          leo. Id aliquet lectus proin nibh nisl condimentum. Lectus nulla at
          volutpat diam ut venenatis tellus in. Enim diam vulputate ut pharetra
          sit amet aliquam. Egestas sed sed risus pretium quam vulputate
          dignissim suspendisse in. Vel fringilla est ullamcorper eget nulla
          facilisi etiam. Cras sed felis eget velit. Eget dolor morbi non arcu
          risus. Egestas purus viverra accumsan in nisl nisi. Pretium vulputate
          sapien nec sagittis aliquam malesuada bibendum arcu. Fusce ut placerat
          orci nulla. Vitae turpis massa sed elementum tempus. Sapien et ligula
          ullamcorper malesuada proin libero nunc consequat interdum. Elementum
          nisi quis eleifend quam adipiscing vitae proin. Lacus luctus accumsan
          tortor posuere. In est ante in nibh mauris.
          <br />
          <br />
          Sodales ut eu sem integer vitae justo. Purus sit amet volutpat
          consequat mauris nunc congue nisi. Ac tincidunt vitae semper quis
          lectus nulla at volutpat diam. Commodo nulla facilisi nullam vehicula
          ipsum. Ut consequat semper viverra nam libero. Ut ornare lectus sit
          amet. Aliquam eleifend mi in nulla posuere. Rutrum tellus pellentesque
          eu tincidunt tortor aliquam nulla. Lectus magna fringilla urna
          porttitor rhoncus dolor purus. Turpis cursus in hac habitasse platea
          dictumst quisque sagittis. Viverra nibh cras pulvinar mattis nunc sed.
          Nisl nunc mi ipsum faucibus vitae. Pharetra pharetra massa massa
          ultricies mi quis hendrerit. Ac turpis egestas maecenas pharetra
          convallis posuere. Id consectetur purus ut faucibus pulvinar elementum
          integer enim neque. Quam elementum pulvinar etiam non quam. Pretium
          nibh ipsum consequat nisl vel pretium. Vitae nunc sed velit dignissim.
          <br />
          <br />
          At risus viverra adipiscing at in tellus. Quam pellentesque nec nam
          aliquam sem et tortor consequat id. Tortor pretium viverra suspendisse
          potenti nullam. Vestibulum sed arcu non odio euismod lacinia at. Urna
          id volutpat lacus laoreet non curabitur gravida arcu ac. Placerat
          vestibulum lectus mauris ultrices eros in cursus. Vel fringilla est
          ullamcorper eget nulla facilisi. Sed pulvinar proin gravida hendrerit
          lectus a. Fermentum dui faucibus in ornare quam. Neque convallis a
          cras semper auctor. Non consectetur a erat nam at lectus urna.
          Volutpat lacus laoreet non curabitur gravida arcu. In aliquam sem
          fringilla ut morbi tincidunt augue. Eu sem integer vitae justo eget.
          Erat velit scelerisque in dictum non consectetur a erat.
          <br />
          <br />
          Rhoncus urna neque viverra justo nec ultrices dui sapien. Elementum
          curabitur vitae nunc sed velit dignissim sodales. In vitae turpis
          massa sed elementum tempus egestas. Laoreet sit amet cursus sit. Eu
          consequat ac felis donec et odio pellentesque. Imperdiet dui accumsan
          sit amet nulla facilisi morbi tempus. Nulla at volutpat diam ut
          venenatis. Eget egestas purus viverra accumsan in nisl nisi. Nec
          feugiat nisl pretium fusce id velit. Habitasse platea dictumst quisque
          sagittis. Libero justo laoreet sit amet. Vestibulum sed arcu non odio.
          Pharetra sit amet aliquam id diam maecenas ultricies. Aliquet nec
          ullamcorper sit amet risus nullam. Sed vulputate odio ut enim blandit
          volutpat maecenas volutpat.
        </p>
      </main>

      <Footer />
    </div>
  );
};
