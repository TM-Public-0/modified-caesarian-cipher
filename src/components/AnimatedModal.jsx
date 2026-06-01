import { EvervaultCard } from "./EvervaultCard.jsx";
import ContactButtons from "./FloatingDocks.jsx";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "./ModalConfig.jsx";

export default function AnimatedModal({trigger, children}) {
    return (
        <Modal>
            <ModalTrigger className="dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">               
                {/* <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                    Contact
                </span>
                <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                    <sub>
                        <code style={{ letterSpacing: "4px"}}>23bkB3j</code>

                    </sub>
                </div> */}
                {trigger}
            </ModalTrigger>
            <ModalBody>
                {children}
            </ModalBody>
        </Modal>
    )
};