import Button from "./ui/Button";
import Tabel from "./ui/Tabel";
import { Trash2, CalendarDays } from 'lucide-react';

interface IProps {

}

const ClientsContent = ({}: IProps) => {
    return (
        <div className="mx-3 space-y-3">
            <div className="flex justify-between items-center">
                <div>
                    <Button newStyles="flex">Filter by join date<CalendarDays className="ml-2"/></Button>
                </div>
                <div>
                    <Trash2 size={30} color="#D4AF37" className="hover:bg-white hover:p-1 hover:rounded-full transition-all"/>
                </div>
            </div>
            <div>
                <Tabel />
            </div>
        </div>
    )
}

export default ClientsContent;