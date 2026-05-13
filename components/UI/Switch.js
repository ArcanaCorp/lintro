export default function Switch ({ active=false }) {
    return (
        <div className={`w p-xs rounded-full ${active ? 'bg-primary' : 'bg-accent'}`} style={{"--w": "40px", cursor: 'pointer'}}>
            <div className={`w h rounded-full bg-white`} style={{"--w": "15px", "--mnw": "15px", "--h": "15px", marginLeft: active ? '15px' : ''}}></div>
        </div>
    )
}