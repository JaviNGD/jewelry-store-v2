import buttonClass from './button.module.css';

export default function Button({type, text, onClick, color, backgroundColor, fontSize, width, height}) {
    return (
        <div className={buttonClass.container}>
            <button 
                style={{color, backgroundColor, fontSize, width, height}}
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
    width: '12rem',
    height: '3rem',
}