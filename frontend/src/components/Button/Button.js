import buttonClass from './button.module.css';

export default function Button({type, text, onClick, color, backgroundColor, fontSize, height}) {
    return (
        <div className={buttonClass.container}>
            <button 
                style={{color, backgroundColor, fontSize, height}}
                type={type}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    )
}

Button.defaultProps = {
    type: 'button',
    text: 'Submit',
    fontSize: '1.2rem',
    height: '3rem',
}