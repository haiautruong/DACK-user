import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const ModalComfirm = ({ open, message, setOpenComfirm }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  const handleHideModal = () => {
    setVisible(false);
    setOpenComfirm(false);
  };

  return (
    <div>
      <Modal
        title="Notify"
        visible={visible}
        onOk={handleHideModal}
        okText="Ok"
        onCancel={handleHideModal}
      >
        {message}
      </Modal>
    </div>
  );
};

ModalComfirm.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  setOpenComfirm: PropTypes.func
};

export default ModalComfirm;
