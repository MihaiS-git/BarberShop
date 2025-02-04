const FormInputElement: React.FC<{
    type: string;
    id: string;
    name: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value?: string;
    required?: boolean;
}> = ({  type, id, name, onChange, placeholder='', value ='', required = false }) => {
    return (
        <p className="m-2">
            <input
                className="bg-neutral-50 w-full p-2"
                type={type}
                id={id}
                name={name}
                onChange={onChange ? onChange : undefined}
                placeholder={placeholder}
                value={value}
                required={required}
            />
        </p>
    );
};

export default FormInputElement;
