import React from "react";
import { Footer } from "../components/Footer";
import { LandingNav } from "../components/Nav/LandingNav";
import { useSelector } from "react-redux";
import { NavPrimary } from "../components/Nav/NavPrimary";

export const Landing = () => {
  const currentUser = useSelector((state) => state.users.currentUser);

  console.log("currentUser", currentUser);

  if (currentUser) {
    // TODO: CREATE AND ADD COMPONENTS FOR A LOGGED IN USER
    return (
      <div>
        <NavPrimary />

        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <LandingNav />

        <main>
          TODO: Landing Section
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Elementum nibh tellus molestie nunc non blandit. Vel pharetra vel
            turpis nunc eget lorem dolor sed. Dignissim cras tincidunt lobortis
            feugiat. Lacus suspendisse faucibus interdum posuere lorem ipsum
            dolor sit. Scelerisque varius morbi enim nunc faucibus a
            pellentesque sit. Elit pellentesque habitant morbi tristique
            senectus. Arcu bibendum at varius vel pharetra vel turpis nunc eget.
            Massa sapien faucibus et molestie ac. Amet nulla facilisi morbi
            tempus. Et tortor at risus viverra adipiscing at in tellus. Quis
            risus sed vulputate odio ut enim. Orci phasellus egestas tellus
            rutrum tellus pellentesque eu tincidunt tortor. Urna nunc id cursus
            metus aliquam eleifend mi in nulla. Posuere lorem ipsum dolor sit
            amet consectetur. Blandit libero volutpat sed cras ornare. Ac odio
            tempor orci dapibus ultrices in iaculis. Platea dictumst quisque
            sagittis purus sit amet volutpat. Gravida rutrum quisque non tellus
            orci ac. Rutrum tellus pellentesque eu tincidunt tortor aliquam
            nulla facilisi cras. Elementum nibh tellus molestie nunc. Nisl
            rhoncus mattis rhoncus urna neque. Turpis egestas integer eget
            aliquet nibh praesent. Nulla facilisi nullam vehicula ipsum a arcu
            cursus vitae. Sed arcu non odio euismod lacinia at. Pharetra sit
            amet aliquam id diam maecenas ultricies. Adipiscing vitae proin
            sagittis nisl rhoncus mattis rhoncus urna neque. Tortor at risus
            viverra adipiscing at. Condimentum vitae sapien pellentesque
            habitant morbi tristique. Tortor consequat id porta nibh venenatis
            cras. Euismod in pellentesque massa placerat duis ultricies lacus
            sed. Donec adipiscing tristique risus nec feugiat in fermentum
            posuere. Nec ultrices dui sapien eget. Non consectetur a erat nam at
            lectus. Pulvinar pellentesque habitant morbi tristique senectus et
            netus. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Tortor
            consequat id porta nibh. Sapien nec sagittis aliquam malesuada.
            Sociis natoque penatibus et magnis dis parturient montes nascetur
            ridiculus. Pretium lectus quam id leo in vitae turpis. Aliquet
            lectus proin nibh nisl condimentum id venenatis a condimentum. Ac
            orci phasellus egestas tellus rutrum tellus pellentesque. Semper
            viverra nam libero justo laoreet sit amet cursus. Sed tempus urna et
            pharetra. Nullam non nisi est sit amet facilisis. In cursus turpis
            massa tincidunt dui ut. Purus ut faucibus pulvinar elementum integer
            enim neque. Accumsan in nisl nisi scelerisque. Vel facilisis
            volutpat est velit egestas dui id ornare arcu. Magna sit amet purus
            gravida quis blandit turpis cursus in. Porttitor lacus luctus
            accumsan tortor posuere ac ut consequat. Lacinia at quis risus sed
            vulputate odio ut. Eros in cursus turpis massa tincidunt dui ut.
            Aliquet lectus proin nibh nisl condimentum. Dolor sit amet
            consectetur adipiscing elit ut aliquam purus sit. Nec ultrices dui
            sapien eget. Arcu dictum varius duis at consectetur lorem donec
            massa. Platea dictumst vestibulum rhoncus est pellentesque elit
            ullamcorper dignissim. Urna duis convallis convallis tellus id
            interdum velit laoreet id. Nulla facilisi cras fermentum odio eu
            feugiat. Faucibus vitae aliquet nec ullamcorper sit amet. Est
            placerat in egestas erat. Sit amet nulla facilisi morbi tempus
            iaculis. Tortor at auctor urna nunc. Tempus imperdiet nulla
            malesuada pellentesque. Consectetur libero id faucibus nisl
            tincidunt eget nullam non nisi. Cras semper auctor neque vitae
            tempus. Velit sed ullamcorper morbi tincidunt ornare massa eget
            egestas purus. In iaculis nunc sed augue. Sagittis eu volutpat odio
            facilisis mauris. Diam vulputate ut pharetra sit amet aliquam. Urna
            porttitor rhoncus dolor purus non enim. Eu mi bibendum neque egestas
            congue quisque egestas. Enim diam vulputate ut pharetra sit amet.
            Viverra adipiscing at in tellus integer. Commodo quis imperdiet
            massa tincidunt nunc pulvinar sapien et. At consectetur lorem donec
            massa sapien faucibus et molestie ac. Arcu cursus euismod quis
            viverra nibh. Viverra vitae congue eu consequat ac felis donec et.
          </p>
        </main>

        <Footer />
      </div>
    );
  }
};
