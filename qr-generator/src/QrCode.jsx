import React, {  useState } from 'react'
import "./QrCode.css"

const QrCode = () => {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [qrData, setQrData] = useState("");
    const [qrSize, setQrSize] = useState("");

    async function generateQR(){
        setLoading(true);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${qrData}`;
            setImg(url);
        }
        catch(error){
            console.error("Error generating QR code", error);
        }
        finally{
            setLoading(false);
        }
    }

    function downloadQR(){
        fetch(img).then((response)=>response.blob()).then((blob)=>{
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "QrCode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

  return (
    <div className='app-container'>
        <h1>QR Code Generator</h1>
        {loading && <p>Please wait ...</p>}
        {img && <img src={img} alt="" className='qr-code-image'/>}
        {/* {!img && <img src="/QR-code-profile.png" alt="" className='qr-code-image' />} */}

        <div>
            <label htmlFor='dataInput' className='input-label'>Data for QR code:</label>
                <input className='text' value = {qrData} id='dataInput' placeholder=' Enter the data for QR code ' onChange={(e)=> setQrData(e.target.value)}/>

            <label htmlFor='sizeInput' className='input-label'>Image size:</label>
                <input className='text' value = {qrSize} id='sizeInput' placeholder=' Image size (eg., 150, 300) ' onChange={(e)=>setQrSize(e.target.value)}/>
        
                <button className='generate-button' disabled={loading} onClick={generateQR}>Generate QR code</button>
                <button className='download-button' disabled={!img} onClick={downloadQR} >Download QR code</button>
    
        </div>
        <p className='footer-style'>create by <a className='footer'>PRIYA </a> </p>
    </div>
  )
}

export default QrCode