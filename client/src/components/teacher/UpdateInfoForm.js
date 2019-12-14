import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button, Col, Icon, Input, Row, Select} from 'antd';
import AvatarUpload from './AvatarUpload';
import ModalChangePass from '../ModalChangePass';
import homeApi from '../../api/home.api';
import {updateUserInfo} from "../../reducers/auth.reducer";

const {Option} = Select;
const {TextArea} = Input;

const provinces = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12",
    "Thủ Đức", "Gò Vấp", "Bình Thạnh", "Tân Bình", "Tân Phú", "Phú Nhuận",
    "Bình Tân", "Củ Chi", "Hóc Môn", "Bình Chánh", "Nhà Bè", "Cần Giờ"
];

const UpdateInfoForm = ({user, setIsShowUpdate}) => {

    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState(user.avatar);
    const [email, setEmail] = useState(user.email);
    const [address, setAddress] = useState(user.address);
    const [fullName, setFullName] = useState(user.fullName);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [pricePerHour, setPricePerHour] = useState(user.pricePerHour);
    const [skills, setSkills] = useState(user.skills);
    const [listSkill, setListSkill] = useState([]);
    const [canTeachingPlaces, setCanTeachingPlaces] = useState(
        user.canTeachingPlaces
    );
    const [selfDescription, setSelfDescription] = useState(user.selfDescription);

    const [avatarFile, setAvatarFile] = useState(null);
    const [showModalChangePass, setShowModalChangePass] = useState(false);

    const updateInfo = async () => {
        const formData = new FormData();

        if (avatarFile) {
            formData.append('file', avatarFile.originFileObj);
        }

        formData.append('email', user.email);
        formData.append('fullName', fullName);
        formData.append('address', address);
        formData.append('avatar', user.avatar);
        formData.append('phoneNumber', phoneNumber);
        formData.append('pricePerHour', pricePerHour);
        formData.append('skills', JSON.stringify(skills));
        formData.append('canTeachingPlaces', JSON.stringify(canTeachingPlaces));
        formData.append('selfDescription', selfDescription);

        dispatch(updateUserInfo(formData));
    };

    const handleShow = () => {
        setShowModalChangePass(true);
    };

    useEffect(() => {
        homeApi.getSkills().then(result => {
            if (result.returnCode === 1) {
                setListSkill(result.data.skills);
            }
        })
    }, []);

    return (
        <Row className="container-tutors">
            <Col span={5}>
                <AvatarUpload
                    avatar={avatar}
                    setAvatar={setAvatar}
                    setFile={setAvatarFile}
                />
                <Button onClick={handleShow} block type="primary">
                    Change Password ?
                </Button>
                <ModalChangePass isOpen={showModalChangePass} currPass={''}/>
            </Col>
            <Col span={18} offset={1}>
                <Input
                    style={{marginBottom: 12}}
                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    name="email"
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
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Họ tên"
                />
                <Input
                    style={{marginBottom: 12}}
                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    name="address"
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="Address"
                />
                <Input
                    style={{marginBottom: 12}}
                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    name="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="Address"
                />
                <Input
                    style={{marginBottom: 12}}
                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    name="pricePerHour"
                    type="text"
                    value={pricePerHour}
                    onChange={e => setPricePerHour(e.target.value)}
                    placeholder="Price Per Hour"
                />
                <Select
                    mode="multiple"
                    style={{width: '100%', border: 'solid 1px #c5c5c5', borderRadius: '5px', marginBottom: 12}}
                    defaultValue={skills}
                    onChange={values => setSkills(values)}
                    size="large">
                    {listSkill.map(skill => (
                        <Option key={skill.skillName}>{skill.skillName}</Option>
                    ))}
                </Select>
                <Select
                    mode="multiple"
                    style={{width: '100%', border: 'solid 1px #c5c5c5', borderRadius: '5px', marginBottom: 12}}
                    defaultValue={canTeachingPlaces}
                    onChange={values => setCanTeachingPlaces(values)}
                    size="large">
                    {provinces.map(province => (
                        <Option key={province}>{province}</Option>
                    ))}
                </Select>
                <TextArea
                    row={4}
                    style={{marginBottom: 12}}
                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    name="selfDescription"
                    type="text"
                    value={selfDescription}
                    onChange={e => setSelfDescription(e.target.value)}
                    placeholder="Self Description"
                />
                <Button
                    type="primary"
                    className="button-shadow"
                    style={{float: 'right', marginTop: '5px'}}
                    onClick={updateInfo}
                >
                    Save
                </Button>
            </Col>
        </Row>
    );
};

export default UpdateInfoForm;
