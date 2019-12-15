/* eslint-disable react/prop-types, react/display-name */
import React from 'react';
import { Button, Upload, Icon } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const AvatarUpload = React.memo(({ avatar, setAvatar, setFile }) => {
  const handleUpload = ({ fileList }) => {
    const file = [...fileList.slice(-1)];
    getBase64(file[0].originFileObj, avatar => {
      setAvatar(avatar);
      setFile(file[0]);
    });
  };

  return (
    <>
      <img style={{ width: '320px' }} src={avatar} alt="avatar" />
      <Upload
        accept="image/*"
        showUploadList={false}
        onChange={handleUpload}
        beforeUpload={() => false}
      >
        <Button
          size="large"
          className="btn-camera"
          type="default"
          icon="camera"
          block
        />
      </Upload>
    </>
  );
});

export default AvatarUpload;
