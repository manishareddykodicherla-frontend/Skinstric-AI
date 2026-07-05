import React, { useEffect, useRef, useState } from 'react'
import Header from "./Header";
import"./Result.css";
import cameraIcon from "../assets/camera.png";
import Ellipse2 from "../assets/gallery (1).png";
import {useNavigate} from "react-router-dom";
import Button from "../assets/button.png"

export default function Result() {
    const navigate= useNavigate();
    const fileInputRef=useRef(null);
    const videoRef=useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [cameraStream, setCameraStream] = useState(null);
    const [showCameraPrompt, setShowCameraPrompt] = useState(false);

    const stopCamera = () => {
        if (cameraStream) {
            cameraStream.getTracks().forEach((track) => track.stop());
            setCameraStream(null);
        }
        setIsCameraOpen(false);
    };

    const processImage = async (dataUrl) => {
        setPreviewImage(dataUrl);
        setIsAnalyzing(true);

        try {
            const base64Image = dataUrl.split(",")[1];

            const response = await fetch('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: base64Image
                })
            });

            if (!response.ok) {
                throw new Error('Image upload failed');
            }

            const data = await response.json();
            localStorage.setItem('skinstricAnalysis', JSON.stringify(data));
            setIsAnalyzing(false);

            const shouldContinue = window.confirm('Analysis complete! Your image is ready.');
            if (shouldContinue) {
                navigate('/Select', {
                    state: { analysis: data }
                });
            }
        } catch (error) {
            console.error('Image upload failed:', error);
            setIsAnalyzing(false);
            window.alert('Analysis failed. Please try again.');
        }
    };

    const handleImageUpload=async (e)=>{
        const file=e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            processImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const openCameraPicker = async () => {
        if (!navigator.mediaDevices?.getUserMedia) {
            window.alert('Camera is not supported on this device.');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false,
            });
            setCameraStream(stream);
            setIsCameraOpen(true);
        } catch (error) {
            console.error('Failed to open camera:', error);
            window.alert('Unable to access the camera. Please allow permission or use gallery upload.');
        }
    };

    const openCameraPrompt = () => {
        setShowCameraPrompt(true);
    };

    const handleCameraPermissionAllow = async () => {
        setShowCameraPrompt(false);
        await openCameraPicker();
    };

    const handleCameraPermissionDeny = () => {
        setShowCameraPrompt(false);
    };

    useEffect(() => {
        if (cameraStream && videoRef.current) {
            videoRef.current.srcObject = cameraStream;
            const playPromise = videoRef.current.play();
            if (playPromise?.catch) {
                playPromise.catch((err) => {
                    console.warn('Video play was blocked:', err);
                });
            }
        }
    }, [cameraStream]);

    const capturePhoto = () => {
        if (!videoRef.current) return;

        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        stopCamera();
        processImage(dataUrl);
    };

    const openGalleryPicker = () => {
        fileInputRef.current?.click();
    };

  return (
    <div>
        <Header/>
                <div className="uploadPreviewBox">
            {previewImage ? (
                <img
                    src={previewImage}
                    alt=""
                    className="uploadPreviewImage"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
            ) : (
                <div className="uploadPreviewPlaceholder">No image selected</div>
            )}
        </div>

        <div className="resultsContainer">
            <div className="reslutsCamera">
                <div className="cameraDiamond1">
                    <div className="cameraDiamond2">
                        <div className="cameraDiamond3">
                        </div>
                    </div>
                </div>
                <div className="camera">
                    <img
                        src={cameraIcon}
                        alt="Open camera"
                        className="cameraIcon"
                        onClick={openCameraPrompt}
                    />
                </div>
                {showCameraPrompt && (
                    <div className="cameraPermissionModal">
                        <div className="cameraPermissionCard">
                            <div className="cameraPermissionTitle">ALLOW A.I. TO ACCESS YOUR CAMERA</div>
                            <div className="cameraPermissionSubtitle">TO SCAN YOUR FACE</div>
                            <div className="cameraPermissionActions">
                                <button type="button" className="permissionButton deny" onClick={handleCameraPermissionDeny}>
                                    DENY
                                </button>
                                <button type="button" className="permissionButton allow" onClick={handleCameraPermissionAllow}>
                                    ALLOW
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {isCameraOpen && (
                    <div className="cameraModal">
                        <video
                            ref={videoRef}
                            className="cameraPreview"
                            playsInline
                            muted
                            autoPlay
                        />
                        <div className="cameraControls">
                            <button type="button" className="cameraButton" onClick={capturePhoto}>
                                Capture selfie
                            </button>
                            <button type="button" className="cameraButton secondary" onClick={stopCamera}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

            </div>
            <div className="resultsGallery">
<div className="galleryDiamond1">
    <div className="galleryDiamond2">
        <div className="galleryDiamond3">
            
        </div>

    </div>
</div>
        <div className="gallery">
            {previewImage ? (
                <>
                    <img
                        src={previewImage}
                        alt=""
                        className="galleryPreviewImage"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    {isAnalyzing ? (
                        <div className="analysisStatus">Preparing for analysis...</div>
                    ) : (
                        <div className="analysisStatus success">Analysis complete</div>
                    )}
                    <img
                        src={Ellipse2}
                        alt="Choose another option"
                        className="galleryUploadIcon"
                        onClick={openGalleryPicker}
                    />
                </>
            ) : (
                <img src={Ellipse2} alt="Upload from gallery" className="ellipse2" onClick={openGalleryPicker} />
            )}
            <input type="file" accept="image/*" ref={fileInputRef} style={{display:"none"}} onChange={handleImageUpload}/>
        </div>
</div>
        </div>
        <button onClick={()=>navigate("/Select")} className="proceedbutton"> <img src={Button} alt="" classname="proceeding"/><span className="proceed">proceed</span></button>
    </div>
  )
}

