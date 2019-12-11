import React from 'react';
import {Button, Col, Row, Upload} from "antd";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const AvatarUpload = React.memo(({avatar, setAvatar, setFile}) => {

    const handleUpload = ({fileList}) => {
        const file = [...fileList.slice(-1)];
        getBase64(file[0].originFileObj, avatar => {
                setAvatar(avatar);
                setFile(file[0]);
            }
        );
    };

    return (<>
            <img style={{width: '320px'}} src={avatar} alt="avatar"/>
            <Upload accept="image/*"
                    showUploadList={false}
                    onChange={handleUpload}
                    beforeUpload={() => false}
            >
                <Button type="default"
                        className="btn-signin"
                        icon="plus"
                        block
                        style={{
                            width: '150px',
                            color: '#fff'
                        }}
                >
                    Change Avatar
                </Button>
            </Upload>
        </>
    );
});

export default AvatarUpload;
