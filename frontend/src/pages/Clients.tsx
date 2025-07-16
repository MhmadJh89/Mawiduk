import ClientsContent from "../components/ClientsContent";
import ClientsHeader from "../components/ClientsHeader";

interface IProps {

}

const Clients = ({}: IProps) => {
    return (
        <>
            <ClientsHeader />
            <div className="mx-3 my-5">
                <hr className="text-gray-500"/>
            </div>
            <ClientsContent />
        </>
    )
}

export default Clients;