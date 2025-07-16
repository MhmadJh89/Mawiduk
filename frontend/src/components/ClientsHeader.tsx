import Button from "./ui/Button";
import { CirclePlus } from 'lucide-react';

const ClientsHeader = () => {
    return (
        <div className="flex flex-col space-y-5  md:flex-row md:justify-between items-center my-5 mx-3"> 
            <div className="text-white text-center md:text-start">
                <h2 className="text-3xl">Clients</h2>
                <h3>view all of your client information </h3>
            </div>
            <div>
                <Button newStyles="flex py-3"> <CirclePlus className="mr-2"/> Add New Client</Button>
            </div>
        </div>
    )
}

export default ClientsHeader;