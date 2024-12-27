import Image from "next/image";
import ManImage from "../../public/man.png"
export default function Home() {
  return (
    <div className="w-full h-[90vh] grid place-items-center">
        <div className="container grid md:grid-cols-2 place-items-center">
          <div className="container grid place-items-center">
            <h1 className="text-2xl md:text-6xl">Abduqodir Yuldashev</h1>
          </div>
          <div className="container grid place-items-center">
        <Image src={ManImage} alt="man" />
          </div>
        </div>
    </div>
     );
}
