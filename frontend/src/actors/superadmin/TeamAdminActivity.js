import React, { useState, useEffect } from "react";
import axios from "axios";

const TeamAdminActivity = ({ user_id }) => {
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(
                    `/api/user-activities/teamadmin/${user_id}`
                );
                setActivity(response.data.data);
            } catch (error) {
                console.error("Error fetching user activities:", error);
            }
        };

        if (user_id) {
            fetchActivity();
        }
    }, [user_id]);

    return (
        <div>
            <h3 style={{color:"black"}}>Team Admin Activity</h3>
            {activity ? (
                <div>
                    <img
                        src={`${axios.defaults.baseURL}storage/images/${activity.image}`}
                        alt={activity.name}
                        style={{ width: "80px", height: "80px" }}
                    />
                    <div style={{ padding:20, marginTop: 6 , textAlign:"left"
                        
                    }}>
                        <p>
                            <strong>User ID:</strong> {activity.user_id}
                        </p>
                        <p>
                            <strong>Name:</strong> {activity.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {activity.email}
                        </p>
                        <p>
                            <strong>Status:</strong> {activity.status}
                        </p>
                    </div>
                </div>
            ) : (
                <p>No activities found for this user.</p>
            )}
        </div>
    );
};

export default TeamAdminActivity;
