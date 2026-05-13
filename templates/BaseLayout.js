export default function BaseLayout ({ children, theme }) {

    return (
        <div className="lg:p-xl" style={{width: '100dvw', height: '100dvh', overflowY: 'auto', background: theme?.bg || '#FFFFFF', color: theme?.text || '#181818', minHeight: '100dvh'}}>{children}</div>
    )
}