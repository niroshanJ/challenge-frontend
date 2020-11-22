import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiPhoneNumber from 'material-ui-phone-number';
import { makeStyles } from '@material-ui/core/styles';
import { userAddAPI } from '../../../services/http';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import Grid from '@material-ui/core/Grid';
import { ImageUpload } from '../../image_uploader';
import { useDispatch, useSelector } from 'react-redux';
import { userEditFormClose, updateUser, resetUserImage } from '../../../redux/action';
import Avatar from '@material-ui/core/Avatar';
import { v4 as uuidv4 } from 'uuid';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root, .MuiInputBase-root': {
            margin: theme.spacing(1),
            width: 200,
            height: 60,
            marginLeft: 0
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    },
}));

export function UserEditForm() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const userImage = useSelector(state => state.userImage);
    const currentUser = useSelector(state => state.editUser);

    const [isImageSelected, setIsImageSelected] = useState(false);
    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    const [address, setAddress] = useState(currentUser.address);
    const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
    const [dateOfBirth, setDateOfBirth] = useState(currentUser.dateOfBirth);
    const [email, setEmail] = useState(currentUser.email);

    const [image, setImage] = useState();

    const [isFirstNameFailed, setFirstNameFailed] = useState(false);
    const [isLastNameFailed, setLastNameFailed] = useState(false);
    const [isAddressFailed, setAddressFailed] = useState(false);
    const [isPhoneNumberFailed, setPhoneNumberFailed] = useState(false);
    const [isDateOfBirthFailed, setDateOfBirthFailed] = useState(false);
    const [isEmailFailed, setEmailFailed] = useState(false);
    const [isImageFailed, setImageFailed] = useState(false);

    const [firstNameValidation, setFirstNameValidation] = useState('');
    const [lastNameValidation, setLastNameValidation] = useState('');
    const [addressValidation, setAddressValidation] = useState('');
    const [phoneNumberValidation, setPhoneNumberValidation] = useState('');
    const [dateOfBirthValidation, setDateOfBirthValidation] = useState('');
    const [emailValidation, setEmailValidation] = useState('');
    const [imageValidation, setImageValidation] = useState('');

    const closeForm = () => {
        dispatch(userEditFormClose());
    }

    const saveUser = () => {
        let isSubmittable = true;
        if (isEmpty(firstName)) {
            setFirstNameFailed(true);
            setFirstNameValidation("First name is required");
            isSubmittable = false;
        } else {
            setFirstNameFailed(false);
            setFirstNameValidation("");
        }
        if (isEmpty(lastName)) {
            setLastNameFailed(true);
            setLastNameValidation("Last name is required");
            isSubmittable = false;
        } else {
            setLastNameFailed(false);
            setLastNameValidation("");
        }
        if (isEmpty(address)) {
            setAddressFailed(true);
            setAddressValidation("Address is required");
            isSubmittable = false;
        } else {
            setAddressFailed(false);
            setAddressValidation("");
        }
        if (isEmpty(phoneNumber)) {
            setPhoneNumberFailed(true);
            setPhoneNumberValidation("Phone number is required");
            isSubmittable = false;
        } else {
            setPhoneNumberFailed(false);
            setPhoneNumberValidation("");
        }
        if (isEmpty(dateOfBirth)) {
            setDateOfBirthFailed(true);
            setDateOfBirthValidation("Birth day is required");
            isSubmittable = false;
        } else {
            setDateOfBirthFailed(false);
            setDateOfBirthValidation("");
        }
        if (isEmpty(email) || !isEmail(email)) {
            setEmailFailed(true);
            setEmailValidation("Email should be valid");
            isSubmittable = false;
        } else {
            setEmailFailed(false);
            setEmailValidation("");
        }

        const userData = {
            id: currentUser.id,
            firstName,
            lastName,
            address,
            phoneNumber,
            dateOfBirth,
            email,
            userImage
        };
        if (isSubmittable) {
            userAddAPI().catch(err => {
                console.log('No backend APIs available, request contains below data', userData);
            });
            dispatch(updateUser(userData));
            dispatch(resetUserImage());
            dispatch(userEditFormClose());
        }
    }

    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
    }

    const imageToggleHandler = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setIsImageSelected(true);
                const image = e.target.result;
                setImage(image);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    const ImageToggle = () => {
        if (isImageSelected) {
            return (<ImageUpload image={image} />);
        } else {
            return (
                <input type='file' onChange={imageToggleHandler} />
            );
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <div className='image-wrapper'>
                    {<ImageToggle />}
                    {!isImageSelected && <p className='text-warning'>{imageValidation}</p>}
                </div>
            </Grid>
            <Grid item xs={6}>
                <form className={classes.root} noValidate autoComplete="off">
                    <div className='form-element-row'>
                        <Avatar style={{ alignSelf: 'center', margin: '0 auto', height: '75px', width: '75px' }} className={classes.large} variant='circle' src={userImage} />
                    </div>
                    <div className='form-element-row'>
                        <TextField error={isFirstNameFailed} helperText={firstNameValidation} required variant="outlined" label="First Name" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                        <TextField error={isLastNameFailed} helperText={lastNameValidation} required variant="outlined" label="Last Name" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                    </div>
                    <div className='form-element-row'>
                        <TextField error={isAddressFailed} helperText={addressValidation} required variant="outlined" label="Address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                        <MuiPhoneNumber error={isPhoneNumberFailed} helperText={phoneNumberValidation} required variant="outlined" defaultCountry='lk' value={phoneNumber} onChange={handlePhoneNumberChange} />
                    </div>
                    <div className='form-element-row'>
                        <TextField error={isDateOfBirthFailed} helperText={dateOfBirthValidation} required variant="outlined" type="date" label="Date of Birth" defaultValue={'2020-11-21'} value={dateOfBirth} onChange={(e) => { setDateOfBirth(e.target.value) }} />
                        <TextField error={isEmailFailed} helperText={emailValidation} required variant="outlined" label="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className='form-footer'>
                        <Button
                            variant="contained"
                            color='primary'
                            onClick={() => { saveUser() }}
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => { closeForm() }}
                            color='primary'>
                            Close
                        </Button>
                    </div>
                </form >
            </Grid>
        </Grid>

    );
}
