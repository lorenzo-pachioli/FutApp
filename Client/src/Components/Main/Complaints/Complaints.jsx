import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Navigate } from 'react-router-dom';
import '../../../Pages/SubMain/SubMain.css';
import './Complaints.css';

export default function Complaints({ socket }) {
    const { user, url, setUrl } = useContext(AppContext);
    const [complain, setComplain] = useState('');
    const [complaintError, setComplaintError] = useState(false);
    const [complaintSent, setComplaintSent] = useState(false);

    const handleComplaints = () => {
        setComplaintError(false);
        const newComplain = {
            complain: complain,
            sender: user._id,
            receiver: url.receiver,
            room_id: url.room_id,
            url: url.url
        };
        socket.emit("init_report", newComplain);
    }

    useEffect(() => {
        socket.on("init_report_res", data => {
            if (!data.status) {
                setComplaintError(true)
                return console.log(data.msg, ':', data.error)
            }
            setComplaintSent(true)
            setUrl({})
            setComplain('')
            setTimeout(() => {
                setComplaintSent(false)
            }, 4000);
        })
    }, [socket, setUrl]);

    return (
        <div className='sub-main'>
            <div className='sub-main-container' style={{ flexDirection: 'column' }} >
                <div className='comlpaints-container'>
                    <div className='complaints-title'>
                        <h1>Send Complaints</h1>
                    </div>
                    <p className='sub-title'>Here's a screenshot of the chat you want to report:</p>
                    <div className='altReport'>
                        {url ? (
                            <img src={url.url} alt='' />
                        ) : (<h3 >No chat reported yet</h3>)}

                    </div>

                    <textarea
                        value={complain}
                        onChange={(e) => setComplain(e.target.value)}
                        maxLength="200"
                        placeholder='Tell us about the problem' />

                    {url ? (
                        <button
                            onClick={() => {
                                setUrl('')
                                return setComplain('')
                            }}
                            className='cancel'>Cancel</button>
                    ) : (<div className='noButton'></div>)}

                    {complaintError ? (<p className='complaintError'>Couldn't send report</p>) : ('')}
                    {complaintSent ? (<p className='complaintError green'>Report sent successfully</p>) : ('')}

                    {url && complain.length > 0 ? (
                        <button onClick={handleComplaints} className='send' >Send</button>
                    ) : (<div className='noButton'></div>)}
                    {user._id ? (''):(<Navigate to='/' replace={true} />)}
                </div>

            </div>


        </div>
    )
}