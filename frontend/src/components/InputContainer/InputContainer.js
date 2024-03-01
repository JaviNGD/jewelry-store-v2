import inputContainerClass from './inputContainer.module.css'

export default function InputContainer({ label, bgColor, children }) {
    return (
        <div className={inputContainerClass.container} style={{ backgroundColor: bgColor }}>
            <label className={inputContainerClass.label}>{label}</label>
            <div className={inputContainerClass.content}>{children}</div>
        </div>
    );
}