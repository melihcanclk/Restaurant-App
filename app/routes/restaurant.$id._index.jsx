import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function RestaurantId() {
    const { id } = useParams();
    return (
        <div>
            <h2>A Blog Post titled {id}</h2>
        </div>
    );
}