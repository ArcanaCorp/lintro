export default function ButtonIcon ({ children, size, click }) {
    return (
        <button className={`btn-icon`} style={{"--w": `${size}px`, "--mnw": `${size}px`,"--h": `${size}px`}} onClick={click}>{children}</button>
    )
}