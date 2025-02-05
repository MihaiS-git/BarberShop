import Map from './Map';

const Contact = () => {
    return (
        <div
            className={'flex flex-col justify-around align-middle text-center font-medium font-serif text-yellow-950 text-2xl sm:text-3xl'}
        >
            <div className="bg-yellow-500 mb-10 w-64 sm:w-96 mx-auto">
                <h2>Contact</h2>
            </div>
            <Map />
            <div className="my-8 bg-yellow-500 w-64 sm:w-96 mx-auto">
                <p className="text-lg">
                    <strong>Adress: </strong>CJ, RO
                </p>
                <p className="text-lg">
                    <strong>Phone: </strong>1234567890
                </p>
                <p className="text-lg">
                    <strong>Email: </strong>barbershop@test.com
                </p>
            </div>
        </div>
    );
}
export default Contact;