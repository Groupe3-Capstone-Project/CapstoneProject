import { useNavigate } from "react-router-dom";


export default function DetailsButton({id}) {
    const navigate = useNavigate()

    return (
        <button className="details-button" onClick={() => navigate("/products/" + id)}>View Details for</button>
    )
}