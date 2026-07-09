export default function BaseLayout ({ children, theme }) {

    return (
        <div className="w-screen h-screen scroll" style={{background: theme?.bg || '#FFFFFF', color: theme?.text || '#181818', minHeight: '100dvh'}}>{children}</div>
    )
}