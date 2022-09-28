import React, { ReactComponentElement, ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Form({
  children,
  onSubmit,
  className,
}: {
  children: any;
  onSubmit: SubmitHandler;
  className: string;
}) {
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </form>
  );
}
