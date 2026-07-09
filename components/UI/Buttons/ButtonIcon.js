export default function ButtonIcon ({ children, size, click, style, rounded }) {
    return (
        <button className={`btn-icon rounded-${rounded}`} style={{"--w": `${size}px`, "--mnw": `${size}px`,"--h": `${size}px`, ...style}} onClick={click}>{children}</button>
    )
}