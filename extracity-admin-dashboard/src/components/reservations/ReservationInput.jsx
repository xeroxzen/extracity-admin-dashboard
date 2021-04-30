import React from 'react'

const ReservationInput = ({ reservation }) => {
    const [fullname, setFullname] = React.useState(reservation.fullname);

    return (
        <div>
            <input value={fullname} onChange={e => {
                setFullname(e.target.value);
            }}
            />
            <button>Update</button>
        </div>
    )
}

export default ReservationInput
