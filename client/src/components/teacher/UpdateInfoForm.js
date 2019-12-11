import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Button, Col, Icon, Input} from "antd";
import AvatarUpload from "./AvatarUpload";

const { TextArea } = Input;

const UpdateInfoForm = ({user}) => {
    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState(user.avatar);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [fullName, setFullName] = useState(user.fullName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [skills, setSkills] = useState(user.skills);
    const [canTeachingPlaces, setCanTeachingPlaces] = useState(user.canTeachingPlaces);
    const [selfDescription, setSelfDescription] = useState(user.selfDescription);

    const [avatarFile, setAvatarFile] = useState(null);

    const updateInfo = () => {
        const formData = new FormData();
        if (avatarFile)
            formData.append("file", avatarFile.originFileObj);
        formData.append("username", user.username);
        formData.append("email", email);
        formData.append("fullName", fullName);
        formData.append("avatar", user.avatar);

        //dispatch(updateUserInfo(formData));
    };

    return (<>

        <Col span={6}>
            <AvatarUpload avatar={avatar}
                          setAvatar={setAvatar}
                          setFile={setAvatarFile}/>
            <Button block type="primary">
                Change Password ?
            </Button>
        </Col>

        <Col span={7} offset={1}>
            <Input
                style={{marginBottom: 12}}
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                name="username"
                type="text"
                defaultValue={user.email}
                disabled
            />
            <Input
                style={{marginBottom: 12}}
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                name="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Họ tên"
            />
            <Input
                style={{marginBottom: 12}}
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
            />
            <Input
                style={{marginBottom: 12}}
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                name="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Address"
            />
            <Input
                style={{marginBottom: 12}}
                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                name="skills"
                type="text"
                value={skills}
                placeholder="Skills"
            />
            <Input
                style={{marginBottom: 12}}
                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                name="canTeachingPlaces"
                type="text"
                value={canTeachingPlaces}
                placeholder="Can Teaching Places"
            />
            <TextArea row={4}
                      style={{marginBottom: 12}}
                      prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      name="selfDescription"
                      type="text"
                      value={selfDescription}
                      placeholder="Self Description"
            />
            <Button
                type="primary"
                className="button-shadow"
                style={{float: 'right', marginTop: '5px'}}
                onClick={updateInfo}
            >
                Cập Nhật
            </Button>
        </Col>

    </>)
};

export default UpdateInfoForm;
