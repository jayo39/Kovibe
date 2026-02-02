import { Link } from "react-router-dom";
import { CustomLatestUpdate } from "../styles/components/latestUpdate.styles";

const LatestUpdate = () => {
    return (
        <CustomLatestUpdate>
            <Link className="inner-container" to="/news" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{color: '#374151'}}>새로운 공지</div>
                    <div style={{color: '#848a92'}}>운영자</div>
                </div>
            </Link>
        </CustomLatestUpdate>
    )
}

export default LatestUpdate;