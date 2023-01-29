import React, { createContext } from "react";

const UserContext = createContext({
    id: null, setId: () => { }
})

export default UserContext