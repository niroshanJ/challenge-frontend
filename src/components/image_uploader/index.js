import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import getCroppedImg from './crop_image'
import { useDispatch } from 'react-redux'
import { uploadImage } from '../../redux/action'
import './style.css';

export const ImageUpload = (props) => {

    const dispatch = useDispatch();

    const [image, setImage] = useState(props.image);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = async () => {
        try {
            console.log(image,
                croppedAreaPixels,
                rotation, 'attr');
            const croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels,
                rotation
            )
            console.log(croppedImage, 'croppedImage');
            setCroppedImage(croppedImage);
            dispatch(uploadImage(croppedImage));
        } catch (e) {
            console.error(e)
        }
    }

    const onClose = useCallback(() => {
        setCroppedImage(null)
    }, [])

    return (
        <div>
            <div>
                <Cropper
                    image={image}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className='crop-tools'>
                <div>
                    <Typography
                        variant="overline">
                        Zoom
                    </Typography>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e, zoom) => setZoom(zoom)}
                    />
                </div>
                <div>
                    <Typography
                        variant="overline"
                    >
                        Rotation
          </Typography>
                    <Slider
                        value={rotation}
                        min={0}
                        max={360}
                        step={1}
                        aria-labelledby="Rotation"
                        onChange={(e, rotation) => setRotation(rotation)}
                    />
                </div>
                <Button
                    onClick={showCroppedImage}
                    variant="contained"
                    color="primary"
                >
                    Crop
                </Button>
            </div>
        </div>
    )
}
