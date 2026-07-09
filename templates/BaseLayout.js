export default function BaseLayout ({ children, theme }) {

    return (
        <div className="lg:p-xl no-scroll lg:scroll" style={{width: '100dvw', height: '100dvh', background: theme?.bg || '#FFFFFF', color: theme?.text || '#181818', minHeight: '100dvh'}}>{children}</div>
    )
}