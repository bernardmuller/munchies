import React from 'react';

const Toast = ({ message }: { message: string }) => {
  return (
    <div className="toast toast-end">
      <div className="alert alert-info">
        <div>
          <span>New mail arrived.</span>
        </div>
      </div>
      <div className="alert alert-success">
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
