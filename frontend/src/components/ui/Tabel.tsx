import type { TableHTMLAttributes } from "react";

interface IProps extends TableHTMLAttributes<HTMLTableElement> {
}

const Tabel = ({...rest}: IProps) => {
    return (
        <table className="text-white w-full space-y-2" {...rest}>
            <th className="flex justify-around space-x-2 items-center text-center">
                <td className="w-full p-2 rounded-tl-2xl" style={{backgroundColor: "#2C3E50"}}>Clients</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Phone</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Email</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Total Boking</td>
                <td className="w-full p-2 rounded-tr-2xl" style={{backgroundColor: "#2C3E50"}}>Join Date</td>
            </th>
            <tr className="flex justify-around space-x-2 items-center text-center">
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Mailk Mohamed</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>+20 12345678</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Malik@email.com </td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>10</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Jun 20, 2025</td>
            </tr>
            <tr className="flex justify-around space-x-2 items-center text-center">
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Mailk Mohamed</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>+20 12345678</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Malik@email.com </td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>10</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Jun 20, 2025</td>
            </tr>
            <tr className="flex justify-around space-x-2 items-center text-center">
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Mailk Mohamed</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>+20 12345678</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Malik@email.com </td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>10</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Jun 20, 2025</td>
            </tr>
            <tr className="flex justify-around space-x-2 items-center text-center">
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Mailk Mohamed</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>+20 12345678</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Malik@email.com </td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>10</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Jun 20, 2025</td>
            </tr>
            <tr className="flex justify-around space-x-2 items-center text-center">
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Mailk Mohamed</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>+20 12345678</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Malik@email.com </td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>10</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Jun 20, 2025</td>
            </tr>
            <tr className="flex justify-around space-x-2 items-center text-center">
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Mailk Mohamed</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>+20 12345678</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Malik@email.com </td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>10</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Jun 20, 2025</td>
            </tr>
            <tr className="flex justify-around space-x-2 items-center text-center">
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Mailk Mohamed</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>+20 12345678</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Malik@email.com </td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>10</td>
                <td className="w-full p-2" style={{backgroundColor: "#2C3E50"}}>Jun 20, 2025</td>
            </tr>
        </table>
    )
}

export default Tabel;