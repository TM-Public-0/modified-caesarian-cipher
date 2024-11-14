import { EvervaultCard } from "./EvervaultCard.jsx";
import AnimatedModal from "./AnimatedModal.jsx";
import { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "./NavMenu.jsx";
import ContactButtons from "./FloatingDocks.jsx";
import { ModalContent } from "./ModalConfig.jsx";


export default function Nav() {
  const [active, setActive] = useState(null);

  return (
    // <nav className="font-bold text-white mb-8 text-lg flex justify-evenly w-1/2 items-center" style={{ fontFamily: 'Georgia', borderBottom: "1px solid #fffff02e"}}> 
    //   <h2 className="underline underline-offset-8">Home</h2>
    //   <EvervaultCard text="About/How To Use" />
    //   <EvervaultCard text="Get the desktop app" />
    //   <AnimatedModal />  {/* this it the contact button */}
      
    // </nav>
    <nav>
      <Menu setActive={setActive}>
      <h2 className="underline underline-offset-8">Home</h2>
         <AnimatedModal trigger={<EvervaultCard text="About/How To Use" />} children={<AboutChildren />} />  {/* this it the About button */}
         {/* <EvervaultCard text="About/How To Use" /> */}
         <EvervaultCard text="Get the desktop app" />

          <MenuItem setActive={setActive} active={active} item="Contact">
              <div className="flex flex-col text-sm">
                <ContactButtons />
              </div>
          </MenuItem>
      </Menu>
    </nav>
  );
}

function AboutChildren() {

  return (
    <ModalContent>
      <div id="about-text" className="flex flex-col gap-y-4">
        <h2 className="text-2xl text-center underline underline-offset-8">About This App</h2>
        <p>This is a modified Caesarian Cipher encryption and decryption app.</p>
        <p>This app allows you to encrypt and decrypt text using a modified Caesarian Cipher. The app uses two keys to encrypt and decrypt the text.</p>
        <p>You need to use the same keys you used to encrypt your data to decrypt it.</p>
        <p>I promise that I do not store any of your information on any server. This app is purely for recreational purposes.</p>
        <p>I am not liable for the safety of your information. Please use this app responsibly.</p>
        
        <br/> <br/>
        <br/> <br/>
        <h3 className="font-bold text-center underline ">How To Use</h3>
        <blockquote>
          Enter the text you want to encrypt. <br/>
          Enter the first key. <br/>
          Enter the second key. <br/>
          Click on the "Encrypt!" button. <br/>

        </blockquote>        
        <br/> <br/>
        <br/> <br/>

        <h3 className="font-bold text-center underline ">About The Keys</h3>
        <p>The keys are used to shift the letters in your data input, as well as the numbers and symbols. The original Caesarian Cipher would use only one key, but this one uses two keys to make it more secure.</p>
        <p>If you would like to come back to decrypt text that you previously encrypted on this website, you would need to know the keys used to encrypt said text.</p>
        <p>The original Caesarian cipher used a single key and substituted only letters with other letters. This modified version also uses Arabic numbers and keyboard symbols as part of the substitution of characters.</p>
        <br/> <br/>
        <br/> <br/>
        
        <h3 className="font-bold text-center underline ">About The Original Caesarian Cipher</h3>
        <p>The Caesarian Cipher is a type of substitution cipher that was used by Julius Caesar. It is a simple way to encrypt and decrypt text.</p>
        <p>For example, if you want to encrypt the letter "A", you would shift it by the first key, which is 1. The letter "A" would become "B".</p>
        
        <br /> <br />        
        <hr/>
        <br /> <br />        
        
        {/* <p>For more information on the exact mechanism used by this app, please check out the source code.</p> */}
        <p>For more information on the Caesarian Cipher please check out the <a style={{ color: 'blue'}} href="https://en.wikipedia.org/wiki/Caesar_cipher" target="_blank">Wikipedia page</a> </p>
        <p><b>Fun fact:</b> <br/> The Caesarian Cipher was named after Julius Caesar, the famous Roman general and first emperor of Rome. He developed this cipher in order to encrypt letters to trusted advisors, as well as notes for himself. In the context of childbirth, C-section, or Caesarian section, was also named after Julius Caesar, as he was slashed and stabbed to death by Roman senators.</p>

      </div>
    </ModalContent>
  )
}