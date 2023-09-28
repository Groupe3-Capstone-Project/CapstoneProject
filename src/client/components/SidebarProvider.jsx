import React, { useState, createContext } from "react";

export const  SidebarContest = createContext()

const SidebarProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return <SidebarContest.Provider>{children}</SidebarContest.Provider>;
    
}

export default  SidebarProvider;