import { useState } from "react";

export const useModal = (initialValue = false) => {
    const [isOpen, setIsOpen] = useState(initialValue);

    const openModel = (event) => {
        event.preventDefault();
        setIsOpen(true);
    };
    const closeModel = (event) => {
        event.preventDefault();
        setIsOpen(false);
    };

    return { isOpen, openModel, closeModel };
};