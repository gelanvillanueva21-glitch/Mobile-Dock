

import { useEffect, useState } from "react";
import { ApiRequest } from "../../services/client";
import { Output } from "./SearchOutput";
import { data } from "react-router-dom";


export function SearchUser() {
    const [searchUser, setSearchUser] = useState("");


    useEffect(() => {
        
    }, [searchUser])


    return (
        <div className="">
            <input 
                type="text" 
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Gelan Mar"
                className="search-user-input"
            />

            {
                <div>
                    {}
                </div>
            }
        </div>
    )

}




